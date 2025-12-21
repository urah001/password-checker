export async function checkPwned(password: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

  const prefix = hash.substring(0, 5);
  const suffix = hash.substring(5);

  const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  const text = await res.text();

  return text.includes(suffix);
}
