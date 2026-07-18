/**
 * Link to iNaturalist observations for a given scientific name.
 * Extracted from src/FernIdentifier.tsx.
 */

/** Horsetail DB uses "E. arvense"; expand to "Equisetum arvense" for iNaturalist search */
export function inaturalistTaxonSearchQuery(scientificName) {
  const t = (scientificName || '').trim();
  if (!t) return '';
  if (/^E\.\s+/i.test(t)) return 'Equisetum ' + t.replace(/^E\.\s+/i, '');
  return t;
}

export function InaturalistSpeciesLink({ scientificName, className = 'mt-3 text-sm' }) {
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
