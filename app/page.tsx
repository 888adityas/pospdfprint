// pages/invoice.js
"use client";
import React, { useState } from 'react';
import { saveAs } from 'file-saver';

import { generateInvoicePDF } from '../utils/generateInvoicePDF';

const Invoice = () => {
  const [items] = useState([
    { name: 'Burger', quantity: 2, price: 5.99 },
    { name: 'Fries', quantity: 1, price: 2.99 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Fries', quantity: 1, price: 2.99 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Fries', quantity: 1, price: 2.99 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Fries', quantity: 1, price: 2.99 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Fries', quantity: 1, price: 2.99 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
    { name: 'Coke', quantity: 3, price: 1.50 },
  ]);

  // const handleDownload = async () => {
  //   const pdfBytes = await generateInvoicePDF(items);
  //   const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  //   saveAs(blob, 'invoice.pdf');
  // };

  const handleDownload = async () => {
    const pdfBytes = await generateInvoicePDF(items);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <button
        onClick={handleDownload}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Download Invoice
      </button>
      <div className="w-[70mm] p-4 border border-gray-300">
        <h1 className="text-2xl font-bold text-center mb-4">Restaurant Invoice</h1>
        <div className="invoice-details">
          <div className="text-center mb-4">
            <p>Restaurant Name</p>
            <p>Date: {new Date().toDateString()}</p>
          </div>
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr>
                <th className="border">Item</th>
                <th className="border">Quantity</th>
                <th className="border">Price</th>
                <th className="border">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="border">{item.name}</td>
                  <td className="border">{item.quantity}</td>
                  <td className="border">${item.price.toFixed(2)}</td>
                  <td className="border">${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right font-bold text-lg">
            <p>Total: ${calculateTotal(items)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;

const calculateTotal = (items: any) => {
  return items.reduce((total: any, item: any) => total + item.quantity * item.price, 0).toFixed(2);
};
