import React from "react";
import "../assets/css/ClientCard.css";

const ClientCard = () => {
  return (
    <div className="Clientcard">
      
      {/* avatars */}
      <div className="avatars">
        <img src="https://randomuser.me/api/portraits/men/1.jpg" />
        <img src="https://randomuser.me/api/portraits/women/2.jpg" />
        <img src="https://randomuser.me/api/portraits/men/3.jpg" />
        <img src="https://randomuser.me/api/portraits/women/4.jpg" />
      </div>

      {/* title */}
      <h1>4k+</h1>
      <p className="subtitle">Happy Satisfied Clients.</p>

      <hr />

      {/* bottom text */}
      <div className="bottom">
        <p>Easily make an appointment with us for car detailing.</p>

        <div className="arrow">
                  <img src="https://html.designingmedia.com/eluxen/assets/images/up-right-arrow.png" alt="" />

        </div>
      </div>

    </div>
  );
};

export default ClientCard;