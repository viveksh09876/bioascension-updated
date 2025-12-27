import Head from 'next/head';
import Link from 'next/link';

export default function TermsConditions() {
  return (
    <div className="bg-gradient-to-br from-lightblue to-white min-h-screen flex flex-col">
      <Head>
        <title>Terms & Conditions – Heightmax</title>
        <meta name="description" content="Read Heightmax's Terms and Conditions." />
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
          <h1 className="text-3xl font-extrabold text-deepblue mb-6 text-center">Terms & Conditions</h1>

          <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-teal">

            <h3 className="text-md font-semibold text-deepblue mb-2">1. Acceptance of Terms</h3>
            <p className="text-gray-700 mb-4">By accessing or using <a href="http://HeightMax.ai" className="text-teal hover:underline">HeightMax.ai</a> ("the Site"), you agree to be bound by these Terms & Conditions. If you do not agree, do not use the Site.</p>

            <h3 className="text-md font-semibold text-deepblue mb-2">2. Purpose of the Site</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
              <li><a href="http://HeightMax.ai" className="text-teal hover:underline">HeightMax.ai</a> provides informational content, digital tools, and general wellness education.</li>
              <li>The Site does not provide medical advice, diagnosis, or treatment. All content is for informational and educational purposes only.</li>
            </ul>

            <h3 className="text-md font-semibold text-deepblue mb-2">3. Eligibility</h3>
            <p className="text-gray-700 mb-4">You must be at least 18 years old to use the Site or make purchases. By using the Site, you confirm that you meet this requirement.</p>

            <h3 className="text-md font-semibold text-deepblue mb-2">4. Purchases & Payments</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
              <li>All purchases made on <a href="http://HeightMax.ai" className="text-teal hover:underline">HeightMax.ai</a> are final unless otherwise specified.</li>
              <li>By completing a transaction, you agree to provide accurate billing information and authorize us or our payment processor to charge your payment method.</li>
            </ul>

            <h3 className="text-md font-semibold text-deepblue mb-2">5. Refund Policy</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
              <li>Unless explicitly mentioned on a product page, all sales are final.</li>
              <li>If a product has a stated refund window, users must follow the refund instructions provided at the time of purchase.</li>
            </ul>

            <h3 className="text-md font-semibold text-deepblue mb-2">6. User Responsibilities</h3>
            <p className="text-gray-700 mb-4">You agree not to misuse the Site or attempt to interfere with its functionality (e.g., scraping, reverse-engineering, exploiting security vulnerabilities).</p>

            <h3 className="text-md font-semibold text-deepblue mb-2">7. Intellectual Property</h3>
            <p className="text-gray-700 mb-4">All content on <a href="http://HeightMax.ai" className="text-teal hover:underline">HeightMax.ai</a>—including text, graphics, logos, digital products, and software—is owned by HeightMax LLC or its licensors. You may not copy, distribute, or reproduce any content without written permission.</p>

            <h3 className="text-md font-semibold text-deepblue mb-2">8. Limitation of Liability</h3>
            <p className="text-gray-700 mb-4"><a href="http://HeightMax.ai" className="text-teal hover:underline">HeightMax.ai</a> is provided "as-is." We are not responsible for any damages resulting from use of the Site, including reliance on any information provided.</p>

            <h3 className="text-md font-semibold text-deepblue mb-2">9. Third-Party Services</h3>
            <p className="text-gray-700 mb-4">We may integrate with third-party vendors (e.g., payment processors, analytics providers). Their policies govern their use of your data.</p>

            <h3 className="text-md font-semibold text-deepblue mb-2">10. Changes to Terms</h3>
            <p className="text-gray-700 mb-4">We may update these Terms at any time. Continued use of the Site after updates constitutes acceptance.</p>

            <h3 className="text-md font-semibold text-deepblue mb-2">11. Contact Information</h3>
            <p className="text-gray-700 mb-4">For customer support or legal inquiries:</p>
            <p className="text-gray-700 mb-2">Email: <a href="mailto:sales@heightmax.ai" className="text-teal font-semibold hover:underline">sales@heightmax.ai</a></p>

            <div className="text-gray-700 mb-4">
              <p className="font-semibold">Address:</p>
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
