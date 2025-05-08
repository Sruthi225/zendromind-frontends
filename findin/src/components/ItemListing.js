import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import axios from 'axios';
import config from "./common.service";

const ItemListing = ({category, location, keyword}) => {


  const [loading, setLoading] = useState(true);
  const [Item, setItem] = useState([]);
   // Prevents errors before component loads

  const fetchItem = async () => {
    // if (!formData.N_T_M_Category_ID) return; // Prevent API call if no category is selected

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
    <section className="listing-grid-area">
      <div className="container">
      <div className="row">
        {Item.length > 0 ? (
            Item.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="listing-item listing-grid-item-two">
                <div className="listing-thumbnail">
                    <img src={item.V_ItemDigitalFile} alt="Listing Image" />
                    <div className="cat-name">{item.V_CategoryName}</div>
                    {item.B_Featured && <span className="featured-btn">Featured</span>}
                </div>
                <div className="listing-content">
                    <div className="li-padding">
                    <h3 className="title">
                        <Link href="/listing-details-1">{item.V_ItemName}</Link>
                    </h3>
                    <p><i className="ti-location-pin"></i> {item.V_LocationName}</p>
                    {item.V_PhoneNumber && (
                        <span className="phone-meta">
                        <i className="ti-tablet"></i>
                        <a href={`tel:${item.V_PhoneNumber}`}>{item.V_PhoneNumber}</a>
                        </span>
                    )}
                    <div className="listing-meta list-meta2 d-flex justify-content-between align-items-center">
                        <a href={item.viewMoreLink}>
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
            </div>
            ))
        ) : (
            <p>No Items Available...</p>
        )}
        </div>
      </div>
    </section>
  );
};

export default LatestDestination;