import ProductNewPage from "../new-subpages/product";

export default async function OrderDetail({ params }) {
    const { id } = params;
    function check_id() {
        switch (id) {
            case 'product':
                return (<ProductNewPage />);
        }
    }

    return (
        check_id()
    )
}