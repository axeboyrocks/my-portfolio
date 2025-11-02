import ContactForm from "./ContactForm";

export default function Contact() {
    return (
        <section className="py-20 px-6 md:px-24 bg-neutral-950">
            <h2 className="text-4xl font-semibold mb-6 text-center">Contact</h2>
            <p className="text-lg text-center text-neutral-300 mb-8">
                Send me a note, I’ll get it in my inbox.
            </p>

            <div className="max-w-xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                <ContactForm />
            </div>
        </section>
    );
}
