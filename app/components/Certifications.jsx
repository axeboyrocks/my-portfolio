export default function Certifications() {
    return (
        <section className="py-20 px-6 md:px-24">
            <h2 className="text-4xl font-semibold mb-12 text-center">Certifications</h2>
            <ul className="list-disc list-inside space-y-6 text-lg">
                <li className="flex items-center gap-3">
                    <img
                        src="/images/badges/cisco.png"
                        alt="Cisco logo"
                        className="w-8 h-8 object-contain"
                    />
                    <span>
                        <a
                            href="https://www.credly.com/badges/09270ecc-8150-49e7-a29b-bd7e8fe13bc5/public_url"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            Cisco <strong>CCNA</strong>
                        </a>{" "}
                        — <span className="text-neutral-400">Jun 2025</span>
                    </span>
                </li>

                <li className="flex items-center gap-3">
                    <img
                        src="/images/badges/comptia.png"
                        alt="CompTIA logo"
                        className="w-8 h-8 object-contain"
                    />
                    <span>
                        <a
                            href="https://www.credly.com/badges/3dcfe461-3efd-4993-a3a8-687e1df94fba/public_url"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            CompTIA <strong>A+</strong>
                        </a>{" "}
                        — <span className="text-neutral-400">Jul&nbsp;2024</span>
                    </span>
                </li>

                <li className="flex items-center gap-3">
                    <img
                        src="/images/badges/hp.png"
                        alt="HP logo"
                        className="w-8 h-8 object-contain"
                    />
                    <span>
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            HP Commercial &amp; Consumer Desktops/Workstations/Notebooks Service Qualification
                            (Release 6.0 / 2022)
                        </a>{" "}
                        — <span className="text-neutral-400">Jun&nbsp;2024</span>
                    </span>
                </li>
            </ul>
        </section>
    );
}
