import { Suspense } from "react";
import AuthCallback from "./AuthCallback";
export default function AuthCallback() {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Page />
            </Suspense>
        );
    }