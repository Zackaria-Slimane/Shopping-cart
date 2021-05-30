// rendering the store items after removing the hard coded ones
import { dataBaseSet, setItems, removeFromCart, saveCart, loadCart } from './database.js';

dataBaseSet();

const cartBtn = document.querySelector('[data-cart-toggler]');
const cartCard = document.querySelector('[data-cart-card]');

cartBtn.addEventListener('click', (e) => {
    cartCard.classList.toggle('invisible');
});

document.addEventListener('click', (e) => {
    if (e.target.matches('[data-remove-from-cart]')) {
        const id = e.target.closest('[data-card-item]').dataset.itemId;
        removeFromCart(parseInt(id));
        cart = loadcart();
        setItems();
    }
});



