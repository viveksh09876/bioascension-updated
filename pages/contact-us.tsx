import Head from 'next/head';
import Link from 'next/link';

export default function ContactUs() {
    return (
        <div className="bg-gradient-to-br from-lightblue to-white min-h-screen flex flex-col">
            <Head>
                <title>Contact Us – Heightmax</title>
                <meta name="description" content="Contact Heightmax for support, sales, or technical assistance." />
            </Head>

            {/* Header */}
            <header className="bg-deepblue text-white shadow-lg">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="font-extrabold text-2xl tracking-tight">
                        <span className="bg-gradient-to-r from-teal to-white text-transparent bg-clip-text drop-shadow-lg">Heightmax</span>
                    </div>
                    <Link href="/">
                        <span className="text-teal hover:text-white transition cursor-pointer">← Back to Home</span>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
                <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200">
                    <h1 className="text-3xl font-extrabold text-deepblue mb-6 text-center">Contact Us</h1>

                    <div className="text-center mb-8">
                        <p className="text-lg text-gray-700 mb-4">
                            For questions, support, or refund requests, business proposals, email us at:
                        </p>
                        <a
                            href="mailto:sales@heightmax.ai"
                            className="text-2xl font-bold text-teal hover:underline"
                        >
                            sales@heightmax.ai
                        </a>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-teal">
                        <h2 className="text-lg font-semibold text-deepblue mb-4">How We Can Help</h2>
                        <div className="space-y-4 text-gray-700">
                            <div className="flex items-start">
                                <span className="text-teal mr-3 mt-1">📧</span>
                                <div>
                                    <p className="font-medium">Sales & Billing</p>
                                    <p className="text-sm">Questions about our services, pricing, or payment processing</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <span className="text-teal mr-3 mt-1">🔧</span>
                                <div>
                                    <p className="font-medium">Technical Support</p>
                                    <p className="text-sm">Help with quiz completion, report delivery, or technical issues</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <span className="text-teal mr-3 mt-1">💰</span>
                                <div>
                                    <p className="font-medium">Refund Requests</p>
                                    <p className="text-sm">Inquiries about refunds and our refund policy</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <span className="text-teal mr-3 mt-1">📊</span>
                                <div>
                                    <p className="font-medium">Report Questions</p>
                                    <p className="text-sm">Understanding your results or requesting clarification</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 mb-2">Response Time</p>
                        <p className="text-gray-700 font-medium">We typically respond within 24 hours</p>
                    </div>
                </div>
            </main>
        </div>
    );
} 