import Link from "next/link"
export default function ContainerAContents() {
    return (
        <>
            <style>{`.fntlb{font-size:0.925rem !important}`}</style>


            <div className="pdb08 pdl1 df jcsb aic">
                <a className="" href="#">
                    <div className="df aic gap05">
                        <span className='material-symbols-outlined dn'>badge</span><span className="font-lg">Menu</span>
                    </div>
                </a>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#AED581"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm280-80h280v-560H480v560Z" /></svg>
            </div>

            <div className="pdy05 bdrds" style={{
                overflowY: "auto",
                flex: "auto",
                scrollbarWidth: "none",
                background: 'white'
            }}>

                <div className="menu oy pd0 mgt">
                    <Link className="__menu_items bd bdrds" href="/" style={{ background: '#8BC34A', borderColor: 'black' }}><div className="df aic gap05"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M240-40v-329L110-580l185-300h370l185 300-130 211v329l-240-80-240 80Zm80-111 160-53 160 53v-129H320v129Zm20-649L204-580l136 220h280l136-220-136-220H340Zm98 383L296-558l57-57 85 85 169-170 57 56-226 227ZM320-280h320-320Z" /></svg><span className="fntlb">Recommended</span></div></Link>
                    <Link className="__menu_items" href="/branches"><div className="df aic gap05"><span className='material-symbols-outlined dn'>account_tree	</span><span className="fntlb">Pizza</span></div></Link>
                    <Link className="__menu_items" href="/roots"><div className="df aic gap05"><span className='material-symbols-outlined dn'>account_tree	</span><span className="fntlb">Burgers</span></div></Link>
                    <a className="__menu_items" href="#"><div className="df aic gap05"><span className='material-symbols-outlined dn'>folder</span><span className="fntlb">French Fries</span></div></a>
                    <a className="__menu_items" href="#"><div className="df aic gap05"><span className='material-symbols-outlined dn'>analytics</span><span>Pasta</span></div></a>
                    <a className="__menu_items" href="#"><div className="df aic gap05"><span className='material-symbols-outlined dn'>notifications</span><span className="fntlb">Rolls</span></div></a>
                    <a className="__menu_items" href="#"><div className="df aic gap05"><span className='material-symbols-outlined dn'>task</span><span className="fntlb">Brevages</span></div></a>
                    <a className="__menu_items" href="#"><div className="df aic gap05"><span className='material-symbols-outlined dn'>mail</span><span className="fntlb">Combos</span></div></a>

                    {/* <Sidebar /> */}
                </div>

            </div>

            <div className="pdy05 mgy08 bdrds" style={{ background: 'white' }}>
                <Link className="__menu_items" href="/wsheet"><div className="df aic gap05"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z" /></svg><span className="fntlb">Reorder</span></div></Link>
            </div>
        </>
    )
}