import SellerSignupPage from "../subpages/sellers-signup-page"
import BuyerSignupPage from "../subpages/buyers-signup-page"


export default async function OrderDetail({ params }) {
    const { id } = params;
    function check_id() {
        switch (id) {
            case 'X1_unq':
                return (<SellerSignupPage />);

            case 'X2_reg':
                return (<BuyerSignupPage />);
        }
    }

    return (
        check_id()
    )
}