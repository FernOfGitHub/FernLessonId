/**
 * Anatomy lesson slide content (with embedded diagrams and photo galleries).
 * Extracted from src/FernIdentifier.tsx.
 */
import { Leaf } from 'lucide-react';
import { ClickableImg } from '../components/ImageLightbox';
import { getLatinName } from '../latinNames';
import bipinnate1x1BwImg from '../../pictures/Cut/bipinnate_1x1_bw.png';
import bipinnate2Img from '../../pictures/Cut/bipinnate2.jpg';
import bipinnate3Img from '../../pictures/Cut/bipinnate3.jpg';
import bipinnateBwImg from '../../pictures/Cut/bipinnate_bw.png';
import bipinnateImg from '../../pictures/Cut/bipinnate.jpg';
import bipinnatePinnatifid1x1BwImg from '../../pictures/Cut/bipinnate_pinnatifid_1x1_bw.png';
import bipinnatePinnatifidBwImg from '../../pictures/Cut/bipinnate_pinnatifid_bw.png';
import chainLikeImg from '../../pictures/Sori/ChainLike.jpg';
import circular2Img from '../../pictures/Sori/circular2.jpg';
import circularImg from '../../pictures/Sori/Circular.jpg';
import circularPng from '../../pictures/Sori/circular.png';
import cupShapedPng from '../../pictures/Sori/cup-shaped.png';
import entire1x1BwImg from '../../pictures/Cut/entire_1x1_bw.png';
import entire2Img from '../../pictures/Cut/entire2.jpg';
import entireBwImg from '../../pictures/Cut/entire_bw.png';
import entireImg from '../../pictures/Cut/entire.jpg';
import frondImg from '../../pictures/anatomy/frond.png';
import fullCoverageImg from '../../pictures/Sori/FullCoverage.jpg';
import fullCoveragePng from '../../pictures/Sori/full-coverage.png';
import gametophyteImg from '../../pictures/anatomy/gametophyte.png';
import jShapedPng from '../../pictures/Sori/j-shaped..png';
import kidneyPng from '../../pictures/Sori/kidney.png';
import linearImg from '../../pictures/Sori/linear.jpg';
import linearPng from '../../pictures/Sori/linear.png';
import pedateImg from '../../pictures/Cut/pedate.jpg';
import pinnaRachisImg from '../../pictures/anatomy/pinna-rachis.png';
import pinnate1x1BwImg from '../../pictures/Cut/pinnate_1x1_bw.png';
import pinnateBwImg from '../../pictures/Cut/pinnate_bw.png';
import pinnateImg from '../../pictures/Cut/pinnate.jpg';
import pinnatePinnatifidImg from '../../pictures/Cut/pinnate-pinnatifid.jpg';
import pinnatifid1x1BwImg from '../../pictures/Cut/pinnatifid_1x1_bw.png';
import pinnatifidBwImg from '../../pictures/Cut/pinnatifid_bw.png';
import pinnatifidImg from '../../pictures/Cut/pinnatifid.jpg';
import vaseShapedImg from '../../pictures/anatomy/vase-shaped.jpg';

export const anatomySlides = [
  {
    title: 'Frond & Stipe',
    icon: Leaf,
    content: (
      <>
        <p className="text-gray-700 mb-4">
          Ferns don't have true leaves—they have <strong>fronds</strong>. The frond is the whole "leaf" structure you see emerging from the ground.
        </p>
        <p className="text-gray-700 mb-4">
          The <strong>stipe</strong> is the stem-like part below the blade—the stalk that connects the frond to the rhizome (underground stem). Botanists often examine the stipe for scales, color, or texture—key ID clues.
        </p>
        <div className="bg-green-50 rounded-xl px-6 py-4 flex justify-center">
          <ClickableImg src={frondImg} alt="Frond and stipe diagram" className="w-[39rem] max-w-full max-h-[45rem] object-contain" />
        </div>
      </>
    ),
  },
  {
    title: 'Pinnae & Pinnules',
    icon: Leaf,
    content: (
      <>
        <p className="text-gray-700 mb-4">
          The frond blade is often divided into smaller segments. A <strong>pinna</strong> (plural: <em>pinnae</em>) is one of the primary leaflets—the first level of division off the central axis (the <strong>rachis</strong>). The rib the pinnae are attached to is called a <strong>costa</strong>.
        </p>
        <p className="text-gray-700 mb-4">
          When pinnae are themselves divided, those smaller pieces are called <strong>pinnules</strong>. Counting how many times the frond is divided helps narrow down the species.
        </p>
        <p className="text-gray-700 mb-4 text-sm">
          In the illustration, the <strong>pinna</strong> label identifies the entire leaflet from the rachis to the tip. When that leaflet is divided, the smaller segments are the <strong>pinnules</strong>.
        </p>
        <div className="bg-green-50 rounded-xl px-6 py-4 flex justify-center">
          <ClickableImg src={pinnaRachisImg} alt="Pinna and rachis diagram" className="w-[30rem] max-w-full max-h-[36rem] object-contain" />
        </div>
      </>
    ),
  },
  {
    title: 'Frond Division',
    icon: Leaf,
    content: (
      <>
        <p className="text-gray-700 mb-4">
          How many times is the frond divided? This is one of the most useful questions for identification.
        </p>
        <ul className="text-gray-700 mb-4 space-y-2">
          <li><strong>Entire (undivided)</strong> — Simple blade, no leaflets</li>
          <li><strong>Once divided (pinnate)</strong> — Pinnae along the rachis</li>
          <li><strong>Twice divided (bipinnate)</strong> — Pinnae have pinnules</li>
          <li><strong>Thrice divided (tripinnate)</strong> — Very lacy, feathery appearance</li>
          <li><strong>Pedate/fan-shaped</strong> — Pinnae radiate from a central point or branch in a fan/palmate pattern (e.g., Maidenhair fern, Oak fern)</li>
        </ul>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Entire', image: entire1x1BwImg, fullSize: entireBwImg },
            { label: 'Once', image: pinnate1x1BwImg, fullSize: pinnateBwImg },
            { label: 'Twice', image: bipinnate1x1BwImg, fullSize: bipinnateBwImg },
          ].map(({ label, svg, image, fullSize }) => (
            <div key={label} className="bg-green-50 rounded-lg p-3 flex flex-col items-center">
              {image ? (
                <ClickableImg src={image} alt={label} className="w-16 h-16 object-contain" fullSizeSrc={fullSize} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${svg}</svg>` }} className="w-16 h-16" />
              )}
              <span className="text-xs font-medium text-gray-600 mt-1">{label}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[
            { label: 'Thrice' },
            { label: 'Pedate' },
          ].map(({ label }) => (
            <div key={label} className="bg-green-50 rounded-lg p-3 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 min-h-[4rem]">
              <span className="text-xs font-medium text-gray-500">{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-3">Real fern examples:</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { label: 'Entire', items: [
                { img: entireImg, alt: 'Entire frond (undivided)', mapKey: 'Cut/entire.JPG' },
                { img: entire2Img, alt: 'Entire frond (undivided) 2', mapKey: 'Cut/entire2.jpg' },
              ]},
              { label: 'Once (pinnate)', items: [{ img: pinnateImg, alt: 'Pinnate frond (once divided)', mapKey: 'Cut/pinnate.JPG' }]},
              { label: 'Pinnatifid', items: [{ img: pinnatifidImg, alt: 'Pinnatifid frond', mapKey: 'Cut/pinnatifid.jpg' }]},
              { label: 'Twice (bipinnate)', items: [
                { img: bipinnateImg, alt: 'Bipinnate frond 1', mapKey: 'Cut/bipinnate.JPG' },
                { img: bipinnate2Img, alt: 'Bipinnate frond 2', mapKey: 'Cut/bipinnate2.jpg' },
                { img: bipinnate3Img, alt: 'Bipinnate frond 3', mapKey: 'Cut/bipinnate3.jpg' },
              ]},
              { label: 'Pedate', items: [{ img: pedateImg, alt: 'Pedate/fan-shaped frond', mapKey: 'Cut/pedate.jpg' }]},
            ].map(({ label, items }) => {
              const latinNames = [...new Set(items.map(({ mapKey }) => getLatinName(mapKey)).filter(Boolean))];
              return (
                <div key={label} className="flex flex-col items-center">
                  {items.length === 1 ? (
                    <ClickableImg src={items[0].img} alt={items[0].alt} className="rounded-lg max-h-48 w-full object-cover shadow-sm" />
                  ) : (
                    <div className="flex flex-col gap-2 w-full">
                      {items.map(({ img, alt }, i) => (
                        <ClickableImg key={i} src={img} alt={alt} className="rounded-lg max-h-40 w-full object-cover shadow-sm" />
                      ))}
                    </div>
                  )}
                  <span className="text-xs font-medium text-gray-600 mt-2">{label}</span>
                  {latinNames.length > 0 && (
                    <span className="text-xs italic text-gray-500 mt-0.5">{latinNames.join(', ')}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </>
    ),
  },
  {
    title: 'Frond Division (Advanced)',
    icon: Leaf,
    content: (
      <>
        <p className="text-gray-700 mb-4">
          Between the main division types are <strong>pinnatifid</strong> forms—deeply lobed but not fully divided. The lobes remain connected at the base.
        </p>
        <ul className="text-gray-700 mb-4 space-y-2">
          <li><strong>Pinnatifid</strong> — Between entire and pinnate. The blade has deep lobes that don't reach the rachis; tissue connects the lobes.</li>
          <li><strong>Pinnate pinnatifid</strong> — Between pinnate and bipinnate. Pinnae are deeply lobed but not fully cut into separate pinnules.</li>
          <li><strong>Bipinnate pinnatifid</strong> — Between bipinnate and tripinnate. Pinnules are deeply lobed but not fully divided into smaller segments.</li>
        </ul>
        <div className="bg-slate-50 rounded-xl p-4 text-slate-700 text-sm mb-6">
          <strong>Spectrum:</strong> Entire → Pinnatifid → Pinnate → Pinnate pinnatifid → Bipinnate → Bipinnate pinnatifid → Tripinnate
        </div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Illustrations:</p>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { label: 'Pinnatifid', image: pinnatifid1x1BwImg, fullSize: pinnatifidBwImg },
            { label: 'Pinnate pinnatifid' },
            { label: 'Bipinnate pinnatifid', image: bipinnatePinnatifid1x1BwImg, fullSize: bipinnatePinnatifidBwImg },
          ].map(({ label, image, fullSize }) => (
            <div key={label} className={`bg-green-50 rounded-lg p-3 flex flex-col items-center ${image ? '' : 'justify-center border-2 border-dashed border-gray-300 min-h-[4rem]'}`}>
              {image ? (
                <ClickableImg src={image} alt={label} className="w-16 h-16 object-contain" fullSizeSrc={fullSize} />
              ) : null}
              <span className="text-xs font-medium text-gray-500 text-center mt-1">{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-3">Real fern examples:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { img: pinnatifidImg, alt: 'Pinnatifid frond', label: 'Pinnatifid — blade deeply lobed but lobes connected at base', mapKey: 'Cut/pinnatifid.jpg' },
              { img: pinnatePinnatifidImg, alt: 'Pinnate pinnatifid frond', label: 'Pinnate pinnatifid — pinnae deeply lobed but not fully cut into pinnules', mapKey: 'Cut/pinnate-pinnatifid.JPG' },
            ].map(({ img, alt, label, mapKey }) => {
              const latinName = getLatinName(mapKey);
              return (
                <div key={mapKey} className="flex flex-col items-center">
                  <ClickableImg src={img} alt={alt} className="rounded-lg max-h-64 w-full object-cover shadow-sm" />
                  <span className="text-xs font-medium text-gray-600 mt-2 text-center">{label}</span>
                  {latinName && <span className="text-xs italic text-gray-500 mt-0.5">{latinName}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </>
    ),
  },
  {
    title: 'Sori: The Spore Dots',
    icon: Leaf,
    content: (
      <>
        <p className="text-gray-700 mb-4">
          Ferns reproduce by spores, not seeds. The spores are produced in structures called <strong>sporangia</strong>, which cluster together on the underside of the frond in groups called <strong>sori</strong> (singular: <em>sorus</em>).
        </p>
        <p className="text-gray-700 mb-4">
          An <strong>indusium</strong> is a protective membrane that covers some sori; others are <strong>naked</strong> (exposed). Sori shapes and arrangements are crucial for identification—often visible with a hand lens.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mb-4">
          {[
            { shape: 'Circular (globose)', illustration: circularPng, photos: [circularImg, circular2Img] },
            { shape: 'Linear (elongated)', illustration: linearPng, photos: [linearImg] },
            { shape: 'Kidney-shaped (reniform)', illustration: kidneyPng, photos: [] },
            { shape: 'J-shaped (horseshoe)', illustration: jShapedPng, photos: [] },
            { shape: 'Cup-shaped (marginal)', illustration: cupShapedPng, photos: [] },
            { shape: 'Full coverage (acrostichoid)', illustration: fullCoveragePng, photos: [fullCoverageImg] },
            { shape: 'Chain-like (catenulate)', illustration: chainLikeImg, photos: [] },
          ].map(({ shape, illustration, photos }) => (
            <div key={shape} className="bg-green-50 rounded-lg p-3 flex flex-col items-center">
              <ClickableImg src={illustration} alt={shape} className="w-32 h-32 object-contain" />
              <span className="text-xs font-medium text-gray-700 mt-2 text-center">{shape}</span>
              {photos.length > 0 && (
                <div className="mt-3 w-full flex flex-col gap-2">
                  {photos.map((photo, i) => (
                    <ClickableImg key={i} src={photo} alt={`${shape} ${i + 1}`} className="rounded-lg max-h-32 w-full object-cover shadow-sm" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    title: 'Growth Patterns',
    icon: Leaf,
    content: (
      <>
        <p className="text-gray-700 mb-4">
          Ferns exhibit distinct growth habits, primarily determined by the orientation and structure of their <strong>rhizomes</strong> (underground or surface-creeping stems). Understanding these patterns helps in both identification and determining how a plant will fill a space over time.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">1. Clump-forming (vase-shaped)</h3>
        <p className="text-gray-700 mb-3">
          Perhaps the most iconic fern silhouette. The rhizome is short, stout, and grows vertically or at a slight angle. Fronds emerge from a central growing point, radiating outward into a symmetrical, circular crown.
        </p>
        <div className="bg-green-50 rounded-xl px-6 py-4 flex flex-col items-center mb-4">
          <ClickableImg
            src={vaseShapedImg}
            alt="Ostrich fern (Matteuccia struthiopteris), vase-shaped clump-forming growth"
            className="max-w-full max-h-80 w-full object-contain rounded-lg shadow-sm"
          />
          <p className="text-sm text-gray-600 text-center mt-2 max-w-lg">
            Ostrich fern (<em>Matteuccia struthiopteris</em>)
          </p>
        </div>
        <ul className="text-gray-700 mb-4 space-y-1 list-disc list-inside">
          <li><strong>Visual cue:</strong> Often like a shuttlecock or vase.</li>
          <li><strong>Examples:</strong> Ostrich fern (<em>Matteuccia struthiopteris</em>) — very upright &quot;basket&quot; shape; male fern (<em>Dryopteris filix-mas</em>) — tidy circular clump; royal fern (<em>Osmunda regalis</em>) — large crowns.</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">2. Creeping or spreading</h3>
        <p className="text-gray-700 mb-3">
          Long, slender, horizontal rhizomes do not stay in one neat clump. The plant &quot;walks&quot; across soil or up surfaces. Fronds emerge at intervals along the rhizome rather than from a single central point.
        </p>
        <ul className="text-gray-700 mb-4 space-y-1 list-disc list-inside">
          <li><strong>Visual cue:</strong> A carpet or colony of fronds that look separate above ground but are connected below.</li>
          <li><strong>Examples:</strong> Bracken (<em>Pteridium</em>); sensitive fern (<em>Onoclea sensibilis</em>); resurrection fern (<em>Pleopeltis polypodioides</em>) creeping on branches.</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">3. Arborescent (tree-like)</h3>
        <p className="text-gray-700 mb-3">
          Common in tropical and subtropical areas (and a few temperate taxa): a thick, woody &quot;trunk&quot; built from rhizome tissue and adventitious roots, with a crown of fronds aloft—palm-like.
        </p>
        <ul className="text-gray-700 mb-4 space-y-1 list-disc list-inside">
          <li><strong>Visual cue:</strong> Single tall stem with fronds at the top.</li>
          <li><strong>Examples:</strong> Australian tree fern (<em>Cyathea cooperi</em>); Tasmanian tree fern (<em>Dicksonia antarctica</em>).</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">4. Tufted or caespitose</h3>
        <p className="text-gray-700 mb-3">
          Like clump-forming, but on a smaller, denser scale: rhizomes branch often but stay short, so many small crowns pack together.
        </p>
        <ul className="text-gray-700 mb-4 space-y-1 list-disc list-inside">
          <li><strong>Visual cue:</strong> A dense tussock or cushion.</li>
          <li><strong>Examples:</strong> Maidenhair spleenwort (<em>Asplenium trichomanes</em>) in crevices; alpine woodsia (<em>Woodsia alpina</em>).</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">5. Pendulous or scrambling</h3>
        <ul className="text-gray-700 mb-4 space-y-2 list-disc list-inside">
          <li><strong>Pendulous:</strong> Fronds hang downward—common in epiphytes such as staghorn fern (<em>Platycerium</em>).</li>
          <li><strong>Scrambling:</strong> Long, vine-like fronds that climb on other vegetation, e.g. climbing fern (<em>Lygodium</em>).</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Summary</h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-gray-800">
            <thead>
              <tr className="bg-green-50 border-b border-gray-200">
                <th className="text-left px-3 py-2 font-semibold">Pattern</th>
                <th className="text-left px-3 py-2 font-semibold">Rhizome type</th>
                <th className="text-left px-3 py-2 font-semibold">Shape</th>
                <th className="text-left px-3 py-2 font-semibold">Typical garden use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-3 py-2 font-medium">Vase / crown</td>
                <td className="px-3 py-2">Short, vertical</td>
                <td className="px-3 py-2">Symmetrical shuttlecock</td>
                <td className="px-3 py-2">Focal specimen</td>
              </tr>
              <tr className="bg-gray-50/80">
                <td className="px-3 py-2 font-medium">Creeping</td>
                <td className="px-3 py-2">Long, horizontal</td>
                <td className="px-3 py-2">Spread-out fronds</td>
                <td className="px-3 py-2">Groundcover</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Tufted</td>
                <td className="px-3 py-2">Short, much-branched</td>
                <td className="px-3 py-2">Dense cushion</td>
                <td className="px-3 py-2">Rock gardens, crevices</td>
              </tr>
              <tr className="bg-gray-50/80">
                <td className="px-3 py-2 font-medium">Arborescent</td>
                <td className="px-3 py-2">Thick trunk-like mass</td>
                <td className="px-3 py-2">Tree-like canopy</td>
                <td className="px-3 py-2">Tropical / architectural</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    title: 'Rhizome & Roots',
    icon: Leaf,
    content: (
      <>
        <p className="text-gray-700 mb-4">
          When a fern is dug up, the underground structures become visible. The <strong>rhizome</strong> extends below the ground from the stipe—it's the horizontal or vertical stem that produces fronds and roots.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Rhizome growth:</strong> Creeping (long-creeping), clump-forming (short-creeping), or erect (ascending). <strong>Surface:</strong> Scaly, hairy (pubescent), glabrous (smooth), or glaucous (waxy). <strong>Branching:</strong> Dichotomous (splits in two) or unbranched (single tip). Scales on the stipe usually match those on the rhizome.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Roots</strong> extend off the rhizome: <em>fibrous</em>, <em>fleshy/succulent</em>, or <em>stolons</em> (creeping stems that root at nodes).
        </p>
        <div className="bg-amber-50 rounded-xl p-4 text-amber-900 text-sm">
          <strong>Note:</strong> Digging up ferns can harm plants and habitats. Only examine rhizomes when ethically collecting or in cultivated settings.
        </div>
      </>
    ),
  },
  {
    title: 'Fern Reproduction (Academic)',
    icon: Leaf,
    content: (
      <>
        <p className="text-amber-800 text-sm font-medium mb-3">Optional: For academic botany classes. Not required for field identification.</p>
        <p className="text-gray-700 mb-4">
          <strong>Sporophyte (diploid):</strong> The familiar fern plant. Produces spores in <strong>sporangia</strong> clustered in sori. The <strong>annulus</strong> is a row of cells that helps eject spores; the <strong>indusium</strong> covers (or not) the sori.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Gametophyte (prothallus, haploid):</strong> A tiny, heart-shaped structure that grows from a spore. Bears <strong>antheridia</strong> (male) and <strong>archegonia</strong> (female), and <strong>rhizoids</strong> for anchorage. Fertilization produces a new sporophyte.
        </p>
        <div className="bg-green-50 rounded-xl px-6 py-4 flex justify-center mb-4">
          <ClickableImg src={gametophyteImg} alt="Gametophyte (prothallus) diagram" className="max-w-full max-h-80 object-contain" />
        </div>
        <p className="text-gray-700">
          <strong>Alternatives to spore reproduction:</strong> Vegetative reproduction via <em>bulblets</em> (gemmae), <em>proliferous buds</em> on fronds, or <em>apogamy</em> (sporophyte from gametophyte without fertilization).
        </p>
      </>
    ),
  },
  {
    title: "You're Ready!",
    icon: Leaf,
    content: (
      <>
        <p className="text-gray-700 mb-4">
          You now know the basics of fern anatomy: <strong>frond</strong> and <strong>stipe</strong>, <strong>pinnae</strong> and <strong>pinnules</strong>, division types, <strong>sori</strong>, growth patterns from the <strong>rhizome</strong>, and rhizome and root structure.
        </p>
        <p className="text-gray-700 mb-6">
          Use these terms as you work through the identification key. When in doubt, flip a frond over and check the sori—they often hold the answer.
        </p>
        <p className="text-green-700 font-semibold">Ready to identify a fern?</p>
      </>
    ),
  },
];
