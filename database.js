import items from './items.json';
// import { addToCart } from './script.js';

const storeItemClone = document.querySelector('#store-item-clone');
const storeItemContainer = document.querySelector('[data-container]');
const imgClone = 'https://dummyimage.com/210x130';
const priceFormat = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD'
});
const addCartBtn = document.querySelector('[data-cart-btn]');

//function to export in the script for rendering the store
export function dataBaseSet(item) {
    document.addEventListener('click', (e) => {
        if (e.target.matches('[data-cart-btn]')) {
            const id = e.target.closest('[data-store-item-clone]').dataset.itemId;
            addToCart(parseInt(id));
            setItems();
        }
    });
    items.forEach(setStoreItem);
}

function setStoreItem(item) {
    const storeItem = storeItemClone.content.cloneNode(true);
    const itemContainer = storeItem.querySelector('[data-store-item-clone]');
    itemContainer.dataset.itemId = item.id;

    const itemName = storeItem.querySelector('[data-item-name]');
    itemName.innerText = item.name;

    const itemCategory = storeItem.querySelector('[data-item-category]');
    itemCategory.innerText = item.category;

    const itemImage = storeItem.querySelector('[data-item-image]');
    itemImage.src = `${imgClone}/${item.imageColor}/${item.imageColor}`;

    const itemPrice = storeItem.querySelector('[data-item-price]');
    itemPrice.innerText = priceFormat.format(item.priceCents / 100);

    storeItemContainer.appendChild(storeItem);
}

export let cart = [];

export function removeFromCart(id) {
    const itemInCart = cart.find((entry) => entry.id === id);
    cart = cart.filter((entry) => entry.id !== id);
    setItems();
    saveCart();
}

export function addToCart(id) {
    const itemInCart = cart.find((entry) => entry.id === id);
    if (itemInCart) {
        itemInCart.quantity++;
    } else {
        cart.push({ id: parseInt(id), quantity: 1 });
    }

    setItems();
    saveCart();
}

export function setItems() {
    if (cart.length === 0) {
        toggleCartOff();
    } else {
        toggleCartOn();
        setCartItems();
    }
}

const cardItemClone = document.querySelector('#card-item-clone');
const cardImg = 'https://dummyimage.com/210x130';
const cardItemContainer = document.querySelector('[data-card-container]');
const cardQuantity = document.querySelector('[data-card-quantity]');
const totalShown = document.querySelector('[data-total]');
const cartToggler = document.querySelector('[data-cart-toggler]');

function setCartItems() {
    cardItemContainer.innerHTML = '';
    cardQuantity.innerText = cart.length;

    const itemsTotal = cart.reduce((sum, entry) => {
        const item = items.find((i) => entry.id === i.id);
        return sum + item.priceCents * entry.quantity;
    }, 0);

    totalShown.innerText = priceFormat.format(itemsTotal / 100);

    cart.forEach((entry) => {
        const item = items.find((i) => entry.id === i.id);
        const cardItem = cardItemClone.content.cloneNode(true);
        const itemContainer = cardItem.querySelector('[data-card-item]');
        itemContainer.dataset.itemId = item.id;

        const cardItemName = cardItem.querySelector('[data-card-name]');
        cardItemName.innerText = item.name;

        const cardItemImage = cardItem.querySelector('[data-card-image]');
        cardItemImage.src = `${cardImg}/${item.imageColor}/${item.imageColor}`;

        if (entry.quantity > 1) {
            const quantity = cardItem.querySelector('[data-quantity]');
            quantity.innerText = `x${entry.quantity}`;
        }
        const cardItemPrice = cardItem.querySelector('[data-card-price]');
        cardItemPrice.innerText = priceFormat.format((item.priceCents * entry.quantity) / 100);

        cardItemContainer.appendChild(cardItem);
    });
}

function toggleCartOff() {
    cartToggler.classList.add('invisible');
    cardItemContainer.classList.add('invisble');
}
function toggleCartOn() {
    cartToggler.classList.remove('invisble');
}

const sessionKey = 'SHOPPING_CART-cart';
export function saveCart() {
    sessionStorage.setItem(sessionKey, JSON.stringify(cart));
}
export function loadCart() {
    const cart = sessionStorage.getItem(sessionKey);
    return JSON.parse(cart) || [];
}
