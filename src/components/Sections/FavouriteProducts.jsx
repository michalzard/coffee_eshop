import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material';
import ProductThumbnail from '../Products/ProductThumbnail';
import "../../styles/components/Products/global.scss";
import { store } from '../../controllers/store/store';

function FavouriteProducts() {
  const [thumbnails,setThumbnails] = useState([]);
  store.subscribe(()=>{
    const products = store.getState().productsState.products;
    setThumbnails(products);
  })

  return (
    <section className='favourites'>
    <Typography variant="h3" gutterBottom>Favourite Products</Typography>
    <section className="product-list">
      {
        thumbnails.map(thumbnail=>{return  <ProductThumbnail key={thumbnail.id} name={thumbnail.name} img={thumbnail.image.url} pricing={thumbnail.price.formatted_with_symbol}/>})
      }
   
    {/* <ProductThumbnail/>
    <ProductThumbnail/> */}
    </section>
    <Button variant="outlined" className="showAll">Show all favourites</Button>
    </section>
  )
}

export default FavouriteProducts;