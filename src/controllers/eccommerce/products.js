import commerce from "../../lib/commerce";
export async function fetchAllProducts(productLimit) {
  try {
    return await commerce.products
      .list({ limit: productLimit })
      .then((products) => {
        const { data } = products;
        return data;
      })
      .catch((err) => console.log(err));
  } catch (err) {
    const {message} = err.response.data;
    return message;
  }
}
