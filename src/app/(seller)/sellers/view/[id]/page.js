import ViewCustomer from "../view-subpages/buyer.js";
import FormCenteral from "../view-subpages/c_form.js";
import TeamPage from "../view-subpages/team.js";

export default async function OrderDetail({ params }) {
    const { id } = params;
    function check_id() {
        switch (id) {
            case 'buyer':
                return (<ViewCustomer />);
            case 'team':
                return (<TeamPage />);
            case 'c_form_':
                return (<FormCenteral />);
        }
    }

    return (
        check_id()
    )
}