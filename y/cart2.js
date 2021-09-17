let carts = document.querySelectorAll('.add-cart');
let purchaseButton = document.querySelectorAll('.purchase');

let products = [
	{
		name: 'Arabica Roast Coffee',
		tag: 'coffee1',
		price: 7,
		inCart: 0
	},
	{
		name: 'Italian Roast Coffee',
		tag: 'coffee2',
		price: 6,
		inCart: 0
	},
	{
		name: 'Espresso Roast Coffee',
		tag: 'coffee3',
		price: 8,
		inCart: 0
	}
]

for (let i = 0; i< carts.length; i++) {
	carts[i].addEventListener('click', () => {
		
		cartIndex(products[i]);
		totalCost(products[i]);
	})

}

function onLoadCartNumbers() {
	let productNumbers = localStorage.getItem('cartIndex');

	if (productNumbers){
		document.querySelector('.cart span').textContent = productNumbers;
	}
}

function cartIndex(product) {

	let productNumbers = localStorage.getItem('cartIndex');

	productNumbers = parseInt(productNumbers);

	if( productNumbers ) {
		localStorage.setItem('cartIndex', productNumbers + 1);
		document.querySelector('.cart span').textContent = productNumbers + 1;
	} else {
		localStorage.setItem('cartIndex', 1);
		document.querySelector('.cart span').textContent = 1;
	}

	setItems(product);

}

function setItems(product){
 	let cartItems = localStorage.getItem('productsInCart');
 	cartItems = JSON.parse(cartItems);

 	if(cartItems != null){

 		if(cartItems[product.tag] == undefined){
 			cartItems = {
 				...cartItems,
 				[product.tag]: product
 			}
 		}
 		cartItems[product.tag].inCart += 1;
 	} else {
 		product.inCart = 1;
		cartItems = {
 			[product.tag]: product
 		}

 	}

 	localStorage.setItem('productsInCart', JSON.stringify(cartItems));
 }

 function totalCost(product){
 	let cartCost = localStorage.getItem('totalCost');

 	if(cartCost != null){
 		cartCost = parseInt(cartCost);
 		localStorage.setItem('totalCost', cartCost + product.price);
 	}else{
 		localStorage.setItem('totalCost', product.price);
 	}
}
 function displayCart(){
 	let cartItems = localStorage.getItem('productsInCart');
 	cartItems = JSON.parse(cartItems);
 	let productContainer = document.querySelector('.cart-items');
 	let cartCost = localStorage.getItem('totalCost');

 	if(cartItems && productContainer){
 		productContainer.innerHTML = '';
 		Object.values(cartItems).map(item => {
 			productContainer.innerHTML += `
 			<div class="cart-row">
 	     <div class="cart-item cart-column">
                <img class="cart-item-image " src="${item.tag}.png"  width="100" height="100">
                <span class="item-title ">${item.name}</span>
		 </div>
				<span class="cart-price cart-item cart-column">$${item.price},00</span>

                <div class="cart-quantity cart-column">
                	<input class="cart-quantity-input" type="number" value="${item.inCart}">
                
                </div> `
 		});

 		productContainer.innerHTML += `
 
 		<div class="cart-total">
                <strong class="cart-total-title">Total</strong>
                <span class="cart-total-price">$${cartCost},00</span>
            </div>

 		`
 	}

 }

onLoadCartNumbers();
displayCart();