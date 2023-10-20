let basketArrayString = sessionStorage.getItem("basketArray");
let basketArray = JSON.parse(basketArrayString);
let basketItems = document.querySelector("#basketItems")
let basketTotal = document.createElement("div")
let checkoutTotal = document.querySelector("#checkout_total")

basketArray.forEach((element, index) => {
    addBasketItem(index);
});

function addBasketItem(index) {
    let itemDiv = document.createElement("div")
    itemDiv.className = "basketItem"
    let itemImg = document.createElement("img")
    itemImg.className = "itemImg"
    let itemName = document.createElement("p")
    itemName.className = "itemName"
    let itemQuantDiv = document.createElement("div")
    itemQuantDiv.className = "itemQuantDiv"
    let downQuant = document.createElement("button")
    downQuant.innerText = "-"
    downQuant.onclick = downFunction;
    let itemQuant = document.createElement("p")
    let upQuant = document.createElement("button")
    upQuant.innerText = "+"
    upQuant.onclick = upFunction;
    itemQuantDiv.append(downQuant, itemQuant, upQuant)
    let itemPrice = document.createElement("p")
    let removeButton = document.createElement("button")
    removeButton.innerText = "X"
    removeButton.className = "removeButton"
    removeButton.onclick = removeItemFunc;
    itemDiv.append(itemImg, itemName, itemQuantDiv, itemPrice, removeButton)
    basketItems.appendChild(itemDiv)

    itemName.innerText = (basketArray[index]["name"])
    itemQuant.innerText = "x" + (basketArray[index]["num"])
    itemPrice.innerText = (basketArray[index]["productPrice"])
    let str = (basketArray[index]["name"]);
    str = str.replace(/\s+/g, '_');
    let img_string = "featuredimgs/" + `${str}.webp`;
    itemImg.src = img_string;
    calculateBasketTotal();

    
}

function upFunction() {
    let parentDiv = this.parentNode
    let itemQuantityDiv = parentDiv.parentNode
    let description2 = itemQuantityDiv.querySelector(".itemName")
    //? description name of item to be incremented in value by one
    let productName2 = description2.innerText

    let index = basketArray.findIndex(product => product.name === `${productName2}`);
    if (basketArray[index]["num"] === 25){ return;}
    basketArray[index]["num"] +=1

    let value = basketArray[index]["num"]
    parentDiv.querySelector("p").innerText = `x ${value}`
    sessionStorage.setItem("basketArray", JSON.stringify(basketArray));
    calculateBasketTotal();
    console.log(basketArray)
}

function downFunction() {
    let parentDiv = this.parentNode
    let itemQuantityDiv = parentDiv.parentNode
    let description2 = itemQuantityDiv.querySelector(".itemName")
    //? description name of item to be incremented in value by one
    let productName2 = description2.innerText

    let index = basketArray.findIndex(product => product.name === `${productName2}`);
    if (basketArray[index]["num"] === 0){ return;}
    basketArray[index]["num"] -=1

    let value = basketArray[index]["num"]
    parentDiv.querySelector("p").innerText = `x ${value}`
    sessionStorage.setItem("basketArray", JSON.stringify(basketArray));
    calculateBasketTotal();
    console.log(basketArray)
}

function removeItemFunc() {
    let quantityButton = this.parentNode;
    let description = quantityButton.querySelector(".itemName").innerText
    let index = basketArray.findIndex(product => product.name === `${description}`);
    basketArray.splice(index, 1)
    quantityButton.remove();
    console.log(basketArray)
    calculateBasketTotal();
    sessionStorage.setItem("basketArray", JSON.stringify(basketArray));
}

function calculateBasketTotal() {
    basketItems.appendChild(basketTotal)
    let sum = 0;
    basketArray.forEach((elem) => {
    sum += ((elem)["num"] * (elem["productPrice"].slice(1)))
    })
    let sum2 = Number(sum.toFixed(2))
    basketTotal.innerHTML = `<p>Basket Total: £${sum2}</p>`;
    basketTotal.id = "basketTotal"
    checkoutTotal.innerText = "Total Cost: £" + (sum2 + 3.99).toFixed(2)
}

let list1 = document.getElementById("expiryYear");
let count = 0
for (let i = 23; i < 38; i++) {
    list1.options[count] = new Option("20" + `${i}`)
    count++;    
}

let list2 = document.getElementById("expiryDay");
let count2 = 0
for (let i = 1; i < 13; i++) {
    list2.options[count2] = new Option(`${i}`)
    count2++;    
}