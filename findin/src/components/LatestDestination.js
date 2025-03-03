
import Slider from 'react-slick';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


// Sample data
const listingData = [
  {
    id: 1,
    imgSrc: '/assets/images/listing/listing-grid-7.jpg',
    title: 'Pizza Recipe',
    categoryIcon: 'flaticon-chef',
    reviews: 2,
    location: 'California, USA',
    phone: '+98 (265) 3652 - 05',
    status: 'Open',
    featured: true,
  },
  {
    id: 2,
    imgSrc: '/assets/images/listing/listing-grid-8.jpg',
    title: 'Gym Ground',
    categoryIcon: 'flaticon-dumbbell',
    reviews: 2,
    location: 'California, USA',
    phone: '+98 (265) 3652 - 05',
    status: 'Close',
    featured: false,
  },
  {
    id: 3,
    imgSrc: '/assets/images/listing/listing-grid-9.jpg',
    title: 'City Palace',
    categoryIcon: 'flaticon-government',
    reviews: 2,
    location: 'California, USA',
    phone: '+98 (265) 3652 - 05',
    status: 'Open',
    featured: true,
  },
  {
    id: 4,
    imgSrc: '/assets/images/listing/listing-grid-1.jpg',
    title: 'Pizza Recipe',
    categoryIcon: 'flaticon-chef',
    reviews: 2,
    location: 'California, USA',
    phone: '+98 (265) 3652 - 05',
    status: 'Open',
    featured: true,
  },
];






// Custom Arrow Components
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style,display: "flex", right: '-46px', zIndex: 10 }} onClick={onClick}>
      <FontAwesomeIcon icon={faArrowRight} size="lg" color="#000" />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style,display: "flex", left: '10px', zIndex: 10 }} onClick={onClick}>
      <FontAwesomeIcon icon={faArrowLeft} size="lg" color="#000" />
    </div>
  );
};

// Slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
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
  return (
    <section className="listing-grid-area  ">
      <container className="container">
        
        <Slider {...sliderSettings} className="listing-slider-one wow fadeInDown">
          {listingData.map((item) => (
            <listingItem key={item.id} className="listing-item listing-grid-item-two">
              <div className="listing-thumbnail">
                <img src={item.imgSrc} alt="Listing Image" />
                <a href="#" className="cat-btn">
                  <i className={item.categoryIcon}></i>
                </a>
                {item.featured && <span className="featured-btn">Featured</span>}
                <ul className="ratings">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <li className="star" key={index}>
                      <i className="flaticon-star-1"></i>
                    </li>
                  ))}
                  <li>
                    <span>
                      <a href="#">({item.reviews} Reviews)</a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="listing-content">
                <h3 className="title">
                  <Link href="/listing-details-1">{item.title}</Link>
                </h3>
                <p>Popular destination in {item.location}</p>
                <span className="phone-meta">
                  <i className="ti-tablet"></i>
                  <a href={`tel:${item.phone}`}>{item.phone}</a>
                  <span className={`status ${item.status.toLowerCase() === 'open' ? 'st-open' : 'st-close'}`}>
                    {item.status}
                  </span>
                </span>
                <div className="listing-meta">
                  <ul>
                    <li>
                      <span>
                        <i className="ti-location-pin"></i> {item.location}
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
            </listingItem>
          ))}
        </Slider>
      </container>
    </section>
  );
};

export default LatestDestination;
