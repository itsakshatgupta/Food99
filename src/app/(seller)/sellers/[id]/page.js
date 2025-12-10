import ProductManager from "./../subpages/s-product_manage.js";
import LeadsManager from "../subpages/s-lead_manage.js";
import SellerSettingPage from "../subpages/s-settings.js";
import MessagePage from "../subpages/s-messages_manage.js";
import SellerDashboard from "../subpages/s-dashboard-page.js";
import FormManagePage from "../subpages/s-form-manage.js";
import TradeManagePage from "../subpages/s-trade-manage.js";
import SearchManagePage from "../subpages/s-search.js";
// import Profile from "../subpages/profile";


export default async function ProductDetail({ params }) {
    const { id } = params;
    function check_id() {
        switch (id) {
            case 'seller_dsbd':
                return (<SellerDashboard />);

            case 'seller_prod':
                return (<ProductManager />);

            case 'seller_lead':
                return (<LeadsManager />);

            case 'seller_msg':
                return (<MessagePage />);

            case 'seller_stng':
                return (<SellerSettingPage />);

            case 'seller_form':
                return (<FormManagePage />);

            case 'seller_trdes':
                return (<TradeManagePage />);
                
            case 'seller_scrh':
                return (<SearchManagePage />);
        }
    }

    return (
        check_id()
    )
}