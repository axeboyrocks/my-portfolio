"use client";
import { useEffect, useMemo, useRef, useState } from "react";

export default function ThreeSixtyViewer({
    dir = "/images/projects/robot-360",
    baseName = "robot-360",
    ext = "png",
    frameCount = 11,
    widthClass = "w-full",
    aspectClass = "aspect-video",
    autoPlay = true,
    autoSpeed = 120, // ms per frame
    dragSensitivity = 6, // pixels to move 1 frame
    showControls = true,
}) {
    const [frame, setFrame] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [loaded, setLoaded] = useState(0);
    const [playing, setPlaying] = useState(autoPlay);

    const startX = useRef(0);
    const lastX = useRef(0);
    const autoplayTimer = useRef(null);

    // Build the image list
    const sources = useMemo(() => {
        const pad = (n) => String(n).padStart(2, "0");
        return Array.from({ length: frameCount }, (_, i) => `${dir}/${baseName}-${pad(i + 1)}.${ext}`);
    }, [dir, baseName, ext, frameCount]);

    // Preload images
    useEffect(() => {
        let cancelled = false;
        let loadedCount = 0;
        sources.forEach((src) => {
            const img = new Image();
            img.onload = () => {
                loadedCount += 1;
                if (!cancelled) setLoaded(loadedCount);
            };
            img.src = src;
        });
        return () => { cancelled = true; };
    }, [sources]);

    // Helper: clear interval safely
    const clearAutoplay = () => {
        if (autoplayTimer.current) {
            clearInterval(autoplayTimer.current);
            autoplayTimer.current = null;
        }
    };

    // Autoplay effect tied to 'playing'
    useEffect(() => {
        clearAutoplay();
        if (playing) {
            autoplayTimer.current = setInterval(() => {
                setFrame((f) => (f + 1) % frameCount);
            }, autoSpeed);
        }
        return clearAutoplay; // cleanup on unmount or dep change
    }, [playing, autoSpeed, frameCount]);

    // Pause when tab not visible
    useEffect(() => {
        const onVis = () => setPlaying((prev) => (document.hidden ? false : (autoPlay ? true : prev)));
        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, [autoPlay]);

    // Drag handlers
    const onPointerDown = (e) => {
        setIsDragging(true);
        setPlaying(false); // pause autoplay while dragging
        startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
        lastX.current = startX.current;
    };

    const onPointerMove = (e) => {
        if (!isDragging) return;
        const x = e.clientX ?? e.touches?.[0]?.clientX ?? lastX.current;
        const delta = x - lastX.current;
        if (Math.abs(delta) >= dragSensitivity) {
            const steps = Math.round(delta / dragSensitivity);
            setFrame((f) => {
                let next = (f - steps) % frameCount; // drag right -> forward
                if (next < 0) next += frameCount;
                return next;
            });
            lastX.current = x;
        }
    };

    const onPointerUp = () => {
        setIsDragging(false);
        // resume only if autoplay enabled by prop
        if (autoPlay) setPlaying(true);
    };

    // Prevent default touch scrolling while dragging
    const onTouchMove = (e) => {
        if (isDragging) e.preventDefault();
        onPointerMove(e);
    };

    // Keyboard support
    const onKeyDown = (e) => {
        if (e.key === "ArrowRight") setFrame((f) => (f + 1) % frameCount);
        if (e.key === "ArrowLeft") setFrame((f) => (f - 1 + frameCount) % frameCount);
    };

    return (
        <div className={`${widthClass} ${aspectClass} select-none`}>
            <div
                className="relative w-full h-full bg-neutral-900 rounded-xl overflow-hidden"
                onMouseDown={onPointerDown}
                onMouseMove={onPointerMove}
                onMouseUp={onPointerUp}
                onMouseLeave={onPointerUp}
                onTouchStart={onPointerDown}
                onTouchMove={onTouchMove}
                onTouchEnd={onPointerUp}
                onKeyDown={onKeyDown}
                tabIndex={0}
                role="application"
                aria-label="360 degree viewer"
            >
                {/* Image */}
                <img
                    src={sources[frame]}
                    alt={`Robot car angle ${frame + 1}/${frameCount}`}
                    className="absolute inset-0 w-full h-full object-contain"
                    draggable={false}
                />

                {/* Loading overlay */}
                {loaded < frameCount && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm">
                        Loading {loaded}/{frameCount}…
                    </div>
                )}

                {/* Controls */}
                {showControls && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 rounded-full px-3 py-1 text-xs">
                        <button
                            className="px-2 py-1 hover:bg-white/10 rounded"
                            onClick={() => setFrame((f) => (f - 1 + frameCount) % frameCount)}
                        >
                            ◀
                        </button>
                        <button
                            className="px-2 py-1 hover:bg-white/10 rounded"
                            onClick={() => setPlaying((p) => !p)}
                            title={playing ? "Pause" : "Play"}
                        >
                            {playing ? "Pause" : "Play"}
                        </button>
                        <button
                            className="px-2 py-1 hover:bg-white/10 rounded"
                            onClick={() => setFrame((f) => (f + 1) % frameCount)}
                        >
                            ▶
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
