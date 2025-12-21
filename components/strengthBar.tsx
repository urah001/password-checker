export default function StrengthBar({ strength }: { strength: number }) {
  const levels = [
    "bg-red-500",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-blue-500",
    "bg-green-600",
  ];

  return (
    <div className="w-full h-3 bg-gray-200 rounded overflow-hidden mb-3">
      <div
        className={`h-full transition-all duration-500 ${
          levels[strength - 1] || ""
        }`}
        style={{ width: `${(strength / 5) * 100}%` }}
      />
    </div>
  );
}
