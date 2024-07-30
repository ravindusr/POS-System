const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

document.addEventListener('DOMContentLoaded', () => {
  const addToCartBtn = document.querySelectorAll('.cssbuttons-io');
  const cartItemCount = document.getElementById('cart-count');
  const cartItemList = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total');
  const cartIcon = document.getElementById('cart-icon');
  const rsidebar = document.getElementById('r-sidebar');
  const closeButton = document.querySelector('.r-sidebar-close');
  const discountInput = document.getElementById('discount');
  const checkoutButton = document.getElementById('checkout-button');
  const popup = document.getElementById('checkout-popup');
  const checkoutCloseButton = document.querySelector('.close-button');
  const form = document.getElementById('checkout-form');
  const receiptButton = document.getElementById('receipt-button');

  let cartItems = [];
  let totalAmount = 0;

  addToCartBtn.forEach((button, index) => {
    button.addEventListener('click', () => {
      const item = {
        name: document.querySelectorAll('.card__info--title h3')[index].textContent,
        price: parseFloat(document.querySelectorAll('.card__info--price p')[index].textContent.slice(1)), // Added p for paragraph element
        quantity: 1,
      };

      const existingItem = cartItems.find(
        (cartItem) => cartItem.name === item.name
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cartItems.push(item);
      }

      totalAmount += item.price;

      updateCart();
    });
  });

  function updateCart() {
    updateCartItemCount(cartItems.length);
    updateCartItemList();
    updateCartTotal();
  }

  function updateCartItemCount(count) {
    cartItemCount.textContent = count;
  }

  function updateCartItemList() {
    cartItemList.innerHTML = '';
    cartItems.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('individual-cart-items');
      cartItem.innerHTML = `
        <span>(${item.quantity}x) ${item.name}</span>
        <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span> <!-- Fixed template string syntax -->
        <button class="remove-btn" data-index="${index}"><i class="ph ph-trash"></i></button>
      `;

      cartItemList.appendChild(cartItem);
    });

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const index = event.currentTarget.dataset.index;
        removeItemFromCart(index);
      });
    });
  }

  function removeItemFromCart(index) {
    const removedItem = cartItems.splice(index, 1)[0];
    totalAmount -= removedItem.price * removedItem.quantity;
    updateCart();
  }

  function updateCartTotal() {
    cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
  }

  cartIcon.addEventListener('click', () => {
    rsidebar.classList.toggle('open');
  });

  closeButton.addEventListener('click', () => {
    rsidebar.classList.remove('open');
  });

  function applyDiscount() {
    const discount = parseFloat(discountInput.value);
    const totalElement = document.getElementById('totalAmount');
    const currentTotal = totalAmount;

    if (isNaN(discount) || discount < 0 || discount > 100) {
      if (discountInput.value.trim() === '') {
        totalElement.textContent = `$${totalAmount.toFixed(2)}`;
      } else {
        alert('Please enter a valid discount percentage (0-100)');
      }
      discountInput.focus();
      return;
    }

    const discountedTotal = currentTotal - (currentTotal * discount / 100);

    totalElement.textContent = `$${discountedTotal.toFixed(2)}`;

    discountInput.addEventListener('input', () => {
      if (discountInput.value === '') {
        totalElement.textContent = `$${totalAmount.toFixed(2)}`;
      }
    });
  }
  discountInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      applyDiscount();
    }
  });


  checkoutButton.addEventListener('click', function () {
    popup.style.display = 'block';
  });
  checkoutCloseButton.addEventListener('click', function () {
    popup.style.display = 'none';
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Order Placed Succesfully !",
      showConfirmButton: false,
      timer: 1000
    });
    popup.style.display = 'none';
    clearCart();
  });

  function clearCart() {
    cartItems = [];
    totalAmount = 0;
    updateCart();
  }

  function generateReceipt() {
    if (cartItems.length === 0) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Your Cart is empty !",
            showConfirmButton: false,
            timer: 1000
        });
        return;
    }

    console.log('Generating receipt with items:', cartItems);

    // Generate unique order ID
    const orderId = Math.floor(Math.random() * 1000000);

  
    const customerName = document.getElementById('cusname').value;
    const customerAddress = document.getElementById('cusaddress').value;
    const customerEmail = document.getElementById('cusemail').value;
    const customerPhone = document.getElementById('cusphone').value;


    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    const receiptWindow = window.open('', '', 'width=600,height=600');
    receiptWindow.document.write(`
        <html>
        <head>
            <style>
                #invoice-POS {
                    box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
                    padding: 2mm;
                    margin: 0 auto;
                    width: 150mm;
                    height: 200mm;
                    background: #FFF;
                }
                ::selection { background: #f31544; color: #FFF; }
                ::moz-selection { background: #f31544; color: #FFF; }
                h1 { font-size: 1.5em; color: #222; }
                h2 { font-size: .9em; }
                h3 { font-size: 1.2em; font-weight: 300; line-height: 2em; }
                p { font-size: .7em; color: #666; line-height: 1.2em; }
                #top, #mid, #bot { border-bottom: 1px solid #EEE; }
                #top { min-height: 100px; }
                #mid { min-height: 80px; }
                #bot { min-height: 50px; }
                .logo { height: 60px; width: 60px; background: url(https://cdn-icons-png.flaticon.com/512/5787/5787016.png) no-repeat; background-size: 60px 60px; }
                .info { display: block; margin-left: 0; }
                .title { float: right; }
                .title p { text-align: right; }
                table { width: 100%; border-collapse: collapse; }
                td { padding: 5px 0; }
                .tabletitle { padding: 5px; font-size: .5em; background: #EEE; }
                .service { border-bottom: 1px solid #EEE; }
                .item { width: 24mm; }
                .itemtext { font-size: .5em; }
                #legalcopy { margin-top: 5mm; }
                .receipt-info { margin-bottom: 10px; }
            </style>
        </head>
        <body>
            <div id="invoice-POS">
                <center id="top">
                    <div class="logo"></div>
                    <div class="info">
                        <h2>MOS-Buggers</h2>
                    </div>
                </center>

                <!-- Order ID and Date/Time -->
                <div class="receipt-info">
                    <p>Order ID: <strong>${orderId}</strong></p>
                    <p>Date: <strong>${date}</strong></p>
                    <p>Time: <strong>${time}</strong></p>
                </div>
                
                <div id="mid">
                    <div class="info">
                        <h2>Customer Info</h2>
                        <p>
                            Name    : ${customerName}<br>
                            Address : ${customerAddress}<br>
                            Email   : ${customerEmail}<br>
                            Phone   : ${customerPhone}<br>
                        </p>
                    </div>
                </div>
                
                <div id="bot">
                    <div id="table">
                        <table>
                            <tr class="tabletitle">
                                <td class="item"><h2>Item</h2></td>
                                <td class="Hours"><h2>Qty</h2></td>
                                <td class="Rate"><h2>Sub Total</h2></td>
                            </tr>
    `);

    let totalAmount = 0;
    cartItems.forEach((item) => {
        const subTotal = (item.price * item.quantity).toFixed(2);
        totalAmount += parseFloat(subTotal);
        receiptWindow.document.write(`
            <tr class="service">
                <td class="tableitem"><p class="itemtext">${item.name}</p></td>
                <td class="tableitem"><p class="itemtext">${item.quantity}</p></td>
                <td class="tableitem"><p class="itemtext">$${subTotal}</p></td>
            </tr>
        `);
    });

    const discountRate = parseFloat(document.getElementById('discount').value) || 0;
    const discountAmount = totalAmount * (discountRate / 100);
    const finalTotal = totalAmount - discountAmount;

    receiptWindow.document.write(`
                            <tr class="tabletitle">
                                <td></td>
                                <td class="Rate"><h2>Discount (${discountRate}%)</h2></td>
                                <td class="payment"><h2>-$${discountAmount.toFixed(2)}</h2></td>
                            </tr>
                            <tr class="tabletitle">
                                <td></td>
                                <td class="Rate"><h2>Total</h2></td>
                                <td class="payment"><h2>$${finalTotal.toFixed(2)}</h2></td>
                            </tr>
                        </table>
                    </div>
                    
                    <div id="legalcopy">
                        <p class="legal"><strong>Thank you for shopping with us!</strong></p>
                    </div>
                </div>
                <button onclick="window.print()">Print Receipt</button>
                <button onclick="window.close()" style="margin-top: 10px;">Close</button>
            </div>
            
        </body>
        </html>
    `);

    receiptWindow.document.close();
    clearCart();
}


if (receiptButton) {
    receiptButton.addEventListener('click', generateReceipt);
}

});
