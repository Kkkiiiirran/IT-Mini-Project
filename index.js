import { menuArray } from '/data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let arrayOfOrders = []

const renderHereEl = document.getElementById('renderHere')
const checkoutSectionEl = document.getElementById('checkoutSection')
const completeOrderBtnEl = document.getElementById('complete-orderBtn')
const paymentForm = document.getElementById('payment-form')
let total = 0

document.addEventListener('click', function (e) {
  if (e.target.dataset.id) {
    addItemToList(e.target.dataset.id)
    getFeed(e.target.dataset.id)

  }
  if (e.target.dataset.rem) {
    removeOrder(e.target.dataset.rem)
  }

  if(e.target.id === 'complete-orderBtn'){
    orderReadyNow()
  }
})

function renderHtml() {
  menuArray.forEach(function (item) {
    renderHereEl.innerHTML += `<div class="container">
                              <img src="${item.location}" width="100px">
                              <div>
                                <h2>${item.name}</h2>
                                <p>${item.ingredients}</p>
                                <h3>$${item.price}</h3>
                              </div>
                              <button class="addbtn" data-id ="${item.id}">+</button>
                            </div>
                             `
  })
}
renderHtml()

function addItemToList(orderId) {

  const targetItemObj = menuArray.filter(function (order) {
    return order.id === orderId
  })[0]
  total = total + targetItemObj.price
  arrayOfOrders.push(targetItemObj)
  arrayOfOrders = arrayOfOrders.map(it => {
        return {
            ...it,
            uuid: uuidv4()
        }
    })
  renderOrderList()
}

function getFeed(orderId) {
  let feed = ``

  const menu = menuArray.filter(function (item) {
    return item.id === orderId
  })[0]


  const { name, price, id } = menu

  feed += `
                <div class="one-item"> 
                    <div class="item">
                        <h2>${name}</h2>
                        <button class="remove-btn" data-rem ="${id}">remove</button>
                    </div>
                    <div class="item-price">
                        <h3>$${price}</h3>
                    </div>
                </div>
                `
  render1()


}

function render2() {
  array1.forEach(function (item) {
    checkoutSectionEl.innerHTML += item
  })
}


function render1() {
  console.log(`render ${document.getElementById('your-order')}`)
  const heading = `
                    <div class="container-one">
                        <h1>Your Order</h1>
                    </div>
                    `
  document.getElementById('your-order').innerHTML = heading
  TotalPrice()

}




function removeOrder(orderId) {
  // const targetItemObj = menuArray.filter(function(item){
  //   return item.id === orderId
  // })

  // // console.log(targetItemObj)
  // // console.log(arrayOfOrders)

  // let index = arrayOfOrders.findIndex(function(item){
  //   return item === orderId
  // })
  // console.log(index)
  // // let index = arrayOfOrders.findIndex(menu => menu.id === orderId)
  // // arrayOfOrders.splice(index, 1)
  // // renderOrderList()
  arrayOfOrders = arrayOfOrders.filter(it => it.uuid !== orderId)
  console.log(arrayOfOrders)
  renderOrderList()

}

function TotalPrice() {
  const output = `
                  <div class="total-order">
                      <h1>Total price:</h1>
                      <h2>$${total}</h2>
                  </div>
                  <button class="complete-order-btn" id="complete-orderBtn">Complete order</button>
                    `
  document.getElementById('last').innerHTML = output
}



function renderOrderList() {
  let items = ``
  total = 0
  arrayOfOrders.forEach(function (order) {
    total += order.price
    items += `
                <div class="one-item"> 
                    <div class="item">
                        <h2>${order.name}</h2>
                        <button class="remove-btn" data-rem="${order.uuid}">remove</button>
                    </div>
                    <div class="item-price">
                        <h3>$${order.price}</h3>
                    </div>
                </div>
                `

  })
  render1()

  checkoutSectionEl.innerHTML = items

}

function orderReadyNow(){
  modal.style.display = 'flex'
}

document.getElementById('modal-close-btn').addEventListener('click',function(){
  modal.style.display = 'none'
})

paymentForm.addEventListener('submit',function(e){
  e.preventDefault()
  const paymentFormData = new FormData(paymentForm)
  const yourName = paymentFormData.get('yourName')
  
    document.getElementById('lastRendering').innerHTML = 
        ` 
        <div class="order-display">
        <h2>Thanks for Ordering <span class="NAME">${yourName}</span> !</h2>
        <h3>Order is on the Way!</h3>
        <img src="https://media.giphy.com/media/MhZPXl9QD9s5est6Yi/giphy.gif" width="360px">
        </div>
        `
        modal.style.display = 'none'
  

})