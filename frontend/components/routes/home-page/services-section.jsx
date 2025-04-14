"use client";

import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faGlobe, 
  faHome, 
  faBookOpen 
} from '@fortawesome/free-solid-svg-icons';


const ServiceSection = () => {

  const services = [
    {
      icon: faGraduationCap,
      title: "Skilled Instructors",
      description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam",
      delay: "0.1s"
    },
    {
      icon: faGlobe,
      title: "Online Classes",
      description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam",
      delay: "0.3s"
    },
    {
      icon: faHome,
      title: "Home Projects",
      description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam",
      delay: "0.5s"
    },
    {
      icon: faBookOpen,
      title: "Book Library",
      description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam",
      delay: "0.7s"
    }
  ];

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-4">
          {services.map((service, index) => (
            <div 
              key={index}
              className="col-lg-3 col-sm-6 wow fadeInUp" 
              data-wow-delay={service.delay}
            >
              <div className="service-item text-center pt-3">
                <div className="p-4">
                  <FontAwesomeIcon 
                    icon={service.icon} 
                    className="fa-3x text-primary mb-4"
                  />
                  <h5 className="mb-3">{service.title}</h5>
                  <p>{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;