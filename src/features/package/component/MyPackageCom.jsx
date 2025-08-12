import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { getPaymentHistoryByOpe } from "../../../services/paymentPacService";
import { getPackages } from "../../../services/packageService";
import Cookies from 'js-cookie';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MyPackageCom = () => {
  const [Transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const userId = Cookies.get('userId');
      useEffect(() => {
          const fetchTransactions = async (userId) => {
              try {
                console.log("Fetching transactions for userId:", userId, "pageNumber:", pageNumber, "pageSize:", pageSize);
                  const response = await getPaymentHistoryByOpe(userId, pageNumber, pageSize);
                  setTransactions(response.data);
                  
                  setTotal(response.totalRecords);
                  setTotalPages(response.totalPages);
                  console.log("API response:", response);
              } catch (error) {

                  console.error("Error fetching packages:", error);
              }
          };
          fetchTransactions(userId,pageNumber, pageSize);
      }, [pageNumber, pageSize]);
    const handlePageChange = (newPage) => {
        setPageNumber(newPage);
    };
    // Thay đổi số dòng/trang
    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPageNumber(1);
    };
    const [packagesRes, setPackagesRes] = useState([]);
        useEffect(() => {
            const fetchPackages = async () => {
                try {
                    const data = await getPackages();
                    setPackagesRes(data.items || data);
                    console.log("API response:", data);
                } catch (error) {
                    console.error("Error fetching packages:", error);
                }
            };
            fetchPackages();
        }, []);
    
  return (
    <div className="col-xl-9 col-lg-8">

                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-3">
                                <div>
                                    <h6>My Package</h6>
                                </div>
                                <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                    <span class="fs-14 text-gray-9 fw-medium">Current package : </span>
                                    <div className="input-icon-end position-relative">
                                        <select className="form-select form-select-sm">
                                            {packagesRes.length === 0 ? (
                                                <option value="">No packages available</option>
                                            ) : (
                                                packagesRes.map((pac) => (
                                                    <option key={pac.packageId} value={pac.packageId}>{pac.name}</option>
                                                ))
                                            )}    
                                            
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card hotel-list mb-3">
                        <div className="card-body p-0">
                            <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                                <h6>Transactions List</h6>
                                <div className="d-flex align-items-center flex-wrap">
                                    
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Package</th>
                                            <th>PaymentMethod</th>
                                            <th>CreatedAt</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {Transactions.map((tran) => (
                                        <tr>
                                            <td className="text-gray-9 fw-medium">{tran.packageName}</td>
                                            <td>{tran.paymentMethod}</td>
                                            <td>{new Date(tran.createdAt).toLocaleString('en-GB')}</td>
                                            <td><span className="text-danger">{tran.amount}  VND</span></td>
                                            <td>
                                                {tran.paymentStatus === 'Pending' ? (
                                                    <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10"><i className="fa-solid fa-circle fs-5 me-1"></i>Unpaid</span>
                                                ) : (
                                                    <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10"><i className="fa-solid fa-circle fs-5 me-1"></i>Compplete</span>
                                                ) }
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    </div>
                  <div className="table-paginate d-flex justify-content-between align-items-center flex-wrap row-gap-3">
                                  <div className="value d-flex align-items-center">
                                      <span>Show</span>
                                      <select value={pageSize} onChange={handlePageSizeChange}>
                                          <option>1</option>
                                          <option>2</option>
                                          <option>3</option>
                                      </select>
                                      <span>entries</span>
                                  </div>
                  
                  
                                  <div className="d-flex align-items-center justify-content-center">
                                      <button
                                          className="btn btn-link p-0 me-3"
                                          onClick={() => handlePageChange(pageNumber - 1)}
                                          disabled={pageNumber === 1}
                                      >
                                          <FaChevronLeft />
                                      </button>
                                      <nav aria-label="Page navigation">
                                          <ul className="paginations d-flex justify-content-center align-items-center">
                                              {Array.from({ length: totalPages }, (_, index) => (
                                                  <li key={index + 1} className="page-item me-2">
                                                      <button
                                                          className={`page-link-1  ${pageNumber === index + 1 ? 'active' : ''} d-flex justify-content-center align-items-center`}
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
                                          onClick={() => handlePageChange(pageNumber + 1)}
                                          disabled={pageNumber === totalPages}
                                      >
                                          <FaChevronRight />
                                      </button>
                                  </div>
                              </div>
                </div>
  );
}
export default MyPackageCom;