import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import axios from 'axios';
import config from "./common.service";
import homeApi from "./Home";
// import { faPhone } from '@fortawesome/free-solid-svg-icons';




// Custom Arrow Components
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: "flex", right: '-46px', zIndex: 10 }} onClick={onClick}>
      <FontAwesomeIcon icon={faArrowRight} size="lg" color="#000" />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: "flex", left: '10px', zIndex: 10 }} onClick={onClick}>
      <FontAwesomeIcon icon={faArrowLeft} size="lg" color="#000" />
    </div>
  );
};

// Slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  nextArrow:
    <SampleNextArrow />,
  prevArrow:
    <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
  ],
};

const LatestDestination = () => {

  const [loading, setLoading] = useState(true);
  const [Item, setItem] = useState([]);
  // Prevents errors before component loads

  const fetchItem = async () => {
    // if (!formData.N_T_M_Category_ID) return; // Prevent API call if no category is selected

    try {
      const data = await homeApi.Events(); // calling the imported API
      const eventData = data.Items?.length ? data.Items : [];
      setItem(eventData);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
    finally {
      setLoading(false); // Stop loading after fetch
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);
  if (loading) return <p>Loading Items...</p>;

  return (
    <section className="listing-grid-area">
      <div className="container">
        <Slider {...sliderSettings} className="listing-slider-one wow fadeInDown">
          {Item.length > 0
            ? Item.map((item, index) => (
              <div key={item.index} className="listing-item listing-grid-item-two">
                <div className="listing-thumbnail">
                  <Link href={`/listing-details-2?itemid=${item.N_T_M_Items_ID}&categoryid=${item.N_T_M_Category_ID}`} className="h-250" alt="Listing Image">
                    <img className="h-250" src={item.V_ItemDigitalFile} alt="Listing Image" />
                  </Link>
                  <div className="cat-name">{item.V_CategoryName}</div>
                  {item.B_Featured === 1 && <span className="featured-btn">Featured</span>}
                </div>
                <div className="listing-content">
                  <div className="li-padding">
                    <h3 className="title">
                      <Link href={`/listing-details-2?itemid=${item.N_T_M_Items_ID}&categoryid=${item.N_T_M_Category_ID}`}>{item.V_ItemName}</Link>
                    </h3>
                    <p>
                      <i className="ti-location-pin"></i> {item.V_LocationName}
                    </p>
                    <span className="phone-meta">
                      {item.V_PhoneNumber && (
                        <>
                          {/* <FontAwesomeIcon icon={faPhone} /> */}
                          <a href={`tel:${item.V_PhoneNumber}`}>{item.V_PhoneNumber}</a>
                        </>

                      )}
                    </span>

                    {/* Contact & Links */}
                    <div className="listing-meta list-meta2 d-flex justify-content-between align-items-center">
                      <a href={`/listing-details-2?itemid=${item.N_T_M_Items_ID}&categoryid=${item.N_T_M_Category_ID}`}>
                        <div className="view-more">View More</div>
                      </a>
                      <div className="icons d-flex align-items-center">
                        {/* WhatsApp */}
                        {item.V_WhatsappLink && (
                          <a className="li-icon" href={`https://wa.me/${item.V_WhatsappLink}`} target="_blank"
                            rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faWhatsapp} />
                          </a>
                        )}
                        {/* Website */}
                        {item.V_WebSiteLink && (
                          <a className="li-icon" href={item.V_WebSiteLink} target="_blank" rel="noopener noreferrer">
                            <i className="ti-world"></i>
                          </a>
                        )}
                        {/* Google Maps Location */}
                        {item.V_GoogleMapLink && (
                          <a className="li-icon" href={item.V_GoogleMapLink} target="_blank" rel="noopener noreferrer">
                            <i className="ti-location-pin"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )) : "No Items Available..."}
        </Slider>
      </div>
    </section>
  );
};

export default LatestDestination;