import Header from "../components/Header";
import Breadcrumb from "../components/breadcrumb";
import Footer from "../components/Footer";
import PayPacCom from "../features/package/component/PayPacCom";
const PaymentPackage = () => {
    return (
        <div>
            <Header />
            <Breadcrumb />
            <PayPacCom />
            <Footer />
        </div>
    );
}
export default PaymentPackage;