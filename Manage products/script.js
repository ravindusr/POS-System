let products = [];
let editingIndex = null;

function renderProductList() {
    const productList = document.getElementById("productList");
    productList.innerHTML = ""; // Clear existing product list

    products.forEach((product, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${product.picture}" alt="Product Image" class="img-thumbnail" width="50"></td>
            <td>${product.name}</td>
            <td>${product.discription}</td>
            <td>${product.price}</td>
            <td class="actions">
                <button class="btn btn-sm btn-warning edit mt-3" onclick="editProduct(${index})">Update</button>
                <button class="btn btn-sm btn-danger delete mt-3" onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;
        productList.appendChild(row);
    });
}

document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const discription = document.getElementById("discription").value;
    const price = document.getElementById("price").value;
    const pictureInput = document.getElementById("picture");
    const picture = pictureInput.files.length > 0 ? URL.createObjectURL(pictureInput.files[0]) : null;

    if (editingIndex !== null) {
        // Update existing product
        products[editingIndex] = { name, discription, price, picture };
        editingIndex = null;
    } else {
        // Add new product
        products.push({ name, discription, price, picture });
    }

    document.getElementById("productForm").reset();
    renderProductList();
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product Added Succesfully !",
        showConfirmButton: false,
        timer: 1000
      });
});

function editProduct(index) {
    const product = products[index];
    document.getElementById("name").value = product.name;
    document.getElementById("discription").value = product.discription;
    document.getElementById("price").value = product.price;
    // Note: You can't re-select the existing picture in the file input. You might want to prompt the user to upload a new one.
    editingIndex = index;
}

function deleteProduct(index) {
    products.splice(index, 1);
    renderProductList();
}

renderProductList();
