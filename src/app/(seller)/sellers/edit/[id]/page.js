import ProductEditPage from "../edit-subpages/product";

export default async function OrderDetail({ params }) {
    const { id } = params;
    function check_id() {
        switch (id) {
            case 'product':
                return (<ProductEditPage />);
        }
    }

    return (
        check_id()
    )
}