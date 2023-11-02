export function analyze(text: string): Map<string, number> {
  const map = new Map<string, number>();
  
  const words = text.split(" ");

  for (const word of words) {
    const wordTrim = word.trim();
    if (wordTrim == "") {
      continue;
    }
    if (map.has(wordTrim)) {
      const count = map.get(wordTrim) as number;
      map.set(wordTrim, count + 1);
    } else {
      map.set(wordTrim, 1);
    }
  }

  return map;
}

// console.log(analyze("mustafa   mustafa  "));
