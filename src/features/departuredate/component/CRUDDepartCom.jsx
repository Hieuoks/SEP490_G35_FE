import { useState, useEffect } from 'react';
import { getDepartDateByTourId, addDepartureDate, addTourGuideForDepartdate, deleteDepartDate, deleteTourGuideFromDepartdate, updateDepartDate } from '../../../services/scheduleService';
import { getAllTourGuides } from '../../../services/tourGuideService';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { FaEye, FaChevronLeft, FaChevronRight, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
const CRUDDepartCom = () => {
    const [departureDates, setDepartureDates] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [keyword, setKeyword] = useState("");
    const [status, setStatus] = useState("1");
    const { tourId } = useParams();
    const [departDate, setDepartDate] = useState(new Date().toISOString()); // Default to today
    const [guides, setGuides] = useState([]);
    const [selectedGuide, setSelectedGuide] = useState([]);

    const today = new Date();
    const fetchDepartureDates = async (keyword, status) => {
        try {
            const response = await getDepartDateByTourId(tourId);

            console.log("Response data:", response.data);
            const data = response.data.items || response.data || [];
            setDepartureDates(data);
            // Bắt đầu lọc từ bản gốc `data`
            let filtered = [...data];

            // Lọc theo status

            if (status === '2') {
                filtered = filtered.filter(item => new Date(item.departureDate) > today);
                // tăng dần
            } else if (status === '3') {
                filtered = filtered.filter(item => new Date(item.departureDate) < today);

            } else {
                // default: giảm dần
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
    const fetchGuides = async () => {
        try {
            const response = await getAllTourGuides();
            const data = response.tourGuides;
            setGuides(data.items || data);
            console.log("Fetched guides:", data);
        } catch (error) {
            setGuides([]);
            console.error("Error fetching tour guides:", error);
            toast.error("Lỗi khi lấy dữ liệu hướng dẫn viên.");
        }
    };
    useEffect(() => {
        fetchGuides();
    }, []);

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
    const handleSelectGuide = (e) => {
        const selectedId = e.target.value;
        if (!selectedId) return;

        // Kiểm tra xem guide đã tồn tại trong selectedGuide chưa
        const existing = selectedGuide.find(g => g.tourGuideId === parseInt(selectedId));
        if (existing) {
            toast.error("Guide already selected");
            return;
        }; // Đã có rồi thì không thêm nữa

        // Tìm guide trong danh sách guides
        const guideToAdd = guides.find(g => g.tourGuideId === parseInt(selectedId));
        if (guideToAdd) {
            setSelectedGuide(prev => [...prev, guideToAdd]);
        }
        console.log("guide to add", guideToAdd);
    };
    const handleRemoveGuide = (selectedId) => {
        setSelectedGuide(prev => prev.filter(g => g.tourGuideId !== parseInt(selectedId)));
    }
    const handleAddDepartDate = async (e) => {
        e.preventDefault();
        addDepartureDate(tourId, departDate)
            .then((response) => {
                toast.success("add depart success!");
                console.log("add depart successfully:", response);
                if (selectedGuide.length > 0) {
                    const simplifiedTourGuides = selectedGuide.map(tg => ({
                        tourGuideId: tg.tourGuideId,
                        isLeadGuide: false // hoặc true nếu bạn muốn đánh dấu hướng dẫn viên chính
                    }));
                    addTourGuideForDepartdate(tourId, response.data.id, simplifiedTourGuides)
                        .then((res) => {
                            fetchDepartureDates();
                            toast.success("add guides success!");

                        }).catch((err) => {
                            console.error("Error add guides:", err);
                            toast.error(err.response?.data.message);
                        })
                }
                fetchDepartureDates();
            })
            .catch((error) => {
                console.error("Error add depart:", error);
                toast.error(error.response?.data.message);
            });
        setSelectedGuide([]);

    }

    const handleDeleteDepart = async (departureDateId,booking) => {
        if (booking > 0) {
            toast.error("Cannot delete departure date with bookings");
            return;
        }
       
        deleteDepartDate(departureDateId)
            .then((response) => {
                toast.success(response.data?.message);
                console.log(response.data?.message);
                fetchDepartureDates();
            })
            .catch((error) => {
                console.error("Error deleteDepart", error);
                toast.error(error.response?.data);
            });
    }

    const navigate = useNavigate();
    const hanldeNavigate = async (departureDate, id) => {
        Cookies.set("Depart", departureDate);
        navigate(`/departure/booking/${id}`);
    }


    const handleUpdateDepart = async (departureDateId, oldGuides) => {
        try {
            updateDepartDate(departureDateId, departDate)
                .then((response) => {
                    toast.success(response.message);
                    fetchDepartureDates();
                }).catch((error) => {
                    console.error("Error update depart:", error);
                    toast.error(error.response?.data.message);
                    return;
                });
            // 1. Tìm những guides cũ cần xóa (có trong oldGuides nhưng không có trong newGuides)
            const guidesToRemove = oldGuides.filter(oldGuide =>
                !selectedGuide.some(newGuide => newGuide.tourGuideId === oldGuide.tourGuideId)
            );

            // 2. Xóa những guides cũ không còn trong danh sách mới
            for (const guide of guidesToRemove) {
                try {
                    await deleteTourGuideFromDepartdate(guide.assignmentId);
                    console.log(`Removed guide ${guide.tourGuideId} from departure date`);
                } catch (error) {
                    console.error(`Error removing guide ${guide.tourGuideId}:`, error);
                    toast.error(`Lỗi khi xóa hướng dẫn viên ${guide.userName}`);
                }
            }

            // 3. Thêm tất cả guides mới
            if (selectedGuide.length > 0) {
                const simplifiedTourGuides = selectedGuide.map(tg => ({
                    tourGuideId: tg.tourGuideId,
                    isLeadGuide: false
                }));

                await addTourGuideForDepartdate(tourId, departureDateId, simplifiedTourGuides);
                console.log("Added new guides to departure date");
            }

            // 4. Refresh data
            await fetchDepartureDates();
            toast.success("Cập nhật departdate thành công!");

            // 5. Reset states
            setSelectedGuide([]);

        } catch (error) {
            console.error("Error updating departure guides:", error);
            toast.error("Lỗi khi cập nhật hướng dẫn viên");
        }
    }
    return (
        <div className="col-xl-9 col-lg-8 theiaStickySidebar">

            {/* <!-- Booking Header --> */}
            <div className="card booking-header border-0">
                <div className="card-body header-content d-flex align-items-center justify-content-between flex-wrap ">
                    <div>
                        <h6 className="mb-1">{Cookies.get("tourTitle") || "Depart"}</h6>
                        <p className="fs-14 text-gray-6 fw-normal ">Total DepartDate : {filterList.length}</p>
                    </div>
                    <div className="d-flex align-items-center flex-wrap">
                        <a className="btn btn-md btn-primary me-2" data-bs-toggle="modal" data-bs-target="#add" href="javascript:void(0);">
                            <FaPlus className="me-1" /> Add DepartDate
                        </a>
                    </div>
                </div>
            </div>
            {/* <!-- /Booking Header --> */}

            {/* <!-- Tour Booking List --> */}
            <div className="card hotel-list">
                <div className="card-body p-0">
                    <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                        <h6 className="">Lists</h6>
                        <div className="d-flex align-items-center flex-wrap">
                            <div className="input-icon-start  me-2 position-relative">
                                <span className="icon-addon">
                                    <i className="isax isax-search-normal-1 fs-14"></i>
                                </span>
                                <input type="text" className="form-control form-control-sm" placeholder="Search" onChange={handleSearchChange} />
                            </div>

                            <div className="dropdown me-3">
                                <select className="form-control form-control-sm" style={{ minHeight: '32px' }} onChange={handleFilterChange}>
                                    <option value="1" selected>All</option>
                                    <option value="2">Upcoming</option>
                                    <option value="3">Overdate</option>
                                </select>
                            </div>


                        </div>
                    </div>

                    {/* <!-- Hotel List --> */}
                    <div className="custom-datatable-filter table-responsive">
                        <table className="table datatable">
                            <thead className="thead-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Tour & Type</th>
                                    <th>DepartureDate</th>
                                    <th>Max Slots</th>
                                    <th>Booked Slots</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length === 0 ? (
                                    <tr>
                                        <td colSpan={6}>No DepartureDate found.</td>
                                    </tr>
                                ) : (
                                    currentItems.map((date) => (
                                        <tr key={date.id}>
                                            <td>{date.id}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <p className="text-dark mb-0 fw-medium fs-14"><a href={`/tour/detail/${date.tourId}`}>{date.tourTitle}</a></p>
                                                        {/* <span className="fs-14 fw-normal text-gray-6">Adventure tourism</span> */}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 mb-1">
                                                    <a onClick={() => { hanldeNavigate(date.departureDate, date.id) }} className='link-primary fw-medium'>
                                                        {new Date(date.departureDate).toLocaleDateString('en-GB')}
                                                    </a>
                                                </h6>
                                                {/* <span className="fs-14 fw-normal text-gray-6">Texas</span> */}
                                            </td>
                                            <td>
                                                {date.availableSlots}
                                            </td>
                                            <td>{date.totalBookings}</td>
                                            <td>
                                                {date.isCancelDate ? (
                                                    <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10">
                                                        <i className="fa-solid fa-circle fs-5 me-1"></i>Canceled
                                                    </span>
                                                ) : (
                                                    new Date(date.departureDate) < today ? (
                                                        <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                            <i className="fa-solid fa-circle fs-5 me-1"></i>Completed
                                                        </span>
                                                    ) : (
                                                        <span className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10">
                                                            <i className="fa-solid fa-circle fs-5 me-1"></i>Upcoming
                                                        </span>
                                                    )

                                                )}
                                                {/* <span className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10"><i className="fa-solid fa-circle fs-5 me-1"></i>Upcoming</span> */}
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                {date.isCancelDate ? (
                                                    <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target={`#View${date.id}`} className="me-4">
                                                        <FaEye />
                                                    </a>
                                                ):(
                                                    new Date(date.departureDate) < today ? (
                                                        <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target={`#View${date.id}`} className="me-4">
                                                            <FaEye />
                                                        </a>
                                                    ):(
                                                        
                                                        <div>
                                                            <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target={`#View${date.id}`} className="me-4">
                                                                <FaEye />
                                                            </a>
                                                            <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target={`#Update${date.id}`} className="me-4" onClick={() => {
                                                                setSelectedGuide(date.tourGuides);
                                                            }}>
                                                                <FaEdit />
                                                            </a>
                                                            <a className="me-4" onClick={() => { handleDeleteDepart(date.id,date.totalBookings) }}>
                                                                <FaTrash />
                                                            </a>
                                                        </div>
                                                    )
                                                )}
                                                    
                                                    
                                                    
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
                    <span>Show</span>
                    <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                    </select>
                    <span>entries</span>
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
                <div>No content</div>
            ) : (
                currentItems.map((date) => (
                    <div key={date.id}>
                        <div className="modal fade" id={`View${date.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" >
                            <div className="modal-dialog  modal-dialog-centered modal-xl">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5>Departure Info <span className="fs-14 fw-medium text-primary">#{date.id}</span></h5>
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
                                                <div>

                                                    {date.IsCancelled ? (
                                                        <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10">
                                                            <i className="fa-solid fa-circle fs-5 me-1"></i>Canceled
                                                        </span>
                                                    ) : (
                                                        new Date(date.departureDate) < today ? (
                                                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                                <i className="fa-solid fa-circle fs-5 me-1"></i>Completed
                                                            </span>
                                                        ) : (
                                                            <span className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10">
                                                                <i className="fa-solid fa-circle fs-5 me-1"></i>Upcoming
                                                            </span>
                                                        )

                                                    )}

                                                </div>
                                            </div>
                                            <div className="upcoming-details">
                                                <h6 className="mb-2">Details</h6>
                                                <div className="row">
                                                    <div className="col-lg-3">
                                                        <h6 className="fs-14">DepartureDate</h6>
                                                        <p className="text-gray-6 fs-16 ">{new Date(date.departureDate).toLocaleDateString('en-GB')}</p>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <h6 className="fs-14">Max slot</h6>
                                                        <p className="text-gray-6 fs-16 ">{date.availableSlots + date.totalBookings}</p>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <h6 className="fs-14">Booked slot</h6>
                                                        <p className="text-gray-6 fs-16 ">{date.totalBookings}</p>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="upcoming-details">
                                                <h6 className="mb-2">Tour Guide</h6>
                                                <div className="custom-datatable-filter table-responsive">
                                                    <table className="table datatable">
                                                        <thead className="thead-light">
                                                            <tr>
                                                                <th>Email</th>
                                                                <th>Name</th>
                                                                <th>Phone</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {date.tourGuides.length === 0 ? (
                                                                <tr>
                                                                    <td colSpan={4} className="text-center text-gray-6 fs-16">No tour guides selected</td>
                                                                </tr>
                                                            ) : (
                                                                date.tourGuides.map((guide) => (
                                                                    <tr key={guide.tourGuideId}>
                                                                        <td className="col-lg-5">
                                                                            <div className="d-flex align-items-center">
                                                                                <a className="avatar avatar-lg">
                                                                                    <img src={guide.avatar ||"https://res.cloudinary.com/dfn1slnuk/image/upload/v1754286432/ProjectSEP490/Profile/user_avatars/qqfwi0xaux1gmnda3tnt.jpg"} className="img-fluid rounded-circle" onError={(e) => {
                                                                                        e.target.onerror = null;
                                                                                        e.target.src = "https://res.cloudinary.com/dfn1slnuk/image/upload/v1754286432/ProjectSEP490/Profile/user_avatars/qqfwi0xaux1gmnda3tnt.jpg";
                                                                                    }} />
                                                                                </a>
                                                                                <div className="ms-4">
                                                                                    <p className="text-dark mb-0 fw-medium fs-14">{guide.email}</p>
                                                                                    <span className="fs-14 fw-normal text-gray-6"></span>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="col-lg-3">{guide.userName}</td>
                                                                        <td className="col-lg-2">{guide.phoneNumber}</td>

                                                                    </tr>
                                                                ))
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <a href="javascript:void(0);" className="btn btn-md btn-primary" data-bs-dismiss="modal">Close</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id={`Update${date.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"  >
                            <div className="modal-dialog  modal-dialog-centered modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5>Update Departure Date <span className="fs-14 fw-medium text-primary">#{date.id}</span></h5>
                                        <a href="javascript:void(0);" data-bs-dismiss="modal" className="btn-close text-dark" onClick={() => {
                                            setSelectedGuide([]);
                                        }}></a>
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
                                                <h6 className="mb-2">Select Depart Date</h6>
                                                <div className="row mb-3">
                                                    <div className="col-lg-6">
                                                        <h6 className="fs-14 mb-2">Departure Date</h6>
                                                        <input type="date" className="form-control form-control-sm" defaultValue={new Date(date.departureDate).toLocaleDateString('en-CA')} onChange={(e) => {
                                                            setDepartDate(new Date(e.target.value).toISOString());
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="upcoming-details">
                                                <h6 className="mb-2">Tour Guide</h6>
                                                <div className="custom-datatable-filter table-responsive">
                                                    <table className="table datatable">
                                                        <thead className="thead-light">
                                                            <tr>
                                                                <th>Email</th>
                                                                <th>Name</th>
                                                                <th>Phone</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {selectedGuide.length === 0 ? (
                                                                <tr>
                                                                    <td colSpan={4} className="text-center text-gray-6 fs-16">No tour guides selected</td>
                                                                </tr>
                                                            ) : (
                                                                selectedGuide.map((guide) => (
                                                                    <tr key={guide.tourGuideId}>
                                                                        <td className="col-lg-5">
                                                                            <div className="d-flex align-items-center">
                                                                                <a className="avatar avatar-lg">
                                                                                    <img src={guide.avatar || "https://res.cloudinary.com/dfn1slnuk/image/upload/v1754286432/ProjectSEP490/Profile/user_avatars/qqfwi0xaux1gmnda3tnt.jpg"} className="img-fluid rounded-circle" onError={(e) => {
                                                                                        e.target.onerror = null;
                                                                                        e.target.src = "https://res.cloudinary.com/dfn1slnuk/image/upload/v1754286432/ProjectSEP490/Profile/user_avatars/qqfwi0xaux1gmnda3tnt.jpg";
                                                                                    }} />
                                                                                </a>
                                                                                <div className="ms-4">
                                                                                    <p className="text-dark mb-0 fw-medium fs-14">{guide.email}</p>
                                                                                    <span className="fs-14 fw-normal text-gray-6"></span>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="col-lg-3">{guide.userName}</td>
                                                                        <td className="col-lg-2">{guide.phoneNumber}</td>
                                                                        <td className="col-lg-1">
                                                                            <button className="btn btn-sm btn-danger" onClick={() => handleRemoveGuide(guide.tourGuideId)}>Remove</button>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="upcoming-details">
                                                <h6 className="mb-2">Tour Guide</h6>
                                                <select className="form-select form-select-sm mb-3" aria-label=".form-select-sm example" value="" onChange={handleSelectGuide}>
                                                    <option value="" selected>Choose tour guide</option>
                                                    {guides.length === 0 ? (
                                                        <option selected value="">No tour guides available</option>
                                                    ) : (
                                                        guides.map((guide) => (
                                                            <option key={guide.tourGuideId} value={guide.tourGuideId} className="text-dark mb-0 fw-medium fs-14" >
                                                                {guide.email} ({guide.userName})
                                                            </option>

                                                        )
                                                        ))
                                                    }
                                                    {/* <span className="fs-14 fw-normal text-gray-6">{guide.userName}</span> */}
                                                </select>
                                            </div>




                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <a href="javascript:void(0);" className="btn btn-md btn-primary" data-bs-dismiss="modal" onClick={() => {
                                            handleUpdateDepart(date.id, date.tourGuides)
                                        }}>Save</a>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                ))

            )}
            <div className="modal fade" id="add" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"  >
                <div className="modal-dialog  modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Add Departure Date <span className="fs-14 fw-medium text-primary"></span></h5>
                            <a href="javascript:void(0);" data-bs-dismiss="modal" className="btn-close text-dark" onClick={() => {
                                setSelectedGuide([]);
                            }}></a>
                        </div>
                        <div className="modal-body">
                            <div className="upcoming-content">
                                <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
                                    <div className="d-flex align-items-center flex-wrap">

                                        <div>
                                            <h6 className="mb-1">{departureDates.at(0)?.tourTitle || 'No Departure'}</h6>
                                            <div className="title-list">
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="upcoming-details">
                                    <h6 className="mb-2">Select Depart Date</h6>
                                    <div className="row mb-3">
                                        <div className="col-lg-6">
                                            <h6 className="fs-14 mb-2">Departure Date</h6>
                                            <input type="date" className="form-control form-control-sm" onChange={(e) => {
                                                setDepartDate(new Date(e.target.value).toISOString());
                                            }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="upcoming-details">
                                    <h6 className="mb-2">Tour Guide</h6>
                                    <div className="custom-datatable-filter table-responsive">
                                        <table className="table datatable">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>Email</th>
                                                    <th>Name</th>
                                                    <th>Phone</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedGuide.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={4} className="text-center text-gray-6 fs-16">No tour guides selected</td>
                                                    </tr>
                                                ) : (
                                                    selectedGuide.map((guide) => (
                                                        <tr key={guide.tourGuideId}>
                                                            <td className="col-lg-5">
                                                                <div className="d-flex align-items-center">
                                                                    <a className="avatar avatar-lg">
                                                                        <img src={guide.avatar || "https://res.cloudinary.com/dfn1slnuk/image/upload/v1754286432/ProjectSEP490/Profile/user_avatars/qqfwi0xaux1gmnda3tnt.jpg"} className="img-fluid rounded-circle" onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src = "https://res.cloudinary.com/dfn1slnuk/image/upload/v1754286432/ProjectSEP490/Profile/user_avatars/qqfwi0xaux1gmnda3tnt.jpg";
                                                                        }} />
                                                                    </a>
                                                                    <div className="ms-4">
                                                                        <p className="text-dark mb-0 fw-medium fs-14">{guide.email}</p>
                                                                        <span className="fs-14 fw-normal text-gray-6"></span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="col-lg-3">{guide.userName}</td>
                                                            <td className="col-lg-2">{guide.phoneNumber}</td>
                                                            <td className="col-lg-1">
                                                                <button className="btn btn-sm btn-danger" onClick={() => handleRemoveGuide(guide.tourGuideId)}>Remove</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>





                                </div>
                                <div className="upcoming-details">
                                    <h6 className="mb-2">Tour Guide</h6>
                                    <select className="form-select form-select-sm mb-3" aria-label=".form-select-sm example" value="" onChange={handleSelectGuide}>
                                        <option value="" selected>Choose tour guide</option>
                                        {guides.length === 0 ? (
                                            <option selected value="">No tour guides available</option>
                                        ) : (
                                            guides.map((guide) => (
                                                <option key={guide.tourGuideId} value={guide.tourGuideId} className="text-dark mb-0 fw-medium fs-14" >
                                                    {guide.email} ({guide.userName})
                                                </option>

                                            )
                                            ))
                                        }
                                        {/* <span className="fs-14 fw-normal text-gray-6">{guide.userName}</span> */}
                                    </select>
                                </div>




                            </div>
                        </div>

                        <div className="modal-footer">
                            <a className="btn btn-md btn-primary" data-bs-dismiss="modal" onClick={handleAddDepartDate}>Save</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default CRUDDepartCom;