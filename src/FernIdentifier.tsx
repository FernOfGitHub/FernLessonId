import React, { useState, useMemo, useEffect, createContext, useContext } from 'react';
import { ChevronLeft, ChevronRight, Leaf, MapPin, Home, Database, BookOpen, X } from 'lucide-react';

const ImageLightboxContext = createContext(null);

function ImageLightboxProvider({ children }) {
  const [lightboxImage, setLightboxImage] = useState(null);
  const value = useMemo(() => ({
    open: (src, alt) => setLightboxImage({ src, alt }),
    close: () => setLightboxImage(null),
  }), []);
  return (
    <ImageLightboxContext.Provider value={value}>
      {children}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightboxImage(null)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Escape' && setLightboxImage(null)}
          aria-label="Close image"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <img
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </ImageLightboxContext.Provider>
  );
}

function ClickableImg({ src, alt, className, fullSizeSrc }) {
  const ctx = useContext(ImageLightboxContext);
  const lightboxSrc = fullSizeSrc ?? src;
  if (!ctx) return <img src={src} alt={alt} className={className} />;
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} cursor-pointer hover:opacity-90 transition`}
      onClick={() => ctx.open(lightboxSrc, alt)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && ctx.open(lightboxSrc, alt)}
    />
  );
}

// Picture to latin name mapping (file: relative path, latin name)
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
function getLatinName(path) {
  return latinNameMap[path.toLowerCase()] || '';
}

// Real fern photos from pictures/Cut and pictures/Sori
import entireImg from '../pictures/Cut/entire.JPG';
import entire2Img from '../pictures/Cut/entire2.jpg';
import entire1x1BwImg from '../pictures/Cut/entire_1x1_bw.png';
import entireBwImg from '../pictures/Cut/entire_bw.png';
import pinnateImg from '../pictures/Cut/pinnate.JPG';
import pinnate1x1BwImg from '../pictures/Cut/pinnate_1x1_bw.png';
import pinnateBwImg from '../pictures/Cut/pinnate_bw.png';
import pinnatifidImg from '../pictures/Cut/pinnatifid.jpg';
import pinnatifid1x1BwImg from '../pictures/Cut/pinnatifid_1x1_bw.png';
import pinnatifidBwImg from '../pictures/Cut/pinnatifid_bw.png';
import bipinnateImg from '../pictures/Cut/bipinnate.JPG';
import bipinnate1x1BwImg from '../pictures/Cut/bipinnate_1x1_bw.png';
import bipinnateBwImg from '../pictures/Cut/bipinnate_bw.png';
import bipinnate2Img from '../pictures/Cut/bipinnate2.jpg';
import bipinnate3Img from '../pictures/Cut/bipinate3.JPG';
import pinnatePinnatifidImg from '../pictures/Cut/pinnate-pinnatifid.JPG';
import bipinnatePinnatifid1x1BwImg from '../pictures/Cut/bipinnate_pinnatifid_1x1_bw.png';
import bipinnatePinnatifidBwImg from '../pictures/Cut/bipinnate_pinnatifid_bw.png';
import pedateImg from '../pictures/Cut/pedate.jpg';
import circularImg from '../pictures/Sori/Circular.JPG';
import circular2Img from '../pictures/Sori/circular2.JPG';
import linearImg from '../pictures/Sori/linear.jpg';
import fullCoverageImg from '../pictures/Sori/FullCoverage.jpg';
import circularPng from '../pictures/Sori/circular.png';
import linearPng from '../pictures/Sori/linear.png';
import kidneyPng from '../pictures/Sori/kidney.png';
import jShapedPng from '../pictures/Sori/j-shaped..png';
import cupShapedPng from '../pictures/Sori/cup-shaped.png';
import fullCoveragePng from '../pictures/Sori/full-coverage.png';
import chainLikeImg from '../pictures/Sori/ChainLike.jpg';
import frondImg from '../pictures/anatomy/frond.png';
import pinnaRachisImg from '../pictures/anatomy/pinna-rachis.png';
import gametophyteImg from '../pictures/anatomy/gametophyte.png';
import polystichumAcrostichoides1Img from '../pictures/Id/Polystichum_ acrostichoides1.JPG';
import polystichumAcrostichoides2Img from '../pictures/Id/Polystichum_ acrostichoides2.JPG';
import adiantumPedatum1Img from '../pictures/Id/Adiantum_pedatum1.JPG';
import adiantumPedatum2Img from '../pictures/Id/Adiantum_pedatum2.JPG';
import osmundastrumCinnamomeum1Img from '../pictures/Id/Osmundastrum_cinnamomeum1.JPG';
import osmundastrumCinnamomeum2Img from '../pictures/Id/Osmundastrum_cinnamomeum2.JPG';
import osmundastrumCinnamomeum3Img from '../pictures/Id/Osmundastrum_cinnamomeum3.JPG';

const anatomySlides = [
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
          You now know the basics of fern anatomy: <strong>frond</strong> and <strong>stipe</strong>, <strong>pinnae</strong> and <strong>pinnules</strong>, division types, <strong>sori</strong>, and rhizome structure.
        </p>
        <p className="text-gray-700 mb-6">
          Use these terms as you work through the identification key. When in doubt, flip a frond over and check the sori—they often hold the answer.
        </p>
        <p className="text-green-700 font-semibold">Ready to identify a fern?</p>
      </>
    ),
  },
];

// Questions by section: 5 MC + 5 T/F per section; 5 shown per lesson; final quiz 25 total
type QuizQuestion = { question: string; options: { text: string; correct: boolean }[]; image?: string };
type TrueFalseQuestion = { question: string; correct: boolean };
const sectionTrueFalse: TrueFalseQuestion[][] = [
  // Section 0: Frond & Stipe
  [
    { question: 'The stipe is the stem-like part below the blade.', correct: true },
    { question: 'Ferns have true leaves like flowering plants.', correct: false },
    { question: 'The blade is the expanded leafy part above the stipe.', correct: true },
    { question: 'The stipe connects the frond to the rachis.', correct: false },
    { question: 'Botanists examine the stipe for scales and color.', correct: true },
  ],
  // Section 1: Pinnae & Pinnules
  [
    { question: 'Pinnae are the primary leaflets along the rachis.', correct: true },
    { question: 'Pinnules are smaller than pinnae.', correct: true },
    { question: 'The rachis is the central axis of the frond blade.', correct: true },
    { question: 'Pinnules are the first level of division off the rachis.', correct: false },
    { question: 'Counting frond divisions helps with identification.', correct: true },
    { question: 'The rib the pinnae are attached to is called a costa.', correct: true },
  ],
  // Section 2: Frond Division
  [
    { question: 'An entire frond has no leaflets.', correct: true },
    { question: 'Bipinnate means divided twice.', correct: true },
    { question: 'Pedate fronds have pinnae that alternate along the rachis.', correct: false },
    { question: 'Tripinnate fronds have a very lacy appearance.', correct: true },
    { question: 'Pinnate fronds have pinnae along the rachis.', correct: true },
  ],
  // Section 3: Frond Division (Advanced)
  [
    { question: 'Pinnatifid lobes remain connected at the base.', correct: true },
    { question: 'Pinnate pinnatifid is between pinnate and bipinnate.', correct: true },
    { question: 'Bipinnate pinnatifid is between pinnate and bipinnate.', correct: false },
    { question: 'Pinnatifid sits between entire and pinnate on the spectrum.', correct: true },
    { question: 'Pinnate pinnatifid has pinnae deeply lobed but not fully cut.', correct: true },
  ],
  // Section 4: Sori
  [
    { question: 'Ferns reproduce by spores, not seeds.', correct: true },
    { question: 'Sori are clusters of sporangia on the frond underside.', correct: true },
    { question: 'An indusium covers all sori.', correct: false },
    { question: 'Sori shapes are important for fern identification.', correct: true },
    { question: 'Sori are usually visible only with a microscope.', correct: false },
  ],
  // Section 5: Rhizome & Roots
  [
    { question: 'The rhizome is the underground stem.', correct: true },
    { question: 'Rhizomes can be creeping, clump-forming, or erect.', correct: true },
    { question: 'Rhizome surface cannot be glaucous.', correct: false },
    { question: 'Roots extend off the rhizome.', correct: true },
    { question: 'Stipe scales usually match rhizome scales.', correct: true },
  ],
  // Section 6: Fern Reproduction
  [
    { question: 'The sporophyte is the familiar fern plant.', correct: true },
    { question: 'The gametophyte is haploid.', correct: true },
    { question: 'The annulus helps eject spores.', correct: true },
    { question: 'Ferns reproduce only by spores.', correct: false },
    { question: 'Rhizoids anchor the gametophyte.', correct: true },
  ],
];

function toQuizQuestion(tf: TrueFalseQuestion): QuizQuestion {
  const opts = shuffle([
    { text: 'True', correct: tf.correct },
    { text: 'False', correct: !tf.correct },
  ]);
  return { question: tf.question, options: opts };
}

const sectionQuestions: QuizQuestion[][] = [
  // Section 0: Frond & Stipe
  [
    { question: 'What is the stem-like part below the blade that connects to the rhizome?', options: [{ text: 'Frond', correct: false }, { text: 'Stipe', correct: true }, { text: 'Rachis', correct: false }, { text: 'Pinna', correct: false }] },
    { question: "What is the whole 'leaf' structure of a fern called?", options: [{ text: 'Frond', correct: true }, { text: 'Stipe', correct: false }, { text: 'Pinna', correct: false }, { text: 'Sorus', correct: false }] },
    { question: 'The stipe connects the frond blade to the ___.', options: [{ text: 'Rachis', correct: false }, { text: 'Rhizome', correct: true }, { text: 'Pinna', correct: false }, { text: 'Sori', correct: false }] },
    { question: 'Botanists often examine the stipe for scales, color, or ___.', options: [{ text: 'Sori', correct: false }, { text: 'Texture', correct: true }, { text: 'Pinnules', correct: false }, { text: 'Fertility', correct: false }] },
    { question: 'The expanded leafy part of the frond above the stipe is the ___.', options: [{ text: 'Rachis', correct: false }, { text: 'Blade', correct: true }, { text: 'Rhizome', correct: false }, { text: 'Pinna', correct: false }] },
  ],
  // Section 1: Pinnae & Pinnules
  [
    { question: 'What are the primary leaflets along the central axis (rachis) called?', options: [{ text: 'Pinnules', correct: false }, { text: 'Pinnae', correct: true }, { text: 'Sori', correct: false }, { text: 'Blade', correct: false }] },
    { question: 'When pinnae are themselves divided, the smaller pieces are called ___.', options: [{ text: 'Pinnae', correct: false }, { text: 'Pinnules', correct: true }, { text: 'Rachis', correct: false }, { text: 'Sori', correct: false }] },
    { question: 'The central axis of the frond blade is the ___.', options: [{ text: 'Stipe', correct: false }, { text: 'Rachis', correct: true }, { text: 'Pinna', correct: false }, { text: 'Rhizome', correct: false }] },
    { question: 'Counting how many times the frond is divided helps ___ identification.', options: [{ text: 'Narrow down', correct: true }, { text: 'Avoid', correct: false }, { text: 'Complicate', correct: false }, { text: 'Ignore', correct: false }] },
    { question: 'A pinna is one level of division off the ___.', options: [{ text: 'Stipe', correct: false }, { text: 'Rachis', correct: true }, { text: 'Rhizome', correct: false }, { text: 'Sori', correct: false }] },
    { question: 'The rib the pinnae are attached to is called the ___.', options: [{ text: 'Rachis', correct: false }, { text: 'Costa', correct: true }, { text: 'Stipe', correct: false }, { text: 'Pinnule', correct: false }] },
  ],
  // Section 2: Frond Division
  [
    { question: 'What type of frond division is shown in this photo?', image: pinnateImg, options: [{ text: 'Once divided (pinnate)', correct: true }, { text: 'Entire (undivided)', correct: false }, { text: 'Twice divided (bipinnate)', correct: false }, { text: 'Pinnatifid', correct: false }] },
    { question: 'A frond that is divided into pinnae, and each pinna is divided again, is called ___?', options: [{ text: 'Pinnate', correct: false }, { text: 'Bipinnate', correct: true }, { text: 'Entire', correct: false }, { text: 'Pinnatifid', correct: false }] },
    { question: 'An undivided fern blade with no leaflets is called ___.', options: [{ text: 'Pinnate', correct: false }, { text: 'Entire', correct: true }, { text: 'Bipinnate', correct: false }, { text: 'Tripinnate', correct: false }] },
    { question: 'Once-divided fronds with pinnae along the rachis are ___.', options: [{ text: 'Pinnate', correct: true }, { text: 'Bipinnate', correct: false }, { text: 'Entire', correct: false }, { text: 'Tripinnate', correct: false }] },
    { question: 'A very lacy, feathery frond is likely ___.', options: [{ text: 'Entire', correct: false }, { text: 'Pinnate', correct: false }, { text: 'Tripinnate (or more)', correct: true }, { text: 'Pinnatifid', correct: false }] },
    { question: 'Pedate or fan-shaped fronds have pinnae that ___.', options: [{ text: 'Alternate along the rachis', correct: false }, { text: 'Radiate from a central point', correct: true }, { text: 'Overlap each other', correct: false }, { text: 'Form a spiral', correct: false }] },
  ],
  // Section 3: Frond Division (Advanced)
  [
    { question: 'Pinnatifid fronds have deep lobes that ___.', options: [{ text: 'Are fully separate', correct: false }, { text: "Don't reach the rachis; tissue connects them", correct: true }, { text: 'Form pinnules', correct: false }, { text: 'Are kidney-shaped', correct: false }] },
    { question: 'Between entire and pinnate on the division spectrum is ___.', options: [{ text: 'Bipinnate', correct: false }, { text: 'Pinnatifid', correct: true }, { text: 'Tripinnate', correct: false }, { text: 'Pedate', correct: false }] },
    { question: 'Pinnate pinnatifid is between pinnate and ___.', options: [{ text: 'Entire', correct: false }, { text: 'Bipinnate', correct: true }, { text: 'Tripinnate', correct: false }, { text: 'Pinnatifid', correct: false }] },
    { question: 'The division spectrum goes: Entire → Pinnatifid → ___ → Bipinnate...', options: [{ text: 'Tripinnate', correct: false }, { text: 'Pinnate', correct: true }, { text: 'Pedate', correct: false }, { text: 'Pinnate pinnatifid', correct: false }] },
    { question: 'Bipinnate pinnatifid sits between bipinnate and ___.', options: [{ text: 'Pinnate', correct: false }, { text: 'Tripinnate', correct: true }, { text: 'Entire', correct: false }, { text: 'Pinnatifid', correct: false }] },
  ],
  // Section 4: Sori
  [
    { question: 'What sori shape is shown in this photo?', image: circularImg, options: [{ text: 'Circular (globose)', correct: true }, { text: 'Linear (elongated)', correct: false }, { text: 'Kidney-shaped (reniform)', correct: false }, { text: 'Full coverage (acrostichoid)', correct: false }] },
    { question: 'Where are fern spores produced?', options: [{ text: 'In seeds', correct: false }, { text: 'In sporangia clustered in sori', correct: true }, { text: 'On the rhizome', correct: false }, { text: 'On the rachis', correct: false }] },
    { question: 'Sori are clusters of ___ on the underside of the frond.', options: [{ text: 'Pinnae', correct: false }, { text: 'Sporangia', correct: true }, { text: 'Pinnules', correct: false }, { text: 'Rhizomes', correct: false }] },
    { question: 'A protective membrane covering some sori is the ___.', options: [{ text: 'Rachis', correct: false }, { text: 'Indusium', correct: true }, { text: 'Stipe', correct: false }, { text: 'Blade', correct: false }] },
    { question: 'Sori shapes (circular, linear, kidney-shaped) are crucial for ___.', options: [{ text: 'Growth rate', correct: false }, { text: 'Identification', correct: true }, { text: 'Water retention', correct: false }, { text: 'Height', correct: false }] },
    { question: 'Sori are often visible with a ___.', options: [{ text: 'Microscope only', correct: false }, { text: 'Hand lens', correct: true }, { text: 'Naked eye at 10 ft', correct: false }, { text: 'Telescope', correct: false }] },
  ],
  // Section 5: Rhizome & Roots
  [
    { question: 'The underground stem that produces fronds and roots is the ___?', options: [{ text: 'Stipe', correct: false }, { text: 'Rhizome', correct: true }, { text: 'Rachis', correct: false }, { text: 'Blade', correct: false }] },
    { question: 'Rhizome growth types include creeping, clump-forming, and ___.', options: [{ text: 'Erect (ascending)', correct: true }, { text: 'Floating', correct: false }, { text: 'Annual', correct: false }, { text: 'Deciduous', correct: false }] },
    { question: 'Rhizome surface can be scaly, hairy, glabrous, or ___.', options: [{ text: 'Glaucous (waxy)', correct: true }, { text: 'Smooth only', correct: false }, { text: 'Spiny', correct: false }, { text: 'Sticky', correct: false }] },
    { question: 'Roots extend off the rhizome and can be fibrous, fleshy, or ___.', options: [{ text: 'Stolons (creeping stems)', correct: true }, { text: 'Sori', correct: false }, { text: 'Pinnae', correct: false }, { text: 'Sporangia', correct: false }] },
    { question: 'Scales on the stipe usually match those on the ___.', options: [{ text: 'Blade', correct: false }, { text: 'Rhizome', correct: true }, { text: 'Sori', correct: false }, { text: 'Pinnae', correct: false }] },
  ],
  // Section 6: Fern Reproduction
  [
    { question: 'The familiar fern plant (diploid) is the ___.', options: [{ text: 'Gametophyte', correct: false }, { text: 'Sporophyte', correct: true }, { text: 'Prothallus', correct: false }, { text: 'Rhizoid', correct: false }] },
    { question: 'The gametophyte (prothallus) is ___ and bears antheridia and archegonia.', options: [{ text: 'Diploid', correct: false }, { text: 'Haploid', correct: true }, { text: 'Triploid', correct: false }, { text: 'Tetraploid', correct: false }] },
    { question: 'The annulus helps ___ spores from sporangia.', options: [{ text: 'Store', correct: false }, { text: 'Eject', correct: true }, { text: 'Fertilize', correct: false }, { text: 'Cover', correct: false }] },
    { question: 'Vegetative reproduction can occur via bulblets or ___.', options: [{ text: 'Seeds', correct: false }, { text: 'Proliferous buds on fronds', correct: true }, { text: 'Sori', correct: false }, { text: 'Pinnae', correct: false }] },
    { question: 'Rhizoids on the gametophyte provide ___.', options: [{ text: 'Spore production', correct: false }, { text: 'Anchorage', correct: true }, { text: 'Fertilization', correct: false }, { text: 'Pinna formation', correct: false }] },
  ],
];

function getSectionPool(sectionIndex: number): QuizQuestion[] {
  const mc = sectionQuestions[sectionIndex].map((q) => ({ ...q, options: shuffle([...q.options]) }));
  const tf = sectionTrueFalse[sectionIndex].map(toQuizQuestion);
  return shuffle([...mc, ...tf]);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

type LessonStep = { type: 'content'; slideIndex: number } | { type: 'practice'; sectionIndex: number } | { type: 'finalQuizIntro' } | { type: 'finalQuiz' } | { type: 'finalQuizResults' };

function buildLessonSteps(): LessonStep[] {
  const steps: LessonStep[] = [];
  for (let i = 0; i < anatomySlides.length; i++) {
    steps.push({ type: 'content', slideIndex: i });
    if (i < 7) steps.push({ type: 'practice', sectionIndex: i }); // Practice after each content slide except "You're Ready"
    if (i === 6) {
      steps.push({ type: 'finalQuizIntro' }); // Title page announcing the final quiz
      steps.push({ type: 'finalQuiz' }); // Final quiz
      steps.push({ type: 'finalQuizResults' }); // Score summary after final quiz
    }
  }
  return steps;
}
const LESSON_STEPS = buildLessonSteps();

const FernIdentifier = () => {
  const [showLesson, setShowLesson] = useState(true);
  const [lessonStepIndex, setLessonStepIndex] = useState(0);
  const [practiceSelected, setPracticeSelected] = useState<number | null>(null);
  const [practiceChecked, setPracticeChecked] = useState(false);
  const [practiceQuestionIndex, setPracticeQuestionIndex] = useState(0);
  const [finalQuizScore, setFinalQuizScore] = useState(0);
  const [step, setStep] = useState(0);
  const [showDatabase, setShowDatabase] = useState(false);
  const [sortBy, setSortBy] = useState('common');
  const [selections, setSelections] = useState({
    region: null,
    frondType: null,
    size: null,
    texture: null
  });

  const regions = [
    { id: 'northeast', name: 'Northeast US', description: 'ME, NH, VT, MA, RI, CT, NY, NJ, PA' },
    { id: 'atlantic', name: 'Atlantic US', description: 'MD, VA, WV, NC, SC, GA, FL, AL, MS, LA, AR, TN, KY, OH, IN, IL, MI, WI, MN, IA, MO, TX' },
    { id: 'pacific-northwest', name: 'Pacific Northwest US', description: 'WA, OR, northern CA, BC' },
    { id: 'uk', name: 'UK', description: 'England, Scotland, Wales, Northern Ireland' },
    { id: 'europe', name: 'Western and Central Europe', description: 'France, Germany, Austria, Switzerland, Netherlands, Belgium, Spain, Portugal, Italy' },
    { id: 'hawaii', name: 'Hawaii', description: 'Hawaiian Islands' },
    { id: 'australia', name: 'Australia', description: 'Mainland Australia' },
    { id: 'new-zealand', name: 'New Zealand', description: 'North and South Islands' }
  ];

  const habitats = [
    { id: 'forest', name: 'Forest Floor', description: 'Shaded woodland areas' },
    { id: 'wetland', name: 'Wetland/Swamp', description: 'Consistently wet areas, marshes' },
    { id: 'rock', name: 'Rocky Outcrops', description: 'Cliffs, rock crevices, ledges' },
    { id: 'stream', name: 'Stream Banks', description: 'Along water edges' },
    { id: 'open', name: 'Open Fields', description: 'Meadows, clearings, full sun' }
  ];

  const frondTypes = [
    { 
      id: 'once', 
      name: 'Once Divided', 
      description: 'Simple pinnate - pinnae along rachis',
      image: pinnate1x1BwImg,
      fullSize: pinnateBwImg,
      svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="10" x2="50" y2="110" stroke="#2d5016" stroke-width="3"/>
        <ellipse cx="30" cy="25" rx="18" ry="8" fill="#4a7c59"/>
        <ellipse cx="70" cy="25" rx="18" ry="8" fill="#4a7c59"/>
        <ellipse cx="25" cy="40" rx="20" ry="9" fill="#4a7c59"/>
        <ellipse cx="75" cy="40" rx="20" ry="9" fill="#4a7c59"/>
        <ellipse cx="22" cy="57" rx="21" ry="10" fill="#4a7c59"/>
        <ellipse cx="78" cy="57" rx="21" ry="10" fill="#4a7c59"/>
        <ellipse cx="25" cy="75" rx="20" ry="9" fill="#4a7c59"/>
        <ellipse cx="75" cy="75" rx="20" ry="9" fill="#4a7c59"/>
        <ellipse cx="30" cy="90" rx="18" ry="8" fill="#4a7c59"/>
        <ellipse cx="70" cy="90" rx="18" ry="8" fill="#4a7c59"/>
      </svg>`
    },
    { 
      id: 'twice', 
      name: 'Twice Divided', 
      description: 'Bipinnate - pinnae have pinnules',
      image: bipinnate1x1BwImg,
      fullSize: bipinnateBwImg,
      svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="10" x2="50" y2="110" stroke="#2d5016" stroke-width="3"/>
        <line x1="35" y1="30" x2="50" y2="30" stroke="#2d5016" stroke-width="2"/>
        <line x1="50" y1="30" x2="65" y2="30" stroke="#2d5016" stroke-width="2"/>
        <ellipse cx="28" cy="25" rx="7" ry="5" fill="#4a7c59"/>
        <ellipse cx="35" cy="35" rx="7" ry="5" fill="#4a7c59"/>
        <ellipse cx="58" cy="25" rx="7" ry="5" fill="#4a7c59"/>
        <ellipse cx="65" cy="35" rx="7" ry="5" fill="#4a7c59"/>
        <line x1="30" y1="50" x2="50" y2="50" stroke="#2d5016" stroke-width="2"/>
        <line x1="50" y1="50" x2="70" y2="50" stroke="#2d5016" stroke-width="2"/>
        <ellipse cx="23" cy="45" rx="8" ry="5" fill="#4a7c59"/>
        <ellipse cx="30" cy="55" rx="8" ry="5" fill="#4a7c59"/>
        <ellipse cx="60" cy="45" rx="8" ry="5" fill="#4a7c59"/>
        <ellipse cx="70" cy="55" rx="8" ry="5" fill="#4a7c59"/>
        <line x1="30" y1="70" x2="50" y2="70" stroke="#2d5016" stroke-width="2"/>
        <line x1="50" y1="70" x2="70" y2="70" stroke="#2d5016" stroke-width="2"/>
        <ellipse cx="23" cy="65" rx="8" ry="5" fill="#4a7c59"/>
        <ellipse cx="30" cy="75" rx="8" ry="5" fill="#4a7c59"/>
        <ellipse cx="60" cy="65" rx="8" ry="5" fill="#4a7c59"/>
        <ellipse cx="70" cy="75" rx="8" ry="5" fill="#4a7c59"/>
        <line x1="35" y1="90" x2="50" y2="90" stroke="#2d5016" stroke-width="2"/>
        <line x1="50" y1="90" x2="65" y2="90" stroke="#2d5016" stroke-width="2"/>
        <ellipse cx="28" cy="85" rx="7" ry="5" fill="#4a7c59"/>
        <ellipse cx="35" cy="95" rx="7" ry="5" fill="#4a7c59"/>
        <ellipse cx="58" cy="85" rx="7" ry="5" fill="#4a7c59"/>
        <ellipse cx="65" cy="95" rx="7" ry="5" fill="#4a7c59"/>
      </svg>`
    },
    { 
      id: 'thrice', 
      name: 'Thrice+ Divided', 
      description: 'Tripinnate or more - very lacy/feathery',
      svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="10" x2="50" y2="110" stroke="#2d5016" stroke-width="3"/>
        <line x1="35" y1="30" x2="50" y2="30" stroke="#2d5016" stroke-width="1.5"/>
        <line x1="50" y1="30" x2="65" y2="30" stroke="#2d5016" stroke-width="1.5"/>
        <ellipse cx="28" cy="26" rx="4" ry="3" fill="#4a7c59"/>
        <ellipse cx="32" cy="30" rx="4" ry="3" fill="#4a7c59"/>
        <ellipse cx="36" cy="34" rx="4" ry="3" fill="#4a7c59"/>
        <ellipse cx="58" cy="26" rx="4" ry="3" fill="#4a7c59"/>
        <ellipse cx="62" cy="30" rx="4" ry="3" fill="#4a7c59"/>
        <ellipse cx="66" cy="34" rx="4" ry="3" fill="#4a7c59"/>
        <line x1="30" y1="50" x2="50" y2="50" stroke="#2d5016" stroke-width="1.5"/>
        <line x1="50" y1="50" x2="70" y2="50" stroke="#2d5016" stroke-width="1.5"/>
        <ellipse cx="23" cy="46" rx="4" ry="3" fill="#4a7c59"/>
        <ellipse cx="27" cy="50" rx="4" ry="3" fill="#4a7c59"/>
        <ellipse cx="31" cy="54" rx="4" ry="3" fill="#4a7c59"/>
        <ellipse cx="60" cy="46" rx="4" ry="3" fill="#4a7c59"/>
        <ellipse cx="66" cy="50" rx="4" ry="3" fill="#4a7c59"/>
        <ellipse cx="72" cy="54" rx="4" ry="3" fill="#4a7c59"/>
        <line x1="30" y1="70" x2="50" y2="70" stroke="#2d5016" stroke-width="1.5"/>
        <line x1="50" y1="70" x2="70" y2="70" stroke="#2d5016" stroke-width="1.5"/>
        <ellipse cx="23" cy="66" rx="4" ry="3" fill="#4a7c59"/>
        <ellipse cx="27" cy="70" rx="4" ry="3" fill="#4a7c59"/>
        <ellipse cx="31" cy="74" rx="4" ry="3" fill="#4a7c59"/>
        <ellipse cx="60" cy="66" rx="4" ry="3" fill="#4a7c59"/>
        <ellipse cx="66" cy="70" rx="4" ry="3" fill="#4a7c59"/>
        <ellipse cx="72" cy="74" rx="4" ry="3" fill="#4a7c59"/>
        <line x1="35" y1="90" x2="50" y2="90" stroke="#2d5016" stroke-width="1.5"/>
        <line x1="50" y1="90" x2="65" y2="90" stroke="#2d5016" stroke-width="1.5"/>
        <ellipse cx="28" cy="86" rx="4" ry="3" fill="#4a7c59"/>
        <ellipse cx="32" cy="90" rx="4" ry="3" fill="#4a7c59"/>
        <ellipse cx="36" cy="94" rx="4" ry="3" fill="#4a7c59"/>
        <ellipse cx="58" cy="86" rx="4" ry="3" fill="#4a7c59"/>
        <ellipse cx="62" cy="90" rx="4" ry="3" fill="#4a7c59"/>
        <ellipse cx="66" cy="94" rx="4" ry="3" fill="#4a7c59"/>
      </svg>`
    },
    { 
      id: 'pedate', 
      name: 'Pedate', 
      description: 'Fan-shaped - pinnae radiate from central point',
      image: pedateImg,
      svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M 50 110 L 50 50" stroke="#2d5016" stroke-width="3"/>
        <path d="M 50 50 L 20 30" stroke="#2d5016" stroke-width="2"/>
        <path d="M 50 50 L 80 30" stroke="#2d5016" stroke-width="2"/>
        <path d="M 50 50 L 15 55" stroke="#2d5016" stroke-width="2"/>
        <path d="M 50 50 L 85 55" stroke="#2d5016" stroke-width="2"/>
        <ellipse cx="20" cy="28" rx="12" ry="6" fill="#4a7c59"/>
        <ellipse cx="80" cy="28" rx="12" ry="6" fill="#4a7c59"/>
        <ellipse cx="15" cy="53" rx="12" ry="6" fill="#4a7c59"/>
        <ellipse cx="85" cy="53" rx="12" ry="6" fill="#4a7c59"/>
      </svg>`
    },
    { 
      id: 'simple', 
      name: 'Undivided', 
      description: 'Simple blade, not divided into leaflets',
      image: entire1x1BwImg,
      fullSize: entireBwImg,
      svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="90" x2="50" y2="110" stroke="#2d5016" stroke-width="3"/>
        <ellipse cx="50" cy="50" rx="35" ry="42" fill="#4a7c59"/>
        <path d="M 50 8 Q 50 30, 50 50" stroke="#3d6847" stroke-width="2" fill="none"/>
      </svg>`
    }
  ];

  const sizes = [
    { id: 'small', name: 'Small (< 12")', description: 'Less than 1 foot tall' },
    { id: 'medium', name: 'Medium (12-36")', description: '1-3 feet tall' },
    { id: 'large', name: 'Large (> 36")', description: 'More than 3 feet tall' }
  ];

  const textures = [
    { id: 'delicate', name: 'Delicate/Thin', description: 'Papery, translucent texture' },
    { id: 'leathery', name: 'Leathery/Thick', description: 'Tough, evergreen texture' },
    { id: 'hairy', name: 'Fuzzy/Hairy', description: 'Visible hairs on fronds or stems' }
  ];

  const fernDatabase = [
    {
      name: 'Christmas Fern',
      scientific: 'Polystichum acrostichoides',
      regions: ['northeast', 'atlantic'],
      habitat: ['forest', 'rock'],
      frondType: 'once',
      size: 'medium',
      texture: 'leathery',
      features: 'Evergreen, dark green fronds with boot-shaped pinnae. Fronds stay green through winter.'
    },
    {
      name: 'Lady Fern',
      scientific: 'Athyrium filix-femina',
      regions: ['northeast', 'atlantic', 'pacific-northwest', 'uk', 'europe'],
      habitat: ['forest', 'stream'],
      frondType: 'twice',
      size: 'medium',
      texture: 'delicate',
      features: 'Light green, delicate fronds in vase-like clusters. Very variable species with curved sori.'
    },
    {
      name: 'Cinnamon Fern',
      scientific: 'Osmundastrum cinnamomeum',
      regions: ['northeast', 'atlantic'],
      habitat: ['wetland', 'stream'],
      frondType: 'twice',
      size: 'large',
      texture: 'delicate',
      features: 'Separate fertile fronds turn cinnamon brown in spring. Woolly cinnamon-colored fiddleheads. A unique character is the white fuzzy dot at the intersection of the rachis and pinna.'
    },
    {
      name: 'Maidenhair Fern',
      scientific: 'Adiantum pedatum',
      regions: ['northeast', 'atlantic', 'pacific-northwest'],
      habitat: ['forest'],
      frondType: 'pedate',
      size: 'small',
      texture: 'delicate',
      features: 'Distinctive horseshoe-shaped frond with black wiry stems. Very delicate appearance.'
    },
    {
      name: 'Bracken Fern',
      scientific: 'Pteridium aquilinum',
      regions: ['northeast', 'atlantic', 'pacific-northwest', 'uk', 'europe'],
      habitat: ['open', 'forest'],
      frondType: 'thrice',
      size: 'large',
      texture: 'leathery',
      features: 'Aggressive spreader, triangular fronds held horizontally. Forms extensive colonies.'
    },
    {
      name: 'Hay-scented Fern',
      scientific: 'Dennstaedtia punctilobula',
      regions: ['northeast', 'atlantic'],
      habitat: ['forest', 'open'],
      frondType: 'twice',
      size: 'medium',
      texture: 'hairy',
      features: 'Forms dense colonies, smells like hay when crushed. Yellow-green color, fine hairs.'
    },
    {
      name: 'Ostrich Fern',
      scientific: 'Matteuccia struthiopteris',
      regions: ['northeast', 'atlantic', 'pacific-northwest'],
      habitat: ['stream', 'wetland'],
      frondType: 'twice',
      size: 'large',
      texture: 'delicate',
      features: 'Tall vase-like clusters up to 6 feet. Separate brown fertile fronds in center persist through winter.'
    },
    {
      name: 'Walking Fern',
      scientific: 'Asplenium rhizophyllum',
      regions: ['northeast', 'atlantic'],
      habitat: ['rock'],
      frondType: 'simple',
      size: 'small',
      texture: 'leathery',
      features: 'Long tapering fronds that root at tips forming new plants. Grows on limestone rocks.'
    },
    {
      name: 'Sword Fern',
      scientific: 'Polystichum munitum',
      regions: ['pacific-northwest'],
      habitat: ['forest'],
      frondType: 'once',
      size: 'large',
      texture: 'leathery',
      features: 'Evergreen, stiff upright fronds. Pinnae have pointed tips with small tooth. Most common fern in PNW forests.'
    },
    {
      name: 'Braun\'s Holly Fern',
      scientific: 'Polystichum braunii',
      regions: ['northeast', 'atlantic', 'pacific-northwest'],
      habitat: ['forest', 'rock'],
      frondType: 'twice',
      size: 'medium',
      texture: 'leathery',
      features: 'Evergreen with glossy fronds covered in golden-brown scales. Pinnules have bristle-tipped teeth.'
    },
    {
      name: 'Anderson\'s Sword Fern',
      scientific: 'Polystichum andersonii',
      regions: ['pacific-northwest'],
      habitat: ['forest'],
      frondType: 'twice',
      size: 'large',
      texture: 'leathery',
      features: 'Similar to Western Sword Fern but bipinnate. Produces bulblets on fronds. Found in moist forests.'
    },
    {
      name: 'Kruckeberg\'s Sword Fern',
      scientific: 'Polystichum kruckebergii',
      regions: ['pacific-northwest'],
      habitat: ['rock'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      features: 'Small evergreen fern of rocky habitats. Narrow fronds with spiny-toothed pinnae. Endemic to PNW.'
    },
    {
      name: 'Imbricate Sword Fern',
      scientific: 'Polystichum imbricans',
      regions: ['pacific-northwest'],
      habitat: ['rock', 'forest'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      features: 'Compact evergreen fern with overlapping pinnae. Drought tolerant, often on rocky slopes.'
    },
    {
      name: 'Sensitive Fern',
      scientific: 'Onoclea sensibilis',
      regions: ['northeast', 'atlantic'],
      habitat: ['wetland', 'stream', 'forest'],
      frondType: 'once',
      size: 'medium',
      texture: 'delicate',
      features: 'Broad triangular fronds, dies at first frost. Separate bead-like fertile fronds persist through winter.'
    },
    {
      name: 'Royal Fern',
      scientific: 'Osmunda regalis',
      regions: ['northeast', 'atlantic', 'uk'],
      habitat: ['wetland', 'stream'],
      frondType: 'twice',
      size: 'large',
      texture: 'delicate',
      features: 'Tall stately fern with distinctive tassel-like fertile pinnae at frond tips. Tolerates sun.'
    },
    {
      name: 'Interrupted Fern',
      scientific: 'Osmunda claytoniana',
      regions: ['northeast', 'atlantic'],
      habitat: ['forest', 'wetland'],
      frondType: 'twice',
      size: 'large',
      texture: 'delicate',
      features: 'Fertile pinnae interrupt middle of frond, wither and fall off. Forms large circular clumps.'
    },
    {
      name: 'New York Fern',
      scientific: 'Thelypteris noveboracensis',
      regions: ['northeast', 'atlantic'],
      habitat: ['forest', 'wetland'],
      frondType: 'once',
      size: 'medium',
      texture: 'delicate',
      features: 'Distinctive tapering at both top and bottom of frond. Forms colonies, yellow-green color.'
    },
    {
      name: 'Marginal Wood Fern',
      scientific: 'Dryopteris marginalis',
      regions: ['northeast', 'atlantic'],
      habitat: ['forest', 'rock'],
      frondType: 'twice',
      size: 'medium',
      texture: 'leathery',
      features: 'Semi-evergreen with blue-green fronds. Sori at margins of pinnules. Common in rocky woods.'
    },
    {
      name: 'Marsh Fern',
      scientific: 'Thelypteris palustris',
      regions: ['northeast', 'atlantic', 'pacific-northwest'],
      habitat: ['wetland', 'stream'],
      frondType: 'once',
      size: 'medium',
      texture: 'delicate',
      features: 'Narrow fronds with pinnae nearly perpendicular to rachis. Grows in very wet areas.'
    },
    {
      name: 'Ebony Spleenwort',
      scientific: 'Asplenium platyneuron',
      regions: ['northeast', 'atlantic'],
      habitat: ['rock', 'forest'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      features: 'Small evergreen fern with dark brown to black stems. Pinnae alternate along stem.'
    },
    {
      name: 'Maidenhair Spleenwort',
      scientific: 'Asplenium trichomanes',
      regions: ['northeast', 'atlantic', 'pacific-northwest', 'uk', 'europe'],
      habitat: ['rock'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      features: 'Delicate evergreen with shiny black stems. Tiny round pinnae. Grows in rock crevices.'
    },
    {
      name: 'Common Polypody',
      scientific: 'Polypodium virginianum',
      regions: ['northeast', 'atlantic', 'uk'],
      habitat: ['rock', 'forest'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      features: 'Evergreen, grows on rocks and stumps. Deeply lobed pinnae, leathery texture. Drought tolerant.'
    },
    {
      name: 'Spinulose Wood Fern',
      scientific: 'Dryopteris carthusiana',
      regions: ['northeast', 'atlantic', 'pacific-northwest'],
      habitat: ['forest', 'wetland'],
      frondType: 'thrice',
      size: 'medium',
      texture: 'delicate',
      features: 'Lacy appearance with finely divided fronds. Semi-evergreen. Very common in moist woods.'
    },
    {
      name: 'Intermediate Wood Fern',
      scientific: 'Dryopteris intermedia',
      regions: ['northeast', 'atlantic'],
      habitat: ['forest', 'rock'],
      frondType: 'thrice',
      size: 'medium',
      texture: 'delicate',
      features: 'Similar to Spinulose but more evergreen. Lowest pinnule on bottom pinnae longest.'
    },
    {
      name: 'Long Beech Fern',
      scientific: 'Phegopteris connectilis',
      regions: ['northeast', 'atlantic', 'pacific-northwest'],
      habitat: ['forest', 'rock'],
      frondType: 'once',
      size: 'small',
      texture: 'delicate',
      features: 'Triangular fronds with bottom pinnae pointing downward. Grows in cool, moist woods.'
    },
    {
      name: 'Broad Beech Fern',
      scientific: 'Phegopteris hexagonoptera',
      regions: ['northeast', 'atlantic'],
      habitat: ['forest'],
      frondType: 'once',
      size: 'medium',
      texture: 'delicate',
      features: 'Broadly triangular fronds held horizontally. Bottom pinnae very large. Forms colonies.'
    },
    {
      name: 'Oak Fern',
      scientific: 'Gymnocarpium dryopteris',
      regions: ['northeast', 'atlantic', 'pacific-northwest', 'uk', 'europe'],
      habitat: ['forest', 'rock'],
      frondType: 'twice',
      size: 'small',
      texture: 'delicate',
      features: 'Delicate triangular fronds in three sections. Forms extensive colonies in cool woods.'
    },
    {
      name: 'Bulblet Fern',
      scientific: 'Cystopteris bulbifera',
      regions: ['northeast', 'atlantic'],
      habitat: ['rock', 'stream'],
      frondType: 'twice',
      size: 'medium',
      texture: 'delicate',
      features: 'Long narrow fronds with tiny bulblets underneath. Grows on moist limestone cliffs.'
    },
    {
      name: 'Fragile Fern',
      scientific: 'Cystopteris fragilis',
      regions: ['northeast', 'atlantic', 'pacific-northwest'],
      habitat: ['rock'],
      frondType: 'twice',
      size: 'small',
      texture: 'delicate',
      features: 'Very delicate, brittle fronds. Grows in rock crevices, especially limestone.'
    },
    {
      name: 'Silvery Glade Fern',
      scientific: 'Deparia acrostichoides',
      regions: ['northeast', 'atlantic'],
      habitat: ['forest', 'stream'],
      frondType: 'once',
      size: 'medium',
      texture: 'delicate',
      features: 'Silvery appearance from indusial covering on sori. Prefers rich, moist soil.'
    },
    {
      name: 'Goldie\'s Fern',
      scientific: 'Dryopteris goldiana',
      regions: ['northeast', 'atlantic'],
      habitat: ['forest'],
      frondType: 'twice',
      size: 'large',
      texture: 'leathery',
      features: 'Large impressive fern up to 4 feet. Broadest near middle. Rich moist woods.'
    },
    {
      name: 'Crested Wood Fern',
      scientific: 'Dryopteris cristata',
      regions: ['northeast', 'atlantic'],
      habitat: ['wetland', 'forest'],
      frondType: 'twice',
      size: 'medium',
      texture: 'leathery',
      features: 'Fertile fronds narrow and upright, sterile fronds shorter and spreading. Wet woods and swamps.'
    },
    {
      name: 'Clinton\'s Wood Fern',
      scientific: 'Dryopteris clintoniana',
      regions: ['northeast', 'atlantic'],
      habitat: ['wetland', 'forest'],
      frondType: 'twice',
      size: 'large',
      texture: 'leathery',
      features: 'Hybrid between Crested and Goldie\'s fern. Larger than Crested, grows in wet areas.'
    },
    {
      name: 'Purple-stemmed Cliff Brake',
      scientific: 'Pellaea atropurpurea',
      regions: ['northeast', 'atlantic'],
      habitat: ['rock'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      features: 'Blue-green fronds with dark purple stems. Grows on dry limestone cliffs and rocks.'
    },
    {
      name: 'Rock Cap Fern',
      scientific: 'Polypodium appalachianum',
      regions: ['northeast', 'atlantic'],
      habitat: ['rock'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      features: 'Evergreen, grows on acidic rocks. Similar to Common Polypody but prefers acidic substrates.'
    },
    {
      name: 'Rattlesnake Fern',
      scientific: 'Botrypus virginianus',
      regions: ['northeast', 'atlantic', 'pacific-northwest'],
      habitat: ['forest', 'open'],
      frondType: 'thrice',
      size: 'small',
      texture: 'delicate',
      features: 'Single broadly triangular sterile frond with separate fertile spike. Related to grape ferns.'
    },
    {
      name: 'Cut-leaved Grape Fern',
      scientific: 'Sceptridium dissectum',
      regions: ['northeast', 'atlantic'],
      habitat: ['forest', 'open'],
      frondType: 'thrice',
      size: 'small',
      texture: 'leathery',
      features: 'Bronze-green fronds appear in autumn, persist through winter. Separate fertile spike.'
    },
    {
      name: 'Northern Lady Fern',
      scientific: 'Athyrium angustum',
      regions: ['northeast', 'atlantic', 'pacific-northwest'],
      habitat: ['forest', 'wetland'],
      frondType: 'twice',
      size: 'medium',
      texture: 'delicate',
      features: 'Similar to Lady Fern but more northern. Lighter green, more upright growth.'
    },
    {
      name: 'Hart\'s-tongue Fern',
      scientific: 'Asplenium scolopendrium',
      regions: ['uk'],
      habitat: ['rock', 'forest'],
      frondType: 'simple',
      size: 'medium',
      texture: 'leathery',
      features: 'Distinctive undivided strap-like fronds with wavy edges. Evergreen, glossy bright green. Prefers limestone.'
    },
    {
      name: 'Male Fern',
      scientific: 'Dryopteris filix-mas',
      regions: ['northeast', 'pacific-northwest', 'uk', 'europe'],
      habitat: ['forest', 'rock'],
      frondType: 'twice',
      size: 'large',
      texture: 'leathery',
      features: 'Robust semi-evergreen fern with golden-brown scales on stems. Very common in woodlands. Fronds arch gracefully.'
    }
  ];

  const getMatches = () => {
    return fernDatabase.filter(fern => {
      if (selections.region && !fern.regions.includes(selections.region)) return false;
      if (selections.frondType && fern.frondType !== selections.frondType) return false;
      if (selections.size && fern.size !== selections.size) return false;
      if (selections.texture && fern.texture !== selections.texture) return false;
      return true;
    });
  };

  const formatHabitat = (fern) =>
    fern.habitat?.map(id => habitats.find(h => h.id === id)?.name).filter(Boolean).join(', ') || '—';

  const handleSelect = (category, value) => {
    setSelections({ ...selections, [category]: value });
    setStep(step + 1);
  };

  const handleBack = () => {
    const steps = ['region', 'frondType', 'size', 'texture'];
    if (step > 0) {
      const prevCategory = steps[step - 1];
      setSelections({ ...selections, [prevCategory]: null });
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setSelections({
      region: null,
      frondType: null,
      size: null,
      texture: null
    });
    setStep(0);
    setShowDatabase(false);
  };

  const currentLessonStep = LESSON_STEPS[lessonStepIndex];
  const isContentStep = currentLessonStep?.type === 'content';
  const isPracticeStep = currentLessonStep?.type === 'practice';
  const isFinalQuizStep = currentLessonStep?.type === 'finalQuiz';
  const isQuizStep = isPracticeStep || isFinalQuizStep;
  const isFirstStep = lessonStepIndex === 0;
  const isLastStep = lessonStepIndex === LESSON_STEPS.length - 1;
  const isLastContentSlide =
    isContentStep &&
    (currentLessonStep as { type: 'content'; slideIndex: number }).slideIndex === anatomySlides.length - 1;

  const practiceQuestions = useMemo((): QuizQuestion[] => {
    const step = LESSON_STEPS[lessonStepIndex];
    if (step?.type === 'practice') {
      return pickRandom(getSectionPool(step.sectionIndex), 5);
    }
    if (step?.type === 'finalQuiz') {
      const all: QuizQuestion[] = [];
      const perSection = [4, 4, 4, 4, 4, 3, 2]; // 25 total
      for (let s = 0; s < sectionQuestions.length; s++) {
        all.push(...pickRandom(getSectionPool(s), perSection[s]));
      }
      return shuffle(all);
    }
    return [];
  }, [lessonStepIndex]);

  useEffect(() => {
    const step = LESSON_STEPS[lessonStepIndex];
    if (step?.type === 'practice' || step?.type === 'finalQuiz') {
      setPracticeQuestionIndex(0);
    }
  }, [lessonStepIndex]);

  useEffect(() => {
    if (isFinalQuizStep) setFinalQuizScore(0);
  }, [lessonStepIndex]);

  const currentQuestion = practiceQuestions[practiceQuestionIndex];
  const isLastQuestionInBlock = practiceQuestionIndex >= practiceQuestions.length - 1;

  const handleCheck = () => {
    if (practiceSelected === null) return;
    const correct = currentQuestion?.options[practiceSelected]?.correct;
    if (isFinalQuizStep && correct) setFinalQuizScore((s) => s + 1);
    setPracticeChecked(true);
  };

  const handlePracticeContinue = () => {
    if (!isLastQuestionInBlock) {
      setPracticeQuestionIndex((i) => i + 1);
      setPracticeSelected(null);
      setPracticeChecked(false);
      return;
    }
    goToNextStep();
  };

  const goToNextStep = () => {
    if (lessonStepIndex + 1 >= LESSON_STEPS.length) {
      setShowLesson(false);
      setLessonStepIndex(0);
      setPracticeSelected(null);
      setPracticeChecked(false);
      setPracticeQuestionIndex(0);
      setFinalQuizScore(0);
      return;
    }
    setLessonStepIndex(lessonStepIndex + 1);
    const nextStep = LESSON_STEPS[lessonStepIndex + 1];
    if (nextStep?.type === 'practice' || nextStep?.type === 'finalQuiz') {
      setPracticeSelected(null);
      setPracticeChecked(false);
    }
  };

  const goToPrevStep = () => {
    if (isQuizStep && practiceQuestionIndex > 0) {
      setPracticeQuestionIndex((i) => i - 1);
      setPracticeSelected(null);
      setPracticeChecked(false);
      return;
    }
    if (lessonStepIndex > 0) {
      setLessonStepIndex(lessonStepIndex - 1);
      setPracticeSelected(null);
      setPracticeChecked(false);
    }
  };

  const renderAnatomyLesson = () => {
    // —— Final Quiz Title Page ——
    if (currentLessonStep?.type === 'finalQuizIntro') {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-green-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">Fern Morphology</h2>
          </div>
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Step {lessonStepIndex + 1} of {LESSON_STEPS.length}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${((lessonStepIndex + 1) / LESSON_STEPS.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="py-12 px-6 text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Final Quiz</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              25 questions from all sections. Test your fern anatomy knowledge.
            </p>
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={goToPrevStep}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <button
                onClick={goToNextStep}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Start Quiz
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      );
    }

    // —— Final Quiz Results (Score) ——
    if (currentLessonStep?.type === 'finalQuizResults') {
      const total = 25;
      const percentage = total > 0 ? Math.round((finalQuizScore / total) * 100) : 0;
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-green-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">Fern Morphology</h2>
          </div>
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Step {lessonStepIndex + 1} of {LESSON_STEPS.length}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${((lessonStepIndex + 1) / LESSON_STEPS.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="py-12 px-6 text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Quiz Complete</h3>
            <div className="text-4xl font-bold text-green-600 mb-2">{finalQuizScore} out of {total} correct</div>
            <div className="text-2xl font-semibold text-gray-700 mb-8">{percentage}%</div>
            <button
              onClick={goToNextStep}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold mx-auto"
            >
              Continue
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      );
    }

    // —— Practice step or Final Quiz (Duolingo-style) ——
    const displayQuestion = currentQuestion ?? practiceQuestions[0];
    if (isQuizStep && displayQuestion && practiceQuestions.length > 0) {
      const ex = displayQuestion;
      const quizTitle = isFinalQuizStep ? 'Final Quiz' : 'Practice';
      const questionProgress = `${practiceQuestionIndex + 1} of ${practiceQuestions.length}`;

      return (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-green-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">Fern Morphology</h2>
          </div>
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Step {lessonStepIndex + 1} of {LESSON_STEPS.length}</span>
              <span className="text-green-600 font-medium">{quizTitle} — Question {questionProgress}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${((lessonStepIndex + 1) / LESSON_STEPS.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
            <p className="text-amber-900 font-medium">Tap the correct answer</p>
          </div>
          {ex.image && (
            <div className="mb-4 flex justify-center">
              <img src={ex.image} alt="" className="max-h-48 rounded-lg object-contain shadow-sm" />
            </div>
          )}
          <p className="text-lg text-gray-800 font-medium mb-6">{ex.question}</p>
          <div className="grid gap-3">
            {ex.options.map((opt, idx) => {
              const selected = practiceSelected === idx;
              const showCorrect = practiceChecked && opt.correct;
              const showWrong = practiceChecked && selected && !opt.correct;
              const disabled = practiceChecked;
              return (
                <button
                  key={idx}
                  disabled={disabled}
                  onClick={() => !practiceChecked && setPracticeSelected(idx)}
                  className={`p-4 rounded-xl border-2 text-left font-medium transition ${
                    disabled
                      ? showCorrect
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : showWrong
                          ? 'border-red-400 bg-red-50 text-red-800'
                          : 'border-gray-200 bg-gray-50 text-gray-600'
                      : selected
                        ? 'border-green-500 bg-green-50 text-gray-800'
                        : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50 text-gray-800'
                  }`}
                >
                  {opt.text}
                  {showCorrect && ' ✓'}
                  {showWrong && ' ✗'}
                </button>
              );
            })}
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <button
                onClick={goToPrevStep}
                disabled={isFirstStep}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                  isFirstStep ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <button
                onClick={goToNextStep}
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Skip quiz
              </button>
            </div>
            {!practiceChecked ? (
              <button
                onClick={handleCheck}
                disabled={practiceSelected === null}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Check
              </button>
            ) : (
              <button
                onClick={handlePracticeContinue}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Continue
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      );
    }

    // —— Content step (slide) ——
    if (currentLessonStep?.type !== 'content') return null;
    const slideIndex = (currentLessonStep as { type: 'content'; slideIndex: number }).slideIndex;
    const slide = anatomySlides[slideIndex];
    if (!slide) return null;
    const SlideIcon = slide.icon;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="text-green-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-800">Fern Morphology</h2>
        </div>
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Step {lessonStepIndex + 1} of {LESSON_STEPS.length}</span>
            <span className="text-green-600 font-medium">Learn</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${((lessonStepIndex + 1) / LESSON_STEPS.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="min-h-[280px]">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <SlideIcon size={22} className="text-green-600" />
            {slide.title}
          </h3>
          <div className="text-gray-700">{slide.content}</div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <button
            onClick={goToPrevStep}
            disabled={isFirstStep}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              isFirstStep ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft size={20} />
            Back
          </button>
          {isLastStep && isLastContentSlide ? (
            <button
              onClick={() => {
                setShowLesson(false);
                setLessonStepIndex(0);
                setPracticeSelected(null);
                setPracticeChecked(false);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Start Identifying
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={goToNextStep}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Next
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    );
  };

  const getSortedDatabase = () => {
    const sorted = [...fernDatabase];
    if (sortBy === 'common') {
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return sorted.sort((a, b) => a.scientific.localeCompare(b.scientific));
    }
  };

  const renderStep = () => {
    if (showDatabase) {
      const sortedFerns = getSortedDatabase();
      return (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Complete Fern Database</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('common')}
                className={`px-3 py-1 text-sm rounded-lg transition ${
                  sortBy === 'common' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Common Name
              </button>
              <button
                onClick={() => setSortBy('latin')}
                className={`px-3 py-1 text-sm rounded-lg transition ${
                  sortBy === 'latin' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Latin Name
              </button>
            </div>
          </div>
          <p className="text-gray-600 mb-4">All {fernDatabase.length} species in the database:</p>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {sortedFerns.map((fern, idx) => (
              <div key={idx} className="border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Leaf className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{fern.name}</h3>
                    <p className="text-sm text-gray-600 italic mb-2">{fern.scientific}</p>
                    <p className="text-sm text-gray-700 mb-2">{fern.features}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {fern.frondType === 'once' ? 'Once divided' : 
                         fern.frondType === 'twice' ? 'Twice divided' :
                         fern.frondType === 'thrice' ? 'Thrice+ divided' :
                         fern.frondType === 'pedate' ? 'Pedate' : 'Undivided'}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                        {fern.size === 'small' ? 'Small' : fern.size === 'medium' ? 'Medium' : 'Large'}
                      </span>
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">
                        {fern.texture === 'delicate' ? 'Delicate' : 
                         fern.texture === 'leathery' ? 'Leathery' : 'Hairy'}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Regions: {fern.regions.map(r => 
                        regions.find(reg => reg.id === r)?.name
                      ).join(', ')}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Habitat: {formatHabitat(fern)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const matches = getMatches();
    const matchCount = matches.length;

    if (step === 0) {
      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="text-green-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">Select Your Region</h2>
          </div>
          <p className="text-gray-600 mb-6">Where are you observing this fern?</p>
          <div className="grid gap-3">
            {regions.map(region => (
              <button
                key={region.id}
                onClick={() => handleSelect('region', region.id)}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left"
              >
                <div className="font-semibold text-gray-800">{region.name}</div>
                <div className="text-sm text-gray-500 mt-1">{region.description}</div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (step === 1) {
      return (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frond Division</h2>
          <p className="text-gray-600 mb-2">How many times are the fronds divided?</p>
          <p className="text-sm text-green-600 mb-6">{matchCount} possible matches</p>
          <div className="grid gap-3">
            {frondTypes.map(type => (
              <button
                key={type.id}
                onClick={() => handleSelect('frondType', type.id)}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left flex items-center gap-4"
              >
                <div className="flex-shrink-0 w-20 h-24 bg-green-50 rounded-lg p-2 flex items-center justify-center overflow-hidden">
                  {type.image ? (
                    <img src={type.image} alt={type.name} className="w-full h-full object-contain" />
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: type.svg }} className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{type.name}</div>
                  <div className="text-sm text-gray-500 mt-1">{type.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frond Size</h2>
          <p className="text-gray-600 mb-2">How tall is the fern?</p>
          <p className="text-sm text-green-600 mb-6">{matchCount} possible matches</p>
          <div className="grid gap-3">
            {sizes.map(size => (
              <button
                key={size.id}
                onClick={() => handleSelect('size', size.id)}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left"
              >
                <div className="font-semibold text-gray-800">{size.name}</div>
                <div className="text-sm text-gray-500 mt-1">{size.description}</div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frond Texture</h2>
          <p className="text-gray-600 mb-2">What's the texture of the fronds?</p>
          <p className="text-sm text-green-600 mb-6">{matchCount} possible matches</p>
          <div className="grid gap-3">
            {textures.map(texture => (
              <button
                key={texture.id}
                onClick={() => handleSelect('texture', texture.id)}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left"
              >
                <div className="font-semibold text-gray-800">{texture.name}</div>
                <div className="text-sm text-gray-500 mt-1">{texture.description}</div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (step === 4) {
      return (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Identification Results</h2>
          {matches.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No matches found with these characteristics.</p>
              <p className="text-sm text-gray-500">Try going back and adjusting your selections.</p>
            </div>
          ) : matches.length === 1 ? (
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <Leaf className="text-green-600 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{matches[0].name}</h3>
                  <p className="text-gray-600 italic">{matches[0].scientific}</p>
                  <p className="text-sm text-gray-600 mt-1">Habitat: {formatHabitat(matches[0])}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{matches[0].features}</p>
              {matches[0].name === 'Christmas Fern' && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ClickableImg src={polystichumAcrostichoides1Img} alt="Christmas Fern (Polystichum acrostichoides) 1" className="rounded-lg w-full object-cover max-h-64 shadow-sm" />
                  <ClickableImg src={polystichumAcrostichoides2Img} alt="Christmas Fern (Polystichum acrostichoides) 2" className="rounded-lg w-full object-cover max-h-64 shadow-sm" />
                </div>
              )}
              {matches[0].scientific === 'Adiantum pedatum' && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ClickableImg src={adiantumPedatum1Img} alt="Adiantum pedatum 1" className="rounded-lg w-full object-cover max-h-64 shadow-sm" />
                  <ClickableImg src={adiantumPedatum2Img} alt="Adiantum pedatum 2" className="rounded-lg w-full object-cover max-h-64 shadow-sm" />
                </div>
              )}
              {matches[0].scientific === 'Osmundastrum cinnamomeum' && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <ClickableImg src={osmundastrumCinnamomeum1Img} alt="Cinnamon Fern (Osmundastrum cinnamomeum) 1" className="rounded-lg w-full object-cover max-h-64 shadow-sm" />
                  <ClickableImg src={osmundastrumCinnamomeum2Img} alt="Cinnamon Fern (Osmundastrum cinnamomeum) 2" className="rounded-lg w-full object-cover max-h-64 shadow-sm" />
                  <ClickableImg src={osmundastrumCinnamomeum3Img} alt="Cinnamon Fern (Osmundastrum cinnamomeum) 3" className="rounded-lg w-full object-cover max-h-64 shadow-sm" />
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">Found {matches.length} possible matches:</p>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {matches.map((fern, idx) => (
                  <div key={idx} className="border-2 border-gray-200 rounded-lg p-4 hover:border-green-400 transition">
                    <div className="flex items-start gap-3">
                      <Leaf className="text-green-600 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <h3 className="font-bold text-gray-800">{fern.name}</h3>
                        <p className="text-sm text-gray-600 italic mb-1">{fern.scientific}</p>
                        <p className="text-xs text-gray-500 mb-2">Habitat: {formatHabitat(fern)}</p>
                        <p className="text-sm text-gray-700">{fern.features}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <ImageLightboxProvider>
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Leaf className="text-green-600" size={36} />
              <h1 className="text-3xl font-bold text-gray-800">Fern Identifier</h1>
            </div>
            <div className="flex gap-2">
              {!showLesson && (
                <button
                  onClick={() => {
                    setShowLesson(true);
                    setLessonStepIndex(0);
                    setPracticeSelected(null);
                    setPracticeChecked(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
                >
                  <BookOpen size={18} />
                  Review Lesson
                </button>
              )}
              {!showLesson && (
                <button
                  onClick={() => setShowDatabase(!showDatabase)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
                >
                  <Database size={18} />
                  {showDatabase ? 'Hide' : 'View'} Database
                </button>
              )}
              <button
                onClick={() => {
                  if (showLesson) {
                    setShowLesson(false);
                    setLessonStepIndex(0);
                    setPracticeSelected(null);
                    setPracticeChecked(false);
                  } else {
                    handleReset();
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
              >
                <Home size={18} />
                {showLesson ? 'Skip to Identifier' : 'Reset'}
              </button>
            </div>
          </div>

          {!showLesson && (
            <div className="mb-8">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Progress</span>
                <span>Step {step} of 4</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          {!showLesson && step > 0 && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-700 mb-2">Your selections:</p>
              <div className="flex flex-wrap gap-2">
                {selections.region && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {regions.find(r => r.id === selections.region)?.name}
                  </span>
                )}
                {selections.frondType && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {frondTypes.find(f => f.id === selections.frondType)?.name}
                  </span>
                )}
                {selections.size && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {sizes.find(s => s.id === selections.size)?.name}
                  </span>
                )}
                {selections.texture && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {textures.find(t => t.id === selections.texture)?.name}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="mb-8">
            {showLesson ? renderAnatomyLesson() : renderStep()}
          </div>

          {!showLesson && step > 0 && (
            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                <ChevronLeft size={20} />
                Back
              </button>
            </div>
          )}
        </div>

        {!showLesson && (
          <p className="text-center text-sm text-gray-600 mt-4">
            Database includes 40 fern species across North America, UK, and Europe
          </p>
        )}

        <footer className="text-center text-xs text-gray-500 mt-6 pb-4">
          All drawings are open source. All photographs © Keith M Smith.
        </footer>
      </div>
    </div>
    </ImageLightboxProvider>
  );
};

export default FernIdentifier;