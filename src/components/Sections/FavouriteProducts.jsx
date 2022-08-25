import React from 'react'
import { Button, Typography } from '@mui/material';
import ProductThumbnail from '../Products/ProductThumbnail';
import "../../styles/components/Products/global.scss";

function FavouriteProducts() {
  return (
    <section className='favourites'>
    <Typography variant="h3" gutterBottom>Favourite Products</Typography>
    <section className="product-list">
    <ProductThumbnail/>
    <ProductThumbnail/>
    <ProductThumbnail/>
    </section>
    <Button variant="outlined" className="showAll">Show all favourites</Button>
    </section>
  )
}

export default FavouriteProducts;