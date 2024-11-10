import React from 'react'

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
                        <a href="#">About us</a>
                        </li>
                        <li>
                        <a href="contact.html">Contact</a>
                        </li>
                        <li>
                        <a href="#">FAQ</a>
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
                        <a href="">resource@igrtc.go.ke</a>
                        </li>
                    </ul>
                    {/* End Top Contact */}
                    </div>
                </div>
                </div>
            </div>
            {/* End Topbar */}
            {/*second topbar*/}
            <div className="topbar2">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 col-md-5 col-12">
                    {/* Start Logo */}
                    <div className="logo flex items-center self-center">
                        <a href="#">
                        <img
                            src="/images/Ugatuzi-lg.svg"
                            alt="Ugatuzi logo"
                            className='w-10'
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
                <div className="inner">
                    <div className="row">
                    <div className="col-lg-1 col-md-3 col-5">
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
                                <a href="#">
                                Home <i className="icofont-rounded-down" />
                                </a>
                            </li>
                            <li className="">
                                <a href="#section2">About Us</a>
                            </li>
                            <li>
                                <a href="#">
                                IGR Structures
                                <i className="icofont-rounded-down" />
                                </a>
                                <ul className="dropdown">
                                <li>
                                    <a href="case-study.html">IGRTC</a>
                                </li>
                                <li>
                                    <a href="404.html">Summit</a>
                                </li>
                                <li>
                                    <a href="404.html">IBEC</a>
                                </li>
                                <li>
                                    <a href="404.html">COB</a>
                                </li>
                                <li>
                                    <a href="404.html">COG</a>
                                </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">
                                Articles
                                <i className="icofont-rounded-down" />
                                </a>
                                <ul className="dropdown">
                                <li>
                                    <a href="case-study.html">Research articles</a>
                                </li>
                                <li>
                                    <a href="404.html">Policies Documents</a>
                                </li>
                                <li>
                                    <a href="404.html">Case study</a>
                                </li>
                                <li>
                                    <a href="404.html">Briefs</a>
                                </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">
                                Event coverage
                                <i className="icofont-rounded-down" />
                                </a>
                                <ul className="dropdown">
                                <li>
                                    <a href="404.html">County and National events</a>
                                </li>
                                <li>
                                    <a href="404.html">IGR events</a>
                                </li>
                                <li>
                                    <a href="404.html">Announcements</a>
                                </li>
                                </ul>
                            </li>
                            <li className="">
                                <a href="contact.html">Contact Us</a>
                            </li>
                            <li>
                                <a href="#">
                                Devolution Journey
                                <i className="icofont-rounded-down" />
                                </a>
                                <ul className="dropdown">
                                <li>
                                    <a href="404.html">Profiles</a>
                                </li>
                                <li>
                                    <a href="404.html">Constitution</a>
                                </li>
                                <li>
                                    <a href="404.html">Devolution content</a>
                                </li>
                                </ul>
                            </li>
                            {/*<li><a href="#">Event Coverage<i class="icofont-rounded-down"></i></a>
                                                        <ul class="dropdown">
                                                            <li class="dropdown-submenu">
                                                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">News Update</a>
                                                                <ul class="dropdown-menu">
                                                                    <li><a href="#">IGR events</a></li>
                                                                    <li><a href="#">County and National events</a></li>
                                                                    <li class="dropdown-submenu">
                                                                        <li><a href="#" class="" data-toggle="">Announcements</a></li>
                                                                        <ul class="dropdown-menu">
                                                                            
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                            <li>
                                                            </li>
                                                        </ul>
                                                    </li>*/}
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

  )
}

export default Navbar
