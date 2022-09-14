import commerce from "../../lib/commerce";

export async function generateCheckoutId() {
  return await commerce.checkout
    .generateTokenFrom("cart", commerce.cart.id())
    .then((data) => {
      return data.id;
    });
}
/**
 * Order object has to specify line_items,
 */
export async function captureOrder(checkoutTokenId, order) {
  return await commerce.checkout
    .capture(checkoutTokenId, order)
    .then((receipt) => {
      return receipt;
    })
    //expecting 402 merchant disabled, 404 not_found when token is incorrect,422 if data was invalid
    .catch((err) => console.log(err));
}

export async function getShippingCountries(checkoutTokenId) {
  return await commerce.services
    .localeListShippingCountries(checkoutTokenId)
    .then((data) => {
      return data.countries;
    })
    .catch((err) => console.log(err));
}

export async function getShippingSubdivisions(checkoutTokenId, countryCode) {
  return await commerce.services
    .localeListShippingSubdivisions(checkoutTokenId, countryCode)
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
}

export async function getShippingOptions(checkoutTokenId, shippingData) {
  return await commerce.checkout
    .getShippingOptions(checkoutTokenId, shippingData)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}