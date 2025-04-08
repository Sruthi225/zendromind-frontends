import Slider from 'react-slick';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

// Sample data
const listingData = [
{
id: 1,
imgSrc: "/assets/images/listing/listing-grid-7.jpg",
title: "Pizza Recipe",
categoryName: "Mall",
reviews: 2,
location: "California, USA",
phone: "+98 (265) 3652 - 05",
whatsapp: "9898989898",
website: "https://example.com",
mapLink: "https://www.google.com/maps?q=California,USA",
status: "Open",
featured: true,
},
{
id: 2,
imgSrc: "/assets/images/listing/listing-grid-8.jpg",
title: "Gym Ground",
categoryName: "Restaurant",
reviews: 2,
location: "California, USA",
phone: "+98 (265) 3652 - 05",
whatsapp: "9898989899",
website: "https://example.com",
mapLink: "https://www.google.com/maps?q=California,USA",
status: "Close",
featured: false,
},
{
id: 3,
imgSrc: '/assets/images/listing/listing-grid-9.jpg',
title: 'City Palace',
categoryName: 'flaticon-government',
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
categoryName: 'flaticon-chef',
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
<div className={className} style={{ ...style,display: "flex" , right: '-46px' , zIndex: 10 }} onClick={onClick}>
    <FontAwesomeIcon icon={faArrowRight} size="lg" color="#000" />
</div>
);
};

const SamplePrevArrow = (props) => {
const { className, style, onClick } = props;
return (
<div className={className} style={{ ...style,display: "flex" , left: '10px' , zIndex: 10 }} onClick={onClick}>
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
return (
<section className="listing-grid-area">
    <div className="container">
        <Slider {...sliderSettings} className="listing-slider-one wow fadeInDown">
            {listingData.map((item) => (
            <div key={item.id} className="listing-item listing-grid-item-two">
                <div className="listing-thumbnail">
                    <img src={item.imgSrc} alt="Listing Image" />
                    <div className="cat-name">{item.categoryName}</div>
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
                    <div className="li-padding">
                        <h3 className="title">
                            <Link href="/listing-details-1">{item.title}</Link>
                        </h3>
                        <p>
                            <i className="ti-location-pin"></i> {item.location}
                        </p>
                        <span className="phone-meta">
                            <i className="ti-tablet"></i>
                            <a href={`tel:${item.phone}`}>{item.phone}</a>
                        </span>

                        {/* Contact & Links */}
                        <div className="listing-meta list-meta2 d-flex justify-content-between align-items-center">
                            <a href={item.viewMoreLink}>
                                <div className="view-more">View More</div>
                            </a>
                            <div className="icons d-flex align-items-center">
                                {/* WhatsApp */}
                                <a className="li-icon" href={`https://wa.me/${item.whatsapp}`} target="_blank"
                                    rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faWhatsapp} />
                                </a>
                                {/* Website */}
                                <a className="li-icon" href={item.website} target="_blank" rel="noopener noreferrer">
                                    <i className="ti-world"></i>
                                </a>
                                {/* Google Maps Location */}
                                <a className="li-icon" href={item.mapLink} target="_blank" rel="noopener noreferrer">
                                    <i className="ti-location-pin"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </Slider>
    </div>
</section>
);
};

export default LatestDestination; this is my component. i want to add the api.
http://13.203.104.113:3000/api/user/get/city_details/findintrivandrum to this