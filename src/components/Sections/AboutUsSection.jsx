import { Button, Typography } from "@mui/material";
import React from "react";
import "../../styles/components/Sections/AboutSection.scss";
import {Link} from "react-router-dom";

function AboutUsSection() {
  return (
    <div className="about-us">
      <img src="broken" alt="broken"/>
      <section>
        <Typography gutterBottom>
          We bring you coffee from different corners of the world. We use a
          roaster for roasting beans, which has a tradition since 1949.
        </Typography>
        <Typography gutterBottom>
          Thanks to this roaster, first-class green beans and a trained roaster,
          we can provide you with coffee of stable quality and excellent taste.
        </Typography>
        <Typography gutterBottom>
          We mainly roast 100% Arabica, but we also offer 100% Robusta and
          various blends.
        </Typography>
      </section>
      <Link to="/about-us"><Button variant="outlined">Read more</Button></Link>
    </div>
  );
}

export default AboutUsSection;
