import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const ListingSliderOne = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const DestinationCategory = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevents errors before component loads

  return (
    <section className="listing-grid-area pb-110">
      <div className="container">
        <Slider {...ListingSliderOne} className="listing-slider-one wow fadeInDown">
          {[
            {
              img: "assets/images/category/cat-5.jpg",
              title: "Pizza Recipe",
              icon: "flaticon-chef",
              category: "Restaurant",
              listings: 15,
            },
            {
              img: "assets/images/listing/listing-grid-8.jpg",
              title: "Gym Ground",
              icon: "flaticon-dumbbell",
              category: "Fitness",
              listings: 12,
            },
            {
              img: "assets/images/listing/listing-grid-9.jpg",
              title: "City Palace",
              icon: "flaticon-government",
              category: "Historic Site",
              listings: 8,
            },
            {
              img: "assets/images/listing/listing-grid-1.jpg",
              title: "Sushi Place",
              icon: "flaticon-chef",
              category: "Restaurant",
              listings: 20,
            },
          ].map((item, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-12">
              <div className="category-item category-item-two mb-25 wow fadeInUp" data-wow-delay=".25s">
                <div className="category-img">
                  <img src={item.img} alt="Category Image" />
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
                    <i className={item.icon} />
                  </div>
                  <h3 className="title">
                    <a href="#">{item.category}</a>
                  </h3>
                  <span className="listing">{item.listings} Listing</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default DestinationCategory;
