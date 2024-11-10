import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className='flex flex-col'>
      <Navbar />
      <>
        <section className="slider">
            <div style={{ marginBottom: "0%" }}>
            <div className="hero-slider">
                {/* Start Single Slider */}
                <div
                className="single-slider"
                style={{ backgroundImage: 'url("images/kibaki.jpg")' }}
                >
                <div className="container">
                    <div className="row">
                    <div className="col-lg-7">
                        {/*<div class="text">
                                            <h1>We Provide <span>devolution</span> information that you can not get <span>anywhere</span></h1>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam. </p>
                                            <div class="button">
                                                <a href="#" class="btn"></a>
                                                <a href="#" class="btn primary">contact us</a>
                                            </div>
                                        </div>*/}
                    </div>
                    </div>
                </div>
                </div>
                {/* End Single Slider */}
                {/* Start Single Slider */}
                <div
                className="single-slider"
                style={{ backgroundImage: 'url("images/igrtc pic.jpg")' }}
                >
                <div className="container">
                    <div className="row">
                    <div className="col-lg-7">
                        {/*<div class="text">
                                            <h1>We Provide <span>devolution</span> information that you can not get <span>anywhere!</span></h1>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam. </p>
                                            <div class="button">
                                                <a href="#" class="btn"></a>
                                                <a href="#" class="btn primary">About Us</a>
                                            </div>
                                        </div>*/}
                    </div>
                    </div>
                </div>
                </div>
                {/* Start End Slider */}
                {/* Start Single Slider */}
                <div
                className="single-slider"
                style={{ backgroundImage: 'url("images/pic 3.jpg")' }}
                >
                <div className="container">
                    <div className="row">
                    <div className="col-lg-7"></div>
                    </div>
                </div>
                </div>
                {/* End Single Slider */}
            </div>
            </div>
        </section>
        {/*/ End Slider Area */}
        {/* Start Schedule Area */}
        <section className="schedule">
            <div className="container">
            <div className="schedule-inner">
                <div className="row">
                <div className="col-lg-4 col-md-6 col-12 ">
                    {/* single-schedule */}
                    <div className="single-schedule first">
                    <div className="inner">
                        <div className="icon">
                        <i className="fa fa-tachometer" />
                        </div>
                        <div className="single-content">
                        <h4>mission</h4>
                        <p>
                            To facilitate effective intergovernmental relations for
                            consolidating and deepening devolution through consultation,
                            cooperation, and coordination to achieve socio-economic
                            development.
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                    {/* single-schedule */}
                    <div className="single-schedule middle">
                    <div className="inner">
                        <div className="icon">
                        <i className="icofont-prescription" />
                        </div>
                        <div className="single-content" style={{ color: "black" }}>
                        <h4>Core Value</h4>
                        <p>
                            To achieve its mission and vision, the Committee is
                            committed to the following core values: -{" "}
                        </p>
                        <li>Professionalism</li>
                        <li>Accountability</li>
                        <li>Impartiality</li>
                        <li>Transparency</li>
                        <li>Integrity</li>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-12">
                    {/* single-schedule */}
                    <div className="single-schedule last">
                    <div className="inner">
                        <div className="icon">
                        <i className="icofont-ui-clock" />
                        </div>
                        <div className="single-content">
                        <h4>Opening Hours</h4>
                        <ul className="time-sidual">
                            <li className="day">
                            Monday - Friday <span>8.00-5.00</span>
                            </li>
                            <li className="day">
                            sartuday &amp; sunday <span>Closed</span>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* Start Why choose */}
        <div className="aboutus">
            <section id="section2" className="why-choose section">
            <div style={{ marginTop: "-12%", marginBottom: "-5%" }}>
                <div className="container">
                <div className="row">
                    <div className="col-lg-12"></div>
                </div>
                <div className="aboutus">
                    <div className="col-lg-12 col-12">
                    {/* Start Choose Left */}
                    <div className="choose-left">
                        <h1>Who We Are</h1>
                        <h3>objective</h3>
                        <p>
                        The proposed project aims to establish both a physical
                        Resource Centre and an online portal to enhance
                        intergovernmental relations (IGR) and disseminate critical
                        information on devolution in Kenya. Together, these platforms
                        will support research, dispute resolution, public awareness,
                        and informed decision-making processes.
                        </p>
                        <h3>Main objective</h3>
                        <p>
                        To create a vibrant, modern Resource Centre and online portal
                        that will provide comprehensive support for IGR institutions
                        and enhance understanding of devolution in Kenya.
                        </p>
                        <div className="row">
                        <div className="col-lg-6">
                            <ul className="list">
                            <h4>Specific objectives</h4>
                            <li>
                                <i className="fa fa-caret-right" />
                                Dissemination of Research and Knowledge{" "}
                            </li>
                            <li>
                                <i className="fa fa-caret-right" />
                                Support for Effective Governance and ADR
                            </li>
                            <li>
                                <i className="fa fa-caret-right" />
                                Platform for Discussion and Exchange of Ideas
                            </li>
                            </ul>
                        </div>
                        <div className="col-lg-6">
                            <ul className="list">
                            <li>
                                <i className="fa fa-caret-right" />
                                Enhanced Public Awareness and Information Accessibility{" "}
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </div>
        {/* Start Feautes */}
        <section className="Feautes section">
            <main role="main" className="vundi">
            <div className="pt-0 pb-0 m-5 bg-white text-danger text-center">
                <h1>
                {" "}
                <a className="text-danger">Devolution stories</a>
                </h1>
            </div>
            <div>
                {/*<div class="svgbg">*/}
                <div style={{ marginTop: "-4%" }}>
                <div style={{ paddingLeft: "11%" }}>
                    <div className="row text-center">
                    <div className="card m-2 " style={{ width: "18rem", height: 18 }}>
                        <img
                        src="images/newconstitution.jpeg"
                        className="card-img-top"
                        width={200}
                        height={200}
                        alt="..."
                        />
                        <div className="card-body">
                        <h5 className="card-title">title</h5>
                        <p className="card-text">
                            Some quick example text to build on the card title and make
                            up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-danger stretched-link">
                            read more
                        </a>
                        </div>
                    </div>
                    <div className="card m-2" style={{ width: "18rem", height: 18 }}>
                        <img
                        src="images/res1.jpeg"
                        className="card-img-top"
                        width={200}
                        height={200}
                        alt="..."
                        />
                        <div className="card-body">
                        <h5 className="card-title">title</h5>
                        <p className="card-text">
                            Some quick example text to build on the card title and make
                            up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-danger">
                            read more
                        </a>
                        </div>
                    </div>
                    <div className="card m-2" style={{ width: "18rem", height: 18 }}>
                        <img
                        src="images/res6.jpeg"
                        className="card-img-top"
                        width={200}
                        height={200}
                        alt="..."
                        />
                        <div className="card-body">
                        <h5 className="card-title">title</h5>
                        <p className="card-text">
                            Some quick example text to build on the card title and make
                            up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-danger">
                            read more
                        </a>
                        </div>
                    </div>
                    <div className="card m-2" style={{ width: "18rem", height: 18 }}>
                        <img
                        src="images/res3.jpeg"
                        className="card-img-top"
                        width={200}
                        height={200}
                        alt="..."
                        />
                        <div className="card-body">
                        <h5 className="card-title">title</h5>
                        <p className="card-text">
                            Some quick example text to build on the card title and make
                            up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-danger">
                            read more
                        </a>
                        </div>
                    </div>
                    </div>
                    <div className="row text-center pb-1">
                    <div className="card m-2" style={{ width: "18rem", height: 18 }}>
                        <img
                        src="images/res4.jpeg"
                        className="card-img-top"
                        width={200}
                        height={200}
                        alt="..."
                        />
                        <div className="card-body">
                        <h5 className="card-title">title</h5>
                        <p className="card-text">
                            Some quick example text to build on the card title and make
                            up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-danger">
                            read more
                        </a>
                        </div>
                    </div>
                    <div className="card m-2" style={{ width: "18rem" }}>
                        <img
                        src="images/res5.jpeg"
                        className="card-img-top"
                        width={200}
                        height={200}
                        alt="..."
                        />
                        <div className="card-body">
                        <h5 className="card-title">title</h5>
                        <p className="card-text">
                            Some quick example text to build on the card title and make
                            up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-danger">
                            read more
                        </a>
                        </div>
                    </div>
                    <div className="card m-2" style={{ width: "18rem" }}>
                        <img
                        src="images/res2.jpeg"
                        className="card-img-top"
                        width={200}
                        height={200}
                        alt="..."
                        />
                        <div className="card-body">
                        <h5 className="card-title">title</h5>
                        <p className="card-text">
                            Some quick example text to build on the card title and make
                            up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-danger">
                            read more
                        </a>
                        </div>
                    </div>
                    <div className="card m-2" style={{ width: "18rem" }}>
                        <img
                        src="images/res7.jpeg"
                        className="card-img-top"
                        height={200}
                        width={200}
                        alt="..."
                        />
                        <div className="card-body">
                        <h5 className="card-title">title</h5>
                        <p className="card-text">
                            Some quick example text to build on the card title and make
                            up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-danger">
                            read more
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </main>
        </section>
        {/*/ End Feautes */}
        {/* Start Fun-facts */}
        <div id="fun-facts" className="fun-facts section overlay">
            <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6 col-12">
                {/* Start Single Fun */}
                <div className="single-fun">
                    <i className="icofont icofont-world" />
                    <div className="content">
                    <span className="counter">47</span>
                    <p>Counties</p>
                    </div>
                </div>
                {/* End Single Fun */}
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                {/* Start Single Fun */}
                <div className="single-fun">
                    <i className="icofont icofont-read-book" />
                    <div className="content">
                    <span className="counter">300</span>
                    <p>Devolution stories</p>
                    </div>
                </div>
                {/* End Single Fun */}
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                {/* Start Single Fun */}
                <div className="single-fun">
                    <i className="icofont icofont-users" />
                    <div className="content">
                    <span className="counter">50000000 </span>
                    <p>Citizens</p>
                    </div>
                </div>
                {/* End Single Fun */}
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                {/* Start Single Fun */}
                <div className="single-fun">
                    <i className="icofont icofont-wall-clock" />
                    <div className="content">
                    <span className="counter">14</span>
                    <p>Years of devolution</p>
                    </div>
                </div>
                {/* End Single Fun */}
                </div>
            </div>
            </div>
        </div>
        {/*/ End Fun-facts */}
        <section className="blog section" id="blog">
            <div className="container">
            <div className="section-title" style={{ backgroundColor: "beige" }}>
                <h2>News Updates</h2>
            </div>
            </div>
            <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-6 col-12">
                <div className="single-news">
                    <iframe
                    width={500}
                    height={275}
                    src="https://www.youtube.com/embed/0i2Xiu5E3C0?si=QtJhQMLHbS-iWzJp"
                    title="YouTube video player"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen=""
                    alt="cant load video"
                    />
                </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                <div className="single-news">
                    <iframe
                    width={500}
                    height={275}
                    src="https://www.youtube.com/embed/qO0MsP5C6Qk?si=19jkPU2Z3bpRvb8m"
                    title="YouTube video player"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen=""
                    alt="devolution"
                    />
                    <a style={{ textAlign: "center" }}>Transfer of functions </a>
                </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                <div className="single-news">
                    <iframe
                    width={500}
                    height={275}
                    src="https://www.youtube.com/embed/9YG6c7U3VPY?si=lK_WjE-1pFcq7XSP"
                    title="YouTube video player"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen=""
                    alt="cant load video"
                    />
                </div>
                </div>
            </div>
            </div>
        </section>
        <div className="container" style={{ backgroundColor: "beige" }}>
            <h2>Social media</h2>
        </div>
        <div className="container-fluid">
            <div
            style={{ marginLeft: "50%", marginRight: "auto", textAlign: "center" }}
            >
            <a
                className="twitter-timeline"
                data-width={300}
                data-height={400}
                data-theme="dark"
                href="https://twitter.com/IGRTC_KE?ref_src=twsrc%5Etfw"
            >
                Tweets by IGRTC_KE
            </a>
            </div>
        </div>
        <div className="marqueestyle py-4">
            <div className="sponsors text-center mb-3">
                <h1>
                <span className="text-danger">Our Sponsors</span>
                </h1>
            </div>
            <div className="sponsor-marquee d-flex align-items-center">
                <div className="scrolling-wrapper">
                <img
                    src="images/igrtclogo.png"
                    width={100}
                    height={80}
                    alt="IGRTC Logo"
                    className="sponsor-logo"
                />
                <img
                    src="images/cog logo.png"
                    width={100}
                    height={80}
                    alt="COG Logo"
                    className="sponsor-logo"
                />
                <img
                    src="images/cbankafricalogo.png"
                    width={100}
                    height={80}
                    alt="Central Bank of Africa Logo"
                    className="sponsor-logo"
                />
                <img
                    src="images/IMFLOGO.png"
                    width={100}
                    height={80}
                    alt="IMF Logo"
                    className="sponsor-logo"
                />
                </div>
            </div>
        </div>

        {/* Start Feedback */}
        {/*<section class="appointment">
                    <div class="bg-light">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="section-title">
                                        <h2>Give your feedback below</h2>
                                        <img src="images/ugatuzi-lg.svg" height="350" width="350" alt="#">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 col-md-12 col-12">
                                    <form class="form" action="#">
                                        <div class="row">
                                            <div class="col-lg-6 col-md-6 col-12">
                                                <div class="form-group">
                                                    <input name="name" type="text" placeholder="Name">
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-12">
                                                <div class="form-group">
                                                    <input name="email" type="email" placeholder="Email">
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-12">
                                                <div class="form-group">
                                                    <input name="phone" type="text" placeholder="Phone">
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-12">
                                                <div class="form-group">
                                                    <div class="nice-select form-control wide" tabindex="0"><span class="current">place of work</span>
                                                        <ul class="list">
                                                            <li data-value="1" class="option selected ">state department of devolution</li>
                                                            <li data-value="2" class="option">Ministry of ict</li>
                                                            <li data-value="3" class="option">ministry of defence</li>
                                                            <li data-value="4" class="option">other</li>
                                                            <li data-value="5" class="option">private citizen</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                            <div class="col-lg-6 col-md-6 col-12">
                                                <div class="form-group">
                                                    <div class="nice-select form-control wide" tabindex="0"><span class="current">feedback category</span>
                                                        <ul class="list">
                                                            <li data-value="1" class="option selected ">complain</li>
                                                            <li data-value="2" class="option">complement</li>

                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-12">
                                                <div class="form-group">
                                                    <input type="text" placeholder="Date" id="datepicker">
                                                </div>
                                            </div>
                                            <div class="col-lg-12 col-md-12 col-12">
                                                <div class="form-group">
                                                    <textarea name="message" placeholder="Write Your Message Here....."></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-5 col-md-4 col-12">
                                                <div class="form-group">
                                                    <div class="button">
                                                        <button type="submit" class="btn">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-7 col-md-8 col-12">
                                                <p>( We will be confirm by an Text Message )</p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="col-lg-6 col-md-12 ">
                                    <div class="">
                                        <img src="images/feedback icon.png" height="300" width="300" alt="#">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>*/}
        {/* Start Newsletter Area */}
        <section className="newsletter section">
            <div className="container">
            <div className="row ">
                <div className="col-lg-6  col-12">
                {/* Start Newsletter Form */}
                <div className="subscribe-text ">
                    <h6>Sign up for newsletter</h6>
                    <p className="">
                    by submiting your email to us, you agree to subscribe to our
                    newsletters
                    <br /> Free of charge
                    </p>
                </div>
                {/* End Newsletter Form */}
                </div>
                <div className="col-lg-6  col-12">
                {/* Start Newsletter Form */}
                <div className="subscribe-form ">
                    <form
                    action="mail/mail.php"
                    method="get"
                    target="_blank"
                    className="newsletter-inner"
                    >
                    <input
                        name="EMAIL"
                        placeholder="Your email address"
                        className="common-input"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Your email address'"
                        required=""
                        type="email"
                    />
                    <button className="btn">Subscribe</button>
                    </form>
                </div>
                {/* End Newsletter Form */}
                </div>
            </div>
            </div>
        </section>
        {/* /End Newsletter Area */}
        </>

      <Footer />
    </div>
  )
}

export default Home
