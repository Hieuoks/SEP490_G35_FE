import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/css/style.css';

const Footer = () => {
    const footerWidgets = [
        {
            title: 'Trang',
            links: [
                { label: 'Đội ngũ của chúng tôi', href: 'team.html' },
                { label: 'Gói giá', href: 'pricing-plan.html' },
                { label: 'Thư viện ảnh', href: 'gallery.html' },
                { label: 'Cài đặt', href: 'profile-settings.html' },
                { label: 'Hồ sơ', href: 'my-profile.html' },
                { label: 'Danh sách', href: 'agent-listings.html' },
            ],
        },
        {
            title: 'Công ty',
            links: [
                { label: 'Về chúng tôi', href: 'about-us.html' },
                { label: 'Tuyển dụng', href: '#' },
                { label: 'Blog', href: 'blog-grid.html' },
                { label: 'Chương trình liên kết', href: '#' },
                { label: 'Thêm danh sách của bạn', href: 'add-flight.html' },
                { label: 'Đối tác', href: '#' },
            ],
        },
        {
            title: 'Điểm đến',
            links: [
                { label: 'Hawai', href: '#' },
                { label: 'Istanbul', href: '#' },
                { label: 'San Diego', href: '#' },
                { label: 'Bỉ', href: '#' },
                { label: 'Los Angeles', href: '#' },
                { label: 'New York', href: '#' },
            ],
        },
        {
            title: 'Hỗ trợ',
            links: [
                { label: 'Liên hệ', href: 'contact-us.html' },
                { label: 'Thông báo pháp lý', href: '#' },
                { label: 'Chính sách bảo mật', href: 'privacy-policy.html' },
                { label: 'Điều khoản & Điều kiện', href: 'terms-conditions.html' },
                { label: 'Hỗ trợ trò chuyện', href: 'chat.html' },
                { label: 'Chính sách hoàn tiền', href: '#' },
            ],
        },
        {
            title: 'Dịch vụ',
            links: [
                { label: 'Khách sạn', href: 'hotel-grid.html' },
                { label: 'Tìm hoạt động', href: '#' },
                { label: 'Tìm chuyến bay', href: 'flight-grid.html' },
                { label: 'Thuê kỳ nghỉ', href: 'tour-grid.html' },
                { label: 'Thuê xe', href: 'car-grid.html' },
                { label: 'Gói du lịch', href: 'tour-details.html' },
            ],
        },
    ];

    const socialIcons = [
        { icon: 'fa-brands fa-facebook', href: '#' },
        { icon: 'fa-brands fa-x-twitter', href: '#' },
        { icon: 'fa-brands fa-instagram', href: '#' },
        { icon: 'fa-brands fa-linkedin', href: '#' },
        { icon: 'fa-brands fa-pinterest', href: '#' },
    ];

    const cardLinks = [
        'card-01.svg', 'card-02.svg', 'card-03.svg', 'card-04.svg', 'card-05.svg', 'card-06.svg',
    ];

    return (
        <footer>
            <div className="container">
                <div className="footer-top">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5">
                        {footerWidgets.map((widget, index) => (
                            <div key={index} className="col mb-4">
                                <div className="footer-widget">
                                    <h5 className="fw-bold mb-3">{widget.title}</h5>
                                    <ul className="list-unstyled">
                                        {widget.links.map((link, idx) => (
                                            <li key={idx}>
                                                <a href={link.href} className="d-block text-decoration-none py-1">{link.label}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white p-4 rounded">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-xl-3 col-xxl-3 mb-3 text-center text-xl-start">
                                <a href="index.html" className="d-block mb-2">
                                    <img src="assets/img/logo-dark.svg" alt="logo-dark" style={{ height: '40px' }} />
                                </a>
                            </div>
                            <div className="col-lg-6 col-xl-4 col-xxl-4 mb-3">
                                <div className="d-flex align-items-center justify-content-center flex-wrap">
                                    <h6 className="fs-4 fw-medium me-2 mb-2">Có trên:</h6>
                                    <a href="#" className="d-block mb-2 me-2">
                                        <img src="assets/img/icons/googleplay.svg" alt="googleplay" style={{ height: '30px' }} />
                                    </a>
                                    <a href="#" className="d-block mb-2">
                                        <img src="assets/img/icons/appstore.svg" alt="appstore" style={{ height: '30px' }} />
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-12 col-xl-5 col-xxl-5">
                                <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-xl-end">
                                    <div className="d-flex align-items-center justify-content-center justify-content-sm-start me-0 pe-0 me-sm-3 pe-sm-3 border-end mb-3">
                                        <span className="avatar avatar-lg bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '48px', height: '48px' }}>
                                            <i className="fas fa-headphones fs-5"></i>
                                        </span>
                                        <div>
                                            <p className="mb-1">Hỗ trợ khách hàng</p>
                                            <p className="fw-medium text-dark">+1 56589 54598</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center justify-content-sm-start mb-3">
                                        <span className="avatar avatar-lg bg-secondary rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '48px', height: '48px' }}>
                                            <i className="fas fa-message fs-5"></i>
                                        </span>
                                        <div>
                                            <p className="mb-1">Gửi email cho chúng tôi</p>
                                            <p className="fw-medium text-dark">
                                                <a href="mailto:info@dreamstour.com">info@dreamstour.com</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-img mt-4">
                        <img src="assets/img/bg/footer.svg" className="img-fluid" alt="footer-bg" />
                    </div>
                </div>
            </div>
            <div className="footer-bottom py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <p className="fs-3 mb-0">
                                    Bản quyền © 2025. Đã đăng ký bản quyền, <a href="#" className="text-primary fw-medium text-decoration-none">DreamsTour</a>
                                </p>
                                <div className="d-flex align-items-center">
                                    <ul className="list-unstyled d-flex mb-0">
                                        {socialIcons.map((icon, index) => (
                                            <li key={index} className="me-2">
                                                <a href={icon.href} className="text-dark">
                                                    <i className={icon.icon}></i>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                    <ul className="list-unstyled d-flex mb-0">
                                        {cardLinks.map((card, index) => (
                                            <li key={index} className="me DVD me-2">
                                                <a href="#">
                                                    <img src={`/assets/img/icons/${card}`} alt="card" style={{ height: '20px' }} />
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;