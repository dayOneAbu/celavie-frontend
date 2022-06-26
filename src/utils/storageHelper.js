export function getStoredData(key) {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem(key);
    return storedUser ? JSON.parse(storedUser) : null;
  }
}

export function setStoredData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
export function UpdateStoredData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function clearStoredData(key) {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
}
