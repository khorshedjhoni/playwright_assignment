// export function extractOtp(email: string): string | undefined {
//   return email.match(/\b\d{4}\b/)?.[0];
// }

export function extractOtp(email: string): string {
  const match = email.match(/\b\d{4}\b/);

  if (!match) {
    throw new Error(`OTP not found in:\n${email}`);
  }

  return match[0];
}