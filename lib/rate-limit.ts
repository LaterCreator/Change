import { LRUCache } from 'lru-cache'; // Use named import for LRUCache

const rateLimitOptions = {
  max: 100, // Allow up to 100 requests
  ttl: 60 * 1000, // Per minute
};

const rateLimiter = new LRUCache<string, number>(rateLimitOptions);

export function checkRateLimit(ip: string): boolean {
  const count = rateLimiter.get(ip) || 0;
  if (count >= rateLimitOptions.max) {
    return false; // Block request
  }
  rateLimiter.set(ip, count + 1);
  return true; // Allow request
}
