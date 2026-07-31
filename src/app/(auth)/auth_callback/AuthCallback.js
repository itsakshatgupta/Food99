"use client";

import { useEffect } from "react";
import { broadcastResponseToMainFrame } from "@azure/msal-browser/redirect-bridge";

export default function AuthCallback() {
  useEffect(() => {
    broadcastResponseToMainFrame().catch((error) => {
      console.error("Microsoft authentication callback failed:", error);
    });
  }, []);

  return <p>Completing Microsoft sign-in…</p>;
}
