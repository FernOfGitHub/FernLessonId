import { useState, useMemo, createContext, useContext } from 'react';
import { X } from 'lucide-react';

/**
 * Click-to-enlarge image lightbox used throughout the app.
 * Extracted from src/FernIdentifier.tsx.
 */
export const ImageLightboxContext = createContext(null);

export function ImageLightboxProvider({ children }) {
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

export function ClickableImg({ src, alt, className, fullSizeSrc }) {
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
