import BuyerLoginPage from "../subpages/buyers-login-page"


export default async function OrderDetail({ params }) {
    const { id } = params;
    function check_id() {
        switch (id) {
            case 'X2_reg':
                return (<BuyerLoginPage />);
        }
    }

    return (
        check_id()
    )
}