import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCheckCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset password for:", email);
  };

  return (
    <div className="card authentication-card">
      <div className="card-header text-center">
        <h5 className="mb-1">Forgot Password</h5>
        <p>Reset Your DreamsTour Password</p>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-icon">
              <span className="input-icon-addon">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <p className="text-success">
              <FontAwesomeIcon icon={faCheckCircle} className="me-1" />
              Reset Password Sent to “{email || "[email protected]"}”
            </p>
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-xl btn-primary d-flex align-items-center justify-content-center w-100"
            >
              Reset Password
              <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <p className="fs-14">
              Remember Password?{" "}
              <a href="/login" className="link-primary fw-medium">Sign In</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
