import Link from "next/link";
import React, { Fragment } from "react";

// export const Home = () => (
//   <Fragment>
//     <li className="menu-item">
//       <Link href="/">Home One</Link>
//     </li>
//     <li className="menu-item">
//       <Link href="/index-2">Home Two</Link>
//     </li>
//     <li className="menu-item">
//       <Link href="/index-3">Home Three</Link>
//     </li>
//   </Fragment>
// );

export const Home = () => (
  <Fragment>
    <li className="menu-item">
      <Link href="/">Home</Link>
    </li>
    {/* <li className="menu-item">
      <Link href="/index-2">Home Two</Link>
    </li>
    <li className="menu-item">
      <Link href="/index-3">Home Three</Link>
    </li> */}
  </Fragment>
);




// export const Categories = () => (
//   <Fragment>
//     <li className="menu-item">
//       <Link href="/category">Category</Link>
//     </li>
//   </Fragment>
// );

export const Categories = () => (
  <Fragment>
    <li className="menu-item mega-menu">
      {/* <Link href="/category">Category</Link> */}
      <div className="mega-menu-content">
        <div className="mega-menu-column">
          <h5>Events</h5>
          <ul>
            <li><Link href="/events/music">Music Events</Link></li>
            <li><Link href="/events/sports">Sports Events</Link></li>
            <li><Link href="/events/festivals">Festivals</Link></li>
          </ul>
        </div>
        <div className="mega-menu-column">
          <h5>Workshops</h5>
          <ul>
            <li><Link href="/workshops/tech">Tech</Link></li>
            <li><Link href="/workshops/art">Art</Link></li>
            <li><Link href="/workshops/culinary">Culinary</Link></li>
          </ul>
        </div>
        <div className="mega-menu-column">
          <h5>Exhibitions</h5>
          <ul>
            <li><Link href="/exhibitions/art">Art Shows</Link></li>
            <li><Link href="/exhibitions/book">Book Fairs</Link></li>
            <li><Link href="/exhibitions/auto">Auto Expo</Link></li>
          </ul>
        </div>
        <div className="mega-menu-column">
          <h5>Online</h5>
          <ul>
            <li><Link href="/online/webinars">Webinars</Link></li>
            <li><Link href="/online/conferences">Conferences</Link></li>
            <li><Link href="/online/courses">Courses</Link></li>
          </ul>
        </div>
      </div>
    </li>
  </Fragment>
);

export const Blog = () => (
  <Fragment>
    <li className="menu-item">
      <Link href="/blog">Blog</Link>
    </li>
  </Fragment>
);
export const Listing = () => (
  <Fragment>
    <li className="menu-item">
      <Link href="/listing-list">Listing List</Link>
    </li>
    <li className="menu-item">
      <Link href="/listing-grid">Listing Grid</Link>
    </li>
    <li className="menu-item">
      <Link href="/listing-map">Listing Map Grid</Link>
    </li>
    <li className="menu-item">
      <Link href="/listing-details-1">Listing Details One</Link>
    </li>
    <li className="menu-item">
      <Link href="/listing-details-2">Listing Details Two</Link>
    </li>
  </Fragment>
);
export const Pages = () => (
  <Fragment>
    <li className="menu-item">
      <Link href="/add-listing">Add Listing</Link>
    </li>
    <li>
      <Link href="/city">Our City</Link>
    </li>
    <li>
      <Link href="/product-details">Products Details</Link>
    </li>
    <li className="menu-item">
      <Link href="/how-work">How Work</Link>
    </li>
    <li className="menu-item">
      <Link href="/pricing">Pricing</Link>
    </li>
  </Fragment>
);
// export const Blog = () => (
//   <Fragment>
//     <li className="menu-item">
//       <Link href="/blog">Our Blog</Link>
//     </li>
//     <li className="menu-item">
//       <Link href="/blog-details">Blog details</Link>
//     </li>
//   </Fragment>
// );
export const Contact = () => (
  <Fragment>
    <li className="menu-item">
      <Link href="/contact">Contact</Link>
    </li>
  </Fragment>
);
