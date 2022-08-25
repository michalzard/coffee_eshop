import { Button, Typography } from '@mui/material';
import React from 'react'
import ProductThumbnail from '../Products/ProductThumbnail';
import "../../styles/components/Products/global.scss";

function LatestProducts() {
  return (
    <section className='latest'>
    <Typography variant="h3">Latest Products</Typography>
    <section className="product-list">
    <ProductThumbnail/>
    <ProductThumbnail/>
    <ProductThumbnail/>
    </section>
    <Button variant="outlined" className="showAll">Show all products</Button>
    </section>
  )
}

export default LatestProducts;