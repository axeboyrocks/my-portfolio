import { useEffect, useState } from "react";

export default function Hero() {
    const LINES = [
        "Hello, I'm Damanpreet Chauhan",
        "I build, support, and secure modern IT infrastructure",
        "CCNA | Azure | Intune | M365 | Cisco | PowerShell",
    ];

    const TYPE_SPEED = 40;   // ms per character
    const LINE_DELAY = 400;  // pause between lines in ms

    const [typed, setTyped] = useState(["", "", ""]);
    const [stage, setStage] = useState(0); // which line is currently typing (0..2)
    const [done, setDone] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const typeLine = (lineIndex) =>
            new Promise((resolve) => {
                const text = LINES[lineIndex];
                let i = 0;
                const tick = () => {
                    if (cancelled) return;
                    if (i <= text.length) {
                        setTyped((prev) => {
                            const next = [...prev];
                            next[lineIndex] = text.slice(0, i);
                            return next;
                        });
                        i += 1;
                        setTimeout(tick, TYPE_SPEED);
                    } else {
                        resolve();
                    }
                };
                tick();
            });

        (async () => {
            for (let idx = 0; idx < LINES.length; idx++) {
                setStage(idx);
                await typeLine(idx);
                if (idx < LINES.length - 1) {
                    await new Promise((r) => setTimeout(r, LINE_DELAY));
                }
            }
            setDone(true);
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <section className="min-h-[40vh] flex flex-col justify-center items-center text-center relative">
            <div className="bg-neutral-900 rounded-lg p-6 font-mono text-green-400 shadow-lg text-lg w-full max-w-3xl">
                {/* Line 1 */}
                <p>
                    &gt; {typed[0]}
                    {/* cursor on this line while it's being typed */}
                    {!done && stage === 0 && <Cursor />}
                </p>

                {/* Line 2 */}
                <p>
                    &gt; {typed[1]}
                    {!done && stage === 1 && <Cursor />}
                </p>

                {/* Line 3 */}
                <p>
                    &gt; {typed[2]}
                    {/* When all done, keep a faint cursor at the end for terminal feel */}
                    {done ? <Cursor faint /> : stage === 2 && <Cursor />}
                </p>
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

function Cursor({ faint = false }) {
    return (
        <span
            className={`ml-1 inline-block w-3 h-5 align-middle bg-green-400 ${faint ? "opacity-0" : "opacity-90"
                }`}
            style={{
                animation: "blink 1s step-start infinite",
            }}
        />
    );
}

/* Tailwind doesn't ship a blink by default; you can add this in globals.css:
@keyframes blink { 50% { opacity: 0; } }
*/
