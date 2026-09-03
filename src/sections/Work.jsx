import { useState, useMemo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import SectionWrapper from "../components/layout/SectionWrapper";
import Badge from "../components/ui/Badge";
import ScrollReveal from "../components/shared/ScrollReveal";
import { projects } from "../data/projects";
import { experience, education } from "../data/experience";
import SectionHeading from "../components/ui/SectionHeading";
import { certifications } from "../data/certifications";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  FolderGit2,
  Briefcase,
  Award,
  Maximize2,
  X,
} from "lucide-react";

function slugify(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, " ").replace(/(^-|-$)/g, "");
}

function buildFolders() {
  return [
    {
      key: "projects",
      label: "projects",
      icon: FolderGit2,
      entries: projects.map((p) => ({
        id: `project-${p.id}`,
        filename: slugify(p.name),
        title: p.name,
        meta: p.role,
        description: p.description || p.solution,
        image: p.image,
        tags: p.tech,
        href: p.liveUrl,
      })),
    },
    {
      key: "experience",
      label: "experience",
      icon: Briefcase,
      entries: [
        ...experience.map((exp) => ({
          id: `exp-${slugify(exp.title)}`,
          filename: slugify(exp.title),
          title: exp.title,
          meta: `${exp.org} · ${exp.dates}`,
          description: exp.description,
          images: exp.images,
          metaRows: [
            { label: "role", value: exp.title },
            { label: "org", value: exp.org },
            { label: "duration", value: exp.dates },
          ],
        })),
      ],
    },
    {
      key: "certifications",
      label: "certifications",
      icon: Award,
      entries: certifications.map((c) => ({
        id: `cert-${slugify(c.name)}`,
        filename: slugify(c.name),
        title: c.name,
        meta: `${c.issuer} · ${c.year}`,
        description: null,
        image: c.image,
        tags: c.skills,
        type: "certification",
        metaRows: [
          { label: "cert", value: c.name },
          { label: "issuer", value: c.issuer },
          { label: "year", value: c.year },
        ],
      })),
    },
  ];
}

// Certificate preview modal — rendered via portal so it always overlays the
// full viewport regardless of any transform/animation on ancestor elements
// (ScrollReveal, ScrollWrapper, etc). Supports both image and PDF certs.
function CertificateModal({ entry, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!entry) return null;

  const isPdf = entry.image?.toLowerCase().endsWith(".pdf");

  return createPortal(
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${entry.title} certificate preview`}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/90 backdrop-blur-sm p-4 sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-3xl"
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
              <span className="truncate font-mono text-xs text-muted">
                {entry.filename}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close certificate preview"
                className="shrink-0 rounded-full border border-border p-1.5 text-muted transition-colors hover:border-accent/40 hover:text-accent"
              >
                <X size={15} />
              </button>
            </div>

            <div className="max-h-[80vh] overflow-auto bg-bg">
              {isPdf ? (
                <iframe
                  src={entry.image}
                  title={`${entry.title} certificate`}
                  className="h-[75vh] w-full"
                />
              ) : (
                <img
                  src={entry.image}
                  alt={`${entry.title} certificate`}
                  className="mx-auto max-h-[75vh] w-full object-contain"
                />
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

export default function Work() {
  const folders = useMemo(buildFolders, []);
  const flatEntries = useMemo(() => folders.flatMap((f) => f.entries), [folders]);
  const [activeId, setActiveId] = useState(flatEntries[0]?.id);
  const activeEntry = flatEntries.find((e) => e.id === activeId) || flatEntries[0];
  const listRefs = useRef([]);

  const focusEntry = (index) => {
    const wrapped = (index + flatEntries.length) % flatEntries.length;
    const entry = flatEntries[wrapped];
    setActiveId(entry.id);
    listRefs.current[wrapped]?.focus();
  };

  const handleKeyDown = (e, currentIndex) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusEntry(currentIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusEntry(currentIndex - 1);
    }
  };

  // OJT / gallery photo carousel — auto-advances, pauses on hover,
  // and can also be navigated manually via arrows or dots.
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);
  const galleryImages = activeEntry?.images || [];

  // Certificate preview modal (image/PDF) — only ever opened for
  // certification entries, via the "View certificate" button below.
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  useEffect(() => {
    setGalleryIndex(0);
    setIsCertModalOpen(false);
  }, [activeId]);

  useEffect(() => {
    if (galleryImages.length <= 1 || isGalleryHovered) return;
    const timer = setInterval(() => {
      setGalleryIndex((i) => (i + 1) % galleryImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [galleryImages, isGalleryHovered]);

  const stepGallery = (direction) => {
    if (!galleryImages.length) return;
    setGalleryIndex((i) => (i + direction + galleryImages.length) % galleryImages.length);
  };

  return (
    <SectionWrapper id="projects" className="scroll-mt-24">
      {/* Custom themed scrollbar for the file list + preview panel */}
      <style>{`
        .work-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
        .work-scroll::-webkit-scrollbar-track { background: transparent; }
        .work-scroll::-webkit-scrollbar-thumb {
          background-color: var(--color-accent-dark, #B91C39);
          border-radius: 9999px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        .work-scroll::-webkit-scrollbar-thumb:hover { background-color: var(--color-accent, #E23653); }
        .work-scroll { scrollbar-width: thin; scrollbar-color: var(--color-accent-dark, #B91C39) transparent; }
      `}</style>

      <ScrollReveal>
        
        <SectionHeading
                  title="Projects, experience &amp; certifications"
                  description="Browse it like a codebase — pick a file on the left to open it."
                  showMeta={false}
                />

        <div className="flex flex-col md:flex-row rounded-2xl border border-border bg-surface overflow-hidden">
          {/* Sidebar / file tree */}
          <div className="work-scroll md:w-72 shrink-0 border-b md:border-b-0 md:border-r border-border bg-bg/40 max-h-64 md:max-h-[560px] overflow-y-auto">
            {folders.map((folder) => (
              <div key={folder.key} className="py-2">
                <div className="flex items-center gap-2 px-4 py-1.5 text-muted">
                  <folder.icon size={14} className="text-accent" />
                  <span className="font-mono text-xs capitalize">{folder.label}</span>
                </div>
                <div className="ml-3 border-l border-border">
                  {folder.entries.map((entry) => {
                    const index = flatEntries.findIndex((e) => e.id === entry.id);
                    const isActive = entry.id === activeEntry?.id;
                    return (
                      <button
                        key={entry.id}
                        ref={(el) => (listRefs.current[index] = el)}
                        type="button"
                        onClick={() => setActiveId(entry.id)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        aria-current={isActive}
                        className={
                          isActive
                            ? "group w-full flex items-center gap-2 text-left pl-4 pr-3 py-2.5 md:py-1.5 font-mono text-[13px] md:text-xs text-ink bg-accent/15 border-l-[3px] border-accent -ml-px focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                            : "group w-full flex items-center gap-2 text-left pl-4 pr-3 py-2.5 md:py-1.5 font-mono text-[13px] md:text-xs text-muted hover:text-ink hover:bg-bg/60 border-l-[3px] border-transparent -ml-px focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                        }
                      >
                        <span
                          className={
                            isActive
                              ? "h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                              : "h-1.5 w-1.5 shrink-0 rounded-full bg-transparent group-hover:bg-border"
                          }
                        />
                        <span className="truncate capitalize">{entry.filename}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Preview panel */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3 shrink-0">
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="ml-2 font-mono text-xs text-muted truncate capitalize">{activeEntry?.filename}</span>
            </div>

            <div className="work-scroll flex-1 p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEntry?.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {activeEntry?.image && (
                  <div className="max-w-sm mx-auto rounded-lg overflow-hidden border border-border bg-bg mb-2">
                    <img
                      src={activeEntry.image}
                      alt={activeEntry.title}
                      loading="lazy"
                      className="w-100 h-50 sm:h-60 cover"
                    />
                  </div>
                )}

                  {/* Certification entries get a "View certificate" trigger
                      that opens the full image/PDF in a modal preview. */}
                  {activeEntry?.type === "certification" && activeEntry?.image && (
                    <div className="max-w-sm mx-auto mb-5 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setIsCertModalOpen(true)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 font-mono text-xs text-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent"
                      >
                        <Maximize2 size={13} />
                        View certificate
                      </button>
                    </div>
                  )}

                  {activeEntry?.images?.length > 0 && (
                    <div
                      className="max-w-sm mx-auto relative mt-0 rounded-lg overflow-hidden border border-border bg-bg h-40 sm:h-60 group/gallery mb-5"
                      onMouseEnter={() => setIsGalleryHovered(true)}
                      onMouseLeave={() => setIsGalleryHovered(false)}
                    >
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={galleryImages[galleryIndex]}
                          src={galleryImages[galleryIndex]}
                          alt={`${activeEntry.title} sample ${galleryIndex + 1}`}
                          loading="lazy"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="w-100 h-50 sm:h-60 cover"
                        />
                      </AnimatePresence>

                      {galleryImages.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={() => stepGallery(-1)}
                            aria-label="Previous photo"
                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-bg/70 border border-border p-1.5 text-ink opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:bg-accent hover:border-accent hover:text-white focus:outline-none focus-visible:opacity-100"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => stepGallery(1)}
                            aria-label="Next photo"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-bg/70 border border-border p-1.5 text-ink opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:bg-accent hover:border-accent hover:text-white focus:outline-none focus-visible:opacity-100"
                          >
                            <ChevronRight size={16} />
                          </button>

                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                            {galleryImages.map((_, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setGalleryIndex(idx)}
                                aria-label={`Go to photo ${idx + 1}`}
                                className={
                                  idx === galleryIndex
                                    ? "h-1.5 w-4 rounded-full bg-accent transition-all"
                                    : "h-1.5 w-1.5 rounded-full bg-ink/40 hover:bg-ink/70 transition-all"
                                }
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  {activeEntry?.meta && <p className="text-sm text-accent mt-1">{activeEntry.meta}</p>}
 
                  {/* Code-comment styled metadata block for experience / education / certification entries */}
                  {activeEntry?.metaRows?.length > 0 && (
                    <div className="mt-4 rounded-lg border border-border bg-bg/60 px-4 py-3 font-mono text-xs text-muted space-y-1">
                      {activeEntry.metaRows.map((row) => (
                        <p key={row.label}>
                          <span className="text-accent"> </span>
                          <span className="text-muted">{row.label}: </span>
                          <span className="text-ink">{row.value}</span>
                        </p>
                      ))}
                    </div>
                  )}
 
                  {activeEntry?.description && (
                    <p className="text-sm text-muted leading-relaxed mt-4">{activeEntry.description}</p>
                  )}
                  {activeEntry?.tags?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {activeEntry.tags.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {isCertModalOpen && activeEntry?.type === "certification" && (
        <CertificateModal
          entry={activeEntry}
          onClose={() => setIsCertModalOpen(false)}
        />
      )}
    </SectionWrapper>
  );
}