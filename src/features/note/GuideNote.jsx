
import Header from "../../components/Header";
import Breadcrumb from "../../components/breadcrumb";
import OpeSidebar from "../../components/OpeSidebar";
import Footer from "../../components/Footer";
import GuideNoteCom from "./component/GuideNoteCom";
const GuideNote = () => {
    return(
        <div>
            <Header />
            <Breadcrumb/>
            <div className="content">
                <div className="container">
                    <div className="row">
                        <OpeSidebar />
                        <GuideNoteCom />
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
export default GuideNote;