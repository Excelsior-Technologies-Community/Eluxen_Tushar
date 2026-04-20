const ServiceCard = ({ service }) => {
  return (
    <div className="serviceCard">
      <img src={service.image} alt="" className="service-card-img" />

      <div className="serviceOverlay">
        <span className="number">{service.number}</span>

        <h3>{service.title}</h3>
        <p>{service.description}</p>

        <button className="edit-btn">Edit</button>
      </div>
    </div>
  );
};

export default ServiceCard;