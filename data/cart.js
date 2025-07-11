import { product } from "../data/products.js";

export let cart;

loadFromStorage();

export function loadFromStorage (){
  cart = JSON.parse(localStorage.getItem('cart'))
  if(!cart){
   cart=[{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2,
    deliveryOptionsId:'1'
  },{
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1,
    deliveryOptionsId: '2'
  }];
  };
}

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
  
  let matchingItem;
  cart.forEach((Item)=>{
    if(productId === Item.productId){
      matchingItem = Item;
    }
  });

  const quantitySelector = document.querySelector(`.js-selector-${productId}`)

  const value = quantitySelector.value;
  const quantity = Number(value);

  if(matchingItem){
    matchingItem.quantity+=quantity;
  }else{
    cart.push({
      productId,
      quantity,
      deliveryOptionsId:'1'
    })
  }

  saveToStorage();
};

export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem)
    }
  });
  cart=newCart;

  saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;
  cart.forEach((Item)=>{
    if(productId === Item.productId){
      matchingItem = Item;
    }
  });

  matchingItem.quantity = newQuantity;
  saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionsId){
  let matchingItem;
  cart.forEach((Item)=>{
    if(productId === Item.productId){
      matchingItem = Item;
    }
  });
  matchingItem.deliveryOptionsId = deliveryOptionsId
  saveToStorage();
}

export function loadCart(fun){
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener('load',() =>{
  console.log(xhr.response);
  fun();
  });
  
  xhr.open('GET','https://supersimplebackend.dev/cart')
  xhr.send();
}
