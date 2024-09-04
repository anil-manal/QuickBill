# QuickBill

**QuickBill** is a web application for generating and managing invoices. It allows users to create invoices with dynamic data, view them in a stylized format, download them as PDFs, and print them with proper formatting. The application supports discount calculations, CGST and SGST fields, and has a user-friendly interface for managing invoice data.

## Features

- **Dynamic Invoice Generation**: Automatically populate invoices with customer data, item details, and payment information.
- **Stylized Invoice Layout**: Beautifully designed invoices with support for gradients, color-coded totals, and styled tables.
- **PDF Export**: Download invoices as PDFs while preserving styling and layout.
- **Print Functionality**: Print invoices directly from the browser with adjusted formatting for print media.

## Technologies Used

- **HTML**: Structure of the invoice and application.
- **CSS**: Styling of the invoice and application.
- **JavaScript**: Dynamic content generation and functionality.
- **html2canvas**: Library for capturing HTML content as an image.
- **jsPDF**: Library for generating PDFs from images.

## Installation

1. **Clone the Repository**

   git clone https://github.com/anil-manal/QuickBill.git
   cd QuickBill

2. **Project Structure**

index.html: The main HTML file for the invoice.
styles/invoice.css: CSS file for styling the invoice.
scripts/invoice.js: JavaScript file for dynamic content and functionality.

3. **Open in Browser**

Open index.html in your preferred web browser to view and test the application.

## Usage
1. **Generate an Invoice**

Enter invoice data into the HTML form or use local storage to populate the invoice.
Click on the "Download Invoice" button to save the invoice as a PDF.
Click on the "Print Invoice" button to print the invoice with proper formatting.

2. **Customize**

Modify the styles/invoice.css file to change the look and feel of the invoice.
Update the scripts/invoice.js file to adjust functionality or add new features.

