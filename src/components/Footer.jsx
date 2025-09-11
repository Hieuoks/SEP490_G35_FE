import React from 'react';
import { FaHeadphones, FaEnvelope } from 'react-icons/fa';
import logo from "../assets/img/logo-dark.svg";
import googleplay from "../assets/img/icons/googleplay.svg";
import appstore from "../assets/img/icons/appstore.svg";
import card01 from "../assets/img/icons/card-01.svg";
import card02 from "../assets/img/icons/card-02.svg";
import card03 from "../assets/img/icons/card-03.svg";
import card04 from "../assets/img/icons/card-04.svg";
import card05 from "../assets/img/icons/card-05.svg";
import card06 from "../assets/img/icons/card-06.svg";
import footerBottom from "../assets/img/bg/footer.svg";

const Footer = () => {

    return (
        <footer>
            <div className="container">
                <div className="footer-top">
                    <div className="footer-wrap bg-white">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-xl-3 col-xxl-3">
                                <div className="mb-3 text-center text-xl-start">
                                    <a href="index.html" className="d-block footer-logo-light">
                                        <img src={logo} alt="logo" />
                                    </a>

                                </div>
                            </div>
                            <div className="col-lg-6 col-xl-4 col-xxl-4">
                                <div className="d-flex align-items-center justify-content-center flex-wrap">
                                    <h6 className="fs-14 fw-medium me-2 mb-2">khám phá thế giới cùng với bạn! </h6>
                                </div>
                            </div>
                            <div className="col-lg-12 col-xl-5 col-xxl-5">
                                <div className="d-sm-flex align-items-center justify-content-center justify-content-xl-end">
                                    <div className="d-flex align-items-center justify-content-center justify-content-sm-start me-0 pe-0 me-sm-3 pe-sm-3 border-end mb-3">
                                        <span className="avatar avatar-lg bg-primary rounded-circle flex-shrink-0">
                                            <FaHeadphones className="fs-24 text-white" />
                                        </span>
                                        <div className="ms-2">
                                            <p className="mb-1">Hỗ trợ khách hàng</p>
                                            <p className="fw-medium text-dark">0378237143</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center justify-content-sm-start mb-3">
                                        <span className="avatar avatar-lg bg-secondary rounded-circle flex-shrink-0">
                                            <FaEnvelope className="fs-24 text-white" />
                                        </span>
                                        <div className="ms-2">
                                            <p className="mb-1">Email liên hệ</p>
                                            <p className="fw-medium text-dark">datdthe171872@fpt.edu.vn</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-img">
                        <img src={footerBottom} className="img-fluid" alt="img" />
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <p className="fs-14">Copyright &copy; 2025. All Rights Reserved, <a href="javascript:void(0);" className="text-primary fw-medium">DreamsTour</a></p>
                                <div className="d-flex align-items-center">
                                    <ul className="social-icon">
                                        <li>
                                            <a href="javascript:void(0);"><i className="fa-brands fa-facebook"></i></a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);"><i className="fa-brands fa-x-twitter"></i></a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);"><i className="fa-brands fa-instagram"></i></a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);"><i className="fa-brands fa-linkedin"></i></a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);"><i className="fa-brands fa-pinterest"></i></a>
                                        </li>
                                    </ul>
                                </div>
                                <ul className="card-links">
                                    <li>
                                        <a href="javascript:void(0);">
                                            <img src={card01} alt="img" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <img src={card02} alt="img" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <img src={card03} alt="img" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <img src={card04} alt="img" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <img src={card05} alt="img" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <img src={card06} alt="img" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;