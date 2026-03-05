"use client";
import { Suspense, useEffect } from "react";

import { useState, useRef } from "react";
import { fetchAPI } from "@/app/(api)/api";
import { ArrowRight, Loader2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import Footer from "@/components/layout-cpmt/footer";

function OtpContent() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const inputsRef = useRef([]);
  const pathname = useSearchParams()
  const authToken = pathname.get("auth-token");
  const authemail = pathname.get("email");
  const router = useRouter();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value.slice(-1);
    setOtp(newOtp);

    if (element.value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setMessage("Please enter complete OTP");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetchAPI("verify-otp/" + authToken + "/" + authemail, "POST", { email: authemail, otp: finalOtp });

      if (res === "success") {
        setMessage("✅ OTP Verified Successfully!");
        router.push("/login");
      } else {
        setMessage(res || "Invalid OTP");
      }
    } catch (err) {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setMessage("OTP Resent Successfully");
    // Call resend API here
  };

  return (
    <div className="min-h-screen flex fd-c items-center p-5 justify-center bg-gray-100_">
      <div className="bg-white shadow-sm border rounded-2xl p-5 w-full max-w-md text-center">

        <h2 className="text-2xl font-bold mb-2">TradeB2B</h2>
        <p className="text-gray-500 text-sm mb-2">
          Enter the 6 digit code sent to your email
        </p>
        <div className="bdrds border border-black p-0.5 px-6 text-sm  mb-6 wfc justify-self-center">akshatguptanov@gmail.com</div>

        <form onSubmit={handleVerify}>
          <div className="flex justify-between gap-2 lg:mx-5 mb-6">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="min-w-8 w-12 h-12 text-center text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200"
          >
            {message === "Success" ? "✅ OTP Verified Successfully!" : loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleResend}
            className="text-sm text-blue-600 hover:underline"
          >
            Resend OTP
          </button>
        </div>

        {message && (
          <p className="mt-4 text-sm text-red-700">{message !== "success" && message}</p>
        )}
      </div>
    </div>
  );
}

export function Page__() {
  const pathname = useSearchParams()
  const authToken = pathname.get("auth-token");
  const authemail = pathname.get("email");
  const router = useRouter();
  const [view, setView] = useState(false);
  useEffect(() => {
    if (!authToken || !authemail) {
      router.push('/')
    }
    async function chech_uuid() {
      const bool = await fetchAPI("verify-otp/" + authToken + "/" + authemail, "GET", null, false, false, false)
      if( bool.ok ){
        setView(true);
      }else{
        router.push('/')
      }
    }
    chech_uuid()
  }, [])
  return (
    <>
     {view&&<><OtpContent /><Footer/></>}
     
     </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page__ />
    </Suspense>
  );
}