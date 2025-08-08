import Header from "../../components/Header";
import Breadcrumb from "../../components/breadcrumb";
import Footer from "../../components/Footer";
import OpeSidebar from "../../components/OpeSidebar";
import ProfileSetting from "./component/profilesetting";
import React from "react";
const SettingProfile = () => {
    return (
        <div>
            <Header />
            <Breadcrumb />
            <div className="content">
                <div className="container">
                    <div className="row">
                        <OpeSidebar />
                        <ProfileSetting />
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}
export default SettingProfile;