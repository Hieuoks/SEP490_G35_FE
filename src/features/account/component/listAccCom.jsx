import React, { useEffect, useState } from "react";
import {getAccounts}  from "../../../services/accountService";
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
                setAccounts(data.items|| data);
                setTotalItems(response.totalRecords);
                setTotalPages(response.totalPages);
                console.log("API response:", response);
                 // tuỳ vào cấu trúc response
            } catch (error) {
                console.error("Failed to fetch accounts:", error);
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
    return (
        <div className="col-xl-9 col-lg-8 theiaStickySidebar">

                    {/* <!-- Booking Header --> */}
                    <div className="card booking-header">
                        <div className="card-body header-content d-flex align-items-center justify-content-between flex-wrap ">
                            <div>
                                <h6>Account</h6>
                                <p className="fs-14 text-gray-6 fw-normal ">Total : {totalItems}</p>
                            </div>

                            {/* <div className="d-flex align-items-center flex-wrap">
                                <div className="dropdown ">
                                    <a href="javascript:void(0);" className="dropdown-toggle btn border text-gray-6 rounded  fw-normal fs-14 d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                        <i className="ti ti-file-export me-2 fs-14 text-gray-6"></i>Export
                                    </a>
                                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1"><i className="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1"><i className="ti ti-file-type-xls me-1"></i>Export as Excel</a>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {/* <!-- /Booking Header --> */}
                    
                    {/* <!-- Account List --> */}
                    <div className="card hotel-list">
                        <div className="card-body p-0">
                            
                            <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                                <h6 className="">Account List</h6>
                                <div className="d-flex align-items-center flex-wrap">
                                    <div className="input-icon-start  me-2 position-relative">
                                        <span className="icon-addon">
										<i className="isax isax-search-normal-1 fs-14"></i>
									    </span>
                                        <input type="text" className="form-control" placeholder="Search" value={searchString} onChange={(e) => {
                                            setSearchString(e.target.value);
                                            setPageNumber(1); // reset về trang 1 khi search
                                        }}/>
                                    </div>
                                    {/* <div className="dropdown me-3">
                                        <a href="javascript:void(0);" className="dropdown-toggle text-gray-6 btn  rounded border d-inline-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
                                        Role
									</a>
                                        <ul className="dropdown-menu dropdown-menu-end p-3">
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Operator</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Customer</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Tour Guide</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="dropdown me-3">
                                        <a href="javascript:void(0);" className="dropdown-toggle text-gray-6 btn  rounded border d-inline-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
										Status
									</a>
                                        <ul className="dropdown-menu dropdown-menu-end p-3">
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Active</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">InActive</a>
                                            </li>
                                        </ul>
                                    </div> */}

                                </div>
                            </div>

                            
                            <div className="custom-datatable-filter table-responsive">
                                <table className="table datatable">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>ID</th>
                                            <th>Full Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="6" className="text-center">Loading...</td>
                                            </tr>
                                        ) : accounts.length === 0 ? (
                                            <tr>
                                                <td colSpan={6}>No accounts found.</td>
                                            </tr>
                                            ): (
                                            accounts.map((acc) => (
                                                <tr key={acc.id}>
                                                    <td><a href="javascript:void(0);" className="link-primary fw-medium" data-bs-toggle="modal" data-bs-target="#upcoming">{acc.userId}</a></td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <a href="flight-details.html" className="avatar avatar-lg"><img src={acc.avatar} className="img-fluid rounded-circle" alt="img"/></a>
                                                            <div className="ms-2">
                                                                <p className="text-dark mb-0 fw-medium fs-14"><a href="flight-details.html">{acc.userName}</a></p>
                                                                <span className="fs-14 fw-normal text-gray-6">{acc.roleName}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{acc.email}</td>
                                                    <td>{acc.phoneNumber}</td>
                                                    <td>
                                                            <h6 className="fs-14 mb-1">{acc.isActive? "Active": "InActive"}</h6>
                                                    </td>
                                                    <td>
                                                        {acc.isActive? (
                                                            <button type="submit" className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10">Inactive</button>
                                                        ) : (
                                                            <button type="submit" className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10">Active</button>
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
                            <span>Show</span>
                            <select value={pageSize} onChange={handlePageSizeChange} className="form-select form-select-sm ms-2 me-2">
                                <option value={5}>5</option>
                                <option value={10}>10</option> 
                                <option value={20}>20</option>
                            </select>
                            <span>entries</span>
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


                