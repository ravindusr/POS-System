const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

document.addEventListener('DOMContentLoaded',() => {
  const addToCartBtn = document.querySelectorAll('.cssbuttons-io');
  const cartItemCount = document.getElementById('cart-count');
  const cartItemList = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total');
  const cartIcon = document.getElementById('cart-icon');
  const rsidebar = document.getElementById('r-sidebar');
  const closeButton = document.querySelector('.r-sidebar-close');
  const discountInput = document.getElementById('discount');

  let cartItems = [];
  let totalAmount = 0 ;

  addToCartBtn.forEach((button , index) => {
    button.addEventListener('click', ()=> {
      const item ={
        name: document.querySelectorAll('.card__info--title h3')[index].textContent,
        price: parseFloat(document.querySelectorAll('.card__info--price p')[index].textContent.slice(1)), // Added p for paragraph element
        quantity: 1 ,
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

  cartIcon.addEventListener('click',()=>{
    rsidebar.classList.toggle('open');
  });

  closeButton.addEventListener('click', ()=>{
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
  
});






