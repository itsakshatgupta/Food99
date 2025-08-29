import { Icon } from "@/components/lib/icons";
import Link from "next/link";

export default async function OrderDetail({ params }) {
    const { id } = params;
    return (
        <div>
            <div className="df jcsb pdx05" style={{alignItems:'flex-start'}}>
                <Link href='/order' className="df aic bdrds bd pd03 bdrds xfg">
                    <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                </Link>
                <div className="tac df fd-c gap01">
                <h4 className="mg0">Order id</h4>
                <span className="font08 font500 xfg pdx05 pdy01 bd bdrds">{id}</span>
                </div>
                <span><Icon.more_vert s="20px"/></span>

            </div>

        </div>
    )
}