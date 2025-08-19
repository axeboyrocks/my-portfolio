import Link from "next/link";

export const metadata = {
    title: "Portfolio Website | Damanpreet Chauhan",
    description:
        "Next.js, Tailwind CSS, and Framer Motion powering this personal website.",
};

export default function PortfolioWebsiteProject() {
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
                <h1 className="text-4xl md:text-5xl font-bold">Portfolio Website</h1>
                <p className="mt-3 text-neutral-300 max-w-3xl">
                    This site is built with Next.js 15, Tailwind CSS, and Framer Motion to showcase my
                    work with smooth animations and responsive design.
                </p>
            </section>

            {/* Content Grid */}
            <section className="px-6 md:px-24 pb-16 grid md:grid-cols-3 gap-10">
                {/* Main content */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold mb-2">Overview</h2>
                        <p className="text-neutral-300">
                            I designed and developed this portfolio using the Next.js App Router with
                            React components for each section. Styling is handled with Tailwind CSS
                            and animations with Framer Motion, allowing fast iterations and a clean
                            developer experience.
                        </p>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="space-y-6">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">Tech Stack</h3>
                        <ul className="space-y-1 text-neutral-300">
                            <li>Next.js 15</li>
                            <li>React 19</li>
                            <li>Tailwind CSS 4</li>
                            <li>Framer Motion</li>
                        </ul>
                    </div>
                </aside>
            </section>

            {/* Footer back link */}
            <div className="px-6 md:px-24 pb-12">
                <Link href="/#projects" className="text-sm text-neutral-400 hover:text-white transition">
                    ← Back to Projects
                </Link>
            </div>
        </main>
    );
}
