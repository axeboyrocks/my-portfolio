import Link from "next/link";
import SuggestForm from "../../components/SuggestForm";

export const metadata = {
    title: "Networking Lab | Damanpreet Chauhan",
    description:
        "Packet Tracer and physical networking labs: VLANs, OSPF, HSRP, DHCP, monitoring, and more.",
};

export default function NetworkingLabProject() {
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
                <h1 className="text-4xl md:text-5xl font-bold">Networking Lab</h1>
                <p className="mt-3 text-neutral-300 max-w-3xl">
                    Labs and configurations will be published here soon—once the Packet Tracer
                    topologies and the physical rack build Daman is working on are fully
                    tested and documented. Expect VLAN designs, OSPF area layouts, HSRP failover
                    demos, DHCP scopes, and monitoring dashboards.
                </p>
            </section>

            {/* Content Grid */}
            <section className="px-6 md:px-24 pb-16 grid md:grid-cols-3 gap-10">
                {/* Main content */}
                <div className="md:col-span-2 space-y-6">
                    {/* Meme / image block */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold mb-3">A mood while building labs 😄</h2>
                        <div className="flex justify-center">
                            <img
                                src="/images/projects/Meme-CCNA-CCNP.jpg"
                                alt="CCNA vs CCNP Meme"
                                className="rounded-xl max-w-xl w-full border border-neutral-800 shadow-lg"
                            />
                        </div>
                    </div>

                    {/* Coming soon block */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">What’s coming</h3>
                        <ul className="list-disc list-inside space-y-2 text-neutral-300">
                            <li>VLAN & inter‑VLAN routing lab (L3 switching)</li>
                            <li>OSPF multi‑area topology with route summarization</li>
                            <li>HSRP failover demo with traffic capture</li>
                            <li>DHCP scopes, reservations, options 43/60</li>
                            <li>Device monitoring (SNMP/NetFlow) & dashboards</li>
                        </ul>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="space-y-6">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">Lab Stack</h3>
                        <ul className="space-y-1 text-neutral-300">
                            <li>Cisco switching/routing (Packet Tracer, physical)</li>
                            <li>VLANs, OSPF, HSRP, DHCP</li>
                            <li>Windows Server & AD (for DHCP/DNS)</li>
                            <li>Observability: SNMP, NetFlow</li>
                        </ul>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">Status</h3>
                        <p className="text-neutral-300">
                            In progress. Labs will be posted with configs, diagrams, and
                            step‑by‑step guides once validated.
                        </p>
                    </div>

                    {/* Notes card with RGB border + form */}
                    <div className="rgb-border rounded-2xl">
                        <div className="rgb-surface p-6">
                            <h3 className="text-xl font-semibold mb-2">Notes</h3>
                            <p className="text-neutral-300 mb-4">
                                If you want a specific scenario (e.g., OSPF NSSA vs stub, dual‑WAN, QoS),
                                suggest it here — it goes straight to my inbox.
                            </p>
                            <SuggestForm />
                        </div>
                    </div>
                </aside>
            </section>

            {/* Footer back link */}
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
