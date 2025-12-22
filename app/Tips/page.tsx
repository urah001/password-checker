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

// Ensure these paths match your 'public' folder exactly
const imagePaths = ["/illOne.svg", "/illTwo.svg", "/illThree.svg"];

function getRandomTips(tips: string[], count = 2) {
  const shuffled = [...tips].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to get a random image from the array
function getRandomImage(images: string[]) {
  return images[Math.floor(Math.random() * images.length)];
}

export default function SecurityTipsModal() {
  const [visible, setVisible] = useState(true);
  const [tips, setTips] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [amountClicked, setAmountClicked] = useState(0);

  // Initial load
  useEffect(() => {
    setTips(getRandomTips(securityTips));
    setCurrentImage(getRandomImage(imagePaths));
  }, []);

  const nextTips = () => {
    // 1. Update Tips
    setTips(getRandomTips(securityTips));

    // 2. Update Image
    setCurrentImage(getRandomImage(imagePaths));

    // 3. Handle visibility logic
    const newCount = amountClicked + 1;
    setAmountClicked(newCount);
    if (newCount >= 2) {
      setVisible(false);
    }
  };

  if (!visible || !currentImage) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-end bg-black pb-8 text-4xl">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-screen z-0">
        <Image
          src={currentImage} // Dynamically controlled by state
          alt="Security Illustration"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Text Content Container */}
      <div className="relative z-10 w-[90%] max-w-md rounded-2xl bg-transparent p-6 font-bold">
        <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2 ">
          Security Tip
        </h3>

        <ul className="text-base text-black space-y-3 mb-6 drop-shadow-md">
          {tips.map((tip, i) => (
            <li key={i} className="leading-relaxed font-bold">
              • {tip}
            </li>
          ))}
        </ul>

        {/* Action Button */}
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
