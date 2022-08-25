import { Typography } from '@mui/material';
import React from 'react';
import "../../styles/components/Sections/DeliverySection.scss";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartCheckout';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GiftIcon from '@mui/icons-material/CardGiftcard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

function DeliverySection() {
  return (
    <div className="delivery">
      <section className="highlights">
      <CircularHighlight icon={<ShoppingCartIcon/>}
      description="Free courier delivery for purchases over €40"
      />
      <CircularHighlight icon={<ApartmentIcon/>}
      description="Free local delivery"
      />
      <CircularHighlight icon={<GiftIcon/>}
      description="You'll receive coffee sample with purchases above 25€"
      />
      <CircularHighlight icon={<LocalShippingIcon/>}
      description="Delivery to nearby villages for 2€"
      />      
      </section>    
    </div>
  )
}

export default DeliverySection;



function CircularHighlight({icon,description}){
  return (
    <div className='circular_highlight'>
      {icon ? icon : null}
      <Typography>{description ? description : ""}</Typography>
    </div>
  )
}