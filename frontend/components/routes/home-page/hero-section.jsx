"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import image1 from "../../../assets/img/home-page/carousel-1.jpg";
import image2 from "../../../assets/img/home-page/carousel-2.jpg";

// Dynamically import OwlCarousel with no SSR
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

export default function HeroSection() {
  // Owl Carousel Settings
  const options = {
    loop: true,
    margin: 0,
    nav: true,
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    items: 1,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  };

  const carouselItems = [
    {
      image: image1,
      title: "Best Online Courses",
      heading: "The Best Online Learning Platform",
      description:
        "Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea sanctus eirmod elitr.",
    },
    {
      image: image2,
      title: "Best Online Courses",
      heading: "The Best Online Learning Platform",
      description:
        "Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea sanctus eirmod elitr.",
    },
    // Add more items as needed
  ];

  return (
    <div className="container-fluid p-0 mb-5">
      <OwlCarousel className="header-carousel position-relative" {...options}>
        {carouselItems.map((item, index) => (
          <div key={index} className="owl-carousel-item position-relative">
            <Image
              className="img-fluid"
              src={item.image}
              alt={`Carousel Image ${index + 1}`}
              width={1920}
              height={1080}
              priority={index === 0}
            />
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center hero-corosal">
              <div className="container">
                <div className="row justify-content-start">
                  <div className="col-sm-10 col-lg-8">
                    <h5 className="text-info text-uppercase mb-3 animated slideInDown">
                      {item.title}
                    </h5>
                    <h1 className="display-3 text-white animated slideInDown">
                      {item.heading}
                    </h1>
                    <p className="fs-5 text-white mb-4 pb-2">
                      {item.description}
                    </p>
                    <Link
                      href="/about"
                      className="btn btn-info py-md-3 px-md-5 me-3 animated slideInLeft"
                    >
                      Read More
                    </Link>
                    <Link
                      href="/auth"
                      className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                    >
                      Join Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </OwlCarousel>
    </div>
  );
}
