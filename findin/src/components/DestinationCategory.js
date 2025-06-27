import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "flex", right: "-46px", zIndex: "10", top: "30%" }}
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
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 2 } },
  ],
};

const DestinationCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://13.203.104.113:3000/api/user/get/city_details/findintrivandrum"
        );
        const data = await response.json();

        if (data.success_status && data.info.length > 0) {
          setCategories(data.info[0].Category || []);
        } else {
          console.error("Invalid API response format");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="listing-grid-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8"></div>
        </div>
        <Slider {...ListingSliderOne} className="listing-slider-one wow fadeInDown">
          {categories.length > 0 ? (
            categories.map((category) => {
              const imageUrl = category.V_DigitalFile || "/images/category/default.jpg"; // Use default if null
              const iconUrl = category.V_LogFile || "/images/icons/default-icon.png"; // Use default icon if null

              return (
                <div key={category.N_T_M_Category_ID} className="category-item category-item-two">
                  <div className="category-img">
                    <Image
                      src={imageUrl}
                      alt={category.V_CategoryName}
                      width={300}
                      height={200}
                      style={{ objectFit: "cover", borderRadius: "10px" }}
                      unoptimized // Required for external URLs
                    />
                    <div className="category-overlay">
                      <div className="category-content">
                        <Link href="">
                          {/* <i className="ti-link" /> */}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="info">
                    {/* <div className="icon">
                      <Image src={iconUrl} alt="icon" width={30} height={30} unoptimized />
                    </div> */}
                    <h3 className="title mt-10">
                      <a href="#">{category.V_CategoryName}</a>
                    </h3>
                    <span className="listing">{category.Listing} Listings</span>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Loading categories...</p>
          )}
        </Slider>
      </div>
    </section>
  );
};

export default DestinationCategory;
