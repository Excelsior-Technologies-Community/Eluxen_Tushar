const ServiceCard = ({ service }) => {
  return (
    <div className="serviceCard">
      <img src={service.image} alt="" className="service-card-img" />

      <div className="overlay-gradient"></div>

      <div className="serviceOverlay">
        <span className="number">{service.number}</span>

        <div className="content">
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>

        <button className="arrow-btn">
          <img src="https://html.designingmedia.com/eluxen/assets/images/up-right-arrow.png" alt="" />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;