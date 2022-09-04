import commerce from "../lib/commerce";
export async function fetchCart() {
  return await commerce.cart
    .retrieve()
    .then((cart) => {
      return cart;
    })
    .catch((err) => console.log(err));
}

export async function addToCart(productId, quantity, variantId) {
  return await commerce.cart
    .add(productId, quantity, variantId)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}

export async function cartItems() {
  return await commerce.cart
    .contents()
    .then((items) => {
      return items;
    })
    .catch((err) => console.log(err));
}

export async function updateCart(lineId, quantity) {
  return await commerce.cart
    .update(lineId, { quantity })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}

export async function removeFromCart(lineId) {
  return await commerce.cart
    .remove(lineId)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}

export async function emptyCart() {
  return await commerce.cart
    .empty()
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}
