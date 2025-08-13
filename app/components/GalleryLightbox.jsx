'use client';
import { useState, useEffect, useRef } from "react";

/**
 * Props:
 *  images: Array<{ src: string; alt?: string; focus?: string }>
 *    - focus: CSS object-position, e.g. "50% 50%" (center), "40% 60%" (x y)
 */
export default function GalleryLightbox({ images = [] }) {
    const [open, setOpen] = useState(false);
    const [idx, setIdx] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 }); // px translate when zoomed
    const dragging = useRef(false);
    const last = useRef({ x: 0, y: 0 });

    const hasImages = Array.isArray(images) && images.length > 0;
    const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
    const next = () => setIdx(i => (i + 1) % images.length);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === "Escape") setOpen(false);
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
            if (e.key === "z") toggleZoom();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    // Reset zoom/pan when switching image or closing
    useEffect(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, [idx, open]);

    const toggleZoom = () => setZoom(z => (z === 1 ? 2 : 1));

    // Drag-to-pan handlers (lightbox)
    const onPointerDown = (e) => {
        if (zoom === 1) return;
        dragging.current = true;
        last.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerMove = (e) => {
        if (!dragging.current) return;
        const dx = e.clientX - last.current.x;
        const dy = e.clientY - last.current.y;
        last.current = { x: e.clientX, y: e.clientY };
        setPan(p => ({ x: p.x + dx, y: p.y + dy }));
    };
    const onPointerUp = () => { dragging.current = false; };

    if (!hasImages) return <div className="text-sm text-neutral-500">No images found.</div>;

    return (
        <>
            {/* Thumbnails – fill boxes with object-cover, keep subject via object-position */}
            <div className="grid sm:grid-cols-2 gap-4">
                {images.map((img, i) => (
                    <div
                        key={img.src}
                        className={`rounded-xl bg-neutral-900/60 border border-neutral-800
                        ${i === 2 ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3]"}
                        overflow-hidden`}
                        onClick={() => { setIdx(i); setOpen(true); }}
                        role="button"
                        aria-label={`Open ${img.alt || "image"} in lightbox`}
                    >
                        <img
                            src={img.src}
                            alt={img.alt || ""}
                            className="w-full h-full object-cover cursor-zoom-in"
                            style={{ objectPosition: img.focus || "50% 50%" }}
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {open && (
                <div
                    className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 p-4"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="relative w-full h-full max-w-[95vw] max-h-[90vh] flex items-center justify-center select-none"
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerUp}
                    >
                        {/* Controls */}
                        <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-white/90">
                            <div className="space-x-2">
                                <button onClick={prev} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded">Prev</button>
                                <button onClick={next} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded">Next</button>
                            </div>
                            <div className="space-x-2">
                                <button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded">Fit</button>
                                <button onClick={toggleZoom} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded">
                                    {zoom === 1 ? "Zoom" : "Reset"}
                                </button>
                                <button onClick={() => setOpen(false)} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded">Close</button>
                            </div>
                        </div>

                        {/* Image – fit by default; when zoomed, allow pan */}
                        <div className="overflow-hidden max-w-full max-h-full">
                            <img
                                src={images[idx].src}
                                alt={images[idx].alt || ""}
                                className="object-contain block"
                                style={{
                                    maxWidth: "95vw",
                                    maxHeight: "85vh",
                                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                                    transformOrigin: "center center",
                                    transition: dragging.current ? "none" : "transform 150ms ease",
                                    cursor: zoom === 1 ? "zoom-in" : "grab",
                                }}
                                onDoubleClick={toggleZoom}
                                draggable={false}
                            />
                        </div>

                        {/* Caption */}
                        <div className="absolute bottom-3 left-0 right-0 text-center text-neutral-300 text-sm">
                            {images[idx].alt}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
