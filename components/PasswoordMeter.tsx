"use client";
import { useState } from "react";
import { checkPwned } from "@/lib/hibp";
import StrengthBar from "./strengthBar";
import PasswordHints from "./passwordHint";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function PasswordMeter() {
  const [password, setPassword] = useState("");
  const [pwned, setPwned] = useState<boolean | null>(null);

  const strength = calculateStrength(password);

  async function handleCheck() {
    if (!password) return;
    const compromised = await checkPwned(password);
    setPwned(compromised);
  }
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="w-full max-w-md p-6 bg-[#a26239] shadow-[inset_0px_4px_6px_0px_#a26239] rounded-xl ">
      <h2 className="text-xl font-bold mb-4">Password Strength Checker</h2>
      <div className="flex">
        <input
          type={isVisible ? "text" : "password"}
          placeholder="Enter password"
          className="w-full p-3  rounded mb-3 outline-none"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPwned(null);
          }}
        />

        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          {isVisible ? <BsEyeSlash size={30} /> : <BsEye size={30} />}
        </button>
      </div>

      <StrengthBar strength={strength} />
      <PasswordHints password={password} />

      <button
        onClick={handleCheck}
        className="mt-4 w-full bg-black text-white p-2 rounded"
      >
        Check Breach Status
      </button>

      {pwned !== null && (
        <p
          className={`mt-3 font-semibold ${
            pwned ? "text-red-600" : "text-green-600"
          }`}
        >
          {pwned
            ? "⚠️ This password has appeared in data breaches!"
            : "✅ This password was NOT found in known breaches."}
        </p>
      )}
    </div>
  );
}

function calculateStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}
