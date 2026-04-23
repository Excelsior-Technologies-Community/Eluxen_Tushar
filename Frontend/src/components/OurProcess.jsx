import React from "react";
import '../assets/css/OurProcess.css'

const OurProcess = () => {
  return (
    <>
      <div className="our-process-wrapper">
        <div className="our-process-heading">
          <h1>Our Process</h1>
          <p>How It Works – Simple, <br />Transparent, Hassle-Free</p>
        </div>
        <div className="process-steps">
            <div className="step1">
                <div className="step-logo">
                    <img src="https://html.designingmedia.com/eluxen/assets/images/work-icon1.png" alt="" />
                    <span>01</span>

                </div>
                <div className="step-text">
                    <h1>Book Your Service</h1>
                    <p>Choose your detailing package and schedule a time that works best for you—online or by phone.</p>

                </div>


            </div>
            <div className="step1">
                <div className="step-logo step-logo-Blue">
                    <img src="https://html.designingmedia.com/eluxen/assets/images/work-icon2.png" alt="" />
                    <span>02</span>

                </div>
                <div className="step-text">
                    <h1>We Arrive or You Visit</h1>
                    <p>Depending on your preference, bring your vehicle to us or let our mobile team come to your location.</p>

                </div>


            </div>
            <div className="step1">
                <div className="step-logo">
                    <img src="https://html.designingmedia.com/eluxen/assets/images/work-icon3.png" alt="" />
                    <span>03</span>

                </div>
                <div className="step-text">
                    <h1>We Detail Your Car</h1>
                    <p>Our trained professionals get to work —inside and out—using premium products and meticulous techniques.</p>

                </div>


            </div>
            <div className="step1">
                <div className="step-logo step-logo-Blue">
                    <img src="https://html.designingmedia.com/eluxen/assets/images/work-icon4.png" alt="" />
                    <span>04</span>

                </div>
                <div className="step-text">
                    <h1>Enjoy the Results</h1>
                    <p>Drive away with a spotless, so your protected vehicle that looks and feels like new.</p>

                </div>


            </div>

        </div>
      </div>
    </>
  );
};

export default OurProcess;
