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

function removeCustomer(index) {
    customers.splice(index, 1);
    displayCustomers();
    Swal.fire({
        title: "Good job!",
        text: "Removed Successfully.",
        icon: "success"
      });
}

// Display customers
function displayCustomers() {
    const customerList = document.getElementById('customerList');
    customerList.innerHTML = '';
    customers.forEach((customer, index) => {
        const customerDiv = document.createElement('div');
        customerDiv.classList.add('customer-item');
        customerDiv.innerHTML = `${customer.name} - ${customer.contact} - ${customer.address} <button class="removebtn" onclick="removeCustomer(${index})">Remove</button>`;
        customerList.appendChild(customerDiv);
    });
}

