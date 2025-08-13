export default function Timeline() {
    return (
        <section className="py-20 px-6 md:px-24 bg-neutral-950">
            <h2 className="text-4xl font-semibold mb-12 text-center">Career Timeline</h2>

            <div className="border-l-2 border-neutral-700 pl-6 space-y-10">
                {/* 2025 */}
                <div>
                    <h3 className="text-2xl font-semibold">2025</h3>
                    <p className="text-neutral-400">Certification</p>
                    <p>Cisco <strong>CCNA</strong>.</p>
                </div>

                {/* 2025 — Infrastructure Ontario (dates updated) */}
                <div>
                    <h3 className="text-2xl font-semibold">May 2024 – Mar 2025</h3>
                    <p className="text-neutral-400">Infrastructure Ontario — Deskside Support Analyst (L2/L3), Toronto, ON</p>
                    <p className="text-neutral-200 mt-2">
                        L2/L3 deskside support for large government enterprise across Windows/M365, handling Intune/Entra policies, Exchange issues,
                        onboarding/offboarding, and SLA-driven triage and RCA.
                    </p>
                </div>

                {/* 2024 certs */}
                <div>
                    <h3 className="text-2xl font-semibold">Jul 2024</h3>
                    <p className="text-neutral-400">Certification</p>
                    <p>CompTIA <strong>A+</strong>.</p>
                </div>
                <div>
                    <h3 className="text-2xl font-semibold">Jun 2024</h3>
                    <p className="text-neutral-400">Certification</p>
                    <p>
                        <strong>HP</strong> Commercial & Consumer Desktops/Workstations/Notebooks Service Qualification
                        (Release 6.0 / 2022).
                    </p>
                </div>

                {/* 2023–2024 — Compugen (one-line summary) */}
                <div>
                    <h3 className="text-2xl font-semibold">Nov 2023 – May 2024</h3>
                    <p className="text-neutral-400">Compugen — Deployment Technician, Richmond Hill, ON</p>
                    <p className="text-neutral-200 mt-2">
                        Led deployment waves and go-lives, with clients like Toronto Distric School board, Reciepe Stores, Bingo Casino Halls and performed HP-certified field repairs, configured routers/switches/servers/Wi-Fi
                        (SSH/VLAN), and migrated 500+ laptops to Windows 11 while meeting SLAs.
                    </p>
                </div>

                {/* 2021–2023 — Playmind (one-line summary) */}
                <div>
                    <h3 className="text-2xl font-semibold">Nov 2021 – Oct 2023</h3>
                    <p className="text-neutral-400">Playmind — Technical Lead & Systems Engineer, Montreal, QC (with travel)</p>
                    <p className="text-neutral-200 mt-2">
                        Delivered site installs and systems integration, owning imaging, networking, and reliability for interactive/arcade deployments.
                    </p>
                </div>

                {/* 2021 — D&B (one-line summary) */}
                <div>
                    <h3 className="text-2xl font-semibold">Aug 2021 – Nov 2021</h3>
                    <p className="text-neutral-400">Dave & Buster’s — Game Technician, Vaughan, ON</p>
                    <p className="text-neutral-200 mt-2">
                        Maintained and repaired arcade machines with diagnostics, calibration, and uptime tracking.
                    </p>
                </div>

                {/* 2017–2021 — Security (one-line summary) */}
                <div>
                    <h3 className="text-2xl font-semibold">2017 – Aug 2021</h3>
                    <p className="text-neutral-400">
                        GardaWorld @ BMO + other sites — Security Supervisor / Assistant Supervisor, GTA
                    </p>
                    <p className="text-neutral-200 mt-2">
                        Led physical security operations: incident escalation, access control/CCTV, customer communication, shift leadership, and detailed documentation.
                    </p>
                </div>

                {/* 2016–2018 */}
                <div>
                    <h3 className="text-2xl font-semibold">Jan 2016 – Jan 2018</h3>
                    <p className="text-neutral-400">Sheridan College — Computer Engineering Technician (Diploma), Brampton, ON</p>
                </div>
            </div>
        </section>
    );
}
