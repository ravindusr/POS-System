const customers = [];

function addCustomer(event) {
    event.preventDefault();
    const name = document.getElementById('customerName').value;
    const contact = document.getElementById('customerContact').value;
    const address = document.getElementById('customerAddress').value;
    customers.push({ name, contact ,address});
    displayCustomers();
    document.getElementById('customerForm').reset();
}

// Display customers
function displayCustomers() {
    const customerList = document.getElementById('customerList');
    customerList.innerHTML = '';
    customers.forEach(customer => {
        const customerDiv = document.createElement('div');
        customerDiv.textContent = `${customer.name}-${customer.contact}-${customer.address}`;
        customerList.appendChild(customerDiv);
    });
}

