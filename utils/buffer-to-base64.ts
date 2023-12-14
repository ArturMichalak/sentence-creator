export function bufferToBase64(buffer: ArrayBuffer) {
  const bytes = String.fromCharCode.apply(
    null,
    new Uint8Array(buffer) as unknown as number[]
  );
  return btoa(bytes);
}
