import React, { useState, useEffect } from "react";
import { Modal, Rate, Upload, Input, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { uploadToCloudinary } from "../services/imgUploadService";

const ReviewModal = ({ open, onClose, onSubmit, id, editData }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Nếu có editData thì set lại giá trị form
  useEffect(() => {
    if (editData) {
      setRating(editData.rating || 5);
      setComment(editData.comment || "");
      setPreviewUrl(editData.mediaUrl || "");
      setImageFile(null); // Không set file khi edit, chỉ hiển thị preview
    } else {
      setRating(5);
      setComment("");
      setImageFile(null);
      setPreviewUrl("");
    }
  }, [editData, open]);

  const handleUpload = ({ file }) => {
    setImageFile(file);
    const tempUrl = URL.createObjectURL(file);
    setPreviewUrl(tempUrl);
  };

const handleSubmit = () => {
  onSubmit({
    rating,
    comment,
    mediaFile: imageFile, // Có thể là null nếu không chọn ảnh
  });
  onClose();
};

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      title={editData ? "Cập nhật đánh giá" : "Viết đánh giá"}
      okText={editData ? "Cập nhật" : "Gửi đánh giá"}
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