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
                    work with smooth animations, responsive design, and fast navigation using the App
                    Router.
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
                            React server and client components for each section. Styling is handled
                            with Tailwind CSS and animations with Framer Motion, enabling fast
                            iterations and a clean developer experience.
                        </p>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">Key Features</h3>
                        <ul className="list-disc list-inside space-y-2 text-neutral-300">
                            <li>App Router pages for projects, timeline, and certifications</li>
                            <li>Reusable React components styled with Tailwind CSS</li>
                            <li>Framer Motion transitions for hero, cards, and modals</li>
                            <li>Contact form using Resend for server-side email delivery</li>
                            <li>Interactive widgets like a 360° viewer and gallery lightbox</li>
                        </ul>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">Deployment</h3>
                        <p className="text-neutral-300">
                            The site is deployed on Vercel with CI/CD from GitHub. Each push builds
                            and optimizes the app, serving static assets from the edge for quick
                            global access.
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
                            <li>Resend (contact form)</li>
                            <li>Vercel hosting</li>
                        </ul>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://github.com/damanpreet-NS/my-portfolio"
                                    className="text-blue-400 hover:text-blue-300 transition"
                                >
                                    Source on GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://daman-portfolio.vercel.app"
                                    className="text-blue-400 hover:text-blue-300 transition"
                                >
                                    Live Site
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">Role & Scope</h3>
                        <p className="text-neutral-300">Solo project: design, development, and deployment.</p>
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
