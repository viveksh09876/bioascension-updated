import { useState } from 'react';

export default function TestPng() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string>('');

  const sampleAnalysis = `📏 Final Height Prediction with Genetic and Optimized Height Probability

Genetic Height Probability (If Average Habits Continue):
5'7 – Current Height
58 –88%
59– 75%510– 50%
511 – 30
60 – 15%
61 –5%
6 – 2%
6'3

Optimized Height Probability (If Growth Is Maximized):
58 –95%
59– 85%510– 65%
511 – 45
60 – 25
61" –102%

🦴 Growth Plate Status:
- Growth rate: Moderate
- Shoe size increase: Yes
- Growing pains: Occasional
- Facial elongation: Yes
Plates are ~70% open, 30% closed
Confidence level: High

🧬 Puberty Stage:
- Facial/body hair: Developing
- Voice deepening: Yes
- Skin oiliness/acne: Moderate
- Chest width or Adams apple: Growing
Approximately 65 through puberty

💀 Facial Maturity:
~60% mature
Cheekbones and jawline still developing
Brow ridge and facial width expanding

📈 Hormone Trajectory:
- Muscle gain: Increasing
- Sweating: Moderate
- Skin oiliness: Moderate
- Voice pitch: Deepening
- Body/facial hair growth: Active
Hormone trend: Rising
This will continue to affect growth for 1-2

🌍 Ethnic Growth Pattern:
- Growth spurts: 2-3 remaining
- Growth plate fusion timing: Late teens
- Facial maturity rate: Moderate
Heightmax uses millions of ancestry-specific samples

✅ Recommendations to Maximize Growth:
- Sleep 8–10ours nightly
- Eat high-protein, calcium-rich whole foods
- Avoid excess sugar, soy, and alcohol
- Stay lean to minimize estrogen conversion
- Strength train, sprint, and stretch regularly
- Practice proper tongue posture (mewing)
- Track height monthly and monitor growth
- Reduce stress and avoid plastics, parabens, and other xenoestrogens

📷 Photo Analysis:
- Increased height: 2 inches over 6osture improvement: Significant
- Jawline/facial width changes: Noticeable
- Body composition shifts: Lean muscle gain`;

  const handleGeneratePng = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-report-png', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          analysis: sampleAnalysis,
          name: 'John Doe',
          isFreeUser: false
        })
      });

      if (response.ok) {
        // Create a download link for the PNG
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'heightmax-test-report.png';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        setResult('✅ PNG generated and downloaded successfully! Serverless environment compatible.');
      } else {
        const error = await response.text();
        setResult(`❌ Error: ${error}`);
      }
    } catch (error) {
      setResult(`Error generating PNG: ${error}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTestEmail = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          name: 'Test User',
          analysis: sampleAnalysis,
          isFreeUser: false
        })
      });

      if (response.ok) {
        const result = await response.json();
        setResult(`✅ Email test completed! PNG generated: ${result.pngGenerated ? 'Yes' : 'No'}`);
      } else {
        const error = await response.text();
        setResult(`❌ Email test error: ${error}`);
      }
    } catch (error) {
      setResult(`Error testing email: ${error}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">PNG Generation Test (Serverless Compatible)</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Sample AI Analysis</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
            {sampleAnalysis}
          </pre>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test PNG Generation</h2>
          <div className="space-y-4">
            <button
              onClick={handleGeneratePng}
              disabled={isGenerating}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {isGenerating ? 'Generating PNG...' : 'Generate PNG with Analysis'}
            </button>
            
            <button
              onClick={handleTestEmail}
              disabled={isGenerating}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors ml-4"
            >
              {isGenerating ? 'Testing Email...' : 'Test Email with PNG Attachment'}
            </button>
          </div>
          
          {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="font-semibold mb-2">Result:</h3>
              <p className="text-sm">{result}</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">What's Fixed</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✅ <strong>Fontconfig Error:</strong> Added font configuration file and environment variables</li>
            <li>✅ <strong>EROFS Error:</strong> Changed from file-based to buffer-based PNG generation</li>
            <li>✅ <strong>Serverless Compatibility:</strong> No longer writes to filesystem in production</li>
            <li>✅ <strong>Memory Efficient:</strong> Direct buffer handling without temporary files</li>
            <li>✅ <strong>Error Handling:</strong> Graceful fallbacks for missing fonts and logos</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 