import React, { useEffect, useState } from "react";
import { getAccounts, updateStatusAccount } from "../../../services/accountService";
import { toast } from "react-toastify";
const ListAccCom = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchString, setSearchString] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await getAccounts(searchString, pageNumber, pageSize);
                const data = response.data;
                setAccounts(data.items || data);
                setTotalItems(response.totalRecords);
                setTotalPages(response.totalPages);
                console.log("API response:", response);
            } catch (error) {
                console.error("Không thể lấy danh sách tài khoản:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAccounts();
    }, [searchString, pageNumber, pageSize]);
    const handlePageChange = (newPage) => {
        setPageNumber(newPage);
    };
    // Thay đổi số dòng/trang
    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPageNumber(1);
    };
    const handleStatusChange = async (userId, newStatus) => {
        try {
            const response = await updateStatusAccount(userId, newStatus);
            toast.success('Cập nhật trạng thái thành công');
            setLoading(true);
            setAccounts(prevAccounts =>
                prevAccounts.map(acc =>
                    acc.userId === userId ? { ...acc, isActive: newStatus } : acc
                )
            );
        } catch (error) {
            console.error("Không thể cập nhật trạng thái:", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="col-xl-9 col-lg-8 theiaStickySidebar">

            {/* <!-- Booking Header --> */}
            <div className="card booking-header">
                <div className="card-body header-content d-flex align-items-center justify-content-between flex-wrap ">
                    <div>
                        <h6>Tài khoản</h6>
                        <p className="fs-14 text-gray-6 fw-normal ">Tổng số: {totalItems}</p>
                    </div>
                </div>
            </div>
            {/* <!-- /Booking Header --> */}

            {/* <!-- Account List --> */}
            <div className="card hotel-list">
                <div className="card-body p-0">

                    <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                        <h6 className="">Danh sách tài khoản</h6>
                        <div className="d-flex align-items-center flex-wrap">
                            <div className="input-icon-start  me-2 position-relative">
                                <span className="icon-addon">
                                    <i className="isax isax-search-normal-1 fs-14"></i>
                                </span>
                                <input type="text" className="form-control" placeholder="Tìm kiếm" value={searchString} onChange={(e) => {
                                    setSearchString(e.target.value);
                                    setPageNumber(1); // reset về trang 1 khi search
                                }} />
                            </div>
                        </div>
                    </div>

                    <div className="custom-datatable-filter table-responsive">
                        <table className="table datatable">
                            <thead className="thead-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Họ tên</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="text-center">Đang tải...</td>
                                    </tr>
                                ) : accounts.length === 0 ? (
                                    <tr>
                                        <td colSpan={6}>Không tìm thấy tài khoản nào.</td>
                                    </tr>
                                ) : (
                                    accounts.map((acc) => (
                                        <tr key={acc.userId}>
                                            <td><a href="javascript:void(0);" className="link-primary fw-medium" data-bs-toggle="modal" data-bs-target="#upcoming">#{acc.userId}</a></td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <a href="flight-details.html" className="avatar avatar-lg"><img src={acc.avatar} className="img-fluid rounded-circle" alt="img" /></a>
                                                    <div className="ms-2">
                                                        <p className="text-dark mb-0 fw-medium fs-14"><a href="flight-details.html">{acc.userName}</a></p>
                                                        <span className="fs-14 fw-normal text-gray-6">{acc.roleName}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{acc.email}</td>
                                            <td>{acc.phoneNumber}</td>
                                            <td>
                                                <h6 className="fs-14 mb-1">{acc.isActive ? "Đang hoạt động" : "Ngừng hoạt động"}</h6>
                                            </td>
                                            <td>
                                                {acc.isActive ? (
                                                    <button type="button" className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10" onClick={() => handleStatusChange(acc.userId, false)}>Ngừng hoạt động</button>
                                                ) : (
                                                    <button type="button" className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10" onClick={() => handleStatusChange(acc.userId, true)}>Kích hoạt</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            {/* paging */}
            <div className="table-paginate d-flex justify-content-between align-items-center flex-wrap row-gap-3">
                <div className="value d-flex align-items-center">
                    <span>Hiển thị</span>
                    <select value={pageSize} onChange={handlePageSizeChange} className="form-select form-select-sm ms-2 me-2">
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                    <span>dòng</span>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <a href="javascript:void(0);"><span className="me-3"><i className="isax isax-arrow-left-2"></i></span></a>
                    <nav aria-label="Page navigation">
                        <ul className="paginations d-flex justify-content-center align-items-center">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <li key={i} className="page-item me-2">
                                    <a className={`page-link-1 ${pageNumber === i + 1 ? " active" : ""} d-flex justify-content-center align-items-center`}
                                        onClick={e => {
                                            e.preventDefault();
                                            handlePageChange(i + 1);
                                        }}
                                    >
                                        {i + 1}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <a href="javascript:void(0);"><span className="ms-3"><i className="isax isax-arrow-right-3"></i></span></a>
                </div>
            </div>
        </div>
    );
}
export default ListAccCom;