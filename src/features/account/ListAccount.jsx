import React from "react";
import Header from "../../components/Header";
import Breadcrumb from "../../components/breadcrumb";
import Footer from "../../components/Footer";
import OpeSidebar from "../../components/OpeSidebar";
import ListAccCom from "./component/ListAccCom";
import AgentDashboard from "../../pages/AgentDashboard";
import AgentSidebar from "../../components/AgentSidebar";
const ListAccount = () => {
    return(
        <div>
            <Header/>
            <Breadcrumb />
            <div className="content">
                <div className="container">
                    <div className="row">
                        <AgentSidebar />
                        <ListAccCom />
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
export default ListAccount;