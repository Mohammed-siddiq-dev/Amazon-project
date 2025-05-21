import {cart, addToCart,} from '../data/cart.js'
import {product,loadProducts} from '../data/products.js'

loadProducts(renderProductsGrid);

function renderProductsGrid(){

let productshtml = ''

 const url = new URL(window.location.href);
 const search = url.searchParams.get('search');

 let filteredProducts = product;

 if(search){
  filteredProducts = product.filter((product)=>{
    let matchingKeyword = false;

    product.keywords.forEach((keyword)=>{
      if(keyword.toLowerCase().includes(search.toLowerCase())){
        matchingKeyword = true;
      }
    });

    return matchingKeyword ||product.name.toLowerCase().includes(search.toLowerCase());

  });
 }

 filteredProducts.forEach((product)=>{
  productshtml+= `
  <div class="product-container"> 
  <div class="product-image-container"><img class = "product-image" src="${product.image}"></div>

  <div class="product-name limit-text-to-2-lines">${product.name}</div>

  <div class="product-rating-container">
    <img class="product-rating-stars"
      src="${product.getStarsUrl()}">
    <div class="product-rating-count link-primary">${product.rating.count}</div>
  </div>

  <div class="product-price">
    ${product.getPrice()}
  </div>
   <div class="product-quantity-container">
            <select class = 'js-selector-${product.id}'>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

        ${product.extraInfoHtml()}  

          <div class="product-spacer"></div>

          <div class="added-to-cart added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-button" data-product-id="${product.id}">
            Add to Cart
          </button>
          </div>
  `

 })


document.querySelector('.products-grid')
.innerHTML = productshtml;

 function updateCartQuantity (){
  let cartQuantity = 0;

  cart.forEach((Item)=>{
    cartQuantity+=Item.quantity
  })

  document.querySelector('.cart-quantity')
  .innerHTML = cartQuantity
}

document.querySelectorAll('.js-add-button')
  .forEach((button)=>{
    button.addEventListener('click',()=>{
      const productId = button.dataset.productId;

const icon = document.querySelector(`.added-to-cart-${productId}`)

icon.classList.add('added-to-cart-visible')

 setTimeout(()=>{
  icon.classList.remove('added-to-cart-visible')
},1000)

     addToCart(productId);

      updateCartQuantity();

    })
  })

document.querySelector('.js-search-button')
.addEventListener('click',() =>{
  const search = document.querySelector('.js-search-bar')
  .value;
  window.location.href = `amazon.html?search=${search}`;
});

};


