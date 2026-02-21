/**
 * Generates fern_id_key.txt - the fern identification key tree.
 * Run: node scripts/generate-fern-id-key.js
 * Output: fern_id_key.txt (project root)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const steps = [
  {
    key: 'region',
    title: '1. Region',
    options: [
      { id: 'northeast', name: 'Northeast US' },
      { id: 'atlantic', name: 'Atlantic US' },
      { id: 'pacific-northwest', name: 'Pacific Northwest US' },
      { id: 'uk', name: 'UK' },
      { id: 'europe', name: 'Western and Central Europe' },
      { id: 'hawaii', name: 'Hawaii' },
      { id: 'australia', name: 'Australia' },
      { id: 'new-zealand', name: 'New Zealand' }
    ]
  },
  {
    key: 'habitat',
    title: '2. Habitat',
    options: [
      { id: 'forest', name: 'Forest Floor' },
      { id: 'wetland', name: 'Wetland/Swamp' },
      { id: 'rock', name: 'Rocky Outcrops' },
      { id: 'stream', name: 'Stream Banks' },
      { id: 'open', name: 'Open Fields' }
    ]
  },
  {
    key: 'frondType',
    title: '3. Frond Division',
    options: [
      { id: 'once', name: 'Once Divided' },
      { id: 'twice', name: 'Twice Divided' },
      { id: 'thrice', name: 'Thrice+ Divided' },
      { id: 'pedate', name: 'Pedate' },
      { id: 'simple', name: 'Undivided' }
    ]
  },
  {
    key: 'size',
    title: '4. Frond Size',
    options: [
      { id: 'small', name: 'Small (< 12")' },
      { id: 'medium', name: 'Medium (12-36")' },
      { id: 'large', name: 'Large (> 36")' }
    ]
  },
  {
    key: 'texture',
    title: '5. Frond Texture',
    options: [
      { id: 'delicate', name: 'Delicate/Thin' },
      { id: 'leathery', name: 'Leathery/Thick' },
      { id: 'hairy', name: 'Fuzzy/Hairy' }
    ]
  }
];

const fernDatabase = [
  { name: 'Christmas Fern', scientific: 'Polystichum acrostichoides', regions: ['northeast', 'atlantic'], habitat: ['forest', 'rock'], frondType: 'once', size: 'medium', texture: 'leathery' },
  { name: 'Lady Fern', scientific: 'Athyrium filix-femina', regions: ['northeast', 'atlantic', 'pacific-northwest', 'uk', 'europe'], habitat: ['forest', 'stream'], frondType: 'twice', size: 'medium', texture: 'delicate' },
  { name: 'Cinnamon Fern', scientific: 'Osmundastrum cinnamomeum', regions: ['northeast', 'atlantic'], habitat: ['wetland', 'stream'], frondType: 'twice', size: 'large', texture: 'delicate' },
  { name: 'Maidenhair Fern', scientific: 'Adiantum pedatum', regions: ['northeast', 'atlantic', 'pacific-northwest'], habitat: ['forest'], frondType: 'pedate', size: 'small', texture: 'delicate' },
  { name: 'Bracken Fern', scientific: 'Pteridium aquilinum', regions: ['northeast', 'atlantic', 'pacific-northwest', 'uk', 'europe'], habitat: ['open', 'forest'], frondType: 'thrice', size: 'large', texture: 'leathery' },
  { name: 'Hay-scented Fern', scientific: 'Dennstaedtia punctilobula', regions: ['northeast', 'atlantic'], habitat: ['forest', 'open'], frondType: 'twice', size: 'medium', texture: 'hairy' },
  { name: 'Ostrich Fern', scientific: 'Matteuccia struthiopteris', regions: ['northeast', 'atlantic', 'pacific-northwest'], habitat: ['stream', 'wetland'], frondType: 'twice', size: 'large', texture: 'delicate' },
  { name: 'Walking Fern', scientific: 'Asplenium rhizophyllum', regions: ['northeast', 'atlantic'], habitat: ['rock'], frondType: 'simple', size: 'small', texture: 'leathery' },
  { name: 'Sword Fern', scientific: 'Polystichum munitum', regions: ['pacific-northwest'], habitat: ['forest'], frondType: 'once', size: 'large', texture: 'leathery' },
  { name: "Braun's Holly Fern", scientific: 'Polystichum braunii', regions: ['northeast', 'atlantic', 'pacific-northwest'], habitat: ['forest', 'rock'], frondType: 'twice', size: 'medium', texture: 'leathery' },
  { name: "Anderson's Sword Fern", scientific: 'Polystichum andersonii', regions: ['pacific-northwest'], habitat: ['forest'], frondType: 'twice', size: 'large', texture: 'leathery' },
  { name: "Kruckeberg's Sword Fern", scientific: 'Polystichum kruckebergii', regions: ['pacific-northwest'], habitat: ['rock'], frondType: 'once', size: 'small', texture: 'leathery' },
  { name: 'Imbricate Sword Fern', scientific: 'Polystichum imbricans', regions: ['pacific-northwest'], habitat: ['rock', 'forest'], frondType: 'once', size: 'small', texture: 'leathery' },
  { name: 'Sensitive Fern', scientific: 'Onoclea sensibilis', regions: ['northeast', 'atlantic'], habitat: ['wetland', 'stream', 'forest'], frondType: 'once', size: 'medium', texture: 'delicate' },
  { name: 'Royal Fern', scientific: 'Osmunda regalis', regions: ['northeast', 'atlantic', 'uk'], habitat: ['wetland', 'stream'], frondType: 'twice', size: 'large', texture: 'delicate' },
  { name: 'Interrupted Fern', scientific: 'Osmunda claytoniana', regions: ['northeast', 'atlantic'], habitat: ['forest', 'wetland'], frondType: 'twice', size: 'large', texture: 'delicate' },
  { name: 'New York Fern', scientific: 'Thelypteris noveboracensis', regions: ['northeast', 'atlantic'], habitat: ['forest', 'wetland'], frondType: 'once', size: 'medium', texture: 'delicate' },
  { name: 'Marginal Wood Fern', scientific: 'Dryopteris marginalis', regions: ['northeast', 'atlantic'], habitat: ['forest', 'rock'], frondType: 'twice', size: 'medium', texture: 'leathery' },
  { name: 'Marsh Fern', scientific: 'Thelypteris palustris', regions: ['northeast', 'atlantic', 'pacific-northwest'], habitat: ['wetland', 'stream'], frondType: 'once', size: 'medium', texture: 'delicate' },
  { name: 'Ebony Spleenwort', scientific: 'Asplenium platyneuron', regions: ['northeast', 'atlantic'], habitat: ['rock', 'forest'], frondType: 'once', size: 'small', texture: 'leathery' },
  { name: 'Maidenhair Spleenwort', scientific: 'Asplenium trichomanes', regions: ['northeast', 'atlantic', 'pacific-northwest', 'uk', 'europe'], habitat: ['rock'], frondType: 'once', size: 'small', texture: 'leathery' },
  { name: 'Common Polypody', scientific: 'Polypodium virginianum', regions: ['northeast', 'atlantic', 'uk'], habitat: ['rock', 'forest'], frondType: 'once', size: 'small', texture: 'leathery' },
  { name: 'Spinulose Wood Fern', scientific: 'Dryopteris carthusiana', regions: ['northeast', 'atlantic', 'pacific-northwest'], habitat: ['forest', 'wetland'], frondType: 'thrice', size: 'medium', texture: 'delicate' },
  { name: 'Intermediate Wood Fern', scientific: 'Dryopteris intermedia', regions: ['northeast', 'atlantic'], habitat: ['forest', 'rock'], frondType: 'thrice', size: 'medium', texture: 'delicate' },
  { name: 'Long Beech Fern', scientific: 'Phegopteris connectilis', regions: ['northeast', 'atlantic', 'pacific-northwest'], habitat: ['forest', 'rock'], frondType: 'once', size: 'small', texture: 'delicate' },
  { name: 'Broad Beech Fern', scientific: 'Phegopteris hexagonoptera', regions: ['northeast', 'atlantic'], habitat: ['forest'], frondType: 'once', size: 'medium', texture: 'delicate' },
  { name: 'Oak Fern', scientific: 'Gymnocarpium dryopteris', regions: ['northeast', 'atlantic', 'pacific-northwest', 'uk', 'europe'], habitat: ['forest', 'rock'], frondType: 'twice', size: 'small', texture: 'delicate' },
  { name: 'Bulblet Fern', scientific: 'Cystopteris bulbifera', regions: ['northeast', 'atlantic'], habitat: ['rock', 'stream'], frondType: 'twice', size: 'medium', texture: 'delicate' },
  { name: 'Fragile Fern', scientific: 'Cystopteris fragilis', regions: ['northeast', 'atlantic', 'pacific-northwest'], habitat: ['rock'], frondType: 'twice', size: 'small', texture: 'delicate' },
  { name: 'Silvery Glade Fern', scientific: 'Deparia acrostichoides', regions: ['northeast', 'atlantic'], habitat: ['forest', 'stream'], frondType: 'once', size: 'medium', texture: 'delicate' },
  { name: "Goldie's Fern", scientific: 'Dryopteris goldiana', regions: ['northeast', 'atlantic'], habitat: ['forest'], frondType: 'twice', size: 'large', texture: 'leathery' },
  { name: 'Crested Wood Fern', scientific: 'Dryopteris cristata', regions: ['northeast', 'atlantic'], habitat: ['wetland', 'forest'], frondType: 'twice', size: 'medium', texture: 'leathery' },
  { name: "Clinton's Wood Fern", scientific: 'Dryopteris clintoniana', regions: ['northeast', 'atlantic'], habitat: ['wetland', 'forest'], frondType: 'twice', size: 'large', texture: 'leathery' },
  { name: 'Purple-stemmed Cliff Brake', scientific: 'Pellaea atropurpurea', regions: ['northeast', 'atlantic'], habitat: ['rock'], frondType: 'once', size: 'small', texture: 'leathery' },
  { name: 'Rock Cap Fern', scientific: 'Polypodium appalachianum', regions: ['northeast', 'atlantic'], habitat: ['rock'], frondType: 'once', size: 'small', texture: 'leathery' },
  { name: 'Rattlesnake Fern', scientific: 'Botrypus virginianus', regions: ['northeast', 'atlantic', 'pacific-northwest'], habitat: ['forest', 'open'], frondType: 'thrice', size: 'small', texture: 'delicate' },
  { name: 'Cut-leaved Grape Fern', scientific: 'Sceptridium dissectum', regions: ['northeast', 'atlantic'], habitat: ['forest', 'open'], frondType: 'thrice', size: 'small', texture: 'leathery' },
  { name: 'Northern Lady Fern', scientific: 'Athyrium angustum', regions: ['northeast', 'atlantic', 'pacific-northwest'], habitat: ['forest', 'wetland'], frondType: 'twice', size: 'medium', texture: 'delicate' },
  { name: "Hart's-tongue Fern", scientific: 'Asplenium scolopendrium', regions: ['uk'], habitat: ['rock', 'forest'], frondType: 'simple', size: 'medium', texture: 'leathery' },
  { name: 'Male Fern', scientific: 'Dryopteris filix-mas', regions: ['northeast', 'pacific-northwest', 'uk', 'europe'], habitat: ['forest', 'rock'], frondType: 'twice', size: 'large', texture: 'leathery' }
];

function getMatches(selections) {
  return fernDatabase.filter(fern => {
    if (selections.region && !fern.regions.includes(selections.region)) return false;
    if (selections.habitat && !fern.habitat.includes(selections.habitat)) return false;
    if (selections.frondType && fern.frondType !== selections.frondType) return false;
    if (selections.size && fern.size !== selections.size) return false;
    if (selections.texture && fern.texture !== selections.texture) return false;
    return true;
  });
}

const lines = [];

function emit(text) {
  lines.push(text);
}

function buildTree(stepIndex, selections, indent) {
  if (stepIndex >= steps.length) {
    const matches = getMatches(selections);
    if (matches.length > 0) {
      matches.forEach(f => emit(indent + '  → ' + f.name + ' (' + f.scientific + ')'));
    }
    return;
  }

  const step = steps[stepIndex];
  emit(indent + step.title);

  for (const opt of step.options) {
    const sel = { ...selections, [step.key]: opt.id };
    const matches = getMatches(sel);
    if (matches.length === 0) continue;

    emit(indent + '  ' + opt.name);
    buildTree(stepIndex + 1, sel, indent + '    ');
  }
}

emit('Fern Identification Key');
emit('======================');
emit('Follow the steps in order; each branch shows only choices that lead to at least one match.');
emit('');

buildTree(0, {}, '');

const outPath = path.join(__dirname, '..', 'fern_id_key.txt');
fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
console.log('Written: ' + outPath);
