// A lightweight encryption service to obfuscate local data.
// In a full production environment with backend, sensitive data should be stored on the server.
// For this client-side architecture, this prevents casual tampering.

const SECRET_SALT = "NumSoul_Secret_Salt_2025_#";

export const encryptionService = {
  // Simple XOR cipher with Base64 encoding
  encrypt: (data: string): string => {
    try {
      const textToChars = (text: string) => text.split('').map(c => c.charCodeAt(0));
      const byteHex = (n: number) => ("0" + Number(n).toString(16)).substr(-2);
      const applySaltToChar = (code: number) => textToChars(SECRET_SALT).reduce((a, b) => a ^ b, code);

      return textToChars(data)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
    } catch (e) {
      console.error("Encryption failed", e);
      return "";
    }
  },

  decrypt: (encoded: string): string => {
    try {
      const textToChars = (text: string) => text.split('').map(c => c.charCodeAt(0));
      const applySaltToChar = (code: number) => textToChars(SECRET_SALT).reduce((a, b) => a ^ b, code);
      
      return (encoded.match(/.{1,2}/g) || [])
        .map(hex => parseInt(hex, 16))
        .map(applySaltToChar)
        .map(charCode => String.fromCharCode(charCode))
        .join('');
    } catch (e) {
      console.error("Decryption failed - Data might be tampered", e);
      return "";
    }
  }
};