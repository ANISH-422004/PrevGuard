// cryptoUtils.js
export async function deriveKeyFromPIN(pin) {
    const encoder = new TextEncoder();
    const salt = encoder.encode("vault-pin-salt"); // fixed salt for demo (you can store per-user later)
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(pin),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
  
    return await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
  }
  
  export async function encryptData(plainText, key) {
    const encoder = new TextEncoder();
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV
    const encoded = encoder.encode(plainText);
  
    const cipherBuffer = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      encoded
    );
  
    // Return base64-encoded strings for DB storage
    return {
      iv: btoa(String.fromCharCode(...iv)),
      data: btoa(String.fromCharCode(...new Uint8Array(cipherBuffer))),
    };
  }
  
  export async function decryptData({ data, iv }, key) {
    const decoder = new TextDecoder();
    const ivBytes = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0));
    const dataBytes = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
  
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: ivBytes,
      },
      key,
      dataBytes
    );
  
    return decoder.decode(decrypted);
  }
  