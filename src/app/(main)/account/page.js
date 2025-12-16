'use client';
import Profile from './subpages/profile'
import AboutUs from "./subpages/aboutus";
import AddressBook from "./subpages/address_book";
import HelpAndSupport from "./subpages/helpandsupport";
import MainSideNav, { MainSideNavButtons } from "@/components/seller-cpmt/main-side-nav";
import { Headset, ShoppingBag, UserCircle } from "lucide-react";
import { useState } from "react";

export default function AccountPage() {
    const [view, setView] = useState("Profile");
    return (
        <div className="df">
            <MainSideNav center={false} title={"Account"} className="pS h-screen top-[87px]" backBtn={true}>
                <MainSideNavButtons vertical={false} icon={<UserCircle size={18}/>} name="Profile" controller={{ control: view, setController: setView }} />
                <MainSideNavButtons vertical={false} icon={<ShoppingBag size={18}/>} name="Orders" controller={{ control: view, setController: setView }} />
                <MainSideNavButtons vertical={false} icon={<UserCircle size={18}/>} name="About Us" controller={{ control: view, setController: setView }} />
                <MainSideNavButtons vertical={false} icon={<Headset size={18}/>} name="Help" controller={{ control: view, setController: setView }} />
            </MainSideNav>
            <div className="fx1">
                {view === "Profile" && <Profile />}
                {view === "Orders" && <AddressBook />}
                {view === "About Us" && <AboutUs />}
                {view === "Help" && <HelpAndSupport/>}

            </div>
        </div>
    )
}