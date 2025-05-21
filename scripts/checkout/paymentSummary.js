import {cart} from '../../data/cart.js'
import { getproduct } from '../../data/products.js'
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formateCurrency } from '../utils/money.js';
import { addOrder } from '../../data/orders.js';
import { updateCartQuantity } from './orderSummary.js';

const value = updateCartQuantity();
console.log(value)

export function renderPaymentSummary () {
 let productPriceCents = 0;
 let ShippingPriceCents = 0;

  cart.forEach((cartItem) => {
  const product = getproduct(cartItem.productId);
  productPriceCents += product.priceCents * cartItem.quantity;

  const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);
 ShippingPriceCents += deliveryOption.priceCents
 });

 const totalBeforeTaxCents = productPriceCents+ShippingPriceCents;
 const taxCents = totalBeforeTaxCents * 0.1;
 const totalcents = totalBeforeTaxCents + taxCents;

 const PaymentSummaryhtml = `
<div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${value}):</div>
      <div class="payment-summary-money">$${formateCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formateCurrency(ShippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formateCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formateCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formateCurrency(totalcents)}</div>
    </div>

    <button class="place-order-button button-primary 
    js-place-order">
      Place your order
    </button>
 `;

 document.querySelector('.js-payment-summary')
 .innerHTML = PaymentSummaryhtml;

 document.querySelector('.js-place-order')
 .addEventListener('click',async () => {
  try{
const response = await fetch('https://supersimplebackend.dev/orders', {
    method:'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      cart
    })
  });

  const order = await response.json()
  addOrder(order);

  }catch(error){
  console.log('Unexpected error. Try again later.')  
  }
  window.location.href  = 'orders.html';
 });

}
