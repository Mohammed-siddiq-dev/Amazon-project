import { renderOrderSummary, updateCartQuantity } from "./checkout/orderSummary.js";
import { renderPaymentSummary} from "./checkout/paymentSummary.js";
import {  loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

async function loadPage () {
  try {
    //throw 'error1';

    await loadProductsFetch();

  await new Promise((resolve) => {
    loadCart(() =>{
      resolve();
    });
    });

  } catch (error){
    console.log('unexpected error. Please try again later .')
  }
  

  renderOrderSummary();
  renderPaymentSummary();
  updateCartQuantity();
}

loadPage();

/*
Promise.all([
  loadProductsFetch (),
  new Promise((resolve) => {
    loadCart(() =>{
      resolve();
    });
    })

]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});*/

/*
new Promise ((resolve) => {
  loadProducts(() => {
    resolve('value');
  });

}).then((value) =>{
  return new Promise((resolve) => {
    loadCart(() =>{
      resolve();
    });
    });

  }).then(() => {
      renderOrderSummary();
      renderPaymentSummary();
  })*/



/*
loadProducts(() => {
  loadCart(() => {
  renderPaymentSummary();
  renderOrderSummary();
  });
});*/
