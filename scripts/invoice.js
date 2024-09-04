document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the invoice data from localStorage
    const invoiceData = JSON.parse(localStorage.getItem('invoiceData'));

    if (invoiceData) {
        document.getElementById('invoiceTo').textContent = invoiceData.customerName;
        document.getElementById('contactNumber').textContent = invoiceData.contactNumber; // Add this line
        document.getElementById('date').textContent = `Date: ${invoiceData.date}`;
        document.getElementById('invoiceNo').textContent = `Invoice No: ${invoiceData.invoiceNo}`;

        const invoiceItems = document.getElementById('invoiceItems');
        invoiceData.items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td class="text-right">${item.quantity}</td>
                <td class="text-right">₹${item.price.toFixed(2)}</td>
                <td class="text-right">${item.discount}%</td>
                <td class="text-right">₹${(item.price * (1 - item.discount / 100)).toFixed(2)}</td>
                <td class="text-right">₹${((item.price * item.quantity) * (1 - item.discount / 100)).toFixed(2)}</td>
            `;
            invoiceItems.appendChild(row);
        });

        const subtotal = parseFloat(invoiceData.totalAmount);
        const cgst = (subtotal * 0.09).toFixed(2);
        const sgst = (subtotal * 0.09).toFixed(2);
        const totalDueFinal = (subtotal + parseFloat(cgst) + parseFloat(sgst)).toFixed(2);

        document.getElementById('subtotal').textContent = `Sub-total: ₹${subtotal.toFixed(2)}`;
        document.getElementById('cgst').textContent = `CGST (9%): ₹${cgst}`;
        document.getElementById('sgst').textContent = `SGST (9%): ₹${sgst}`;
        document.getElementById('totalDueFinal').textContent = `₹${totalDueFinal}`;
        document.getElementById('totalDue').textContent = `INR: ₹${totalDueFinal}`;
    }

    // Download Invoice as PDF
    document.getElementById('downloadBtn').addEventListener('click', function () {
        html2canvas(document.querySelector('.container'), { useCORS: true }).then(canvas => {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            // Add the first page
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Add additional pages if necessary
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            // Save the PDF
            pdf.save('invoice.pdf');
        }).catch(error => {
            console.error('Error generating PDF:', error);
        });
    });

    // Print Invoice
// Print Invoice
document.getElementById('printBtn').addEventListener('click', function () {
    html2canvas(document.querySelector('.container'), { useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print Invoice</title></head><body>');
        printWindow.document.write('<img src="' + imgData + '" style="width:100%;"/>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }).catch(error => {
        console.error('Error generating print preview:', error);
    });
});
    

});
