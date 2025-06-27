import Link from "next/link";
import React from "react";
import { Categories, Blog, Contact, Home, Listing, Pages } from "../Menu";

const Header1 = () => {
  return (
    <header className="header-area header-area-one d-none d-xl-block">
      <div className="header-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              
            </div>
            <div className="col-md-4">
              <div className="top-content text-center">
                {/* <p>
                  Special offers and events{" "}
                  <Link href="/">Find it</Link>
                </p> */}
              </div>
            </div>
            <div className="col-md-4">
              <div className="top-right">
                <div className="top-social">
                  <ul className="social-link">
                    <li>
                      <span>Follow us:</span>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ti-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ti-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ti-youtube"></i>
                      </a>
                    </li>


                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-navigation">
        <div className="container-fluid">
          <div className="primary-menu">
            <div className="row">
              <div className="col-lg-3 col-5">
                <div className="site-branding">
                  <Link className="brand-logo" href="/">
                    <img className="logo-wi" src="assets/img/fit.png" alt="Brand Logo" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 col-2">
                <div className="nav-menu justify-content-end">
                  <div className="navbar-close">
                    <i className="ti-close"></i>
                  </div>
                  <nav className="main-menu">
                    <ul>
                      {/* <li className="menu-item has-children">
                        <Link href="/">Home</Link>
                        <ul className="sub-menu"> */}
                          <Home />
                        {/* </ul>
                      </li> */}
                      <li className="menu-item has-children">
                        <a href="#">categories</a>
                        <ul className="sub-menu">
                          <Categories />
                        </ul>
                      </li>



                      {/* <Categories /> */}
                      <Blog />
                      <li className="menu-item has-children">
                        <a href="#">Events</a>
                        <ul className="sub-menu">
                          <Listing />
                        </ul>
                      </li>
                      {/* <li className="menu-item has-children">
                        <a href="#">Pages</a>
                        <ul className="sub-menu">
                          <Pages />
                        </ul>
                      </li>
                      <li className="menu-item has-children">
                        <a href="#">Article</a>
                        <ul className="sub-menu">
                          <Blog />
                        </ul>
                      </li> */}
                      <Contact />
                      <li className="nav-btn">
                        <Link className="main-btn icon-btn" href="/add-listing">
                          Add Listing
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-lg-3 col-5">
                <div className="header-right-nav">
                  <ul className="d-flex align-items-center">
                    {/* <li className="user-btn">
                      <Link className="icon" href="/">
                        <i className="flaticon-avatar"></i>
                      </Link>
                    </li> */}
                    <li className="hero-nav-btn">
                      <Link className="main-btn icon-btn" href="/add-listing">
                        List with Us
                      </Link>
                    </li>
                    <li className="nav-toggle-btn">
                      <div className="navbar-toggler">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header1;
