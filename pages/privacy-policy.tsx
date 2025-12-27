import Head from 'next/head';
import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <div className="bg-gradient-to-br from-lightblue to-white min-h-screen flex flex-col">
            <Head>
                <title>Privacy Policy – Heightmax</title>
                <meta name="description" content="Read Heightmax's Privacy Policy to understand how we handle your data." />
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
                    <h1 className="text-3xl font-extrabold text-deepblue mb-6 text-center">Privacy Policy</h1>

                    <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-teal">
                        <h3 className="text-md font-semibold text-deepblue mb-2">1. Information We Collect</h3>
                        <p className="text-gray-700 mb-4">We may collect the following information when you use our website ("the Site"):</p>

                        <h4 className="font-semibold text-deepblue mb-2">a) Personal Information</h4>
                        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                            <li>Name</li>
                            <li>Email address</li>
                            <li>Billing information</li>
                            <li>Phone number (if provided)</li>
                            <li>Shipping address (if applicable)</li>
                        </ul>

                        <h4 className="font-semibold text-deepblue mb-2">b) Automatically Collected Information</h4>
                        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                            <li>IP address</li>
                            <li>Device type</li>
                            <li>Browser type</li>
                            <li>Pages viewed</li>
                            <li>Cookies and usage analytics</li>
                            <li>General location data derived from your device or IP address</li>
                        </ul>

                        <h3 className="text-md font-semibold text-deepblue mb-2">2. How We Use Your Information</h3>
                        <p className="text-gray-700 mb-4">We use the information we collect to operate our business, improve our services, and fulfill your requests. This includes:</p>
                        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                            <li>Processing and completing orders</li>
                            <li>Providing customer service and support</li>
                            <li>Improving the Site's performance, features, and user experience</li>
                            <li>Detecting, preventing, and addressing fraud or security issues</li>
                            <li>Complying with legal and regulatory obligations</li>
                            <li>Generating personalized assessments, analytics, or prediction-based reports as part of the services you request. By creating an account, submitting information, or completing a purchase, you consent to this use.</li>
                        </ul>
                        <p className="text-gray-700 mb-4">We do not sell or rent your personal information to third parties.</p>

                        <h3 className="text-md font-semibold text-deepblue mb-2">3. Cookies & Tracking Technologies</h3>
                        <p className="text-gray-700 mb-4">We use cookies, pixels, and similar tracking tools to:</p>
                        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                            <li>Recognize returning users</li>
                            <li>Analyze website traffic</li>
                            <li>Improve user experience</li>
                            <li>Maintain proper site functionality</li>
                        </ul>
                        <p className="text-gray-700 mb-4">You may disable cookies in your browser settings, but some features may not function correctly.</p>

                        <h3 className="text-md font-semibold text-deepblue mb-2">4. How We Share Your Information</h3>
                        <p className="text-gray-700 mb-4">We only share information with third parties when necessary to run our business:</p>

                        <h4 className="font-semibold text-deepblue mb-2">a) Payment Processors</h4>
                        <p className="text-gray-700 mb-4">To complete transactions securely.</p>

                        <h4 className="font-semibold text-deepblue mb-2">b) Service Providers</h4>
                        <p className="text-gray-700 mb-2">Such as analytics platforms, hosting providers, and email service platforms.</p>

                        <h4 className="font-semibold text-deepblue mb-2">c) Fraud Prevention & Security Partners</h4>
                        <p className="text-gray-700 mb-2">To maintain platform security and integrity.</p>

                        <h4 className="font-semibold text-deepblue mb-2">d) Legal Requirements</h4>
                        <p className="text-gray-700 mb-4">We may disclose information if required by law, regulation, or legal process.</p>

                        <p className="text-gray-700 mb-4">We do not share your information for advertising resale or data-broker purposes.</p>

                        <h3 className="text-md font-semibold text-deepblue mb-2">5. Data Security</h3>
                        <p className="text-gray-700 mb-4">We use industry-standard administrative, technical, and physical safeguards to protect your personal information. While no online system can guarantee 100% security, we take reasonable measures to protect your data.</p>

                        <h3 className="text-md font-semibold text-deepblue mb-2">6. Your Rights</h3>
                        <p className="text-gray-700 mb-4">Depending on your location, you may have rights regarding your personal information, including:</p>
                        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                            <li>Accessing the data we hold about you</li>
                            <li>Requesting corrections to inaccurate data</li>
                            <li>Requesting deletion of your data</li>
                            <li>Requesting limitations on how we process your data</li>
                        </ul>
                        <p className="text-gray-700 mb-4">You can submit data requests at: <a href="mailto:privacy@heightmax.ai" className="text-teal font-semibold hover:underline">privacy@heightmax.ai</a></p>

                        <h3 className="text-md font-semibold text-deepblue mb-2">7. Children's Privacy</h3>
                        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                            <li>The Site is not intended for individuals under the age of 18.</li>
                            <li>We do not knowingly collect data from minors.</li>
                            <li>If you believe a minor has provided personal information, contact us immediately.</li>
                        </ul>

                        <h3 className="text-md font-semibold text-deepblue mb-2">8. International Data Transfers</h3>
                        <p className="text-gray-700 mb-4">If you access the Site from outside the United States, your data may be transferred to and processed in the United States, where data protection laws may differ from those in your jurisdiction.</p>

                        <h3 className="text-md font-semibold text-deepblue mb-2">9. Changes to This Privacy Policy</h3>
                        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                            <li>We may update this Privacy Policy occasionally.</li>
                            <li>Any changes will be posted on this page with an updated "Last Updated" date.</li>
                            <li>Continued use of the Site means you accept the updated policy.</li>
                        </ul>

                        <h3 className="text-md font-semibold text-deepblue mb-2">10. Contact Information</h3>
                        <p className="text-gray-700 mb-4">If you have any questions or concerns regarding this Privacy Policy, you can contact us at:</p>
                        <p className="text-gray-700 mb-2">Email: <a href="mailto:sales@heightmax.ai" className="text-teal font-semibold hover:underline">sales@heightmax.ai</a></p>
                        <div className="text-gray-700 mb-4">
                            <p className="font-semibold">Business Address:</p>
                            <p>HeightMax LLC</p>
                            <p>36872 Nutmeg Ct</p>
                            <p>Newark, CA 94560</p>
                            <p>United States</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
