export default function readingTime(body: string): number {
  if (!body) return 1;
  const wordsPerMinute = 200;
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
