"use client";
import Counter from "@/src/components/Counter";
import VideoPopup from "@/src/components/VideoPopup";
import Layout from "@/src/layouts/Layout";
import SearchForm from '@/src/components/SearchForm';
import DestinationCategory from '@/src/components/DestinationCategory';
import LatestDestination from '@/src/components/LatestDestination';
import TestimoinalSlider2 from "@/src/components/Slider/TestimonialSlider2";

import ImageGrid from '@/src/components/ImageGrid';
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
                    Search and Find <br/>around Us
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
     



      {/*====== Start Latest Destination Section ======*/}
      <section className="category-area pt-80 pb-60">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title section-title-two text-center  wow fadeInUp">
                <h2>
                  <span className="line">Featured</span> Listing
                </h2>
              </div>
            </div>
          </div>


          <div style={{ width: "100%", maxWidth: "1200px", margin: "auto" }}>
            <LatestDestination />
          </div>

        </div>
      </section>
      {/*====== End Latest Desstination Section ======*/}



{/*====== Start category Section ======*/}
      <section className="category-area bg-cat pt-80 pb-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title section-title-two text-center mb-30 wow fadeInUp">
                <h2>
                  <span className="line">Prime</span> Categories
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
     





     







     




{/*====== Start offer Section ======*/}
<section className="cta-area ">
        <div
          className="cta-wrapper-two bg_cover"
          style={{ backgroundImage: "url(assets/images/bg/cta-bg-2.jpg)" }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12 pb-20">
                {/* <div className="company-name wow fadeInLeft">Bangalore</div> */}
                <div className="cta-content-box fadeInRight">
                  <h2>Find Upcoming Events in Bangalore</h2>
                  <p>
                    Pharetra venenatis ante pulvinar fermentum dignissim one
                    malesuada laoreet ridiculus fringilla quam
                  </p>
                  
                </div>

              </div>
                

              <ImageGrid/>


              



              
              
            </div>
          </div>
        </div>
      </section>
      {/*====== End offer Section ======*/}






{/*====== Start Place Section ======*/}
<section className="place-area pt-80 pb-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title section-title-two text-center mb-55 wow fadeInUp">
                <h2>
                  <span className="line">Travel</span> Destinations
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="place-item place-item-two mb-30 wow fadeInUp"
                data-wow-delay=".2s"
              >
                <div className="place-thumbnail">
                  <img
                    src="assets/images/place/place-5.jpg"
                    alt="place Image"
                  />
                  <div className="place-overlay">
                    <div className="place-content d-flex align-items-center">
                      <div className="info">
                        <span className="span">Spain</span>
                        <h4>Barcelona</h4>
                      </div>
                      <div className="icon">
                        <span className="number">15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="place-item place-item-two mb-30 wow fadeInUp"
                data-wow-delay=".25s"
              >
                <div className="place-thumbnail">
                  <img
                    src="assets/images/place/place-6.jpg"
                    alt="place Image"
                  />
                  <div className="place-overlay">
                    <div className="place-content d-flex align-items-center">
                      <div className="info">
                        <span className="span">Spain</span>
                        <h4>Barcelona</h4>
                      </div>
                      <div className="icon">
                        <span className="number">15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="place-item place-item-two mb-30 wow fadeInUp"
                data-wow-delay=".30s"
              >
                <div className="place-thumbnail">
                  <img
                    src="assets/images/place/place-7.jpg"
                    alt="place Image"
                  />
                  <div className="place-overlay">
                    <div className="place-content d-flex align-items-center">
                      <div className="info">
                        <span className="span">Spain</span>
                        <h4>Barcelona</h4>
                      </div>
                      <div className="icon">
                        <span className="number">15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="place-item place-item-two mb-30 wow fadeInUp"
                data-wow-delay=".35s"
              >
                <div className="place-thumbnail">
                  <img
                    src="assets/images/place/place-8.jpg"
                    alt="place Image"
                  />
                  <div className="place-overlay">
                    <div className="place-content d-flex align-items-center">
                      <div className="info">
                        <span className="span">Spain</span>
                        <h4>Barcelona</h4>
                      </div>
                      <div className="icon">
                        <span className="number">15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="place-item place-item-two mb-30 wow fadeInUp"
                data-wow-delay=".40s"
              >
                <div className="place-thumbnail">
                  <img
                    src="assets/images/place/place-9.jpg"
                    alt="place Image"
                  />
                  <div className="place-overlay">
                    <div className="place-content d-flex align-items-center">
                      <div className="info">
                        <span className="span">Spain</span>
                        <h4>Barcelona</h4>
                      </div>
                      <div className="icon">
                        <span className="number">15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="place-item place-item-two mb-30 wow fadeInUp"
                data-wow-delay=".45s"
              >
                <div className="place-thumbnail">
                  <img
                    src="assets/images/place/place-10.jpg"
                    alt="place Image"
                  />
                  <div className="place-overlay">
                    <div className="place-content d-flex align-items-center">
                      <div className="info">
                        <span className="span">Spain</span>
                        <h4>Barcelona</h4>
                      </div>
                      <div className="icon">
                        <span className="number">15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Place Section ======*/}

      {/*====== Start Testimonial Section ======*/}
            {/* <section className="testimonial-area pt-120 pb-120">
              <div className="container">
                <div className="testimonial-wrapper-two">
                  <div className="row no-gutters">
                    <div className="col-lg-6">
                      <div
                        className="testimonial-bg bg_cover wow fadeInLeft"
                        style={{
                          backgroundImage:
                            "url(assets/images/testimonial/testimonial-img-1.jpg)",
                        }}
                      />
                    </div>
                    <div className="col-lg-6">
                      <div
                        className="testimonial-content-box bg_cover wow fadeInRight"
                        style={{
                          backgroundImage:
                            "url(assets/images/bg/testimonial-bg-3.jpg)",
                        }}
                      >
                        <div className="section-title section-title-left mb-45">
                          <span className="sub-title">Customer Feedback</span>
                          <h2>Customer Say</h2>
                        </div>
                        <div className="testimonial-review-area">
                          <TestimoinalSlider2 />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}
            {/*====== End Testimonial Section ======*/}


{/*====== Start Client Section ======*/}
<section className="client-area">
        <div
          className="client-wrapper-two bg_cover pt-120 pb-70"
          style={{
            backgroundImage: "url(assets/images/bg/testimonial-bg-1.jpg)",
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="client-content-box mb-50 wow fadeInLeft">
                  <div className="section-title section-title-left section-title-white mb-35">
                    <span className="sub-title">Premium Partners</span>
                    <h2>Glod Sponsors</h2>
                  </div>
                  <p>
                    Sed ut perspiciatis omnis iste natus error voluptatem
                    accusantium doloremque laudantiu totam rem aperiam eaque
                    quae abillo inventore veritatis quasi architectos beatae
                    vitae dicta sunt explicabo.
                  </p>
                  <Link href="/listing-grid" className="main-btn icon-btn">
                    Explore Now
                  </Link>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="client-item-wrapper mb-50 wow fadeInRight">
                  <div className="client-item client-item-two">
                    <a href="#">
                      <img
                        src="assets/images/client/05.png"
                        alt="client image"
                      />
                    </a>
                  </div>
                  <div className="client-item client-item-two">
                    <a href="#">
                      <img
                        src="assets/images/client/06.png"
                        alt="client image"
                      />
                    </a>
                  </div>
                  <div className="client-item client-item-two">
                    <a href="#">
                      <img
                        src="assets/images/client/07.png"
                        alt="client image"
                      />
                    </a>
                  </div>
                  <div className="client-item client-item-two">
                    <a href="#">
                      <img
                        src="assets/images/client/08.png"
                        alt="client image"
                      />
                    </a>
                  </div>
                  <div className="client-item client-item-two">
                    <a href="#">
                      <img
                        src="assets/images/client/09.png"
                        alt="client image"
                      />
                    </a>
                  </div>
                  <div className="client-item client-item-two">
                    <a href="#">
                      <img
                        src="assets/images/client/10.png"
                        alt="client image"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Client Section ======*/}

             {/* <!--====== Start Blog Section ======--> */}
      <section className="blog-area pt-80 pb-80">
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
              <div className="button text-center mt-0">
                <Link href="/blog" className="main-btn icon-btn">
                  View Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--====== End Blog Section ======--> */}

      {/* <!--====== Start Intro Video Section ======--> */}
      <section className="intro-video ">
        <div
          className="intro-wrapper-one bg_cover pt-80 pb-80"
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
      

      






               </Layout>
  );
};
export default Index;
