import { Typography } from "@mui/material";
import React from "react";
import "../../styles/components/Sections/About.scss";
function About() {
  return (
    <section className="about-us-desc">
      <Typography variant="h2" gutterBottom>
        What are we about?
      </Typography>
      <Typography className="description">
        We are a couple of coffee enthusiasts from{" "}
        <span className="highlight">____</span> who have decided to bring their
        passion for coffee into your home.
        <br /> We love coffee as much as we love our hometown{" "}
        <span className="highlight">____</span>, which is why we decided on the
        name <span className="highlight">____</span>.
        <br />
        We emphasize <span className="highlight">freshness</span> and
        <span className="highlight">quality.</span> <br />
        That's why you can only find{" "}
        <span className="highlight">first-class</span> coffee from the best
        plantations here. <br />
        We roast each kilo of coffee with{" "}
        <span className="highlight">precision</span> and{" "}
        <span className="highlight">patience</span>.
        <br /> Our goal is to bring customers maximum enjoyment from drinking
        coffee. <br /> We adapt our offer to customers. On our shelves, in
        addition to the popular <span className="highlight">
          bittersweet
        </span>{" "}
        coffee, you will also find coffee with higher acidity, <br /> which is
        popular with an increasing number of coffee drinkers.
        <br /> We offer only fresh grains, which we roast for you several times
        a week.
        <br /> In addition to the e-shop, we are also located directly in{" "}
        <span className="highlight">____</span> , where we,{" "}
        <span className="highlight">____</span> and{" "}
        <span className="highlight">____</span> ,<br /> will welcome you with a
        smile to help you with your selection.
        <br /> We alternate the tasting selection{" "}
        <span className="highlight">every week</span> so that we can always try
        something new together.
        <br />
        We also deliver coffee directly to{" "}
        <span className="highlight">establishments</span> and{" "}
        <span className="highlight">cafes</span>, where we have prepared{" "}
        <span className="highlight">service </span>
        and <span className="highlight">training</span> for you.
      </Typography>
    </section>
  );
}

export default About;
