export const useStorage = () => {
  const storage = typeof window !== "undefined" ? localStorage : null;
  return storage;
}