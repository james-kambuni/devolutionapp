import React from 'react'

function Contact() {
  return (
    <section className="contact-us section">
        <div className="container">
            <div className="inner">
            <div className="row">
                <div className="col-lg-6">
                <div className="contact-us-left">
                    {/*Start Google-map */}
                    <div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.839192898885!2d36.80740327477747!3d-1.2693738987185466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173bc7b1c5c9%3A0x96b797ddb1998b4f!2sParklands%20Plaza!5e0!3m2!1sen!2ske!4v1727269162325!5m2!1sen!2ske"
                        width={600}
                        height={450}
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Contact Page Map"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                    </div>
                    {/*/End Google-map */}
                </div>
                </div>
                <div className="col-lg-6">
                <div className="contact-us-form">
                    <h2>Contact Us</h2>
                    <p>
                    If you have any questions please fell free to contact with us.
                    </p>
                    {/* Form */}
                    <form className="form" method="post" action="mail/mail.php">
                    <div className="row">
                        <div className="col-lg-6">
                        <div className="form-group">
                            <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            required=""
                            />
                        </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="form-group">
                            <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required=""
                            />
                        </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="form-group">
                            <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            required=""
                            />
                        </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="form-group">
                            <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            required=""
                            />
                        </div>
                        </div>
                        <div className="col-lg-12">
                        <div className="form-group">
                            <textarea
                            name="message"
                            placeholder="Your Message"
                            required=""
                            defaultValue={""}
                            />
                        </div>
                        </div>
                        <div className="col-12">
                        <div className="form-group login-btn">
                            <button className="btn" type="submit">
                            Send
                            </button>
                        </div>
                        <div className="checkbox">
                            <label className="checkbox-inline" htmlFor={2}>
                            <input name="news" id={2} type="checkbox" />
                            Do you want to subscribe our Newsletter ?
                            </label>
                        </div>
                        </div>
                    </div>
                    </form>
                    {/*/ End Form */}
                </div>
                </div>
            </div>
            </div>
            <div className="contact-info">
            <div className="row">
                {/* single-info */}
                <div className="col-lg-4 col-12 ">
                <div className="single-info">
                    <i className="icofont icofont-ui-call" />
                    <div className="content">
                    <h3>+254 1234 56789</h3>
                    <p>info@igrtc.co.ke</p>
                    </div>
                </div>
                </div>
                {/*/End single-info */}
                {/* single-info */}
                <div className="col-lg-4 col-12 ">
                <div className="single-info">
                    <i className="icofont-google-map" />
                    <div className="content">
                    <h3>Chiromo ln</h3>
                    <p>parklands plaza</p>
                    </div>
                </div>
                </div>
                {/*/End single-info */}
                {/* single-info */}
                <div className="col-lg-4 col-12 ">
                <div className="single-info">
                    <i className="icofont icofont-wall-clock" />
                    <div className="content">
                    <h3>Mon - Fri: 8am - 5pm</h3>
                    </div>
                </div>
                </div>
                {/*/End single-info */}
            </div>
            </div>
        </div>
    </section>

  )
}

export default Contact
