import {cart, removeFromCart, updateDeliveryOption , updateQuantity,} from '../../data/cart.js';
import {product, getproduct} from '../../data/products.js';
import { formateCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption,} from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js';


export function renderOrderSummary (){

      let cartSummaryHTML='';

      cart.forEach((cartItem)=>{
        const productId = cartItem.productId;

        const matchingProduct = getproduct(productId);

        const deliveryOptionsId = cartItem.deliveryOptionsId;

        const deliveryOption = getDeliveryOption(deliveryOptionsId)

        const today = dayjs();
        const deliveryDate = today.add(
          deliveryOption.deliveryDays,
          'days'
        );
        const dateString = deliveryDate.format(
          'dddd, MMMM D'
        );

      cartSummaryHTML+=`
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                ${matchingProduct.getPrice()}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary
                js-update-link"data-product-id="${matchingProduct.id}">
                  Update
                </span>
                <input class="quantity-input">
                <span class="save-quantity-link link-primary"data-product-id="${matchingProduct.id}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link"data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>
            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHtml(matchingProduct, cartItem)}
            </div>
          </div>
        </div>
      `
      });



      function deliveryOptionsHtml (matchingProduct, cartItem){
        let html = '';
        deliveryOptions.forEach((deliveryOptions)=>{
        const today = dayjs();
        const deliveryDate = today.add(
          deliveryOptions.deliveryDays,
          'days'
        );
        const dateString = deliveryDate.format(
          'dddd, MMMM D'
        );

      const priceString = deliveryOptions.priceCents === 0 ? 'FREE':`$${formateCurrency(deliveryOptions.priceCents)} - `;

      const ischecked = deliveryOptions.id === cartItem.deliveryOptionsId;

      html+=`
        <div class="delivery-option js-delivery-option"
        data-product-Id="${matchingProduct.id}"
        data-delivery-options-Id="${deliveryOptions.id}">
                <input type="radio"
                ${ischecked ? 'checked' : '' } 
                  class="delivery-option-input"
                  name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    ${dateString}
                  </div>
                  <div class="delivery-option-price">
                    ${priceString} - Shipping
                  </div>
                </div>
              </div>
        `
      });
      return html;
      }

      document.querySelector('.js-order-summary')
      .innerHTML = cartSummaryHTML;

      document.querySelectorAll('.js-update-link')
      .forEach((link)=>{
        link.addEventListener('click',()=>{
          const productId = link.dataset.productId
          const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add("is-editing-quantity");
    });
  })

    document.querySelectorAll('.save-quantity-link')
   .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      )
    container.classList.remove("is-editing-quantity");
      
       const inputElement = container.querySelector(`.quantity-input`)
        if(inputElement.value > 0 && inputElement.value <1000){
        const newQuantity = Number(inputElement.value)
        updateQuantity(productId,newQuantity)
        renderOrderSummary();
        renderPaymentSummary();
        updateCartQuantity();
        location.reload()
        }else if (inputElement.value >= 1000){
          alert('too many items in the cart')
        }
        
        });
      });
    
        

      document.querySelectorAll('.js-delete-link')
      .forEach((link)=>{
        link.addEventListener('click',()=>{
          const productId = link.dataset.productId
          removeFromCart(productId);
          
          renderOrderSummary();

          renderPaymentSummary();
          updateCartQuantity();
        })
        
      })

      document.querySelectorAll('.js-delivery-option')
      .forEach((element) => {
        element.addEventListener('click', () => {
          const { productId, deliveryOptionsId } = element.dataset;
          updateDeliveryOption(productId,deliveryOptionsId);
          renderOrderSummary();
          renderPaymentSummary();
          updateCartQuantity();
        });
      });
    }
  
export function updateCartQuantity (){
  let cartQuantity = 0;
  cart.forEach((Item)=>{
    cartQuantity+=Item.quantity
  })

  document.querySelector('.total-items')
  .innerHTML = `${cartQuantity} items` 

  return cartQuantity;
}


