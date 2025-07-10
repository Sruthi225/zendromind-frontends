import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";


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



export const Categories = ({ categories = [] }) => {
   return (
    <Fragment>
      
      <li
        className="menu-item"
        // onMouseEnter
        // onClick={handleOpenMenu} // Fetch on every hover
      >
        <div className="mega-menu-content">
          { categories.length > 0 ? (
            categories.map((cat) => (
              <div key={cat.N_T_M_Category_ID} className="mega-menu-column">
                <Link href={`/category/${cat.N_T_M_Category_ID}`}>
                       <h5>{cat.V_CategoryName}</h5>
                </Link>
                {cat.SubCategory && cat.SubCategory.length > 0 ? (
                  <ul>
                    {
                      cat.SubCategory.map((subCat) => (
                        <li key={subCat.N_T_M_Category_ID}>
                          <Link href={`/category/${subCat.N_T_M_Category_ID}`}>
                            {subCat.V_CategoryName}
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                ) 
                : null}
              </div>
            ))
          ) 
        : (
        <li>No categories found.</li>
      )}
        </div>
      </li>
    </Fragment>
   )
};


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
