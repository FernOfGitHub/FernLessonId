/**
 * Quiz question bank and lesson-step logic for the anatomy lesson.
 * Extracted from src/FernIdentifier.tsx.
 *
 * buildLessonSteps takes the number of content slides as a parameter
 * (rather than importing anatomySlides directly) to avoid a circular
 * dependency, since anatomySlides itself lives in FernIdentifier.tsx.
 */
import pinnateImg from '../../pictures/Cut/pinnate.jpg';
import circularImg from '../../pictures/Sori/Circular.jpg';

export type QuizQuestion = { question: string; options: { text: string; correct: boolean }[]; image?: string };
export type TrueFalseQuestion = { question: string; correct: boolean };
export const sectionTrueFalse: TrueFalseQuestion[][] = [
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

export function toQuizQuestion(tf: TrueFalseQuestion): QuizQuestion {
  const opts = shuffle([
    { text: 'True', correct: tf.correct },
    { text: 'False', correct: !tf.correct },
  ]);
  return { question: tf.question, options: opts };
}

export const sectionQuestions: QuizQuestion[][] = [
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

export function getSectionPool(sectionIndex: number): QuizQuestion[] {
  const mc = sectionQuestions[sectionIndex].map((q) => ({ ...q, options: shuffle([...q.options]) }));
  const tf = sectionTrueFalse[sectionIndex].map(toQuizQuestion);
  return shuffle([...mc, ...tf]);
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickRandom<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

export type LessonStep = { type: 'content'; slideIndex: number } | { type: 'practice'; sectionIndex: number } | { type: 'finalQuizIntro' } | { type: 'finalQuiz' } | { type: 'finalQuizResults' };

export const SECTION_TITLES = [
  'Frond & Stipe',
  'Pinnae & Pinnules',
  'Frond Division',
  'Frond Division (Advanced)',
  'Sori',
  'Growth Patterns',
  'Rhizome & Roots',
  'Fern Reproduction',
];

export function buildLessonSteps(numContentSlides: number): LessonStep[] {
  const steps: LessonStep[] = [];
  for (let i = 0; i < numContentSlides; i++) {
    steps.push({ type: 'content', slideIndex: i });
    // Add a practice quiz after every content slide except the last ("You're Ready")
    if (i < numContentSlides - 1) {
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
