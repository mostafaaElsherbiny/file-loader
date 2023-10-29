export function analyze(text: string): Map<string, number> {
  const map = new Map<string, number>();
  const words = text.split(" ");

  for (const word of words) {
    if (word.trim() === "") {
      continue;
    }
    if (map.has(word)) {
      const count = map.get(word) as number;
      map.set(word, count + 1);
    } else {
      map.set(word, 1);
    }
  }

  return map;
}
