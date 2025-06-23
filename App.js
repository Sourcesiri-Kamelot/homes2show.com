import React, { useState } from 'react';

// --- Reusable Icon Components ---
const CheckIcon = ({ className }) => (
  <svg className={`w-6 h-6 text-green-500 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

const XIcon = ({ className }) => (
    <svg className={`w-6 h-6 text-red-500 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
);

const SparkleIcon = ({className}) => (
    <svg className={`w-5 h-5 ${className}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5a.75.75 0 01.75-.75zM10 17.5a.75.75 0 01-.75-.75v-3.5a.75.75 0 011.5 0v3.5a.75.75 0 01-.75.75zM5.134 6.866a.75.75 0 011.06 0l2.475 2.475a.75.75 0 01-1.06 1.06L5.134 7.926a.75.75 0 010-1.06zM12.33 14.06a.75.75 0 011.06 0l2.475 2.475a.75.75 0 01-1.06 1.06l-2.475-2.475a.75.75 0 010-1.06zM2.5 10a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5A.75.75 0 012.5 10zM17.5 10a.75.75 0 01-.75.75h-3.5a.75.75 0 010-1.5h3.5a.75.75 0 01.75.75zM6.866 14.866a.75.75 0 010-1.06l2.475-2.475a.75.75 0 011.06 1.06l-2.475 2.475a.75.75 0 01-1.06 0zM14.06 5.196a.75.75 0 010-1.06l2.475-2.475a.75.75 0 111.06 1.06l-2.475 2.475a.75.75 0 01-1.06 0z"></path></svg>
);

// --- Page Components ---

const LandingPage = ({ setCurrentPage }) => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=2070&auto=format&fit=crop"
            alt="Modern house interior"
          />
          <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Smarter Showings, Better Business
          </h1>
          <p className="mt-6 text-xl text-gray-200 max-w-3xl mx-auto">
            Leverage AI to connect with showing agents, optimize your schedule, and close more deals. Never miss an opportunity.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
             <button
                onClick={() => setCurrentPage('pricing')}
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600"
              >
                View Plans & Sign Up
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PricingPage = () => {
    const tiers = [
        {
            name: 'Starter Agent',
            price: 0,
            features: [
                { text: 'Post up to 5 Showing Requests/month', included: true },
                { text: 'Show Unlimited Homes for Others', included: true },
                { text: 'Basic Activity Dashboard', included: true },
                { text: 'Standard Payouts', included: true },
                { text: 'Share to Earn Credits (Stack up to 5)', included: true },
                { text: 'AI Description Enhancer (3/month)', included: true },
                { text: 'AI Feedback Summarizer (3/month)', included: true },
                { text: 'AI Pricing Assistant', included: false },
                { text: 'AI Market Insights', included: false },
                { text: 'Priority Matching', included: false },
                { text: 'Community & Email Support', included: true },
            ],
            cta: 'Sign Up for Free',
            primary: false,
        },
        {
            name: 'Growing Agent',
            price: 19,
            features: [
                { text: 'Post up to 25 Showing Requests/month', included: true },
                { text: 'Show Unlimited Homes for Others', included: true },
                { text: 'Detailed Activity Dashboard', included: true },
                { text: 'Expedited Payouts', included: true },
                { text: 'Referral Program (5% off Subscription)', included: true },
                { text: 'AI Description Enhancer (Unlimited)', included: true },
                { text: 'AI Feedback Summarizer (Unlimited)', included: true },
                { text: 'AI Pricing Assistant', included: true },
                { text: 'AI Market Insights', included: false },
                { text: 'Priority Matching', included: false },
                { text: 'Priority Email Support', included: true },
            ],
            cta: 'Choose Pro',
            primary: true,
        },
        {
            name: 'Power Agent',
            price: 49,
            features: [
                { text: 'Post Unlimited Showing Requests', included: true },
                { text: 'Show Unlimited Homes for Others', included: true },
                { text: 'Advanced Analytics Dashboard', included: true },
                { text: 'Instant Payouts', included: true },
                { text: 'Referral Program (10% off Subscription)', included: true },
                { text: 'AI Description Enhancer (Unlimited)', included: true },
                { text: 'AI Feedback Summarizer (Unlimited)', included: true },
                { text: 'AI Pricing Assistant', included: true },
                { text: 'AI Market Insights', included: true },
                { text: 'Priority Matching in Search', included: true },
                { text: 'Dedicated Phone & Chat Support', included: true },
            ],
            cta: 'Go Platinum',
            primary: false,
        },
    ];

    return (
        <div className="bg-gray-100">
            <div className="pt-12 sm:pt-16 lg:pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">Plans for Every Agent</h2>
                        <p className="mt-4 text-xl text-gray-600">
                            Find the perfect fit to grow your business and reclaim your time.
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-8 bg-white pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
                <div className="relative">
                    <div className="absolute inset-0 h-1/2 bg-gray-100" />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-lg mx-auto rounded-lg shadow-lg lg:max-w-none lg:flex">
                            {tiers.map((tier, index) => (
                                <div key={tier.name} className={`flex-1 bg-white rounded-lg shadow-xl px-6 py-8 lg:p-12 ${index === 1 ? 'ring-2 ring-orange-500 z-10' : ''}`}>
                                    <h3 className="text-2xl font-extrabold text-gray-900">{tier.name}</h3>
                                    <div className="mt-6">
                                        <span className="text-4xl font-extrabold">${tier.price}</span>
                                        <span className="text-base font-medium text-gray-500">/mo</span>
                                    </div>
                                    <p className="mt-6 text-sm text-gray-500">{tier.description}</p>
                                    <ul role="list" className="mt-8 space-y-5">
                                        {tier.features.map((feature) => (
                                            <li key={feature.text} className="flex items-start">
                                                <div className="flex-shrink-0">
                                                    {feature.included ? <CheckIcon className="text-green-500" /> : <XIcon className="text-red-400" />}
                                                </div>
                                                <p className="ml-3 text-sm text-gray-700">{feature.text}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-8">
                                        <a href="#" className={`block w-full text-center rounded-lg border border-transparent px-6 py-3 text-base font-medium ${tier.primary ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-800 text-white hover:bg-gray-900'}`}>{tier.cta}</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const DashboardPage = () => {
    const [feedbackNotes, setFeedbackNotes] = useState("Client loved the natural light and the high ceilings. The kitchen felt a bit dated for them. They asked about the age of the HVAC system and if the appliances are included. They disliked the color of the master bedroom.");
    const [summarizedFeedback, setSummarizedFeedback] = useState("");
    const [isSummarizing, setIsSummarizing] = useState(false);
    
    // Placeholder for Pricing Assistant state
    const [suggestedPrice, setSuggestedPrice] = useState("");
    const [isPricing, setIsPricing] = useState(false);

    // This would be fetched from the user's data
    const userTier = "Platinum"; 

    const handleSummarize = async () => {
        setIsSummarizing(true);
        setSummarizedFeedback("Generating summary...");
        const prompt = `Summarize the following real estate showing feedback into 'Likes', 'Dislikes', and 'Questions'. Format as bullet points under each heading.\n\nFeedback:\n"${feedbackNotes}"`;
        // Mock API call
        setTimeout(() => {
            setSummarizedFeedback(`**Likes:**\n- Natural light\n- High ceilings\n\n**Dislikes:**\n- Dated kitchen\n- Color of the master bedroom\n\n**Questions:**\n- What is the age of the HVAC system?\n- Are the appliances included?`);
            setIsSummarizing(false);
        }, 1500);
    };
    
    const handleGetPrice = async () => {
        setIsPricing(true);
        setSuggestedPrice("Analyzing market data...");
         // Mock API call
        setTimeout(() => {
           setSuggestedPrice("Suggested Fee: $50 - $65. This is a high-demand time for this area.");
           setIsPricing(false);
        }, 1500);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <header className="mb-10 flex flex-col sm:flex-row justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900">Agent Dashboard</h1>
                        <p className="mt-2 text-lg text-gray-600">Welcome back, Power Agent!</p>
                    </div>
                    <div className="mt-4 sm:mt-0 bg-white p-4 rounded-lg shadow-md text-center">
                         <h3 className="text-sm font-medium text-gray-500">Reputation Score</h3>
                         <p className="mt-1 text-3xl font-semibold text-green-600">4.9 <span className="text-yellow-400">★</span></p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: AI Tools */}
                    <div className="lg:col-span-2 space-y-8">
                         {/* AI Pricing Assistant */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center"><SparkleIcon className="mr-2 text-purple-500"/> AI Pricing Assistant <span className="ml-2 text-xs font-bold text-white bg-purple-500 py-0.5 px-2 rounded-full">PRO</span></h2>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="text" placeholder="Property Address or Zip Code" className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2" />
                                <input type="datetime-local" className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2" />
                            </div>
                            <button onClick={handleGetPrice} disabled={isPricing} className="mt-4 flex items-center justify-center w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400">
                               {isPricing ? 'Calculating...' : 'Get Suggested Fee'}
                            </button>
                             {suggestedPrice && <div className="mt-4 p-4 bg-purple-50 rounded-md text-purple-800 font-semibold">{suggestedPrice}</div>}
                        </div>
                    
                        {/* AI Feedback Summarizer */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center"><SparkleIcon className="mr-2 text-orange-500"/> AI Showing Feedback Summarizer</h2>
                            <textarea id="feedbackNotes" rows="5" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2" value={feedbackNotes} onChange={(e) => setFeedbackNotes(e.target.value)}></textarea>
                            <button onClick={handleSummarize} disabled={isSummarizing} className="mt-4 flex items-center justify-center w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400">
                                {isSummarizing ? 'Generating...' : 'Generate Summary'}
                            </button>
                            {summarizedFeedback && <div className="mt-4 p-4 bg-orange-50 rounded-md prose prose-sm max-w-none whitespace-pre-wrap">{summarizedFeedback}</div>}
                        </div>
                    </div>
                    
                    {/* Right Column: Market Insights */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                         <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center"><SparkleIcon className="mr-2 text-blue-500"/> AI Market Insights <span className="ml-2 text-xs font-bold text-white bg-blue-500 py-0.5 px-2 rounded-full">PLATINUM</span></h2>
                         {userTier === "Platinum" ? (
                             <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-gray-800">Busiest Showing Times - Your Area</h3>
                                    <div className="mt-2 bg-gray-200 h-40 rounded-md flex items-center justify-center text-gray-500 text-sm">Chart Placeholder</div>
                                </div>
                                 <div>
                                    <h3 className="font-semibold text-gray-800">Top Requested Features</h3>
                                    <ul className="list-disc list-inside mt-2 text-sm text-gray-600">
                                        <li>Home Office</li>
                                        <li>Fenced Yard</li>
                                        <li>Quartz Countertops</li>
                                    </ul>
                                </div>
                                 <div>
                                    <h3 className="font-semibold text-gray-800">Average Showing Fees</h3>
                                    <p className="text-sm text-gray-600">Single Family: $55</p>
                                    <p className="text-sm text-gray-600">Condo/Townhouse: $45</p>
                                </div>
                             </div>
                         ) : (
                             <div className="text-center h-full flex flex-col justify-center items-center">
                                 <p className="text-gray-600">Unlock powerful local market intelligence.</p>
                                 <button className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">Upgrade to Platinum</button>
                             </div>
                         )}
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Main App Component ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
      switch(currentPage) {
          case 'home':
            return <LandingPage setCurrentPage={setCurrentPage} />;
          case 'pricing':
            return <PricingPage />;
          case 'dashboard':
            return <DashboardPage />;
          default:
            return <LandingPage setCurrentPage={setCurrentPage} />;
      }
  }

  return (
    <div>
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
               <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span className="ml-2 text-2xl font-bold text-gray-800">Homes2Show</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a onClick={() => setCurrentPage('home')} className={`cursor-pointer border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${currentPage === 'home' ? 'border-orange-500 text-gray-900' : ''}`}>Home</a>
              <a onClick={() => setCurrentPage('pricing')} className={`cursor-pointer border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${currentPage === 'pricing' ? 'border-orange-500 text-gray-900' : ''}`}>Pricing</a>
              <a onClick={() => setCurrentPage('dashboard')} className={`cursor-pointer border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${currentPage === 'dashboard' ? 'border-orange-500 text-gray-900' : ''}`}>Dashboard</a>
            </div>
             <div className="flex items-center">
                <button className="hidden md:inline-block bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded mr-2">
                    Log In
                </button>
                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                    Sign Up
                </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
                <div className="px-5 py-2"><a href="#" className="text-base text-gray-400 hover:text-gray-300">About</a></div>
                <div className="px-5 py-2"><a href="#" className="text-base text-gray-400 hover:text-gray-300">Community Guidelines</a></div>
                <div className="px-5 py-2"><a href="#" className="text-base text-gray-400 hover:text-gray-300">Contact</a></div>
                 <div className="px-5 py-2"><a href="#" className="text-base text-gray-400 hover:text-gray-300">Terms</a></div>
                 <div className="px-5 py-2"><a href="#" className="text-base text-gray-400 hover:text-gray-300">Privacy</a></div>
            </nav>
          <p className="mt-8 text-center text-base text-gray-400">&copy; 2025 Homes2Show. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
