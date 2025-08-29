import AboutUs from "../subpages/aboutus";
import AddressBook from "../subpages/address_book";
import HelpAndSupport from "../subpages/helpandsupport";
import Profile from "../subpages/profile";


export default async function OrderDetail({ params }) {
    const { id } = params;
    function check_id() {
        switch (id) {
            case 'profile':
                return (<Profile />);

            case 'address_book':
                return (<AddressBook />);

            case 'help&support':
                return (<HelpAndSupport />);

            case 'aboutus':
                return (<AboutUs />);

            default:
                return (<Profile />);
                ;
        }
    }

    return (
        check_id()
    )
}