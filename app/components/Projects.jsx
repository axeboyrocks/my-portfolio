import Link from "next/link";
import { Card, CardContent } from "./ui/card"; // note: path is from components/Projects.jsx to components/ui/card.jsx

export default function Projects() {
    return (
        <section className="py-20 px-6 md:px-24">
            <h2 className="text-4xl font-semibold mb-12 text-center">Projects</h2>

            <div className="grid md:grid-cols-2 gap-8">
                <Link href="/projects/wifi-design" aria-label="View Enterprise Wi-Fi Design project">
                    <Card className="bg-neutral-900 border border-neutral-700 cursor-pointer hover:bg-neutral-800 hover:shadow-lg transition">
                        <CardContent className="p-6">
                            <h3 className="text-2xl font-medium mb-2">Enterprise Wi‑Fi Design</h3>
                            <p>Designed secure wireless infrastructure with VLANs, SSIDs, and WLC tunneling using Cisco hardware in Packet Tracer.</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/projects/intune-automation" aria-label="View Intune Automation project">
                    <Card className="bg-neutral-900 border border-neutral-700 cursor-pointer hover:bg-neutral-800 hover:shadow-lg transition">
                        <CardContent className="p-6">
                            <h3 className="text-2xl font-medium mb-2">Intune Automation</h3>
                            <p>PowerShell scripts for device reports and access logic, using Excel input and Microsoft Graph API.</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/projects/networking-lab" aria-label="View Networking Lab project">
                    <Card className="bg-neutral-900 border border-neutral-700 cursor-pointer hover:bg-neutral-800 hover:shadow-lg transition">
                        <CardContent className="p-6">
                            <h3 className="text-2xl font-medium mb-2">Networking Lab</h3>
                            <p>Building a home lab with VLANs, OSPF, HSRP, DHCP, and monitoring—documented configs and diagrams.</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/projects/robot-car" aria-label="View Robot Car project">
                    <Card className="bg-neutral-900 border border-neutral-700 cursor-pointer hover:bg-neutral-800 hover:shadow-lg transition">
                        <CardContent className="p-6">
                            <h3 className="text-2xl font-medium mb-2">Robot Car</h3>
                            <p>Arduino‑based car with proximity/camera/avoidance sensors; custom PCB and control logic.</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>

            <div className="mt-8 text-center">
                <Link href="/projects" className="underline text-blue-400 hover:text-blue-300">
                    View All Projects →
                </Link>
            </div>
        </section>
    );
}
