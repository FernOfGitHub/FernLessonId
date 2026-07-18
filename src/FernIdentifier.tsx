import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Leaf, MapPin, Home, Database, BookOpen, TrafficCone } from 'lucide-react';
import { ImageLightboxProvider, ClickableImg } from './components/ImageLightbox';
import { getLatinName } from './latinNames';
import { InaturalistSpeciesLink } from './components/InaturalistSpeciesLink';
import { getFernIdImages, getHorsetailIdImages, getClubmossIdImages } from './data/idImages';
import { frondTypes } from './data/frondTypes';
import { anatomySlides } from './data/anatomySlides';
import { STIPE_RACHIS_BY_SCIENTIFIC, inferStipeColorBucket } from './fernStipeRachisIndument';
import { FROND_OUTLINE_BY_SCIENTIFIC, FROND_OUTLINE_DEFINITIONS, FROND_OUTLINE_ORDER } from './fernFrondOutline';
import { fernDatabaseBase } from './data/fernSpecies';
import { HORSETAIL_DATABASE, CLUBMOSS_DATABASE } from './data/lycophyteDatabase';
import { regions, habitats, textures, identifierSoriBuckets, getIdentifierSoriBucket } from './data/identifierOptions';
import {
  QuizQuestion,
  sectionQuestions,
  getSectionPool,
  shuffle,
  pickRandom,
  SECTION_TITLES,
  buildLessonSteps,
} from './data/quizContent';

// Real fern photos from pictures/Cut and pictures/Sori
import clubmossHorsetailImg from '../pictures/anatomy/clubmoss-horsetail.png';
import clubmossPlantImg from '../pictures/anatomy/clubmoss-plant.jpg';
import clubmossStroboliImg from '../pictures/anatomy/clubmoss-stroboli.jpg';
import horsetailBranchedImg from '../pictures/anatomy/horsetail-branched.jpg';
import horsetailUnbranchedImg from '../pictures/anatomy/horsetail-unbranched.jpg';
import horsetailSegmentsImg from '../pictures/anatomy/horsetail-segments.jpg';
import horsetailStrobiliImg from '../pictures/anatomy/horsetail-stroboli.jpg';
import branchedUnbranchedImg from '../pictures/anatomy/branched-unbranched.png';
import equisetumTeethImg from '../pictures/anatomy/equisetum-teeth.png';

const LESSON_STEPS = buildLessonSteps(anatomySlides.length);

const INTRO_LINES = [
  'Welcome to this fern tutorial and identifier.',
  'This site is for newly minted botanists or those who struggle reading keys in a fern guide.',
  'I hope this site makes those keys more understandable.',
  '',
  'Enjoy.',
  '',
  '[This is an early, early development version]',
  'Version 0.5  18Jul26',
  '@fernleaf07.bsky.social',
];

const LYCOPHYTE_INTRO_PARAGRAPH = `Ferns, lycophytes, and horsetails all reproduce by spores, but they look very different. Ferns have fronds with pinnae and sori; lycophytes have tiny leaves and spore cones (strobili); horsetails have hollow jointed stems and no true fronds. If you've found a plant that doesn't match fern structure, it may be a lycophyte or horsetail—and those use different keys and terms. This section outlines their morphology so you know which kind of key to use.`;

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
  /** Sub-step within wizard step 5 (stipe/rachis): 0 = surface, 1 = grooved, 2 = color. */
  const [indumentSubStep, setIndumentSubStep] = useState(0);
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
    frondOutline: null,
    stipeSurface: null,
    stipeGroovedUser: null,
    stipeColorBucket: null,
  });

  const fernDatabase = fernDatabaseBase.map((fern) => ({
    ...fern,
    stipeRachisIndument: STIPE_RACHIS_BY_SCIENTIFIC[fern.scientific],
    frondOutline: FROND_OUTLINE_BY_SCIENTIFIC[fern.scientific],
  }));

  const fernMatchesFrondType = (fern, typeId) => {
    if (!typeId) return true;
    if (fern.frondType === typeId) return true;
    return (fern.frondTypeAlternates || []).includes(typeId);
  };

  const getMatchesFor = (sel) => {
    return fernDatabase.filter(fern => {
      if (sel.region && !fern.regions.includes(sel.region)) return false;
      if (sel.frondType && !fernMatchesFrondType(fern, sel.frondType)) return false;
      if (sel.soriPresent === 'yes' && sel.soriBucket) {
        if (getIdentifierSoriBucket(fern) !== sel.soriBucket) return false;
      }
      if (sel.frondOutline && fern.frondOutline !== sel.frondOutline) return false;
      if (sel.stipeSurface && fern.stipeRachisIndument?.surface !== sel.stipeSurface) return false;
      if (sel.stipeGroovedUser && sel.stipeGroovedUser !== 'skip') {
        const g = fern.stipeRachisIndument?.grooved;
        if (sel.stipeGroovedUser === 'channelled') {
          if (g !== 'yes' && g !== 'variable') return false;
        }
        if (sel.stipeGroovedUser === 'smooth') {
          if (g !== 'no' && g !== 'variable') return false;
        }
      }
      if (sel.stipeColorBucket != null && sel.stipeColorBucket !== 'skip' && fern.stipeRachisIndument) {
        const b = inferStipeColorBucket(fern.stipeRachisIndument);
        if (b !== 'other' && b !== sel.stipeColorBucket) return false;
      }
      return true;
    });
  };

  const getMatches = () => getMatchesFor(selections);

  const RESULTS_STEP = 7;

  const advanceOrResults = (nextSelections, defaultNextStep) => {
    if (getMatchesFor(nextSelections).length === 1) {
      setStep(RESULTS_STEP);
    } else {
      setStep(defaultNextStep);
    }
  };

  const applySelectionAndAdvance = (nextSelections, defaultNextStep) => {
    setSelections(nextSelections);
    advanceOrResults(nextSelections, defaultNextStep);
  };

  const applySelectionAndAdvanceIndument = (nextSelections, nextSubStep) => {
    setSelections(nextSelections);
    if (getMatchesFor(nextSelections).length === 1) {
      setStep(RESULTS_STEP);
    } else {
      setIndumentSubStep(nextSubStep);
    }
  };

  const formatHabitat = (fern) =>
    fern.habitat?.map(id => habitats.find(h => h.id === id)?.name).filter(Boolean).join(', ') || '—';

  const formatGrowthPattern = (fern) => fern.growthPattern || '—';

  const formatSoriType = (fern) => fern.soriType || '—';

  const formatStipeRachisIndument = (fern) => {
    const s = fern.stipeRachisIndument;
    if (!s) return '—';
    const surfaceLabel =
      s.surface === 'plain' ? 'Plain (glabrous)' : s.surface === 'scales' ? 'Scales' : 'Hairs';
    const groovedLabel =
      s.grooved === 'yes' ? 'Grooved' : s.grooved === 'no' ? 'Not grooved' : 'Grooving variable';
    const color = (s.color || '').trim() || '—';
    return `${surfaceLabel}; color: ${color}; ${groovedLabel}`;
  };

  const formatFrondOutline = (fern) => {
    const id = fern.frondOutline;
    if (!id) return '—';
    const def = FROND_OUTLINE_DEFINITIONS[id];
    return def ? def.name : id;
  };

  const handleSelect = (category, value) => {
    applySelectionAndAdvance({ ...selections, [category]: value }, step + 1);
  };

  const handleBack = () => {
    if (step === 0) return;
    if (step === 7) {
      if (selections.stipeColorBucket != null) {
        setSelections(prev => ({ ...prev, stipeColorBucket: null }));
        setIndumentSubStep(2);
        setStep(6);
        return;
      }
      if (selections.stipeGroovedUser != null) {
        setSelections(prev => ({ ...prev, stipeGroovedUser: null }));
        setIndumentSubStep(1);
        setStep(6);
        return;
      }
      if (selections.stipeSurface != null) {
        setSelections(prev => ({
          ...prev,
          stipeSurface: null,
          stipeGroovedUser: null,
          stipeColorBucket: null,
        }));
        setIndumentSubStep(0);
        setStep(6);
        return;
      }
      if (selections.frondOutline != null) {
        setSelections(prev => ({ ...prev, frondOutline: null }));
        setIndumentSubStep(0);
        setStep(5);
        return;
      }
      if (selections.soriPresent === 'yes' && selections.soriBucket != null) {
        setSelections(prev => ({ ...prev, soriBucket: null }));
        setStep(4);
        return;
      }
      if (selections.soriPresent != null) {
        setSelections(prev => ({ ...prev, soriPresent: null, soriBucket: null }));
        setStep(3);
        return;
      }
      if (selections.frondType != null) {
        setStep(2);
        return;
      }
      if (selections.region != null) {
        setSelections(prev => ({ ...prev, region: null }));
        setStep(0);
        return;
      }
      return;
    }
    if (step === 6) {
      if (indumentSubStep === 2) {
        setSelections(prev => ({ ...prev, stipeColorBucket: null }));
        setIndumentSubStep(1);
        return;
      }
      if (indumentSubStep === 1) {
        setSelections(prev => ({ ...prev, stipeGroovedUser: null }));
        setIndumentSubStep(0);
        return;
      }
      setSelections(prev => ({
        ...prev,
        stipeSurface: null,
        stipeGroovedUser: null,
        stipeColorBucket: null,
      }));
      setIndumentSubStep(0);
      setStep(5);
      return;
    }
    if (step === 5) {
      setSelections(prev => ({ ...prev, frondOutline: null }));
      if (selections.soriPresent === 'yes') {
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
      frondOutline: null,
      stipeSurface: null,
      stipeGroovedUser: null,
      stipeColorBucket: null,
    });
    setIndumentSubStep(0);
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
            const stipeText = formatStipeRachisIndument(fern).toLowerCase();
            const outlineText = formatFrondOutline(fern).toLowerCase();
            const searchText = `${name} ${scientific} ${features} ${regionNames} ${habitatNames} ${growthText} ${soriText} ${stipeText} ${outlineText}`;
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
              placeholder="Search by name, Latin name, features, growth, sori, stipe/rachis, frond outline, region, or habitat..."
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
                          {(() => {
                            const labels = {
                              once: 'Once divided',
                              pinnatifid: 'Pinnatifid',
                              twice: 'Twice divided',
                              bipinnatePinnatifid: 'Bipinnate pinnatifid',
                              thrice: 'Thrice+ divided',
                              pedate: 'Pedate',
                              simple: 'Undivided',
                            };
                            const primary = labels[fern.frondType] || 'Other';
                            const altLabels = (fern.frondTypeAlternates || [])
                              .map((id) => labels[id])
                              .filter(Boolean);
                            return altLabels.length ? `${primary} or ${altLabels.join(' or ')}` : primary;
                          })()}
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
                      <div className="mt-1 text-xs text-gray-500">
                        Stipe/rachis: {formatStipeRachisIndument(fern)}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        Frond outline: {formatFrondOutline(fern)}
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
      const regionalMatches = getMatches();
      return (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Species in your region</h2>
          <p className="text-gray-600 mb-4">
            {regionalMatches.length} species occur in this region. Continue to narrow by frond division.
          </p>
          <ul className="space-y-0 max-h-[28rem] overflow-y-auto pr-2 mb-6 border border-gray-200 rounded-lg divide-y divide-gray-200">
            {regionalMatches.map((fern, idx) => (
              <li key={idx} className="px-4 py-3">
                <span className="font-semibold text-gray-800">{fern.name}</span>
                <span className="text-gray-600 italic"> — {fern.scientific}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => advanceOrResults(selections, 2)}
            className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
          >
            Continue to frond division
          </button>
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

    if (step === 3) {
      const beforeSori = getMatchesFor({
        ...selections,
        soriPresent: null,
        soriBucket: null,
        frondOutline: null,
        stipeSurface: null,
        stipeGroovedUser: null,
        stipeColorBucket: null,
      });
      const n = beforeSori.length;
      return (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sori</h2>
          <p className="text-gray-600 mb-2">
            On the fronds you are keying (often the underside of pinnae or pinnules), do you see sori—clusters of
            sporangia?
          </p>
          <p className="text-gray-600 mb-4">
            {n} species match region and frond division:
          </p>
          <ul className="space-y-0 max-h-[28rem] overflow-y-auto pr-2 mb-6 border border-gray-200 rounded-lg divide-y divide-gray-200">
            {beforeSori.map((fern, idx) => (
              <li key={idx} className="px-4 py-3">
                <span className="font-semibold text-gray-800">{fern.name}</span>
                <span className="text-gray-600 italic"> — {fern.scientific}</span>
              </li>
            ))}
          </ul>
          <div className="grid gap-3">
            <button
              type="button"
              onClick={() => {
                applySelectionAndAdvance({ ...selections, soriPresent: 'yes', soriBucket: null }, 4);
              }}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left"
            >
              <div className="font-semibold text-gray-800">Yes — sori visible on the blade</div>
              <div className="text-sm text-gray-500 mt-1">Next you will choose which sori type best matches.</div>
            </button>
            <button
              type="button"
              onClick={() => {
                const next = { ...selections, soriPresent: 'no', soriBucket: null };
                setSelections(next);
                setIndumentSubStep(0);
                advanceOrResults(next, 5);
              }}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left"
            >
              <div className="font-semibold text-gray-800">No / not on ordinary green pinnae</div>
              <div className="text-sm text-gray-500 mt-1">
                e.g. sporangia only on fertile spikes, separate fertile fronds, or not visible yet — skip sori type
                and go to frond outline.
              </div>
            </button>
          </div>
        </div>
      );
    }

    if (step === 4) {
      const partial = getMatchesFor({
        ...selections,
        soriBucket: null,
        frondOutline: null,
        stipeSurface: null,
        stipeGroovedUser: null,
        stipeColorBucket: null,
      });
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
                  applySelectionAndAdvance({ ...selections, soriPresent: 'yes', soriBucket: b.id }, 5);
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
      const partial = getMatchesFor({
        ...selections,
        frondOutline: null,
        stipeSurface: null,
        stipeGroovedUser: null,
        stipeColorBucket: null,
      });
      const availableOutlines = new Set(
        partial.map((fern) => fern.frondOutline).filter(Boolean)
      );
      const outlineOptions = FROND_OUTLINE_ORDER.filter((id) => availableOutlines.has(id));
      return (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Frond outline</h2>
          <p className="text-gray-600 mb-2">
            Looking at the whole frond silhouette, how do the pinnae change in size along the rachis?
          </p>
          <p className="text-gray-600 mb-4">
            {partial.length} species match at this point:
          </p>
          <ul className="space-y-0 max-h-[28rem] overflow-y-auto pr-2 mb-6 border border-gray-200 rounded-lg divide-y divide-gray-200">
            {partial.map((fern, idx) => (
              <li key={idx} className="px-4 py-3">
                <span className="font-semibold text-gray-800">{fern.name}</span>
                <span className="text-gray-600 italic"> — {fern.scientific}</span>
              </li>
            ))}
          </ul>
          <div className="grid gap-3">
            {outlineOptions.map((id) => {
              const def = FROND_OUTLINE_DEFINITIONS[id];
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    const next = { ...selections, frondOutline: id };
                    setSelections(next);
                    setIndumentSubStep(0);
                    advanceOrResults(next, 6);
                  }}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left"
                >
                  <div className="font-semibold text-gray-800">{def.name}</div>
                  <div className="text-sm text-gray-500 mt-1">{def.description}</div>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    if (step === 6) {
      const indumentMatches = getMatches();
      const indumentMatchCount = indumentMatches.length;
      const indumentSpeciesList = (
        <>
          <p className="text-gray-600 mb-4">
            {indumentMatchCount} species match at this point:
          </p>
          <ul className="space-y-0 max-h-[28rem] overflow-y-auto pr-2 mb-6 border border-gray-200 rounded-lg divide-y divide-gray-200">
            {indumentMatches.map((fern, idx) => (
              <li key={idx} className="px-4 py-3">
                <span className="font-semibold text-gray-800">{fern.name}</span>
                <span className="text-gray-600 italic"> — {fern.scientific}</span>
              </li>
            ))}
          </ul>
        </>
      );
      const surfaceOptions = [
        {
          id: 'plain',
          name: 'Plain (glabrous)',
          description: 'No obvious scales or hairs on the stipe or rachis — smooth or shiny.',
        },
        {
          id: 'scales',
          name: 'Scales',
          description: 'Flat scales (like tiny shingles) that you can see or feel along the stalk.',
        },
        {
          id: 'hairs',
          name: 'Hairs or wool',
          description: 'Hairs, fuzz, or woolly coat on the stipe or rachis (not just on fiddleheads).',
        },
      ];
      const groovedOptions = [
        {
          id: 'channelled',
          name: 'Grooved or channelled',
          description: 'The rachis (central “midrib” of the blade) has a noticeable groove or channel on the upper side.',
        },
        {
          id: 'smooth',
          name: 'Smooth or not obviously grooved',
          description: 'No clear channel on the rachis, or hard to tell in the field.',
        },
        {
          id: 'skip',
          name: 'Not sure — skip this',
          description: 'Do not use rachis grooving to narrow results.',
        },
      ];
      const colorOptions = [
        {
          id: 'green-straw',
          name: 'Mostly green or light',
          description: 'Axes mostly green, or green with only light/straw tones — not strongly brown or black.',
        },
        {
          id: 'golden-brown',
          name: 'Straw, golden, tan, or rusty brown',
          description: 'Clearly straw-colored, golden, tan, cinnamon, or medium brown scales or hairs.',
        },
        {
          id: 'dark',
          name: 'Dark (black, purple-black, deep brown)',
          description: 'Dark brown to black stalks, or glossy purple-black like many maidenhair stipes.',
        },
        {
          id: 'skip',
          name: 'Not sure — skip this',
          description: 'Do not use stalk color to narrow results.',
        },
      ];

      if (indumentSubStep === 0) {
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Stipe and rachis — surface</h2>
            <p className="text-gray-600 mb-2">
              Look at the stipe (stalk below the blade) and the rachis (stalk within the blade). What best describes
              the surface?
            </p>
            <p className="text-sm text-gray-500 mb-2">Step 1 of 3 — indument</p>
            {indumentSpeciesList}
            <div className="grid gap-3">
              {surfaceOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    applySelectionAndAdvanceIndument({ ...selections, stipeSurface: opt.id }, 1);
                  }}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left"
                >
                  <div className="font-semibold text-gray-800">{opt.name}</div>
                  <div className="text-sm text-gray-500 mt-1">{opt.description}</div>
                </button>
              ))}
            </div>
          </div>
        );
      }

      if (indumentSubStep === 1) {
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Stipe and rachis — groove</h2>
            <p className="text-gray-600 mb-2">
              On the upper side of the rachis, is there a narrow groove running along its length (common in many
              temperate ferns)?
            </p>
            <p className="text-sm text-gray-500 mb-2">Step 2 of 3 — indument</p>
            {indumentSpeciesList}
            <div className="grid gap-3">
              {groovedOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    applySelectionAndAdvanceIndument({ ...selections, stipeGroovedUser: opt.id }, 2);
                  }}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left"
                >
                  <div className="font-semibold text-gray-800">{opt.name}</div>
                  <div className="text-sm text-gray-500 mt-1">{opt.description}</div>
                </button>
              ))}
            </div>
          </div>
        );
      }

      return (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Stipe and rachis — color</h2>
          <p className="text-gray-600 mb-2">Overall color of the stipe and rachis (ignore the green blade).</p>
          <p className="text-sm text-gray-500 mb-2">Step 3 of 3 — indument</p>
          {indumentSpeciesList}
          <div className="grid gap-3">
            {colorOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  applySelectionAndAdvance({ ...selections, stipeColorBucket: opt.id }, RESULTS_STEP);
                }}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left"
              >
                <div className="font-semibold text-gray-800">{opt.name}</div>
                <div className="text-sm text-gray-500 mt-1">{opt.description}</div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (step === 7) {
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
                  <p className="text-sm text-gray-600 mt-1">Stipe/rachis: {formatStipeRachisIndument(matches[0])}</p>
                  <p className="text-sm text-gray-600 mt-1">Frond outline: {formatFrondOutline(matches[0])}</p>
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
                        <p className="text-xs text-gray-500 mb-2">Stipe/rachis: {formatStipeRachisIndument(fern)}</p>
                        <p className="text-xs text-gray-500 mb-2">Frond outline: {formatFrondOutline(fern)}</p>
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
                <span>Step {step} of 7</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${(step / 7) * 100}%` }}
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
                {selections.frondOutline && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Outline: {FROND_OUTLINE_DEFINITIONS[selections.frondOutline]?.name ?? selections.frondOutline}
                  </span>
                )}
                {selections.stipeSurface && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Stipe/rachis:{' '}
                    {selections.stipeSurface === 'plain'
                      ? 'Plain'
                      : selections.stipeSurface === 'scales'
                        ? 'Scales'
                        : 'Hairs'}
                  </span>
                )}
                {selections.stipeGroovedUser && selections.stipeGroovedUser !== 'skip' && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Rachis:{' '}
                    {selections.stipeGroovedUser === 'channelled' ? 'Grooved' : 'Smooth / not obvious'}
                  </span>
                )}
                {selections.stipeColorBucket && selections.stipeColorBucket !== 'skip' && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Stalk color:{' '}
                    {selections.stipeColorBucket === 'green-straw'
                      ? 'Green / light'
                      : selections.stipeColorBucket === 'golden-brown'
                        ? 'Straw / golden / brown'
                        : 'Dark'}
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
            Database includes 103 fern species across North America (including Canada), UK, Europe, Japan, Australia, Tasmania, and New Zealand
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
