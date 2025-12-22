"use client";
import PasswordMeter from "@/components/PasswoordMeter";
import SecurityTipsModal from "./Tips/page";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#a26239]">
      <SecurityTipsModal />
      <PasswordMeter />
    </main>
  );
}
