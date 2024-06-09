// utils/generateInvoicePDF.js
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const mmToPt = (mm) => mm * 2.83465;

export const generateInvoicePDF = async (items, pageWidthMM = 70) => {
  const pdfDoc = await PDFDocument.create();
  const pageWidth = mmToPt(pageWidthMM); // Dynamic page width in mm to pt
  const pageMargin = mmToPt(5); // 5mm padding
  const baseFontSize = 12;
  const fontSize = (pageWidth / mmToPt(70)) * baseFontSize; // Calculate font size dynamically based on page width
  const lineHeight = fontSize + 1.3;

  // Calculate required height for the items
  const itemsHeight = items.length * lineHeight;
  const headerHeight = lineHeight * 4; // for title and date
  const footerHeight = lineHeight * 2; // for total and spacing
  const contentHeight = headerHeight + itemsHeight + footerHeight;

  // Create a page with dynamic height
  const pageHeight = Math.max(contentHeight + pageMargin * 2, mmToPt(50)); // Minimum height of 50mm
  const page = pdfDoc.addPage([pageWidth, pageHeight]);
  let yPosition = pageHeight - pageMargin;

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const drawText = (text, size, yPosition) => {
    page.drawText(text, {
      x: pageMargin,
      y: yPosition,
      size: size,
      font,
      color: rgb(0, 0, 0),
    });
  };

  drawText('Restaurant Invoice', fontSize + 4, yPosition);
  yPosition -= lineHeight;

  drawText(`Date: ${new Date().toLocaleDateString()}`, fontSize, yPosition);
  yPosition -= lineHeight;

  const drawTableRow = (columns, yPosition) => {
    const colWidth = (pageWidth - pageMargin * 2) / columns.length;
    columns.forEach((col, index) => {
      page.drawText(col.text, {
        x: pageMargin + colWidth * index,
        y: yPosition,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
    });
  };

  drawTableRow(
    [
      { text: 'Item' },
      { text: 'Quantity' },
      { text: 'Price' },
      { text: 'Total' },
    ],
    yPosition,
  );

  yPosition -= lineHeight;

  items.forEach((item) => {
    drawTableRow(
      [
        { text: item.name },
        { text: item.quantity.toString() },
        { text: `$${item.price.toFixed(2)}` },
        { text: `$${(item.quantity * item.price).toFixed(2)}` },
      ],
      yPosition,
    );
    yPosition -= lineHeight;
  });

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2);

  drawText(`Total: $${total}`, fontSize, yPosition - lineHeight);

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
