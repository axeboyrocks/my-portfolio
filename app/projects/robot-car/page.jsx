// app/projects/robot-car/page.jsx
import Link from "next/link";
import ThreeSixtyViewer from "../../components/ThreeSixtyViewer";

export const metadata = {
    title: "Robot Car | Damanpreet Chauhan",
    description:
        "Arduino-based robot car with proximity, camera, and obstacle avoidance; custom PCB, modular firmware, and tuning.",
};

export default function RobotCarProject() {
    return (
        <main className="bg-black text-white min-h-screen">
            {/* Top bar / breadcrumb */}
            <div className="px-6 md:px-24 py-6 border-b border-neutral-800">
                <Link
                    href="/#projects"
                    className="text-sm text-neutral-400 hover:text-white transition"
                >
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
                    widthClass="w-1/2"         // now 50% width instead of full width
                    aspectClass="aspect-[16/10]"   // adjust to your images
                    autoPlay={true}                // set to false to start paused
                    autoSpeed={900}                // ms per frame
                    dragSensitivity={6}            // smaller = more sensitive
                    showControls={true}
                />
                <p className="text-sm text-neutral-500 mt-3">
                    Place 11 images at <code>/public/images/projects/robot-360/</code> named
                    <code> robot-360-01.png</code> … <code>robot-360-11.png</code>.
                </p>
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

                    {/* Gallery */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">Gallery</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {/* Replace with your images */}
                            <img
                                src="/images/projects/robot-car-1.jpg"
                                alt="Robot car build 1"
                                className="rounded-xl object-cover w-full h-full"
                            />
                            <img
                                src="/images/projects/robot-car-2.jpg"
                                alt="Robot car build 2"
                                className="rounded-xl object-cover w-full h-full"
                            />
                        </div>
                        <p className="text-sm text-neutral-500 mt-3">
                            Put images in <code>/public/images/projects/</code> and update the paths above.
                        </p>
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
                            <li>Power regulation (buck)</li>
                        </ul>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">Role & Scope</h3>
                        <p className="text-neutral-300">
                            Solo project: circuit design, firmware, assembly, and testing.
                        </p>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-blue-400 hover:text-blue-300 transition"
                                >
                                    GitHub Repository
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-blue-400 hover:text-blue-300 transition"
                                >
                                    Demo Video
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>
            </section>

            {/* Footer Back Link */}
            <div className="px-6 md:px-24 pb-12">
                <Link
                    href="/#projects"
                    className="text-sm text-neutral-400 hover:text-white transition"
                >
                    ← Back to Projects
                </Link>
            </div>
        </main>
    );
}
