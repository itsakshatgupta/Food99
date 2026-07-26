"use client";



import { useSearchParams } from "next/navigation";

import { useEffect } from "react";



export default function auth_callack() {



    const params = useSearchParams();



    useEffect(() => {



        const code = params.get("code");



        fetch("https://api.tradeb2b.online/api/x-login/", {



            method: "POST",



            headers: {

                "Content-Type": "application/json"

            },



            body: JSON.stringify({

                code

            })



        });



    }, []);



    return( <>Loading...</>);

}