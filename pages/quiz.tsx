import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface QuizData {
  // Basic Information
  biologicalSex: string;
  age: string;
  currentHeight: string;
  currentWeight: string;
  country: string;
  measurementTime: string;

  // Growth & Puberty Markers
  pubertyAge: string;
  recentGrowthSpurt: string;
  growthPast12Months: string;
  growingPains: string;
  handsFeetsGrowing: string;
  nightSoreness: string;
  shoeSizeChange: string;

  // Skeletal & Facial Development
  jawlineFacialMaturity: string;
  adamsApple: string;
  facialHair: string;
  cheekbones: string;
  voiceChange: string;
  bodyFrameWider: string;

  // Hormones & Testosterone Markers
  bodyHair: string;
  muscleGain: string;
  acne: string;
  voiceDepth: string;
  sweating: string;
  armpitGroinHair: string;
  jawNoseDefinition: string;

  // Family Genetics
  fatherHeight: string;
  motherHeight: string;
  hasSiblings: string;
  siblingInfo: string;
  parentsPubertyTiming: string;
  ethnicBackground: string;
  familyLateGrowth: string;

  // Lifestyle & Health
  exerciseFrequency: string;
  sleepHours: string;
  supplementsMedications: string;
  dairyConsumption: string;
  proteinDiet: string;
  cigaretteSmoke: string;
  aroundSmokers: string;
  soyConsumption: string;
  stressLevel: string;
  visibleAbs: string;

  // Psychological & Developmental
  maturityComparison: string;
  stillGrowing: string;
  pubertyStage: string;
  compareToFamily: string;
  maturityVsPeers: string;

  // Ethnicity Background
  birthCountry: string;
  parentsCountries: string;
  grandparentsCountries: string;
  ethnicGroup: string;
  mixedEthnicity: string;

  // Head & Skull Shape
  headShape: string;
  headTop: string;
  headBack: string;
  forehead: string;
  headWidth: string;
  raisedLine: string;

  // Face Shape & Features
  faceShape: string;
  cheekbonesProminence: string;
  browBone: string;
  noseShape: string;
  nostrils: string;
  eyeSpacing: string;
  chinShape: string;
  jawlineShape: string;
  noseTip: string;
  noseUpperLipSpace: string;
  faceGrowthDirection: string;

  // Final Consent
  email: string;
  consent: boolean;

  // Photo Uploads
  photo1YearAgoFront: File | null;
  photo1YearAgoSide: File | null;
  photo1YearAgoBody: File | null;
  photoNowFront: File | null;
  photoNowSide: File | null;
  photoNowBody: File | null;
}

const quizSections = [
  {
    title: "📋 Basic Information",
    description: "This is the starting point to help us make a good prediction about how tall you might grow and how your body will develop.",
    questions: [
      { key: 'biologicalSex', question: 'What is your biological sex?', type: 'radio', options: ['Male', 'Female'] },
      { key: 'age', question: 'How old are you? (Years and months)', type: 'text', placeholder: 'Example: 16 years, 3 months' },
      { key: 'currentHeight', question: 'What is your height?', type: 'text', placeholder: 'Example: 5\'8" or 173 cm' },
      { key: 'currentWeight', question: 'What is your weight? (Be sure to specify lbs or kg)', type: 'text', placeholder: 'Example: 150 lbs or 68 kg' },
      { key: 'country', question: 'Which country do you live in?', type: 'text', placeholder: 'e.g., United States' },
      { key: 'measurementTime', question: 'When do you usually measure your height?', type: 'radio', options: ['Morning', 'Night', 'Mixed'] }
    ]
  },
  {
    title: "🧬 Growth & Puberty Markers",
    description: "This helps us figure out how far you are into puberty and how much more your body might still grow or change.",
    questions: [
      { key: 'pubertyAge', question: 'When did puberty start for you? (Age)', type: 'text', placeholder: 'Try to remember the age when you first noticed changes like a growth spurt, body hair, oily skin, voice changes, or breast development.' },
      { key: 'recentGrowthSpurt', question: 'Have you had a growth spurt recently?', type: 'radio', options: ['Yes', 'No', 'Not sure'] },
      { key: 'growthPast12Months', question: 'How much did you grow in the last 12 months? (cm or inches)', type: 'text', placeholder: 'e.g., 2 inches or 5 cm' },
      { key: 'growingPains', question: 'Do your legs or knees hurt from growing?', type: 'radio', options: ['Often', 'Sometimes', 'Rarely', 'Never'] },
      { key: 'handsFeetsGrowing', question: 'Are your hands or feet still getting bigger?', type: 'radio', options: ['Yes', 'No', 'Not sure'] },
      { key: 'nightSoreness', question: 'Do you feel soreness near your knees, wrists, or ankles at night?', type: 'radio', options: ['Yes', 'No', 'Sometimes'] },
      { key: 'shoeSizeChange', question: 'How much did your shoe size change in the past year?', type: 'text', placeholder: 'e.g., 8.5 to 9.0' }
    ]
  },
  {
    title: "🔩 Skeletal & Facial Development",
    description: "These questions help us see how much your body is growing by checking if your bones, face, and voice are changing. These are important clues that show how far you are in puberty.",
    questions: [
      { key: 'jawlineFacialMaturity', question: 'Has your face/jaw matured recently?', type: 'radio', options: ['Yes', 'Slightly', 'No'] },
      { key: 'adamsApple', question: 'Do you have an Adam\'s apple?', type: 'radio', options: ['Yes', 'No', 'Not sure'] },
      { key: 'facialHair', question: 'Do you have facial hair?', type: 'radio', options: ['None', 'Light peach fuzz', 'Full beard/mustache'] },
      { key: 'cheekbones', question: 'Have your cheekbones gotten bigger recently?', type: 'radio', options: ['Yes', 'Slightly', 'No'] },
      { key: 'voiceChange', question: 'Has your voice gotten deeper or changed/cracked more?', type: 'radio', options: ['Cracks often', 'Cracks occasionally', 'No change'] },
      { key: 'bodyFrameWider', question: 'Has your upper body (shoulders/chest) gotten wider within the past year?', type: 'radio', options: ['Yes', 'Slightly', 'No'] }
    ]
  },
  {
    title: "🧪 Hormones & Testosterone Markers",
    description: "These questions help us see how active your body's hormones are, especially testosterone. This hormone affects how your body grows, when puberty starts, how easily you build muscle, grow body hair, get oily skin, and how your face changes shape. It helps us figure out how far along you are in growing and how much taller you might still get.",
    questions: [
      { key: 'bodyHair', question: 'How much body hair do you have?', type: 'radio', options: ['Minimal', 'Moderate', 'Dense'] },
      { key: 'muscleGain', question: 'Do you gain muscle easily from working out?', type: 'radio', options: ['Yes', 'Somewhat', 'No', 'Never tried'] },
      { key: 'acne', question: 'How oily or acne-prone is your skin?', type: 'radio', options: ['Minimal', 'Moderate', 'Severe', 'None'] },
      { key: 'voiceDepth', question: 'How deep is your voice?', type: 'radio', options: ['High', 'Medium', 'Deep'] },
      { key: 'sweating', question: 'Do you sweat more than you did 1–2 years ago?', type: 'radio', options: ['Yes', 'No', 'Slightly'] },
      { key: 'armpitGroinHair', question: 'Is your armpit/groin hair growing quickly?', type: 'radio', options: ['Yes', 'No', 'Somewhat'] },
      { key: 'jawNoseDefinition', question: 'Have your jaw or nose shape changed recently?', type: 'radio', options: ['Yes', 'No', 'Slightly'] }
    ]
  },
  {
    title: "👨‍👩‍👧‍👦 Family Genetics",
    description: "We ask about your family because your height and puberty timing often follow patterns from your parents and siblings. We also compare your answers to millions of others with similar backgrounds to predict how you're likely to grow.",
    questions: [
      { key: 'fatherHeight', question: 'How tall is your father?', type: 'text', placeholder: 'e.g., 6\'0" or 183cm' },
      { key: 'motherHeight', question: 'How tall is your mother?', type: 'text', placeholder: 'e.g., 5\'6" or 168cm' },
      { key: 'hasSiblings', question: 'Do you have any siblings? If yes, list their gender, age, and height.', type: 'text', placeholder: 'e.g., Brother, 18, 5\'10"' },
      { key: 'parentsPubertyTiming', question: 'Did your parents start puberty early, late, or average?', type: 'radio', options: ['Early', 'Average', 'Late', 'Don\'t know'] },
      { key: 'ethnicBackground', question: 'What ethnic background(s) are you from?', type: 'text', placeholder: 'e.g., European, Asian, African, etc.' },
      { key: 'familyLateGrowth', question: 'Has anyone in your family had late growth spurts after age 17?', type: 'radio', options: ['Yes', 'No', 'Don\'t know'] }
    ]
  },
  {
    title: "💪 Lifestyle & Health",
    description: "These questions look at your daily habits. Like sleep, food, and exercise because they affect how you grow. Good habits help you grow taller and stronger, while things like smoking or too much soy can stunt growth.",
    questions: [
      { key: 'exerciseFrequency', question: 'How often do you exercise per week?', type: 'radio', options: ['0', '1–2', '3–5', '6+ times'] },
      { key: 'sleepHours', question: 'How many hours of sleep do you get per night?', type: 'radio', options: ['Less than 6', '6–8', '8+'] },
      { key: 'supplementsMedications', question: 'Do you take any supplements or medicines? (Like vitamin D3, K2, etc.)', type: 'radio', options: ['Yes', 'No'] },
      { key: 'dairyConsumption', question: 'Do you drink milk or dairy products often?', type: 'radio', options: ['Yes', 'No'] },
      { key: 'proteinDiet', question: 'Do you eat protein-rich meals regularly?', type: 'radio', options: ['Yes', 'No', 'Sometimes'] },
      { key: 'cigaretteSmoke', question: 'Do you smoke or use any tobacco products?', type: 'radio', options: ['Yes', 'No'] },
      { key: 'aroundSmokers', question: 'Are you around smokers often?', type: 'radio', options: ['Yes', 'No'] },
      { key: 'soyConsumption', question: 'How often do you eat soy or soy-based foods?', type: 'radio', options: ['Often', 'Sometimes', 'Rarely', 'Never'] },
      { key: 'stressLevel', question: 'Is your lifestyle currently high stress?', type: 'radio', options: ['Yes', 'No', 'Somewhat'] },
      { key: 'visibleAbs', question: 'Do you have visible abs?', type: 'radio', options: ['Yes', 'No'] }
    ]
  },
  {
    title: "🧠 Psychological & Developmental",
    description: "These questions show how your growth compares to others your age. Feeling more mature or taller may mean you're ahead in puberty. If not, you might still have more growing to do.",
    questions: [
      { key: 'maturityComparison', question: 'Do you feel more mature or taller than your peers?', type: 'radio', options: ['Yes, much more', 'Slightly more', 'About the same', 'Slightly less', 'Not at all'] },
      { key: 'stillGrowing', question: 'Are you still growing noticeably each month?', type: 'radio', options: ['Yes, every month', 'Sometimes', 'Very little', 'Not anymore'] },
      { key: 'pubertyStage', question: 'Is your puberty mostly finished, halfway, or just beginning?', type: 'radio', options: ['Just beginning', 'Halfway through', 'Mostly finished', 'Not sure'] },
      { key: 'compareToFamily', question: 'Are your features starting to look more like your parents\' or older siblings\'?', type: 'radio', options: ['Yes, definitely', 'A little', 'Not yet', 'I don\'t know'] },
      { key: 'maturityVsPeers', question: 'Do you think your face, voice, or feet look more mature than your friends\'?', type: 'radio', options: ['Yes, all of them', 'Some of them', 'No, about the same', 'I look younger'] }
    ]
  },
  {
    title: "🌍 Ethnicity Background",
    description: "This helps us match your growth pattern to others with similar ancestry, since height and puberty timing can vary by ethnic background and region. We also compare your answers to millions of others with similar backgrounds to predict how you're likely to grow.",
    questions: [
      { key: 'birthCountry', question: 'What country were you born in?', type: 'text', placeholder: 'e.g., United States' },
      { key: 'parentsCountries', question: 'What countries are your parents from?', type: 'text', placeholder: 'e.g., Mother: China, Father: Germany' },
      { key: 'grandparentsCountries', question: 'Where were your grandparents born?', type: 'text', placeholder: 'e.g., All from Italy' },
      { key: 'ethnicGroup', question: 'What ethnic group is your family from? Include your mom\'s, dad\'s, and grandparents\' background if known. List the city, province, or nearby village. Be specific.', type: 'text', placeholder: 'e.g., Chinese, Indian, Arab, African, European, etc.' },
      { key: 'mixedEthnicity', question: 'Is your family mixed with more than one ethnicity?', type: 'radio', options: ['Yes', 'No', 'Not sure'] }
    ]
  },
  {
    title: "🧠 Head & Skull Shape",
    description: "The shape of your skull can help us better understand your genetic background and inherited traits. We use that, plus data from millions of similar people, to predict your growth.",
    questions: [
      { key: 'headShape', question: 'Is your head round, long, or in between?', type: 'radio', options: ['Round', 'Long', 'In between'] },
      { key: 'headTop', question: 'Is the top of your head flat, rounded, or high?', type: 'radio', options: ['Flat', 'Rounded', 'High'] },
      { key: 'headBack', question: 'Does the back of your head stick out or stay flat?', type: 'radio', options: ['Sticks out', 'Flat', 'In between'] },
      { key: 'forehead', question: 'Is your forehead straight, slanted, or curved?', type: 'radio', options: ['Straight', 'Slanted', 'Curved'] },
      { key: 'headWidth', question: 'Is your head wider at the top or at the jaw?', type: 'radio', options: ['Wider at the top', 'Wider at the jaw', 'Even / Balanced'] },
      { key: 'raisedLine', question: 'Do you feel a line running down the top of your head?', type: 'radio', options: ['Yes', 'No', 'Not sure'] }
    ]
  },
  {
    title: "🔍 Face Shape & Features",
    description: "These questions help us understand your bone structure and facial maturity, which are linked to genetic development, hormones, and growth patterns. This gives us extra clues about where you are in puberty and how much growth may be left.",
    questions: [
      { key: 'faceShape', question: 'Is your face long/narrow or short/wide?', type: 'radio', options: ['Long and narrow', 'Short and wide', 'In between'] },
      { key: 'cheekbonesProminence', question: 'Do your cheekbones stick out or look flat?', type: 'radio', options: ['Stick out', 'Flat', 'In between'] },
      { key: 'browBone', question: 'Do you have a strong bone above your eyebrows?', type: 'radio', options: ['Yes', 'No', 'A little'] },
      { key: 'noseShape', question: 'Is your nose wide/flat, medium, or tall/narrow?', type: 'radio', options: ['Wide/Flat', 'Medium', 'Tall/Narrow'] },
      { key: 'nostrils', question: 'Are your nostrils round or slit-shaped?', type: 'radio', options: ['Round', 'Slit-shaped', 'In between'] },
      { key: 'eyeSpacing', question: 'Is there space between your eyes?', type: 'radio', options: ['Wide space', 'Average', 'Close together'] },
      { key: 'chinShape', question: 'Is your chin pointy, round, or square?', type: 'radio', options: ['Pointy', 'Round', 'Square'] },
      { key: 'jawlineShape', question: 'Is your jawline sharp, curved, or soft?', type: 'radio', options: ['Sharp', 'Curved', 'Soft'] },
      { key: 'noseTip', question: 'Is your nose tip flat or raised?', type: 'radio', options: ['Flat', 'Raised', 'In between'] },
      { key: 'noseUpperLipSpace', question: 'Is the area between your nose and lip long or short?', type: 'radio', options: ['Long', 'Short', 'Average'] },
      { key: 'faceGrowthDirection', question: 'Does your face grow forward or downward?', type: 'radio', options: ['Forward', 'Downward', 'Not sure'] }
    ]
  },
  {
    title: "📸 Final Step: Photo Submission (Optional)",
    description: "Based on your quiz answers, we've reached 92% accuracy in predicting your final height and development. To boost that to 97%, just complete the final step below.",
    questions: [
      {
        key: 'photo1YearAgoFront',
        question: 'Photos from around 1 year ago: Front-facing photo of your face',
        type: 'file',
        accept: 'image/*'
      },
      {
        key: 'photo1YearAgoSide',
        question: 'Side profile photo of your face (1 year ago)',
        type: 'file',
        accept: 'image/*'
      },
      {
        key: 'photo1YearAgoBody',
        question: 'Standing body photo (full or upper body) (1 year ago)',
        type: 'file',
        accept: 'image/*'
      },
      {
        key: 'photoNowFront',
        question: 'Photos taken now: Front-facing photo of your face',
        type: 'file',
        accept: 'image/*'
      },
      {
        key: 'photoNowSide',
        question: 'Side profile photo of your face (now)',
        type: 'file',
        accept: 'image/*'
      },
      {
        key: 'photoNowBody',
        question: 'Standing body photo (full or upper body) (now)',
        type: 'file',
        accept: 'image/*'
      }
    ]
  }
];

export default function Quiz() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [quizData, setQuizData] = useState<QuizData>({} as QuizData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [photoPaths, setPhotoPaths] = useState<Record<string, string>>({});

  // Load photo paths from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const photoPathsString = localStorage.getItem('bioascension_photo_paths');
      if (photoPathsString) {
        try {
          const savedPhotoPaths = JSON.parse(photoPathsString);
          setPhotoPaths(savedPhotoPaths);
        } catch (e) {
          console.error('Failed to parse photo paths from localStorage:', e);
        }
      }
    }
  }, []);

  // Ensure referral code is captured from URL and stored in localStorage as soon as possible
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get('ref');
      if (ref) {
        // localStorage.setItem('current_referral_ref', ref); // This line is removed
        console.log('Referral code captured early:', ref);
      }
    }
  }, []);

  // Helper to check if all required (non-photo) questions are answered in the current section
  const allRequiredAnswered = () => {
    return currentQuestions.questions.every(q => {
      if (q.type === 'file') return true; // photo upload is optional
      const value = quizData[q.key as keyof QuizData];
      if (q.type === 'checkbox') return value === true;
      return value !== undefined && value !== null && value !== '';
    });
  };

  const handleInputChange = (key: string, value: string | boolean | File | null) => {
    setQuizData(prev => ({ ...prev, [key]: value }));
  };

  const handleFileChange = async (key: string, file: File | null) => {
    setQuizData(prev => ({ ...prev, [key]: file }));
    
    // Upload file to Vercel Blob if provided
    if (file) {
      try {
        const response = await fetch('/api/upload-photo', {
          method: 'POST',
          headers: {
            'x-filename': `${key}_${Date.now()}.${file.name.split('.').pop()}`,
            'content-type': file.type,
          },
          body: file,
        });

        if (response.ok) {
          const { url } = await response.json();
          const updatedPhotoPaths = { ...photoPaths, [key]: url };
          setPhotoPaths(updatedPhotoPaths);
          
          // Save photoPaths to localStorage
          localStorage.setItem('bioascension_photo_paths', JSON.stringify(updatedPhotoPaths));
        } else {
          console.error('Failed to upload photo:', key);
        }
      } catch (error) {
        console.error('Error uploading photo:', error);
      }
    } else {
      // Remove photo URL if file is cleared
      const updatedPhotoPaths = { ...photoPaths };
      delete updatedPhotoPaths[key];
      setPhotoPaths(updatedPhotoPaths);
      localStorage.setItem('bioascension_photo_paths', JSON.stringify(updatedPhotoPaths));
    }
  };

  const handleNext = () => {
    if (!allRequiredAnswered()) {
      setShowValidationError(true);
      setToastMessage('Please complete all required questions before continuing.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    setShowValidationError(false);
    if (currentSection < quizSections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = async () => {
    if (!allRequiredAnswered()) {
      setShowValidationError(true);
      setToastMessage('Please complete all required questions before submitting.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    setShowValidationError(false);
    setIsSubmitting(true);

    try {
      // Prepare quiz data for storage (exclude files for JSON)
      const quizDataWithoutFiles = { ...quizData };
      const photoKeys = ['photo1YearAgoFront', 'photo1YearAgoSide', 'photo1YearAgoBody', 'photoNowFront', 'photoNowSide', 'photoNowBody'];
      photoKeys.forEach(key => {
        delete quizDataWithoutFiles[key as keyof QuizData];
      });
      localStorage.setItem('bioascension_quiz_data', JSON.stringify(quizDataWithoutFiles));
      document.cookie = 'hasQuiz=true; path=/';

      // Referral code is already captured in useEffect when component mounts
      // NEW: Increment inviter's progress if user came from referral link
      const referralCode = localStorage.getItem('current_referral_ref');
      const firstName = localStorage.getItem('bioascension_firstName');
      const lastName = localStorage.getItem('bioascension_lastName');
    
      if (referralCode) {
        try {
          await fetch('/api/referral/increment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ref: referralCode, firstName, lastName , quizDataWithoutFiles })
          });
        } catch (err) {
          console.error('Failed to increment inviter progress:', err);
        }
      }

      // Redirect to unlock report page
      router.push('/unlock-report');
    } catch (error) {
      console.error('Quiz submission error:', error);
      alert('Failed to save your data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQuestions = quizSections[currentSection];
  const progress = ((currentSection + 1) / quizSections.length) * 100;

  return (
    <div className="bg-lightblue min-h-screen">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-4 animate-fade-in">
          <span className="font-semibold">{toastMessage}</span>
          <button onClick={() => setShowToast(false)} className="ml-2 text-white text-lg font-bold focus:outline-none">×</button>
        </div>
      )}
      <Head>
        <title>Height Quiz - Heightmax</title>
        <meta name="description" content="Discover your genetic potential with our comprehensive height and growth quiz." />
      </Head>

      {/* Header */}
      <header className="bg-deepblue text-white shadow">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-extrabold text-2xl tracking-tight flex items-center">
            <Image src="/logo/logo.png" width={50} height={36} alt="Heightmax Logo" />
            <span className="bg-gradient-to-r from-teal to-white text-transparent bg-clip-text drop-shadow-lg">Heightmax</span>
          </div>
          <button
            onClick={() => router.push('/')}
            className="text-teal hover:text-white transition"
          >
            ← Back to Home
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-deepblue">Progress</span>
            <span className="text-sm font-medium text-deepblue">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-teal to-deepblue h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-deepblue mb-6">{currentQuestions.title}</h2>

          {(currentQuestions as any).description && (
            <div className="bg-teal bg-opacity-10 border border-teal border-opacity-20 rounded-lg p-4 mb-6">
              <p className="text-deepblue text-sm">{(currentQuestions as any).description}</p>
              {currentQuestions.title.includes('Photo Submission') && (
                <p className="text-deepblue text-sm mt-2 italic">
                  Note: Photo submission is completely optional. You can skip this step and still get your results with 92% accuracy.
                </p>
              )}
            </div>
          )}

          <div className="space-y-6">
            {showValidationError && (
              <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg px-4 py-2 mb-4 text-sm">
                Please answer all required questions before continuing.
              </div>
            )}
            {currentQuestions.questions.map((question, index) => (
              <div key={question.key} className="border-b border-gray-100 pb-6 last:border-b-0">
                <label className="block text-lg font-medium text-deepblue mb-3">
                  {question.question}
                </label>

                {question.type === 'radio' && (
                  <div className="space-y-2">
                    {question.options?.map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name={question.key}
                          value={option}
                          checked={quizData[question.key as keyof QuizData] === option}
                          onChange={(e) => handleInputChange(question.key, e.target.value)}
                          className="mr-3 text-teal focus:ring-teal"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'text' && (
                  question.key === 'pubertyAge' ? (
                    <textarea
                      placeholder={question.placeholder}
                      value={quizData[question.key as keyof QuizData] as string || ''}
                      onChange={(e) => handleInputChange(question.key, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
                      rows={2}
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder={question.placeholder}
                      value={quizData[question.key as keyof QuizData] as string || ''}
                      onChange={(e) => handleInputChange(question.key, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                    />
                  )
                )}

                {question.type === 'email' && (
                  <input
                    type="email"
                    placeholder={question.placeholder}
                    value={quizData[question.key as keyof QuizData] as string || ''}
                    onChange={(e) => handleInputChange(question.key, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                    required
                  />
                )}

                {question.type === 'checkbox' && (
                  <div className="space-y-2">
                    {question.options?.map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={quizData[question.key as keyof QuizData] === true}
                          onChange={(e) => handleInputChange(question.key, e.target.checked)}
                          className="mr-3 text-teal focus:ring-teal"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'file' && (
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept={question.accept}
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        handleFileChange(question.key, file);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal file:text-white hover:file:bg-teal-400"
                    />
                    {quizData[question.key as keyof QuizData] && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700">
                          ✓ File uploaded: {(quizData[question.key as keyof QuizData] as File)?.name}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentSection === 0}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentSection === quizSections.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-2 bg-gradient-to-r from-teal to-deepblue text-white rounded-lg hover:from-teal-400 hover:to-deepblue transition disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : 'Submit & See Your Report'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-gradient-to-r from-teal to-deepblue text-white rounded-lg hover:from-teal-400 hover:to-deepblue transition"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-blue-600">🔒</span>
            <span className="text-sm font-semibold text-blue-800">Privacy First at Heightmax</span>
          </div>
          <p className="text-xs text-blue-700 leading-relaxed">
            At Heightmax, your privacy is our top priority. We do not sell, share, or trade your personal information, quiz answers, or photos with anyone. Your data is used only to generate your personalized growth and development report.
          </p>
        </div>
      </div>
    </div>
  );
}
