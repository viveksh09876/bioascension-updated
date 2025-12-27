import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { del } from '@vercel/blob';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { quizData, photoPaths, isFreeUser } = req.body;

    if (!quizData) {
      return res.status(400).json({ error: 'Quiz data is required' });
    }

    const photoKeys = [
      'photo1YearAgoFront',
      'photo1YearAgoSide',
      'photo1YearAgoBody',
      'photoNowFront',
      'photoNowSide',
      'photoNowBody',
    ];

    const photoInfo: string[] = [];
    if (photoPaths) {
      photoKeys.forEach((key) => {
        if (photoPaths[key]) {
          photoInfo.push(`${key}: ${photoPaths[key]}`);
        }
      });
    }

    const temperature = isFreeUser ? 0.5 : 0.7;

    let prompt = '';

    if (isFreeUser) {
      // ✅ FREE USER PROMPT (Strict Sectioned Version)
      prompt = `🧠 GPT-4 PROMPT: Heightmax Free Report Generator – High Potential Version
You are an AI prediction engine for Heightmax. A free user has completed the quiz. Your job is to generate a motivational Genetic Height Prediction Report that encourages them to purchase the full report.

## User Information
- Current height, age, sex, and ethnicity
- Parental heights

## Genetic Final Height Prediction
- Predict final height outcomes in 1-inch (or ~2cm) increments, starting from the user's current height.
- Assign realistic percentage probabilities for each height (down to 1%).

## Growth Potential Statement
- Clearly state that Heightmax's system has analyzed their profile and determined they have very high growth potential (only if you estimate at least 6 months of puberty left; otherwise, do not include this statement).

## Motivational Section
- Tell the user their growth story is still unfolding and that they're likely still in their growth window.

## Unlock Full Report Benefits
- Persuasively explain the benefits of unlocking the full report.
- Mention that the full report includes custom strategies to maximize height (do not list the actual tips).
- Mention that most users feel more motivated and confident after seeing their full results.

## Call to Action
- End with a strong call-to-action to buy Heightmax for $4.99.

**Style Instructions:**
- Use markdown headers (##, ###) for clean formatting.
- Keep the tone motivational, science-backed, and persuasive.
- Do NOT include puberty stage, hormone status, growth plates, or facial maturity in the free version — only tease these as available in the full report.
- Emphasize that this user has strong growth potential.

User Data:
${formatFreeQuizData(quizData)}

Please provide a motivational, persuasive analysis that encourages the user to unlock their full report, following the section order and instructions above.`;
    } else {
      // ✅ PAID USER PROMPT (Strict Sectioned Version)
      prompt = `🧠 GPT-4 PROMPT: Heightmax Height & Development Report Generator
You are an AI prediction engine built for Heightmax. Your job is to analyze detailed quiz responses and user-submitted photos to generate highly accurate predictions for height, puberty status, bone maturity, and hormone trajectory. Your output MUST follow the exact section order, headers, and logic below. For each section, follow the itemized instructions. Do not add, remove, or reorder any sections. Use data-driven, unique predictions — not reused or templated values.

📏 Final Height Prediction with Genetic and Optimized Height Probability
 Genetic Height Probability (If Average Habits Continue)
- Start from the user's current height.
- Predict final height outcomes in 1-inch (or ~2 cm) increments above that.
- Assign realistic percentage probabilities to each predicted height based on:
  - Current height, age, growth history
  - Parental heights
  - Ethnic growth timing and curve
  - Bone and puberty status
- Gradually decrease the probabilities down to the 1% threshold using your own internal analysis — do NOT evenly space percentages.
- **Format your output exactly as in the example below. For the current height, always label as 'Current Height'. For heights above the 1% threshold, always label as 'Very unlikely'.**

Example (copy this style exactly, but use the user's data):

5'7 – Current Height  
5'8 – 88%  
5'9 – 75%  
5'10 – 50%  
5'11 – 30%  
6'0 – 15%  
6'1 – 5%  
6'2 – 2%  
6'3 – 1%  
6'4 – Very unlikely

**You must follow this format exactly, replacing the values with the user's data. If you do not follow the exact format and item-by-item breakdown as shown, your output will be rejected.**

Optimized Height Probability (If Growth Is Maximized)
- Repeat the same format as above, but with slightly higher chances under ideal growth conditions.
- If a height reaches the 1% threshold, add this line:
  "Because [HEIGHT] is your 1% probability mark, any height beyond that (like [NEXT HEIGHT] or higher) is highly unlikely unless an exceptional growth spurt occurs."

🦴 Growth Plate Status
- Output your analysis item by item, using bullet points or line-by-line breakdowns for each sign and conclusion.
- Example (copy this style exactly, but use the user's data):
  - Growth plates: Narrowing
  - Estimated status: 60% open, 40% closed
  - Signs: Growth rate, shoe size increase, growing pains, facial elongation
  - Confidence level: Medium
  - Conclusion: Growth plates are not fully closed, further growth is possible

🧬 Puberty Stage
- Output your analysis item by item, using bullet points or line-by-line breakdowns for each sign and conclusion.
- Example (copy this style exactly, but use the user's data):
  - Puberty stage: Mid
  - % completed: 50%
  - Signs: Body frame development, voice changes, minimal body hair
  - Conclusion: Puberty is ongoing, further development expected

💀 Facial Maturity
- Output your analysis item by item, using bullet points or line-by-line breakdowns for each sign and conclusion.
- Example (copy this style exactly, but use the user's data):
  - Facial bone maturity: ~70%
  - Features analyzed: Cheekbones, jawline, chin, brow ridge, facial width
  - Areas still developing: Brow ridge, facial width
  - Conclusion: Further facial changes expected as puberty progresses

📈 Hormone Trajectory
- Output your analysis item by item, using bullet points or line-by-line breakdowns for each sign and conclusion.
- Example (copy this style exactly, but use the user's data):
  - Hormone trend: Rising
  - Signs: Muscle gain, minimal acne, high voice pitch, minimal body/facial hair growth
  - Conclusion: Upward hormone trend will likely contribute to further growth and development

🌍 Ethnic Growth Pattern
- Output your analysis item by item, using bullet points or line-by-line breakdowns for each sign and conclusion.
- Example (copy this style exactly, but use the user's data):
  - Ancestry: European (German)
  - Typical pattern: Later growth spurts, slower facial maturity rate
  - Family history: Late growth
  - Benchmark: Heightmax uses millions of ancestry-specific samples
  - Conclusion: Extended growth period possible

✅ Recommendations to Maximize Growth
- Output each recommendation as a separate bullet point, as shown below.
- Example (copy this style exactly, but use the user's data):
  - Aim for 8–10 hours of sleep per night.
  - Consume high-protein, calcium-rich whole foods.
  - Avoid excess sugar, soy, and alcohol.
  - Maintain a lean body mass to minimize estrogen conversion.
  - Incorporate strength training, sprinting, and stretching into your regular exercise routine.
  - Practice proper tongue posture (mewing).
  - Monitor your height monthly to track growth.
  - Reduce stress and avoid exposure to plastics, parabens, and other xenoestrogens.

${photoInfo.length > 0 ? `## 📸 Photo Analysis
- Photo URLs:
${photoInfo.map(info => `- ${info}`).join('\n')}
- If the user uploaded front face, side face, and full-body images:
  - Compare current appearance to past (if available)
  - Detect signs of:
    - Increased height
    - Posture improvement
    - Jawline/facial width changes
    - Body composition shifts
  - Adjust growth plate, puberty, and facial maturity predictions if visual signs indicate acceleration or slowdown
` : ''}

**IMPORTANT:** Output the report using the exact same section order, section headers, and item-by-item style as shown above. Do not add, remove, or reorder any sections. Place the Photo Analysis section at the end, exactly as shown, and only if photos are provided. If you do not follow the exact item-by-item style, your output will be rejected.

User Data:
${formatQuizData(quizData, photoInfo)}

Please provide a comprehensive, personalized analysis based on this data. Use data-driven predictions with realistic percentages that reflect the user's unique genetic and environmental factors. Follow the section order and instructions above.`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      temperature,
      max_tokens: 2000,
      messages: [
        {
          role: "system",
          content: "You are Heightmax's expert AI analyst specializing in growth prediction and puberty development. Provide detailed, accurate, and motivational insights."
        },
        {
          role: "user",
          content: prompt
        }
      ],
    });

    const analysis = completion.choices?.[0]?.message?.content?.trim();

    if (!analysis) {
      return res.status(500).json({ error: 'AI returned an empty result. Please try again.' });
    }

    // Clean up uploaded photos
    if (photoPaths && Object.values(photoPaths).length > 0) {
      try {
        await del(Object.values(photoPaths));
      } catch (deleteErr) {
        console.error('Failed to delete photos from Vercel Blob:', deleteErr);
      }
    }

    return res.status(200).json({ analysis });
  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({ error: 'Failed to analyze data' });
  }
}

// --- FORMATTERS ---

function formatFreeQuizData(quizData: any): string {
  let output = `## User Information\n`;

  const fields = [
    { label: 'Current Height', key: 'currentHeight' },
    { label: 'Age', key: 'age' },
    { label: 'Sex', key: 'biologicalSex' },
    { label: 'Ethnicity', key: 'ethnicBackground' },
    { label: 'Father Height', key: 'fatherHeight' },
    { label: 'Mother Height', key: 'motherHeight' },
  ];

  fields.forEach(({ label, key }) => {
    if (quizData[key]) {
      output += `- ${label}: ${quizData[key]}\n`;
    }
  });

  return output;
}

function formatQuizData(quizData: any, photoInfo: string[] = []): string {
  const sections = [
    {
      title: 'Basic Information',
      fields: ['biologicalSex', 'age', 'currentHeight', 'currentWeight', 'country', 'measurementTime']
    },
    {
      title: 'Growth & Puberty Markers',
      fields: ['pubertyAge', 'recentGrowthSpurt', 'growthPast12Months', 'growingPains', 'handsFeetsGrowing', 'nightSoreness', 'shoeSizeChange']
    },
    {
      title: 'Skeletal & Facial Development',
      fields: ['jawlineFacialMaturity', 'adamsApple', 'facialHair', 'cheekbones', 'voiceChange', 'bodyFrameWider']
    },
    {
      title: 'Hormones & Testosterone Markers',
      fields: ['bodyHair', 'muscleGain', 'acne', 'voiceDepth', 'sweating', 'armpitGroinHair', 'jawNoseDefinition']
    },
    {
      title: 'Family Genetics',
      fields: ['fatherHeight', 'motherHeight', 'hasSiblings', 'siblingInfo', 'parentsPubertyTiming', 'ethnicBackground', 'familyLateGrowth']
    },
    {
      title: 'Lifestyle & Health',
      fields: ['exerciseFrequency', 'sleepHours', 'supplementsMedications', 'dairyConsumption', 'proteinDiet', 'cigaretteSmoke', 'aroundSmokers', 'soyConsumption', 'stressLevel', 'visibleAbs']
    },
    {
      title: 'Psychological & Developmental',
      fields: ['maturityComparison', 'stillGrowing', 'pubertyStage', 'compareToFamily', 'maturityVsPeers']
    },
    {
      title: 'Ethnicity Background',
      fields: ['birthCountry', 'parentsCountries', 'grandparentsCountries', 'ethnicGroup', 'mixedEthnicity']
    },
    {
      title: 'Head & Skull Shape',
      fields: ['headShape', 'headTop', 'headBack', 'forehead', 'headWidth', 'raisedLine']
    },
    {
      title: 'Face Shape & Features',
      fields: ['faceShape', 'cheekbonesProminence', 'browBone', 'noseShape', 'nostrils', 'eyeSpacing', 'chinShape', 'jawlineShape', 'noseTip', 'noseUpperLipSpace', 'faceGrowthDirection']
    }
  ];

  let formattedData = '';

  sections.forEach(section => {
    formattedData += `\n## ${section.title}\n`;
    section.fields.forEach(field => {
      const value = quizData[field];
      if (value) {
        formattedData += `- ${field}: ${value}\n`;
      }
    });
  });

  if (photoInfo.length > 0) {
    formattedData += '\n## Photo Information\n';
    photoInfo.forEach(info => {
      formattedData += `- ${info}\n`;
    });
  }

  return formattedData;
}