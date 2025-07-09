import React from "react";
import Header from "../../components/Header";
import Breadcrumb from "../../components/breadcrumb";
import Footer from "../../components/Footer";
import Sidebar from "../../components/sidebar";
import MyProfile from "./component/myprofile";
const ProfilePage = () => {
    return (
        <div>
            <Header/>
            <Breadcrumb />
            <div className="content">
                <div className="container">
                    <div className="row">
                        <Sidebar />
                        <MyProfile />
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

export default ProfilePage;