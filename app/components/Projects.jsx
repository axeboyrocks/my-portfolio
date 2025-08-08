import { Card, CardContent } from "../components/ui/card";

export default function Projects() {
    return (
        <section className="py-20 px-6 md:px-24">
            <h2 className="text-4xl font-semibold mb-12 text-center">Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-neutral-900 border border-neutral-700">
                    <CardContent className="p-6">
                        <h3 className="text-2xl font-medium mb-2">Enterprise Wi-Fi Design</h3>
                        <p>Designed secure wireless infrastructure with VLANs, SSIDs, and WLC tunneling using Cisco hardware in Packet Tracer.</p>
                    </CardContent>
                </Card>
                <Card className="bg-neutral-900 border border-neutral-700">
                    <CardContent className="p-6">
                        <h3 className="text-2xl font-medium mb-2">Intune Automation</h3>
                        <p>Developed PowerShell scripts for device reports and user access logic integrated with Excel and Microsoft Graph API.</p>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-8 text-center">
                <a href="/projects" className="underline text-blue-400 hover:text-blue-300">View All Projects →</a>
            </div>
        </section>
    );
}
