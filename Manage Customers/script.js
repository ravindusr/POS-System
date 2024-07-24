let customers = [];
let editingIndex = null;

function renderCustomerList() {
    const customerList = document.getElementById("customerList");
    customerList.innerHTML = ""; 

    customers.forEach((customer, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td class="actions">
                <button class="edit" onclick="editCustomer(${index})">Update</button>
                <button class="delete" onclick="deleteCustomer(${index})">Delete</button>
            </td>
        `;
        customerList.appendChild(row);
    });
}

document.getElementById("customerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    if (editingIndex !== null) {
        customers[editingIndex] = { name, email, phone };
        editingIndex = null;
    } else {
        customers.push({ name, email, phone });
    }

    document.getElementById("customerForm").reset();
    renderCustomerList();
});


function editCustomer(index) {
    const customer = customers[index];
    document.getElementById("name").value = customer.name;
    document.getElementById("email").value = customer.email;
    document.getElementById("phone").value = customer.phone;
    editingIndex = index;
}


function deleteCustomer(index) {
    customers.splice(index, 1);
    renderCustomerList();
}


renderCustomerList();
