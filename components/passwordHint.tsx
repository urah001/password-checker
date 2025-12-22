"use client";
export default function PasswordHints({ password }: { password: string }) {
  const hints = [
    { check: password.length >= 8, text: "At least 8 characters" },
    { check: /[A-Z]/.test(password), text: "Contains uppercase letter" },
    { check: /[a-z]/.test(password), text: "Contains lowercase letter" },
    { check: /[0-9]/.test(password), text: "Contains a number" },
    { check: /[^A-Za-z0-9]/.test(password), text: "Contains a symbol" },
  ];

  return (
    <ul className="text-sm space-y-1">
      {hints.map((h, i) => (
        <li key={i} className={h.check ? "text-green-600" : "text-gray-300"}>
          {h.check ? "✔" : "✖"} {h.text}
        </li>
      ))}
    </ul>
  );
}
