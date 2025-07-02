import React from "react";
import logoGG from "../../../assets/img/icons/google-icon.svg";
import logoFB from "../../../assets/img/icons/fb-icon.svg";

const SocialLoginButtons = () => (
  <div className="d-flex mb-3">
    <button type="button" className="btn btn-light flex-fill me-2">
      <img src={logoGG} className="me-2" alt="Google" /> Google
    </button>
    <button type="button" className="btn btn-light flex-fill">
      <img src={logoFB} className="me-2" alt="Facebook" /> Facebook
    </button>
  </div>
);

export default SocialLoginButtons;
