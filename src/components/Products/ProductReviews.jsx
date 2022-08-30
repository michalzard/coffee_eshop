import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Button } from '@mui/material';

function ProductReviews() {

  return (
    <section className="reviews">
    <div className="tabs">
    <Button variant="text" color="inherit"><HomeIcon/></Button>
    <Button variant="text" color="inherit">Reviews</Button>
    </div>

    </section>
  )
}

export default ProductReviews;