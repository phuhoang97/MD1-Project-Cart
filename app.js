let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});

closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let products = [
  {
    id: 1,
    name: "Cơm Gà",
    image: "1.PNG",
    price: 120000,
  },
  {
    id: 2,
    name: "Gà Rán",
    image: "2.PNG",
    price: 120000,
  },
  {
    id: 3,
    name: "Salat Cá Hồi",
    image: "3.PNG",
    price: 220000,
  },
  {
    id: 4,
    name: "Súp bí đỏ",
    image: "4.PNG",
    price: 123000,
  },
  {
    id: 5,
    name: "Salat Rau",
    image: "5.PNG",
    price: 320000,
  },
  {
    id: 6,
    name: "Pizza",
    image: "6.PNG",
    price: 120000,
  },
];

let listCards = JSON.parse(localStorage.getItem("listCards")) || [];

function initApp() {
  for (let key = 0; key < products.length; key++) {
    let value = products[key];
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
    list.appendChild(newDiv);
  }
}

initApp();

function addToCard(key) {
  if (listCards[key] == null) {
    listCards[key] = { ...products[key], quantity: 1 };
  } else {
    listCards[key].quantity += 1;
  }
  saveToLocalStorage();
  reloadCard();
}

function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  for (let key = 0; key < listCards.length; key++) {
    let value = listCards[key];
    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
                </div>`;
      listCard.appendChild(newDiv);
      totalPrice += value.price * value.quantity;
      count += value.quantity;
    }
  }
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}

function changeQuantity(key, newQuantity) {
  if (newQuantity <= 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = newQuantity;
  }
  saveToLocalStorage();
  reloadCard();
}

reloadCard();

function saveToLocalStorage() {
  localStorage.setItem("listCards", JSON.stringify(listCards));
}

// Lưu trạng thái ban đầu vào localStorage khi tải trang lần đầu
if (!localStorage.getItem("listCards")) {
  saveToLocalStorage();
}
