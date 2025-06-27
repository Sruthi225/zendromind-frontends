import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import config from "./common.service";


const ItemListing = ({category, location, keyword}) => {


  const [loading, setLoading] = useState(true);
  const [Item, setItem] = useState([]);

  const fetchItem = async () => {

    try {
      const response = await axios.get(
        `${config.bmrServerURL}/api/user/get/category_item_list/${category}/${location}/${keyword}`
      );
      let data =
        response.data.info && response.data.info.length > 0
          ? response.data.info
          : [];

        data = [...data].sort(() => Math.random() - 0.5);
      setItem(data);
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
  <section className="listing-grid-area py-5">
    <div className="container">
      {/* Desktop Grid View */}
      {/* Desktop Grid View */}
      <div className="row d-none d-md-flex">
        {Item.slice(0, 12).map((item, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <Card item={item} />
          </div>
        ))}
      </div>


      {/* Mobile Slider View
      {/* Mobile Slider View */}
      {/* <div className="d-block d-md-none position-relative slider-wrapper ">
        <Slider {...sliderSettings}>
          {Item.slice(0, 12).map((item, index) => (
            <div key={index} className="px-2 pp-0">
              <Card item={item} />
            </div>
          ))}
        </Slider>
      </div>  */}

    </div>
  </section>
);
};

// Card Component
const Card = ({ item }) => (
<div className="listing-item listing-grid-item-two">
  <div className="listing-thumbnail">
      <img className="h-250" src={item.V_ItemDigitalFile} alt="Listing" />
    <div className="cat-name">{item.V_CategoryName}</div>
    {item.B_Featured && <span className="featured-btn">Featured</span>}
  </div>
  <div className="listing-content">
    <div className="li-padding">
      <h3 className=" fe-title">
        <Link href="/listing-details-1">{item.V_ItemName}</Link>
      </h3>
      <p><i className="ti-location-pin"></i> {item.V_LocationName}</p>
      <span className="phone-meta">
        {item.V_PhoneNumber && (
          <>
            <i className="ti-tablet"></i>
            <a href={`tel:${item.V_PhoneNumber}`}>{item.V_PhoneNumber}</a>
          </>
        )}
      </span>
      <div className="listing-meta list-meta2 d-flex justify-content-between align-items-center mt-2">
        <a href={`/listing-details-2?itemid=${item.N_T_M_Items_ID}&categoryid=${item.N_T_M_Category_ID}`}>
          <div className="view-more">View More</div>
        </a>
        <div className="icons d-flex align-items-center">
          {item.V_WhatsappLink && (
            <a className="li-icon" href={`https://wa.me/${item.V_WhatsappLink}`} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          )}
          {item.V_WebSiteLink && (
            <a className="li-icon" href={item.V_WebSiteLink} target="_blank" rel="noopener noreferrer">
              <i className="ti-world"></i>
            </a>
          )}
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
);

export default ItemListing;