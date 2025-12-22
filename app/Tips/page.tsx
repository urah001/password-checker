"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BsForward } from "react-icons/bs";

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

function getRandomTips(tips: string[], count = 2) {
  const shuffled = [...tips].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function SecurityTipsModal() {
  const [visible, setVisible] = useState(true);
  const [tips, setTips] = useState<string[]>([]);
  const [amountClicked, setAmountClicked] = useState(0);

  useEffect(() => {
    setTips(getRandomTips(securityTips));
  }, []);

  const nextTips = () => {
    setTips(getRandomTips(securityTips));
    const newCount = amountClicked + 1;
    setAmountClicked(newCount);
    if (newCount >= 2) {
      setVisible(false);
    }
  };

  if (!visible) return null;

  return (
    // Pushes content to the bottom (justify-end) and adds padding-bottom (pb-8)
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-end bg-black pb-8">
      {/* Background Image Container - Now full screen height (h-screen) */}
      <div className="absolute inset-0 w-full h-screen z-0">
        <Image
          src={"/test.jpeg"}
          alt="testing"
          fill
          className="object-cover" // Removed opacity for a full image
          priority
        />
      </div>

      {/* Text Content Container - Transparent background (bg-transparent) */}
      <div className="relative z-10 w-[90%] max-w-md rounded-2xl bg-transparent p-6 font-bold">
        <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2 drop-shadow-lg">
          🔐 Security Tip
        </h3>

        <ul className="text-base text-black space-y-3 mb-6 drop-shadow-md">
          {tips.map((tip, i) => (
            <li key={i} className="leading-relaxed">
              • {tip}
            </li>
          ))}
        </ul>

        {/* Action Button - Retains original color background */}
        <button
          onClick={nextTips}
          className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-[#a26239] text-white text-xl font-semibold 
                     shadow-[4px_4px_8px_#7d4b2c,-4px_-4px_8px_#c98250] 
                     active:shadow-[inset_4px_4px_8px_#7d4b2c,inset_-4px_-4px_8px_#c98250] 
                     transition-all cursor-pointer"
        >
          Next <BsForward size={24} />
        </button>
      </div>
    </div>
  );
}
