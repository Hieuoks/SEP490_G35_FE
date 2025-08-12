import React, { useState } from "react";

const PAGE_SIZE = 5;

const RecentHotelBookings = ({ bookings }) => {
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);

  // Format ngày
  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("vi-VN");
  };

  const totalPages = Math.ceil((bookings?.length || 0) / PAGE_SIZE);
  const pagedBookings = (bookings || []).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="card hotel-list mb-0">
      <div className="card-body p-0">
        <h6 className="mb-3">Đơn đặt tour gần đây</h6>
        <div className="table-responsive">
          <table className="table datatable">
            <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>Tên tour</th>
                <th>Khởi hành</th>
                <th>Phương tiện</th>
                <th>Ngày đặt</th>
                <th>Khách</th>
                <th>Giá</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pagedBookings.map((b) => (
                <tr key={b.bookingId}>
                  <td>{b.bookingId}</td>
                  <td>{b.tour.title}</td>
                  <td>
                    {b.tour.startPoint} <br />
                    <span className="fs-12 text-muted">{formatDate(b.tour.departureDate)}</span>
                  </td>
                  <td>{b.tour.transportation}</td>
                  <td>{formatDate(b.booking.bookingDate)}</td>
                  <td>
                    {b.guest.totalGuests} khách<br />
                    <span className="fs-12 text-muted">
                      NL:{b.guest.numberOfAdults}, TE:{b.guest.numberOfChildren}, EB:{b.guest.numberOfInfants}
                    </span>
                  </td>
                  <td>{b.paymentInfo.totalPrice} đ</td>
                  <td>
                    <span className={`badge ${b.paymentInfo.paymentStatus === "Pending" ? "badge-secondary" : "badge-info"} rounded-pill`}>
                      {b.paymentInfo.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setSelected(b.bookingId)}
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

        {/* Chi tiết đơn */}
        {selected && (
          <div className="mt-4 border rounded p-3 bg-light">
            <button className="btn btn-sm btn-danger float-end" onClick={() => setSelected(null)}>Đóng</button>
            {(() => {
              const b = (bookings || []).find(x => x.bookingId === selected);
              if (!b) return null;
              return (
                <div>
                  <h5>Chi tiết đơn #{b.bookingId}</h5>
                  <p><b>Tên tour:</b> {b.tour.title}</p>
                  <p><b>Khởi hành:</b> {b.tour.startPoint} ({formatDate(b.tour.departureDate)})</p>
                  <p><b>Phương tiện:</b> {b.tour.transportation}</p>
                  <p><b>Ngày đặt:</b> {formatDate(b.booking.bookingDate)}</p>
                  <p><b>Khách:</b> {b.guest.totalGuests} (NL:{b.guest.numberOfAdults}, TE:{b.guest.numberOfChildren}, EB:{b.guest.numberOfInfants})</p>
                  <p><b>Người đặt:</b> {b.billingInfo.username} - {b.billingInfo.phone} - {b.billingInfo.email}</p>
                  <p><b>Địa chỉ:</b> {b.billingInfo.address}</p>
                  <p><b>Ghi chú:</b> {b.booking.noteForTour || "Không có"}</p>
                  <p><b>Giá:</b> {b.paymentInfo.totalPrice} đ</p>
                  <p><b>Trạng thái thanh toán:</b> {b.paymentInfo.paymentStatus}</p>
                  <p><b>Trạng thái đơn:</b> {b.paymentInfo.bookingStatus}</p>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentHotelBookings;