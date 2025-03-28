import Slider from "react-slick";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style,display: "flex",  right: "-46px", zIndex: "10", top: "30%" }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faArrowRight} size="lg" color="#000" />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
       style={{ ...style, display: "flex", left: "10px", zIndex: "10", top: "30%" }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faArrowLeft} size="lg" color="#000" />
    </div>
  );
};





const ListingSliderOne = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4, // Default for large screens
  slidesToScroll: 1,
  arrows: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024, // Tablets
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768, // Small tablets & large phones
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480, // Mobile devices
      settings: {
        slidesToShow: 1, // Show 1 item on mobile
      },
    },
  ],
};


const listingData = [
  {
    id: 1,
    imgSrc: "assets/images/category/cat-8.jpg",
    title: "Shopping",
    listings: 15,
  },
  {
    id: 2,
    imgSrc: "assets/images/category/cat-7.jpg",
    title: "Shopping",
    listings: 15,
  },
  {
    id: 3,
    imgSrc: "assets/images/category/cat-6.jpg",
    title: "Shopping",
    listings: 15,
  },
];

const DestinationCategory = () => {
  return (
    <section className="listing-grid-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8"></div>
        </div>
        <Slider {...ListingSliderOne} className="listing-slider-one wow fadeInDown">
          {listingData.map((item) => (
            <div key={item.id} className="category-item category-item-two">
              <div className="category-img">
                <img src={item.imgSrc} alt="Listing Image" />
                <div className="category-overlay">
                  <div className="category-content">
                    <Link href="/index-2">
                      <i className="ti-link" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="info">
                <div className="icon">
                  <i className="flaticon-shopping" />
                </div>
                <h3 className="title">
                  <a href="#">{item.title}</a>
                </h3>
                <span className="listing">{item.listings} Listing</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>



    </section>
  );
};

export default DestinationCategory;
