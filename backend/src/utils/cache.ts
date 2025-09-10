type CacheEntry = {
  data: any;
  expiry: number;
};

class Cache {
  private store: Map<string, CacheEntry> = new Map();

  set(key: string, value: any, ttl: number = 60) {
    const expiry = Date.now() + ttl * 1000; // ttl en secondes
    this.store.set(key, { data: value, expiry });
  }

  get(key: string) {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiry) {
      this.store.delete(key);
      return null;
    }
    return entry.data;
  }
}

export default new Cache();
