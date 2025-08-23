import React, { useState } from "react";
import logoGG from "../../../assets/img/icons/google-icon.svg";
import logoFB from "../../../assets/img/icons/fb-icon.svg";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { data, useNavigate } from "react-router-dom";

const SocialLoginButtons = () => {
  const clientId = "1095112946038-dsap4gpf80nth7u13bar6kfro63442qi.apps.googleusercontent.com";
  const navigate = useNavigate();
  return (
    <GoogleOAuthProvider clientId={clientId} className="d-flex mb-3 text-align center">
      <GoogleLogin
        onSuccess={credentialResponse => {
          const tokenId = credentialResponse.credential;
          // Gửi tokenId này về backend để verify
          fetch(`https://localhost:7012/api/Auth/google?token=${credentialResponse.credential}`, {
            method: "POST"
          })
            .then(res => res.json())
            .then(data => {
              Cookies.set("token", data.token, { expires: 1 });
              Cookies.set("email", data.email, { expires: 1 });
              Cookies.set("userId", data.userId, { expires: 1 });
              Cookies.set("roleName", data.roleName, { expires: 1 });
              toast.success("đăng nhập thành công ");
              navigate("/home");
            })
            .catch(error => {
              console.log("error", error);
            });
        }}
        onError={() => {
          toast.error("đăng nhập thất bại ")
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default SocialLoginButtons;
