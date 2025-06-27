
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from 'axios';
import config from "./common.service";

const ListingDetailsRight = () => {
  const [loading, setLoading] = useState(true);
    const [Item, setItem] = useState([]);
    const [ItemBusinessHour, setItemBusinessHour] = useState([]);
  
    const fetchItemDetails = async () => {
  
      try {
        const response = await axios.get(
          `${config.bmrServerURL}/api/user/get/item_details/1`
        );
        let data =
          response.data.info && response.data.info.length > 0
            ? response.data.info
            : [];
        setItem(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
      finally {
        setLoading(false);
      }
    };

    const fetchBusinessHour = async () => {
  
      try {
        const response = await axios.get(
          `${config.bmrServerURL}/api/user/get/item_businesshours/1`
        );
        let data =
          response.data.info && response.data.info.length > 0
            ? response.data.info
            : [];
        setItemBusinessHour(data);
      } catch (error) {
        console.error("Error fetching Business Hour:", error);
      }
      finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchItemDetails();
      fetchBusinessHour();
    }, []);
    if (loading) return <p>Loading Items...</p>;
  return (
    <div className="col-lg-4">
      <div className="sidebar-widget-area">
      {Item.length>0 && (
        <div className="widget contact-info-widget mb-30 wow fadeInUp">
          <div className="contact-info-widget-wrap">
          
            <div className="contact-map">
                <iframe className="listing-map" src={Item[0].V_GoogleMapLink} />
            {/* <a href="#" className="support-icon">
              <i className="flaticon-headphone" />
            </a> */}
          </div>
              <div className="contact-info-content">
              <h4 className="widget-title">Contact Info</h4>
              <div className="info-list">
                {Item[0].V_PhoneNumber>0 && (
                  <p>
                    <i className="ti-tablet" />
                    <a href="tel:+98265365205">{Item[0].V_PhoneNumber}</a>
                  </p>
                )}
                <p>
                  <i className="ti-location-pin" />
                  {Item[0].V_ItemAddress}
                </p>
                {Item[0].V_Gmail && (
                  <p>
                    <i className="ti-email" />
                    <a href="mailto:contact@example.com"></a>
                  </p>
                )}
                {Item[0].V_WebSiteLink && (
                  <p>
                    <i className="ti-world" />
                    <a href="www.fioxen.com">{Item[0].V_WebSiteLink}</a>
                  </p>
                
                )} 
              
              {/* <ul className="social-link">
                <li>
                  <a href="#">
                    <i className="ti-facebook" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ti-twitter-alt" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ti-pinterest" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ti-dribbble" />
                  </a>
                </li>
              </ul> */}
             </div>
            </div>

            
          </div>
        </div>
        )}

        <a href="" className="main-btn icon-btn mb-20">
          View Menu / Brochure
        </a>
        {ItemBusinessHour.length>0 && ItemBusinessHour[0].B_WorkingDays === 1 &&(
          <div  className="widget business-hour-widget mb-30 wow fadeInUp">
            <h4 className="widget-title">Business Hour</h4>
            <ul  className="time-info">
              {ItemBusinessHour.map((item, index) =>  (
                <li key = {item.index}>
                  <span className="day">{item.V_WeekDays}</span>
                  <span  className={`time ${item.Working !== 1 ? 'st-close' : ''}`}>{item.Working === 1 ?(item.D_FromTime + '-' +item.D_ToTime): 'Close'}</span>
                </li>
               ))}
            </ul>
          </div>
        )}
        <div className="widget newsletter-widget mb-30 wow fadeInUp">
          <div
            className="newsletter-widget-wrap bg_cover"
            style={{
              backgroundImage: "url(assets/images/newsletter-widget-1.jpg)",
            }}
          >
            <i className="flaticon-email-1" />
            <h3>Subscribe Our Newsletter</h3>
            <button className="main-btn icon-btn">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListingDetailsRight;
