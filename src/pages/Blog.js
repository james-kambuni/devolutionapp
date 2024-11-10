import React from 'react'

function Blog() {
  return (
    <>
        <div className="breadcrumbs overlay">
            <div className="container">
            <div className="bread-inner">
                <div className="row">
                <div className="col-12">
                    <h2>Blog Single</h2>
                    <ul className="bread-list">
                    <li>
                        <a href="index.html">Home</a>
                    </li>
                    <li>
                        <i className="icofont-simple-right" />
                    </li>
                    <li className="active">Blog Single</li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </div>
        {/* End Breadcrumbs */}
        {/* Single News */}
        <section className="news-single section">
            <div className="container">
            <div className="row">
                <div className="col-lg-8 col-12">
                <div className="row">
                    <div className="col-12">
                    <div className="single-main">
                        {/* News Head */}
                        <div className="news-head">
                        <img src="images/AdobeStock2.jpeg" alt="#" />
                        </div>
                        {/* News Title */}
                        <h1 className="news-title">
                        <a href="news-single.html">
                            More than 80 clinical trials launch to test of the
                            coronavirus .
                        </a>
                        </h1>
                        {/* Meta */}
                        <div className="meta">
                        <div className="meta-left">
                            <span className="author">
                            <a href="/">
                                <img src="images/AdobeStock3.jpeg" alt="#" />
                                Naimur Rahman
                            </a>
                            </span>
                            <span className="date">
                            <i className="fa fa-clock-o" />
                            03 Feb 2019
                            </span>
                        </div>
                        <div className="meta-right">
                            <span className="comments">
                            <a href="/">
                                <i className="fa fa-comments" />
                                05 Comments
                            </a>
                            </span>
                            <span className="views">
                            <i className="fa fa-eye" />
                            33K Views
                            </span>
                        </div>
                        </div>
                        {/* News Text */}
                        <div className="news-text">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Suspendisse facilisis ultricies tortor, nec sollicitudin
                            lorem sagittis vitae. Curabitur rhoncus commodo rutrum.
                            Pellentesque habitant morbi tristique senectus et netus et
                            malesuada fames ac turpis egestas. Aliquam nec lacus
                            pulvinar, laoreet dolor quis, pellentesque ante. Cras nulla
                            orci, pharetra at dictum consequat, pretium pretium nulla.
                            Suspendisse porttitor nunc a sodales tempor. Mauris sed
                            felis maximus, interdum metus vel, tincidunt diam.
                        </p>
                        <p>
                            Pellentesque habitant morbi tristique senectus et netus et
                            malesuada fames ac turpis egestas. Aliquam nec lacus
                            pulvinar, laoreet dolor quis, pellentesque ante. Cras nulla
                            orci, pharetra at dictum consequat, pretium pretium nulla.
                            Suspendisse porttitor nunc a sodales tempor. Mauris sed
                            felis maximus, interdum metus vel, tincidunt diam. Nam ac
                            risus vitae sem vehicula egestas. Sed velit nulla, viverra
                            non commod
                        </p>
                        <div className="image-gallery">
                            <div className="row">
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="single-image">
                                <img src="images/AdobeStock3.jpeg" alt="#" />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="single-image">
                                <img src="images/AdobeStock4.jpeg" alt="#" />
                                </div>
                            </div>
                            </div>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Suspendisse facilisis ultricies tortor, nec sollicitudin
                            lorem sagittis vitae. Curabitur rhoncus commodo rutrum.
                            Pellentesque habitant morbi tristique senectus et netus et
                            malesuada fames ac turpis egestas. Aliquam nec lacus
                            pulvinar, laoreet dolor quis, pellentesque ante. Cras nulla
                            orci, pharetra at dictum consequat, pretium pretium nulla.
                            Suspendisse porttitor nunc a sodales tempor. Mauris sed
                            felis maximus, interdum metus vel, tincidunt diam.
                        </p>
                        <blockquote className="overlay">
                            <p>
                            Aliquam nec lacus pulvinar, laoreet dolor quis,
                            pellentesque ante. Cras nulla orci, pharetra at dictum
                            consequat, pretium pretium nulla. Suspendisse porttitor
                            nunc a sodales tempor. Mauris sed felis maximus, interdum
                            metus vel, tincidunt diam. Nam ac risus vitae sem vehicula
                            egestas. Sed velit nulla, viverra non commodo et, sodales
                            </p>
                        </blockquote>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Suspendisse facilisis ultricies tortor, nec sollicitudin
                            lorem sagittis vitae. Curabitur rhoncus commodo rutrum.
                            Pellentesque habitant morbi tristique senectus et netus et
                            malesuada fames ac turpis egestas. Aliquam nec lacus
                            pulvinar, laoreet dolor quis, pellentesque ante. Cras nulla
                            orci, pharetra at dictum consequat, pretium pretium nulla.
                            Suspendisse porttitor nunc a sodales tempor. Mauris sed
                            felis maximus, interdum metus vel, tincidunt diam. Nam ac
                            risus vitae sem vehicula egestas. Sed velit nulla, viverra
                            non commodo et, sodales id dui.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Suspendisse facilisis ultricies tortor, nec sollicitudin
                            lorem sagittis vitae. Curabitur rhoncus commodo rutrum.
                            Pellentesque habitant morbi tristique senectus et netus et
                            malesuada fames ac turpis egestas. Aliquam nec lacus
                            pulvinar, laoreet dolor quis, pellentesque ante. Cras nulla
                            orci, pharetra at dictum consequat, pretium pretium nulla.
                            Suspendisse
                        </p>
                        </div>
                        <div className="blog-bottom">
                        {/* Social Share */}
                        <ul className="social-share">
                            <li className="facebook">
                            <a href="/">
                                <i className="fa fa-facebook" />
                                <span>Facebook</span>
                            </a>
                            </li>
                            <li className="twitter">
                            <a href="/">
                                <i className="fa fa-twitter" />
                                <span>Twitter</span>
                            </a>
                            </li>
                            <li className="google-plus">
                            <a href="/">
                                <i className="fa fa-google-plus" />
                            </a>
                            </li>
                        </ul>
                        {/* Next Prev */}
                        <ul className="prev-next">
                            <li className="prev">
                            <a href="/">
                                <i className="fa fa-angle-double-left" />
                            </a>
                            </li>
                            <li className="next">
                            <a href="/">
                                <i className="fa fa-angle-double-right" />
                            </a>
                            </li>
                        </ul>
                        {/*/ End Next Prev */}
                        </div>
                    </div>
                    </div>
                    <div className="col-12">
                    <div className="blog-comments">
                        <h2>All Comments</h2>
                        <div className="comments-body">
                        {/* Single Comments */}
                        <div className="single-comments">
                            <div className="main">
                            <div className="head">
                                <img src="img/author1.jpg" alt="#" />
                            </div>
                            <div className="body">
                                <h4>Afsana Mimi</h4>
                                <div className="comment-meta">
                                <span className="meta">
                                    <i className="fa fa-calendar" />
                                    March 05, 2019
                                </span>
                                <span className="meta">
                                    <i className="fa fa-clock-o" />
                                    03:38 AM
                                </span>
                                </div>
                                <p>
                                Lorem Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words Mirum est notare quam littera
                                gothica, quam nunc putamus parum claram, anteposuerit
                                litterarum formas
                                </p>
                                <a href="/">
                                <i className="fa fa-reply" />
                                replay
                                </a>
                            </div>
                            </div>
                        </div>
                        {/*/ End Single Comments */}
                        {/* Single Comments */}
                        <div className="single-comments left">
                            <div className="main">
                            <div className="head">
                                <img src="img/author2.jpg" alt="#" />
                            </div>
                            <div className="body">
                                <h4>Naimur Rahman</h4>
                                <div className="comment-meta">
                                <span className="meta">
                                    <i className="fa fa-calendar" />
                                    March 05, 2019
                                </span>
                                <span className="meta">
                                    <i className="fa fa-clock-o" />
                                    03:38 AM
                                </span>
                                </div>
                                <p>
                                Lorem Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words Mirum est notare quam littera
                                gothica, quam nunc putamus parum claram, anteposuerit
                                litterarum formas
                                </p>
                                <a href="/">
                                <i className="fa fa-reply" />
                                replay
                                </a>
                            </div>
                            </div>
                        </div>
                        {/*/ End Single Comments */}
                        {/* Single Comments */}
                        <div className="single-comments">
                            <div className="main">
                            <div className="head">
                                <img src="img/author3.jpg" alt="#" />
                            </div>
                            <div className="body">
                                <h4>Suriya Molharta</h4>
                                <div className="comment-meta">
                                <span className="meta">
                                    <i className="fa fa-calendar" />
                                    March 05, 2019
                                </span>
                                <span className="meta">
                                    <i className="fa fa-clock-o" />
                                    03:38 AM
                                </span>
                                </div>
                                <p>
                                Lorem Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words Mirum est notare quam littera
                                gothica, quam nunc putamus parum claram, anteposuerit
                                litterarum formas
                                </p>
                                <a href="/">
                                <i className="fa fa-reply" />
                                replay
                                </a>
                            </div>
                            </div>
                        </div>
                        {/*/ End Single Comments */}
                        </div>
                    </div>
                    </div>
                    <div className="col-12">
                    <div className="comments-form">
                        <h2>Leave Comments</h2>
                        {/* Contact Form */}
                        <form className="form" method="post" action="mail/mail.php">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-12">
                            <div className="form-group">
                                <i className="fa fa-user" />
                                <input
                                type="text"
                                name="first-name"
                                placeholder="First name"
                                required="required"
                                />
                            </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-12">
                            <div className="form-group">
                                <i className="fa fa-envelope" />
                                <input
                                type="text"
                                name="last-name"
                                placeholder="Last name"
                                required="required"
                                />
                            </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-12">
                            <div className="form-group">
                                <i className="fa fa-envelope" />
                                <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                required="required"
                                />
                            </div>
                            </div>
                            <div className="col-12">
                            <div className="form-group message">
                                <i className="fa fa-pencil" />
                                <textarea
                                name="message"
                                rows={7}
                                placeholder="Type Your Message Here"
                                defaultValue={""}
                                />
                            </div>
                            </div>
                            <div className="col-12">
                            <div className="form-group button">
                                <button type="submit" className="btn primary">
                                <i className="fa fa-send" />
                                Submit Comment
                                </button>
                            </div>
                            </div>
                        </div>
                        </form>
                        {/*/ End Contact Form */}
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-4 col-12">
                <div className="main-sidebar">
                    {/* Single Widget */}
                    <div className="single-widget search">
                    <div className="form">
                        <input type="email" placeholder="Search Here..." />
                        <a className="button" href="/">
                        <i className="fa fa-search" />
                        </a>
                    </div>
                    </div>
                    {/*/ End Single Widget */}
                    {/* Single Widget */}

                    {/*/ End Single Widget */}
                    {/* Single Widget */}
                    <div className="single-widget recent-post">
                    <h3 className="title">Recent post</h3>
                    {/* Single Post */}
                    <div className="single-post">
                        <div className="image">
                        <img src="img/blog-sidebar1.jpg" alt="#" />
                        </div>
                        <div className="content">
                        <h5>
                            <a href="/">We have annnocuced our new product.</a>
                        </h5>
                        <ul className="comment">
                            <li>
                            <i className="fa fa-calendar" aria-hidden="true" />
                            Jan 11, 2020
                            </li>
                            <li>
                            <i className="fa fa-commenting-o" aria-hidden="true" />
                            35
                            </li>
                        </ul>
                        </div>
                    </div>
                    {/* End Single Post */}
                    {/* Single Post */}
                    <div className="single-post">
                        <div className="image">
                        <img src="img/blog-sidebar2.jpg" alt="#" />
                        </div>
                        <div className="content">
                        <h5>
                            <a href="/">Top five way for solving teeth problems.</a>
                        </h5>
                        <ul className="comment">
                            <li>
                            <i className="fa fa-calendar" aria-hidden="true" />
                            Mar 05, 2019
                            </li>
                            <li>
                            <i className="fa fa-commenting-o" aria-hidden="true" />
                            59
                            </li>
                        </ul>
                        </div>
                    </div>
                    {/* End Single Post */}
                    {/* Single Post */}
                    <div className="single-post">
                        <div className="image">
                        <img src="img/blog-sidebar3.jpg" alt="#" />
                        </div>
                        <div className="content">
                        <h5>
                            <a href="/">We provide highly business soliutions.</a>
                        </h5>
                        <ul className="comment">
                            <li>
                            <i className="fa fa-calendar" aria-hidden="true" />
                            June 09, 2019
                            </li>
                            <li>
                            <i className="fa fa-commenting-o" aria-hidden="true" />
                            44
                            </li>
                        </ul>
                        </div>
                    </div>
                    {/* End Single Post */}
                    </div>
                    {/*/ End Single Widget */}
                    {/* Single Widget */}
                    {/*/ End Single Widget */}
                    {/* Single Widget */}
                    <div className="single-widget side-tags">
                    </div>
                    {/*/ End Single Widget */}
                </div>
                </div>
            </div>
            </div>
        </section>
    </>

  )
}

export default Blog
