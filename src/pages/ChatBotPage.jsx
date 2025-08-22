import React, { useState, useRef, useEffect } from "react";
import CustomerSidebar from "../components/CustomerSideBar";
import { ChatBotService } from "../services/chatService";
import Cookies from "js-cookie";

const BOT_NAME = "DreamTour AI";
const USER_NAME = "Bạn";

const ChatBotPage = () => {
  const [messages, setMessages] = useState([
    { sender: BOT_NAME, text: "Xin chào! Tôi là DreamTour AI. Bạn cần hỗ trợ gì?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Lấy userId từ cookies (hoặc localStorage tuỳ hệ thống)
  const userId = Cookies.get("userId");

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: USER_NAME, text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Gửi message lên API
      const res = await ChatBotService({
        message: input,
        userId: userId ? Number(userId) : null,
      });

      // Thêm tin nhắn trả lời
      setMessages((msgs) => [
        ...msgs,
        {
          sender: BOT_NAME,
          text: res.reply,
          suggestions: res.suggestions || [],
          intent: res.intent,
        },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: BOT_NAME, text: "Xin lỗi, có lỗi xảy ra khi xử lý yêu cầu của bạn." }
      ]);
    }
    setLoading(false);
  };

  // Hiển thị suggestions nếu có
  const renderSuggestions = (suggestions) => {
    if (!suggestions || suggestions.length === 0) return null;
    return (
      <div className="mt-2">
        <div className="fw-bold mb-2">Gợi ý tour phù hợp:</div>
        <div className="row">
          {suggestions.map((tour) => (
            <div className="col-md-6 mb-2" key={tour.tourId}>
              <div className="card h-100">
                <div className="card-body p-2">
                  <h6 className="card-title mb-1">{tour.title}</h6>
                  <div className="mb-1">
                    <span className="badge bg-primary me-1">Giá: {tour.priceOfAdults?.toLocaleString()}₫</span>
                    <span className="badge bg-secondary">Thời lượng: {tour.durationInDays} ngày</span>
                  </div>
                  <div className="mb-1">
                    <span className="badge bg-info">Khởi hành: {tour.startPoint}</span>
                  </div>
                  {tour.upcomingDepartureDates && tour.upcomingDepartureDates.length > 0 && (
                    <div className="small text-muted">
                      Ngày khởi hành gần nhất: {new Date(tour.upcomingDepartureDates[0]).toLocaleDateString()}
                    </div>
                  )}
                  <a
                    href={`/tour/detail/${tour.tourId}`}
                    className="btn btn-sm btn-outline-primary mt-2 w-100"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Xem chi tiết
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      {/* Sidebar */}
      <CustomerSidebar />

      {/* Khoảng trống giữa sidebar và chat */}
      <div style={{ width: "20px" }}></div>

      {/* Chatbox */}
      <div className="flex-grow-1 d-flex flex-column">
        <div className="d-flex flex-column flex-grow-1 card rounded-0 shadow-sm">
          {/* Header */}
          <div className="card-header bg-danger text-white text-center fw-bold">
            DreamTour AI Chatbot
          </div>

          {/* Body */}
          <div
            className="card-body flex-grow-1 overflow-auto"
            style={{ backgroundColor: "#f9fafb", maxHeight: "calc(100vh - 180px)" }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`d-flex mb-3 ${
                  msg.sender === USER_NAME ? "justify-content-end" : "justify-content-start"
                }`}
              >
                <div
                  className={`p-2 px-3 rounded-3 shadow-sm ${
                    msg.sender === USER_NAME ? "bg-primary text-white" : "bg-light border"
                  }`}
                  style={{ maxWidth: "75%" }}
                >
                  <div className="fw-semibold small mb-1">{msg.sender}</div>
                  <div>{msg.text}</div>
                  {/* Nếu là bot và có suggestions thì hiển thị */}
                  {msg.sender === BOT_NAME && msg.suggestions && msg.suggestions.length > 0 && renderSuggestions(msg.suggestions)}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Footer */}
          <form className="card-footer d-flex gap-2" onSubmit={handleSend}>
            <input
              className="form-control rounded-pill"
              type="text"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              disabled={loading}
            />
            <button className="btn btn-danger rounded-circle px-3" type="submit" disabled={loading || !input.trim()}>
              <i className="bi bi-send-fill"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage;