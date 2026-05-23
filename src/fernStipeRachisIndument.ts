/**
 * Stipe/rachis indument — scales, hairs, or plain (glabrous); color; grooved rachis.
 * Used in the identifier UI, database search, and (via inferStipeColorBucket) the ID wizard.
 */
export type StipeRachisIndument = {
  surface: 'plain' | 'scales' | 'hairs';
  color: string;
  grooved: 'yes' | 'no' | 'variable';
};

export const STIPE_RACHIS_BY_SCIENTIFIC: Record<string, StipeRachisIndument> = {
  'Polystichum acrostichoides': {
    surface: 'scales',
    color: 'Pale brown to straw-colored scales',
    grooved: 'yes',
  },
  'Athyrium filix-femina': {
    surface: 'scales',
    color: 'Green to straw; sparse scales especially toward stipe base',
    grooved: 'yes',
  },
  'Osmundastrum cinnamomeum': {
    surface: 'hairs',
    color: 'Green stipe; dense woolly cinnamon hairs on fiddleheads and young axes',
    grooved: 'variable',
  },
  'Adiantum pedatum': {
    surface: 'plain',
    color: 'Shiny purple-black to deep brown (glabrous)',
    grooved: 'yes',
  },
  'Pteridium aquilinum': {
    surface: 'hairs',
    color: 'Straw to brown; fine hairs on axes',
    grooved: 'yes',
  },
  'Dennstaedtia punctilobula': {
    surface: 'hairs',
    color: 'Straw-colored; fine hairs on rachis and costae',
    grooved: 'yes',
  },
  'Matteuccia struthiopteris': {
    surface: 'scales',
    color: 'Green to straw; scattered pale scales at base',
    grooved: 'yes',
  },
  'Asplenium rhizophyllum': {
    surface: 'scales',
    color: 'Green; small pale scales at stipe base',
    grooved: 'variable',
  },
  'Polystichum munitum': {
    surface: 'scales',
    color: 'Brown scales; stipe often straw when older scales shed',
    grooved: 'yes',
  },
  'Polystichum braunii': {
    surface: 'scales',
    color: 'Golden- to reddish-brown scales',
    grooved: 'yes',
  },
  'Polystichum andersonii': {
    surface: 'scales',
    color: 'Brown scales',
    grooved: 'yes',
  },
  'Polystichum kruckebergii': {
    surface: 'scales',
    color: 'Brown scales',
    grooved: 'yes',
  },
  'Polystichum imbricans': {
    surface: 'scales',
    color: 'Brown scales',
    grooved: 'yes',
  },
  'Onoclea sensibilis': {
    surface: 'hairs',
    color: 'Straw; short hairs on rachis',
    grooved: 'yes',
  },
  'Osmunda regalis': {
    surface: 'hairs',
    color: 'Green; often woolly when young, glabrous when mature',
    grooved: 'yes',
  },
  'Osmunda claytoniana': {
    surface: 'hairs',
    color: 'Green; sparse woolly hairs when young',
    grooved: 'yes',
  },
  'Thelypteris noveboracensis': {
    surface: 'plain',
    color: 'Green; mostly glabrous axes',
    grooved: 'yes',
  },
  'Woodwardia areolata': {
    surface: 'scales',
    color: 'Tan to brown scales',
    grooved: 'yes',
  },
  'Dryopteris marginalis': {
    surface: 'scales',
    color: 'Golden- to reddish-brown scales',
    grooved: 'yes',
  },
  'Thelypteris palustris': {
    surface: 'plain',
    color: 'Green; essentially glabrous',
    grooved: 'yes',
  },
  'Asplenium platyneuron': {
    surface: 'scales',
    color: 'Dark reddish brown at base, green above',
    grooved: 'yes',
  },
  'Asplenium trichomanes': {
    surface: 'scales',
    color: 'Dark brown to blackish scales',
    grooved: 'yes',
  },
  'Polypodium virginianum': {
    surface: 'scales',
    color: 'Buff to pale brown scales',
    grooved: 'no',
  },
  'Dryopteris carthusiana': {
    surface: 'scales',
    color: 'Golden-brown scales',
    grooved: 'yes',
  },
  'Dryopteris intermedia': {
    surface: 'scales',
    color: 'Golden-brown scales',
    grooved: 'yes',
  },
  'Phegopteris connectilis': {
    surface: 'hairs',
    color: 'Straw; fine hairs on rachis',
    grooved: 'yes',
  },
  'Phegopteris hexagonoptera': {
    surface: 'hairs',
    color: 'Straw; fine hairs on rachis',
    grooved: 'yes',
  },
  'Gymnocarpium dryopteris': {
    surface: 'plain',
    color: 'Green; glandular dots may be present',
    grooved: 'yes',
  },
  'Cystopteris bulbifera': {
    surface: 'scales',
    color: 'Pale brown scales',
    grooved: 'yes',
  },
  'Cystopteris fragilis': {
    surface: 'scales',
    color: 'Pale brown scales',
    grooved: 'yes',
  },
  'Deparia acrostichoides': {
    surface: 'hairs',
    color: 'Straw; short hairs on rachis',
    grooved: 'yes',
  },
  'Dryopteris goldiana': {
    surface: 'scales',
    color: 'Dark scales at base, golden-brown above',
    grooved: 'yes',
  },
  'Dryopteris cristata': {
    surface: 'scales',
    color: 'Brown scales',
    grooved: 'yes',
  },
  'Dryopteris clintoniana': {
    surface: 'scales',
    color: 'Brown scales',
    grooved: 'yes',
  },
  'Pellaea atropurpurea': {
    surface: 'scales',
    color: 'Purple-black to dark brown; scaly stipe',
    grooved: 'variable',
  },
  'Polypodium appalachianum': {
    surface: 'scales',
    color: 'Tan scales',
    grooved: 'no',
  },
  'Botrypus virginianus': {
    surface: 'scales',
    color: 'Pinkish to straw scales on short stipe',
    grooved: 'no',
  },
  'Sceptridium dissectum': {
    surface: 'scales',
    color: 'Straw-colored scales',
    grooved: 'no',
  },
  'Athyrium angustum': {
    surface: 'scales',
    color: 'Green to straw; sparse scales toward base',
    grooved: 'yes',
  },
  'Asplenium scolopendrium': {
    surface: 'scales',
    color: 'Dark brown scales at base, green rachis',
    grooved: 'yes',
  },
  'Dryopteris filix-mas': {
    surface: 'scales',
    color: 'Golden- to light brown scales',
    grooved: 'yes',
  },
  'Ophioglossum vulgatum': {
    surface: 'plain',
    color: 'Green; glabrous petiole',
    grooved: 'no',
  },
  'Ophioglossum azoricum': {
    surface: 'plain',
    color: 'Green; glabrous',
    grooved: 'no',
  },
  'Ophioglossum lusitanicum': {
    surface: 'plain',
    color: 'Green; glabrous',
    grooved: 'no',
  },
  'Asplenium ceterach': {
    surface: 'scales',
    color: 'Dense rusty or golden scales (scaly throughout)',
    grooved: 'yes',
  },
  'Polystichum lonchitis': {
    surface: 'scales',
    color: 'Dark brown to blackish scales',
    grooved: 'yes',
  },
  'Asplenium viride': {
    surface: 'scales',
    color: 'Dark brown to blackish scales',
    grooved: 'yes',
  },
  'Asplenium marinum': {
    surface: 'scales',
    color: 'Dark brown scales',
    grooved: 'yes',
  },
  'Botrychium lunaria': {
    surface: 'plain',
    color: 'Green to straw; glabrous',
    grooved: 'no',
  },
  'Struthiopteris spicant': {
    surface: 'scales',
    color: 'Dark brown to blackish scales',
    grooved: 'yes',
  },
  'Polypodium cambricum': {
    surface: 'scales',
    color: 'Tan to brown scales',
    grooved: 'no',
  },
  'Polypodium interjectum': {
    surface: 'scales',
    color: 'Tan scales',
    grooved: 'no',
  },
  'Polypodium vulgare': {
    surface: 'scales',
    color: 'Tan to brown scales',
    grooved: 'no',
  },
  'Vandenboschia speciosa': {
    surface: 'hairs',
    color: 'Dark; fine hairs on wiry axes',
    grooved: 'variable',
  },
  'Hymenophyllum tunbridgense': {
    surface: 'hairs',
    color: 'Dark; hairy rhizome and stipes',
    grooved: 'variable',
  },
  'Hymenophyllum wilsonii': {
    surface: 'hairs',
    color: 'Dark; hairy axes',
    grooved: 'variable',
  },
  'Asplenium septentrionale': {
    surface: 'scales',
    color: 'Dark brown scales',
    grooved: 'yes',
  },
  'Asplenium ruta-muraria': {
    surface: 'scales',
    color: 'Dark brown to blackish scales',
    grooved: 'yes',
  },
  'Adiantum capillus-veneris': {
    surface: 'plain',
    color: 'Shiny dark brown to black (glabrous)',
    grooved: 'yes',
  },
  'Anogramma leptophylla': {
    surface: 'hairs',
    color: 'Green; sparse minute hairs',
    grooved: 'yes',
  },
  'Woodsia alpina': {
    surface: 'scales',
    color: 'Brown scales with intermixed hairs',
    grooved: 'variable',
  },
  'Woodsia ilvensis': {
    surface: 'hairs',
    color: 'Rusty hairs with brown scales',
    grooved: 'variable',
  },
  'Asplenium obovatum subsp. lanceolatum': {
    surface: 'scales',
    color: 'Dark brown scales',
    grooved: 'yes',
  },
  'Asplenium adiantum-nigrum': {
    surface: 'scales',
    color: 'Dark brown to blackish scales',
    grooved: 'yes',
  },
  'Dryopteris submontana': {
    surface: 'scales',
    color: 'Golden-brown scales',
    grooved: 'yes',
  },
  'Dryopteris oreades': {
    surface: 'scales',
    color: 'Golden-brown scales',
    grooved: 'yes',
  },
  'Dryopteris affinis': {
    surface: 'scales',
    color: 'Golden-brown scales (conspicuous)',
    grooved: 'yes',
  },
  'Dryopteris borreri': {
    surface: 'scales',
    color: 'Golden-brown scales',
    grooved: 'yes',
  },
  'Dryopteris cambrensis': {
    surface: 'scales',
    color: 'Golden-brown scales',
    grooved: 'yes',
  },
  'Athyrium distentifolium': {
    surface: 'scales',
    color: 'Straw to pale brown; sparse scales',
    grooved: 'yes',
  },
  'Athyrium distentifolium var. flexile': {
    surface: 'scales',
    color: 'Straw to pale brown; sparse scales',
    grooved: 'yes',
  },
  'Oreopteris limbosperma': {
    surface: 'scales',
    color: 'Straw to tan scales',
    grooved: 'yes',
  },
  'Polystichum setiferum': {
    surface: 'scales',
    color: 'Soft brown scales (often dense)',
    grooved: 'yes',
  },
  'Polystichum aculeatum': {
    surface: 'scales',
    color: 'Brown scales',
    grooved: 'yes',
  },
  'Cystopteris diaphana': {
    surface: 'scales',
    color: 'Pale brown scales',
    grooved: 'yes',
  },
  'Cystopteris dickieana': {
    surface: 'scales',
    color: 'Pale brown scales',
    grooved: 'yes',
  },
  'Pteridium pinetorum': {
    surface: 'hairs',
    color: 'Straw to brown; fine hairs like bracken',
    grooved: 'yes',
  },
  'Gymnocarpium robertianum': {
    surface: 'plain',
    color: 'Green; glandular pubescence sometimes',
    grooved: 'yes',
  },
  'Cryptogramma crispa': {
    surface: 'scales',
    color: 'Green above; brownish scales more evident below',
    grooved: 'variable',
  },
  'Cystopteris montana': {
    surface: 'scales',
    color: 'Pale brown scales',
    grooved: 'yes',
  },
  'Asplenium onopteris': {
    surface: 'scales',
    color: 'Dark brown scales',
    grooved: 'yes',
  },
  'Dryopteris aemula': {
    surface: 'scales',
    color: 'Golden- to reddish-brown scales',
    grooved: 'yes',
  },
  'Dryopteris expansa': {
    surface: 'scales',
    color: 'Light to golden-brown scales',
    grooved: 'yes',
  },
  'Dryopteris dilatata': {
    surface: 'scales',
    color: 'Golden-brown scales',
    grooved: 'yes',
  },
  'Cyathea smithii': {
    surface: 'scales',
    color: 'Dark brown scales and hair-like fibers on stipe',
    grooved: 'variable',
  },
  'Trichomanes reniforme': {
    surface: 'hairs',
    color: 'Dark; hairy creeping rhizome and stalks',
    grooved: 'variable',
  },
  'Dicksonia antarctica': {
    surface: 'hairs',
    color: 'Dense brown woolly hairs on young stipes; fibrous with age',
    grooved: 'variable',
  },
  'Cyathea australis': {
    surface: 'scales',
    color: 'Brown scales; rough persistent stipe bases on trunk',
    grooved: 'variable',
  },
  'Cyathea cooperi': {
    surface: 'scales',
    color: 'Pale to mid brown scales on stipe',
    grooved: 'variable',
  },
  'Cyathea leichhardtiana': {
    surface: 'scales',
    color: 'Dark scales; stipe with prickles or spines',
    grooved: 'variable',
  },
  'Dicksonia youngiae': {
    surface: 'hairs',
    color: 'Dark; very bristly or hairy stipes',
    grooved: 'variable',
  },
  'Polystichum polyblepharum': {
    surface: 'scales',
    color: 'Brown scales; stipe often straw when older scales shed',
    grooved: 'yes',
  },
  'Athyrium niponicum': {
    surface: 'scales',
    color: 'Dark maroon to purple-black rachis; silver-gray blade',
    grooved: 'yes',
  },
  'Cyrtomium falcatum': {
    surface: 'scales',
    color: 'Brown scales on stipe; green rachis',
    grooved: 'yes',
  },
  'Cyrtomium fortunei': {
    surface: 'scales',
    color: 'Brown scales',
    grooved: 'yes',
  },
  'Woodwardia japonica': {
    surface: 'scales',
    color: 'Tan to brown scales at stipe base',
    grooved: 'yes',
  },
  'Dryopteris erythrosora': {
    surface: 'scales',
    color: 'Golden-brown scales; young fronds coppery',
    grooved: 'yes',
  },
  'Dryopteris crassirhizoma': {
    surface: 'scales',
    color: 'Dark brown scales; very stout scaly base',
    grooved: 'yes',
  },
  'Osmunda japonica': {
    surface: 'hairs',
    color: 'Green; woolly when young on unfolding fronds',
    grooved: 'variable',
  },
  'Deparia petersenii': {
    surface: 'scales',
    color: 'Green to straw; sparse scales at base',
    grooved: 'yes',
  },
  'Matteuccia orientalis': {
    surface: 'scales',
    color: 'Green to straw; pale scales at stipe base',
    grooved: 'yes',
  },
  'Lygodium japonicum': {
    surface: 'hairs',
    color: 'Straw-colored; fine hairs on twining rachis',
    grooved: 'variable',
  },
  'Plagiogyria japonica': {
    surface: 'scales',
    color: 'Straw to brown scales',
    grooved: 'variable',
  },
};

/** Wizard color step: inferred from free-text `color` for each species. */
export type StipeColorBucketId = 'green-straw' | 'golden-brown' | 'dark' | 'other';

export function inferStipeColorBucket(indument: StipeRachisIndument | undefined): StipeColorBucketId {
  if (!indument?.color?.trim()) return 'other';
  const c = indument.color.toLowerCase();

  if (
    /purple-black|blackish|\bblack\b|shiny purple|very dark|^dark;|^dark,|\bdark; very|\bdark\s+hairs|\bdark scales/.test(c) ||
    (/deep brown/.test(c) && !/green/.test(c)) ||
    /stipe with prickles|prickles or spines/.test(c)
  )
    return 'dark';

  if (/dark brown|dark reddish|reddish brown at base|dark stems/.test(c)) return 'dark';

  if (/green to straw|green to tan|straw to brown|tan to brown|buff to|pale to mid brown|brownish/.test(c)) return 'golden-brown';

  if (
    /golden|straw|tan|buff|pale brown|cinnamon|rusty|\brust |reddish-brown|light brown|medium brown|pinkish|brown scales|brown hair|\bbrown;|\bbrown,|\bbrown to|brown woolly|ochre|woolly cinnamon/.test(c)
  )
    return 'golden-brown';

  if (/^green|green;|green |green,|essentially glabrous|mostly glabrous|glabrous\)|green with/.test(c)) return 'green-straw';
  if (/green/.test(c) && !/brown|black/.test(c)) return 'green-straw';

  return 'other';
}
