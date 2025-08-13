import Link from "next/link";
import { Card, CardContent } from "./ui/card";

export default function Projects() {
    const baseCard =
        "bg-neutral-900 border border-neutral-700 transition-transform duration-200 hover:scale-[1.03]";

    return (
        <section className="py-20 px-6 md:px-24" id="projects">
            <h2 className="text-4xl font-semibold mb-12 text-center">Projects</h2>

            <div className="grid md:grid-cols-2 gap-8">
                {/* 1) Robot Car (clickable) */}
                <Link href="/projects/robot-car" aria-label="View Robot Car project">
                    <Card className={`${baseCard} cursor-pointer hover:bg-neutral-800`}>
                        <CardContent className="p-6">
                            <h3 className="text-2xl font-medium mb-2">Robot Car</h3>
                            <p>Arduino-based car with proximity/camera/avoidance sensors; custom PCB and control logic.</p>
                        </CardContent>
                    </Card>
                </Link>

                {/* 2) Networking Lab (clickable) */}
                <Link href="/projects/networking-lab" aria-label="View Networking Lab project">
                    <Card className={`${baseCard} cursor-pointer hover:bg-neutral-800`}>
                        <CardContent className="p-6">
                            <h3 className="text-2xl font-medium mb-2 flex items-center gap-2">
                                Networking Lab
                                <span className="bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full">
                                    In Progress
                                </span>
                            </h3>

                            <p>Home lab with VLANs, OSPF, HSRP, DHCP, and monitoring—configs and diagrams.</p>
                        </CardContent>
                    </Card>
                </Link>

                {/* 3) Enterprise Wi‑Fi Design (coming soon, disabled) */}
                <div aria-disabled className="opacity-70 cursor-not-allowed">
                    <Card className={baseCard}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-medium">Enterprise Wi‑Fi Design</h3>
                                <span className="text-xs bg-neutral-800 border border-neutral-700 rounded-full px-2 py-1">
                                    Coming soon
                                </span>
                            </div>
                            <p className="mt-2">
                                Designed secure WLAN with VLANs, SSIDs, WLC tunneling using Cisco gear and Packet Tracer.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* 4) Intune Automation (coming soon, disabled) */}
                <div aria-disabled className="opacity-70 cursor-not-allowed">
                    <Card className={baseCard}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-medium">Intune Automation</h3>
                                <span className="text-xs bg-neutral-800 border border-neutral-700 rounded-full px-2 py-1">
                                    Coming soon
                                </span>
                            </div>
                            <p className="mt-2">
                                PowerShell automation for device reports and access logic using Microsoft Graph + Excel.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>


        </section>
    );
}
