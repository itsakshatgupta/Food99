"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallback() {
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
