"use client";

import { useEffect, useState } from "react";

const securityTips = [
  "Never reuse the same password on multiple websites.",
  "Longer passwords are harder to crack than complex short ones.",
  "Avoid using personal information in passwords.",
  "Password managers are safer than browser notes.",
  "Enable two-factor authentication whenever possible.",
  "Passwords leaked once should never be reused.",
  "Random passphrases are more secure than patterns.",
  "Public Wi-Fi increases password theft risk.",
  "Hackers target reused credentials more than weak ones.",
  "Strong passwords protect against credential stuffing.",
];
let amountClicked = 0;
function getRandomTips(tips: string[], count = 2) {
  const shuffled = [...tips].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function SecurityTipsModal() {
  const [visible, setVisible] = useState(true);
  const [tips, setTips] = useState<string[]>([]);

  useEffect(() => {
    setTips(getRandomTips(securityTips));
  }, []);

  const nextTips = () => {
    setTips(getRandomTips(securityTips));
    amountClicked += 1;
    if (amountClicked == 2) {
      setVisible(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[90%] max-w-md rounded-2xl bg-[#a26239] p-6 shadow-[8px_8px_16px_#7d4b2c,-8px_-8px_16px_#c98250]">
        <h3 className="text-lg font-semibold text-white mb-4">
          🔐 Security Tip
        </h3>

        <ul className="text-sm text-white space-y-2 mb-6">
          {tips.map((tip, i) => (
            <li key={i}>• {tip}</li>
          ))}
        </ul>

        <div className="flex justify-between">
          <button
            onClick={nextTips}
            className="px-4 py-2 rounded-lg bg-[#a26239] shadow-[inset_4px_4px_8px_#7d4b2c,inset_-4px_-4px_8px_#c98250] text-white"
          >
            Next
          </button>
          {/* logic to set visibility to false if condition are true */}
          {/* <button
            onClick={() => setVisible(false)}
            className="px-4 py-2 rounded-lg bg-green-600 text-white"
          >
            Continue
          </button> */}
        </div>
      </div>
    </div>
  );
}
