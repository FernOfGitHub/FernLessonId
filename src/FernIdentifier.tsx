import React, { useState, useMemo, useEffect, createContext, useContext } from 'react';
import { ChevronLeft, ChevronRight, Leaf, MapPin, Home, Database, BookOpen, X, TrafficCone } from 'lucide-react';

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
import entireImg from '../pictures/Cut/entire.jpg';
import entire2Img from '../pictures/Cut/entire2.jpg';
import entire1x1BwImg from '../pictures/Cut/entire_1x1_bw.png';
import entireBwImg from '../pictures/Cut/entire_bw.png';
import pinnateImg from '../pictures/Cut/pinnate.jpg';
import pinnate1x1BwImg from '../pictures/Cut/pinnate_1x1_bw.png';
import pinnateBwImg from '../pictures/Cut/pinnate_bw.png';
import pinnatifidImg from '../pictures/Cut/pinnatifid.jpg';
import pinnatifid1x1BwImg from '../pictures/Cut/pinnatifid_1x1_bw.png';
import pinnatifidBwImg from '../pictures/Cut/pinnatifid_bw.png';
import bipinnateImg from '../pictures/Cut/bipinnate.jpg';
import bipinnate1x1BwImg from '../pictures/Cut/bipinnate_1x1_bw.png';
import bipinnateBwImg from '../pictures/Cut/bipinnate_bw.png';
import bipinnate2Img from '../pictures/Cut/bipinnate2.jpg';
import bipinnate3Img from '../pictures/Cut/bipinate3.jpg';
import pinnatePinnatifidImg from '../pictures/Cut/pinnate-pinnatifid.jpg';
import bipinnatePinnatifid1x1BwImg from '../pictures/Cut/bipinnate_pinnatifid_1x1_bw.png';
import bipinnatePinnatifidBwImg from '../pictures/Cut/bipinnate_pinnatifid_bw.png';
import pedateImg from '../pictures/Cut/pedate.jpg';
import circularImg from '../pictures/Sori/Circular.jpg';
import circular2Img from '../pictures/Sori/circular2.jpg';
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
import clubmossHorsetailImg from '../pictures/anatomy/clubmoss-horsetail.png';
import clubmossPlantImg from '../pictures/anatomy/clubmoss-plant.jpg';
import clubmossStroboliImg from '../pictures/anatomy/clubmoss-stroboli.jpg';
import horsetailBranchedImg from '../pictures/anatomy/horsetail-branched.jpg';
import horsetailUnbranchedImg from '../pictures/anatomy/horsetail-unbranched.jpg';
import horsetailSegmentsImg from '../pictures/anatomy/horsetail-segments.jpg';
import horsetailStrobiliImg from '../pictures/anatomy/horsetail-stroboli.jpg';
import branchedUnbranchedImg from '../pictures/anatomy/branched-unbranched.png';
import equisetumTeethImg from '../pictures/anatomy/equisetum-teeth.png';
import vaseShapedImg from '../pictures/anatomy/vase-shaped.jpg';
import polystichumAcrostichoides1Img from '../pictures/Id/Polystichum_ acrostichoides1.JPG';
import polystichumAcrostichoides2Img from '../pictures/Id/Polystichum_ acrostichoides2.JPG';
import polystichumAcrostichoides3Img from '../pictures/Id/Polystichum_acrostichoides3.JPG';
import adiantumPedatum1Img from '../pictures/Id/Adiantum_pedatum1.JPG';
import adiantumPedatum2Img from '../pictures/Id/Adiantum_pedatum2.JPG';
import osmundastrumCinnamomeum1Img from '../pictures/Id/Osmundastrum_cinnamomeum1.JPG';
import osmundastrumCinnamomeum2Img from '../pictures/Id/Osmundastrum_cinnamomeum2.JPG';
import osmundastrumCinnamomeum3Img from '../pictures/Id/Osmundastrum_cinnamomeum3.JPG';
import osmundastrumCinnamomeum4Img from '../pictures/Id/Osmundastrum_cinnamomeum4.JPG';
import matteucciaStruthiopteris1Img from '../pictures/Id/Matteuccia_struthiopteris1.JPG';
import matteucciaStruthiopteris2Img from '../pictures/Id/Matteuccia_struthiopteris2.JPG';
import matteucciaStruthiopteris3Img from '../pictures/Id/Matteuccia_struthiopteris3.JPG';
import osmundaClaytoniana1Img from '../pictures/Id/Osmunda_claytoniana1.JPG';
import osmundaClaytoniana2Img from '../pictures/Id/Osmunda_claytoniana2.JPG';
import osmundaClaytoniana3Img from '../pictures/Id/Osmunda_claytoniana3.JPG';
import osmundaRegalis1Img from '../pictures/Id/Osmunda_regalis1.JPG';
import osmundaRegalis2Img from '../pictures/Id/Osmunda_regalis2.JPG';
import parathelypterisNoveboracensis1Img from '../pictures/Id/Parathelypteris_noveboracensis1.JPG';
import parathelypterisNoveboracensis2Img from '../pictures/Id/Parathelypteris_noveboracensis2.JPG';
import thelypterisPalustris1Img from '../pictures/Id/Thelypteris_palustris1.JPG';
import thelypterisPalustris2Img from '../pictures/Id/Thelypteris_palustris2.JPG';
import thelypterisPalustris3Img from '../pictures/Id/Thelypteris_palustris3.JPG';
import woodwardiaAreolata1Img from '../pictures/Id/Woodwardia_areolata1.JPG';
import woodwardiaAreolata2Img from '../pictures/Id/Woodwardia_areolata2.JPG';
import woodwardiaAreolata3Img from '../pictures/Id/Woodwardia_areolata3.JPG';
import aspleniumPlatyneuron1Img from '../pictures/Id/asplenium_platyneuron1.JPG';
import aspleniumPlatyneuron2Img from '../pictures/Id/asplenium_platyneuron2.JPG';
import aspleniumPlatyneuron3Img from '../pictures/Id/asplenium_platyneuron3.JPG';
import aspleniumTrichomanesImg from '../pictures/Id/Asplenium_trichomanes.JPG';
import aspleniumTrichomanes2Img from '../pictures/Id/Asplenium_trichomanes2.JPG';
import aspleniumRhizophyllum1Img from '../pictures/Id/Aspensium_rhizophyllum1.JPG';
import aspleniumRhizophyllum2Img from '../pictures/Id/Aspensium_rhizophyllum2.JPG';
import aspleniumRhizophyllum3Img from '../pictures/Id/Aspensium_rhizophyllum3.JPG';
import pteridiumAquilinum1Img from '../pictures/Id/Pteridium_aquilinum1.JPG';
import pteridiumAquilinum2Img from '../pictures/Id/Pteridium_aquilinum2.JPG';
import cystopterisBulbifera1Img from '../pictures/Id/Cystopteris_bulbifera1.JPG';
import cystopterisBulbifera2Img from '../pictures/Id/Cystopteris_bulbifera2.JPG';
import cystopterisBulbifera3Img from '../pictures/Id/Cystopteris_bulbifera3.JPG';
import polypodiumVirginianum1Img from '../pictures/Id/Polypodium_virginianum1.JPG';
import polypodiumVirginianum2Img from '../pictures/Id/Polypodium_virginianum2.JPG';
import polypodiumVirginianum3Img from '../pictures/Id/Polypodium_virginianum3.JPG';
import polypodiumAppalachianum1Img from '../pictures/Id/Polypodium_appalachianum1.JPG';
import polypodiumAppalachianum2Img from '../pictures/Id/Polypodium_appalachianum2.JPG';
import polypodiumAppalachianum3Img from '../pictures/Id/Polypodium_appalachianum3.JPG';
import dryopterisCristata1Img from '../pictures/Id/Dryopteris_cristata1.JPG';
import dryopterisCristata2Img from '../pictures/Id/Dryopteris_cristata2.JPG';
import dryopterisMarginalisImg from '../pictures/Id/Dryopteris_marginalis.JPG';
import sceptridiumDissectum1Img from '../pictures/Id/Sceptridium_dissectum1.JPG';
import sceptridiumDissectum2Img from '../pictures/Id/Sceptridium_dissectum2.JPG';
import sceptridiumDissectum3Img from '../pictures/Id/Sceptridium_dissectum3.JPG';
import sceptridiumDissectum4Img from '../pictures/Id/Sceptridium_dissectum4.JPG';
import cystopterisFragilis1Img from '../pictures/Id/Cystopteris_fragilis1.JPG';
import cystopterisFragilis2Img from '../pictures/Id/Cystopteris_fragilis2.JPG';
import dryopterisGoldiana1Img from '../pictures/Id/Dryopteris_goldiana1.JPG';
import dryopterisGoldiana2Img from '../pictures/Id/Dryopteris_goldiana2.JPG';
import dryopterisGoldiana3Img from '../pictures/Id/Dryopteris_goldiana3.JPG';
import dennstaedtiaPunctilobula1Img from '../pictures/Id/Dennstaedtia_puncitilobula1.JPG';
import dennstaedtiaPunctilobula2Img from '../pictures/Id/Dennstaedtia_puncitilobula2.JPG';
import cyatheaSmithiiImg from '../pictures/Id/Cyathea_smithii.JPG';
import trichomanesReniformeImg from '../pictures/Id/Trichomanes_reniforme.JPG';
import dendrolycopodiumObscurum1Img from '../pictures/Id/Dendrolycopodium_obscurum1.JPG';
import dendrolycopodiumObscurum2Img from '../pictures/Id/Dendrolycopodium_obscurum2.JPG';
import dendrolycopodiumObscurum3Img from '../pictures/Id/Dendrolycopodium_obscurum3.JPG';
import diphasiastrumTristachyum1Img from '../pictures/Id/Diphasiastrum_tristachyum1.JPG';
import diphasiastrumTristachyum2Img from '../pictures/Id/Diphasiastrum_tristachyum2.JPG';
import diphasiastrumDigitatum1Img from '../pictures/Id/Diphasiastrum_digitatum1.JPG';
import huperziaLucidula1Img from '../pictures/Id/Huperzia_lucidula1.JPG';
import huperziaLucidula2Img from '../pictures/Id/Huperzia_lucidula2.JPG';
import huperziaLucidula3Img from '../pictures/Id/Huperzia_lucidula3.JPG';
import eArvense1Img from '../pictures/Id/E.arvense1.JPG';
import eArvense2Img from '../pictures/Id/E.arvense2.JPG';
import eArvense3Img from '../pictures/Id/E.arvense3.JPG';
import eHyemale1Img from '../pictures/Id/E.hyemale1.JPG';
import eHyemale2Img from '../pictures/Id/E.hyemale2.JPG';

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
  // Section 5: Growth Patterns
  [
    { question: 'Growth habit is influenced by rhizome orientation and structure.', correct: true },
    { question: 'Clump-forming ferns usually have a long, creeping rhizome only.', correct: false },
    { question: 'Creeping rhizomes can produce fronds at intervals along their length.', correct: true },
    { question: 'Arborescent ferns develop a trunk-like structure from rhizome and root mass.', correct: true },
    { question: 'Tufted ferns form dense cushions from short, much-branched rhizomes.', correct: true },
    { question: 'Bracken is a classic example of a strictly clump-forming, non-spreading fern.', correct: false },
  ],
  // Section 6: Rhizome & Roots
  [
    { question: 'The rhizome is the underground stem.', correct: true },
    { question: 'Rhizomes can be creeping, clump-forming, or erect.', correct: true },
    { question: 'Rhizome surface cannot be glaucous.', correct: false },
    { question: 'Roots extend off the rhizome.', correct: true },
    { question: 'Stipe scales usually match rhizome scales.', correct: true },
  ],
  // Section 7: Fern Reproduction
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
  // Section 2: Frond Division (no Pinnatifid / Pinnate pinnatifid / Bipinnate pinnatifid — not yet introduced)
  [
    { question: 'What type of frond division is shown in this photo?', image: pinnateImg, options: [{ text: 'Once divided (pinnate)', correct: true }, { text: 'Entire (undivided)', correct: false }, { text: 'Twice divided (bipinnate)', correct: false }, { text: 'Pedate', correct: false }] },
    { question: 'A frond that is divided into pinnae, and each pinna is divided again, is called ___?', options: [{ text: 'Pinnate', correct: false }, { text: 'Bipinnate', correct: true }, { text: 'Entire', correct: false }, { text: 'Pedate', correct: false }] },
    { question: 'An undivided fern blade with no leaflets is called ___.', options: [{ text: 'Pinnate', correct: false }, { text: 'Entire', correct: true }, { text: 'Bipinnate', correct: false }, { text: 'Tripinnate', correct: false }] },
    { question: 'Once-divided fronds with pinnae along the rachis are ___.', options: [{ text: 'Pinnate', correct: true }, { text: 'Bipinnate', correct: false }, { text: 'Entire', correct: false }, { text: 'Tripinnate', correct: false }] },
    { question: 'A very lacy, feathery frond is likely ___.', options: [{ text: 'Entire', correct: false }, { text: 'Pinnate', correct: false }, { text: 'Tripinnate (or more)', correct: true }, { text: 'Pedate', correct: false }] },
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
  // Section 5: Growth Patterns
  [
    { question: 'Fronds emerging from one central point in a circular crown suggest which habit?', options: [{ text: 'Creeping carpet', correct: false }, { text: 'Clump-forming (vase-shaped)', correct: true }, { text: 'Scrambling vine', correct: false }, { text: 'Pendulous epiphyte only', correct: false }] },
    { question: 'Which is a hallmark of long-creeping rhizomes?', options: [{ text: 'A single shuttlecock crown', correct: false }, { text: 'Fronds spaced along the ground from connected stems', correct: true }, { text: 'A woody trunk 2 m tall', correct: false }, { text: 'No roots on the rhizome', correct: false }] },
    { question: 'Tree ferns such as Cyathea or Dicksonia are described as ___.', options: [{ text: 'Tufted cushions', correct: false }, { text: 'Arborescent', correct: true }, { text: 'Strictly annual herbs', correct: false }, { text: 'Seed plants', correct: false }] },
    { question: 'Maidenhair spleenwort in a tight rock crevice often illustrates ___.', options: [{ text: 'Arborescent habit', correct: false }, { text: 'Tufted / caespitose habit', correct: true }, { text: 'Marginal sori only', correct: false }, { text: 'Aquatic floating mats', correct: false }] },
    { question: 'Staghorn fern (Platycerium) fronds hanging from a mount illustrate ___.', options: [{ text: 'Scrambling', correct: false }, { text: 'Pendulous habit', correct: true }, { text: 'Clump vase only', correct: false }, { text: 'Rhizome indusia', correct: false }] },
    { question: 'Climbing fern (Lygodium) is an example of ___.', options: [{ text: 'Pendulous only', correct: false }, { text: 'Scrambling / climbing fronds', correct: true }, { text: 'Acrostichoid sori', correct: false }, { text: 'No rhizome', correct: false }] },
  ],
  // Section 6: Rhizome & Roots
  [
    { question: 'The underground stem that produces fronds and roots is the ___?', options: [{ text: 'Stipe', correct: false }, { text: 'Rhizome', correct: true }, { text: 'Rachis', correct: false }, { text: 'Blade', correct: false }] },
    { question: 'Rhizome growth types include creeping, clump-forming, and ___.', options: [{ text: 'Erect (ascending)', correct: true }, { text: 'Floating', correct: false }, { text: 'Annual', correct: false }, { text: 'Deciduous', correct: false }] },
    { question: 'Rhizome surface can be scaly, hairy, glabrous, or ___.', options: [{ text: 'Glaucous (waxy)', correct: true }, { text: 'Smooth only', correct: false }, { text: 'Spiny', correct: false }, { text: 'Sticky', correct: false }] },
    { question: 'Roots extend off the rhizome and can be fibrous, fleshy, or ___.', options: [{ text: 'Stolons (creeping stems)', correct: true }, { text: 'Sori', correct: false }, { text: 'Pinnae', correct: false }, { text: 'Sporangia', correct: false }] },
    { question: 'Scales on the stipe usually match those on the ___.', options: [{ text: 'Blade', correct: false }, { text: 'Rhizome', correct: true }, { text: 'Sori', correct: false }, { text: 'Pinnae', correct: false }] },
  ],
  // Section 7: Fern Reproduction
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

const SECTION_TITLES = [
  'Frond & Stipe',
  'Pinnae & Pinnules',
  'Frond Division',
  'Frond Division (Advanced)',
  'Sori',
  'Growth Patterns',
  'Rhizome & Roots',
  'Fern Reproduction',
];

function buildLessonSteps(): LessonStep[] {
  const steps: LessonStep[] = [];
  for (let i = 0; i < anatomySlides.length; i++) {
    steps.push({ type: 'content', slideIndex: i });
    // Add a practice quiz after every content slide except the last ("You're Ready")
    if (i < anatomySlides.length - 1) {
      steps.push({ type: 'practice', sectionIndex: i });
    }
    if (i === 7) {
      steps.push({ type: 'finalQuizIntro' });
      steps.push({ type: 'finalQuiz' });
      steps.push({ type: 'finalQuizResults' });
    }
  }
  return steps;
}
const LESSON_STEPS = buildLessonSteps();

const INTRO_LINES = [
  'Welcome to this fern tutorial and identifier.',
  'This site is for newly minted botanists or those who struggle reading keys in a fern guide.',
  'I hope this site makes those keys more understandable.',
  '',
  'Enjoy.',
  '',
  '[This is an early, early development version]',
  'Version 0.3  2May26',
  '@fernleaf07.bsky.social',
];

const LYCOPHYTE_INTRO_PARAGRAPH = `Ferns, lycophytes, and horsetails all reproduce by spores, but they look very different. Ferns have fronds with pinnae and sori; lycophytes have tiny leaves and spore cones (strobili); horsetails have hollow jointed stems and no true fronds. If you've found a plant that doesn't match fern structure, it may be a lycophyte or horsetail—and those use different keys and terms. This section outlines their morphology so you know which kind of key to use.`;

const HORSETAIL_DATABASE = [
  { subgenus: 'Equisetum', subgenusLabel: 'Subgenus Equisetum (True Horsetails)', scientificName: 'E. arvense', commonName: 'Field Horsetail', primaryRange: 'Circumboreal (Northern Hemisphere)', branching: 'branched', description: 'Field horsetail has a sterile and a fertile form. The sterile form is green with whorls. The fertile form is only seen in spring for a few weeks. It does not have any chlorophyll. The single strobilus is covered in hexagons that open to reveal and release the spores.' },
  { subgenus: 'Equisetum', subgenusLabel: 'Subgenus Equisetum (True Horsetails)', scientificName: 'E. bogotense', commonName: 'Andean Horsetail', primaryRange: 'Central & South America', branching: 'branched' },
  { subgenus: 'Equisetum', subgenusLabel: 'Subgenus Equisetum (True Horsetails)', scientificName: 'E. diffusum', commonName: 'Himalayan Horsetail', primaryRange: 'Himalayan region', branching: 'branched' },
  { subgenus: 'Equisetum', subgenusLabel: 'Subgenus Equisetum (True Horsetails)', scientificName: 'E. fluviatile', commonName: 'Water Horsetail', primaryRange: 'Northern Hemisphere', branching: 'branched' },
  { subgenus: 'Equisetum', subgenusLabel: 'Subgenus Equisetum (True Horsetails)', scientificName: 'E. palustre', commonName: 'Marsh Horsetail', primaryRange: 'Northern Hemisphere', branching: 'branched' },
  { subgenus: 'Equisetum', subgenusLabel: 'Subgenus Equisetum (True Horsetails)', scientificName: 'E. pratense', commonName: 'Meadow Horsetail', primaryRange: 'Northern Hemisphere', branching: 'branched' },
  { subgenus: 'Equisetum', subgenusLabel: 'Subgenus Equisetum (True Horsetails)', scientificName: 'E. sylvaticum', commonName: 'Wood Horsetail', primaryRange: 'Northern Hemisphere', branching: 'branched' },
  { subgenus: 'Equisetum', subgenusLabel: 'Subgenus Equisetum (True Horsetails)', scientificName: 'E. telmateia', commonName: 'Great Horsetail', primaryRange: 'Europe, W. Asia, N. Africa', branching: 'branched' },
  { subgenus: 'Equisetum', subgenusLabel: 'Subgenus Equisetum (True Horsetails)', scientificName: 'E. braunii', commonName: 'Giant Horsetail', primaryRange: 'Western North America', branching: 'branched' },
  { subgenus: 'Hippochaete', subgenusLabel: 'Subgenus Hippochaete (Scouring Rushes)', scientificName: 'E. giganteum', commonName: 'Southern Giant Horsetail', primaryRange: 'Central & South America', branching: 'unbranched' },
  { subgenus: 'Hippochaete', subgenusLabel: 'Subgenus Hippochaete (Scouring Rushes)', scientificName: 'E. hyemale', commonName: 'Rough Horsetail', primaryRange: 'Northern Hemisphere', branching: 'unbranched' },
  { subgenus: 'Hippochaete', subgenusLabel: 'Subgenus Hippochaete (Scouring Rushes)', scientificName: 'E. laevigatum', commonName: 'Smooth Horsetail', primaryRange: 'North America', branching: 'unbranched' },
  { subgenus: 'Hippochaete', subgenusLabel: 'Subgenus Hippochaete (Scouring Rushes)', scientificName: 'E. myriochaetum', commonName: 'Mexican Giant Horsetail', primaryRange: 'Mexico to Peru', branching: 'unbranched' },
  { subgenus: 'Hippochaete', subgenusLabel: 'Subgenus Hippochaete (Scouring Rushes)', scientificName: 'E. praealtum', commonName: 'Scouring Rush', primaryRange: 'North America', branching: 'unbranched' },
  { subgenus: 'Hippochaete', subgenusLabel: 'Subgenus Hippochaete (Scouring Rushes)', scientificName: 'E. ramosissimum', commonName: 'Branched Horsetail', primaryRange: 'Asia, Europe, Africa', branching: 'branched' },
  { subgenus: 'Hippochaete', subgenusLabel: 'Subgenus Hippochaete (Scouring Rushes)', scientificName: 'E. scirpoides', commonName: 'Dwarf Horsetail', primaryRange: 'Arctic/Subarctic regions', branching: 'unbranched' },
  { subgenus: 'Hippochaete', subgenusLabel: 'Subgenus Hippochaete (Scouring Rushes)', scientificName: 'E. variegatum', commonName: 'Variegated Horsetail', primaryRange: 'Northern Hemisphere', branching: 'unbranched' },
  { subgenus: 'Hippochaete', subgenusLabel: 'Subgenus Hippochaete (Scouring Rushes)', scientificName: 'E. xylochaetum', commonName: 'Atacama Giant Horsetail', primaryRange: 'Chile & Peru', branching: 'unbranched' },
];

const CLUBMOSS_DATABASE = [
  { scientificName: 'Dendrolycopodium obscurum', commonName: 'Ground Pine', primaryRange: 'Eastern North America' },
  { scientificName: 'Diphasiastrum tristachyum', commonName: 'Blue Ground Cedar', primaryRange: 'Northern North America' },
  { scientificName: 'Diphasiastrum digitatum', commonName: 'Fan Clubmoss', primaryRange: 'Eastern North America' },
  { scientificName: 'Huperzia lucidula', commonName: 'Shining Clubmoss', primaryRange: 'Eastern North America' },
];

/** Horsetail DB uses "E. arvense"; expand to "Equisetum arvense" for iNaturalist search */
function inaturalistTaxonSearchQuery(scientificName) {
  const t = (scientificName || '').trim();
  if (!t) return '';
  if (/^E\.\s+/i.test(t)) return 'Equisetum ' + t.replace(/^E\.\s+/i, '');
  return t;
}

function InaturalistSpeciesLink({ scientificName, className = 'mt-3 text-sm' }) {
  const q = inaturalistTaxonSearchQuery(scientificName);
  if (!q) return null;
  const href = `https://www.inaturalist.org/observations?taxon_name=${encodeURIComponent(q)}`;
  return (
    <p className={className}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-700 hover:text-green-900 font-medium underline underline-offset-2"
        onClick={(e) => e.stopPropagation()}
      >
        View map and observations on iNaturalist (opens in new tab)
      </a>
    </p>
  );
}

const FernIdentifier = () => {
  /** Single onboarding step before the Fern vs Lycophytes choice (avoids conflicting flags). */
  const [preChoiceScreen, setPreChoiceScreen] = useState<'welcome' | 'quotes' | 'definition' | null>('welcome');
  const [showChoicePage, setShowChoicePage] = useState(false);
  const [showLycophyteIntro, setShowLycophyteIntro] = useState(false);
  const [showLycophyteChoice, setShowLycophyteChoice] = useState(false);
  const [showHorsetailsUnderConstruction, setShowHorsetailsUnderConstruction] = useState(false);
  const [showHorsetailDetails, setShowHorsetailDetails] = useState(false);
  const [showHorsetailDatabase, setShowHorsetailDatabase] = useState(false);
  const [horsetailSearchQuery, setHorsetailSearchQuery] = useState('');
  const [horsetailExpandedScientific, setHorsetailExpandedScientific] = useState(null);
  const [horsetailDetailsBranchingChoice, setHorsetailDetailsBranchingChoice] = useState(null);
  const [showClubmossesUnderConstruction, setShowClubmossesUnderConstruction] = useState(false);
  const [showClubmossDetails, setShowClubmossDetails] = useState(false);
  const [showClubmossDatabase, setShowClubmossDatabase] = useState(false);
  const [clubmossSearchQuery, setClubmossSearchQuery] = useState('');
  const [clubmossExpandedScientific, setClubmossExpandedScientific] = useState(null);
  const [showSpikeMossesMorphology, setShowSpikeMossesMorphology] = useState(false);
  const [showSpikeMossDetails, setShowSpikeMossDetails] = useState(false);
  const [showQuillwortsMorphology, setShowQuillwortsMorphology] = useState(false);
  const [showQuillwortDetails, setShowQuillwortDetails] = useState(false);
  const [showLesson, setShowLesson] = useState(true);
  const [lessonStepIndex, setLessonStepIndex] = useState(0);
  const [practiceSelected, setPracticeSelected] = useState<number | null>(null);
  const [practiceChecked, setPracticeChecked] = useState(false);
  const [practiceQuestionIndex, setPracticeQuestionIndex] = useState(0);
  const [finalQuizScore, setFinalQuizScore] = useState(0);
  const [step, setStep] = useState(0);
  const [showDatabase, setShowDatabase] = useState(false);
  const [databaseExpandedScientific, setDatabaseExpandedScientific] = useState(null);
  const [identifierSpeciesExpandedScientific, setIdentifierSpeciesExpandedScientific] = useState(null);
  const [databaseSearchQuery, setDatabaseSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('common');
  const [selections, setSelections] = useState({
    region: null,
    frondType: null,
    soriPresent: null,
    soriBucket: null,
    texture: null
  });

  const regions = [
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
      id: 'simple',
      name: 'Undivided (Entire)',
      description: 'Simple blade, not divided into leaflets',
      image: entire1x1BwImg,
      fullSize: entireBwImg,
      svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="90" x2="50" y2="110" stroke="#2d5016" stroke-width="3"/>
        <ellipse cx="50" cy="50" rx="35" ry="42" fill="#4a7c59"/>
        <path d="M 50 8 Q 50 30, 50 50" stroke="#3d6847" stroke-width="2" fill="none"/>
      </svg>`
    },
    {
      id: 'pinnatifid',
      name: 'Pinnatifid',
      description: 'Deeply lobed blade, lobes connected at base — between entire and pinnate',
      image: pinnatifid1x1BwImg,
      fullSize: pinnatifidBwImg,
      svg: null
    },
    {
      id: 'once',
      name: 'Once Divided (Pinnate)',
      description: 'Pinnae along the rachis — simple pinnate',
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
      name: 'Twice Divided (Bipinnate)',
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
      id: 'bipinnatePinnatifid',
      name: 'Bipinnate Pinnatifid',
      description: 'Pinnules deeply lobed but not fully divided — between bipinnate and tripinnate',
      image: bipinnatePinnatifid1x1BwImg,
      fullSize: bipinnatePinnatifidBwImg,
      svg: null
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
    }
  ];

  const textures = [
    { id: 'delicate', name: 'Delicate/Thin', description: 'Papery, translucent texture' },
    { id: 'leathery', name: 'Leathery/Thick', description: 'Tough, evergreen texture' },
    { id: 'hairy', name: 'Fuzzy/Hairy', description: 'Visible hairs on fronds or stems' }
  ];

  /** Classifier for the identifier “sori type” step; order is first-match. */
  const identifierSoriBuckets = [
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

  function getIdentifierSoriBucket(fern) {
    const raw = fern.soriType || '';
    for (const b of identifierSoriBuckets) {
      if (b.test(raw)) return b.id;
    }
    return 'other';
  }

  const fernDatabase = [
    {
      name: 'Christmas Fern',
      scientific: 'Polystichum acrostichoides',
      regions: ['northeast', 'atlantic', 'canada'],
      habitat: ['forest', 'rock'],
      frondType: 'once',
      size: 'medium',
      texture: 'leathery',
      growthPattern: 'Clump-forming crown — short erect rhizome, fronds in a vase-like cluster',
      soriType: 'Naked, covering pinnae — roundish sori on upper half of each pinna, no indusium',
      uniqueCharacters: [
        'Boot-shaped (auriculate) pinnae at the base of each pinna',
        'Naked sori only on the upper half of the frond, covering the entire pinna',
        'Evergreen; fronds stay green through winter'
      ],
      features: 'Evergreen, dark green fronds with boot-shaped pinnae. Fronds stay green through winter. The naked sori are found across the entire pinna on the upper half of the frond.'
    },
    {
      name: 'Lady Fern',
      scientific: 'Athyrium filix-femina',
      regions: ['northeast', 'atlantic', 'pacific-northwest', 'canada', 'uk', 'europe'],
      habitat: ['forest', 'stream'],
      frondType: 'twice',
      size: 'medium',
      texture: 'delicate',
      growthPattern: 'Clump-forming to short-creeping — upright crown, may spread slowly into patches',
      soriType: 'Curved linear (J- or horseshoe-shaped) — along vein endings, indusiate',
      features: 'Light green, delicate fronds in vase-like clusters. Very variable species with curved sori.'
    },
    {
      name: 'Cinnamon Fern',
      scientific: 'Osmundastrum cinnamomeum',
      regions: ['northeast', 'atlantic', 'canada'],
      habitat: ['wetland', 'stream'],
      frondType: 'twice',
      size: 'large',
      texture: 'delicate',
      growthPattern: 'Clump-forming crown — erect crown from stout short rhizome in wet soil',
      soriType: 'Separate fertile fronds — sporangia on dedicated brown fertile stems, not on green sterile blade',
      features: 'Separate fertile fronds turn cinnamon brown in spring. Woolly cinnamon-colored fiddleheads. A unique character is the white fuzzy dot at the intersection of the rachis and costa.'
    },
    {
      name: 'Maidenhair Fern',
      scientific: 'Adiantum pedatum',
      regions: ['northeast', 'atlantic', 'pacific-northwest', 'canada'],
      habitat: ['forest'],
      frondType: 'pedate',
      size: 'small',
      texture: 'delicate',
      growthPattern: 'Short-creeping patches — wiry rhizomes form loose colonies in humus',
      soriType: 'Marginal, false indusium — sori under rolled leaf margin segments along lobe tips',
      features: 'Distinctive horseshoe-shaped frond with black wiry stems. Very delicate appearance.'
    },
    {
      name: 'Bracken Fern',
      scientific: 'Pteridium aquilinum',
      regions: ['northeast', 'atlantic', 'pacific-northwest', 'canada', 'uk', 'europe'],
      habitat: ['open', 'forest'],
      frondType: 'thrice',
      size: 'large',
      texture: 'leathery',
      growthPattern: 'Long-creeping, colonial — extensive horizontal rhizomes, widely spaced fronds',
      soriType: 'Marginal, continuous — naked sori along pinna edges, often hard to see',
      uniqueCharacters: [
        'Triangular fronds held more or less horizontally (one main frond per stem)',
        'Thrice-divided (tripinnate or more), very lacy; forms extensive colonies',
        'Naked sori along the pinna margin; indusium absent; sori often hard to see'
      ],
      features: 'Aggressive spreader, triangular fronds held horizontally. Forms extensive colonies. The sori are found along the margin of pinna. They are naked without indusium. It is not common to find sori.'
    },
    {
      name: 'Hay-scented Fern',
      scientific: 'Dennstaedtia punctilobula',
      regions: ['northeast', 'atlantic', 'canada'],
      habitat: ['forest', 'open'],
      frondType: 'twice',
      size: 'medium',
      texture: 'hairy',
      growthPattern: 'Long-creeping, colonial — aggressive mats from slender rhizomes',
      soriType: 'Marginal cup — small cup-like indusia on recurved segment margins',
      features: 'Forms dense colonies, smells like hay when crushed. Yellow-green color, fine hairs.'
    },
    {
      name: 'Ostrich Fern',
      scientific: 'Matteuccia struthiopteris',
      regions: ['northeast', 'atlantic', 'pacific-northwest', 'canada'],
      habitat: ['stream', 'wetland'],
      frondType: 'twice',
      size: 'large',
      texture: 'delicate',
      growthPattern: 'Clump-forming (vase) — upright shuttlecock crown; may spread by rhizome in ideal sites',
      soriType: 'Separate fertile fronds — dense sporangia on persistent dark fertile fronds, sterile fronds lack blade sori',
      features: 'Tall vase-like clusters up to 6 feet. Separate brown fertile fronds in center persist through winter.'
    },
    {
      name: 'Walking Fern',
      scientific: 'Asplenium rhizophyllum',
      regions: ['northeast', 'atlantic', 'canada'],
      habitat: ['rock'],
      frondType: 'simple',
      size: 'small',
      texture: 'leathery',
      growthPattern: 'Creeping on rock — frond tips root; chain of rosettes along substrate',
      soriType: 'Linear along veins — oblong sori following veins on frond underside',
      uniqueCharacters: [
        'Fronds undivided (simple), long and tapering to a narrow tip',
        'Tip often roots where it touches rock or soil, forming new plants ("walking")',
        'Grows on rocks, especially limestone; small, leathery, dark green'
      ],
      features: 'Long tapering fronds that root at tips forming new plants. Grows on limestone rocks.'
    },
    {
      name: 'Sword Fern',
      scientific: 'Polystichum munitum',
      regions: ['pacific-northwest', 'canada'],
      habitat: ['forest'],
      frondType: 'once',
      size: 'large',
      texture: 'leathery',
      growthPattern: 'Clump-forming crown — short erect or ascending rhizome, shuttlecock silhouette',
      soriType: 'Round with peltate indusium — scattered on pinnule undersides',
      features: 'Evergreen, stiff upright fronds. Pinnae have pointed tips with small tooth. Most common fern in PNW forests.'
    },
    {
      name: 'Braun\'s Holly Fern',
      scientific: 'Polystichum braunii',
      regions: ['northeast', 'atlantic', 'pacific-northwest', 'canada'],
      habitat: ['forest', 'rock'],
      frondType: 'twice',
      size: 'medium',
      texture: 'leathery',
      growthPattern: 'Clump-forming crown — evergreen rosette from short rhizome',
      soriType: 'Round with peltate indusium — on pinnules like other Polystichum',
      features: 'Evergreen with glossy fronds covered in golden-brown scales. Pinnules have bristle-tipped teeth.'
    },
    {
      name: 'Anderson\'s Sword Fern',
      scientific: 'Polystichum andersonii',
      regions: ['pacific-northwest', 'canada'],
      habitat: ['forest'],
      frondType: 'twice',
      size: 'large',
      texture: 'leathery',
      growthPattern: 'Short-creeping clump — slowly spreading crown in moist forest',
      soriType: 'Round with peltate indusium — on pinnules; bulblets sometimes present',
      features: 'Similar to Western Sword Fern but bipinnate. Produces bulblets on fronds. Found in moist forests.'
    },
    {
      name: 'Kruckeberg\'s Sword Fern',
      scientific: 'Polystichum kruckebergii',
      regions: ['pacific-northwest', 'canada'],
      habitat: ['rock'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      growthPattern: 'Tufted — small tight crowns on rock from short rhizome',
      soriType: 'Round with peltate indusium — small round sori on pinnules',
      features: 'Small evergreen fern of rocky habitats. Narrow fronds with spiny-toothed pinnae. Endemic to PNW.'
    },
    {
      name: 'Imbricate Sword Fern',
      scientific: 'Polystichum imbricans',
      regions: ['pacific-northwest', 'canada'],
      habitat: ['rock', 'forest'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      growthPattern: 'Tufted to short-creep — compact crowns, often on rocky slopes',
      soriType: 'Round with peltate indusium — on undersides of overlapping pinnae',
      features: 'Compact evergreen fern with overlapping pinnae. Drought tolerant, often on rocky slopes.'
    },
    {
      name: 'Sensitive Fern',
      scientific: 'Onoclea sensibilis',
      regions: ['northeast', 'atlantic', 'canada'],
      habitat: ['wetland', 'stream', 'forest'],
      frondType: 'pinnatifid',
      size: 'medium',
      texture: 'delicate',
      growthPattern: 'Long-creeping, colonial — loose patches in moist soil',
      soriType: 'Bead-like on fertile fronds — separate fertile fronds with globose sporangial segments',
      uniqueCharacters: [
        'Sterile fronds broad, triangular, pinnatifid (deeply lobed); die at first frost',
        'Separate fertile fronds with bead-like segments; persist through winter',
        'Often in wet or moist sites; lobes of sterile frond with wavy margins'
      ],
      features: 'Broad triangular fronds, dies at first frost. Separate bead-like fertile fronds persist through winter.'
    },
    {
      name: 'Royal Fern',
      scientific: 'Osmunda regalis',
      regions: ['northeast', 'atlantic', 'canada', 'uk', 'europe'],
      habitat: ['wetland', 'stream'],
      frondType: 'twice',
      size: 'large',
      texture: 'delicate',
      growthPattern: 'Clump-forming crown — large vase-shaped crown from short rhizome',
      soriType: 'Clustered at fertile pinna tips — naked sporangia on modified upper pinnae (tassel-like)',
      uniqueCharacters: [
        'Fertile pinnae at the tip of the frond only, tassel-like and brown when mature',
        'Tall, twice-divided (bipinnate) sterile foliage; can tolerate sun',
        'Typically in wet soil, stream edges, or swamps'
      ],
      features: 'Tall stately fern with distinctive tassel-like fertile pinnae at frond tips. Tolerates sun.'
    },
    {
      name: 'Interrupted Fern',
      scientific: 'Osmunda claytoniana',
      regions: ['northeast', 'atlantic', 'canada'],
      habitat: ['forest', 'wetland'],
      frondType: 'twice',
      size: 'large',
      texture: 'delicate',
      growthPattern: 'Clump-forming crown — large circular clumps, short rhizome',
      soriType: 'Naked clusters on fertile pinnae — fertile segments mid-blade, wither and leave gaps',
      uniqueCharacters: [
        'Fertile pinnae in the middle of the frond; wither and drop off, leaving a visible gap',
        'Twice-divided (bipinnate), large; sterile pinnae similar to cinnamon fern but no wool',
        'Often forms large circular clumps in moist woods'
      ],
      features: 'Fertile pinnae interrupt middle of frond, wither and fall off. Forms large circular clumps.'
    },
    {
      name: 'New York Fern',
      scientific: 'Thelypteris noveboracensis',
      regions: ['northeast', 'atlantic', 'canada'],
      habitat: ['forest', 'wetland'],
      frondType: 'twice',
      size: 'medium',
      texture: 'delicate',
      growthPattern: 'Long-creeping, colonial — slender rhizomes, scattered fronds',
      soriType: 'Round with kidney-shaped indusium — small round sori on pinnules',
      features: 'Distinctive tapering at both top and bottom of frond. Forms colonies, yellow-green color.'
    },
    {
      name: 'Netted Chain Fern',
      scientific: 'Woodwardia areolata',
      regions: ['northeast', 'canada'],
      habitat: ['wetland'],
      frondType: 'once',
      size: 'medium',
      texture: 'delicate',
      growthPattern: 'Short- to long-creeping, colonial — spreading patches in wet woods',
      soriType: 'Chain-like (catenulate) — elongated sori joined in rows between veins',
      features: 'Once-divided fronds in wet places. Net-like vein pattern. Often in swamps and wet woods.'
    },
    {
      name: 'Marginal Wood Fern',
      scientific: 'Dryopteris marginalis',
      regions: ['northeast', 'atlantic', 'canada'],
      habitat: ['forest', 'rock'],
      frondType: 'twice',
      size: 'medium',
      texture: 'leathery',
      growthPattern: 'Clump-forming crown — short erect rhizome, evergreen rosette',
      soriType: 'Round with kidney-shaped indusium — near margins of pinnules',
      features: 'Semi-evergreen with blue-green fronds. Sori at margins of pinnules. Common in rocky woods.'
    },
    {
      name: 'Marsh Fern',
      scientific: 'Thelypteris palustris',
      regions: ['northeast', 'atlantic', 'pacific-northwest', 'canada', 'uk', 'europe'],
      habitat: ['wetland', 'stream'],
      frondType: 'once',
      size: 'medium',
      texture: 'delicate',
      growthPattern: 'Long-creeping, colonial — forms patches in wet ground',
      soriType: 'Round with kidney-shaped indusium — on pinnules, marsh fern pattern',
      features: 'Narrow fronds with pinnae nearly perpendicular to rachis. Grows in very wet areas. The sori cover the underside of a pinna and cause the pinna to be cupped. Thelypteris palustris can be mistaken for Thelypteris noveboracensis and Coryphopteris simulata.'
    },
    {
      name: 'Ebony Spleenwort',
      scientific: 'Asplenium platyneuron',
      regions: ['northeast', 'atlantic', 'canada'],
      habitat: ['rock', 'forest'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      growthPattern: 'Short-creeping tufts — small crowns along cracks and walls',
      soriType: 'Linear along lateral veins — oblong, often angled, indusiate',
      features: 'Small evergreen fern with dark brown to black stems. Pinnae alternate along stem.'
    },
    {
      name: 'Maidenhair Spleenwort',
      scientific: 'Asplenium trichomanes',
      regions: ['northeast', 'atlantic', 'pacific-northwest', 'canada', 'uk', 'europe', 'iceland'],
      habitat: ['rock'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      growthPattern: 'Tufted — dense cushions in rock crevices from short branched rhizome',
      soriType: 'Linear oblong — along veins on pinnules, one-sided indusium',
      features: 'Delicate evergreen with shiny black stems. Tiny round pinnae. Grows in rock crevices.'
    },
    {
      name: 'Common Polypody',
      scientific: 'Polypodium virginianum',
      regions: ['northeast', 'atlantic', 'canada'],
      habitat: ['rock', 'forest'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      growthPattern: 'Rock-creeping — long creeping rhizome on bark or stone',
      soriType: 'Round, naked — no indusium, sunken or flat round sori',
      uniqueCharacters: [
        'Once-pinnate, evergreen; small leathery fronds on rocks, logs, or stumps',
        'Pinnae deeply lobed; round sori in two rows on underside, no indusium',
        'Often on neutral to calcareous rock; drought tolerant'
      ],
      features: 'Evergreen, grows on rocks and stumps. Deeply lobed pinnae, leathery texture. Drought tolerant.'
    },
    {
      name: 'Spinulose Wood Fern',
      scientific: 'Dryopteris carthusiana',
      regions: ['northeast', 'atlantic', 'pacific-northwest', 'canada', 'uk', 'europe'],
      habitat: ['forest', 'wetland'],
      frondType: 'thrice',
      size: 'medium',
      texture: 'delicate',
      growthPattern: 'Clump-forming crown — short-creeping erect crown',
      soriType: 'Round with kidney-shaped indusium — on pinnule undersides',
      features: 'Lacy appearance with finely divided fronds. Semi-evergreen. Very common in moist woods.'
    },
    {
      name: 'Intermediate Wood Fern',
      scientific: 'Dryopteris intermedia',
      regions: ['northeast', 'atlantic', 'canada'],
      habitat: ['forest', 'rock'],
      frondType: 'thrice',
      size: 'medium',
      texture: 'delicate',
      growthPattern: 'Clump-forming to short-creep — upright crown, may clump widely',
      soriType: 'Round with kidney-shaped indusium — wood fern pattern',
      features: 'Similar to Spinulose but more evergreen. Lowest pinnule on bottom pinnae longest.'
    },
    {
      name: 'Long Beech Fern',
      scientific: 'Phegopteris connectilis',
      regions: ['northeast', 'atlantic', 'pacific-northwest', 'canada', 'uk', 'europe', 'iceland'],
      habitat: ['forest', 'rock'],
      frondType: 'pinnatifid',
      size: 'small',
      texture: 'delicate',
      growthPattern: 'Long-creeping, colonial — slender rhizomes, beech-fern mats',
      soriType: 'Round — small round sori near vein endings, indusiate',
      features: 'Triangular fronds with bottom pinnae pointing downward. Grows in cool, moist woods.'
    },
    {
      name: 'Broad Beech Fern',
      scientific: 'Phegopteris hexagonoptera',
      regions: ['northeast', 'atlantic', 'canada'],
      habitat: ['forest'],
      frondType: 'pinnatifid',
      size: 'medium',
      texture: 'delicate',
      growthPattern: 'Long-creeping, colonial — broad-triangle fronds from creeping rhizome',
      soriType: 'Round — on pinnules, broad beech-fern',
      features: 'Broadly triangular fronds held horizontally. Bottom pinnae very large. Forms colonies.'
    },
    {
      name: 'Oak Fern',
      scientific: 'Gymnocarpium dryopteris',
      regions: ['northeast', 'atlantic', 'pacific-northwest', 'canada', 'uk', 'europe', 'iceland'],
      habitat: ['forest', 'rock'],
      frondType: 'twice',
      size: 'small',
      texture: 'delicate',
      growthPattern: 'Long-creeping, colonial — triangular fronds from widely creeping rhizome',
      soriType: 'Round — small round sori at vein tips, thin indusium',
      features: 'Delicate triangular fronds in three sections. Forms extensive colonies in cool woods.'
    },
    {
      name: 'Bulblet Fern',
      scientific: 'Cystopteris bulbifera',
      regions: ['northeast', 'atlantic', 'canada'],
      habitat: ['rock', 'stream'],
      frondType: 'twice',
      size: 'medium',
      texture: 'delicate',
      growthPattern: 'Short-creeping clusters — bulblets aid spread along moist rock',
      soriType: 'Round — small sori with hood-like indusium',
      features: 'Long narrow fronds with tiny bulblets underneath. Grows on moist limestone cliffs.'
    },
    {
      name: 'Fragile Fern',
      scientific: 'Cystopteris fragilis',
      regions: ['northeast', 'atlantic', 'pacific-northwest', 'canada', 'uk', 'europe', 'iceland'],
      habitat: ['rock'],
      frondType: 'twice',
      size: 'small',
      texture: 'delicate',
      growthPattern: 'Tufted to short-creep — small crowns, cracks and talus',
      soriType: 'Round — bladder-fern round sori with hood indusium',
      features: 'Very delicate, brittle fronds. Grows in rock crevices, especially limestone.'
    },
    {
      name: 'Silvery Glade Fern',
      scientific: 'Deparia acrostichoides',
      regions: ['northeast', 'atlantic', 'canada'],
      habitat: ['forest', 'stream'],
      frondType: 'once',
      size: 'medium',
      texture: 'delicate',
      growthPattern: 'Long-creeping, colonial — silvery fiddleheads from creeping rhizome',
      soriType: 'Linear along veins — silvery sori, indusiate along costae or veins',
      features: 'Silvery appearance from indusial covering on sori. Prefers rich, moist soil.'
    },
    {
      name: 'Goldie\'s Fern',
      scientific: 'Dryopteris goldiana',
      regions: ['northeast', 'atlantic', 'canada'],
      habitat: ['forest'],
      frondType: 'twice',
      size: 'large',
      texture: 'leathery',
      growthPattern: 'Clump-forming crown — large rosette from short rhizome',
      soriType: 'Round with kidney-shaped indusium — large wood fern sori',
      features: 'Large impressive fern up to 4 feet. Broadest near middle. Rich moist woods.'
    },
    {
      name: 'Crested Wood Fern',
      scientific: 'Dryopteris cristata',
      regions: ['northeast', 'atlantic', 'canada', 'uk', 'europe'],
      habitat: ['wetland', 'forest'],
      frondType: 'twice',
      size: 'medium',
      texture: 'leathery',
      growthPattern: 'Clump-forming to short-creep — wetland crowns, may form patches',
      soriType: 'Round with kidney-shaped indusium — fertile tip often with crested sporangia',
      features: 'Fertile fronds narrow and upright, sterile fronds shorter and spreading. Wet woods and swamps.'
    },
    {
      name: 'Clinton\'s Wood Fern',
      scientific: 'Dryopteris clintoniana',
      regions: ['northeast', 'atlantic', 'canada'],
      habitat: ['wetland', 'forest'],
      frondType: 'twice',
      size: 'large',
      texture: 'leathery',
      growthPattern: 'Clump-forming crown — hybrid complex habit like wood ferns',
      soriType: 'Round with kidney-shaped indusium — hybrid-type wood fern',
      features: 'Hybrid between Crested and Goldie\'s fern. Larger than Crested, grows in wet areas.'
    },
    {
      name: 'Purple-stemmed Cliff Brake',
      scientific: 'Pellaea atropurpurea',
      regions: ['northeast', 'atlantic', 'canada'],
      habitat: ['rock'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      growthPattern: 'Short-creeping tufts — rock and cliff clusters',
      soriType: 'Linear along veins — sori along segment midribs, false indusium from reflexed margin',
      features: 'Blue-green fronds with dark purple stems. Grows on dry limestone cliffs and rocks.'
    },
    {
      name: 'Rock Cap Fern',
      scientific: 'Polypodium appalachianum',
      regions: ['northeast', 'atlantic', 'canada'],
      habitat: ['rock'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      growthPattern: 'Rock-creeping — mat-forming rhizome on rock',
      soriType: 'Round, naked — like polypodies, no indusium',
      uniqueCharacters: [
        'Once-pinnate, evergreen; small leathery fronds on rock, especially acidic (e.g. sandstone)',
        'Very similar to Common Polypody; best told by substrate and range (e.g. Appalachian region)',
        'Round sori in two rows on underside, no indusium; pinnae often with pointed tips'
      ],
      features: 'Evergreen, grows on acidic rocks. Similar to Common Polypody but prefers acidic substrates.'
    },
    {
      name: 'Rattlesnake Fern',
      scientific: 'Botrypus virginianus',
      regions: ['northeast', 'atlantic', 'pacific-northwest', 'canada'],
      habitat: ['forest', 'open'],
      frondType: 'thrice',
      size: 'small',
      texture: 'delicate',
      growthPattern: 'Subterranean tuber-like stem — solitary or few fronds from buried stem',
      soriType: 'Sporangia on fertile spike — grape-fern fertile branch bears sporangia, not blade sori',
      features: 'Single broadly triangular sterile frond with separate fertile spike. Related to grape ferns.'
    },
    {
      name: 'Cut-leaved Grape Fern',
      scientific: 'Sceptridium dissectum',
      regions: ['northeast', 'atlantic', 'canada'],
      habitat: ['forest', 'open'],
      frondType: 'thrice',
      size: 'small',
      texture: 'leathery',
      growthPattern: 'Short rhizome, scattered — grape-fern habit, fronds from underground stem',
      soriType: 'Sporangia on fertile spike — dissected sterile blade; fertile spike with sporangia',
      features: 'Bronze-green fronds appear in autumn, persist through winter. Separate fertile spike.'
    },
    {
      name: 'Northern Lady Fern',
      scientific: 'Athyrium angustum',
      regions: ['northeast', 'atlantic', 'pacific-northwest', 'canada'],
      habitat: ['forest', 'wetland'],
      frondType: 'twice',
      size: 'medium',
      texture: 'delicate',
      growthPattern: 'Clump-forming crown — similar to lady fern, upright cluster',
      soriType: 'Curved linear — like lady fern along vein endings',
      features: 'Similar to Lady Fern but more northern. Lighter green, more upright growth.'
    },
    {
      name: 'Hart\'s-tongue Fern',
      scientific: 'Asplenium scolopendrium',
      regions: ['uk', 'europe'],
      habitat: ['rock', 'forest'],
      frondType: 'simple',
      size: 'medium',
      texture: 'leathery',
      growthPattern: 'Short-creeping rosettes — tongue fronds in tufts along basic rock',
      soriType: 'Linear oblong — on one side of veins, indusiate',
      features: 'Distinctive undivided strap-like fronds with wavy edges. Evergreen, glossy bright green. Prefers limestone.'
    },
    {
      name: 'Male Fern',
      scientific: 'Dryopteris filix-mas',
      regions: ['northeast', 'pacific-northwest', 'canada', 'uk', 'europe', 'iceland'],
      habitat: ['forest', 'rock'],
      frondType: 'twice',
      size: 'large',
      texture: 'leathery',
      growthPattern: 'Clump-forming crown — classic male-fern shuttlecock from short rhizome',
      soriType: 'Round with kidney-shaped indusium — classic male-fern sori',
      features: 'Robust semi-evergreen fern with golden-brown scales on stems. Very common in woodlands. Fronds arch gracefully.'
    },
    {
      name: 'Adder\'s Tongue',
      scientific: 'Ophioglossum vulgatum',
      regions: ['uk', 'europe'],
      habitat: ['open', 'wetland'],
      frondType: 'simple',
      size: 'small',
      texture: 'delicate',
      growthPattern: 'Small rosette — short underground stem, few fronds per year',
      soriType: 'Sporangia on separate fertile spike — simple blade; spike bears sporangia',
      features: 'Small fern with a single simple sterile blade and separate fertile spike bearing sporangia. Grassland, meadows, and damp places in the British Isles.'
    },
    {
      name: 'Small Adder\'s Tongue',
      scientific: 'Ophioglossum azoricum',
      regions: ['uk', 'europe'],
      habitat: ['wetland', 'open'],
      frondType: 'simple',
      size: 'small',
      texture: 'delicate',
      growthPattern: 'Small rosette — tiny plants in short turf',
      soriType: 'Sporangia on fertile spike — tiny adders-tongue spike',
      features: 'Tiny; very rare in the British Isles (e.g. western Ireland, Scilly). Damp short turf and mossy ground.'
    },
    {
      name: 'Least Adder\'s Tongue',
      scientific: 'Ophioglossum lusitanicum',
      regions: ['uk', 'europe'],
      habitat: ['wetland', 'open'],
      frondType: 'simple',
      size: 'small',
      texture: 'delicate',
      growthPattern: 'Small rosette — minute seasonal shoots from short stem',
      soriType: 'Sporangia on fertile spike — minute fertile segment',
      features: 'Minute; rare in southwest England and Wales. Seasonally wet, often bare ground on heaths.'
    },
    {
      name: 'Rustyback',
      scientific: 'Asplenium ceterach',
      regions: ['uk', 'europe'],
      habitat: ['rock'],
      frondType: 'pinnatifid',
      size: 'small',
      texture: 'leathery',
      growthPattern: 'Tufted mats — short-creeping on mortar and limestone',
      soriType: 'Linear along veins — rusty-backed sori, indusiate',
      features: 'Gray-green pinnatifid fronds; underside turns rusty brown. Walls, mortar, and limestone rocks.'
    },
    {
      name: 'Holly Fern',
      scientific: 'Polystichum lonchitis',
      regions: ['uk', 'europe', 'iceland'],
      habitat: ['rock', 'forest'],
      frondType: 'once',
      size: 'medium',
      texture: 'leathery',
      growthPattern: 'Clump-forming crown — stiff rosette, short erect rhizome',
      soriType: 'Round with peltate indusium — holly fern pattern',
      features: 'Evergreen; stiff dark fronds with spine-tipped pinnae. Montane rocks and ledges in Scotland and north.'
    },
    {
      name: 'Green Spleenwort',
      scientific: 'Asplenium viride',
      regions: ['uk', 'europe', 'iceland'],
      habitat: ['rock'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      growthPattern: 'Tufted — bright green rosettes in basic rock crevices',
      soriType: 'Linear oblong — along veins on pinnae',
      features: 'Bright green pinnae on dark stems. Basic rocks, montane; Scottish Highlands and north Wales.'
    },
    {
      name: 'Sea Spleenwort',
      scientific: 'Asplenium marinum',
      regions: ['uk', 'europe'],
      habitat: ['rock'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      growthPattern: 'Tufted to short-creep — coastal rock and wall clusters',
      soriType: 'Linear — along veins, sea spleenwort',
      features: 'Thick leathery fronds; tolerates sea spray. Coastal rocks, crevices, and walls.'
    },
    {
      name: 'Moonwort',
      scientific: 'Botrychium lunaria',
      regions: ['uk', 'europe', 'iceland'],
      habitat: ['open', 'forest'],
      frondType: 'simple',
      size: 'small',
      texture: 'delicate',
      growthPattern: 'Small rosette — single frond pair from subterranean gametophyte-linked stem',
      soriType: 'Sporangia on fertile segment — moonwort sporangia on branched fertile part',
      features: 'Small sterile fan-shaped blade and erect fertile segment with grape-like sporangia. Unimproved grassland, uplands; widespread but local.'
    },
    {
      name: 'Hard Fern',
      scientific: 'Struthiopteris spicant',
      regions: ['uk', 'europe', 'iceland'],
      habitat: ['forest'],
      frondType: 'once',
      size: 'medium',
      texture: 'leathery',
      growthPattern: 'Dimorphic rosettes — short-creeping, sterile mats with erect fertile shoots',
      soriType: 'Linear on fertile fronds — separate erect fertile fronds with continuous sori; sterile pinnae lack typical round sori',
      features: 'Dimorphic: flat dark sterile fronds and erect fertile fronds with narrow segments. Acid woodland and moorland; also known as Blechnum spicant.'
    },
    {
      name: 'Southern Polypody',
      scientific: 'Polypodium cambricum',
      regions: ['uk', 'europe'],
      habitat: ['rock', 'forest'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      growthPattern: 'Creeping on rock and bark — long rhizome, spaced fronds',
      soriType: 'Round, naked — polypody sori without indusium',
      features: 'Evergreen polypody; often on rocks and trees. Mainly western and southern Britain and Ireland.'
    },
    {
      name: 'Intermediate Polypody',
      scientific: 'Polypodium interjectum',
      regions: ['uk', 'europe'],
      habitat: ['rock', 'forest'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      growthPattern: 'Creeping — mat-forming rhizome on walls and trees',
      soriType: 'Round, naked — sunken round sori',
      features: 'Hybrid-derived aggregate member; evergreen on rocks, walls, and bark. Widespread in the British Isles.'
    },
    {
      name: 'Polypody',
      scientific: 'Polypodium vulgare',
      regions: ['uk', 'europe'],
      habitat: ['rock', 'forest'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      growthPattern: 'Creeping — long-creeping evergreen rhizome, colonial on substrate',
      soriType: 'Round, naked — common polypody pattern',
      features: 'Common evergreen polypody on rocks, walls, and tree trunks. The typical Polypodium of the British Isles (distinct from North American P. virginianum).'
    },
    {
      name: 'Killarney Fern',
      scientific: 'Vandenboschia speciosa',
      regions: ['uk', 'europe'],
      habitat: ['wetland', 'rock'],
      frondType: 'twice',
      size: 'medium',
      texture: 'delicate',
      growthPattern: 'Creeping mat — thin rhizome in deep shade on wet rock',
      soriType: 'Tubular involucre — filmy fern sporangia often in fused cup or tube',
      features: 'Rare filmy fern; translucent fronds. Deeply shaded humid rock crevices and gorges, mainly western Ireland and Britain.'
    },
    {
      name: 'Tunbridge Filmy-fern',
      scientific: 'Hymenophyllum tunbridgense',
      regions: ['uk', 'europe'],
      habitat: ['rock', 'forest'],
      frondType: 'twice',
      size: 'small',
      texture: 'delicate',
      growthPattern: 'Creeping mat — filmy fronds from thread-like rhizome on wet rock',
      soriType: 'Marginal or immersed — filmy fern; sporangia in marginal or enclosed structures',
      features: 'One cell thick; requires constant moisture. Shaded wet rocks and banks, mainly western Britain and Ireland. Epithet often spelled tunbridgense (from Tunbridge Wells); synonym H. tunbrigense in some checklists.'
    },
    {
      name: 'Wilson\'s Filmy-fern',
      scientific: 'Hymenophyllum wilsonii',
      regions: ['uk', 'europe'],
      habitat: ['rock', 'forest'],
      frondType: 'twice',
      size: 'small',
      texture: 'delicate',
      growthPattern: 'Creeping mat — similar filmy habit on damp rock',
      soriType: 'Marginal or immersed — similar filmy-fern habit',
      features: 'Similar to Tunbridge; on damp shaded rocks, especially in the west.'
    },
    {
      name: 'Forked Spleenwort',
      scientific: 'Asplenium septentrionale',
      regions: ['uk', 'europe'],
      habitat: ['rock'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      growthPattern: 'Tufted — forked fronds in basic rock crevices',
      soriType: 'Linear along veins — forked spleenwort',
      features: 'Forked pinnae; basic rock crevices. Local in Scotland, north Wales, and northern England.'
    },
    {
      name: 'Wall-rue',
      scientific: 'Asplenium ruta-muraria',
      regions: ['uk', 'europe'],
      habitat: ['rock'],
      frondType: 'pinnatifid',
      size: 'small',
      texture: 'leathery',
      growthPattern: 'Tufted cushions — wall and mortar mats from short rhizome',
      soriType: 'Linear oblong — along veins, wall-rue',
      features: 'Small blue-green pinnatifid fronds. Mortar, old walls, and limestone.'
    },
    {
      name: 'Maidenhair Fern (Southern)',
      scientific: 'Adiantum capillus-veneris',
      regions: ['uk', 'europe'],
      habitat: ['rock', 'stream'],
      frondType: 'twice',
      size: 'medium',
      texture: 'delicate',
      growthPattern: 'Short-creeping patches — black stems, loose colonies in lime',
      soriType: 'Marginal, false indusium — maidenhair sori under reflexed margins',
      features: 'Fan-shaped leaflets on black stalks; needs humid lime-rich or coastal sites. Southwest England, Ireland, Wales; not the North American A. pedatum.'
    },
    {
      name: 'Jersey Fern',
      scientific: 'Anogramma leptophylla',
      regions: ['uk'],
      habitat: ['rock'],
      frondType: 'twice',
      size: 'small',
      texture: 'delicate',
      growthPattern: 'Tiny tufts — short rhizome, scattered delicate plants',
      soriType: 'Linear along veins — tiny sori following veins',
      features: 'Very rare; tiny delicate fern. Sheltered rocky places; mainly Channel Islands and a few mainland sites.'
    },
    {
      name: 'Alpine Woodsia',
      scientific: 'Woodsia alpina',
      regions: ['uk', 'europe'],
      habitat: ['rock'],
      frondType: 'twice',
      size: 'small',
      texture: 'delicate',
      growthPattern: 'Tufted — dense small crowns in montane crevices',
      soriType: 'Round with hood-like indusium — Woodsia cup under indusium',
      features: 'Small tufted fern of montane basic rock crevices. Scottish Highlands.'
    },
    {
      name: 'Oblong Woodsia',
      scientific: 'Woodsia ilvensis',
      regions: ['uk', 'europe'],
      habitat: ['rock'],
      frondType: 'twice',
      size: 'small',
      texture: 'delicate',
      growthPattern: 'Tufted — rusty-scaly crowns, short rhizome on rock',
      soriType: 'Round with hood-like indusium — hairy woodsia',
      features: 'Rusty-hairy stipes; rocks and cliffs. Northern and western Britain, local.'
    },
    {
      name: 'Lanceolate Spleenwort',
      scientific: 'Asplenium obovatum subsp. lanceolatum',
      regions: ['uk', 'europe'],
      habitat: ['rock'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      growthPattern: 'Tufted — coastal rock clusters',
      soriType: 'Linear along veins — coastal spleenwort',
      features: 'Coastal rocks and walls; southwest England, Wales, Ireland, Isles of Scilly.'
    },
    {
      name: 'Black Spleenwort',
      scientific: 'Asplenium adiantum-nigrum',
      regions: ['uk', 'europe'],
      habitat: ['rock', 'forest'],
      frondType: 'twice',
      size: 'medium',
      texture: 'leathery',
      growthPattern: 'Short-creeping clumps — rosettes spreading on basic ground',
      soriType: 'Linear along veins — black spleenwort pattern',
      features: 'Dark stalks, triangular blade; basic rocks, walls, and woodland. Widespread in the British Isles.'
    },
    {
      name: 'Rigid Buckler-fern',
      scientific: 'Dryopteris submontana',
      regions: ['uk', 'europe'],
      habitat: ['rock', 'forest'],
      frondType: 'twice',
      size: 'medium',
      texture: 'leathery',
      growthPattern: 'Clump-forming crown — limestone male-fern complex habit',
      soriType: 'Round with kidney-shaped indusium — rigid buckler',
      features: 'Compact evergreen; limestone rocks and scree. North Wales, northern England, Scotland.'
    },
    {
      name: 'Mountain Male-fern',
      scientific: 'Dryopteris oreades',
      regions: ['uk', 'europe'],
      habitat: ['rock', 'forest'],
      frondType: 'twice',
      size: 'medium',
      texture: 'leathery',
      growthPattern: 'Clump-forming crown — montane rosettes, short rhizome',
      soriType: 'Round with kidney-shaped indusium — mountain male-fern',
      features: 'Montane rocky habitats; similar to other male-ferns. Scottish Highlands and north.'
    },
    {
      name: 'Golden Scaly Male-fern',
      scientific: 'Dryopteris affinis',
      regions: ['uk', 'europe'],
      habitat: ['forest', 'stream'],
      frondType: 'twice',
      size: 'large',
      texture: 'leathery',
      growthPattern: 'Clump-forming crown — large scaly shuttlecock clumps',
      soriType: 'Round with kidney-shaped indusium — golden-scaled male-fern',
      features: 'Large evergreen with golden scales on stipe; wet woods and stream sides. Widespread in the British Isles.'
    },
    {
      name: 'Borrer\'s Scaly Male-fern',
      scientific: 'Dryopteris borreri',
      regions: ['uk', 'europe'],
      habitat: ['forest'],
      frondType: 'twice',
      size: 'large',
      texture: 'leathery',
      growthPattern: 'Clump-forming crown — woodland rosette, short rhizome',
      soriType: 'Round with kidney-shaped indusium — scaly male-fern complex',
      features: 'Part of the Dryopteris affinis complex; woodland and shady places.'
    },
    {
      name: 'Narrow Scaly Male-fern',
      scientific: 'Dryopteris cambrensis',
      regions: ['uk'],
      habitat: ['forest', 'rock'],
      frondType: 'twice',
      size: 'medium',
      texture: 'leathery',
      growthPattern: 'Clump-forming crown — Scottish aggregate, tight crowns',
      soriType: 'Round with kidney-shaped indusium — narrow scaly male-fern',
      features: 'Scottish endemic aggregate taxon; rocky woods and montane areas.'
    },
    {
      name: 'Alpine Lady-fern',
      scientific: 'Athyrium distentifolium',
      regions: ['uk', 'europe', 'iceland'],
      habitat: ['rock', 'forest'],
      frondType: 'twice',
      size: 'medium',
      texture: 'delicate',
      growthPattern: 'Clump-forming crown — alpine lady-fern tufts',
      soriType: 'Curved linear — alpine lady-fern like Athyrium',
      features: 'Montane lady-fern of cool rocky places and high ground. Scottish Highlands (also recorded as Pseudathyrium distentifolium).'
    },
    {
      name: 'Flexile Lady-fern',
      scientific: 'Athyrium distentifolium var. flexile',
      regions: ['uk'],
      habitat: ['rock', 'forest'],
      frondType: 'twice',
      size: 'medium',
      texture: 'delicate',
      growthPattern: 'Clump-forming crown — arching-frond variety, montane',
      soriType: 'Curved linear — same genus pattern',
      features: 'Variety of alpine lady-fern with more arching fronds; montane rocks and ledges, mainly Scotland.'
    },
    {
      name: 'Lemon-scented Fern',
      scientific: 'Oreopteris limbosperma',
      regions: ['uk', 'europe'],
      habitat: ['forest', 'wetland'],
      frondType: 'twice',
      size: 'medium',
      texture: 'delicate',
      growthPattern: 'Clump-forming to tussock — lemon-scented upright crowns',
      soriType: 'Round with kidney-shaped indusium — lemon-scented fern',
      features: 'Smells of lemon when crushed; upland moors, woods, and acidic soils. Widespread in Britain and Ireland.'
    },
    {
      name: 'Soft Shield-fern',
      scientific: 'Polystichum setiferum',
      regions: ['uk', 'europe'],
      habitat: ['forest', 'rock'],
      frondType: 'twice',
      size: 'medium',
      texture: 'leathery',
      growthPattern: 'Clump-forming crown — soft shield rosette, short rhizome',
      soriType: 'Round with peltate indusium — soft shield-fern',
      features: 'Common evergreen with finely divided soft pinnae. Hedges, woods, and rocky banks.'
    },
    {
      name: 'Hard Shield-fern',
      scientific: 'Polystichum aculeatum',
      regions: ['uk', 'europe'],
      habitat: ['forest', 'rock'],
      frondType: 'twice',
      size: 'medium',
      texture: 'leathery',
      growthPattern: 'Clump-forming crown — stiff rosette from short erect rhizome',
      soriType: 'Round with peltate indusium — hard shield-fern',
      features: 'Stiffer than soft shield-fern; spine-tipped pinnae. Woods, rocks, and walls.'
    },
    {
      name: 'Diaphanous Bladder-fern',
      scientific: 'Cystopteris diaphana',
      regions: ['uk', 'europe'],
      habitat: ['rock'],
      frondType: 'twice',
      size: 'small',
      texture: 'delicate',
      growthPattern: 'Tufted — small fragile crowns, montane/western',
      soriType: 'Round — bladder-fern hood indusium',
      features: 'Similar to brittle bladder-fern; montane and western oceanic sites.'
    },
    {
      name: 'Dickie\'s Bladder-fern',
      scientific: 'Cystopteris dickieana',
      regions: ['uk'],
      habitat: ['rock'],
      frondType: 'twice',
      size: 'small',
      texture: 'delicate',
      growthPattern: 'Tufted — local coastal and basic-rock clusters',
      soriType: 'Round — bladder-fern',
      features: 'Coastal and basic rocks; northeast Scotland and Orkney, local elsewhere.'
    },
    {
      name: 'Pinewood Bracken',
      scientific: 'Pteridium pinetorum',
      regions: ['uk', 'europe'],
      habitat: ['forest'],
      frondType: 'thrice',
      size: 'large',
      texture: 'leathery',
      growthPattern: 'Long-creeping, colonial — like bracken, wide rhizome systems',
      soriType: 'Marginal, naked — like bracken along pinna margins',
      features: 'Often treated as part of or closely related to P. aquilinum (e.g. subsp. pinetorum or regional segregate); typical in pinewoods and open woodland in Britain, Ireland, and parts of Europe.'
    },
    {
      name: 'Limestone Fern',
      scientific: 'Gymnocarpium robertianum',
      regions: ['uk', 'europe'],
      habitat: ['rock'],
      frondType: 'twice',
      size: 'small',
      texture: 'delicate',
      growthPattern: 'Short-creep to tufted — limestone pavements, small crowns',
      soriType: 'Round — small at vein endings',
      features: 'Delicate triangular fronds; limestone pavements and basic rocks. North and west Britain, local.'
    },
    {
      name: 'Parsley Fern',
      scientific: 'Cryptogramma crispa',
      regions: ['uk', 'europe'],
      habitat: ['rock'],
      frondType: 'twice',
      size: 'small',
      texture: 'delicate',
      growthPattern: 'Tufted rosettes — parsley sterile fronds in dense mats',
      soriType: 'Round on sterile fronds — fertile fronds narrow with linear sporangia along segments',
      features: 'Sterile fronds parsley-like, fertile taller and narrow. Montane rocks and scree.'
    },
    {
      name: 'Mountain Bladder-fern',
      scientific: 'Cystopteris montana',
      regions: ['uk', 'europe'],
      habitat: ['rock'],
      frondType: 'twice',
      size: 'small',
      texture: 'delicate',
      growthPattern: 'Tufted — alpine bladder-fern clusters',
      soriType: 'Round — alpine bladder-fern',
      features: 'Montane rock crevices; Scottish Highlands and rare elsewhere.'
    },
    {
      name: 'Irish Spleenwort',
      scientific: 'Asplenium onopteris',
      regions: ['uk', 'europe'],
      habitat: ['rock'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      growthPattern: 'Tufted — Irish spleenwort habit in rock',
      soriType: 'Linear along veins — Irish spleenwort',
      features: 'Similar to maidenhair spleenwort; basic rocks. Ireland, western Britain, local.'
    },
    {
      name: 'Hay-scented Buckler-fern',
      scientific: 'Dryopteris aemula',
      regions: ['uk', 'europe'],
      habitat: ['forest', 'wetland'],
      frondType: 'twice',
      size: 'medium',
      texture: 'delicate',
      growthPattern: 'Clump-forming crown — hay-scented relative habit, woodland clump',
      soriType: 'Round with kidney-shaped indusium — hay-scented relative',
      features: 'Hay scent when crushed; moist Atlantic woodland. West Britain and Ireland.'
    },
    {
      name: 'Northern Buckler-fern',
      scientific: 'Dryopteris expansa',
      regions: ['uk', 'europe', 'iceland'],
      habitat: ['forest', 'wetland'],
      frondType: 'twice',
      size: 'medium',
      texture: 'delicate',
      growthPattern: 'Short-creeping clump — spreading wood fern rosettes',
      soriType: 'Round with kidney-shaped indusium — spreading wood fern',
      features: 'Moist woods, stream sides, and uplands; northern and western British Isles.'
    },
    {
      name: 'Broad Buckler-fern',
      scientific: 'Dryopteris dilatata',
      regions: ['uk', 'europe'],
      habitat: ['forest', 'wetland'],
      frondType: 'twice',
      size: 'medium',
      texture: 'delicate',
      growthPattern: 'Clump-forming crown — broad buckler shuttlecock',
      soriType: 'Round with kidney-shaped indusium — broad buckler',
      features: 'Common in damp acid woodland and moorland edges; very widespread in the British Isles.'
    },
    {
      name: 'Soft Tree Fern (Kātote)',
      scientific: 'Cyathea smithii',
      regions: ['new-zealand'],
      habitat: ['forest'],
      frondType: 'twice',
      size: 'large',
      texture: 'leathery',
      growthPattern: 'Arborescent — trunk-like stem, crown of large fronds aloft',
      soriType: 'Round on pinnules with indusium — tree fern sori, often cup- or scale-covered',
      features: 'New Zealand tree fern. Also known as Kātote. Large fern with trunk; soft fronds.'
    },
    {
      name: 'Kidney Fern',
      scientific: 'Trichomanes reniforme',
      regions: ['new-zealand'],
      habitat: ['wetland', 'rock', 'forest'],
      frondType: 'simple',
      size: 'small',
      texture: 'delicate',
      growthPattern: 'Creeping mat — thread-like rhizome, kidney fronds on wet banks',
      soriType: 'Tubular involucre — sporangia in urn-shaped indusium on frond',
      uniqueCharacters: [
        'Sterile fronds undivided—rounded to kidney-shaped blades with entire margins',
        'Thin, translucent filmy texture (Hymenophyllaceae); needs constant moisture',
        'Creeping rhizome; often on wet rock faces, stream banks, and dripping banks'
      ],
      features: 'Endemic to New Zealand. Entire, undivided sterile fronds; grows in deeply shaded, constantly moist sites. Sometimes placed in Cardiomanes in modern classifications.'
    },
    {
      name: 'Soft Tree Fern (Tasmanian)',
      scientific: 'Dicksonia antarctica',
      regions: ['australia', 'tasmania'],
      habitat: ['forest', 'wetland'],
      frondType: 'twice',
      size: 'large',
      texture: 'leathery',
      growthPattern: 'Arborescent — thick trunk of rhizome/root mantle, crown aloft',
      soriType: 'Marginal or near-marginal — often in cup-like structures on pinnule edges (Dicksonia-type)',
      uniqueCharacters: [
        'Trunk often thick and covered in persistent roots and old stipe bases (fibrous “skirt”)',
        'Crown of very large arching fronds; stipes densely hairy or woolly when young',
        'Sori in marginal cups on reduced fertile pinnules (no indusia like many Cyathea)'
      ],
      features: 'Common tree fern of cool-temperate rainforest, gullies, and wet sclerophyll in Tasmania, Victoria, and New South Wales. Often the default “tree fern” of parks and gardens in southern Australia.'
    },
    {
      name: 'Rough Tree Fern',
      scientific: 'Cyathea australis',
      regions: ['australia'],
      habitat: ['forest'],
      frondType: 'twice',
      size: 'large',
      texture: 'leathery',
      growthPattern: 'Arborescent — rough tree fern trunk with canopy crown',
      soriType: 'Round on pinnules with indusium — typical Cyathea soral cover',
      uniqueCharacters: [
        'Trunk usually tall, slender, with rough persistent stipe bases (rougher than many Dicksonia trunks)',
        'Fronds large; sori on pinnules, typically with cup- or hood-like indusia',
        'Often grows with Dicksonia antarctica; rougher trunk and different soral detail help separate them'
      ],
      features: 'Widespread in eastern Australian forests from Queensland through New South Wales and Victoria. Frequently planted; sometimes placed in Alsophila in modern classifications.'
    },
    {
      name: 'Lacy Tree Fern',
      scientific: 'Cyathea cooperi',
      regions: ['australia'],
      habitat: ['forest'],
      frondType: 'twice',
      size: 'large',
      texture: 'delicate',
      growthPattern: 'Arborescent — slender trunk, lacy crown (often cultivated)',
      soriType: 'Round on pinnules with indusium — lacy tree fern',
      uniqueCharacters: [
        'Very finely divided, “lacy” fronds compared to rough tree fern',
        'Trunk often relatively smooth with neat circular leaf scars; fronds may be crown-forming',
        'Popular ornamental; naturalized in some regions outside native range'
      ],
      features: 'Subtropical to warm-temperate eastern Australia (e.g. Queensland, New South Wales). Often sold as Australian tree fern. Also treated as Sphaeropteris cooperi in some modern systems.'
    },
    {
      name: 'Prickly Tree Fern',
      scientific: 'Cyathea leichhardtiana',
      regions: ['australia'],
      habitat: ['forest'],
      frondType: 'twice',
      size: 'large',
      texture: 'leathery',
      growthPattern: 'Arborescent — prickly tree fern trunk and crown',
      soriType: 'Round on pinnules with indusium — prickly tree fern',
      uniqueCharacters: [
        'Stipes and rachises with noticeable prickles or spines',
        'Large crown fronds; prefers moist gullies and rainforest margins in eastern Australia'
      ],
      features: 'Eastern Australian rainforest tree fern, overlapping in range with other Cyathea and Dicksonia; armature on the stipe is a good field clue.'
    },
    {
      name: 'Bristly Tree Fern',
      scientific: 'Dicksonia youngiae',
      regions: ['australia'],
      habitat: ['forest', 'rock'],
      frondType: 'twice',
      size: 'large',
      texture: 'leathery',
      growthPattern: 'Arborescent (short trunk) — bristly stipes, subcanopy tree fern habit',
      soriType: 'Marginal cups — Dicksonia-type fertile segments',
      uniqueCharacters: [
        'Stipes very bristly or hairy; trunk often shorter than Dicksonia antarctica in many sites',
        'Restricted to wet escarpment and rainforest habitats in northern New South Wales and nearby'
      ],
      features: 'Specialist of cool, very humid forests on the Great Dividing Range; less widespread than D. antarctica.'
    }
  ];

  const getMatchesFor = (sel) => {
    return fernDatabase.filter(fern => {
      if (sel.region && !fern.regions.includes(sel.region)) return false;
      if (sel.frondType && fern.frondType !== sel.frondType) return false;
      if (sel.soriPresent === 'yes' && sel.soriBucket) {
        if (getIdentifierSoriBucket(fern) !== sel.soriBucket) return false;
      }
      if (sel.texture && fern.texture !== sel.texture) return false;
      return true;
    });
  };

  const getMatches = () => getMatchesFor(selections);

  const formatHabitat = (fern) =>
    fern.habitat?.map(id => habitats.find(h => h.id === id)?.name).filter(Boolean).join(', ') || '—';

  const formatGrowthPattern = (fern) => fern.growthPattern || '—';

  const formatSoriType = (fern) => fern.soriType || '—';

  const getFernIdImages = (fern) => {
    const scientific = (fern.scientific || '').trim().replace(/\s+/g, ' ');
    if (scientific === 'Cyathea smithii')
      return [
        { src: cyatheaSmithiiImg, alt: `${fern.name} 1` },
      ];
    if (scientific === 'Trichomanes reniforme')
      return [
        { src: trichomanesReniformeImg, alt: `${fern.name} 1` },
      ];
    if (fern.scientific === 'Polystichum acrostichoides')
      return [
        { src: polystichumAcrostichoides1Img, alt: `${fern.name} 1` },
        { src: polystichumAcrostichoides2Img, alt: `${fern.name} 2` },
        { src: polystichumAcrostichoides3Img, alt: `${fern.name} 3` },
      ];
    if (fern.scientific === 'Adiantum pedatum')
      return [
        { src: adiantumPedatum1Img, alt: `${fern.name} 1` },
        { src: adiantumPedatum2Img, alt: `${fern.name} 2` },
      ];
    if (fern.scientific === 'Osmundastrum cinnamomeum')
      return [
        { src: osmundastrumCinnamomeum1Img, alt: `${fern.name} 1` },
        { src: osmundastrumCinnamomeum2Img, alt: `${fern.name} 2` },
        { src: osmundastrumCinnamomeum3Img, alt: `${fern.name} 3` },
        { src: osmundastrumCinnamomeum4Img, alt: `${fern.name} 4` },
      ];
    if (fern.scientific === 'Matteuccia struthiopteris')
      return [
        { src: matteucciaStruthiopteris1Img, alt: `${fern.name} 1` },
        { src: matteucciaStruthiopteris2Img, alt: `${fern.name} 2` },
        { src: matteucciaStruthiopteris3Img, alt: `${fern.name} 3` },
      ];
    if (fern.scientific === 'Osmunda claytoniana')
      return [
        { src: osmundaClaytoniana1Img, alt: `${fern.name} 1` },
        { src: osmundaClaytoniana2Img, alt: `${fern.name} 2` },
        { src: osmundaClaytoniana3Img, alt: `${fern.name} 3` },
      ];
    if (fern.scientific === 'Osmunda regalis')
      return [
        { src: osmundaRegalis1Img, alt: `${fern.name} 1` },
        { src: osmundaRegalis2Img, alt: `${fern.name} 2` },
      ];
    if (fern.scientific === 'Thelypteris noveboracensis' || fern.scientific === 'Parathelypteris noveboracensis')
      return [
        { src: parathelypterisNoveboracensis1Img, alt: `${fern.name} 1` },
        { src: parathelypterisNoveboracensis2Img, alt: `${fern.name} 2` },
      ];
    if (fern.scientific === 'Thelypteris palustris')
      return [
        { src: thelypterisPalustris1Img, alt: `${fern.name} 1` },
        { src: thelypterisPalustris2Img, alt: `${fern.name} 2` },
        { src: thelypterisPalustris3Img, alt: `${fern.name} 3` },
      ];
    if (fern.scientific === 'Woodwardia areolata')
      return [
        { src: woodwardiaAreolata1Img, alt: `${fern.name} 1` },
        { src: woodwardiaAreolata2Img, alt: `${fern.name} 2` },
        { src: woodwardiaAreolata3Img, alt: `${fern.name} 3` },
      ];
    if (fern.scientific === 'Asplenium platyneuron')
      return [
        { src: aspleniumPlatyneuron1Img, alt: `${fern.name} 1` },
        { src: aspleniumPlatyneuron2Img, alt: `${fern.name} 2` },
        { src: aspleniumPlatyneuron3Img, alt: `${fern.name} 3` },
      ];
    if (fern.scientific === 'Asplenium trichomanes')
      return [
        { src: aspleniumTrichomanesImg, alt: `${fern.name} 1` },
        { src: aspleniumTrichomanes2Img, alt: `${fern.name} 2` },
      ];
    if (fern.scientific === 'Asplenium rhizophyllum')
      return [
        { src: aspleniumRhizophyllum1Img, alt: `${fern.name} 1` },
        { src: aspleniumRhizophyllum2Img, alt: `${fern.name} 2` },
        { src: aspleniumRhizophyllum3Img, alt: `${fern.name} 3` },
      ];
    if (fern.scientific === 'Pteridium aquilinum')
      return [
        { src: pteridiumAquilinum1Img, alt: `${fern.name} 1` },
        { src: pteridiumAquilinum2Img, alt: `${fern.name} 2` },
      ];
    if (fern.scientific === 'Cystopteris bulbifera')
      return [
        { src: cystopterisBulbifera1Img, alt: `${fern.name} 1` },
        { src: cystopterisBulbifera2Img, alt: `${fern.name} 2` },
        { src: cystopterisBulbifera3Img, alt: `${fern.name} 3` },
      ];
    if (fern.scientific === 'Polypodium virginianum')
      return [
        { src: polypodiumVirginianum1Img, alt: `${fern.name} 1` },
        { src: polypodiumVirginianum2Img, alt: `${fern.name} 2` },
        { src: polypodiumVirginianum3Img, alt: `${fern.name} 3` },
      ];
    if (fern.scientific === 'Polypodium appalachianum')
      return [
        { src: polypodiumAppalachianum1Img, alt: `${fern.name} 1` },
        { src: polypodiumAppalachianum2Img, alt: `${fern.name} 2` },
        { src: polypodiumAppalachianum3Img, alt: `${fern.name} 3` },
      ];
    if (fern.scientific === 'Dryopteris cristata')
      return [
        { src: dryopterisCristata1Img, alt: `${fern.name} 1` },
        { src: dryopterisCristata2Img, alt: `${fern.name} 2` },
      ];
    if (fern.scientific === 'Dryopteris marginalis')
      return [
        { src: dryopterisMarginalisImg, alt: `${fern.name} 1` },
      ];
    if (fern.scientific === 'Sceptridium dissectum')
      return [
        { src: sceptridiumDissectum1Img, alt: `${fern.name} 1` },
        { src: sceptridiumDissectum2Img, alt: `${fern.name} 2` },
        { src: sceptridiumDissectum3Img, alt: `${fern.name} 3` },
        { src: sceptridiumDissectum4Img, alt: `${fern.name} 4` },
      ];
    if (fern.scientific === 'Cystopteris fragilis')
      return [
        { src: cystopterisFragilis1Img, alt: `${fern.name} 1` },
        { src: cystopterisFragilis2Img, alt: `${fern.name} 2` },
      ];
    if (fern.scientific === 'Dryopteris goldiana')
      return [
        { src: dryopterisGoldiana1Img, alt: `${fern.name} 1` },
        { src: dryopterisGoldiana2Img, alt: `${fern.name} 2` },
        { src: dryopterisGoldiana3Img, alt: `${fern.name} 3` },
      ];
    if (fern.scientific === 'Dennstaedtia punctilobula')
      return [
        { src: dennstaedtiaPunctilobula1Img, alt: `${fern.name} 1` },
        { src: dennstaedtiaPunctilobula2Img, alt: `${fern.name} 2` },
      ];
    return [];
  };

  const getHorsetailIdImages = (scientificName) => {
    if (scientificName === 'E. arvense')
      return [
        { src: eArvense1Img, alt: 'Field Horsetail (E. arvense) 1' },
        { src: eArvense2Img, alt: 'Field Horsetail (E. arvense) 2' },
        { src: eArvense3Img, alt: 'Field Horsetail (E. arvense) 3' },
      ];
    if (scientificName === 'E. hyemale')
      return [
        { src: eHyemale1Img, alt: 'Rough Horsetail (E. hyemale) 1' },
        { src: eHyemale2Img, alt: 'Rough Horsetail (E. hyemale) 2' },
      ];
    return [];
  };

  const getClubmossIdImages = (scientificName) => {
    if (scientificName === 'Dendrolycopodium obscurum')
      return [
        { src: dendrolycopodiumObscurum1Img, alt: 'Ground Pine (Dendrolycopodium obscurum) 1' },
        { src: dendrolycopodiumObscurum2Img, alt: 'Ground Pine (Dendrolycopodium obscurum) 2' },
        { src: dendrolycopodiumObscurum3Img, alt: 'Ground Pine (Dendrolycopodium obscurum) 3' },
      ];
    if (scientificName === 'Diphasiastrum tristachyum')
      return [
        { src: diphasiastrumTristachyum1Img, alt: 'Blue Ground Cedar (Diphasiastrum tristachyum) 1' },
        { src: diphasiastrumTristachyum2Img, alt: 'Blue Ground Cedar (Diphasiastrum tristachyum) 2' },
      ];
    if (scientificName === 'Diphasiastrum digitatum')
      return [
        { src: diphasiastrumDigitatum1Img, alt: 'Fan Clubmoss (Diphasiastrum digitatum) 1' },
      ];
    if (scientificName === 'Huperzia lucidula')
      return [
        { src: huperziaLucidula1Img, alt: 'Shining Clubmoss (Huperzia lucidula) 1' },
        { src: huperziaLucidula2Img, alt: 'Shining Clubmoss (Huperzia lucidula) 2' },
        { src: huperziaLucidula3Img, alt: 'Shining Clubmoss (Huperzia lucidula) 3' },
      ];
    return [];
  };

  const handleSelect = (category, value) => {
    const nextSelections = { ...selections, [category]: value };
    setSelections(nextSelections);
    if (category === 'frondType' && getMatchesFor(nextSelections).length === 1) {
      setStep(6);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 0) return;
    if (step === 6 && selections.texture === null && selections.soriPresent === null) {
      setStep(2);
      return;
    }
    if (step === 6) {
      setSelections(prev => ({ ...prev, texture: null }));
      setStep(5);
      return;
    }
    if (step === 5) {
      setSelections(prev => ({ ...prev, texture: null }));
      if (selections.soriPresent === 'yes') {
        setSelections(prev => ({ ...prev, soriBucket: null }));
        setStep(4);
      } else {
        setSelections(prev => ({ ...prev, soriPresent: null, soriBucket: null }));
        setStep(3);
      }
      return;
    }
    if (step === 4) {
      setSelections(prev => ({ ...prev, soriBucket: null, soriPresent: null }));
      setStep(3);
      return;
    }
    if (step === 3) {
      setSelections(prev => ({ ...prev, soriPresent: null, soriBucket: null }));
      setStep(2);
      return;
    }
    if (step === 2) {
      setSelections(prev => ({ ...prev, frondType: null }));
      setStep(1);
      return;
    }
    if (step === 1) {
      setSelections(prev => ({ ...prev, region: null }));
      setStep(0);
      return;
    }
  };

  const handleReset = () => {
    setSelections({
      region: null,
      frondType: null,
      soriPresent: null,
      soriBucket: null,
      texture: null
    });
    setStep(0);
    setShowDatabase(false);
    setIdentifierSpeciesExpandedScientific(null);
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
      const perSection = [4, 4, 4, 4, 3, 3, 2, 1]; // 25 total (8 sections before "You're Ready")
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
      const practiceSectionIndex = isPracticeStep ? (currentLessonStep as { type: 'practice'; sectionIndex: number }).sectionIndex : undefined;
      const quizTitle = isFinalQuizStep ? 'Final Quiz' : (practiceSectionIndex != null && SECTION_TITLES[practiceSectionIndex] ? `${SECTION_TITLES[practiceSectionIndex]} — Practice` : 'Practice');
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
      const searchLower = databaseSearchQuery.trim().toLowerCase();
      const filteredFerns = searchLower
        ? sortedFerns.filter(fern => {
            const name = (fern.name || '').toLowerCase();
            const scientific = (fern.scientific || '').toLowerCase();
            const features = (fern.features || '').toLowerCase();
            const regionNames = fern.regions.map(r => regions.find(reg => reg.id === r)?.name || '').join(' ').toLowerCase();
            const habitatNames = formatHabitat(fern).toLowerCase();
            const growthText = (fern.growthPattern || '').toLowerCase();
            const soriText = (fern.soriType || '').toLowerCase();
            const searchText = `${name} ${scientific} ${features} ${regionNames} ${habitatNames} ${growthText} ${soriText}`;
            return searchText.includes(searchLower);
          })
        : sortedFerns;
      return (
        <div>
          <div className="flex items-center justify-between mb-4">
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
          <div className="mb-4">
            <input
              type="text"
              value={databaseSearchQuery}
              onChange={e => setDatabaseSearchQuery(e.target.value)}
              placeholder="Search by name, Latin name, features, growth, sori type, region, or habitat..."
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-gray-800 placeholder-gray-400"
              aria-label="Search database"
            />
          </div>
          <p className="text-gray-600 mb-4">
            {searchLower
              ? `Showing ${filteredFerns.length} of ${fernDatabase.length} species. Click a species to show photos.`
              : `All ${fernDatabase.length} species in the database. Click a species to show photos.`}
          </p>
          <div className="space-y-3 max-h-[32rem] overflow-y-auto pr-2">
            {filteredFerns.length === 0 ? (
              <p className="text-gray-500 py-6 text-center">No species match your search. Try different words.</p>
            ) : (
            filteredFerns.map((fern, idx) => {
              const isExpanded = databaseExpandedScientific === fern.scientific;
              const idImages = getFernIdImages(fern);
              const hasPhotos = idImages.length > 0;
              return (
                <div
                  key={idx}
                  className={`border-2 rounded-lg p-4 transition ${hasPhotos ? 'cursor-pointer hover:border-green-400 hover:bg-green-50/50' : ''} ${isExpanded ? 'border-green-500 bg-green-50/70' : 'border-gray-200'}`}
                  onClick={() => hasPhotos && setDatabaseExpandedScientific(isExpanded ? null : fern.scientific)}
                  role={hasPhotos ? 'button' : undefined}
                  tabIndex={hasPhotos ? 0 : undefined}
                  onKeyDown={e => hasPhotos && (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setDatabaseExpandedScientific(isExpanded ? null : fern.scientific))}
                >
                  <div className="flex items-start gap-3">
                    <Leaf className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800">{fern.name}</h3>
                      <p className="text-sm text-gray-600 italic mb-2">{fern.scientific}</p>
                      <p className="text-sm text-gray-700 mb-2">{fern.features}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {fern.frondType === 'once' ? 'Once divided' : 
                           fern.frondType === 'pinnatifid' ? 'Pinnatifid' :
                           fern.frondType === 'twice' ? 'Twice divided' :
                           fern.frondType === 'bipinnatePinnatifid' ? 'Bipinnate pinnatifid' :
                           fern.frondType === 'thrice' ? 'Thrice+ divided' :
                           fern.frondType === 'pedate' ? 'Pedate' :
                           fern.frondType === 'simple' ? 'Undivided' : 'Other'}
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
                      <div className="mt-1 text-xs text-gray-500">
                        Growth: {formatGrowthPattern(fern)}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        Sori: {formatSoriType(fern)}
                      </div>
                      <InaturalistSpeciesLink scientificName={fern.scientific} className="mt-2 text-sm" />
                      {isExpanded && hasPhotos && (
                        <div className="mt-4 pt-4 border-t border-green-200">
                          <p className="text-xs font-medium text-green-800 mb-2">Photos</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {idImages.map((img, i) => (
                              <ClickableImg key={i} src={img.src} alt={img.alt} className="rounded-lg w-full object-cover max-h-40 shadow-sm" />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
            )}
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
      const speciesListMatches = getMatches();
      return (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Species Matching Your Choices</h2>
          <p className="text-gray-600 mb-4">
            {speciesListMatches.length} species match region and frond division. Click a species to see its photos, or continue to narrow by sori.
          </p>
          <div className="space-y-3 max-h-[28rem] overflow-y-auto pr-2 mb-6">
            {speciesListMatches.length === 0 ? (
              <p className="text-gray-500 py-4">No species match. Use Back to change region or frond division.</p>
            ) : (
              speciesListMatches.map((fern, idx) => {
                const isExpanded = identifierSpeciesExpandedScientific === fern.scientific;
                const idImages = getFernIdImages(fern);
                const hasPhotos = idImages.length > 0;
                return (
                  <div
                    key={idx}
                    className={`border-2 rounded-lg p-4 transition ${hasPhotos ? 'cursor-pointer hover:border-green-400 hover:bg-green-50/50' : ''} ${isExpanded ? 'border-green-500 bg-green-50/70' : 'border-gray-200'}`}
                    onClick={() => hasPhotos && setIdentifierSpeciesExpandedScientific(isExpanded ? null : fern.scientific)}
                    role={hasPhotos ? 'button' : undefined}
                    tabIndex={hasPhotos ? 0 : undefined}
                    onKeyDown={e => hasPhotos && (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setIdentifierSpeciesExpandedScientific(isExpanded ? null : fern.scientific))}
                  >
                    <div className="flex items-start gap-3">
                      <Leaf className="text-green-600 mt-1 flex-shrink-0" size={20} />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800">{fern.name}</h3>
                        <p className="text-sm text-gray-600 italic mb-1">{fern.scientific}</p>
                        <p className="text-xs text-gray-500 mt-1">Growth: {formatGrowthPattern(fern)}</p>
                        <p className="text-xs text-gray-500 mt-1">Sori: {formatSoriType(fern)}</p>
                        {hasPhotos && (
                          <p className="text-xs text-green-600 mt-1">Click to {isExpanded ? 'hide' : 'show'} photos</p>
                        )}
                        <InaturalistSpeciesLink scientificName={fern.scientific} className="mt-2 text-sm" />
                        {isExpanded && hasPhotos && (
                          <div className="mt-4 pt-4 border-t border-green-200">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {idImages.map((img, i) => (
                                <ClickableImg key={i} src={img.src} alt={img.alt} className="rounded-lg w-full object-cover max-h-40 shadow-sm" />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <button
            type="button"
            onClick={() => setStep(3)}
            className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
          >
            Continue to sori
          </button>
        </div>
      );
    }

    if (step === 3) {
      const beforeSori = getMatchesFor({ ...selections, soriPresent: null, soriBucket: null, texture: null });
      const n = beforeSori.length;
      return (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sori</h2>
          <p className="text-gray-600 mb-2">
            On the fronds you are keying (often the underside of pinnae or pinnules), do you see sori—clusters of
            sporangia?
          </p>
          <p className="text-sm text-green-600 mb-6">{n} possible matches at this point</p>
          <div className="grid gap-3">
            <button
              type="button"
              onClick={() => {
                setSelections(s => ({ ...s, soriPresent: 'yes', soriBucket: null }));
                setStep(4);
              }}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left"
            >
              <div className="font-semibold text-gray-800">Yes — sori visible on the blade</div>
              <div className="text-sm text-gray-500 mt-1">Next you will choose which sori type best matches.</div>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelections(s => ({ ...s, soriPresent: 'no', soriBucket: null }));
                setStep(5);
              }}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left"
            >
              <div className="font-semibold text-gray-800">No / not on ordinary green pinnae</div>
              <div className="text-sm text-gray-500 mt-1">
                e.g. sporangia only on fertile spikes, separate fertile fronds, or not visible yet — skip sori type
                and go to texture.
              </div>
            </button>
          </div>
        </div>
      );
    }

    if (step === 4) {
      const partial = getMatchesFor({ ...selections, soriBucket: null, texture: null });
      const availableBuckets = new Set(partial.map(getIdentifierSoriBucket));
      const bucketOptions = identifierSoriBuckets.filter(b => b.id === 'other' || availableBuckets.has(b.id));
      return (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sori type</h2>
          <p className="text-gray-600 mb-2">
            Which description fits best? This matches the database sori pattern for each species.
          </p>
          <p className="text-sm text-green-600 mb-6">{partial.length} possible matches</p>
          <div className="grid gap-3">
            {bucketOptions.map(b => (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  setSelections(s => ({ ...s, soriPresent: 'yes', soriBucket: b.id }));
                  setStep(5);
                }}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left"
              >
                <div className="font-semibold text-gray-800">{b.name}</div>
                <div className="text-sm text-gray-500 mt-1">{b.description}</div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (step === 5) {
      return (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frond Texture</h2>
          <p className="text-gray-600 mb-2">What's the texture of the fronds?</p>
          <p className="text-sm text-green-600 mb-6">{matchCount} possible matches</p>
          <div className="grid gap-3">
            {textures.map(texture => (
              <button
                key={texture.id}
                type="button"
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

    if (step === 6) {
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
              {matches[0].uniqueCharacters && matches[0].uniqueCharacters.length > 0 && (
                <div className="mb-4 pb-4 border-b border-green-200">
                  <p className="text-sm font-semibold text-green-800 mb-2">Distinguishing characters</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    {matches[0].uniqueCharacters.map((char, i) => (
                      <li key={i}>{char}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex items-start gap-3 mb-4">
                <Leaf className="text-green-600 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{matches[0].name}</h3>
                  <p className="text-gray-600 italic">{matches[0].scientific}</p>
                  <p className="text-sm text-gray-600 mt-1">Habitat: {formatHabitat(matches[0])}</p>
                  <p className="text-sm text-gray-600 mt-1">Growth: {formatGrowthPattern(matches[0])}</p>
                  <p className="text-sm text-gray-600 mt-1">Sori: {formatSoriType(matches[0])}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{matches[0].features}</p>
              {getFernIdImages(matches[0]).length > 0 && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getFernIdImages(matches[0]).map((img, i) => (
                    <ClickableImg key={i} src={img.src} alt={img.alt} className="rounded-lg w-full object-cover max-h-64 shadow-sm" />
                  ))}
                </div>
              )}
              <InaturalistSpeciesLink scientificName={matches[0].scientific} className="mt-4 text-sm" />
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">Found {matches.length} possible matches:</p>
              <div className="space-y-3 max-h-[32rem] overflow-y-auto pr-2">
                {matches.map((fern, idx) => (
                  <div key={idx} className="border-2 border-gray-200 rounded-lg p-4 hover:border-green-400 transition">
                    <div className="flex items-start gap-3">
                      <Leaf className="text-green-600 mt-1 flex-shrink-0" size={20} />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800">{fern.name}</h3>
                        <p className="text-sm text-gray-600 italic mb-1">{fern.scientific}</p>
                        <p className="text-xs text-gray-500 mb-2">Habitat: {formatHabitat(fern)}</p>
                        <p className="text-xs text-gray-500 mb-2">Growth: {formatGrowthPattern(fern)}</p>
                        <p className="text-xs text-gray-500 mb-2">Sori: {formatSoriType(fern)}</p>
                        <p className="text-sm text-gray-700 mb-2">{fern.features}</p>
                        {getFernIdImages(fern).length > 0 && (
                          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {getFernIdImages(fern).map((img, i) => (
                              <ClickableImg key={i} src={img.src} alt={img.alt} className="rounded-lg w-full object-cover max-h-40 shadow-sm" />
                            ))}
                          </div>
                        )}
                        <InaturalistSpeciesLink scientificName={fern.scientific} className="mt-3 text-sm" />
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

  if (preChoiceScreen === 'welcome') {
    return (
      <ImageLightboxProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 flex items-center justify-center">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="flex justify-center mb-6">
                <Leaf className="text-green-600" size={48} />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-8">Fern Identifier</h1>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed mb-10">
                {INTRO_LINES.map((line, i) =>
                  line === '' ? (
                    <div key={i} className="h-2" aria-hidden />
                  ) : (
                    <p key={i} className={i >= 6 ? 'text-sm text-gray-500' : undefined}>
                      {line}
                    </p>
                  )
                )}
              </div>
              <button
                type="button"
                onClick={() => setPreChoiceScreen('quotes')}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-lg"
              >
                Getting Started
              </button>
            </div>
          </div>
        </div>
      </ImageLightboxProvider>
    );
  }

  if (preChoiceScreen === 'quotes') {
    return (
      <ImageLightboxProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 flex items-center justify-center">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-8 text-center">Quotes</h2>
              <div className="space-y-8 text-gray-700">
                <figure>
                  <blockquote className="border-l-4 border-green-500 pl-5 py-1 text-lg leading-relaxed italic">
                    Nature made ferns for pure leaves to show what she could in that line
                  </blockquote>
                  <figcaption className="mt-3 pl-5 text-sm text-gray-600 not-italic">
                    — Henry David Thoreau
                  </figcaption>
                </figure>
                <figure>
                  <blockquote className="border-l-4 border-green-500 pl-5 py-1 text-lg leading-relaxed italic">
                    Love of ferns and form often go hand in hand
                  </blockquote>
                  <figcaption className="mt-3 pl-5 text-sm text-gray-600 not-italic">
                    — Translation, from the book{' '}
                    <cite className="not-italic font-medium">Farne: Ein Portrait von Solvejg Nitzke</cite>
                  </figcaption>
                </figure>
                <figure>
                  <blockquote className="border-l-4 border-green-500 pl-5 py-1 text-lg leading-relaxed italic">
                    Read the directions and directly you will be directed in the right direction.
                  </blockquote>
                  <figcaption className="mt-3 pl-5 text-sm text-gray-600 not-italic">
                    — Lewis Carroll
                  </figcaption>
                </figure>
              </div>
              <div className="flex justify-center mt-10 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setPreChoiceScreen('definition')}
                  className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-lg"
                >
                  Next
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ImageLightboxProvider>
    );
  }

  if (preChoiceScreen === 'definition') {
    return (
      <ImageLightboxProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 flex items-center justify-center">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Definition</h2>
              <div className="text-gray-700 text-lg leading-relaxed mb-8 space-y-4">
                <p>
                  A fern is a plant, with xylem and phloem, that reproduces via spores.
                </p>
                <p>
                  Liverworts and moss have spores, but have no xylem and phloem. Always low to the ground.
                </p>
                <p>
                  Flowering plants have xylem and phloem, but reproduce via seeds.
                </p>
                <p>
                  Xylem and phloem developed because of lignin, the substance that makes trees &apos;woody&apos;. It provides structure for xylem and phloem to transport nutrients.
                </p>
                <p>
                  Ferns, actually lycophytes, were the first plants to develop lignin.
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setPreChoiceScreen(null);
                    setShowChoicePage(true);
                  }}
                  className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-lg"
                >
                  Next
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ImageLightboxProvider>
    );
  }

  const goToChoicePage = () => {
    setShowChoicePage(true);
    setShowLycophyteIntro(false);
    setShowLesson(true);
    setLessonStepIndex(0);
    setPracticeSelected(null);
    setPracticeChecked(false);
    handleReset();
  };

  if (showChoicePage) {
    return (
      <ImageLightboxProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
          <div className="max-w-2xl mx-auto h-full">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[calc(100vh-2rem)]">
              <div className="p-6 border-b border-gray-200">
                <p className="text-gray-700 text-lg leading-relaxed">
                  Ferns are not just the frilly frond plants. What follows is split into{' '}
                  <strong>two separate tutorials</strong>, each with its own path: one for ferns (morphology lesson
                  and identifier), and one for lycophytes and horsetails. The plants differ enough that they need
                  different keys and terms—there is not a single linear “next” through both.{' '}
                  <strong>Tap the section you want</strong> to start that tutorial.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowChoicePage(false);
                  setShowLesson(true);
                  setLessonStepIndex(0);
                  setPracticeSelected(null);
                  setPracticeChecked(false);
                  handleReset();
                }}
                className="p-6 text-left border-b border-gray-200 hover:bg-green-50 transition cursor-pointer flex-1 flex flex-col justify-center"
                aria-label="Start the fern tutorial and identifier"
              >
                <div className="flex items-center gap-3">
                  <Leaf className="text-green-600 flex-shrink-0" size={36} />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Fern Tutorial and Identifier</h2>
                    <p className="text-sm text-gray-600 mt-1">Opens the fern morphology lesson and identification key.</p>
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowChoicePage(false);
                  setShowLycophyteIntro(true);
                }}
                className="p-6 text-left hover:bg-green-50 transition cursor-pointer flex-1 flex flex-col justify-center"
                aria-label="Start the lycophytes and horsetails tutorial"
              >
                <div className="flex items-center gap-3">
                  <img src={clubmossHorsetailImg} alt="Clubmoss and horsetail" className="w-9 h-9 object-contain flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Lycophytes and Horsetails</h2>
                    <p className="text-sm text-gray-600 mt-1">Opens the separate lycophyte and horsetail material.</p>
                  </div>
                </div>
              </button>
              <div className="p-4 border-t border-gray-200 bg-gray-50/80">
                <p className="text-center text-sm text-gray-600 leading-relaxed px-2">
                  No shared “Next” here—each row is its own entry point. Use the back control inside a tutorial if
                  you want to return and switch paths.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ImageLightboxProvider>
    );
  }

  if (showLycophyteIntro) {
    return (
      <ImageLightboxProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <button
                onClick={() => {
                  setShowChoicePage(true);
                  setShowLycophyteIntro(false);
                }}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg px-3 py-2 -ml-2 transition w-fit"
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <div className="prose prose-gray max-w-none">
                <img src={clubmossHorsetailImg} alt="Clubmoss and horsetail" className="w-1/4 mx-auto mb-4 block" />
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Spore plants beyond ferns</h1>
                <blockquote className="border-l-4 border-green-500 pl-6 py-2 my-4 text-gray-700 text-lg leading-relaxed italic">
                  {LYCOPHYTE_INTRO_PARAGRAPH}
                </blockquote>
              </div>
              <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
                <button
                    onClick={() => {
                      setShowLycophyteIntro(false);
                      setShowLycophyteChoice(true);
                    }}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ImageLightboxProvider>
    );
  }

  if (showLycophyteChoice) {
    return (
      <ImageLightboxProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 overflow-y-auto">
              <button
                onClick={() => {
                  setShowLycophyteChoice(false);
                  setShowLycophyteIntro(true);
                }}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg px-3 py-2 mb-4 w-fit transition"
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                This group of plants are usually short, &lt;1 foot (25cm). Horsetails can be much taller. These plants will be down at your feet. Look down.
              </p>
              <p className="text-gray-600 mb-4">Choose a group to view its morphology:</p>
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => {
                    setShowLycophyteChoice(false);
                    setShowHorsetailsUnderConstruction(true);
                  }}
                  className="p-5 text-left rounded-xl border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 transition cursor-pointer"
                  aria-label="Horsetails"
                >
                  <h2 className="text-xl font-bold text-gray-800">1. Horsetails</h2>
                </button>
                <button
                  onClick={() => {
                    setShowLycophyteChoice(false);
                    setShowClubmossesUnderConstruction(true);
                  }}
                  className="p-5 text-left rounded-xl border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 transition cursor-pointer"
                  aria-label="Clubmosses"
                >
                  <h2 className="text-xl font-bold text-gray-800">2. Clubmosses</h2>
                </button>
                <button
                  onClick={() => {
                    setShowLycophyteChoice(false);
                    setShowSpikeMossesMorphology(true);
                  }}
                  className="p-5 text-left rounded-xl border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 transition cursor-pointer"
                  aria-label="Spike Mosses"
                >
                  <h2 className="text-xl font-bold text-gray-800">3. Spike Mosses</h2>
                </button>
                <button
                  onClick={() => {
                    setShowLycophyteChoice(false);
                    setShowQuillwortsMorphology(true);
                  }}
                  className="p-5 text-left rounded-xl border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 transition cursor-pointer"
                  aria-label="Quillworts"
                >
                  <h2 className="text-xl font-bold text-gray-800">4. Quillworts</h2>
                </button>
              </div>
            </div>
          </div>
        </div>
      </ImageLightboxProvider>
    );
  }

  const renderUnderConstructionPage = (onBack) => (
    <ImageLightboxProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg px-3 py-2 -ml-2 transition w-fit"
            >
              <ChevronLeft size={20} />
              Back
            </button>
            <div className="text-center">
              <TrafficCone className="mx-auto mb-4 text-orange-500" size={64} />
              <h1 className="text-2xl font-bold text-gray-800">Under construction</h1>
            </div>
          </div>
        </div>
      </div>
    </ImageLightboxProvider>
  );

  if (showHorsetailDatabase) {
    const searchLower = horsetailSearchQuery.trim().toLowerCase();
    const filtered = searchLower
      ? HORSETAIL_DATABASE.filter(h => {
          const text = `${h.commonName} ${h.scientificName} ${h.primaryRange} ${h.subgenusLabel} ${h.branching}`.toLowerCase();
          return text.includes(searchLower);
        })
      : HORSETAIL_DATABASE;
    const bySubgenus = filtered.reduce((acc, h) => {
      if (!acc[h.subgenusLabel]) acc[h.subgenusLabel] = [];
      acc[h.subgenusLabel].push(h);
      return acc;
    }, {});
    const subgenusOrder = ['Subgenus Equisetum (True Horsetails)', 'Subgenus Hippochaete (Scouring Rushes)'];
    return (
      <ImageLightboxProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <button
                onClick={() => setShowHorsetailDatabase(false)}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg px-3 py-2 -ml-2 transition w-fit"
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Horsetail Identifier</h1>
              <p className="text-gray-600 mb-4">
                {HORSETAIL_DATABASE.length} species in the genus <em>Equisetum</em>. Data from equisetum-table.
              </p>
              <div className="mb-4">
                <input
                  type="text"
                  value={horsetailSearchQuery}
                  onChange={e => setHorsetailSearchQuery(e.target.value)}
                  placeholder="Search by name, range, branched, unbranched..."
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-gray-800 placeholder-gray-400"
                  aria-label="Search horsetail database"
                />
              </div>
              {searchLower && (
                <p className="text-gray-600 mb-4">
                  Showing {filtered.length} of {HORSETAIL_DATABASE.length} species.
                </p>
              )}
              <div className="space-y-6 max-h-[32rem] overflow-y-auto pr-2">
                {subgenusOrder.map(label => {
                  const list = bySubgenus[label];
                  if (!list || list.length === 0) return null;
                  return (
                    <div key={label}>
                      <h2 className="text-lg font-bold text-gray-800 mb-3 sticky top-0 bg-white py-1">{label}</h2>
                      <div className="space-y-2">
                        {list.map((h, idx) => {
                          const idImages = getHorsetailIdImages(h.scientificName);
                          const hasPhotos = idImages.length > 0;
                          const isExpanded = horsetailExpandedScientific === h.scientificName;
                          return (
                            <div
                              key={idx}
                              className={`border-2 rounded-lg p-4 transition ${hasPhotos ? 'cursor-pointer hover:border-green-400 hover:bg-green-50/50' : ''} ${isExpanded ? 'border-green-500 bg-green-50/70' : 'border-gray-200'}`}
                              onClick={() => hasPhotos && setHorsetailExpandedScientific(isExpanded ? null : h.scientificName)}
                              role={hasPhotos ? 'button' : undefined}
                              tabIndex={hasPhotos ? 0 : undefined}
                              onKeyDown={e => hasPhotos && (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setHorsetailExpandedScientific(isExpanded ? null : h.scientificName))}
                            >
                              <h3 className="font-bold text-gray-800">{h.commonName}</h3>
                              <p className="text-sm text-gray-600 italic">{h.scientificName}</p>
                              <p className="text-sm text-gray-700 mt-1">Range: {h.primaryRange}</p>
                              <p className="text-sm text-gray-700 mt-1">
                                <span className="font-semibold text-gray-800">Key:</span>{' '}
                                {h.branching === 'branched' ? 'Branched (whorled side branches)' : 'Unbranched (scouring-rush type)'}
                              </p>
                              {h.description && (
                                <p className="text-sm text-gray-700 mt-2 leading-relaxed">{h.description}</p>
                              )}
                              <InaturalistSpeciesLink scientificName={h.scientificName} className="mt-2 text-sm" />
                              {isExpanded && hasPhotos && (
                                <div className="mt-4 pt-4 border-t border-green-200">
                                  <p className="text-xs font-medium text-green-800 mb-2">Photos</p>
                                  <div className="grid grid-cols-3 gap-2">
                                    {idImages.map((img, i) => (
                                      <ClickableImg key={i} src={img.src} alt={img.alt} className="rounded-lg w-full object-cover max-h-40 shadow-sm" />
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                {filtered.length === 0 && (
                  <p className="text-gray-500 py-6 text-center">No species match your search.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </ImageLightboxProvider>
    );
  }

  if (showHorsetailDetails) {
    return (
      <ImageLightboxProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <button
                onClick={() => {
                  setHorsetailDetailsBranchingChoice(null);
                  setShowHorsetailDetails(false);
                }}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg px-3 py-2 -ml-2 transition w-fit"
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Horsetail Morphology, Details</h1>
              <p className="text-gray-600 mb-4">Characters used to tell horsetail species apart:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>
                  <strong>Branched vs unbranched</strong> — Subgenus <em>Equisetum</em> (true horsetails) have whorled, green branches from the nodes; subgenus <em>Hippochaete</em> (scouring rushes) are usually unbranched or sparsely branched.
                  <img src={branchedUnbranchedImg} alt="Branched vs unbranched horsetail" className="mt-3 w-full max-w-md rounded-lg border border-gray-200" />
                </li>
                <li><strong>Separate fertile stems</strong> — Some species (e.g. Field Horsetail) have ephemeral, non-green fertile stems in spring and later green sterile stems; others have fertile cones on green stems.</li>
                <li>
                  <strong>Stem ridges and texture</strong> — Number of ridges (often matches number of sheath teeth); smooth vs rough (silica bands); stem diameter and height.
                  <img src={equisetumTeethImg} alt="Equisetum stem ridges and teeth" className="mt-3 w-full max-w-md rounded-lg border border-gray-200" />
                </li>
                <li><strong>Sheath (nodal collar)</strong> — Shape and length of the sheath at each node; number and color of teeth (e.g. black-tipped, white-margined); whether it is loose or tight.</li>
                <li><strong>Central canal</strong> — Relative size of the hollow center (e.g. large central canal vs smaller or multiple canals) seen in a cross-section.</li>
                <li><strong>Strobilus</strong> — Position (terminal on fertile stem vs on green stem); shape (pointed vs blunt); persistence.</li>
                <li><strong>Habitat</strong> — Wet (aquatic, marsh, streamside), moist woodland, or drier ground; sun vs shade.</li>
                <li><strong>Size and habit</strong> — Dwarf vs tall; single stems vs dense clumps; evergreen vs dying back.</li>
              </ul>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="font-semibold text-gray-800 mb-3">Is your plant branched or unbranched?</p>
                <p className="text-sm text-gray-600 mb-4">Choose what best matches the stems you see. This helps narrow the species list on the next screen.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setHorsetailDetailsBranchingChoice('branched')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 text-left transition font-medium ${
                      horsetailDetailsBranchingChoice === 'branched'
                        ? 'border-green-600 bg-green-50 text-green-900'
                        : 'border-gray-200 hover:border-green-400 hover:bg-green-50/50 text-gray-800'
                    }`}
                  >
                    <span className="block font-semibold">Branched</span>
                    <span className="text-sm font-normal text-gray-600">Whorls of green side branches from the nodes (true horsetails, subgenus <em>Equisetum</em>)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setHorsetailDetailsBranchingChoice('unbranched')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 text-left transition font-medium ${
                      horsetailDetailsBranchingChoice === 'unbranched'
                        ? 'border-green-600 bg-green-50 text-green-900'
                        : 'border-gray-200 hover:border-green-400 hover:bg-green-50/50 text-gray-800'
                    }`}
                  >
                    <span className="block font-semibold">Unbranched</span>
                    <span className="text-sm font-normal text-gray-600">Mostly a single stem, no whorls of branches (scouring rushes, subgenus <em>Hippochaete</em>)</span>
                  </button>
                </div>
                {horsetailDetailsBranchingChoice === 'branched' && (
                  <p className="text-sm text-gray-600 mt-3">Next will open the list filtered to <strong>branched</strong> species. Clear the search box to see all species again.</p>
                )}
                {horsetailDetailsBranchingChoice === 'unbranched' && (
                  <p className="text-sm text-gray-600 mt-3">Next will open the list filtered to <strong>unbranched</strong> species. (<em>E. ramosissimum</em> is branched and won’t appear in this filter.) Clear the search box to see all species again.</p>
                )}
              </div>
              <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowHorsetailDatabase(true);
                    if (horsetailDetailsBranchingChoice) {
                      setHorsetailSearchQuery(horsetailDetailsBranchingChoice);
                    }
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ImageLightboxProvider>
    );
  }

  if (showHorsetailsUnderConstruction) {
    return (
      <ImageLightboxProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <button
                onClick={() => {
                  setShowHorsetailsUnderConstruction(false);
                  setShowLycophyteChoice(true);
                }}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg px-3 py-2 -ml-2 transition w-fit"
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Horsetail Morphology</h1>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                There are about 15–20 horsetail species worldwide. There is one genus, <em>Equisetum</em>. The genus can be divided into two subgenera, <em>Equisetum</em> (yes, confusing) and <em>Hippochaete</em>. The subgenus <em>Equisetum</em> have branched (whorled) soft stems. The subgenus <em>Hippochaete</em> is unbranched and tougher. Both are segmented and have strobili that hold the sori and spores.
              </p>
              <div className="flex justify-center mb-8">
                <button
                  onClick={() => {
                    setHorsetailDetailsBranchingChoice(null);
                    setShowHorsetailDetails(true);
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <ClickableImg src={horsetailBranchedImg} alt="Branched horsetail" className="w-full rounded-lg border border-gray-200" />
                  <p className="text-sm font-medium text-gray-700 mt-2 text-center">Branched</p>
                </div>
                <div>
                  <ClickableImg src={horsetailUnbranchedImg} alt="Unbranched horsetail" className="w-full rounded-lg border border-gray-200" />
                  <p className="text-sm font-medium text-gray-700 mt-2 text-center">Unbranched</p>
                </div>
                <div>
                  <ClickableImg src={horsetailSegmentsImg} alt="Horsetail segments" className="w-full rounded-lg border border-gray-200" />
                  <p className="text-sm font-medium text-gray-700 mt-2 text-center">Segments</p>
                </div>
                <div>
                  <ClickableImg src={horsetailStrobiliImg} alt="Horsetail strobili" className="w-full rounded-lg border border-gray-200" />
                  <p className="text-sm font-medium text-gray-700 mt-2 text-center">Strobili</p>
                </div>
              </div>
              <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setHorsetailDetailsBranchingChoice(null);
                    setShowHorsetailDetails(true);
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ImageLightboxProvider>
    );
  }

  if (showClubmossDatabase) {
    const searchLower = clubmossSearchQuery.trim().toLowerCase();
    const filtered = searchLower
      ? CLUBMOSS_DATABASE.filter(c => {
          const text = `${c.commonName} ${c.scientificName} ${c.primaryRange}`.toLowerCase();
          return text.includes(searchLower);
        })
      : CLUBMOSS_DATABASE;
    return (
      <ImageLightboxProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <button
                onClick={() => setShowClubmossDatabase(false)}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg px-3 py-2 -ml-2 transition w-fit"
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Clubmoss Database</h1>
              <p className="text-gray-600 mb-4">
                {CLUBMOSS_DATABASE.length} species in the database.
              </p>
              <div className="mb-4">
                <input
                  type="text"
                  value={clubmossSearchQuery}
                  onChange={e => setClubmossSearchQuery(e.target.value)}
                  placeholder="Search by common name, scientific name, or range..."
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-gray-800 placeholder-gray-400"
                  aria-label="Search clubmoss database"
                />
              </div>
              {searchLower && (
                <p className="text-gray-600 mb-4">
                  Showing {filtered.length} of {CLUBMOSS_DATABASE.length} species.
                </p>
              )}
              <div className="space-y-2 max-h-[32rem] overflow-y-auto pr-2">
                {filtered.length === 0 ? (
                  <p className="text-gray-500 py-6 text-center">No species match your search.</p>
                ) : (
                  filtered.map((c, idx) => {
                    const idImages = getClubmossIdImages(c.scientificName);
                    const hasPhotos = idImages.length > 0;
                    const isExpanded = clubmossExpandedScientific === c.scientificName;
                    return (
                      <div
                        key={idx}
                        className={`border-2 rounded-lg p-4 transition ${hasPhotos ? 'cursor-pointer hover:border-green-400 hover:bg-green-50/50' : ''} ${isExpanded ? 'border-green-500 bg-green-50/70' : 'border-gray-200'}`}
                        onClick={() => hasPhotos && setClubmossExpandedScientific(isExpanded ? null : c.scientificName)}
                        role={hasPhotos ? 'button' : undefined}
                        tabIndex={hasPhotos ? 0 : undefined}
                        onKeyDown={e => hasPhotos && (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setClubmossExpandedScientific(isExpanded ? null : c.scientificName))}
                      >
                        <h3 className="font-bold text-gray-800">{c.commonName}</h3>
                        <p className="text-sm text-gray-600 italic">{c.scientificName}</p>
                        <p className="text-sm text-gray-700 mt-1">Range: {c.primaryRange}</p>
                        <InaturalistSpeciesLink scientificName={c.scientificName} className="mt-2 text-sm" />
                        {isExpanded && hasPhotos && (
                          <div className="mt-4 pt-4 border-t border-green-200">
                            <p className="text-xs font-medium text-green-800 mb-2">Photos</p>
                            <div className="grid grid-cols-3 gap-2">
                              {idImages.map((img, i) => (
                                <ClickableImg key={i} src={img.src} alt={img.alt} className="rounded-lg w-full object-cover max-h-40 shadow-sm" />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </ImageLightboxProvider>
    );
  }

  if (showClubmossesUnderConstruction) {
    return (
      <ImageLightboxProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <button
                onClick={() => {
                  setShowClubmossesUnderConstruction(false);
                  setShowLycophyteChoice(true);
                }}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg px-3 py-2 -ml-2 transition w-fit"
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Clubmoss Morphology</h1>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Clubmosses (Lycopodiaceae) are low, creeping or upright plants with small, simple leaves and strobili (spore cones). They lack true roots in the fern sense and are often found in moist or wooded habitats. Key features include microphylls and terminal or lateral strobili.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <ClickableImg src={clubmossPlantImg} alt="Clubmoss plant" className="w-full rounded-lg border border-gray-200" />
                  <p className="text-sm font-medium text-gray-700 mt-2 text-center">Clubmoss plant</p>
                </div>
                <div>
                  <ClickableImg src={clubmossStroboliImg} alt="Clubmoss strobili" className="w-full rounded-lg border border-gray-200" />
                  <p className="text-sm font-medium text-gray-700 mt-2 text-center">Clubmoss strobili</p>
                </div>
              </div>
              <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowClubmossesUnderConstruction(false);
                    setShowClubmossDetails(true);
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ImageLightboxProvider>
    );
  }

  if (showClubmossDetails) {
    return (
      <ImageLightboxProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <button
                onClick={() => {
                  setShowClubmossDetails(false);
                  setShowClubmossesUnderConstruction(true);
                }}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg px-3 py-2 -ml-2 transition w-fit"
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Clubmoss Morphology, Details</h1>
              <p className="text-gray-600 mb-4">Characters of a clubmoss (Lycopodiaceae):</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li><strong>Microphylls</strong> — Small, simple leaves with a single unbranched vein; arranged in a spiral or whorled along the stem.</li>
                <li><strong>Stems</strong> — Creeping (along the ground), ascending, or upright; branching variable (dichotomous or lateral); no true roots like ferns—roots are adventitious.</li>
                <li><strong>Strobili (spore cones)</strong> — Terminal or lateral; sessile or on a stalk; shape (cylindrical, club-like) and number vary; bear sporangia that release spores.</li>
                <li><strong>Size and habit</strong> — Low, often under 1 foot; mat-forming, trailing, or with upright shoots; evergreen.</li>
                <li><strong>Leaves</strong> — Scale-like to needle-like; uniform or dimorphic (e.g. on strobilus vs on vegetative stem); persistent.</li>
                <li><strong>Habitat</strong> — Typically moist or wooded; forest floor, bogs, rock; often in shade.</li>
              </ul>
              <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowClubmossDatabase(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ImageLightboxProvider>
    );
  }

  if (showSpikeMossDetails) {
    return (
      <ImageLightboxProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <button
                onClick={() => setShowSpikeMossDetails(false)}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg px-3 py-2 -ml-2 transition w-fit"
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Spike Moss Morphology, Details</h1>
              <p className="text-gray-600 mb-4">Characters of a spike moss (Selaginellaceae):</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li><strong>Microphylls</strong> — Tiny, scale-like leaves with a single vein; arranged in four ranks or flattened (frond-like); often dimorphic (lateral vs median leaves).</li>
                <li><strong>Ligule</strong> — Small tongue-like flap near the base of each leaf on the upper side; present in all <em>Selaginella</em> and useful for identification.</li>
                <li><strong>Stems</strong> — Branching (often dichotomous); creeping, ascending, or erect; may bear rhizophores (root-like structures that grow down from the stem).</li>
                <li><strong>Rhizophores</strong> — Leafless, root-like branches that produce roots; position (along stem) can help tell species apart.</li>
                <li><strong>Strobili (spore cones)</strong> — Terminal, often four-sided or flattened; heterosporous (produce both megaspores and microspores), unlike most clubmosses.</li>
                <li><strong>Size and habit</strong> — Small, low; mat-forming or trailing; some species can curl when dry and revive when wet (resurrection plants).</li>
                <li><strong>Habitat</strong> — Moist, shady, or rocky; forest floor, cliffs, stream banks; a few in seasonally dry or xeric sites.</li>
              </ul>
            </div>
          </div>
        </div>
      </ImageLightboxProvider>
    );
  }

  if (showSpikeMossesMorphology) {
    return (
      <ImageLightboxProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <button
                onClick={() => {
                  setShowSpikeMossesMorphology(false);
                  setShowLycophyteChoice(true);
                }}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg px-3 py-2 -ml-2 transition w-fit"
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Spike Moss Morphology</h1>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Spike mosses (Selaginellaceae) are small, often mat-forming lycophytes with branching stems and tiny scale-like leaves. They bear strobili and many have a ligule. They occur in moist, shady, or rocky habitats.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowSpikeMossDetails(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                >
                  Details
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ImageLightboxProvider>
    );
  }

  if (showQuillwortDetails) {
    return (
      <ImageLightboxProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <button
                onClick={() => setShowQuillwortDetails(false)}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg px-3 py-2 -ml-2 transition w-fit"
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Quillwort Morphology, Details</h1>
              <p className="text-gray-600 mb-4">Characters of a quillwort (<em>Isoetes</em>):</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li><strong>Leaves</strong> — Quill-like, narrow, in a basal rosette; microphylls with a single vein; often hollow or with internal air channels; base expanded and wrapping the stem (where sporangium sits).</li>
                <li><strong>Stem (corm)</strong> — Short, tuberous, corm-like; mostly below ground; bears the leaves above and roots below.</li>
                <li><strong>Sporangia</strong> — Sunken in the expanded, spoon-shaped base of each leaf; heterosporous (megaspores and microspores in different sporangia).</li>
                <li><strong>Ligule</strong> — Small flap on the upper side of the leaf base, near the sporangium; present in all <em>Isoetes</em>.</li>
                <li><strong>Roots</strong> — Emerge from the lower part of the corm; often simple and unbranched.</li>
                <li><strong>Size and habit</strong> — Small; leaves usually a few inches to about a foot; rosette often submerged or at the water edge.</li>
                <li><strong>Habitat</strong> — Aquatic or semi-aquatic; shallow water, wet mud, seasonally flooded pools, lake margins; a few in wet terrestrial sites.</li>
              </ul>
            </div>
          </div>
        </div>
      </ImageLightboxProvider>
    );
  }

  if (showQuillwortsMorphology) {
    return (
      <ImageLightboxProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <button
                onClick={() => {
                  setShowQuillwortsMorphology(false);
                  setShowLycophyteChoice(true);
                }}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg px-3 py-2 -ml-2 transition w-fit"
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Quillwort Morphology</h1>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Quillworts (<em>Isoetes</em>) are aquatic or semi-aquatic lycophytes with a short, corm-like stem and quill-like leaves in a basal rosette. Spores are produced in sunken sporangia at the leaf bases. They grow in shallow water or wet soils.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowQuillwortDetails(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                >
                  Details
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ImageLightboxProvider>
    );
  }

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
                  } else if (step > 0) {
                    handleReset();
                  } else {
                    goToChoicePage();
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
              >
                <Home size={18} />
                {showLesson ? 'Skip to Identifier' : step > 0 ? 'Reset' : 'Sections'}
              </button>
            </div>
          </div>

          {!showLesson && (
            <div className="mb-8">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Progress</span>
                <span>Step {step} of 6</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${(step / 6) * 100}%` }}
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
                {selections.soriPresent && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Sori: {selections.soriPresent === 'yes' ? 'visible' : 'not on blade / skipped'}
                  </span>
                )}
                {selections.soriPresent === 'yes' && selections.soriBucket && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {identifierSoriBuckets.find(sb => sb.id === selections.soriBucket)?.name ?? selections.soriBucket}
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
            Database includes 90 fern species across North America (including Canada), UK, Europe, Australia, Tasmania, and New Zealand
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
