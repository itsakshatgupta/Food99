"use client";

import { useState, useRef } from "react";
import { fetchAPI } from "@/app/(api)/api";
import { ArrowRight, Loader2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyOTP() {
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

      const res = await fetchAPI("verify-otp/"+authToken+"/"+authemail, "POST", { email: authemail, otp: finalOtp });

      if (res==="success") {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        
        <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter the 6 digit code sent to your email
        </p>

        <form onSubmit={handleVerify}>
          <div className="flex justify-between gap-2 mb-6">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200"
          >
            {message==="Success" ? "✅ OTP Verified Successfully!" : loading ? "Verifying..." : "Verify OTP"}
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