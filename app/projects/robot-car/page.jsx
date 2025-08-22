// app/projects/robot-car/page.jsx
import Link from "next/link";
import ThreeSixtyViewer from "../../components/ThreeSixtyViewer";
import GalleryLightbox from "../../components/GalleryLightbox";

export const metadata = {
    title: "Robot Car | Damanpreet Chauhan",
    description:
        "Arduino-based robot car with proximity, camera, and obstacle avoidance; custom PCB, modular firmware, and tuning.",
};

export default function RobotCarProject() {
    // You can tune `focus` to keep the car centered in the crop for each photo.
    // Format: "X% Y%" where 50% 50% is center. Increase Y% to bias lower, decrease to bias upper.
    const galleryImages = [
        { src: "/images/projects/car_up.jpeg", alt: "Robot car - top view", focus: "45% 80%" }, // car slightly lower-left
        { src: "/images/projects/car_bottom.jpeg", alt: "Robot car - bottom view", focus: "50% 95%" }, // roughly centered
        { src: "/images/projects/car_front.jpeg", alt: "Robot car - front view", focus: "50% 88%" }, // bias lower a bit
    ];

    return (
        <main className="bg-black text-white min-h-screen">
            {/* Top bar / breadcrumb */}
            <div className="px-6 md:px-24 py-6 border-b border-neutral-800">
                <Link href="/#projects" className="text-sm text-neutral-400 hover:text-white transition">
                    ← Back to Projects
                </Link>
            </div>

            {/* Hero */}
            <section className="px-6 md:px-24 py-10">
                <h1 className="text-4xl md:text-5xl font-bold">Robot Car</h1>
                <p className="mt-3 text-neutral-300 max-w-3xl">
                    Arduino‑based robot car featuring proximity sensors, camera module, and
                    obstacle‑avoidance logic. Built a custom PCB shield to simplify wiring,
                    power distribution, and signal conditioning.
                </p>
            </section>

            {/* 360° Viewer */}
            <section className="px-6 md:px-24 pb-10">
                <h2 className="text-2xl font-semibold mb-4">360° View</h2>
                <ThreeSixtyViewer
                    dir="/images/projects/robot-360"
                    baseName="robot-360"
                    ext="png"
                    frameCount={11}
                    widthClass="w-1/2"
                    aspectClass="aspect-[16/10]"
                    autoPlay={true}
                    autoSpeed={900}
                    dragSensitivity={6}
                    showControls={true}
                />
            </section>

            {/* Content Grid */}
            <section className="px-6 md:px-24 pb-16 grid md:grid-cols-3 gap-10">
                {/* Main content */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold mb-2">Overview</h2>
                        <p className="text-neutral-300">
                            This build explores autonomous navigation with sensor fusion and a
                            simple state machine. The car reads distance via ultrasonic sensors,
                            uses encoder feedback for motor tuning, and chooses stop/turn actions
                            to avoid obstacles. A camera module is included for future CV work.
                        </p>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">Highlights</h3>
                        <ul className="list-disc list-inside space-y-2 text-neutral-300">
                            <li>Custom Arduino shield PCB for clean sensor & motor wiring</li>
                            <li>Non‑blocking loop with debounced sensor reads</li>
                            <li>Basic PID tweaks for smoother motor control</li>
                            <li>Modular firmware to add/replace sensors quickly</li>
                        </ul>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">Demo Video</h3>
                        <div className="aspect-video w-full">
                            <iframe
                                className="w-full h-full rounded-lg"
                                src="https://www.youtube.com/embed/sSktwMA6k6U"
                                title="Robot Car Demo"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                        <p className="mt-2 text-neutral-400 text-sm">
                            More details about each sensor and additional automation demos are coming soon.
                        </p>
                    </div>

                    {/* Gallery */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">Gallery</h3>
                        <GalleryLightbox images={galleryImages} />

                    </div>
                </div>

                {/* Sidebar */}
                <aside className="space-y-6">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">Tech Stack</h3>
                        <ul className="space-y-1 text-neutral-300">
                            <li>Arduino (C/C++)</li>
                            <li>Ultrasonic + IR sensors</li>
                            <li>DC motors + H‑bridge</li>
                            <li>Custom PCB shield</li>
                            <li>Power regulation (AAA Batteries)</li>
                        </ul>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">Role & Scope</h3>
                        <p className="text-neutral-300">Solo project: circuit design, firmware, assembly, and testing.</p>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">Links</h3>
                        <ul className="space-y-2">
                            <li><a href="https://github.com/axeboyrocks/Robot_Car" className="text-blue-400 hover:text-blue-300 transition">GitHub Repository</a></li>
                            <li><a href="https://youtu.be/sSktwMA6k6U" className="text-blue-400 hover:text-blue-300 transition">Demo Video</a></li>
                        </ul>
                    </div>
                </aside>
            </section>

            {/* Footer Back Link */}
            <div className="px-6 md:px-24 pb-12">
                <Link href="/#projects" className="text-sm text-neutral-400 hover:text-white transition">
                    ← Back to Projects
                </Link>
            </div>
        </main>
    );
}
