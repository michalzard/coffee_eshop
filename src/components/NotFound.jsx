import { Button, Typography } from '@mui/material';
import React from 'react'
import NotFoundIcon from "../assets/not_found.svg";
import "../styles/components/NotFound.scss";
import {useNavigate} from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
  return (
    <section className="page_notfound">
    <Typography variant="h3" gutterBottom>Page not found.</Typography>
    <Typography variant="subtitle1" gutterBottom>Oh,we can't seem to find the page you're looking for.</Typography>
    <Button variant="outlined" onClick={()=>{navigate("/")}} size="large">Go back</Button>    
    <img src={NotFoundIcon} alt="Page not found"/>
    </section>
  )
}

export default NotFound;