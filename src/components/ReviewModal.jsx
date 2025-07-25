import React, { useState } from "react";
import { Modal, Rate, Upload, Input, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
const ReviewModal = ({ open, onClose, onSubmit,id }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
const [previewUrl, setPreviewUrl] = useState("");

const handleUpload = async ({ file }) => {
  // Hiển thị ảnh preview ngay lập tức
  const tempUrl = URL.createObjectURL(file);
  setPreviewUrl(tempUrl);

  try {
    const res = await uploadToCloudinary(file);
    setMediaUrl(res.secure_url); // ảnh thật sau khi upload
    setPreviewUrl(res.secure_url); // thay preview bằng ảnh thật
  } catch (err) {
    console.error("Lỗi upload ảnh:", err);
    message.error("Tải ảnh lên thất bại");
    setPreviewUrl(""); // xóa preview nếu lỗi
  }
};

  const handleSubmit = () => {
    const reviewData = {
      tourId: id, // hoặc truyền prop nếu cần
      userId: Cookies.get('userId'), // giả định
      rating,
      comment,
      mediaUrl,
    };
    onSubmit(reviewData);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      title="Viết đánh giá"
      okText="Gửi đánh giá"
      cancelText="Hủy"
    >
      <div className="mb-3">
        <label className="form-label">Đánh giá</label>
        <Rate value={rating} onChange={setRating} />
      </div>

      <div className="mb-3">
        <label className="form-label">Bình luận</label>
        <Input.TextArea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Hãy chia sẻ cảm nghĩ của bạn..."
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Tải ảnh lên (nếu có)</label>
        <Upload
          showUploadList={false}
            accept="image/*"
          customRequest={handleUpload}
        >
          <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
        </Upload>
        {previewUrl && (
  <div className="mt-2">
    <img
      src={previewUrl}
      alt="Preview"
      style={{ maxWidth: "100%", height: "auto", borderRadius: "4px" }}
    />
  </div>
)}

      </div>
    </Modal>
  );
};

export default ReviewModal;
