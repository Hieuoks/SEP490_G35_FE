import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Breadcrumb from "../components/breadcrumb";
import Footer from "../components/Footer";
import CustomerSidebar from "../components/CustomerSideBar";
import MyProfile from "../features/profile/component/myprofile";
import ProfileSetting from "../features/setting/component/profilesetting";

const CustomerProfile = () => {
    const location = useLocation();

    return (
        <div>
            <Header />
            <Breadcrumb />
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <CustomerSidebar />
                        </div>
                        <div className="col-md-9">
                            {location.pathname === "/customer/profile" ? (
                                <MyProfile />
                            ) : location.pathname === "/customer/setting" ? (
                                <ProfileSetting />
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <div className="xb-cursor tx-js-cursor">
                <div className="xb-cursor-wrapper">
                    <div className="xb-cursor--follower xb-js-follower"></div>
                </div>
            </div>
        </div>
    );
};

export default CustomerProfile;