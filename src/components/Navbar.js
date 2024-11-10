import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="header z-50">
      {/* Topbar */}
      <div className="topbar">
        <div className="container" style={{ backgroundColor: "black" }}>
          <div className="row">
            <div className="col-lg-6 col-md-5 col-12">
              {/* Contact */}
              <ul className="top-link">
                <li>
                  <Link to="/">About us</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact</Link>
                </li>
                <li>
                  <Link to="/">FAQ</Link>
                </li>
              </ul>
              {/* End Contact */}
            </div>
            <div className="col-lg-6 col-md-7 col-12  ">
              {/* Top Contact */}
              <ul className="top-contact">
                <li>
                  <i className="fa fa-phone" />
                  +254 1234 56789
                </li>
                <li>
                  <i className="fa fa-envelope" />
                  <Link to="">resource@igrtc.go.ke</Link>
                </li>
              </ul>
              {/* End Top Contact */}
            </div>
          </div>
        </div>
      </div>
      {/* End Topbar */}
      {/*second topbar*/}
      <div className="topbar2 container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-5 col-12">
              {/* Start Logo */}
              <div className="logo flex items-center self-center">
                <a href="/">
                  <img
                    src="/images/Ugatuzi-lg.svg"
                    alt="Ugatuzi logo"
                    className='lohoimage'
                  />
                </a>
              </div>
              {/* End Logo */}
            </div>
          </div>
        </div>
      </div>
      {/* Header Inner */}
      <div className="header-inner">
        <div className="container-fluid">
          {/*antiquewhite*/}
          <div className="inner container">
            <div className="row">
              <div className="col-lg-1 col-md-3 col-11">
                {/* Mobile Nav */}
                <div className="mobile-nav" />
                {/* End Mobile Nav */}
              </div>
              <div className="col-lg-15 col-md-9 col-12">
                {/* Main Menu */}
                <div className="main-menu">
                  <nav className="navigation">
                    <ul className="nav menu">
                      <li className="active">
                        <a href="/">
                          Home
                        </a>
                      </li>
                      <li className="">
                        <Link to="#section2">About Us</Link>
                      </li>
                      <li>
                        <Link to="#">
                          IGR Structures
                          <i className="icofont-rounded-down" />
                        </Link>
                        <ul className="dropdown">
                          <li>
                            <Link to="case-study.html">IGRTC</Link>
                          </li>
                          <li>
                            <Link to="/">Summit</Link>
                          </li>
                          <li>
                            <Link to="/">IBEC</Link>
                          </li>
                          <li>
                            <Link to="/">COB</Link>
                          </li>
                          <li>
                            <Link to="/">COG</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link to="#">
                          Articles
                          <i className="icofont-rounded-down" />
                        </Link>
                        <ul className="dropdown">
                          <li>
                            <Link to="case-study.html">Research articles</Link>
                          </li>
                          <li>
                            <Link to="/">Policies Documents</Link>
                          </li>
                          <li>
                            <Link to="/case-study">Case study</Link>
                          </li>
                          <li>
                            <Link to="/">Briefs</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link to="#">
                          Event coverage
                          <i className="icofont-rounded-down" />
                        </Link>
                        <ul className="dropdown">
                          <li>
                            <Link to="/">County and National events</Link>
                          </li>
                          <li>
                            <Link to="/">IGR events</Link>
                          </li>
                          <li>
                            <Link to="/">Announcements</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="">
                        <Link to="/contact-us">Contact Us</Link>
                      </li>
                      <li>
                        <Link to="#">
                          Devolution Journey
                          <i className="icofont-rounded-down" />
                        </Link>
                        <ul className="dropdown">
                          <li>
                            <Link to="/">Profiles</Link>
                          </li>
                          <li>
                            <Link to="/">Constitution</Link>
                          </li>
                          <li>
                            <Link to="/">Devolution content</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
                {/*/ End Main Menu */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*/ End Header Inner */}
    </header>
  );
}

export default Navbar;
