import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { getTourByoperator } from "../../../services/tourService";
import { FaSearch, FaEdit, FaTrash, FaBuilding, FaInfoCircle, FaPlus, FaChevronLeft, FaChevronRight, FaStore } from 'react-icons/fa';
const OpeListTourCom = () => {
    const [keyword, setKeyword] = useState('');
    const [listTour, setListTour] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);
    const [tourStatus, setTourStatus] = useState("All");
    // const [filteredTours, setFilteredTours] = useState([]);
    // Hàm format giá tiền
    const formatPrice = (price) => {
        if (!price) return '0 VND';

        const num = parseFloat(price);
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M VND`;
        } else if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K VND`;
        } else {
            return `${num.toLocaleString()} VND`;
        }
    };
    useEffect(() => {
        const fetchTour = async () => {
            setLoading(true);
            try {
                const response = await getTourByoperator(keyword, pageNumber, pageSize);
                const data = response.data;
                setListTour(data.items || data);
                setTotalItems(response.totalRecords);
                setTotalPages(response.totalPages);
                console.log("API response:", response);
            } catch (error) {
                setListTour([]);
                setTotalItems(0);
                setTotalPages(1);
                console.error("Error fetching tours:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTour();

    }, [keyword, pageNumber, pageSize]);
    // Hàm chuyển trang
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== pageNumber) {
            setPageNumber(newPage);
        }
    };

    // Hàm thay đổi số items per page
    const handlePageSizeChange = (e) => {
        const newPageSize = Number(e.target.value);
        setPageSize(newPageSize);
        setPageNumber(1); // Reset về trang 1
    };

    // Hàm tính toán thông tin hiển thị
    const getDisplayInfo = () => {
        if (totalItems === 0) return { startItem: 0, endItem: 0 };
        const startItem = (pageNumber - 1) * pageSize + 1;
        const endItem = Math.min(pageNumber * pageSize, totalItems);
        return { startItem, endItem };
    };
    const navigate = useNavigate();
    const handleNevigate =(tourTitle,id) => {
        Cookies.set('tourTitle', tourTitle);
        navigate(`/operator/tour/departdate/${id}`);
    }
    

    return (
        <div className="col-xl-9 col-lg-8">
            <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                <div className="place-nav listing-nav">
                    <div className="input-icon-start  me-2 position-relative">
                        <span className="icon-addon">
                            <FaSearch className="fs-14" />
                        </span>
                        <input type="text" className="form-control" placeholder="Search" onChange={(e) => setKeyword(e.target.value)} />
                    </div>
                </div>
                
            </div>
            <div className="tab-content">

                {/* <!-- Hotels List --> */}
                <div className="tab-pane fade active show" id="Hotels-list">
                    <div className="card border-0">
                        <div className="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                            <div>
                                <h5 className="mb-1">Tours</h5>
                                <p>Totals : {totalItems}</p>
                            </div>
                            <div>
                                <a href="/tour/create" className="btn btn-primary d-inline-flex align-items-center me-0"><FaPlus className="me-1 fs-16" />Add Listing</a>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {loading ? (
                            <div className="col-12 text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-2">Đang tải dữ liệu...</p>
                            </div>
                        ) : listTour.length === 0 ? (
                            <div className="col-12 text-center py-5">
                                <p className="text-muted">Không có tour nào được tìm thấy</p>
                            </div>
                        ) : (
                            listTour.map((tour) => (
                                <div className="col-xl-4 col-md-6 d-flex" key={tour.tourId}>
                                    <div className="place-item mb-4 flex-fill">
                                        <div className="place-img">

                                            <a href={`/tour/detail/${tour.tourId}`} className="d-block" target="_blank">
                                                <img src={tour.tourAvartar || "https://res.cloudinary.com/dfn1slnuk/image/upload/v1754286432/ProjectSEP490/Profile/user_avatars/qqfwi0xaux1gmnda3tnt.jpg" } className="img-fluid" alt="img" onError={(e) => {
                                                                                        e.target.onError = null;
                                                                                        e.target.src = "https://res.cloudinary.com/dfn1slnuk/image/upload/v1754286432/ProjectSEP490/Profile/user_avatars/qqfwi0xaux1gmnda3tnt.jpg";
                                                                                    }} />
                                            </a>
                                            <div className="edit-delete-item d-flex align-items-center">
                                                <a href={`/tour/update/${tour.tourId}`} className="me-2 d-inline-flex align-items-center justify-content-center"><FaEdit /></a>
                                                <a href="#" className="d-inline-flex align-items-center justify-content-center" data-bs-toggle="modal" data-bs-target="#delete-list"><FaTrash /></a>
                                            </div>
                                            <div className="fav-item">
                                                {tour.isActive ? (
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-check me-1"></i>Active</span>
                                                ) : (
                                                    <span className="badge bg-danger d-inline-flex align-items-center"><i className="isax isax-close me-1"></i>Inactive</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="place-content">
                                            <h5 className="mb-1 text-truncate"><a href="hotel-details.html">{tour.title}</a></h5>
                                            <p className="d-flex align-items-center mb-2"><FaStore className="me-2" />{tour.companyName}</p>
                                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                <h5 className="text-primary text-nowrap me-2">{formatPrice(tour.priceOfAdults)}<span className="fs-14 fw-normal text-default">/person</span></h5>
                                                <div className="d-flex align-items-center lh-1">
                                                    <a className="d-flex align-items-center" onClick={()=>{handleNevigate(tour.title,tour.tourId)}}><FaInfoCircle className="me-1" />DepartDate</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                        <div className="col-md-12">
                            {/* <!-- Pagination Info --> */}
                            {!loading && totalItems > 0 && (
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex align-items-center">
                                        <span className="me-2">Items per page:</span>
                                        <select
                                            className="form-select form-select-sm"
                                            style={{ width: '80px' }}
                                            value={pageSize}
                                            onChange={handlePageSizeChange}
                                        >
                                            <option value={3}>3</option>
                                            <option value={5}>5</option>
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                            <option value={50}>50</option>
                                        </select>
                                    </div>
                                    <div className="text-muted">
                                        Showing {getDisplayInfo().startItem} to {getDisplayInfo().endItem} of {totalItems} items
                                    </div>
                                </div>
                            )}

                            {/* <!-- Pagination --> */}
                            {!loading && totalPages > 0 && totalItems > 0 && (
                                <nav className="pagination-nav">
                                    <ul className="pagination justify-content-center">
                                        {/* Previous Button */}
                                        <li className={`page-item ${pageNumber === 1 ? 'disabled' : ''}`}>
                                            <a
                                                className="page-link"
                                                href="javascript:void(0);"
                                                aria-label="Previous"
                                                onClick={() => handlePageChange(pageNumber - 1)}
                                            >
                                                <span aria-hidden="true"><FaChevronLeft /></span>
                                            </a>
                                        </li>

                                        {/* Page Numbers */}
                                        {Array.from({ length: totalPages }, (_, index) => {
                                            const pageNum = index + 1;
                                            const isActive = pageNum === pageNumber;

                                            return (
                                                <li key={pageNum} className={`page-item ${isActive ? 'active' : ''}`}>
                                                    <a
                                                        className="page-link"
                                                        href="javascript:void(0);"
                                                        onClick={() => handlePageChange(pageNum)}
                                                    >
                                                        {pageNum}
                                                    </a>
                                                </li>
                                            );
                                        })}

                                        {/* Next Button */}
                                        <li className={`page-item ${pageNumber === totalPages ? 'disabled' : ''}`}>
                                            <a
                                                className="page-link"
                                                href="javascript:void(0);"
                                                aria-label="Next"
                                                onClick={() => handlePageChange(pageNumber + 1)}
                                            >
                                                <span aria-hidden="true"><FaChevronRight /></span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            )}
                            {/* <!-- /Pagination --> */}
                        </div>

                    </div>
                </div>
                {/* <!-- /Hotels List --> */}
            </div>
        </div>
    );
}
export default OpeListTourCom;