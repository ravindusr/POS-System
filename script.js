const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

document.addEventListener('DOMContentLoaded',() => {
  const addToCartBtn = document.querySelectorAll('.cssbuttons-io');
  const cartItemCount = document.getElementById('cart-count');
  const cartItemList = document.querySelectorAll('.cart-items');
  const cartTotal = document.querySelectorAll('.cart-total');
  const cartIcon = document.getElementById('cart-icon');
  const rsidebar = document.getElementById('r-sidebar');
  const closeButton = document.querySelector('.r-sidebar-close');

  let cartItems = [];
  let totalAmount = 0 ;

  addToCartBtn.forEach((button , index) => {
    button.addEventListener('click', ()=> {
      const item ={
          name: document.querySelectorAll('.car__info--title h3')[index].textContent,
          price: parseFloat(document.querySelectorAll('.card__info--price p')[index].textContent.slice(1)),
          quantity: 1 ,
      };

      const exitingItem = cartItems.find(
        (cartItems) => cartItems.name === item.name,
      );
      if(exitingItem){
        exitingItem.quantity++;
      }else {
        cartItems.push(item);
      }

      totalAmount += item.price

      updateCart();
    });
  });

  function updateCart(){
    updateCartItemCount(cartItems.length);
    updateCartItemList();
    updateCart();
  }

  function updateCartItemCount(count) {
    cartItemCount.textContent = count ;
  }
  
  function updateCartItemList() {
    cartItemList.innerHTML = '';
    cartItems.forEach((item, index)=> {
      const cartItem =document.createElement('div');
      cartItem.classList.add('cart-items','individual-cart-items');
      cartItem.innerHTML = `
      <span>(${item.quantity}x) ${item.name}</span>
      <span class="cart-item-price"> $${item.price}x)${item.quantity}.toFixed(2,)}
      <button class="remove-btn" data-index="${index}"><i class="ph ph-trash"></i></button>
      </span>
      `;

      cartItemList.append(cartItem);
    });

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach((button)=> {
      button.addEventListener('click',(event)=>{
        const index =event.target.dataset.index;
        removeItemsFromCart(index);
      });
    });
  }

  function removeItemsFromCart(index){
    const removedItem = cartItems.splice(index, 1)[0];
    totalAmount -= removedItem.price * removedItem.quantity;
    updateCart();
  }

  function updateCart(){
    cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
  }

  cartIcon.addEventListener('click',()=>{
    rsidebar.classList.toggle('open');
  });

  
  closeButton.addEventListener('click', ()=>{
    rsidebar.classList.remove('open');
  });
});