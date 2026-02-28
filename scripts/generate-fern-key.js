/**
 * Generates fern_id_key.txt from the same logic as the Fern Identifier app.
 * Steps: 1. Region, 2. Frond Division, 3. Frond Size, 4. Frond Texture (no habitat).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const regions = [
  { id: 'northeast', name: 'Northeast US' },
  { id: 'atlantic', name: 'Atlantic US' },
  { id: 'pacific-northwest', name: 'Pacific Northwest US' },
  { id: 'uk', name: 'UK' },
  { id: 'europe', name: 'Western and Central Europe' },
  { id: 'hawaii', name: 'Hawaii' },
  { id: 'australia', name: 'Australia' },
  { id: 'new-zealand', name: 'New Zealand' }
];

const frondTypes = [
  { id: 'once', name: 'Once Divided' },
  { id: 'pinnatifid', name: 'Pinnatifid' },
  { id: 'twice', name: 'Twice Divided' },
  { id: 'bipinnatePinnatifid', name: 'Bipinnate Pinnatifid' },
  { id: 'thrice', name: 'Thrice+ Divided' },
  { id: 'pedate', name: 'Pedate' },
  { id: 'simple', name: 'Undivided' }
];

const sizes = [
  { id: 'small', name: 'Small (< 12")' },
  { id: 'medium', name: 'Medium (12-36")' },
  { id: 'large', name: 'Large (> 36")' }
];

const textures = [
  { id: 'delicate', name: 'Delicate/Thin' },
  { id: 'leathery', name: 'Leathery/Thick' },
  { id: 'hairy', name: 'Fuzzy/Hairy' }
];

const fernDatabase = [
  { name: 'Christmas Fern', scientific: 'Polystichum acrostichoides', regions: ['northeast', 'atlantic'], frondType: 'once', size: 'medium', texture: 'leathery' },
  { name: 'Lady Fern', scientific: 'Athyrium filix-femina', regions: ['northeast', 'atlantic', 'pacific-northwest', 'uk', 'europe'], frondType: 'twice', size: 'medium', texture: 'delicate' },
  { name: 'Cinnamon Fern', scientific: 'Osmundastrum cinnamomeum', regions: ['northeast', 'atlantic'], frondType: 'twice', size: 'large', texture: 'delicate' },
  { name: 'Maidenhair Fern', scientific: 'Adiantum pedatum', regions: ['northeast', 'atlantic', 'pacific-northwest'], frondType: 'pedate', size: 'small', texture: 'delicate' },
  { name: 'Bracken Fern', scientific: 'Pteridium aquilinum', regions: ['northeast', 'atlantic', 'pacific-northwest', 'uk', 'europe'], frondType: 'thrice', size: 'large', texture: 'leathery' },
  { name: 'Hay-scented Fern', scientific: 'Dennstaedtia punctilobula', regions: ['northeast', 'atlantic'], frondType: 'twice', size: 'medium', texture: 'hairy' },
  { name: 'Ostrich Fern', scientific: 'Matteuccia struthiopteris', regions: ['northeast', 'atlantic', 'pacific-northwest'], frondType: 'twice', size: 'large', texture: 'delicate' },
  { name: 'Walking Fern', scientific: 'Asplenium rhizophyllum', regions: ['northeast', 'atlantic'], frondType: 'simple', size: 'small', texture: 'leathery' },
  { name: 'Sword Fern', scientific: 'Polystichum munitum', regions: ['pacific-northwest'], frondType: 'once', size: 'large', texture: 'leathery' },
  { name: "Braun's Holly Fern", scientific: 'Polystichum braunii', regions: ['northeast', 'atlantic', 'pacific-northwest'], frondType: 'twice', size: 'medium', texture: 'leathery' },
  { name: "Anderson's Sword Fern", scientific: 'Polystichum andersonii', regions: ['pacific-northwest'], frondType: 'twice', size: 'large', texture: 'leathery' },
  { name: "Kruckeberg's Sword Fern", scientific: 'Polystichum kruckebergii', regions: ['pacific-northwest'], frondType: 'once', size: 'small', texture: 'leathery' },
  { name: 'Imbricate Sword Fern', scientific: 'Polystichum imbricans', regions: ['pacific-northwest'], frondType: 'once', size: 'small', texture: 'leathery' },
  { name: 'Sensitive Fern', scientific: 'Onoclea sensibilis', regions: ['northeast', 'atlantic'], frondType: 'pinnatifid', size: 'medium', texture: 'delicate' },
  { name: 'Royal Fern', scientific: 'Osmunda regalis', regions: ['northeast', 'atlantic', 'uk'], frondType: 'twice', size: 'large', texture: 'delicate' },
  { name: 'Interrupted Fern', scientific: 'Osmunda claytoniana', regions: ['northeast', 'atlantic'], frondType: 'twice', size: 'large', texture: 'delicate' },
  { name: 'New York Fern', scientific: 'Thelypteris noveboracensis', regions: ['northeast', 'atlantic'], frondType: 'twice', size: 'medium', texture: 'delicate' },
  { name: 'Netted Chain Fern', scientific: 'Woodwardia areolata', regions: ['northeast'], frondType: 'once', size: 'medium', texture: 'delicate' },
  { name: 'Marginal Wood Fern', scientific: 'Dryopteris marginalis', regions: ['northeast', 'atlantic'], frondType: 'twice', size: 'medium', texture: 'leathery' },
  { name: 'Marsh Fern', scientific: 'Thelypteris palustris', regions: ['northeast', 'atlantic', 'pacific-northwest'], frondType: 'once', size: 'medium', texture: 'delicate' },
  { name: 'Ebony Spleenwort', scientific: 'Asplenium platyneuron', regions: ['northeast', 'atlantic'], frondType: 'once', size: 'small', texture: 'leathery' },
  { name: 'Maidenhair Spleenwort', scientific: 'Asplenium trichomanes', regions: ['northeast', 'atlantic', 'pacific-northwest', 'uk', 'europe'], frondType: 'once', size: 'small', texture: 'leathery' },
  { name: 'Common Polypody', scientific: 'Polypodium virginianum', regions: ['northeast', 'atlantic', 'uk'], frondType: 'once', size: 'small', texture: 'leathery' },
  { name: 'Spinulose Wood Fern', scientific: 'Dryopteris carthusiana', regions: ['northeast', 'atlantic', 'pacific-northwest'], frondType: 'thrice', size: 'medium', texture: 'delicate' },
  { name: 'Intermediate Wood Fern', scientific: 'Dryopteris intermedia', regions: ['northeast', 'atlantic'], frondType: 'thrice', size: 'medium', texture: 'delicate' },
  { name: 'Long Beech Fern', scientific: 'Phegopteris connectilis', regions: ['northeast', 'atlantic', 'pacific-northwest'], frondType: 'pinnatifid', size: 'small', texture: 'delicate' },
  { name: 'Broad Beech Fern', scientific: 'Phegopteris hexagonoptera', regions: ['northeast', 'atlantic'], frondType: 'pinnatifid', size: 'medium', texture: 'delicate' },
  { name: 'Oak Fern', scientific: 'Gymnocarpium dryopteris', regions: ['northeast', 'atlantic', 'pacific-northwest', 'uk', 'europe'], frondType: 'twice', size: 'small', texture: 'delicate' },
  { name: 'Bulblet Fern', scientific: 'Cystopteris bulbifera', regions: ['northeast', 'atlantic'], frondType: 'twice', size: 'medium', texture: 'delicate' },
  { name: 'Fragile Fern', scientific: 'Cystopteris fragilis', regions: ['northeast', 'atlantic', 'pacific-northwest'], frondType: 'twice', size: 'small', texture: 'delicate' },
  { name: 'Silvery Glade Fern', scientific: 'Deparia acrostichoides', regions: ['northeast', 'atlantic'], frondType: 'once', size: 'medium', texture: 'delicate' },
  { name: "Goldie's Fern", scientific: 'Dryopteris goldiana', regions: ['northeast', 'atlantic'], frondType: 'twice', size: 'large', texture: 'leathery' },
  { name: 'Crested Wood Fern', scientific: 'Dryopteris cristata', regions: ['northeast', 'atlantic'], frondType: 'twice', size: 'medium', texture: 'leathery' },
  { name: "Clinton's Wood Fern", scientific: 'Dryopteris clintoniana', regions: ['northeast', 'atlantic'], frondType: 'twice', size: 'large', texture: 'leathery' },
  { name: 'Purple-stemmed Cliff Brake', scientific: 'Pellaea atropurpurea', regions: ['northeast', 'atlantic'], frondType: 'once', size: 'small', texture: 'leathery' },
  { name: 'Rock Cap Fern', scientific: 'Polypodium appalachianum', regions: ['northeast', 'atlantic'], frondType: 'once', size: 'small', texture: 'leathery' },
  { name: 'Rattlesnake Fern', scientific: 'Botrypus virginianus', regions: ['northeast', 'atlantic', 'pacific-northwest'], frondType: 'thrice', size: 'small', texture: 'delicate' },
  { name: 'Cut-leaved Grape Fern', scientific: 'Sceptridium dissectum', regions: ['northeast', 'atlantic'], frondType: 'thrice', size: 'small', texture: 'leathery' },
  { name: 'Northern Lady Fern', scientific: 'Athyrium angustum', regions: ['northeast', 'atlantic', 'pacific-northwest'], frondType: 'twice', size: 'medium', texture: 'delicate' },
  { name: "Hart's-tongue Fern", scientific: 'Asplenium scolopendrium', regions: ['uk'], frondType: 'simple', size: 'medium', texture: 'leathery' },
  { name: 'Male Fern', scientific: 'Dryopteris filix-mas', regions: ['northeast', 'pacific-northwest', 'uk', 'europe'], frondType: 'twice', size: 'large', texture: 'leathery' },
  { name: 'Soft Tree Fern (Kātote)', scientific: 'Cyathea smithii', regions: ['new-zealand'], frondType: 'twice', size: 'large', texture: 'leathery' }
];

function getMatches(sel) {
  return fernDatabase.filter(fern => {
    if (sel.region && !fern.regions.includes(sel.region)) return false;
    if (sel.frondType && fern.frondType !== sel.frondType) return false;
    if (sel.size && fern.size !== sel.size) return false;
    if (sel.texture && fern.texture !== sel.texture) return false;
    return true;
  });
}

function formatSpecies(fern) {
  return `→ ${fern.name} (${fern.scientific})`;
}

const steps = [
  { key: 'region', label: 'Region', options: regions },
  { key: 'frondType', label: 'Frond Division', options: frondTypes },
  { key: 'size', label: 'Frond Size', options: sizes },
  { key: 'texture', label: 'Frond Texture', options: textures }
];

function buildKey(selection, depth) {
  const baseIndent = '  '.repeat(depth);       // indent for current level's content
  const childIndent = '  '.repeat(depth + 1); // indent for next level
  let out = '';
  const step = steps[depth];
  if (!step) {
    const matches = getMatches(selection);
    if (matches.length > 0) {
      matches.forEach(fern => { out += baseIndent + formatSpecies(fern) + '\n'; });
    }
    return out;
  }
  let first = true;
  for (const opt of step.options) {
    const sel = { ...selection, [step.key]: opt.id };
    if (getMatches(sel).length === 0) continue;
    if (first) {
      out += baseIndent + `${depth + 1}. ${step.label}\n`;
      first = false;
    }
    out += childIndent + opt.name + '\n';
    out += buildKey(sel, depth + 1);
  }
  return out;
}

const header = `Fern Identification Key
======================
Follow the steps in order; each branch shows only choices that lead to at least one match.
Steps: 1. Region, 2. Frond Division, 3. Frond Size, 4. Frond Texture.
`;

const body = buildKey({}, 0);
const result = header + body.trimStart();
fs.writeFileSync(path.join(__dirname, '..', 'fern_id_key.txt'), result, 'utf8');
console.log('Written fern_id_key.txt');
