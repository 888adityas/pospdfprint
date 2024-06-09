// components/InvoiceDocument.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    width: '70mm',
    padding: '10mm',
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    marginBottom: 5,
  },
  total: {
    textAlign: 'right',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

const InvoiceDocument = ({ items }) => {
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>Restaurant Invoice</Text>
          <Text style={{ textAlign: 'center' }}>Restaurant Name</Text>
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>Date: {new Date().toLocaleDateString()}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Item</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Quantity</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Price</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Total</Text>
            </View>
          </View>
          {items.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.quantity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>${item.price.toFixed(2)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>${(item.quantity * item.price).toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>
        <View>
          <Text style={styles.total}>Total: ${calculateTotal()}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
