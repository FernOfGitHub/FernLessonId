/**
 * Static option lists and sori-bucket classifier used by the identifier wizard.
 * Extracted from src/FernIdentifier.tsx.
 */
export const regions = [
  { id: 'northeast', name: 'Northeast US', description: 'ME, NH, VT, MA, RI, CT, NY, NJ, PA' },
  { id: 'atlantic', name: 'Atlantic US', description: 'MD, VA, WV, NC, SC, GA, FL, AL, MS, LA, AR, TN, KY, OH, IN, IL, MI, WI, MN, IA, MO, TX' },
  { id: 'pacific-northwest', name: 'Pacific Northwest US', description: 'WA, OR, northern CA, BC' },
  { id: 'canada', name: 'Canada', description: 'All provinces and territories' },
  { id: 'uk', name: 'UK', description: 'England, Scotland, Wales, Northern Ireland' },
  { id: 'europe', name: 'Western and Central Europe', description: 'France, Germany, Austria, Switzerland, Netherlands, Belgium, Spain, Portugal, Italy' },
  { id: 'iceland', name: 'Iceland', description: 'Iceland (lava fields, rocky slopes, and sheltered microclimates)' },
  { id: 'hawaii', name: 'Hawaii', description: 'Hawaiian Islands' },
  { id: 'australia', name: 'Australia', description: 'Mainland Australia' },
  { id: 'tasmania', name: 'Tasmania', description: 'Tasmania (island state of Australia)' },
  { id: 'new-zealand', name: 'New Zealand', description: 'North and South Islands' },
  { id: 'japan', name: 'Japan', description: 'Honshu, Hokkaido, Kyushu, Shikoku, and the Ryukyu Islands' }
];

export const habitats = [
  { id: 'forest', name: 'Forest Floor', description: 'Shaded woodland areas' },
  { id: 'wetland', name: 'Wetland/Swamp', description: 'Consistently wet areas, marshes' },
  { id: 'rock', name: 'Rocky Outcrops', description: 'Cliffs, rock crevices, ledges' },
  { id: 'stream', name: 'Stream Banks', description: 'Along water edges' },
  { id: 'open', name: 'Open Fields', description: 'Meadows, clearings, full sun' }
];

export const textures = [
  { id: 'delicate', name: 'Delicate/Thin', description: 'Papery, translucent texture' },
  { id: 'leathery', name: 'Leathery/Thick', description: 'Tough, evergreen texture' },
  { id: 'hairy', name: 'Fuzzy/Hairy', description: 'Visible hairs on fronds or stems' }
];

/** Classifier for the identifier “sori type” step; order is first-match. */
export const identifierSoriBuckets = [
  {
    id: 'fertile-spike-separate',
    name: 'Spikes or separate fertile fronds',
    description:
      'Sporangia on fertile spikes, separate brown fertile fronds, or fertile segments—not ordinary round sori on green pinnae (e.g. grapeferns, adder’s-tongues, many Osmundaceae).',
    test: (t) =>
      /fertile spike|Separate fertile|Sporangia on fertile spike|grape-fern|moonwort|on fertile branch|bead-like on fertile|clustered at fertile|tassel-like|fertile pinna tips|fertile segment/i.test(
        t
      )
  },
  {
    id: 'tubular-filmy',
    name: 'Tubular urn (filmy ferns)',
    description: 'Sporangia in an urn- or tube-shaped indusium (typical Hymenophyllaceae).',
    test: (t) => /tubular involucre|Tubular|filmy fern sporangia/i.test(t)
  },
  {
    id: 'tree-fern-round',
    name: 'Tree fern (round sori on pinnae)',
    description: 'Large Cyathea- or tree-fern type sori on pinnules, often with scale or cup indusia.',
    test: (t) =>
      /tree fern sori|typical Cyathea|lacy tree|prickly tree|rough tree|Round on pinnules with indusium/i.test(t) ||
      (/Cyathea|Soft Tree Fern/i.test(t) && /pinnule|indusium|tree fern/i.test(t))
  },
  {
    id: 'dicksonia-marginal',
    name: 'Dicksonia-type marginal cups',
    description: 'Sori in marginal cup-like structures (typical Dicksonia).',
    test: (t) => /Marginal cups — Dicksonia|marginal or near-marginal — often in cup/i.test(t)
  },
  {
    id: 'chain-like',
    name: 'Chain-like (joined in rows)',
    description: 'Elongate sori linked in rows between veins.',
    test: (t) => /chain-like|catenulate/i.test(t)
  },
  {
    id: 'curved-linear',
    name: 'Curved linear (J- or horseshoe-shaped)',
    description: 'Often Athyrium- or adiantum-like along vein endings.',
    test: (t) => /Curved linear|curved linear|horseshoe-shaped/i.test(t)
  },
  {
    id: 'linear-veins',
    name: 'Linear along veins',
    description: 'Oblong sori following veins, one-sided or false-indusium types included.',
    test: (t) =>
      /Linear along vein|Linear oblong|linear along|Linear — silvery|Linear on fertile fronds/i.test(t) &&
      !/Curved linear|curved linear/i.test(t)
  },
  {
    id: 'round-peltate',
    name: 'Round with peltate (shield) indusium',
    description: 'Round sori with a central stalked indusium (polystichum-type and similar).',
    test: (t) => /[Pp]eltate indusium|peltate/i.test(t)
  },
  {
    id: 'round-kidney',
    name: 'Round with kidney-shaped indusium',
    description: 'Classic wood-fern and male-fern type round sori with kidney indusia.',
    test: (t) => /kidney-shaped indusium/i.test(t)
  },
  {
    id: 'naked-round',
    name: 'Round, naked (no indusium)',
    description: 'Polypody-style exposed round sori without indusia.',
    test: (t) =>
      /[Rr]ound, naked|naked round|Naked, covering pinnae|polypody/i.test(t) && !/kidney-shaped/i.test(t)
  },
  {
    id: 'marginal-other',
    name: 'Other marginal / false indusium',
    description: 'Along segment margins—rolled leaf margin, bracken-like, or maidenhair reflex.',
    test: (t) =>
      /[Mm]arginal, false indusium|[Mm]arginal cup|[Mm]arginal, continuous|[Mm]arginal, naked — like bracken|[Mm]arginal or immersed/i.test(
        t
      )
  },
  {
    id: 'round-generic',
    name: 'Round (hood or generic round indusiate)',
    description: 'Small round sori with a hood or thin indusium; bladder ferns and similar.',
    test: (t) =>
      /^[Rr]ound —|Round — small|Round on sterile|bladder-fern|Round with hood/i.test(t) ||
      (/^[Rr]ound /i.test(t) && !/kidney-shaped|peltate|naked/i.test(t))
  },
  {
    id: 'other',
    name: 'Other / less common',
    description: 'Anything that does not fit the categories above.',
    test: () => true
  }
];

export function getIdentifierSoriBucket(fern) {
  const raw = fern.soriType || '';
  for (const b of identifierSoriBuckets) {
    if (b.test(raw)) return b.id;
  }
  return 'other';
}
