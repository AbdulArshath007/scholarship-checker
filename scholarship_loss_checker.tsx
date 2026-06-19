import React, { useState } from 'react';

const clayStyles = `
  :root {
    color-scheme: dark; /* Forces native browser UI into dark mode */
    --bg-dark: #0c0c0e; /* Deep obsidian */
    --clay-surface: #16161a; /* Charcoal clay */
    --clay-surface-light: #202026;
    --text-main: #f4f4f5;
    --text-muted: #a1a1aa;
    
    --shadow-light: rgba(255, 255, 255, 0.03);
    --shadow-dark: rgba(0, 0, 0, 0.6);
    --shadow-inner-light: rgba(255, 255, 255, 0.04);
    --shadow-inner-dark: rgba(0, 0, 0, 0.8);
  }

  body {
    background-color: var(--bg-dark);
    color: var(--text-main);
  }

  .clay-panel {
    background: var(--clay-surface);
    border-radius: 24px;
    box-shadow: 
      12px 12px 24px var(--shadow-dark), 
      -8px -8px 20px var(--shadow-light),
      inset 2px 2px 6px var(--shadow-inner-light),
      inset -2px -2px 6px var(--shadow-inner-dark);
  }

  .clay-panel-flat {
    background: var(--clay-surface);
    border-radius: 16px;
    box-shadow: 
      8px 8px 16px var(--shadow-dark), 
      -4px -4px 10px var(--shadow-light);
  }

  .clay-input {
    background: #080809; /* Deeper recessed abyss */
    border-radius: 16px;
    border: 2px solid transparent;
    color: var(--text-main);
    box-shadow: 
      inset 6px 6px 12px rgba(0, 0, 0, 0.8),
      inset -4px -4px 8px rgba(255, 255, 255, 0.02);
    transition: all 0.3s ease;
  }

  .clay-input:focus {
    outline: none;
    border-color: #DE6FA1; /* Pink accent */
    box-shadow: 
      inset 4px 4px 8px rgba(0, 0, 0, 0.9),
      inset -2px -2px 6px rgba(255, 255, 255, 0.03),
      0 0 0 2px rgba(222, 111, 161, 0.15);
  }

  .clay-button {
    background: #DE6FA1; /* Pink Base */
    border-radius: 16px;
    color: #ffffff;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 
      8px 8px 16px rgba(222, 111, 161, 0.15), 
      -4px -4px 12px rgba(255, 255, 255, 0.03),
      inset 2px 2px 6px rgba(255, 255, 255, 0.2),
      inset -2px -2px 6px rgba(0, 0, 0, 0.2);
    transition: all 0.15s ease;
  }

  .clay-button:hover {
    transform: translateY(-2px);
    background: #e88ab4; /* Pink Lighter */
    box-shadow: 
      10px 10px 20px rgba(222, 111, 161, 0.2), 
      -4px -4px 12px rgba(255, 255, 255, 0.04),
      inset 2px 2px 6px rgba(255, 255, 255, 0.3),
      inset -2px -2px 6px rgba(0, 0, 0, 0.2);
  }

  .clay-button:active {
    transform: translateY(2px);
    box-shadow: 
      inset 6px 6px 12px rgba(0, 0, 0, 0.4),
      inset -4px -4px 8px rgba(255, 255, 255, 0.1);
  }

  .clay-badge-accent {
    background: #f43f5e; /* Rose 500 */
    box-shadow: inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.3);
  }
  .clay-badge-success {
    background: #10b981; /* Emerald 500 */
    box-shadow: inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.3);
  }
  .clay-badge-neutral {
    background: #DE6FA1; /* Pink for Neutral/Accent Badges */
    box-shadow: inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.4);
  }

  /* Custom Scrollbar for dark theme */
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: var(--bg-dark); }
  ::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #DE6FA1; }
`;

const SCHOLARSHIPS_DB = [
  {
    id: "csss_01",
    name: "Central Sector Scheme of Scholarship",
    provider: "Central Govt",
    level: "UG",
    rules: { incomeMax: 800000, minMarksPercent: 80, educationLevel: ["UG"] },
    benefit: "₹10,000–₹20,000/year",
    deadlineMonth: "October",
    tags: ["merit"]
  },
  {
    id: "inspire_01",
    name: "INSPIRE Scholarship (DST)",
    provider: "Central Govt",
    level: "UG",
    rules: { minMarksPercent: 80, educationLevel: ["UG"], coursesAllowed: ["Science"] },
    benefit: "₹5,000/mo + ₹20k grant",
    deadlineMonth: "August",
    tags: ["science", "merit"]
  },
  {
    id: "yasasvi_01",
    name: "PM YASASVI Scholarship",
    provider: "Central Govt",
    level: "School",
    rules: { incomeMax: 250000, categoriesAllowed: ["OBC", "EBC", "DNT"], educationLevel: ["School"] },
    benefit: "₹75,000–₹1,25,000",
    deadlineMonth: "August",
    tags: ["reservation", "means", "niche"]
  },
  {
    id: "nmms_01",
    name: "NMMS Scholarship",
    provider: "Central Govt",
    level: "School",
    rules: { incomeMax: 350000, minMarksPercent: 55, educationLevel: ["School"] },
    benefit: "₹12,000/year",
    deadlineMonth: "November",
    tags: ["merit", "means"]
  },
  {
    id: "aicte_pragati",
    name: "AICTE Pragati Scholarship",
    provider: "Central Govt",
    level: "UG",
    rules: { gender: "Female", incomeMax: 800000, educationLevel: ["UG"], coursesAllowed: ["Engineering", "Tech", "Diploma"] },
    benefit: "₹50,000/year",
    deadlineMonth: "October",
    tags: ["girls", "engineering", "niche"]
  },
  {
    id: "aicte_saksham",
    name: "AICTE Saksham Scholarship",
    provider: "Central Govt",
    level: "UG",
    rules: { incomeMax: 800000, educationLevel: ["UG"], categoriesAllowed: ["PWD"] },
    benefit: "₹50,000/year",
    deadlineMonth: "October",
    tags: ["pwd", "niche"]
  },
  {
    id: "reliance_ug",
    name: "Reliance Foundation UG",
    provider: "Private",
    level: "UG",
    rules: { incomeMax: 800000, minMarksPercent: 60, educationLevel: ["UG"] },
    benefit: "Up to ₹2,00,000 total",
    deadlineMonth: "October",
    tags: ["merit", "means"]
  },
  {
    id: "tata_pankh",
    name: "Tata Capital Pankh",
    provider: "Private",
    level: "All",
    rules: { incomeMax: 250000, educationLevel: ["School", "UG"] },
    benefit: "₹10,000–₹1,00,000",
    deadlineMonth: "September",
    tags: ["means"]
  },
  {
    id: "ongc_01",
    name: "ONGC Merit Scholarship",
    provider: "PSU",
    level: "UG",
    rules: { incomeMax: 200000, educationLevel: ["UG"], coursesAllowed: ["Engineering", "MBBS"] },
    benefit: "₹48,000/year",
    deadlineMonth: "July",
    tags: ["merit", "engineering", "niche"]
  },
  {
    id: "ntpc_01",
    name: "NTPC Utkarsh Scheme",
    provider: "PSU",
    level: "UG",
    rules: { incomeMax: 150000, educationLevel: ["UG"] },
    benefit: "₹24,000/year",
    deadlineMonth: "June",
    tags: ["means"]
  }
];

const InputGroup = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-2">
      {label}
    </label>
    {children}
  </div>
);

export default function App() {
  const [formData, setFormData] = useState({
    age: '',
    state: 'ALL',
    income: '',
    category: 'General',
    educationLevel: 'School',
    course: 'General',
    gender: 'Male',
    institutionType: 'Govt',
    marks: ''
  });

  const [results, setResults] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const evaluateRules = (user, scheme) => {
    let totalRules = 0;
    let matchedRules = 0;
    const missingReasons: string[] = [];

    if (scheme.rules.incomeMax !== undefined) {
      totalRules++;
      if (Number(user.income) <= scheme.rules.incomeMax) matchedRules++;
      else missingReasons.push(`Income Limit Exceeded (Max: ₹${scheme.rules.incomeMax.toLocaleString()})`);
    }

    if (scheme.rules.minMarksPercent !== undefined) {
      totalRules++;
      if (Number(user.marks) >= scheme.rules.minMarksPercent) matchedRules++;
      else missingReasons.push(`Academic Deficit (Requires ${scheme.rules.minMarksPercent}%+)`);
    }

    if (scheme.rules.educationLevel) {
      totalRules++;
      if (scheme.rules.educationLevel.includes(user.educationLevel) || scheme.rules.educationLevel.includes("All")) matchedRules++;
      else missingReasons.push(`Education Level Mismatch`);
    }

    if (scheme.rules.categoriesAllowed) {
      totalRules++;
      if (scheme.rules.categoriesAllowed.includes(user.category)) matchedRules++;
      else missingReasons.push(`Category Restriction`);
    }

    if (scheme.rules.gender && scheme.rules.gender !== "ALL") {
      totalRules++;
      if (user.gender === scheme.rules.gender) matchedRules++;
      else missingReasons.push(`Gender Restriction (${scheme.rules.gender} only)`);
    }

    if (scheme.rules.coursesAllowed && !scheme.rules.coursesAllowed.includes("ALL")) {
      totalRules++;
      if (scheme.rules.coursesAllowed.includes(user.course)) matchedRules++;
      else missingReasons.push(`Course Stream Mismatch`);
    }

    const score = totalRules > 0 ? (matchedRules / totalRules) * 100 : 100;
    return { score, missingReasons };
  };

  const processDiagnostic = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setResults(null);

    setTimeout(() => {
      const output = {
        unclaimed: [],
        eligible: [],
        partial: []
      };

      SCHOLARSHIPS_DB.forEach(scheme => {
        const evaluation = evaluateRules(formData, scheme);

        if (evaluation.score === 100) {
          if (scheme.tags.includes('niche')) {
            output.unclaimed.push({
              ...scheme,
              diagnosticNote: "Demographic Match: High probability of disbursement due to low historical utilization."
            });
          } else {
            output.eligible.push(scheme);
          }
        } else if (evaluation.score >= 50 && evaluation.score < 100) {
          output.partial.push({
            ...scheme,
            missingCriteria: evaluation.missingReasons
          });
        }
      });

      setResults(output);
      setIsProcessing(false);
    }, 600); // Slight delay for tactile hardware feel
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#f4f4f5] p-4 md:p-8 lg:p-12 font-sans selection:bg-[#DE6FA1] selection:text-white pb-20">
      <style>{clayStyles}</style>

      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="clay-panel p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-5">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-100 tracking-tight">Scholarship Analyzer</h1>
              <p className="text-xs text-[#DE6FA1]/80 uppercase tracking-[0.2em] mt-1 font-semibold">Know what you are eligible for</p>
            </div>
          </div>
          <div className="clay-panel-flat px-4 py-2 flex items-center gap-3 border border-zinc-800/50">
             <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse clay-badge-success"></div>
             <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">SYSTEM ONLINE</span>
          </div>
        </header>

        {/* Form */}
        <main className="clay-panel p-6 md:p-10">
          <form onSubmit={processDiagnostic} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Group 1: Identity */}
              <div className="clay-panel-flat p-5 border border-zinc-800/50 space-y-5">
                <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-widest border-b border-zinc-800 pb-3 mb-4">I. Identity</h3>
                <InputGroup label="Age">
                  <input type="number" name="age" required min="10" max="50" value={formData.age} onChange={handleInputChange} className="clay-input w-full px-4 py-3 text-sm" placeholder="e.g. 19" />
                </InputGroup>
                <InputGroup label="Gender">
                  <select name="gender" value={formData.gender} onChange={handleInputChange} className="clay-input w-full px-4 py-3 text-sm appearance-none">
                    <option value="Male" className="bg-[#16161a] text-zinc-100">Male</option>
                    <option value="Female" className="bg-[#16161a] text-zinc-100">Female</option>
                    <option value="Other" className="bg-[#16161a] text-zinc-100">Transgender</option>
                  </select>
                </InputGroup>
                <InputGroup label="State of Domicile">
                  <select name="state" value={formData.state} onChange={handleInputChange} className="clay-input w-full px-4 py-3 text-sm appearance-none">
                    <option value="ALL" className="bg-[#16161a] text-zinc-100">Central / All India</option>
                    <option value="MH" className="bg-[#16161a] text-zinc-100">Maharashtra</option>
                    <option value="TN" className="bg-[#16161a] text-zinc-100">Tamil Nadu</option>
                    <option value="DL" className="bg-[#16161a] text-zinc-100">Delhi</option>
                  </select>
                </InputGroup>
              </div>

              {/* Group 2: Socio-Economic */}
              <div className="clay-panel-flat p-5 border border-zinc-800/50 space-y-5">
                <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-widest border-b border-zinc-800 pb-3 mb-4">II. Financial</h3>
                <InputGroup label="Family Income (₹)">
                  <input type="number" name="income" required min="0" value={formData.income} onChange={handleInputChange} className="clay-input w-full px-4 py-3 text-sm" placeholder="e.g. 250000" />
                </InputGroup>
                <InputGroup label="Social Category">
                  <select name="category" value={formData.category} onChange={handleInputChange} className="clay-input w-full px-4 py-3 text-sm appearance-none">
                    <option value="General" className="bg-[#16161a] text-zinc-100">General (UR)</option>
                    <option value="OBC" className="bg-[#16161a] text-zinc-100">OBC / BC</option>
                    <option value="SC" className="bg-[#16161a] text-zinc-100">SC</option>
                    <option value="ST" className="bg-[#16161a] text-zinc-100">ST</option>
                    <option value="PWD" className="bg-[#16161a] text-zinc-100">PWD</option>
                  </select>
                </InputGroup>
              </div>

              {/* Group 3: Academics */}
              <div className="clay-panel-flat p-5 border border-zinc-800/50 space-y-5">
                <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-widest border-b border-zinc-800 pb-3 mb-4">III. Academics</h3>
                <InputGroup label="Education Level">
                  <select name="educationLevel" value={formData.educationLevel} onChange={handleInputChange} className="clay-input w-full px-4 py-3 text-sm appearance-none">
                    <option value="School" className="bg-[#16161a] text-zinc-100">School (1-12)</option>
                    <option value="UG" className="bg-[#16161a] text-zinc-100">Undergraduate</option>
                    <option value="PG" className="bg-[#16161a] text-zinc-100">Postgraduate</option>
                    <option value="Diploma" className="bg-[#16161a] text-zinc-100">Diploma</option>
                  </select>
                </InputGroup>
                <InputGroup label="Course Stream">
                  <select name="course" value={formData.course} onChange={handleInputChange} className="clay-input w-full px-4 py-3 text-sm appearance-none">
                    <option value="General" className="bg-[#16161a] text-zinc-100">General</option>
                    <option value="Science" className="bg-[#16161a] text-zinc-100">Science</option>
                    <option value="Engineering" className="bg-[#16161a] text-zinc-100">Engineering & Tech</option>
                    <option value="MBBS" className="bg-[#16161a] text-zinc-100">Medical</option>
                  </select>
                </InputGroup>
                <InputGroup label="Previous Marks (%)">
                  <input type="number" name="marks" required min="0" max="100" value={formData.marks} onChange={handleInputChange} className="clay-input w-full px-4 py-3 text-sm" placeholder="e.g. 85" />
                </InputGroup>
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit" 
                disabled={isProcessing}
                className="clay-button w-full md:w-auto px-10 py-4 text-sm tracking-[0.15em] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Calibrating Matrices...
                  </>
                ) : 'Execute Verification Protocol'}
              </button>
            </div>
          </form>
        </main>

        {/* Results */}
        {results && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* Dashboard Summary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="clay-panel p-6 flex flex-col justify-center items-center text-center">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-2">High Priority Gaps</span>
                <span className="text-4xl font-black text-white">{results.unclaimed.length}</span>
              </div>
              <div className="clay-panel p-6 flex flex-col justify-center items-center text-center">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-2">Verified Eligible</span>
                <span className="text-4xl font-black text-white">{results.eligible.length}</span>
              </div>
              <div className="clay-panel p-6 flex flex-col justify-center items-center text-center">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Deficits Detected</span>
                <span className="text-4xl font-black text-white">{results.partial.length}</span>
              </div>
            </div>

            {/* Section 1: Unclaimed Opportunities */}
            <section className="clay-panel overflow-hidden">
              <div className="bg-[#080809]/40 border-b border-zinc-800/50 px-6 py-4 flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full clay-badge-accent"></div>
                  Action Required: Unclaimed Funds
                </h3>
              </div>
              <div className="p-6">
                {results.unclaimed.length === 0 ? (
                  <p className="text-sm text-zinc-500 font-medium text-center py-4">No specific demographic anomalies detected.</p>
                ) : (
                  <div className="space-y-4">
                    {results.unclaimed.map(scheme => (
                      <div key={scheme.id} className="clay-panel-flat p-5 border border-rose-900/30">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-bold text-white">{scheme.name}</h4>
                          <span className="text-[10px] font-bold text-zinc-300 px-3 py-1 rounded-full clay-badge-neutral uppercase tracking-wider">{scheme.provider}</span>
                        </div>
                        <div className="bg-rose-900/20 text-rose-300 text-xs font-semibold px-4 py-3 rounded-xl border border-rose-800/30 mb-4 shadow-inner">
                          {scheme.diagnosticNote}
                        </div>
                        <div className="flex flex-wrap gap-6 text-sm">
                          <div className="flex flex-col">
                            <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-1">Disbursement</span>
                            <span className="font-bold text-zinc-200">{scheme.benefit}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-1">Deadline</span>
                            <span className="font-bold text-zinc-200">{scheme.deadlineMonth}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Section 2: Verified Eligible */}
            <section className="clay-panel overflow-hidden">
              <div className="bg-[#080809]/40 border-b border-zinc-800/50 px-6 py-4 flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full clay-badge-success"></div>
                  Verified Eligible Status
                </h3>
              </div>
              <div className="p-6">
                {results.eligible.length === 0 ? (
                  <p className="text-sm text-zinc-500 font-medium text-center py-4">No standard eligible records matched.</p>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {results.eligible.map(scheme => (
                      <div key={scheme.id} className="clay-panel-flat p-5 border border-emerald-900/30 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1 block">{scheme.provider}</span>
                          <h4 className="text-base font-bold text-white mb-4">{scheme.name}</h4>
                        </div>
                        <div className="bg-[#080809] rounded-xl p-3 shadow-inner flex justify-between items-center border border-zinc-800/50">
                          <span className="text-xs font-bold text-zinc-500 tracking-widest">BENEFIT</span>
                          <span className="text-sm font-bold text-emerald-400">{scheme.benefit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Section 3: Partial Matches (Gap Analysis) */}
            <section className="clay-panel overflow-hidden mb-12">
              <div className="bg-[#080809]/40 border-b border-zinc-800/50 px-6 py-4 flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full clay-badge-neutral"></div>
                  Eligibility Deficit Report
                </h3>
              </div>
              <div className="p-6">
                {results.partial.length === 0 ? (
                   <p className="text-sm text-zinc-500 font-medium text-center py-4">No partial matches for deficit reporting.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.partial.map(scheme => (
                      <div key={scheme.id} className="clay-panel-flat p-5 border border-zinc-800/50">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-sm font-bold text-zinc-300 pr-4">{scheme.name}</h4>
                          <span className="flex-shrink-0 bg-zinc-800 text-zinc-400 text-[10px] font-bold px-2 py-1 rounded-md border border-zinc-700 uppercase">
                            Failed {scheme.missingCriteria.length} Rule(s)
                          </span>
                        </div>
                        
                        <div className="bg-[#080809] rounded-xl p-4 shadow-inner border border-zinc-800/50">
                          <div className="text-[10px] font-bold text-rose-400 mb-2 uppercase tracking-widest border-b border-zinc-800/80 pb-2">Failure Reason(s)</div>
                          <ul className="text-xs font-medium text-zinc-400 space-y-2 list-none m-0 p-0 mt-3">
                            {scheme.missingCriteria.map((reason, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-rose-500 font-bold mt-0.5">×</span>
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

          </div>
        )}

      </div>
    </div>
  );
}