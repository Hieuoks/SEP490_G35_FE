import React, { useState } from "react";

const PAGE_SIZE = 3;

const LatestInvoices = ({ tourOpPaymentHistory }) => {
  const invoices = tourOpPaymentHistory?.data || [];
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(invoices.length / PAGE_SIZE);
  const pagedInvoices = invoices.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Hàm format ngày từ ISO sang dd/MM/yyyy
  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("vi-VN");
  };

  return (
    <div className="d-flex">
      <div className="card shadow-none flex-fill">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4 gap-2">
            <h6>Hóa đơn mới nhất</h6>
          </div>
          {pagedInvoices.length === 0 ? (
            <p>Không có hóa đơn nào.</p>
          ) : (
            pagedInvoices.map((inv, idx) => (
              <div className={`card shadow-none mb-${idx < pagedInvoices.length - 1 ? "4" : "0"}`} key={inv.transactionId}>
                <div className="card-body p-2">
                  <div className="d-flex justify-content-between align-items-center flex-fill">
                    <div>
                      <div className="d-flex align-items-center flex-wrap mb-1">
                        <span className="fs-14 link-primary border-end pe-2 me-2 mb-0">
                          #{inv.transactionId}
                        </span>
                        <p className="fs-14">Ngày: {formatDate(inv.createdAt)}</p>
                      </div>
                      <h6 className="fs-16 fw-medium mb-1">
                        {inv.packageName}
                      </h6>
                      <p className="fs-14 mb-0">Tour Operator: {inv.tourOperatorName}</p>
                      <p className="fs-14 mb-0">Phương thức: {inv.paymentMethod || "Chưa cập nhật"}</p>
                      <p className="fs-14 mb-0">Trạng thái: {inv.paymentStatus === "true" ? "Đã thanh toán" : inv.paymentStatus}</p>
                    </div>
                    <div className="text-end">
                      <p className="fs-14 mb-1">Số tiền</p>
                      <h6 className="fw-medium">{inv.amount} $</h6>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-outline-primary btn-sm me-2"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Trước
              </button>
              <span className="mx-2 align-self-center">
                Trang {page} / {totalPages}
              </span>
              <button
                className="btn btn-outline-primary btn-sm ms-2"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Sau
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestInvoices;