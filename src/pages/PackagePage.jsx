import Header from "../components/Header";
import Breadcrumb from "../components/breadcrumb";
import Footer from "../components/Footer";
import PublicPackage from "../features/package/component/publicPackage";
const PackagePage = () => {
  return (
    <div>
            <Header/>
            <Breadcrumb />
            <PublicPackage />
            <Footer />
    </div>
  );
}
export default PackagePage;