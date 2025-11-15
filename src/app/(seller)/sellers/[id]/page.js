import ProductManager from "../subpages/s-product_manage.js";
import LeadsManager from "../subpages/s-lead_manage.js";
import SellerSettingPage from "../subpages/s-settings.js";
import MessagePage from "../subpages/s-messages_manage.js";
import SellerDashboard from "../subpages/s-dashboard-page.js";
import TeamPage from "../subpages/setting-pages/stng-team.js";
// import Profile from "../subpages/profile";


export default async function OrderDetail({ params }) {
    const { id } = params;
    function check_id() {
        switch (id) {
            case 'seller_prod':
                return (<ProductManager />);

            case 'seller_lead':
                return (<LeadsManager />);

            case 'seller_stng':
                return (<SellerSettingPage />);

            case 'seller_msg':
                return (<MessagePage />);

            case 'seller_dsbd':
                return (<SellerDashboard />);
                ;
                            case 'team':
                return (<TeamPage />);
                ;
        }
    }

    return (
        check_id()
    )
}