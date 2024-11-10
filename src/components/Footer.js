import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer id="footer" className="footer ">
      {/* Footer Top */}
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-footer">
                <h2>About Us</h2>
                <p>
                  The Intergovernmental Relations Technical Committee (IGRTC) is a
                  state agency established by an Act of Parliament; The
                  Intergovernmental Relations Act, 2012 under Section 11.
                </p>
                {/* Social */}
                <ul className="social">
                  <li>
                    <Link to="/">
                      <i className="icofont-facebook" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="icofont-twitter" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="icofont-instagram" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="icofont-linkedin" />
                    </Link>
                  </li>
                </ul>
                {/* End Social */}
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-footer f-link">
                <h2>Quick Links</h2>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <ul>
                      <li>
                        <Link to="/">
                          <i className="fa fa-caret-right" aria-hidden="true" />
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <i className="fa fa-caret-right" aria-hidden="true" />
                          Articles
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <i className="fa fa-caret-right" aria-hidden="true" />
                          News
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <i className="fa fa-caret-right" aria-hidden="true" />
                          Interviews
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <i className="fa fa-caret-right" aria-hidden="true" />
                          Media
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-footer">
                <h2>Open Hours</h2>
                <p>
                  You can visit us at your free time. Be assured to learn of
                  something you never knew about devolution
                </p>
                <ul className="time-sidual">
                  <li className="day">
                    Monday - Friday <span>8.00-5.00</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12" style={{ color: "#ffffff" }}>
              <div className="single-footer">
                <h2>Stakeholders</h2>
                <ul>
                  <li>
                    <Link to="/">1. Office of the President</Link>
                  </li>
                  <li>
                    <Link to="/">2. IGR</Link>
                  </li>
                  <li>
                    <Link to="/">3. Senate</Link>
                  </li>
                  <li>
                    <Link to="/">4. Judiciary</Link>
                  </li>
                  <li>
                    <Link to="/">5. National Treasury</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*/ End Footer Top */}
      {/* Copyright */}
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
              <div className="copyright-content">
                <p>
                  <a href="/">
                    <img
                      src="/images/Ugatuzi-lg.svg"
                      height={150}
                      width={150}
                      alt=""
                    />
                  </a>{" "}
                  © Copyright 2024 | All Rights Reserved by igrtc{" "}
                  <a href="/">
                    <img
                      src="/images/igrtclogo.png"
                      height={150}
                      width={150}
                      alt=""
                    />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*/ End Copyright */}
    </footer>
  );
}

export default Footer;
