/**
 * Frond division/type options (with silhouette SVGs and thumbnail images)
 * used by the identifier wizard's frond-type step.
 * Extracted from src/FernIdentifier.tsx.
 */
import bipinnate1x1BwImg from '../../pictures/Cut/bipinnate_1x1_bw.png';
import bipinnateBwImg from '../../pictures/Cut/bipinnate_bw.png';
import bipinnatePinnatifid1x1BwImg from '../../pictures/Cut/bipinnate_pinnatifid_1x1_bw.png';
import bipinnatePinnatifidBwImg from '../../pictures/Cut/bipinnate_pinnatifid_bw.png';
import entire1x1BwImg from '../../pictures/Cut/entire_1x1_bw.png';
import entireBwImg from '../../pictures/Cut/entire_bw.png';
import pedateImg from '../../pictures/Cut/pedate.jpg';
import pinnate1x1BwImg from '../../pictures/Cut/pinnate_1x1_bw.png';
import pinnateBwImg from '../../pictures/Cut/pinnate_bw.png';
import pinnatifid1x1BwImg from '../../pictures/Cut/pinnatifid_1x1_bw.png';
import pinnatifidBwImg from '../../pictures/Cut/pinnatifid_bw.png';

export const frondTypes = [
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
