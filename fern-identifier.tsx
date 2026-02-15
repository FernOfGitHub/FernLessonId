import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Leaf, MapPin, Home, Database, BookOpen } from 'lucide-react';

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
        <div className="bg-green-50 rounded-xl p-6 flex justify-center">
          <svg viewBox="0 0 120 140" className="w-48 h-56 max-w-full">
            <rect x="40" y="100" width="40" height="30" rx="4" fill="#5a4a3a" />
            <line x1="60" y1="95" x2="60" y2="100" stroke="#2d5016" strokeWidth="4" />
            <path d="M 60 95 L 60 20 Q 60 10, 70 15 L 95 35 Q 100 40, 95 50 L 70 70 Q 65 75, 60 70 L 35 50 Q 30 40, 35 35 L 50 15 Q 60 10, 60 20" fill="#4a7c59" stroke="#3d6847" strokeWidth="1.5" />
            <text x="62" y="55" fill="white" fontSize="10" fontWeight="bold">BLADE</text>
            <text x="62" y="92" fill="white" fontSize="10" fontWeight="bold">STIPE</text>
          </svg>
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
          The frond blade is often divided into smaller segments. A <strong>pinna</strong> (plural: <em>pinnae</em>) is one of the primary leaflets—the first level of division off the central axis (the <strong>rachis</strong>).
        </p>
        <p className="text-gray-700 mb-4">
          When pinnae are themselves divided, those smaller pieces are called <strong>pinnules</strong>. Counting how many times the frond is divided helps narrow down the species.
        </p>
        <div className="bg-green-50 rounded-xl p-6 flex justify-center">
          <svg viewBox="0 0 100 120" className="w-40 h-48 max-w-full">
            <line x1="50" y1="10" x2="50" y2="110" stroke="#2d5016" strokeWidth="3" />
            <ellipse cx="30" cy="25" rx="18" ry="8" fill="#4a7c59" />
            <ellipse cx="70" cy="25" rx="18" ry="8" fill="#4a7c59" />
            <ellipse cx="25" cy="45" rx="20" ry="9" fill="#4a7c59" />
            <ellipse cx="75" cy="45" rx="20" ry="9" fill="#4a7c59" />
            <text x="12" y="50" fill="#1e3a2f" fontSize="9">pinna</text>
            <text x="48" y="115" fill="#1e3a2f" fontSize="9">rachis</text>
          </svg>
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
          <li><strong>Entire (undivided)</strong> — Simple blade, no leaflets (e.g., Hart's-tongue)</li>
          <li><strong>Once divided (pinnate)</strong> — Pinnae along the rachis</li>
          <li><strong>Twice divided (bipinnate)</strong> — Pinnae have pinnules</li>
          <li><strong>Thrice+ divided (tripinnate)</strong> — Very lacy, feathery appearance</li>
          <li><strong>Pedate/fan-shaped</strong> — Pinnae radiate from a central point or branch in a fan/palmate pattern (e.g., Maidenhair fern, Oak fern)</li>
        </ul>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Once', svg: '<line x1="50" y1="10" x2="50" y2="90" stroke="#2d5016" stroke-width="2"/><ellipse cx="35" cy="25" rx="12" ry="6" fill="#4a7c59"/><ellipse cx="65" cy="25" rx="12" ry="6" fill="#4a7c59"/><ellipse cx="30" cy="45" rx="14" ry="6" fill="#4a7c59"/><ellipse cx="70" cy="45" rx="14" ry="6" fill="#4a7c59"/><ellipse cx="35" cy="65" rx="12" ry="6" fill="#4a7c59"/><ellipse cx="65" cy="65" rx="12" ry="6" fill="#4a7c59"/>' },
            { label: 'Twice', svg: '<line x1="50" y1="10" x2="50" y2="90" stroke="#2d5016" stroke-width="2"/><line x1="35" y1="30" x2="50" y2="30" stroke="#2d5016" stroke-width="1.5"/><line x1="50" y1="30" x2="65" y2="30" stroke="#2d5016" stroke-width="1.5"/><ellipse cx="30" cy="25" rx="5" ry="4" fill="#4a7c59"/><ellipse cx="60" cy="25" rx="5" ry="4" fill="#4a7c59"/><ellipse cx="28" cy="50" rx="6" ry="4" fill="#4a7c59"/><ellipse cx="50" cy="50" rx="6" ry="4" fill="#4a7c59"/><ellipse cx="72" cy="50" rx="6" ry="4" fill="#4a7c59"/>' },
          ].map(({ label, svg }) => (
            <div key={label} className="bg-green-50 rounded-lg p-3 flex flex-col items-center">
              <div dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${svg}</svg>` }} className="w-16 h-16" />
              <span className="text-xs font-medium text-gray-600 mt-1">{label}</span>
            </div>
          ))}
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
        <div className="bg-slate-50 rounded-xl p-4 text-slate-700 text-sm">
          <strong>Spectrum:</strong> Entire → Pinnatifid → Pinnate → Pinnate pinnatifid → Bipinnate → Bipinnate pinnatifid → Tripinnate
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
            { shape: 'Circular (globose)', svg: '<circle cx="50" cy="50" r="20" fill="#4a7c59" opacity="0.8"/><circle cx="50" cy="50" r="12" fill="#2d5016"/>' },
            { shape: 'Linear (elongated)', svg: '<rect x="20" y="40" width="60" height="8" rx="4" fill="#4a7c59"/>' },
            { shape: 'Kidney-shaped (reniform)', svg: '<ellipse cx="50" cy="50" rx="25" ry="12" fill="#4a7c59" opacity="0.8"/><path d="M 35 50 Q 50 40, 65 50 Q 50 60, 35 50" fill="#2d5016"/>' },
            { shape: 'J-shaped (horseshoe)', svg: '<path d="M 50 20 Q 75 20, 75 50 Q 75 80, 50 80" stroke="#2d5016" stroke-width="10" fill="none" stroke-linecap="round"/>' },
            { shape: 'Cup-shaped (marginal)', svg: '<path d="M 20 50 Q 50 30, 80 50 Q 50 70, 20 50" fill="#4a7c59" stroke="#2d5016"/>' },
            { shape: 'Full coverage (acrostichoid)', svg: '<rect x="15" y="15" width="70" height="70" rx="4" fill="#4a7c59" opacity="0.9"/>' },
            { shape: 'Chain-like (catenulate)', svg: '<ellipse cx="25" cy="50" rx="15" ry="12" fill="#4a7c59"/><ellipse cx="50" cy="50" rx="15" ry="12" fill="#4a7c59"/><ellipse cx="75" cy="50" rx="15" ry="12" fill="#4a7c59"/>' },
          ].map(({ shape, svg }) => (
            <div key={shape} className="bg-green-50 rounded-lg p-3 flex flex-col items-center">
              <div dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${svg}</svg>` }} className="w-16 h-16" />
              <span className="text-xs font-medium text-gray-700 mt-2 text-center">{shape}</span>
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

const FernIdentifier = () => {
  const [showLesson, setShowLesson] = useState(true);
  const [lessonSlide, setLessonSlide] = useState(0);
  const [step, setStep] = useState(0);
  const [showDatabase, setShowDatabase] = useState(false);
  const [sortBy, setSortBy] = useState('common');
  const [selections, setSelections] = useState({
    region: null,
    habitat: null,
    frondType: null,
    size: null,
    texture: null
  });

  const regions = [
    { id: 'northeast', name: 'Northeastern US', description: 'ME, NH, VT, MA, RI, CT, NY, NJ, PA' },
    { id: 'southeast', name: 'Southeastern US', description: 'MD, VA, WV, NC, SC, GA, FL, AL, MS, LA, AR, TN, KY' },
    { id: 'midwest', name: 'Midwest US', description: 'OH, IN, IL, MI, WI, MN, IA, MO' },
    { id: 'southwest', name: 'Southwestern US', description: 'TX, OK, NM, AZ' },
    { id: 'west', name: 'Western US', description: 'CA, OR, WA, ID, NV, UT, CO, MT, WY' },
    { id: 'pacific', name: 'Pacific Northwest', description: 'WA, OR, northern CA, BC' },
    { id: 'british', name: 'British Isles', description: 'England, Scotland, Wales, Ireland' }
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
      id: 'simple', 
      name: 'Undivided', 
      description: 'Simple blade, not divided into leaflets',
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
      regions: ['northeast', 'southeast', 'midwest'],
      habitat: ['forest', 'rock'],
      frondType: 'once',
      size: 'medium',
      texture: 'leathery',
      features: 'Evergreen, dark green fronds with boot-shaped pinnae. Fronds stay green through winter.'
    },
    {
      name: 'Lady Fern',
      scientific: 'Athyrium filix-femina',
      regions: ['northeast', 'midwest', 'pacific', 'west', 'british'],
      habitat: ['forest', 'stream'],
      frondType: 'twice',
      size: 'medium',
      texture: 'delicate',
      features: 'Light green, delicate fronds in vase-like clusters. Very variable species with curved sori.'
    },
    {
      name: 'Cinnamon Fern',
      scientific: 'Osmundastrum cinnamomeum',
      regions: ['northeast', 'southeast', 'midwest'],
      habitat: ['wetland', 'stream'],
      frondType: 'once',
      size: 'large',
      texture: 'delicate',
      features: 'Separate fertile fronds turn cinnamon brown in spring. Woolly cinnamon-colored fiddleheads.'
    },
    {
      name: 'Maidenhair Fern',
      scientific: 'Adiantum pedatum',
      regions: ['northeast', 'midwest', 'pacific', 'west', 'southeast'],
      habitat: ['forest'],
      frondType: 'twice',
      size: 'small',
      texture: 'delicate',
      features: 'Distinctive horseshoe-shaped frond with black wiry stems. Very delicate appearance.'
    },
    {
      name: 'Bracken Fern',
      scientific: 'Pteridium aquilinum',
      regions: ['northeast', 'southeast', 'midwest', 'west', 'pacific', 'british'],
      habitat: ['open', 'forest'],
      frondType: 'thrice',
      size: 'large',
      texture: 'leathery',
      features: 'Aggressive spreader, triangular fronds held horizontally. Forms extensive colonies.'
    },
    {
      name: 'Hay-scented Fern',
      scientific: 'Dennstaedtia punctilobula',
      regions: ['northeast', 'midwest', 'southeast'],
      habitat: ['forest', 'open'],
      frondType: 'twice',
      size: 'medium',
      texture: 'hairy',
      features: 'Forms dense colonies, smells like hay when crushed. Yellow-green color, fine hairs.'
    },
    {
      name: 'Ostrich Fern',
      scientific: 'Matteuccia struthiopteris',
      regions: ['northeast', 'midwest', 'pacific'],
      habitat: ['stream', 'wetland'],
      frondType: 'once',
      size: 'large',
      texture: 'delicate',
      features: 'Tall vase-like clusters up to 6 feet. Separate brown fertile fronds in center persist through winter.'
    },
    {
      name: 'Walking Fern',
      scientific: 'Asplenium rhizophyllum',
      regions: ['northeast', 'midwest', 'southeast'],
      habitat: ['rock'],
      frondType: 'simple',
      size: 'small',
      texture: 'leathery',
      features: 'Long tapering fronds that root at tips forming new plants. Grows on limestone rocks.'
    },
    {
      name: 'Sword Fern',
      scientific: 'Polystichum munitum',
      regions: ['pacific', 'west'],
      habitat: ['forest'],
      frondType: 'once',
      size: 'large',
      texture: 'leathery',
      features: 'Evergreen, stiff upright fronds. Pinnae have pointed tips with small tooth. Most common fern in PNW forests.'
    },
    {
      name: 'Braun\'s Holly Fern',
      scientific: 'Polystichum braunii',
      regions: ['northeast', 'pacific', 'west', 'midwest'],
      habitat: ['forest', 'rock'],
      frondType: 'twice',
      size: 'medium',
      texture: 'leathery',
      features: 'Evergreen with glossy fronds covered in golden-brown scales. Pinnules have bristle-tipped teeth.'
    },
    {
      name: 'Anderson\'s Sword Fern',
      scientific: 'Polystichum andersonii',
      regions: ['pacific', 'west'],
      habitat: ['forest'],
      frondType: 'twice',
      size: 'large',
      texture: 'leathery',
      features: 'Similar to Western Sword Fern but bipinnate. Produces bulblets on fronds. Found in moist forests.'
    },
    {
      name: 'Kruckeberg\'s Sword Fern',
      scientific: 'Polystichum kruckebergii',
      regions: ['pacific', 'west'],
      habitat: ['rock'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      features: 'Small evergreen fern of rocky habitats. Narrow fronds with spiny-toothed pinnae. Endemic to PNW.'
    },
    {
      name: 'Imbricate Sword Fern',
      scientific: 'Polystichum imbricans',
      regions: ['pacific', 'west'],
      habitat: ['rock', 'forest'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      features: 'Compact evergreen fern with overlapping pinnae. Drought tolerant, often on rocky slopes.'
    },
    {
      name: 'Sensitive Fern',
      scientific: 'Onoclea sensibilis',
      regions: ['northeast', 'midwest', 'southeast'],
      habitat: ['wetland', 'stream', 'forest'],
      frondType: 'once',
      size: 'medium',
      texture: 'delicate',
      features: 'Broad triangular fronds, dies at first frost. Separate bead-like fertile fronds persist through winter.'
    },
    {
      name: 'Royal Fern',
      scientific: 'Osmunda regalis',
      regions: ['northeast', 'southeast', 'midwest', 'british'],
      habitat: ['wetland', 'stream'],
      frondType: 'twice',
      size: 'large',
      texture: 'delicate',
      features: 'Tall stately fern with distinctive tassel-like fertile pinnae at frond tips. Tolerates sun.'
    },
    {
      name: 'Interrupted Fern',
      scientific: 'Osmunda claytoniana',
      regions: ['northeast', 'midwest', 'southeast'],
      habitat: ['forest', 'wetland'],
      frondType: 'once',
      size: 'large',
      texture: 'delicate',
      features: 'Fertile pinnae interrupt middle of frond, wither and fall off. Forms large circular clumps.'
    },
    {
      name: 'New York Fern',
      scientific: 'Thelypteris noveboracensis',
      regions: ['northeast', 'midwest', 'southeast'],
      habitat: ['forest', 'wetland'],
      frondType: 'once',
      size: 'medium',
      texture: 'delicate',
      features: 'Distinctive tapering at both top and bottom of frond. Forms colonies, yellow-green color.'
    },
    {
      name: 'Marginal Wood Fern',
      scientific: 'Dryopteris marginalis',
      regions: ['northeast', 'midwest', 'southeast'],
      habitat: ['forest', 'rock'],
      frondType: 'twice',
      size: 'medium',
      texture: 'leathery',
      features: 'Semi-evergreen with blue-green fronds. Sori at margins of pinnules. Common in rocky woods.'
    },
    {
      name: 'Marsh Fern',
      scientific: 'Thelypteris palustris',
      regions: ['northeast', 'midwest', 'southeast', 'west'],
      habitat: ['wetland', 'stream'],
      frondType: 'once',
      size: 'medium',
      texture: 'delicate',
      features: 'Narrow fronds with pinnae nearly perpendicular to rachis. Grows in very wet areas.'
    },
    {
      name: 'Ebony Spleenwort',
      scientific: 'Asplenium platyneuron',
      regions: ['northeast', 'southeast', 'midwest', 'southwest'],
      habitat: ['rock', 'forest'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      features: 'Small evergreen fern with dark brown to black stems. Pinnae alternate along stem.'
    },
    {
      name: 'Maidenhair Spleenwort',
      scientific: 'Asplenium trichomanes',
      regions: ['northeast', 'midwest', 'west', 'pacific', 'southeast', 'british'],
      habitat: ['rock'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      features: 'Delicate evergreen with shiny black stems. Tiny round pinnae. Grows in rock crevices.'
    },
    {
      name: 'Common Polypody',
      scientific: 'Polypodium virginianum',
      regions: ['northeast', 'midwest', 'southeast', 'british'],
      habitat: ['rock', 'forest'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      features: 'Evergreen, grows on rocks and stumps. Deeply lobed pinnae, leathery texture. Drought tolerant.'
    },
    {
      name: 'Spinulose Wood Fern',
      scientific: 'Dryopteris carthusiana',
      regions: ['northeast', 'midwest', 'pacific', 'west'],
      habitat: ['forest', 'wetland'],
      frondType: 'thrice',
      size: 'medium',
      texture: 'delicate',
      features: 'Lacy appearance with finely divided fronds. Semi-evergreen. Very common in moist woods.'
    },
    {
      name: 'Intermediate Wood Fern',
      scientific: 'Dryopteris intermedia',
      regions: ['northeast', 'midwest', 'southeast'],
      habitat: ['forest', 'rock'],
      frondType: 'thrice',
      size: 'medium',
      texture: 'delicate',
      features: 'Similar to Spinulose but more evergreen. Lowest pinnule on bottom pinnae longest.'
    },
    {
      name: 'Long Beech Fern',
      scientific: 'Phegopteris connectilis',
      regions: ['northeast', 'midwest', 'pacific', 'west'],
      habitat: ['forest', 'rock'],
      frondType: 'once',
      size: 'small',
      texture: 'delicate',
      features: 'Triangular fronds with bottom pinnae pointing downward. Grows in cool, moist woods.'
    },
    {
      name: 'Broad Beech Fern',
      scientific: 'Phegopteris hexagonoptera',
      regions: ['northeast', 'midwest', 'southeast'],
      habitat: ['forest'],
      frondType: 'once',
      size: 'medium',
      texture: 'delicate',
      features: 'Broadly triangular fronds held horizontally. Bottom pinnae very large. Forms colonies.'
    },
    {
      name: 'Oak Fern',
      scientific: 'Gymnocarpium dryopteris',
      regions: ['northeast', 'midwest', 'pacific', 'west', 'british'],
      habitat: ['forest', 'rock'],
      frondType: 'twice',
      size: 'small',
      texture: 'delicate',
      features: 'Delicate triangular fronds in three sections. Forms extensive colonies in cool woods.'
    },
    {
      name: 'Bulblet Fern',
      scientific: 'Cystopteris bulbifera',
      regions: ['northeast', 'midwest', 'southeast'],
      habitat: ['rock', 'stream'],
      frondType: 'twice',
      size: 'medium',
      texture: 'delicate',
      features: 'Long narrow fronds with tiny bulblets underneath. Grows on moist limestone cliffs.'
    },
    {
      name: 'Fragile Fern',
      scientific: 'Cystopteris fragilis',
      regions: ['northeast', 'midwest', 'west', 'pacific', 'southeast'],
      habitat: ['rock'],
      frondType: 'twice',
      size: 'small',
      texture: 'delicate',
      features: 'Very delicate, brittle fronds. Grows in rock crevices, especially limestone.'
    },
    {
      name: 'Silvery Glade Fern',
      scientific: 'Deparia acrostichoides',
      regions: ['northeast', 'midwest', 'southeast'],
      habitat: ['forest', 'stream'],
      frondType: 'once',
      size: 'medium',
      texture: 'delicate',
      features: 'Silvery appearance from indusial covering on sori. Prefers rich, moist soil.'
    },
    {
      name: 'Goldie\'s Fern',
      scientific: 'Dryopteris goldiana',
      regions: ['northeast', 'midwest', 'southeast'],
      habitat: ['forest'],
      frondType: 'twice',
      size: 'large',
      texture: 'leathery',
      features: 'Large impressive fern up to 4 feet. Broadest near middle. Rich moist woods.'
    },
    {
      name: 'Crested Wood Fern',
      scientific: 'Dryopteris cristata',
      regions: ['northeast', 'midwest', 'southeast'],
      habitat: ['wetland', 'forest'],
      frondType: 'twice',
      size: 'medium',
      texture: 'leathery',
      features: 'Fertile fronds narrow and upright, sterile fronds shorter and spreading. Wet woods and swamps.'
    },
    {
      name: 'Clinton\'s Wood Fern',
      scientific: 'Dryopteris clintoniana',
      regions: ['northeast', 'midwest'],
      habitat: ['wetland', 'forest'],
      frondType: 'twice',
      size: 'large',
      texture: 'leathery',
      features: 'Hybrid between Crested and Goldie\'s fern. Larger than Crested, grows in wet areas.'
    },
    {
      name: 'Purple-stemmed Cliff Brake',
      scientific: 'Pellaea atropurpurea',
      regions: ['northeast', 'midwest', 'southeast', 'west', 'southwest'],
      habitat: ['rock'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      features: 'Blue-green fronds with dark purple stems. Grows on dry limestone cliffs and rocks.'
    },
    {
      name: 'Rock Cap Fern',
      scientific: 'Polypodium appalachianum',
      regions: ['northeast', 'southeast'],
      habitat: ['rock'],
      frondType: 'once',
      size: 'small',
      texture: 'leathery',
      features: 'Evergreen, grows on acidic rocks. Similar to Common Polypody but prefers acidic substrates.'
    },
    {
      name: 'Rattlesnake Fern',
      scientific: 'Botrypus virginianus',
      regions: ['northeast', 'midwest', 'southeast', 'west'],
      habitat: ['forest', 'open'],
      frondType: 'thrice',
      size: 'small',
      texture: 'delicate',
      features: 'Single broadly triangular sterile frond with separate fertile spike. Related to grape ferns.'
    },
    {
      name: 'Cut-leaved Grape Fern',
      scientific: 'Sceptridium dissectum',
      regions: ['northeast', 'midwest', 'southeast'],
      habitat: ['forest', 'open'],
      frondType: 'thrice',
      size: 'small',
      texture: 'leathery',
      features: 'Bronze-green fronds appear in autumn, persist through winter. Separate fertile spike.'
    },
    {
      name: 'Northern Lady Fern',
      scientific: 'Athyrium angustum',
      regions: ['northeast', 'midwest', 'pacific', 'west'],
      habitat: ['forest', 'wetland'],
      frondType: 'twice',
      size: 'medium',
      texture: 'delicate',
      features: 'Similar to Lady Fern but more northern. Lighter green, more upright growth.'
    },
    {
      name: 'Hart\'s-tongue Fern',
      scientific: 'Asplenium scolopendrium',
      regions: ['british'],
      habitat: ['rock', 'forest'],
      frondType: 'simple',
      size: 'medium',
      texture: 'leathery',
      features: 'Distinctive undivided strap-like fronds with wavy edges. Evergreen, glossy bright green. Prefers limestone.'
    },
    {
      name: 'Male Fern',
      scientific: 'Dryopteris filix-mas',
      regions: ['northeast', 'pacific', 'west', 'british'],
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
      if (selections.habitat && !fern.habitat.includes(selections.habitat)) return false;
      if (selections.frondType && fern.frondType !== selections.frondType) return false;
      if (selections.size && fern.size !== selections.size) return false;
      if (selections.texture && fern.texture !== selections.texture) return false;
      return true;
    });
  };

  const handleSelect = (category, value) => {
    setSelections({ ...selections, [category]: value });
    setStep(step + 1);
  };

  const handleBack = () => {
    const steps = ['region', 'habitat', 'frondType', 'size', 'texture'];
    if (step > 0) {
      const prevCategory = steps[step - 1];
      setSelections({ ...selections, [prevCategory]: null });
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setSelections({
      region: null,
      habitat: null,
      frondType: null,
      size: null,
      texture: null
    });
    setStep(0);
    setShowDatabase(false);
  };

  const renderAnatomyLesson = () => {
    const slide = anatomySlides[lessonSlide];
    const SlideIcon = slide.icon;
    const isLastSlide = lessonSlide === anatomySlides.length - 1;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="text-green-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-800">Fern Anatomy & Morphology</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Slide {lessonSlide + 1} of {anatomySlides.length}
        </p>
        <div className="min-h-[280px]">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <SlideIcon size={22} className="text-green-600" />
            {slide.title}
          </h3>
          <div className="text-gray-700">{slide.content}</div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <button
            onClick={() => setLessonSlide(Math.max(0, lessonSlide - 1))}
            disabled={lessonSlide === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              lessonSlide === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft size={20} />
            Back
          </button>
          {isLastSlide ? (
            <button
              onClick={() => {
                setShowLesson(false);
                setLessonSlide(0);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Start Identifying
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={() => setLessonSlide(lessonSlide + 1)}
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
                         fern.frondType === 'thrice' ? 'Thrice+ divided' : 'Undivided'}
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
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="text-green-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">Habitat Type</h2>
          </div>
          <p className="text-gray-600 mb-2">Where is this fern growing?</p>
          <p className="text-sm text-green-600 mb-6">{matchCount} possible matches</p>
          <div className="grid gap-3">
            {habitats.map(habitat => (
              <button
                key={habitat.id}
                onClick={() => handleSelect('habitat', habitat.id)}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left"
              >
                <div className="font-semibold text-gray-800">{habitat.name}</div>
                <div className="text-sm text-gray-500 mt-1">{habitat.description}</div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (step === 2) {
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
                <div 
                  className="flex-shrink-0 w-20 h-24 bg-green-50 rounded-lg p-2"
                  dangerouslySetInnerHTML={{ __html: type.svg }}
                />
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

    if (step === 3) {
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

    if (step === 4) {
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

    if (step === 5) {
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
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{matches[0].features}</p>
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
                        <p className="text-sm text-gray-600 italic mb-2">{fern.scientific}</p>
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
                    setLessonSlide(0);
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
                    setLessonSlide(0);
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
                <span>Step {step} of 5</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${(step / 5) * 100}%` }}
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
                {selections.habitat && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {habitats.find(h => h.id === selections.habitat)?.name}
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
            Database includes 40 fern species across North America and British Isles
          </p>
        )}
      </div>
    </div>
  );
};

export default FernIdentifier;