import '../assets/css/BestServices.css'
import ContactButton from './ContactButton'
import { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import axios from 'axios';

const BestServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/services")
      .then(res => setServices(res.data))
      .catch(err => console.log(err));
  }, []);
 
  
  return (
    <>
      <div className='best-services'>
        <span className='Bs-spn'>Best Services</span>
        <div className='servicesHeading'>
          <div className='servicesHeading-left'>
            <h1>Our Best Car <br />Detailing Services.</h1>
            <p>Explore our complete range of detailing solutions,designed to restore, protect, and enhance your vehicle's finish. Experience unmatched quality, care, and attention in every detail.</p>
          </div>
          <div className='servicesHeading-btn'>
            <ContactButton text="View All" />
          </div>
        </div>
        <div className="services-container">
          {services.map((item, index) => (
            <ServiceCard key={index} service={item} />
          ))}
        </div>
      </div>
    </>
  )
}

export default BestServices
