let addToCartButtons = document.querySelectorAll(".add");
let cartAmount = document.querySelector("#cartAmount");
let cartLogo = document.querySelector("#cartLogo");
const basket = document.querySelector("#basket");
cartAmount.value = 0;
let productArray = [];
let productObject = {};
let quantity;
let productInBasket;
let cartAmountVal = 0;
let basketTotalAmountVal = 0;

let basketTotal = document.createElement("div");
let checkoutButton = document.createElement("button");
checkoutButton.innerText = "Checkout"
checkoutButton.onclick = checkoutButtonFunc;
basketTotal.id = "basketTotal";

addToCartButtons.forEach(function(elem) {
    elem.addEventListener("click", function() {         //? Adds event listeners to all "add to cart" buttons
        let closest = elem.closest(".description")   //? Locates closest parent element to button that is presses containing all product descriptions
        let productDetails = closest.getElementsByTagName("*") //? Creates HTML collection of all elements within clicked products description including price and image
        

        let productInBasket = document.createElement('ul')  //? This section creates an unordered list element to contain details for each basket item added.
        let productImg = (productDetails[0]).src           //? Product image, name and price are extracted from HTML collection
        let productName = (productDetails[1]).innerText
        let productPrice = (productDetails[2]).innerText
        productInBasket.classList.add("basketItem")
        
        
        if (productArray.some(product => product.name === `${productName}`)){
            
            let index = productArray.findIndex(product => product.name === `${productName}`);
            productArray[index]["num"] +=1
            let quantity = ( productArray[index]["num"])

            let x = basket.getElementsByTagName("ul")[index]
            let y = x.getElementsByTagName("li")[2]
            let z = y.querySelector(".quantityButton")
            let a = z.querySelector("p")
            a.innerText = `x ${quantity}`

            cartAmountFunction();
            calculateBasketTotal();
            return quantity;
        } 
        
        else {
            let obj = {
                "name": `${productName}`,
                "num": 1,
                "productPrice": `${productPrice}`
            }

            basket.appendChild(productInBasket);

            let detail0 = document.createElement("img")        //? This section populates above unordered list with each of the required details for a basket item
            detail0.src = productImg                           //? Each item is added as a list item
            productInBasket.appendChild(detail0)
            
            let detail1 = document.createElement("li")
            detail1.appendChild(document.createTextNode(productName))
            detail1.className = "productInBasketName"
            productInBasket.appendChild(detail1);
    
            let detail2 = document.createElement("li")
            detail2.appendChild(document.createTextNode(`Price: ${productPrice}`))
            detail2.className = "prodPrice"
            productInBasket.appendChild(detail2);

            productArray.push(obj)


            let index = productArray.findIndex(product => product.name === `${productName}`);
        
            let quantity = ( productArray[index]["num"])          
            let detail3 = document.createElement("li")

            let quantityButton = document.createElement("div")
            quantityButton.className = "quantityButton"
            let downQuant = document.createElement("button")
            let quantValue = document.createElement("p")
            let upQuant = document.createElement("button")
            downQuant.onclick = downFunction;
            upQuant.onclick = upFunction;
            downQuant.innerText = "-";
            quantValue.innerText = " x 1";
            upQuant.innerText = "+";
            

            detail3.className = "itemQuantity"
            productInBasket.appendChild(detail3);
            detail3.appendChild(quantityButton);
            quantityButton.appendChild(downQuant);
            quantityButton.appendChild(quantValue);
            quantityButton.appendChild(upQuant);

            let removeItemButton = document.createElement("button")
            removeItemButton.innerText = "X";
            removeItemButton.className = "removeItemButton"
            removeItemButton.onclick = removeItemFunc;
            let itemQuantDiv = productInBasket.querySelector(".itemQuantity")           
            itemQuantDiv.appendChild(removeItemButton)



            cartLogo.style.color = "green"
            cartLogo.style.cursor = "pointer"
            cartAmountFunction();
            calculateBasketTotal();
            
            

                      
        }

    })




})

function upFunction() {
    let parentDiv = this.parentNode
    let itemQuantityDiv = parentDiv.parentNode
    let productInBasket2 = itemQuantityDiv.parentNode
    let description2 = productInBasket2.querySelector(".productInBasketName")
    //? description name of item to be incremented in value by one
    let productName2 = description2.innerText

    let index = productArray.findIndex(product => product.name === `${productName2}`);
    if (productArray[index]["num"] === 25){ return;}
    productArray[index]["num"] +=1

    let value = productArray[index]["num"]
    parentDiv.querySelector("p").innerText = `x ${value}`
    cartAmountFunction();
    calculateBasketTotal();
    sessionStorage.setItem("basketArray", JSON.stringify(productArray));
    


}
function downFunction() {
    let parentDiv = this.parentNode
    let itemQuantityDiv = parentDiv.parentNode
    let productInBasket2 = itemQuantityDiv.parentNode
    let description2 = productInBasket2.querySelector(".productInBasketName")
    //? description name of item to be incremented in value by one
    let productName2 = description2.innerText

    let index = productArray.findIndex(product => product.name === `${productName2}`);
    if (productArray[index]["num"] === 0){ return;}
    productArray[index]["num"] -=1

    let value = productArray[index]["num"]
    parentDiv.querySelector("p").innerText = `x ${value}`
    cartAmountFunction();
    calculateBasketTotal();
    sessionStorage.setItem("basketArray", JSON.stringify(productArray));
}

function cartAmountFunction() {
    let sum = 0;
    productArray.forEach((elem) => {
        sum += (elem["num"])
    })
    cartAmountVal = sum;
    cartAmount.innerText = cartAmountVal;
}

function calculateBasketTotal() {
    basket.appendChild(basketTotal)
    let sum = 0;
    productArray.forEach((elem) => {
    sum += ((elem)["num"] * (elem["productPrice"].slice(1)))
    })
    let sum2 = sum.toFixed(2)
    basketTotal.innerHTML = `<p>Basket Total: £${sum2}</p>`;
    basketTotal.appendChild(checkoutButton);
}

function removeItemFunc() {
    let quantityButton = this.parentNode;
    let basketItem3 = quantityButton.parentNode
    let description = basketItem3.querySelector(".productInBasketName").innerText
    let index = productArray.findIndex(product => product.name === `${description}`);
    productArray.splice(index, 1)
    cartAmountFunction();
    calculateBasketTotal();
    basketItem3.remove();
    let basket = document.querySelector("#basket")
    if (basket.childNodes.length === 2) {
        let basketTotal = document.querySelector("#basketTotal")
        basketTotal.remove();
    }
    sessionStorage.setItem("basketArray", JSON.stringify(productArray));
}

function checkoutButtonFunc() {
    if (cartAmount.innerText > 0) {
        sessionStorage.setItem("basketArray", JSON.stringify(productArray));
        window.location.href="checkout.html"
    }
    
}

function checkBasket() {
    if (window.sessionStorage.length > 1) {
            let basketArrayString = sessionStorage.getItem("basketArray");
            let basketArray = JSON.parse(basketArrayString);
            
            basketArray.forEach((element, index) => {
                let productInBasket = document.createElement('ul');
                productInBasket.classList.add("basketItem");
                
                let itemImg = document.createElement("img")
                let prodName = document.createElement("li")
                prodName.className = "productInBasketName";
                let prodPrice = document.createElement("li")
                prodPrice.className = "prodPrice"
                prodPrice.innerText = "Price:" + basketArray[index]["productPrice"]
                // adds item quantity up and down and button
                let itemQuant = document.createElement("li")
                itemQuant.className = "itemQuantity";
                let itemQuantDiv = document.createElement("div")
                itemQuantDiv.className = "quantityButton"
                itemQuant.appendChild(itemQuantDiv)
                let downQuant = document.createElement("button")
                downQuant.innerText = "-"
                downQuant.onclick = downFunction;
                let itemQuantVal = document.createElement("p")
                itemQuantVal.innerText = "x" + basketArray[index]["num"];
                let upQuant = document.createElement("button");
                upQuant.innerText = "+";
                upQuant.onclick = upFunction;
                let removeButton = document.createElement("button")
                removeButton.innerText = "X"
                removeButton.className = "removeItemButton"
                removeButton.onclick = removeItemFunc;
                itemQuantDiv.append(downQuant, itemQuantVal, upQuant)
                itemQuant.append(removeButton)
                productInBasket.append(itemImg, prodName, prodPrice, itemQuant)
    
    
                prodName.innerText = (basketArray[index]["name"]);
                let str = (basketArray[index]["name"]);
                str = str.replace(/\s+/g, '_');
                let img_string = "featuredimgs/" + `${str}.webp`;
                itemImg.src = img_string;
    
    
    
                let basket = document.querySelector("#basket")
                basket.appendChild(productInBasket)
                
                productArray = basketArray;
                console.log(productArray)

                cartAmountFunction()
                calculateBasketTotal();
                cartLogo.style.color = "green"
                cartLogo.style.cursor = "pointer"
                

                
            })

    
        }
        
    }
window.onload = checkBasket();


     










