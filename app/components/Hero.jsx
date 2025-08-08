export default function Hero() {
    return (
        <section className="min-h-[40vh] flex flex-col justify-center items-center text-center">

            <div className="bg-neutral-900 rounded-lg p-6 font-mono text-green-400 shadow-lg text-lg w-full max-w-3xl">
                <p>&gt; Hello, I'm <span className="text-white font-bold">Damanpreet Chauhan</span></p>
                <p>&gt; I build, support, and secure modern IT infrastructure</p>
                <p>&gt; CCNA | Azure | Intune | M365 | Cisco | PowerShell</p>
            </div>
            <a
                href="/Damanpreet_Chauhan_Resume.pdf"
                download
                className="mt-6 px-6 py-3 bg-white text-black text-lg font-semibold rounded-full shadow-md hover:bg-neutral-200 transition-all duration-300"
            >
                Download Resume
            </a>
        </section>
    );
}
