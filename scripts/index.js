document.addEventListener('DOMContentLoaded', function () {
    // Populate product options from static data
    const products = window.productData;

    const productSelect = document.getElementById('product');
    const quantityInput = document.getElementById('quantity');
    const discountInput = document.getElementById('discount');
    const invoiceItemsContainer = document.getElementById('invoice-items');
    const totalAmount = document.getElementById('total-amount');
    const generateInvoiceButton = document.getElementById('generate-invoice');

    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} (₹${product.price})`;
        productSelect.appendChild(option);
    });

    let invoiceItems = [];

    document.getElementById('add-product').addEventListener('click', () => {
        const selectedProductId = productSelect.value;
        const quantity = parseInt(quantityInput.value);
        const discount = parseInt(discountInput.value);

        const product = products.find(p => p.id.toString() === selectedProductId);
        if (product) {
            const newItem = {
                id: Date.now(),
                name: product.name,
                price: product.price,
                quantity,
                discount
            };
            invoiceItems.push(newItem);
            renderInvoiceItems();
            resetInputs();
        }
    });

    function renderInvoiceItems() {
        invoiceItemsContainer.innerHTML = '';
        invoiceItems.forEach(item => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${item.name}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>${item.discount}%</td>
                <td>₹${((item.price * item.quantity) * (1 - item.discount / 100)).toFixed(2)}</td>
                <td><button class="remove-item" data-id="${item.id}">Remove</button></td>
            `;

            invoiceItemsContainer.appendChild(row);
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function () {
                const id = parseInt(this.getAttribute('data-id'));
                invoiceItems = invoiceItems.filter(item => item.id !== id);
                renderInvoiceItems();
            });
        });

        updateTotalAmount();
    }

    function updateTotalAmount() {
        const total = invoiceItems.reduce((sum, item) => {
            const itemTotal = (item.price * item.quantity) * (1 - item.discount / 100);
            return sum + itemTotal;
        }, 0);

        totalAmount.textContent = total.toFixed(2);
    }

    function resetInputs() {
        productSelect.value = '';
        quantityInput.value = 1;
        discountInput.value = 0;
    }

    generateInvoiceButton.addEventListener('click', () => {
        const customerName = document.getElementById('customer-name').value;
        const contactNumber = document.getElementById('customer-contact').value;
        const date = new Date().toISOString().split('T')[0];
        const invoiceNo = `INV-${Date.now()}`;
        const totalAmountValue = totalAmount.textContent;

        const invoiceData = {
            customerName,
            contactNumber,
            date,
            invoiceNo,
            items: invoiceItems,
            totalAmount: totalAmountValue
        };

        localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
        window.location.href = 'invoice.html';
    });
});
