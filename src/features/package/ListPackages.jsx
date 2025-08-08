import Header from "../../components/Header";
import Breadcrumb from "../../components/breadcrumb";
import Sidebar from "../../components/sidebar1";
import Footer from "../../components/Footer";
import AdminListPackages from "./component/AdminListPackages";
const ListPackages = () => {
    return(
        <div>
            <Header/>
            <Breadcrumb />
            <div className="content">
                <div className="container">
                    <div className="row">
                        <Sidebar />
                        <AdminListPackages />
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
export default ListPackages;