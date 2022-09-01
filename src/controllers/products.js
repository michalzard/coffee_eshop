import commerce from "../lib/commerce";
export async function fetchProducts() {
  return await commerce.products
    .list()
    .then((products) => {
      const { data } = products;
      return data;
    })
    .catch((err) => console.log(err));
}
