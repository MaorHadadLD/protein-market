import { productById } from "./catalog";

export type CartLines = Record<string, number>;

const STORAGE_KEY = "protein-market:cart:v1";
export const MAX_QTY = 20;

const EMPTY: CartLines = Object.freeze({}) as CartLines;
let lines: CartLines = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function sanitize(raw: unknown): CartLines {
  if (!raw || typeof raw !== "object") return EMPTY;
  const out: CartLines = {};
  for (const [id, qty] of Object.entries(raw as Record<string, unknown>)) {
    if (productById[id] && typeof qty === "number" && qty > 0) {
      out[id] = Math.min(MAX_QTY, Math.floor(qty));
    }
  }
  return out;
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) lines = sanitize(JSON.parse(stored));
  } catch {
    lines = EMPTY;
  }
}

function commit(next: CartLines) {
  lines = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage may be unavailable (private mode); the cart still works in memory.
  }
  listeners.forEach((l) => l());
}

export const cartStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      try {
        lines = sanitize(e.newValue ? JSON.parse(e.newValue) : null);
      } catch {
        lines = EMPTY;
      }
      listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot(): CartLines {
    load();
    return lines;
  },
  getServerSnapshot(): CartLines {
    return EMPTY;
  },
  add(id: string, qty = 1) {
    load();
    commit({ ...lines, [id]: Math.min(MAX_QTY, (lines[id] ?? 0) + qty) });
  },
  setQty(id: string, qty: number) {
    load();
    if (qty <= 0) return cartStore.remove(id);
    commit({ ...lines, [id]: Math.min(MAX_QTY, qty) });
  },
  remove(id: string) {
    load();
    const next = { ...lines };
    delete next[id];
    commit(next);
  },
  clear() {
    commit({});
  },
};
