import { orders} from "../data/orders.js";
import { formateCurrency } from "./utils/money.js";
import { getproduct,loadProductsFetch, product } from "../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {} from '../data/cart.js'

async function loadPage(){
  await loadProductsFetch();

let ordershtml = '';

  orders.forEach((order)=>{
  
  const orderTimeString = dayjs(order.orderTime).format('MMMM D');
  
    ordershtml += `
  <div class="orders-grid">
  <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTimeString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formateCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${productsListHtml(order)}
            </div>
            </div>
            `;
  });

  function productsListHtml(order){
   let productsListHtml = '';
   
   order.products.forEach((productDetails) =>{
    const products = getproduct(productDetails.productId);

    productsListHtml+=`
     <div class="product-image-container">
          <img src="${products.image}">
        </div>

    <div class="product-details">
              <div class="product-name">
                ${products.name}
              </div>
              <div class="product-delivery-date">
                Arriving on:${dayjs(productDetails.estimateDeliveryTime).format('MMMM D')}
              </div>
              <div class="product-quantity">
                Quantity: ${productDetails.quantity}
              </div>
              <button class="buy-again-button button-primary" onclick="location.href = 'http://127.0.0.1:5500/checkout.html'">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${products.id}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
            `;
   });

   return productsListHtml
  }

  document.querySelector('.js-orders-grid').innerHTML = ordershtml;
}

loadPage()