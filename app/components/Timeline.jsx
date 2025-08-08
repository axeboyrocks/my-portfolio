export default function Timeline() {
    return (
        <section className="py-20 px-6 md:px-24 bg-neutral-950">
            <h2 className="text-4xl font-semibold mb-12 text-center">Career Timeline</h2>
            <div className="border-l-2 border-neutral-700 pl-6 space-y-8">
                <div>
                    <h3 className="text-2xl font-medium">2024–2025</h3>
                    <p className="text-neutral-400">Infrastructure Ontario – Level 2/3 IT Support</p>
                    <p>Managed 1300+ endpoints, resolved email and device issues, supported Intune, Exchange, and Azure operations.</p>
                </div>
                <div>
                    <h3 className="text-2xl font-medium">2023</h3>
                    <p className="text-neutral-400">Compugen Inc. – Deployment Technician</p>
                    <p>Led national hardware rollout, supported ticketing, collaborated with teams globally on arcade technology installs.</p>
                </div>
            </div>
        </section>
    );
}
