"use client";
import { Suspense } from "react";
import AuthCallback from "./AuthCallback";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallback() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Page />
        </Suspense>
    );
}


function Page() {
    const params = useSearchParams();

    useEffect(() => {
        const code = params.get("code");

        if (!code) return;

        const login = async () => {
            try {
                const response = await fetch(
                    "https://api.tradeb2b.online/api/x-login/",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            code,
                        }),
                    }
                );

                const data = await response.json();

                console.log(data);

                // Example:
                // localStorage.setItem("access", data.access);

            } catch (error) {
                console.error("X login failed:", error);
            }
        };

        login();

    }, [params]);

    return <>Loading..."@"</>;
}