let cart = [];
let cartTotal = 0;
const cartDom = document.querySelector(".cart");
const addtocartbtnDom = document.querySelectorAll(
  '[data-action="add-to-cart"]'
);

addtocartbtnDom.forEach((addtocartbtnDom) => {
  addtocartbtnDom.addEventListener("click", () => {
    const productDom = addtocartbtnDom.parentNode.parentNode;
    const product = {
      img: productDom.querySelector(".product-img").getAttribute("src"),
      name: productDom.querySelector(".product-name").innerText,
      price: productDom.querySelector(".product-price").innerText,
      quantity: 1,
    };

    const IsinCart =
      cart.filter((cartItem) => cartItem.name === product.name).length > 0;
    if (IsinCart === false) {
      cartDom.insertAdjacentHTML(
        "beforeend",
        `
  <div class="d-flex flex-row shadow-sm card cart-items mt-2 mb-3 animated flipInX">
    <div class="p-2">
        <img src="${product.img}" alt="${product.name}" style="max-width: 50px;"/>
    </div>
    <div class="p-2 mt-3">
        <p class="text-info cart_item_name">${product.name}</p>
    </div>
    <div class="p-2 mt-3">
        <p class="text-success cart_item_price">${product.price}</p>
    </div>
    <div class="p-2 mt-3 ml-auto">
        <button class="btn badge badge-secondary" type="button" data-action="increase-item">&plus;
    </div>
    <div class="p-2 mt-3">
      <p class="text-success cart_item_quantity">${product.quantity}</p>
    </div>
    <div class="p-2 mt-3">
      <button class="btn badge badge-info" type="button" data-action="decrease-item">&minus;
    </div>
    <div class="p-2 mt-3">
      <button class="btn badge badge-danger" type="button" data-action="remove-item">&times;
    </div>
  </div> `
      );

      if (document.querySelector(".cart-footer") === null) {
        cartDom.insertAdjacentHTML(
          "afterend",
          `
      <div class="d-flex flex-row shadow-sm card cart-footer mt-2 mb-3 animated flipInX">
        <div class="p-2">
          <button class="btn badge-danger" type="button" data-action="clear-cart">Clear Cart
        </div>
        <div class="p-2 ml-auto">
          <button class="btn badge-dark" type="button" data-action="check-out"> Total : <span class="pay"></span> 
            
        </div>
      </div>`
        );
      }

      addtocartbtnDom.innerText = "In cart";
      addtocartbtnDom.disabled = true;
      cart.push(product);

      const cartItemsDom = cartDom.querySelectorAll(".cart-items");
      cartItemsDom.forEach((cartItemDom) => {
        if (
          cartItemDom.querySelector(".cart_item_name").innerText ===
          product.name
        ) {
          cartTotal +=
            parseInt(
              cartItemDom.querySelector(".cart_item_quantity").innerText
            ) *
            parseInt(cartItemDom.querySelector(".cart_item_price").innerText);
          document.querySelector(".pay").innerText = cartTotal + " DT.";

          // increase item in cart
          cartItemDom
            .querySelector('[data-action="increase-item"]')
            .addEventListener("click", () => {
              cart.forEach((cartItem) => {
                if (cartItem.name === product.name) {
                  cartItemDom.querySelector(".cart_item_quantity").innerText =
                    ++cartItem.quantity;
                  cartItemDom.querySelector(".cart_item_price").innerText =
                    parseInt(cartItem.quantity) * parseInt(cartItem.price) +
                    " DT.";
                  cartTotal += parseInt(cartItem.price);
                  document.querySelector(".pay").innerText = cartTotal + " DT.";
                }
              });
            });

          // decrease item in cart
          cartItemDom
            .querySelector('[data-action="decrease-item"]')
            .addEventListener("click", () => {
              cart.forEach((cartItem) => {
                if (cartItem.name === product.name) {
                  if (cartItem.quantity > 1) {
                    cartItemDom.querySelector(".cart_item_quantity").innerText =
                      --cartItem.quantity;
                    cartItemDom.querySelector(".cart_item_price").innerText =
                      parseInt(cartItem.quantity) * parseInt(cartItem.price) +
                      " DT.";
                    cartTotal -= parseInt(cartItem.price);
                    document.querySelector(".pay").innerText =
                      cartTotal + " DT.";
                  }
                }
              });
            });

          //remove item from cart
          cartItemDom
            .querySelector('[data-action="remove-item"]')
            .addEventListener("click", () => {
              cart.forEach((cartItem) => {
                if (cartItem.name === product.name) {
                  cartTotal -= parseInt(
                    cartItemDom.querySelector(".cart_item_price").innerText
                  );
                  document.querySelector(".pay").innerText = cartTotal + " DT.";
                  cartItemDom.remove();
                  cart = cart.filter(
                    (cartItem) => cartItem.name !== product.name
                  );
                  addtocartbtnDom.innerText = "Add to cart";
                  addtocartbtnDom.disabled = false;
                }
                if (cart.length < 1) {
                  document.querySelector(".cart-footer").remove();
                }
              });
            });

          //clear cart
          document
            .querySelector('[data-action="clear-cart"]')
            .addEventListener("click", () => {
              cartItemDom.remove();
              cart = [];
              cartTotal = 0;
              if (document.querySelector(".cart-footer") !== null) {
                document.querySelector(".cart-footer").remove();
              }
              addtocartbtnDom.innerText = "Add to cart";
              addtocartbtnDom.disabled = false;
            });

          document
            .querySelector('[data-action="check-out"]')
            .addEventListener("click", () => {
              if (document.getElementById("paypal-form") === null) {
                checkOut();
              }
            });
        }
      });
    }
  });
});

function animateImg(img) {
  img.classList.add("animated", "shake");
}

function normalImg(img) {
  img.classList.remove("animated", "shake");
}
var buttons = document.querySelectorAll(".heart");
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    button.classList.toggle("red");
  });
});