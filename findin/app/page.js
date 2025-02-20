"use client";
import Counter from "@/src/components/Counter";
import VideoPopup from "@/src/components/VideoPopup";
import Layout from "@/src/layouts/Layout";
import SearchForm from '@/src/components/SearchForm';
import DestinationCategory from '@/src/components/DestinationCategory';
import {
  ClientSliderOne,
  ListingSliderOne,
  PlaceSliderOne,
} from "@/src/sliderProps";
import Link from "next/link";
import { useState } from "react";
import Slider from "react-slick";

const Index = () => {
  const [video, setVideo] = useState(false);
  return (
    <Layout>
      {video && <VideoPopup close={setVideo} />}
      {/* <!--====== Start Hero Section ======--> */}
      <section className="hero-area">
        <div
          className="hero-wrapper-two bg_cover"
          style={{ backgroundImage: "url(assets/images/hero/hero-bg-2.jpg)" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="hero-content">
                  <h1 className="wow fadeInUp" data-wow-delay="30ms">
                    Experience The Wonder
                  </h1>
                  <h3 className="wow fadeInDown" data-wow-delay="50ms">
                    People Don’t Take,Trips Take People
                  </h3>
                  <div
                    className="hero-search-wrapper wow fadeInUp"
                    data-wow-delay="70ms"
                  >
                     <SearchForm />
                    
                                     </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Hero Section ======*/}
      {/*====== Start category Section ======*/}
      <section className="category-area pt-110 pb-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title section-title-two text-center mb-60 wow fadeInUp">
                <h2>
                  <span className="line">Destination</span> Category
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div
                className="category-item category-item-two mb-25 wow fadeInUp"
                data-wow-delay=".2s"
              >
                <div className="category-img">
                  <img
                    src="assets/images/category/cat-1.jpg"
                    alt="Category Image"
                  />
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
                    <i className="flaticon-government" />
                  </div>
                  <h3 className="title">
                    <a href="#">Museums</a>
                  </h3>
                  <span className="listing">15 Listing</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div
                className="category-item category-item-two mb-25 wow fadeInUp"
                data-wow-delay=".25s"
              >
                <div className="category-img">
                  <img
                    src="assets/images/category/cat-2.jpg"
                    alt="Category Image"
                  />
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
                    <i className="flaticon-serving-dish" />
                  </div>
                  <h3 className="title">
                    <a href="#">Restaurant</a>
                  </h3>
                  <span className="listing">15 Listing</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div
                className="category-item category-item-two mb-25 wow fadeInUp"
                data-wow-delay=".30s"
              >
                <div className="category-img">
                  <img
                    src="assets/images/category/cat-3.jpg"
                    alt="Category Image"
                  />
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
                    <i className="flaticon-gift-box" />
                  </div>
                  <h3 className="title">
                    <a href="#">Party Center</a>
                  </h3>
                  <span className="listing">15 Listing</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div
                className="category-item category-item-two mb-25 wow fadeInUp"
                data-wow-delay=".35s"
              >
                <div className="category-img">
                  <img
                    src="assets/images/category/cat-4.jpg"
                    alt="Category Image"
                  />
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
                    <i className="flaticon-dumbbell" />
                  </div>
                  <h3 className="title">
                    <a href="#">Fitness Zone</a>
                  </h3>
                  <span className="listing">15 Listing</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div
                className="category-item category-item-two mb-25 wow fadeInUp"
                data-wow-delay=".40s"
              >
                <div className="category-img">
                  <img
                    src="assets/images/category/cat-5.jpg"
                    alt="Category Image"
                  />
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
                    <i className="flaticon-game-controller" />
                  </div>
                  <h3 className="title">
                    <a href="#">Game Field</a>
                  </h3>
                  <span className="listing">15 Listing</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div
                className="category-item category-item-two mb-25 wow fadeInUp"
                data-wow-delay=".45s"
              >
                <div className="category-img">
                  <img
                    src="assets/images/category/cat-6.jpg"
                    alt="Category Image"
                  />
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
                    <i className="flaticon-suitcase" />
                  </div>
                  <h3 className="title">
                    <a href="#">Job &amp; Feeds</a>
                  </h3>
                  <span className="listing">15 Listing</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div
                className="category-item category-item-two mb-25 wow fadeInUp"
                data-wow-delay=".50s"
              >
                <div className="category-img">
                  <img
                    src="assets/images/category/cat-7.jpg"
                    alt="Category Image"
                  />
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
                    <a href="#">Shooping</a>
                  </h3>
                  <span className="listing">15 Listing</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div
                className="category-item category-item-two mb-25 wow fadeInUp"
                data-wow-delay=".55s"
              >
                <div className="category-img">
                  <img
                    src="assets/images/category/cat-8.jpg"
                    alt="Category Image"
                  />
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
                    <i className="flaticon-color-palette" />
                  </div>
                  <h3 className="title">
                    <a href="#">Art Gallery</a>
                  </h3>
                  <span className="listing">15 Listing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End category Section ======*/}
      {/* <!--====== End Category Section ======--> */}






{/*====== Start category Section ======*/}
<section className="category-area pt-110 pb-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title section-title-two text-center mb-60 wow fadeInUp">
                <h2>
                  <span className="line">Destination</span> Category
                </h2>
              </div>
            </div>
          </div>
          
            
          <div style={{ width: "100%", maxWidth: "1200px", margin: "auto" }}>
  <DestinationCategory />
</div>

  
            
            
            
           
            
           
            
          
        </div>
      </section>
      {/*====== End category Section ======*/}
      {/* <!--====== End Category Section ======--> */}






 {/* <!--====== Start Popular Listing Section ======--> */}
 <section className="listing-grid-area pt-75 pb-110">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-60 wow fadeInUp">
                <span className="sub-title">Featured List</span>
                <h2>Explore Destination</h2>
              </div>
            </div>
          </div>
          <Slider
            {...ListingSliderOne}
            className="listing-slider-one wow fadeInDown"
          >
            <div className="listing-item listing-grid-item-two">
              <div className="listing-thumbnail">
                <img
                  src="assets/images/listing/listing-grid-7.jpg"
                  alt="Listing Image"
                />
                <a href="#" className="cat-btn">
                  <i className="flaticon-chef"></i>
                </a>
                <span className="featured-btn">Featured</span>
                <ul className="ratings ratings-four">
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li>
                    <span>
                      <a href="#">(02 Reviews)</a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="listing-content">
                <h3 className="title">
                  <Link href="/listing-details-1">Pizza Recipe</Link>
                </h3>
                <p>Popular restaurant in california</p>
                <span className="phone-meta">
                  <i className="ti-tablet"></i>
                  <a href="tel:+982653652-05">+98 (265) 3652 - 05</a>
                  <span className="status st-open">Open</span>
                </span>
                <div className="listing-meta">
                  <ul>
                    <li>
                      <span>
                        <i className="ti-location-pin"></i>California, USA
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="ti-heart"></i>
                        <a href="#">Save</a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="listing-item listing-grid-item-two">
              <div className="listing-thumbnail">
                <img
                  src="assets/images/listing/listing-grid-8.jpg"
                  alt="Listing Image"
                />
                <a href="#" className="cat-btn">
                  <i className="flaticon-dumbbell"></i>
                </a>
                <ul className="ratings ratings-three">
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li>
                    <span>
                      <a href="#">(02 Reviews)</a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="listing-content">
                <h3 className="title">
                  <Link href="/listing-details-1">Gym Ground</Link>
                </h3>
                <p>Popular restaurant in california</p>
                <span className="phone-meta">
                  <i className="ti-tablet"></i>
                  <a href="tel:+982653652-05">+98 (265) 3652 - 05</a>
                  <span className="status st-close">close</span>
                </span>
                <div className="listing-meta">
                  <ul>
                    <li>
                      <span>
                        <i className="ti-location-pin"></i>California, USA
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="ti-heart"></i>
                        <a href="#">Save</a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="listing-item listing-grid-item-two">
              <div className="listing-thumbnail">
                <img
                  src="assets/images/listing/listing-grid-9.jpg"
                  alt="Listing Image"
                />
                <a href="#" className="cat-btn">
                  <i className="flaticon-government"></i>
                </a>
                <span className="featured-btn">Featured</span>
                <ul className="ratings ratings-five">
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li>
                    <span>
                      <a href="#">(02 Reviews)</a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="listing-content">
                <h3 className="title">
                  <Link href="/listing-details-1">City Palace</Link>
                </h3>
                <p>Popular restaurant in california</p>
                <span className="phone-meta">
                  <i className="ti-tablet"></i>
                  <a href="tel:+982653652-05">+98 (265) 3652 - 05</a>
                  <span className="status st-open">Open</span>
                </span>
                <div className="listing-meta">
                  <ul>
                    <li>
                      <span>
                        <i className="ti-location-pin"></i>California, USA
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="ti-heart"></i>
                        <a href="#">Save</a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="listing-item listing-grid-item-two">
              <div className="listing-thumbnail">
                <img
                  src="assets/images/listing/listing-grid-1.jpg"
                  alt="Listing Image"
                />
                <a href="#" className="cat-btn">
                  <i className="flaticon-chef"></i>
                </a>
                <span className="featured-btn">Featured</span>
                <ul className="ratings ratings-two">
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li>
                    <span>
                      <a href="#">(02 Reviews)</a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="listing-content">
                <h3 className="title">
                  <Link href="/listing-details-1">Pizza Recipe</Link>
                </h3>
                <p>Popular restaurant in california</p>
                <span className="phone-meta">
                  <i className="ti-tablet"></i>
                  <a href="tel:+982653652-05">+98 (265) 3652 - 05</a>
                  <span className="status st-open">Open</span>
                </span>
                <div className="listing-meta">
                  <ul>
                    <li>
                      <span>
                        <i className="ti-location-pin"></i>California, USA
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="ti-heart"></i>
                        <a href="#">Save</a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </section>
      {/* <!--====== End Popular Listing Section ======--> */}
     





      {/* <!--====== Start offer Section ======--> */}
      <section className="cta-area">
        <div
          className="cta-wrapper-one bg_cover"
          style={{ backgroundImage: `url(assets/images/bg/cta-bg-1.jpg)` }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="cta-content-box text-center wow fadeInUp">
                  <img src="assets/images/icon-1.png" alt="offer icon" />
                  <h2>Splash Yourself Bigger Offer on Everyday</h2>
                  <Link className="main-btn icon-btn" href="/how-work">
                    Explore Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--====== End offer Section ======--> */}
      {/* <!--====== Start Features Section ======--> */}
      <section className="features-area">
        <div className="features-wrapper-one pt-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="features-img wow fadeInLeft">
                  <img
                    src="assets/images/features/features-1.jpg"
                    alt="Features Image"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="features-content-box features-content-box-one">
                  <div className="section-title section-title-left mb-25 wow fadeInUp">
                    <span className="sub-title">Our Speciality</span>
                    <h2>Comprehnsive All Great Destination Here</h2>
                  </div>
                  <h5>
                    Risus urnas Iaculis per amet vestibulum luctus.tincidunt
                    ultricies aenean quam eros eleifend sodales cubilia mattis
                    quam.
                  </h5>
                  <ul className="features-list-one">
                    <li
                      className="list-item wow fadeInUp"
                      data-wow-delay="10ms"
                    >
                      <div className="icon">
                        <i className="flaticon-find"></i>
                      </div>
                      <div className="content">
                        <h5>Find What You Want</h5>
                        <p>
                          Rhoncus dolor quam etiam mattis, tincidunt nec
                          lobortis sociis facilisi aenean netus tempor duis.
                        </p>
                      </div>
                    </li>
                    <li
                      className="list-item wow fadeInUp"
                      data-wow-delay="20ms"
                    >
                      <div className="icon">
                        <i className="flaticon-place"></i>
                      </div>
                      <div className="content">
                        <h5>Easy Choose Your Place</h5>
                        <p>
                          Rhoncus dolor quam etiam mattis, tincidunt nec
                          lobortis sociis facilisi aenean netus tempor duis.
                        </p>
                      </div>
                    </li>
                    <li
                      className="list-item wow fadeInUp"
                      data-wow-delay="30ms"
                    >
                      <div className="icon">
                        <i className="flaticon-social-care"></i>
                      </div>
                      <div className="content">
                        <h5>Live Online Assistance</h5>
                        <p>
                          Rhoncus dolor quam etiam mattis, tincidunt nec
                          lobortis sociis facilisi aenean netus tempor duis.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--====== End Features Section ======--> */}
      {/* <!--====== Start Place Section ======--> */}
      <section className="place-area pt-115 pb-110">
        <div className="container-fluid place-container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-60 wow fadeInUp">
                <span className="sub-title">Feature Places</span>
                <h2>Explore By Destination</h2>
              </div>
            </div>
          </div>
          <Slider
            {...PlaceSliderOne}
            className="place-slider-one wow fadeInDown"
          >
            <div className="place-item place-item-one">
              <div className="place-thumbnail">
                <img src="assets/images/place/place-1.jpg" alt="Place Image" />
                <div className="place-overlay">
                  <div className="place-content text-center">
                    <span className="listing">10 Listing</span>
                    <h3 className="title">Australia</h3>
                    <Link className="arrow-btn" href="/listing-grid">
                      <i className="ti-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="place-item place-item-one">
              <div className="place-thumbnail">
                <img src="assets/images/place/place-2.jpg" alt="Place Image" />
                <div className="place-overlay">
                  <div className="place-content text-center">
                    <span className="listing">10 Listing</span>
                    <h3 className="title">Australia</h3>
                    <Link className="arrow-btn" href="/listing-grid">
                      <i className="ti-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="place-item place-item-one">
              <div className="place-thumbnail">
                <img src="assets/images/place/place-3.jpg" alt="Place Image" />
                <div className="place-overlay">
                  <div className="place-content text-center">
                    <span className="listing">10 Listing</span>
                    <h3 className="title">Australia</h3>
                    <Link className="arrow-btn" href="/listing-grid">
                      <i className="ti-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="place-item place-item-one">
              <div className="place-thumbnail">
                <img src="assets/images/place/place-4.jpg" alt="Place Image" />
                <div className="place-overlay">
                  <div className="place-content text-center">
                    <span className="listing">10 Listing</span>
                    <h3 className="title">Australia</h3>
                    <Link className="arrow-btn" href="/listing-grid">
                      <i className="ti-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="place-item place-item-one">
              <div className="place-thumbnail">
                <img src="assets/images/place/place-2.jpg" alt="Place Image" />
                <div className="place-overlay">
                  <div className="place-content text-center">
                    <span className="listing">10 Listing</span>
                    <h3 className="title">Australia</h3>
                    <Link className="arrow-btn" href="/listing-grid">
                      <i className="ti-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </section>
      {/* <!--====== End Place Section ======--> */}
      {/* <!--====== Start Download Section ======--> */}
      <section className="download-app">
        <div className="download-wrapper-one pt-115">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="app-img wow fadeInLeft">
                  <img src="assets/images/app-1.png" alt="App Image" />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="download-content-box download-content-box-one">
                  <div className="section-title section-title-left mb-25 wow fadeInUp">
                    <span className="sub-title">Downlaod App</span>
                    <h2>Comprehnsive All Great Destination Here</h2>
                  </div>
                  <p>
                    Dictumst integer tellus eros quam vestibulum ante tortor
                    mollis adipisn pharetra curae curae and pulvinar porttitor
                  </p>
                  <ul className="button wow fadeInDown">
                    <li>
                      <Link className="app-btn" href="/">
                        <div className="icon">
                          <i className="ti-android"></i>
                        </div>
                        <div className="info">
                          <span>get it on</span>
                          <h6>Goole Play</h6>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link className="app-btn" href="/">
                        <div className="icon">
                          <i className="ti-apple"></i>
                        </div>
                        <div className="info">
                          <span>get it on</span>
                          <h6>App Store</h6>
                        </div>
                      </Link>
                    </li>
                  </ul>
                  <div className="counter-area pt-120">
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-ms-12">
                        <div className="counter-item counter-item-one wow fadeInUp">
                          <div className="info">
                            <h4>
                              <span>Member</span>Professional
                            </h4>
                            <h3>
                              <Counter end={220} /> +
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-ms-12">
                        <div className="counter-item counter-item-one wow fadeInUp">
                          <div className="info">
                            <h4>
                              <span>Listing</span>Received
                            </h4>
                            <h3>
                              <Counter end={72} />K +
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-ms-12">
                        <div className="counter-item counter-item-one wow fadeInUp">
                          <div className="info">
                            <h4>
                              <span>Client</span>Satisfaction
                            </h4>
                            <h3>
                              <Counter end={50} />K +
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*<!--====== End Download Section ======--> */}
      {/* <!--====== Start Intro Video Section ======--> */}
      <section className="intro-video">
        <div
          className="intro-wrapper-one bg_cover pt-115"
          style={{ backgroundImage: `url(assets/images/bg/video-bg-1.jpg)` }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="play-content play-content-one text-center wow fadeInLeft">
                  <a
                    href="#"
                    className="video-popup"
                    onClick={(e) => {
                      e.preventDefault();
                      setVideo(true);
                    }}
                  >
                    <i className="flaticon-play-button"></i>
                  </a>
                  <h5>Play Video</h5>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="intro-content-box intro-content-box-one wow fadeInRight">
                  <div className="section-title section-title-left section-title-white mb-35">
                    <span className="sub-title">Checkout List</span>
                    <h2>Professional planners for your vacation</h2>
                  </div>
                  <p>
                    Risus urnas Iaculis per amet vestibulum luctus tincidunt
                    ultricies aenean quam eros eleifend sodales cubilia mattis
                    quam.
                  </p>
                  <Link className="main-btn icon-btn" href="/listing-grid">
                    Explore List
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--====== End Intro Video Section ======--> */}
      {/* <!--====== Start Newsletter Section ======--> */}
      <section className="newsletter-area">
        <div className="container">
          <div
            className="newsletter-wrapper newsletter-wrapper-one bg_cover"
            style={{
              backgroundImage: `url(assets/images/bg/newsletter-bg-1.jpg)`,
            }}
          >
            <div className="row">
              <div className="col-lg-5">
                <div className="newsletter-content-box-one wow fadeInLeft">
                  <div className="icon">
                    <i className="flaticon-email"></i>
                  </div>
                  <div className="content">
                    <h2>Get Special Rewards</h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="newsletter-form wow fadeInRight">
                  <div className="form_group">
                    <input
                      type="email"
                      className="form_control"
                      placeholder="Enter Address"
                      name="email"
                      required
                    />
                    <i className="ti-location-pin"></i>
                    <button className="main-btn">Subscribe +</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--====== End Newsletter Section ======--> */}
      {/* <!--====== Start Client Section ======--> */}
      <div className="client-area pt-120">
        <div className="client-wrapper-one pb-120">
          <div className="container">
            <Slider
              {...ClientSliderOne}
              className="client-slider-one wow fadeInDown"
            >
              <div className="client-item">
                <div className="client-img">
                  <a href="#">
                    <img src="assets/images/client/01.png" alt="Client Image" />
                  </a>
                </div>
              </div>
              <div className="client-item">
                <div className="client-img">
                  <a href="#">
                    <img src="assets/images/client/02.png" alt="Client Image" />
                  </a>
                </div>
              </div>
              <div className="client-item">
                <div className="client-img">
                  <a href="#">
                    <img src="assets/images/client/03.png" alt="Client Image" />
                  </a>
                </div>
              </div>
              <div className="client-item">
                <div className="client-img">
                  <a href="#">
                    <img src="assets/images/client/04.png" alt="Client Image" />
                  </a>
                </div>
              </div>
              <div className="client-item">
                <div className="client-img">
                  <a href="#">
                    <img src="assets/images/client/02.png" alt="Client Image" />
                  </a>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
      {/* <!--====== End Client Section ======--> */}
      {/* <!--====== Start Blog Section ======--> */}
      <section className="blog-area pt-115 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center mb-60 wow fadeInUp">
                <span className="sub-title">Recent Articles</span>
                <h2>Every Single Journal</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="blog-post-item blog-post-item-one mb-40 wow fadeInUp"
                data-wow-delay="10ms"
              >
                <div className="post-thumbnail">
                  <Link href="/blog-details">
                    <img src="assets/images/blog/blog-1.jpg" alt="Blog Image" />
                  </Link>
                  <div className="post-date">
                    <a href="#">
                      20 <span>Oct</span>
                    </a>
                  </div>
                </div>
                <div className="entry-content">
                  <a href="#" className="cat-btn">
                    <i className="ti-bookmark-alt"></i>Tours & Travel
                  </a>
                  <h3 className="title">
                    <Link href="/blog-details">
                      Duis nonummy socios mattis tempus penatibus
                    </Link>
                  </h3>
                  <div className="post-meta">
                    <ul>
                      <li>
                        <span>
                          <i className="ti-comments-smiley"></i>
                          <a href="#">0 Comment</a>
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="ti-id-badge"></i>
                          <a href="#">By admin</a>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="blog-post-item blog-post-item-one mb-40 wow fadeInUp"
                data-wow-delay="20ms"
              >
                <div className="post-thumbnail">
                  <Link href="/blog-details">
                    <img src="assets/images/blog/blog-2.jpg" alt="Blog Image" />
                  </Link>
                  <div className="post-date">
                    <a href="#">
                      20 <span>Oct</span>
                    </a>
                  </div>
                </div>
                <div className="entry-content">
                  <a href="#" className="cat-btn">
                    <i className="ti-bookmark-alt"></i>Tours & Travel
                  </a>
                  <h3 className="title">
                    <Link href="/blog-details">
                      Litora phasellus in phasellus curabitur porta eun
                    </Link>
                  </h3>
                  <div className="post-meta">
                    <ul>
                      <li>
                        <span>
                          <i className="ti-comments-smiley"></i>
                          <a href="#">0 Comment</a>
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="ti-id-badge"></i>
                          <a href="#">By admin</a>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="blog-post-item blog-post-item-one mb-40 wow fadeInUp"
                data-wow-delay="310ms"
              >
                <div className="post-thumbnail">
                  <Link href="/blog-details">
                    <img src="assets/images/blog/blog-3.jpg" alt="Blog Image" />
                  </Link>
                  <div className="post-date">
                    <a href="#">
                      20 <span>Oct</span>
                    </a>
                  </div>
                </div>
                <div className="entry-content">
                  <a href="#" className="cat-btn">
                    <i className="ti-bookmark-alt"></i> Tours & Travel
                  </a>
                  <h3 className="title">
                    <Link href="/blog-details">
                      Mattis parturent tortor lectus lestie sapien Dapus
                    </Link>
                  </h3>
                  <div className="post-meta">
                    <ul>
                      <li>
                        <span>
                          <i className="ti-comments-smiley"></i>
                          <a href="#">0 Comment</a>
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="ti-id-badge"></i>
                          <a href="#">By admin</a>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="button text-center mt-40">
                <Link href="/blog" className="main-btn icon-btn">
                  View Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--====== End Blog Section ======--> */}
    </Layout>
  );
};
export default Index;
