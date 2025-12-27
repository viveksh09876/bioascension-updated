import Head from 'next/head';
import Link from 'next/link';

export default function RefundPolicy() {
  return (
    <div className="bg-gradient-to-br from-lightblue to-white min-h-screen flex flex-col">
      <Head>
        <title>Refund Policy – Heightmax</title>
        <meta name="description" content="Read Heightmax's refund policy and terms for genetic analysis reports." />
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
          <h1 className="text-3xl font-extrabold text-deepblue mb-6 text-center">Refund Policy</h1>

          <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-teal">
            <h2 className="text-lg font-semibold text-deepblue mb-4">Refund Policy – Heightmax</h2>
            <p className="text-gray-700 mb-4">At Heightmax, we want every customer to feel confident in their purchase. Because our reports are delivered instantly via email and contain personalized digital content, we are generally unable to offer refunds once an order has been fulfilled.</p>
            
            <p className="text-gray-700 mb-4">However, we understand that issues can arise. You may request a refund under the following conditions:</p>
            
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>You did not receive your report due to a technical issue (e.g., email delivery failure).</li>
              <li>You accidentally purchased multiple times.</li>
              <li>There was an error in the report or your input was clearly misprocessed (e.g., blank results).</li>
            </ul>
            
            <p className="text-gray-700 mb-4">If your situation qualifies, please contact us at <a href="mailto:sales@heightmax.ai" className="text-teal font-semibold hover:underline">sales@heightmax.ai</a> within 7 days of purchase. Include your order email, the issue you experienced and any supporting information.</p>
            
            <p className="text-gray-700 mb-4">All refund requests are reviewed on a case-by-case basis. We reserve the right to decline a refund if the report was delivered correctly and the request does not meet the criteria above.</p>
            
            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-yellow-800 font-semibold mb-2">⚠️ Important Notes:</p>
              <ul className="list-disc pl-6 text-yellow-800 text-sm space-y-1">
                <li>Reports are non-refundable once delivered unless they meet the criteria above.</li>
                <li>Refunds, if approved, will be processed to your original payment method within 5–10 business days.</li>
                <li>If you have questions, email our support team anytime at <a href="mailto:sales@heightmax.ai" className="text-teal font-semibold hover:underline">sales@heightmax.ai</a></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 