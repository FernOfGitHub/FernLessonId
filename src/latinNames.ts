// Picture to latin name mapping (file: relative path, latin name)
// Extracted from src/FernIdentifier.tsx.
import mapRaw from '../pictures/picture-latin-name-map.txt?raw';

const latinNameMap = Object.fromEntries(
  mapRaw
    .trim()
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => {
      const commaIdx = line.indexOf(',');
      const key = (commaIdx >= 0 ? line.slice(0, commaIdx) : line).trim().toLowerCase();
      const value = (commaIdx >= 0 ? line.slice(commaIdx + 1) : '').trim();
      return [key, value];
    })
);

export function getLatinName(path) {
  return latinNameMap[path.toLowerCase()] || '';
}
