'use client'
import Script from "next/script";
import { useState, useContext, useEffect, createContext } from "react";
import { dynamic_ } from "@/components/main-context";
import { Icon } from "@/components/lib/icons";
import Image from "next/image";
import { Cart_Control_Direct, Cart_Control_Indirect } from "@/components/lib/cart_control";
import { cart, orders } from "@/components/dummy_data";
import { apiFetch } from "@/app/(api)/api";

export const cartprice = createContext();

export default function Cart() {
    const { device, set_floaters } = useContext(dynamic_);
    const [cartItems, setCartItems] = useState(null);
    const [total_amount__i, set_total_amount__i] = useState('loading');

    useEffect(() => {

        set_floaters(
            <>
                <div className="pS pdt05 jcsb wfp oh payment-floater" style=
                    {{ bottom: 0 }}>
                    <div className="df aic jcsb gap05 bdtl pdy06 pdx07 bdTrds xbg" style={{ borderColor: 'black', boxShadow: '0 0 6px 1px #eeeeeeff' }}>
                        <div className="df fd-c pdx05 gap01"><div className="df aic gap03"><span className="bd pdy04 pdx04 xfg"></span><span className="font-sm font500" style={{ fontVariant: 'all-petite-caps', color: 'GrayText' }}>Pay Using</span></div><span className="mgl03 font-sm font700">Google Pay</span></div>
                        <span href='/cart' style={{
                            background: '#9970faff',
                            color: 'white',
                            borderRadius: '10px',
                        }}
                            className="pdx3 xfg df xfg aic pdy1 font900" onClick={handlePayment}>Pay ${total_amount__i.total}</span>
                    </div>
                </div>
            </>
        )
    }, [total_amount__i])

    // Fetch cart from backend API
    useEffect(() => {
        async function fetchCart() {
            try {
                const res = await apiFetch("/cart"); // Django cart API
                const data = await res.json();
                setCartItems(data);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        }
        fetchCart();
    }, []);


    const updatecartprice = async () => {
        try {
            const res2 = await apiFetch("/cart/items/mycart/"); // Django cart API
            const data2 = await res2.json();
            console.log('mycart', data2)
            set_total_amount__i(data2)
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    }

    useEffect(() => {
        updatecartprice();
    }, [])

    // -------------------------------------------------------------
    // START: MODIFIED PAYMENT-RELATED CODE
    // -------------------------------------------------------------

    async function handlePayment() {
        try {
            // 1. Ask backend to create order
            const res = await apiFetch(`/api/payments/create-order/`, { method: "POST" });
            const data = await res.json();

            if (!data.payment_session_id || !data.order_id) {
                alert("Payment session missing. Try again.");
                return;
            }

            // 2. Initialize Cashfree
            const cashfree = new window.Cashfree({ mode: "sandbox" });

            // 3. Open Embedded Checkout
            await cashfree.checkout({
                paymentSessionId: data.payment_session_id,
                redirectTarget: "_modal",   // ✅ embed inside app

            }).then(result => {
                if (result?.error) {
                    console.error("Payment failed:", result.error.message);
                    alert("Payment failed. Please try again.");
                } else {
                    handlePaymentSuccess(data.order_id); // verify with backend
                }
            });

        } catch (err) {
            console.error("Payment initiation failed:", err);
            alert("Something went wrong. Try again later.");
        }
    }

    // A separate function to handle what happens after a successful payment.
    async function handlePaymentSuccess(orderId) {
        try {
            // Call the Django backend to verify the payment status.
            const res = await apiFetch(`/api/payments/verify/`, {
                method: "POST",
                body: JSON.stringify({ order_id: orderId }),
            });

            const data = await res.json();

            if (data.status === 'COMPLETED' || data.status === 'PAID') {
                // The payment is verified. You can now clear the cart and update the UI.
                setCartItems([]);
                set_total_amount__i({ total: 0 });
                // You can also add navigation here, e.g., router.push('/order-history');
            } else {
                alert("Payment status is still pending or failed. Please check your order history.");
            }

        } catch (err) {
            console.error("Payment verification failed:", err);
            alert("Could not verify payment status. Please check your order history.");
        }
    }

    // -------------------------------------------------------------
    // END: MODIFIED PAYMENT-RELATED CODE
    // -------------------------------------------------------------

    return (
        <>
            <Script src="https://sdk.cashfree.com/js/v3/cashfree.js" strategy="afterInteractive" />
            <style>{`#cart{background:#f0c9ab; border-color:black}`}</style>
            {device === 'pc' && <div className={`hfp df fd-c gap1 jcsb ${device === 'pc' && 'pdx1'}`} style={{
                background: 'white',
                scrollbarWidth: 'none',
            }}
            >
                <div className="fx1">

                    <div className={`${device === 'mobile' && 'bdb pdx1'} df aic pdy1 `} style={{ background: 'white', position: 'sticky', top: '0' }}>
                        <div className="df aic fx1 gap03">
                            <Icon.Cart_ />
                            <h3 className="mg0">Cart</h3>
                        </div>
                        {device === 'pc' && <h3 className="mg0 pdx07 pdy01 bdrds bd" style={{ background: '#403b3b', color: 'white' }}>x</h3>}
                    </div>
                    <div className="pdy4 pdx2 bd" style={{
                        borderRadius: '5px',
                        background: 'white'
                    }}
                    ></div>
                    <div className="df fd-c gap01">
                        <div className="mgb05">
                            <h4 className="mg0">Coupons</h4>
                        </div>
                        <div className="df fd-c pdx05">
                            <div className="pdy05 pdx1 font-sm" style={{
                                background: '#f8f8f8',
                                color: 'orangered'
                            }}>
                                <span>FREEBURGER200</span>
                                <span style={{
                                    float: 'right',
                                    color: 'forestgreen'
                                }}>Applied!</span>
                            </div>
                        </div>
                        <div className="df fd-c pdx05">
                            <div className="pdy05 pdx1 font-sm" style={{
                                background: '#f8f8f8',
                                color: 'orangered'
                            }}>
                                <span>Get 50% Off upto 300</span>
                                <span style={{
                                    float: 'right',
                                    color: 'forestgreen'
                                }}>Applied!</span>
                            </div>
                        </div>
                        <div className="df fd-c pdx05">
                            <div className="pdy05 pdx1 bd font-sm" style={{
                                borderRadius: '5px',
                                background: '#f3f3f3',
                                textAlign: 'center'
                            }}>
                                <span>More Available Coupons</span>
                            </div>
                        </div>
                    </div>
                    <div className="gap01">
                        <div className="mgb05">
                            <h4 className="mg0">Summary</h4>
                        </div>
                        <div className="df fd-c pdx05">
                            <div className="pdy5 pdx1 font-sm" style={{
                                background: '#f8f8f8',
                                color: 'orangered'
                            }}>
                                <span>FREEBURGER200</span>
                                <span style={{
                                    float: 'right',
                                    color: 'forestgreen'
                                }}>Applied!</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${device === 'pc' && 'mgb1'}`} style={{ position: 'sticky', bottom: '0px' }}>
                    <div className={`${device === 'pc' && 'mgb05'} df fd-c bd xbg ${device === 'mobile' && 'bdTrds oh'}`} style={{ boxShadow: '0 0px 5px 1px #c7c7c7' }}>
                        <div className={`${device === 'mobile' && 'ybg bdb '}pdy02 pdx1 xbg`}>Applied!</div>
                        <div className="pdy08 pdx1 font-sm df aic jcsb">
                            <span className="pdy05 pdx1 bd xbg">Using Payment</span>
                            <span className="pdy05 pdx1" style={{ float: 'right', color: 'white', background: '#008600', borderRadius: '5px' }}>Place Order</span>
                        </div>
                    </div>
                </div>
            </div>}
            {device === 'mobile' && cartItems && <>
                <div className={`hfp df fd-c gap1 jcsb ${device === 'pc' && 'pdx1'}`} style={{
                    background: 'whitesmoke',
                    scrollbarWidth: 'none',
                    // minHeight: '100%',
                    // height: 'auto',

                }}
                >
                    <div className="fx1">
                        <div className={`${device === 'mobile' && 'bdb pdx1'} df aic pdy1 `} style={{ background: 'white', position: 'sticky', top: '0' }}>
                            <div className="df aic fx1 gap03">
                                <Icon.Cart_ />
                                <h3 className="mg0">Checkout</h3>
                            </div>
                            {device === 'pc' && <h3 className="mg0 pdx07 pdy01 bdrds bd" style={{ background: '#403b3b', color: 'white' }}>x</h3>}
                        </div>
                        <div className="df fd-c gap1 mgx1 mgy05">
                            <div className="pdy05 pdl06 pdr08 bd df fd-c gap08" id="product-container" style={{
                                borderRadius: '5px',
                                background: 'white'
                            }}
                            >
                                <cartprice.Provider value={{ total_amount__i, set_total_amount__i, updatecartprice }}>

                                    {cartItems.items.map((o, i) => (<div className="df aic ITEMS" key={i} id={o.id}>
                                        <div className="fx1 df gap05 font-sm font600" >
                                            <Image
                                                alt="iphone 15"
                                                src={o.menu_item.image || '/default_user.png'}
                                                width={55}
                                                height={58}
                                                style={{ borderRadius: '5px' }}
                                            />
                                            <div className="fx1">
                                                <div className="font-sm">{o.menu_item.name}</div>
                                                <div className="font08 pdt02">${o.menu_item.price}</div>
                                            </div>
                                        </div>

                                        <Cart_Control_Direct
                                            item={{
                                                id: o.id,
                                                quantity: o.quantity,
                                            }}
                                            redirect_to_home_on_Nothing={true}
                                        />


                                    </div>))}
                                </cartprice.Provider>
                            </div>

                            <div className="df fd-c gap03 pd1 bd bdrds xbg">
                                <div className="pdb05 df aic jcsb bdb1">
                                    <h4 className="mg0">Coupons</h4>
                                    <span className="font600 pdx05 pdy03 xfg" style={{ borderRadius: '5px', fontSize: '0.75rem' }}>All Coupons</span>

                                </div>
                                <div className="pdx03">
                                    <div className="df fd-c pdy03">
                                        <div className="pdy05 font-sm font600 df jcsb" style={{
                                            color: 'orangered',
                                        }}>
                                            <span className="df aic gap03"> <svg height="22px" width="22px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                                viewBox="0 0 512 512">
                                                <path style={{ fill: "#9970faff" }} d="M255.999,512c-2.954,0-5.737-1.144-7.835-3.221l-47.332-46.876l-64.437,16.927
	c-0.946,0.25-1.903,0.376-2.857,0.376c-4.984,0-9.387-3.374-10.709-8.205l-17.559-64.27L41,389.171
	c-5.86-1.601-9.372-7.687-7.829-13.566l16.927-64.436L3.222,263.836c-4.272-4.319-4.272-11.349,0.002-15.67l46.875-47.331
	l-16.927-64.437c-1.544-5.878,1.969-11.964,7.829-13.566l64.27-17.559l17.56-64.27c1.32-4.828,5.728-8.201,10.717-8.201
	c0.952,0,1.909,0.125,2.843,0.371l64.442,16.927l47.333-46.877C250.265,1.145,253.048,0,255.999,0s5.734,1.145,7.835,3.223
	l47.332,46.876l64.437-16.927c0.939-0.247,1.9-0.372,2.854-0.372c4.99,0,9.394,3.371,10.711,8.199l17.56,64.272l64.27,17.56
	c5.86,1.601,9.372,7.687,7.829,13.566l-16.927,64.436l46.877,47.333c4.272,4.319,4.272,11.349-0.002,15.67L461.9,311.168
	l16.927,64.437c1.544,5.878-1.969,11.964-7.829,13.566l-64.27,17.56l-17.56,64.27c-1.318,4.832-5.719,8.205-10.703,8.205
	c-0.955,0-1.916-0.126-2.854-0.374l-64.445-16.928l-47.333,46.877C261.736,510.857,258.953,512,255.999,512z"/>
                                                <path style={{ fill: "#9970faff" }} d="M461.902,200.834l16.927-64.436c1.544-5.879-1.969-11.965-7.829-13.566l-64.27-17.56L389.169,41
	c-1.317-4.827-5.721-8.199-10.711-8.199c-0.954,0-1.914,0.125-2.854,0.372L311.167,50.1L263.835,3.223
	C261.735,1.145,259.34,0,256.001,0v512c3.339,0,5.736-1.144,7.834-3.221l47.333-46.877l64.445,16.928
	c0.939,0.248,1.899,0.374,2.854,0.374c4.984,0,9.385-3.374,10.703-8.205l17.56-64.27l64.27-17.56
	c5.86-1.601,9.372-7.687,7.829-13.566l-16.927-64.437l46.875-47.331c4.274-4.321,4.274-11.352,0.002-15.67L461.902,200.834z"/>
                                                <path style={{ fill: "#FFFFFF" }} d="M189.217,244.871c-30.684,0-55.652-24.968-55.652-55.652s24.968-55.652,55.652-55.652
	s55.652,24.968,55.652,55.652S219.901,244.871,189.217,244.871z M189.217,166.958c-12.277,0-22.261,9.984-22.261,22.261
	s9.984,22.261,22.261,22.261c12.277,0,22.261-9.984,22.261-22.261S201.494,166.958,189.217,166.958z"/>
                                                <path style={{ fill: "#D1E7F8" }} d="M322.782,378.435c-30.684,0-55.652-24.968-55.652-55.652s24.968-55.652,55.652-55.652
	s55.652,24.968,55.652,55.652S353.466,378.435,322.782,378.435z M322.782,300.523c-12.277,0-22.261,9.984-22.261,22.261
	c0,12.277,9.984,22.261,22.261,22.261c12.277,0,22.261-9.984,22.261-22.261C345.043,310.507,335.059,300.523,322.782,300.523z"/>
                                                <path style={{ fill: "#FFFFFF" }} d="M178.087,350.609c-4.272,0-8.544-1.631-11.804-4.892c-6.521-6.516-6.521-17.092,0-23.609
	l155.825-155.825c6.521-6.521,17.087-6.521,23.609,0c6.521,6.516,6.521,17.092,0,23.609L189.892,345.718
	C186.63,348.98,182.359,350.609,178.087,350.609z"/>
                                                <path style={{ fill: "#D1E7F8" }} d="M322.108,166.285l-66.108,66.109v47.217l89.716-89.716c6.521-6.516,6.521-17.092,0-23.609
	C339.196,159.763,328.63,159.763,322.108,166.285z"/>
                                            </svg> FREEBURGER200</span>
                                            <span style={{
                                                color: 'forestgreen'
                                            }}>Applied!</span>
                                        </div>
                                    </div>
                                    <div className="df fd-c pdy03" style={{
                                        color: 'orangered',
                                        borderTop: '1px dashed rgb(179, 179, 179)'
                                    }}>
                                        <div className="pdt05 font-sm font600 df jcsb" >
                                            <span className="df aic gap03">
                                                <svg height="22px" width="22px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    viewBox="0 0 512.001 512.001">
                                                    <path style={{ fill: "#666666" }} d="M463.479,256c0-19.566,19.178-41.389,14.355-59.434c-4.99-18.672-32.654-27.963-42.113-44.311
	c-9.595-16.583-3.909-45.151-17.367-58.609c-13.458-13.458-42.026-7.772-58.609-17.367c-16.348-9.458-25.638-37.121-44.31-42.113
	c-18.046-4.823-39.868,14.355-59.434,14.355c-19.566,0-41.389-19.178-59.434-14.355c-18.672,4.99-27.963,32.654-44.311,42.113
	c-16.583,9.595-45.151,3.909-58.609,17.367s-7.772,42.026-17.367,58.609c-9.458,16.348-37.121,25.638-42.113,44.31
	c-4.823,18.046,14.355,39.868,14.355,59.434s-19.178,41.389-14.355,59.434c4.99,18.672,32.654,27.963,42.113,44.311
	c9.595,16.583,3.909,45.151,17.367,58.609c13.458,13.458,42.026,7.772,58.609,17.367c16.348,9.458,25.638,37.121,44.31,42.113
	c18.046,4.823,39.868-14.355,59.434-14.355s41.389,19.178,59.434,14.355c18.672-4.99,27.963-32.654,44.311-42.113
	c16.583-9.595,45.151-3.909,58.609-17.367c13.458-13.458,7.772-42.026,17.367-58.609c9.458-16.348,37.121-25.638,42.113-44.31
	C482.656,297.39,463.479,275.567,463.479,256z"/>
                                                    <circle style={{ fill: "#F95428" }} cx="256" cy="256" r="162.352" />
                                                    <path style={{ fill: "#E54728" }} d="M291.795,382.56c-89.665,0-162.354-72.688-162.354-162.354c0-35.698,11.531-68.7,31.059-95.501
	C119.984,154.226,93.646,202.033,93.646,256c0,89.665,72.688,162.354,162.354,162.354c53.967,0,101.774-26.339,131.294-66.854
	C360.494,371.028,327.493,382.56,291.795,382.56z"/>
                                                    <g>
                                                        <path style={{ fill: "#FFFFFF" }} d="M233.153,380.609c-3.214,0-6.43-1.226-8.881-3.679c-4.905-4.905-4.905-12.858,0-17.762
		l45.692-45.694c4.905-4.905,12.858-4.905,17.764,0c4.905,4.905,4.905,12.858,0,17.762l-45.692,45.694
		C239.583,379.382,236.367,380.609,233.153,380.609z"/>
                                                        <circle style={{ fill: "#FFFFFF" }} cx="233.153" cy="322.355" r="12.56" />
                                                        <circle style={{ fill: "#FFFFFF" }} cx="278.847" cy="368.049" r="12.56" />
                                                    </g>
                                                    <g>
                                                        <path style={{ fill: "#333333" }} d="M309.304,491.168c-10.852,0-21.424-4.42-31.003-8.423c-7.888-3.297-16.043-6.706-22.299-6.706
		s-14.413,3.409-22.3,6.706c-12.323,5.15-26.287,10.988-40.377,7.222c-14.622-3.909-23.962-16.225-32.203-27.092
		c-4.993-6.583-10.154-13.39-15.154-16.283c-5.174-2.993-13.777-4.098-22.098-5.168c-13.398-1.722-28.584-3.673-39.101-14.189
		c-10.517-10.517-12.468-25.703-14.189-39.102c-1.069-8.321-2.174-16.925-5.167-22.098c-2.893-5-9.7-10.162-16.283-15.154
		c-10.867-8.241-23.183-17.582-27.091-32.203c-3.767-14.089,2.071-28.055,7.222-40.378c3.297-7.888,6.706-16.044,6.706-22.3
		c0-6.256-3.409-14.413-6.706-22.3c-5.151-12.323-10.989-26.29-7.222-40.378c3.907-14.621,16.224-23.962,27.091-32.203
		c6.583-4.991,13.39-10.154,16.283-15.154c2.993-5.174,4.098-13.777,5.168-22.098c1.722-13.399,3.673-28.586,14.189-39.102
		c10.517-10.517,25.702-12.468,39.101-14.189c8.321-1.069,16.925-2.174,22.098-5.168c5-2.893,10.162-9.7,15.154-16.283
		c8.241-10.867,17.582-23.183,32.203-27.092c14.086-3.766,28.054,2.072,40.377,7.222c7.888,3.297,16.044,6.706,22.3,6.706
		s14.413-3.409,22.299-6.706c12.323-5.151,26.288-10.988,40.378-7.222c14.622,3.909,23.962,16.225,32.203,27.092
		c4.993,6.583,10.154,13.39,15.154,16.283c5.173,2.993,13.777,4.098,22.098,5.168c13.398,1.722,28.584,3.673,39.101,14.189
		c10.517,10.517,12.468,25.703,14.189,39.102c1.069,8.321,2.174,16.925,5.167,22.098c2.893,5,9.7,10.162,16.283,15.154
		c10.867,8.241,23.183,17.582,27.092,32.203c3.766,14.089-2.072,28.056-7.222,40.378c-3.297,7.888-6.706,16.043-6.706,22.299
		s3.409,14.413,6.706,22.3c5.151,12.323,10.989,26.29,7.222,40.378c-3.907,14.621-16.224,23.961-27.091,32.202
		c-6.583,4.993-13.39,10.154-16.283,15.154c-2.993,5.173-4.098,13.777-5.168,22.098c-1.722,13.399-3.673,28.586-14.189,39.102
		c-10.517,10.517-25.702,12.468-39.101,14.189c-8.321,1.069-16.925,2.174-22.098,5.168c-5,2.893-10.162,9.7-15.154,16.283
		c-8.241,10.867-17.582,23.183-32.203,27.092C315.543,490.806,312.411,491.168,309.304,491.168z M256,450.919
		c11.295,0,21.814,4.397,31.987,8.649c9.04,3.779,18.387,7.687,24.203,6.132c6.299-1.683,12.59-9.979,18.674-18.002
		c6.495-8.565,13.212-17.421,22.591-22.848c9.544-5.521,20.694-6.955,31.477-8.34c9.873-1.269,20.085-2.581,24.54-7.037
		c4.456-4.456,5.769-14.666,7.037-24.54c1.385-10.783,2.818-21.934,8.34-31.478c5.426-9.379,14.283-16.095,22.848-22.591
		c8.022-6.084,16.318-12.374,18.001-18.672c1.555-5.817-2.353-15.164-6.131-24.205c-4.252-10.174-8.649-20.693-8.649-31.988
		c0-11.294,4.396-21.814,8.649-31.987c3.778-9.041,7.686-18.388,6.132-24.205c-1.683-6.299-9.979-12.59-18.002-18.674
		c-8.565-6.495-17.421-13.211-22.848-22.589c-5.521-9.544-6.955-20.694-8.34-31.477c-1.269-9.875-2.581-20.085-7.037-24.54
		c-4.455-4.456-14.666-5.768-24.54-7.036c-10.783-1.385-21.934-2.818-31.478-8.34c-9.379-5.426-16.095-14.283-22.589-22.848
		c-6.084-8.022-12.375-16.318-18.673-18.002c-5.82-1.555-15.165,2.354-24.205,6.132c-10.174,4.252-20.693,8.649-31.987,8.649
		c-11.295,0-21.816-4.397-31.988-8.649c-9.041-3.779-18.388-7.684-24.203-6.132c-6.299,1.683-12.589,9.98-18.673,18.002
		c-6.495,8.565-13.212,17.421-22.591,22.848c-9.544,5.521-20.694,6.955-31.477,8.34c-9.875,1.269-20.085,2.58-24.54,7.036
		c-4.456,4.456-5.769,14.666-7.037,24.54c-1.385,10.783-2.818,21.934-8.34,31.478c-5.426,9.379-14.283,16.095-22.848,22.591
		c-8.022,6.084-16.318,12.374-18.001,18.673c-1.555,5.817,2.353,15.164,6.131,24.205c4.252,10.174,8.649,20.693,8.649,31.988
		c0,11.295-4.396,21.814-8.649,31.988c-3.778,9.041-7.686,18.388-6.132,24.205c1.683,6.299,9.979,12.589,18.002,18.673
		c8.565,6.495,17.421,13.211,22.848,22.591c5.521,9.544,6.955,20.694,8.34,31.477c1.269,9.874,2.581,20.084,7.037,24.54
		s14.666,5.768,24.54,7.036c10.783,1.385,21.934,2.818,31.477,8.34c9.379,5.426,16.096,14.283,22.591,22.848
		c6.084,8.022,12.375,16.318,18.673,18.002c5.818,1.555,15.164-2.352,24.205-6.132C234.186,455.315,244.706,450.919,256,450.919z"/>
                                                        <path style={{ fill: "#333333" }} d="M256,430.915c-96.448,0-174.914-78.467-174.914-174.914S159.552,81.087,256,81.087
		S430.913,159.553,430.913,256S352.448,430.915,256,430.915z M256,106.207c-82.596,0-149.794,67.197-149.794,149.793
		S173.402,405.795,256,405.795c82.596,0,149.793-67.197,149.793-149.794C405.794,173.404,338.597,106.207,256,106.207z"/>
                                                    </g>
                                                    <g>
                                                        <path style={{ fill: "#FFFFFF" }} d="M203.815,302.4h-24.054c-6.937,0-12.56-5.623-12.56-12.56c0-6.937,5.623-12.56,12.56-12.56h24.054
		c12.458,0,22.596-10.136,22.596-22.596c0-12.46-10.136-22.596-22.596-22.596h-24.054c-6.937,0-12.56-5.623-12.56-12.56v-48.108
		c0-6.937,5.623-12.56,12.56-12.56h59.21c6.937,0,12.56,5.623,12.56,12.56s-5.623,12.56-12.56,12.56h-46.649v22.987h11.494
		c26.311,0,47.716,21.405,47.716,47.716C251.531,280.994,230.126,302.4,203.815,302.4z"/>
                                                        <path style={{ fill: "#FFFFFF" }} d="M313.254,302.402c-26.651,0-48.333-21.681-48.333-48.333v-46.881
		c0-26.651,21.682-48.333,48.333-48.333c26.651,0,48.333,21.681,48.333,48.333v46.881
		C361.587,280.72,339.904,302.402,313.254,302.402z M313.254,183.977c-12.8,0-23.212,10.414-23.212,23.212v46.881
		c0,12.799,10.414,23.212,23.212,23.212l0,0c12.799,0,23.212-10.414,23.212-23.212v-46.881
		C336.466,194.389,326.053,183.977,313.254,183.977z"/>
                                                    </g>
                                                    <g>
                                                        <path style={{ fill: "#333333" }} d="M447.768,76.793c-3.215,0-6.428-1.226-8.881-3.679c-4.905-4.905-4.905-12.858,0-17.762
		l51.672-51.672c4.906-4.905,12.858-4.905,17.764,0c4.905,4.905,4.905,12.858,0,17.762L456.65,73.114
		C454.197,75.566,450.982,76.793,447.768,76.793z"/>
                                                        <path style={{ fill: "#333333" }} d="M418.88,47.905c-3.215,0-6.428-1.226-8.881-3.679c-4.905-4.905-4.905-12.858,0-17.762l22.156-22.156
		c4.905-4.905,12.857-4.905,17.762,0c4.905,4.905,4.905,12.858,0,17.762l-22.156,22.156
		C425.309,46.678,422.094,47.905,418.88,47.905z"/>
                                                        <path style={{ fill: "#333333" }} d="M476.656,105.681c-3.215,0-6.428-1.226-8.881-3.679c-4.905-4.905-4.905-12.858,0-17.762
		l22.156-22.156c4.905-4.905,12.857-4.905,17.762,0c4.905,4.905,4.905,12.858,0,17.762l-22.156,22.156
		C483.086,104.454,479.87,105.681,476.656,105.681z"/>
                                                        <path style={{ fill: "#333333" }} d="M12.56,512c-3.215,0-6.428-1.226-8.881-3.679c-4.905-4.905-4.905-12.858,0-17.762l51.672-51.672
		c4.906-4.905,12.858-4.905,17.764,0c4.905,4.905,4.905,12.858,0,17.762l-51.672,51.672C18.99,510.773,15.774,512,12.56,512z"/>
                                                        <path style={{ fill: "#333333" }} d="M70.965,511.372c-3.215,0-6.428-1.226-8.881-3.679c-4.905-4.905-4.905-12.858,0-17.762
		l22.156-22.156c4.905-4.905,12.858-4.905,17.762,0c4.905,4.905,4.905,12.858,0,17.763l-22.156,22.156
		C77.394,510.145,74.179,511.372,70.965,511.372z"/>
                                                        <path style={{ fill: "#333333" }} d="M13.188,453.596c-3.215,0-6.428-1.226-8.881-3.679c-4.905-4.905-4.905-12.858,0-17.763
		l22.156-22.156c4.905-4.905,12.858-4.905,17.762,0s4.905,12.858,0,17.763L22.07,449.917
		C19.618,452.369,16.402,453.596,13.188,453.596z"/>
                                                        <path style={{ fill: "#333333" }} d="M499.44,512c-3.214,0-6.43-1.226-8.881-3.679l-51.672-51.672c-4.905-4.905-4.906-12.858,0-17.762
		c4.906-4.905,12.858-4.905,17.764,0l51.672,51.672c4.905,4.905,4.905,12.858,0,17.762C505.87,510.775,502.654,512,499.44,512z"/>
                                                        <path style={{ fill: "#333333" }} d="M498.812,453.596c-3.214,0-6.428-1.226-8.881-3.679l-22.156-22.156
		c-4.905-4.905-4.906-12.858,0-17.763c4.906-4.905,12.858-4.905,17.763,0l22.156,22.156c4.905,4.905,4.906,12.858,0,17.763
		C505.242,452.37,502.026,453.596,498.812,453.596z"/>
                                                        <path style={{ fill: "#333333" }} d="M441.036,511.372c-3.214,0-6.428-1.226-8.881-3.679l-22.156-22.156
		c-4.905-4.905-4.906-12.858,0-17.762s12.858-4.905,17.762,0l22.156,22.156c4.905,4.905,4.906,12.858,0,17.762
		C447.465,510.147,444.25,511.372,441.036,511.372z"/>
                                                        <path style={{ fill: "#333333" }} d="M64.233,76.793c-3.214,0-6.43-1.226-8.881-3.679L3.679,21.442c-4.905-4.905-4.906-12.858,0-17.762
		s12.858-4.905,17.764,0l51.672,51.672c4.905,4.905,4.905,12.858,0,17.762C70.662,75.567,67.447,76.793,64.233,76.793z"/>
                                                        <path style={{ fill: "#333333" }} d="M35.344,105.681c-3.214,0-6.428-1.226-8.881-3.679L4.307,79.846c-4.905-4.905-4.906-12.858,0-17.762
		s12.858-4.905,17.762,0L44.226,84.24c4.905,4.905,4.906,12.858,0,17.762C41.774,104.455,38.558,105.681,35.344,105.681z"/>
                                                        <path style={{ fill: "#333333" }} d="M93.121,47.905c-3.214,0-6.428-1.226-8.881-3.679L62.083,22.07c-4.905-4.905-4.906-12.858,0-17.762
		s12.858-4.905,17.762,0l22.156,22.156c4.905,4.905,4.906,12.858,0,17.762C99.55,46.679,96.335,47.905,93.121,47.905z"/>
                                                    </g>
                                                </svg>  Get 50% Off upto 300</span>
                                            <span style={{
                                                color: 'forestgreen'
                                            }}>Applied!</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="df fd-c gap03 pd1 bd bdrds xbg">
                                <div className="bdb" style={{ borderBottom: '1px dashed #b3b3b3' }}>
                                    <div className="df aic pdb06" style={{ alignItems: 'flex-start' }}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M360-440h80v-110h80v110h80v-190l-120-80-120 80v190Zm120 254q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" /></svg>
                                        <div className="df fd-c mgl03">
                                            <span className="mgb01 font500">Delivery at <b>Home</b></span>
                                            <span className="font600 pdx11 pdy03 font-sm" style={{ borderRadius: '5px', color: '#323232' }}>Sigra abc colony, varanasi 221103</span>
                                            <div>
                                                <span className="bdb font08 font600" style={{ borderBottom: '1px dashed #b3b3b3' }}>Add delivery instructions</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="df aic pdy05">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#000000"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" /></svg>
                                    <span className="font600 mgl03 font-sm" style={{ borderRadius: '5px' }}>+91 8881316612</span>
                                </div>
                            </div>
                            <div className="gap01 xbg bd bdrds">
                                <div className="pd1 bdb df" style={{ alignItems: 'flex-start' }}>
                                    <span className="df pd03" style={{
                                        borderRadius: '100%',
                                        background: '#9970faff'
                                    }}><svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="20px" fill="#ffffffff"><path d="M120-80v-800l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v800l-60-60-60 60-60-60-60 60-60-60-60 60-60-60-60 60-60-60-60 60-60-60-60 60Zm120-200h480v-80H240v80Zm0-160h480v-80H240v80Zm0-160h480v-80H240v80Zm-40 404h560v-568H200v568Zm0-568v568-568Z" /></svg></span>
                                    <div className=" mgl03"><h4 className="mg0">Bill Summary</h4>
                                        <span className=" font600" style={{ fontSize: '0.75rem' }}>To Pay $245</span></div>
                                    <span className="font600 pdx05 pdy03 xfg" style={{ borderRadius: '5px', fontSize: '0.75rem', background: 'greenl', color: 'green', marginLeft: '0.8rem' }}>Saved $165</span>
                                </div>
                                <div className="df fd-c pdx1">
                                    <div className="font-sm font500" style={{ borderBottom: '1px dashed #b3b3b3', paddingBlock: '1.1rem' }}>
                                        <span>Item Total</span>
                                        <span style={{
                                            float: 'right',
                                            color: 'forestgreen'
                                        }}>$289</span>
                                    </div>
                                    <div className="pdy1 font-sm df fd-c gap1">
                                        <div>
                                            <span className="font400" style={{
                                                float: 'left',
                                                color: '#5e5e5eff',
                                                borderBottom: '1px dashed #b3b3b3'
                                            }}>Delivery fee (3.5km)</span>
                                            <span className="font500" style={{
                                                float: 'right',
                                                color: 'forestgreen'
                                            }}>$20</span>
                                        </div>
                                        <div>
                                            <span className="font400" style={{
                                                float: 'left',
                                                color: '#5e5e5eff',
                                                borderBottom: '1px dashed #b3b3b3'

                                            }}>Platform fee</span>
                                            <span className="font500" style={{
                                                float: 'right',
                                                color: 'forestgreen'
                                            }}>$0.5</span>
                                        </div>


                                    </div>
                                    <div className="pdy1 font-sm df fd-c gap1" style={{ borderTop: '1px dashed #b3b3b3' }}>
                                        <span className="font500">Coupons</span>
                                        <div>
                                            <span className="font400" style={{
                                                float: 'left',
                                                color: '#5e5e5eff',
                                                borderBottom: '1px dashed #b3b3b3'
                                            }}>FREEBURGER200</span>
                                            <span className="font500" style={{
                                                float: 'right',
                                                color: 'forestgreen'
                                            }}>-200</span>
                                        </div>
                                        <div>
                                            <span className="font400" style={{
                                                float: 'left',
                                                color: '#5e5e5eff',
                                                borderBottom: '1px dashed #b3b3b3'

                                            }}>FREEBURGER200</span>
                                            <span className="font500" style={{
                                                float: 'right',
                                                color: 'forestgreen'
                                            }}>-200</span>
                                        </div>

                                    </div>
                                    <div className="pdy2  font-sm" style={{ borderTop: '1px dashed #b3b3b3' }}>
                                        <span className="font600">Total</span>
                                        <button className="font600" style={{
                                            float: 'right',
                                            color: 'green'
                                        }} >${total_amount__i.total}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>}
        </>

    )
}