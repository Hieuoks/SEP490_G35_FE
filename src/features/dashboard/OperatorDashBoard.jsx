import Header from "../../components/Header";
import Breadcrumb from "../../components/breadcrumb";
import Footer from "../../components/Footer";
import OpeSidebar from "../../components/OpeSidebar";
import OpeDashCom from "./component/OpeDashCom";
import HeaderTest from "../../components/HeaderTest";
const OperatorDashBoard = () => {
    return (
        <div>
            <HeaderTest />
            <Breadcrumb />
            <div className="content">
                <div className="container">
                    <div className="row">
                        <OpeSidebar />
                        <OpeDashCom />
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
}
export default OperatorDashBoard;