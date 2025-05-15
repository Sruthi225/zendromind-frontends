"use client";
import ListingDetailsRight from "@/src/components/ListingDetailsRight";
import VideoPopup from "@/src/components/VideoPopup";
import Layout from "@/src/layouts/Layout";
import { GallerySlider2, reletedListingSlider2 } from "@/src/sliderProps";
import Link from "next/link";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import config from "./common.service";

import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
const ListingDetails = ({ItemId, CategoryId}) => {

  const [loading, setLoading] = useState(true);
  const [Item, setItem] = useState([]);
  const [Category, setCategory] = useState([]);
  const [ItemHeading, setItemHeading] = useState([]);
  const [SimilarItem, setSimilarItem] = useState([]);
  const [video, setVideo] = useState(false);

  const fetchItemDetails = async () => {

    try {
      const response = await axios.get(
        `${config.bmrServerURL}/api/user/get/item_details/${ItemId}`
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

  const fetchItemHeading = async () => {

    try {
      const response = await axios.get(
        `${config.bmrServerURL}/api/user/get/item_heading_details/${ItemId}`
      );
      let data =
        response.data.info && response.data.info.length > 0
          ? response.data.info
          : [];
      setItemHeading(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
    finally {
      setLoading(false);
    }
  };

  const fetchSimilarItem = async () => {

    try {
      const response = await axios.get(
        `${config.bmrServerURL}/api/user/get/fetch_similar_category/${ItemId}/${CategoryId}`
      );
      let data =
        response.data.info && response.data.info.length > 0
          ? response.data.info
          : [];
      setSimilarItem(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
    finally {
      setLoading(false);
    }
  };


  const fetchCategory = async () => {

    try {
      const response = await axios.get(
        `${config.bmrServerURL}/api/user/get/popular_category/FindInTrivandrum/${CategoryId}`
      );
      let data =
        response.data.info && response.data.info.length > 0
          ? response.data.info
          : [];
      setCategory(data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItemDetails();
    fetchItemHeading();
    fetchSimilarItem();
    fetchCategory();
  }, []);
  if (loading) return <p>Loading Items...</p>;

  const aboutData = ItemHeading.find(h => h.V_DescriptionType === 'text');
  const videoData = ItemHeading.find(h => h.V_DescriptionType === 'video');
  const imageData = ItemHeading.filter(h => h.V_DescriptionType === 'image');
  console.log(imageData);

  return (
    <Layout>
      {video && <VideoPopup close={setVideo} />}
      
      <section
        className="page-breadcrumbs page-breadcrumbs-two bg_cover"
        style={{
          backgroundImage:  `url(${Item[0]?.V_ItemDigitalFile || '(assets/images/bg/listing-breadcrumbs-1.jpg)'})`
        }}
      />
      <section className="listing-details-section pt-120 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="listing-details-wrapper listing-details-wrapper-two">
                <div className="listing-info-area mb-30 wow fadeInUp">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                        {Item.length>0 && (
                            <div className="listing-info-content">
                            {/* <ul className="ratings ratings-three">
                              <li className="star">
                                <i className="flaticon-star-1" />
                              </li>
                              <li className="star">
                                <i className="flaticon-star-1" />
                              </li>
                              <li className="star">
                                <i className="flaticon-star-1" />
                              </li>
                              <li className="star">
                                <i className="flaticon-star-1" />
                              </li>
                              <li className="star">
                                <i className="flaticon-star-1" />
                              </li>
                              <li>
                                <span>
                                  <a href="#">(02 Reviews)</a>
                                </span>
                              </li>
                            </ul> */}
                                <h3 className="title">{Item[0].V_ItemName}</h3>
                            <div className="listing-meta">
                              <ul>
                                <li>
                                  <span>
                                    <i className="ti-location-pin" />
                                    {Item[0].V_LocationName} {Item[0].V_CityName?','+Item[0].V_CityName.replace("FindIn", "").trim() : ''}
                                  </span>
                                </li>
                                <li>
                                  <span>
                                    <i className="ti-tablet" />
                                    <a href="tel:+982653652-05">
                                      {Item[0].V_PhoneNumber}
                                    </a>
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        )} 
                    </div>
                    <div className="col-md-4">
                      <div className="button">
                        <Link className="icon-btn" href="/listing-grid">
                          <FontAwesomeIcon icon={faWhatsapp} />
                        </Link>
                        <Link className="icon-btn" href="/listing-grid">
                          <i className="ti-share" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {Item[0]?.V_ItemDigitalFile && 
                  <div className="listing-thumbnail mb-30 wow fadeInUp">
                    <img
                      src={Item[0]?.V_ItemDigitalFile}
                      alt="listing image"
                    />
                  </div>
                }
                {aboutData && (
                  <div className="listing-content mb-30 wow fadeInUp">
                    <h3 className="title">{aboutData.V_HeadingName || "About"}</h3>
                    <p>{aboutData.Heading[0].V_HeadingDetails}</p>
                  </div>
                )}
                {ItemHeading[0]?.V_KeyFeatures &&
                  <div className="listing-content mb-30 wow fadeInUp">
                    <h3 className="title">Product & Services</h3>
                    <div className="row">
                      {ItemHeading[0].V_KeyFeatures.split(',').map((feature, index) => (
                          <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                            <div className="icon-box icon-box-one">
                              <div className="icon">
                                <i className="ti-check-box" />
                              </div>
                              <div className="info">
                                <h6>{feature.trim()}</h6>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
                }
                
                {videoData && (
                  <div className="listing-play-box mb-30 wow fadeInUp">
                    <h4 className="title">{videoData.V_HeadingName || "Documentary"}</h4>
                    <div
                      className="play-content bg_cover text-center"
                      style={{
                        backgroundImage: `url(${videoData.Heading[0].V_HeadingDetails})`,
                      }}
                    >
                      <a
                        href="#"
                        className="video-popup"
                        onClick={(e) => {
                          e.preventDefault();
                          setVideo(true); 
                        }}
                      >
                        <i className="flaticon-play-button" />
                      </a>
                    </div>
                  </div>
                )}
                {imageData[0]?.Heading?.length > 0 && (
                  <div className="listing-gallery-box mb-30 wow fadeInUp">
                    <h4 className="title">{imageData[0].V_HeadingName || "Gallery"}</h4>
                    <Slider {...GallerySlider2} className="gallery-slider-one">
                      {imageData[0].Heading.map((img, idx) => (
                        <div className="gallery-item" key={idx}>
                          <img
                            src={img.V_HeadingDetails}
                            alt="gallery image"
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}

                {/* <div className="listing-gallery-box mb-30 wow fadeInUp">
                  <h4 className="title">Photo Gallery</h4>
                  <Slider {...GallerySlider2} className="gallery-slider-one">
                    <div className="gallery-item">
                      <img
                        src="assets/images/listing/gallery-5.jpg"
                        alt="gallery image"
                      />
                    </div>
                    <div className="gallery-item">
                      <img
                        src="assets/images/listing/gallery-6.jpg"
                        alt="gallery image"
                      />
                    </div>
                    <div className="gallery-item">
                      <img
                        src="assets/images/listing/gallery-7.jpg"
                        alt="gallery image"
                      />
                    </div>
                    <div className="gallery-item">
                      <img
                        src="assets/images/listing/gallery-8.jpg"
                        alt="gallery image"
                      />
                    </div>
                    <div className="gallery-item">
                      <img
                        src="assets/images/listing/gallery-6.jpg"
                        alt="gallery image"
                      />
                    </div>
                  </Slider>
                </div> */}
                {Category.length>0 && 
                   <div  className="listing-tag-box mb-30 wow fadeInUp" >
                    <h4 className="title">Popular Categories</h4>
                    {Category.map((cat, index) => (
                      <a key={index} href="#">{cat.V_CategoryName}</a>
                    ))}
                  </div>
                }
                {/* <div className="listing-review-form mb-30 wow fadeInUp"> */}
                  
                  {/* <form onSubmit={(e) => e.preventDefault()}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form_group">
                          <textarea
                            className="form_control"
                            placeholder="Write Message"
                            name="message"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form_group">
                          <input
                            type="text"
                            className="form_control"
                            placeholder="Your name"
                            name="name"
                            required=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form_group">
                          <input
                            type="email"
                            className="form_control"
                            placeholder="Email here"
                            name="email"
                            required=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form_group">
                          <div className="single-checkbox d-flex">
                            <input
                              type="checkbox"
                              id="check4"
                              name="checkbox"
                            />
                            <label htmlFor="check4">
                              <span>
                                Save my name, email, and website in this browser
                                for the next time i comment.
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form_group">
                          <button className="main-btn icon-btn">
                            Submit Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </form> */}
                {/* </div> */}
              </div>
              {SimilarItem.length >0 &&
                <div className="releted-listing-area wow fadeInUp">
                  <h3 className="title mb-20">Similar {Item && Item.length > 0 ? Item[0].V_CategoryName : "Items"}</h3>

                  {SimilarItem.length > 1 ? (
                      <Slider
                      {...reletedListingSlider2}
                      className="releted-listing-slider-one"
                      >
                      {SimilarItem.map((item, index) => (
                          <div key={index} className="listing-item listing-grid-item-two">
                          <Card item={item} />
                          </div>
                      ))}
                      </Slider>
                  ) : (
                    <div className="flex justify-start">
                    {SimilarItem[0] && (
                      <div className="listing-item listing-grid-item-two w-50">
                        <Card item={SimilarItem[0]} />
                      </div>
                    )}
                  </div>
                  )}
                </div>
              }   
            </div> 
            <ListingDetailsRight />
          </div>
        </div>
      </section>
    </Layout>
  );
};





const Card = ({ item }) => {
    return (
      <div>
        <div className="listing-thumbnail">
          <img
            src="assets/images/listing/listing-grid-7.jpg"
            alt="Listing Image"
            style = {{width:"100%"}}
          />
          <a href="#" className="cat-btn">
            <i className="flaticon-chef" />
          </a>
          {item.B_Featured && <span className="featured-btn"> Featured </span> }
          <ul className="ratings ratings-four">
            {[...Array(5)].map((_, i) => (
              <li key={i} className="star">
                <i className="flaticon-star-1" />
              </li>
            ))}
            <li>
              <span>
                <a href="#">(02 Reviews)</a>
              </span>
            </li>
          </ul>
        </div>
        <div className="listing-content">
          <h3 className="title">
            <Link href="/listing-details-1">{item.V_ItemName}</Link>
          </h3>
          <p>Popular restaurant in California</p>
          <span className="phone-meta">
            <i className="ti-tablet" />
            <a href="tel:+982653652-05">{item.V_PhoneNumber}</a>
            {/* <span className="status st-open">Open</span> */}
          </span>
          <div className="listing-meta">
            <ul>
              <li>
                <span>
                  <i className="ti-location-pin" />
                  {item.V_LocationName},{item.V_CityName}
                </span>
              </li>
              <li>
                <span>
                  <i className="ti-heart" />
                  <a href="#">Save</a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  

export default ListingDetails;
