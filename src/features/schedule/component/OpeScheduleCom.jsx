import { useState, useEffect } from 'react';
import { getSchedule, getScheduleByTourGuide, cancelSchedule } from '../../../services/scheduleService';
import { toast } from 'react-toastify';
import { FaEye, FaChevronLeft, FaChevronRight, FaEdit, FaPencilAlt } from "react-icons/fa";
import Cookies from 'js-cookie';
import { useNavigate, useParams } from "react-router-dom";
const role = Cookies.get('roleName');
const OpeScheduleCom = () => {
    const [filterList, setFilterList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [keyword, setKeyword] = useState("");
    const [status, setStatus] = useState("1");
    const today = new Date();
    const fetchDepartureDates = async (keyword, status) => {
        try {
            let response;
            if (role === 'Tour Operator') {
                response = await getSchedule();
            } else if (role === 'Tour Guide') {
                response = await getScheduleByTourGuide();
            }
            console.log("Response data:", response.data);
            const data = response.data.items || response.data || [];
            // setDepartureDates(data);

            // Bắt đầu lọc từ bản gốc `data`
            let filtered = [...data];

            // Lọc theo status
            const today = new Date();
            if (status === '2') {
                filtered = filtered.filter(item => new Date(item.departureDate) > today);
                filtered.sort((a, b) => new Date(a.departureDate) - new Date(b.departureDate)); // tăng dần
            } else if (status === '3') {
                filtered = filtered.filter(item => new Date(item.departureDate) < today);
                filtered.sort((a, b) => new Date(b.departureDate) - new Date(a.departureDate)); // giảm dần
            } else {
                filtered.sort((a, b) => new Date(b.departureDate) - new Date(a.departureDate)); // default: giảm dần
            }

            setFilterList(filtered); // lưu danh sách đã lọc theo trạng thái

            // Tiếp tục lọc theo keyword
            const searched = keyword
                ? filtered.filter(item =>
                    item.tourTitle?.toLowerCase().includes(keyword.toLowerCase()))
                : filtered;

            setSearchList(searched); // lưu danh sách đã lọc sau khi search

        } catch (error) {
            console.error("Error fetching packages:", error);
            toast.error("Lỗi khi lấy dữ liệu lịch trình.");
        }
    };


    useEffect(() => {
        fetchDepartureDates(keyword, status);

    }, [keyword, status]);
    const handleFilterChange = (e) => {
        setStatus(e.target.value);
    }

    const handleSearchChange = (e) => {
        setKeyword(e.target.value);
    }
    // Tính toán pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(searchList.length / itemsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    // Hàm thay đổi số items per page
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };
    const handleCancel = (departureDateId) => {
        cancelSchedule(departureDateId)
            .then((response) => {
                toast.success(response.data?.message);
                console.log(response.data?.message);
                fetchDepartureDates();
            })
            .catch((error) => {
                console.error("Error cancel", error);
                toast.error(error.response?.data.message || error.message);
            });
    }
    const navigate = useNavigate();
    const hanldeNavigate = async (departureDate, id) => {
            Cookies.set("Depart", departureDate);
            navigate(`/departure/booking/${id}`);
    }

    return (
    <div className="col-xl-9 col-lg-8 theiaStickySidebar">

        {/* <!-- Booking Header --> */}
        <div className="card booking-header border-0">
            <div className="card-body header-content d-flex align-items-center justify-content-between flex-wrap ">
                <div>
                    <h6 className="mb-1">Lịch trình</h6>
                    <p className="fs-14 text-gray-6 fw-normal ">Tổng số: {filterList.length}</p>
                </div>
                <div className="d-flex align-items-center sort-by">
                    <div className="dropdown me-3">
                        <select defaultValue={1} className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={handleFilterChange}>
                            <option value="1">Tất cả</option>
                            <option value="2">Sắp diễn ra</option>
                            <option value="3">Đã kết thúc</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- /Booking Header --> */}

        {/* <!-- Tour Booking List --> */}
        <div className="card hotel-list">
            <div className="card-body p-0">
                <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                    <h6 className="">Danh sách</h6>
                    <div className="d-flex align-items-center flex-wrap">
                        <div className="input-icon-start  me-2 position-relative">
                            <span className="icon-addon">
                                <i className="isax isax-search-normal-1 fs-14"></i>
                            </span>
                            <input type="text" className="form-control" placeholder="Tìm kiếm" onChange={handleSearchChange} />
                        </div>
                    </div>
                </div>

                {/* <!-- Hotel List --> */}
                <div className="custom-datatable-filter table-responsive">
                    <table className="table datatable">
                        <thead className="thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Tour & Loại</th>
                                <th>Ngày khởi hành</th>
                                <th>Số chỗ tối đa</th>
                                <th>Số chỗ đã đặt</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan={7}>Không tìm thấy lịch khởi hành.</td>
                                </tr>
                            ) : (
                                currentItems.map((date) => (
                                    <tr key={date.id}>
                                        <td>{date.id}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <p className="text-dark mb-0 fw-medium fs-14"><a href={`/tour/detail/${date.tourId}`}>{date.tourTitle}</a></p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <h6 className="fs-14 mb-1">
                                                <a onClick={() => {
                                                    hanldeNavigate(date.departureDate, date.id);
                                                    Cookies.set("tourTitle", date.tourTitle)
                                                }}
                                                    className="link-primary fw-medium" >
                                                    {new Date(date.departureDate).toLocaleDateString('vi-VN')}
                                                </a>
                                            </h6>
                                        </td>
                                        <td>
                                            {date.availableSlots + date.totalBookings}
                                        </td>
                                        <td>{date.totalBookings}</td>
                                        <td>
                                            {date.isCancelDate ? (
                                                <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10">
                                                    <i className="fa-solid fa-circle fs-5 me-1"></i>Đã hủy
                                                </span>
                                            ) : (
                                                new Date(date.departureDate) < today ? (
                                                    <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                        <i className="fa-solid fa-circle fs-5 me-1"></i>Đã kết thúc
                                                    </span>
                                                ) : (
                                                    <span className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10">
                                                        <i className="fa-solid fa-circle fs-5 me-1"></i>Sắp diễn ra
                                                    </span>
                                                )
                                            )}
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target={`#View${date.id}`} className="me-4">
                                                    <FaEye />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* <!-- /Hotel List --> */}

            </div>
        </div>
        {/* <!-- /Tour Booking List --> */}

        <div className="table-paginate d-flex justify-content-between align-items-center flex-wrap row-gap-3">
            <div className="value d-flex align-items-center">
                <span>Hiển thị</span>
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                </select>
                <span>dòng</span>
            </div>

            <div className="d-flex align-items-center justify-content-center">
                <button
                    className="btn btn-link p-0 me-3"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <FaChevronLeft />
                </button>
                <nav aria-label="Page navigation">
                    <ul className="paginations d-flex justify-content-center align-items-center">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index + 1} className="page-item me-2">
                                <button
                                    className={`page-link-1  ${currentPage === index + 1 ? 'active' : ''} d-flex justify-content-center align-items-center`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <button
                    className="btn btn-link p-0 ms-3"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
        {currentItems.length === 0 ? (
            <div>Không có nội dung</div>
        ) : (
            currentItems.map((date) => (
                <div key={date.id}>
                    <div className="modal fade" id={`View${date.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true" >
                        <div className="modal-dialog  modal-dialog-centered modal-xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5>Thông tin lịch khởi hành <span className="fs-14 fw-medium text-primary">#{date.id}</span></h5>
                                    <a href="javascript:void(0);" data-bs-dismiss="modal" className="btn-close text-dark"></a>
                                </div>
                                <div className="modal-body">
                                    <div className="upcoming-content">
                                        <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
                                            <div className="d-flex align-items-center flex-wrap">
                                                <div>
                                                    <h6 className="mb-1">{date.tourTitle}</h6>
                                                    <div className="title-list">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="upcoming-details">
                                            <h6 className="mb-2">Chi tiết</h6>
                                            <div className="row">
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Ngày khởi hành</h6>
                                                    <p className="text-gray-6 fs-16 ">{new Date(date.departureDate).toLocaleDateString('vi-VN')}</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Số chỗ tối đa</h6>
                                                    <p className="text-gray-6 fs-16 ">{date.availableSlots + date.totalBookings}</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Số chỗ đã đặt</h6>
                                                    <p className="text-gray-6 fs-16 ">{date.totalBookings}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="upcoming-details">
                                            <h6 className="mb-2">Hướng dẫn viên</h6>
                                            {date.tourGuides.length === 0 ? (
                                                <p className="text-gray-6 fs-16">Không có hướng dẫn viên</p>
                                            ) : (
                                                date.tourGuides.map((guide) => (
                                                    <div className="row" key={guide.tourGuideId}>
                                                        <div className="col-lg-5">
                                                            <h6 className="fs-14 mb-2">Email</h6>
                                                            <div className="d-flex align-items-center">
                                                                <a className="avatar avatar-lg"><img src={guide.avatar || "https://res.cloudinary.com/dfn1slnuk/image/upload/v1754286432/ProjectSEP490/Profile/user_avatars/qqfwi0xaux1gmnda3tnt.jpg"} className="img-fluid rounded-circle" onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = "https://res.cloudinary.com/dfn1slnuk/image/upload/v1754286432/ProjectSEP490/Profile/user_avatars/qqfwi0xaux1gmnda3tnt.jpg";
                                                                }} /></a>
                                                                <div className="ms-2">
                                                                    <p className="text-dark mb-0 fw-medium fs-14"><a href="flight-details.html">{guide.email}</a></p>
                                                                    <span className="fs-14 fw-normal text-gray-6"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <h6 className="fs-14">Tên</h6>
                                                            <p className="text-gray-6 fs-16 ">{guide.userName}</p>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <h6 className="fs-14">Số điện thoại</h6>
                                                            <p className="text-gray-6 fs-16 ">{guide.phoneNumber}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    {!date.isCancelDate ? (
                                        <a className="btn btn-md btn-danger" data-bs-dismiss="modal" onClick={(e) => { handleCancel(date.id) }}>Hủy lịch</a>
                                    ) : (
                                        <a className="btn btn-md btn-info" data-bs-dismiss="modal" >Đóng</a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        )}
    </div>
);
}
export default OpeScheduleCom;