import ProductEditPage from "../product.js";
// import Profile from "../subpages/profile";


export default async function ProductDetail({ params }) {
    const { id } = params;
    console.log(params)
    function check_id() {
        // <h1>{id}</h1>
            return <ProductEditPage productId={id}/>
    }

    return (
        check_id()
    )
}