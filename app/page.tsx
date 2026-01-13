'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LandingPage() {
  const [activeView, setActiveView] = useState<'year' | 'month' | null>(null);
  const [platform, setPlatform] = useState<'ios' | 'android' | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Initialize User ID
  useEffect(() => {
    let storedId = localStorage.getItem('mood_user_id');
    if (!storedId) {
      storedId = crypto.randomUUID();
      localStorage.setItem('mood_user_id', storedId);
    }
    setUserId(storedId);
  }, []);

  const closeModal = () => {
    setActiveView(null);
    setPlatform(null);
  };

  // Helper to get the correct URL
  const getWallpaperUrl = () => {
    const baseUrl = "https://mood-heatmap.netlify.app/api/wallpaper";
    return activeView === 'month'
      ? `${baseUrl}?view=month&user_id=${userId || 'YOUR_ID'}`
      : `${baseUrl}?user_id=${userId || 'YOUR_ID'}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getWallpaperUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen w-full bg-black text-white flex flex-col items-center p-6 font-sans selection:bg-neutral-800">
      
      {/* --- Header Section --- */}
      <div className="w-full max-w-4xl mt-16 md:mt-24 space-y-6 text-left md:text-center animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
          See your life, at a glance.
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl md:mx-auto leading-relaxed">
          Log one mood a day. <br className="hidden md:block" />
          Turn your wallpaper into a living visualization of your year.
        </p>
      </div>

      {/* --- Phone Showcase Grid --- */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 px-0 md:px-8">
        
        {/* --- Card 1: Yearly View --- */}
        <div className="relative group bg-[#111] border border-neutral-800 rounded-[2.5rem] p-8 flex justify-center overflow-hidden hover:border-neutral-700 transition-colors duration-500">
          <div className="relative w-full max-w-[320px] aspect-[9/19]">
            <Image 
              src="/year.png" 
              alt="Yearly View" 
              fill
              className="object-contain drop-shadow-2xl z-10"
              priority
            />
            <div className="absolute z-20 bottom-[10%] left-0 right-0 px-6 text-center flex flex-col items-center">
              <h3 className="text-3xl font-bold tracking-tight text-white mb-1">Yearly View</h3>
              <p className="text-xs text-neutral-400 font-medium mb-5 uppercase tracking-wide">
                Your entire year in pixels
              </p>
              <button 
                onClick={() => setActiveView('year')}
                className="bg-neutral-800/80 backdrop-blur-md border border-neutral-600/50 text-neutral-200 text-sm font-semibold py-2 px-8 rounded-full hover:bg-neutral-700 transition-all active:scale-95"
              >
                Install
              </button>
            </div>
          </div>
        </div>

        {/* --- Card 2: Monthly View --- */}
        <div className="relative group bg-[#111] border border-neutral-800 rounded-[2.5rem] p-8 flex justify-center overflow-hidden hover:border-neutral-700 transition-colors duration-500">
          <div className="relative w-full max-w-[320px] aspect-[9/19]">
            <Image 
              src="/month.png"
              alt="Monthly View" 
              fill
              className="object-contain drop-shadow-2xl z-10"
            />
            <div className="absolute z-20 bottom-[10%] left-0 right-0 px-6 text-center flex flex-col items-center">
              <h3 className="text-3xl font-bold tracking-tight text-white mb-1">Monthly View</h3>
              <p className="text-xs text-neutral-400 font-medium mb-5 uppercase tracking-wide">
                Focus on the now
              </p>
              <button 
                onClick={() => setActiveView('month')}
                className="bg-neutral-800/80 backdrop-blur-md border border-neutral-600/50 text-neutral-200 text-sm font-semibold py-2 px-8 rounded-full hover:bg-neutral-700 transition-all active:scale-95"
              >
                Install
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Footer Decoration --- */}
      <div className="mt-20 mb-10 flex gap-4 opacity-50">
         <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></div>
         <div className="w-2.5 h-2.5 rounded-full bg-[#F97316]"></div>
         <div className="w-2.5 h-2.5 rounded-full bg-[#EAB308]"></div>
         <div className="w-2.5 h-2.5 rounded-full bg-[#84CC16]"></div>
         <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></div>
      </div>

      {/* ========================================================= */}
      {/* DYNAMIC SETUP MODAL                                       */}
      {/* ========================================================= */}
      {activeView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          
          <div className="bg-neutral-900 border border-neutral-700 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 md:p-8 text-left shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-8 duration-300 scrollbar-hide">
            
            {/* --- Modal Header --- */}
            <div className="flex justify-between items-center mb-8 top-0 bg-neutral-900 z-10 py-2 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                {/* Back Button */}
                {platform && (
                  <button 
                    onClick={() => setPlatform(null)}
                    className="p-1 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                )}
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  {!platform ? 'Choose Your Device' : (platform === 'ios' ? 'iPhone Setup' : 'Android Setup')}
                </h2>
              </div>
              <button onClick={closeModal} className="p-2 text-neutral-500 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* ========================================================= */}
            {/* VIEW 1: PLATFORM SELECTOR                                 */}
            {/* ========================================================= */}
            {!platform && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                <button 
                  onClick={() => setPlatform('ios')}
                  className="group bg-black border border-neutral-800 hover:border-neutral-600 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:scale-[1.02]"
                >
                  <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.86-1.09 1.54-2.61 1.35-4.14-1.35.06-2.97.91-3.88 2.06-.78.96-1.45 2.52-1.27 4.04 1.5.12 3.03-.84 3.8-1.96" /></svg>
                  <div className="text-center">
                    <span className="block font-bold text-lg">iPhone</span>
                    <span className="text-neutral-500 text-sm">iOS Shortcuts</span>
                  </div>
                </button>

                <button 
                  onClick={() => setPlatform('android')}
                  className="group bg-black border border-neutral-800 hover:border-neutral-600 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:scale-[1.02]"
                >
                  <svg className="w-16 h-16 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.152-.5676.416.416 0 00-.5676.152l-2.0223 3.503C15.5902 8.4213 13.8533 8.0804 12 8.0804c-1.8557 0-3.5927.3409-5.1364.9692L4.8413 5.5466a.416.416 0 00-.5676-.152.4159.4159 0 00-.152.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" /></svg>
                  <div className="text-center">
                    <span className="block font-bold text-lg">Android</span>
                    <span className="text-neutral-500 text-sm">MacroDroid</span>
                  </div>
                </button>
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW 2: iPHONE INSTRUCTIONS                               */}
            {/* ========================================================= */}
            {platform === 'ios' && (
              <div className="space-y-10 pb-4 animate-in fade-in slide-in-from-right-8 duration-300">
                {/* 1) Install the App */}
                <div className="space-y-3">
                  <h3 className="text-white font-bold text-lg flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-800 text-xs border border-neutral-700">1</span>
                    Install the App
                  </h3>
                  <ul className="list-disc list-outside pl-10 space-y-2 text-neutral-400 text-sm leading-relaxed">
                    <li>Open this page in <b>Safari</b> or <b>Chrome</b>.</li>
                    <li>Tap the:
                      <div className="mt-1 ml-2 grid grid-cols-1 gap-1 text-xs text-neutral-500 font-mono">
                         <span> Safari: Share Icon (Bottom center)</span>
                         <span>G Chrome: Menu (Top right corner)</span>
                      </div>
                    </li>
                    <li>Scroll down and select <b>Add to Home Screen</b>.</li>
                    <li>Close your browser and open the new app icon.</li>
                  </ul>
                </div>

                {/* 2) Add Shortcut */}
                <div className="space-y-3">
                  <h3 className="text-white font-bold text-lg flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-800 text-xs border border-neutral-700">2</span>
                    Add Shortcut
                  </h3>
                  <div className="pl-10 space-y-3">
                    <p className="text-neutral-400 text-sm">Go to <b>Shortcuts</b> app and tap <b>+</b>.</p>
                    
                    <div className="bg-black border border-neutral-800 rounded-xl p-4 space-y-4 text-sm">
                      {/* Copy Link Section */}
                      <div className="bg-neutral-900 rounded-lg p-3 flex items-center justify-between gap-3 border border-neutral-800">
                         <span className="text-xs text-neutral-400 truncate font-mono flex-1">{getWallpaperUrl()}</span>
                         <button 
                           onClick={copyToClipboard}
                           className="bg-white text-black px-3 py-1.5 rounded-md text-xs font-bold hover:bg-neutral-200 transition"
                         >
                           {copied ? 'Copied!' : 'Copy'}
                         </button>
                      </div>

                      <div className="space-y-2 text-neutral-300">
                        <div className="grid grid-cols-[auto_1fr] gap-2">
                           <span className="text-neutral-500">•</span>
                           <span>Search <b>"URL"</b> action. Paste the link above.</span>
                        </div>
                        <div className="grid grid-cols-[auto_1fr] gap-2">
                           <span className="text-neutral-500">•</span>
                           <span>Search <b>"Get Contents of URL"</b> action (connects automatically).</span>
                        </div>
                        <div className="grid grid-cols-[auto_1fr] gap-2">
                           <span className="text-neutral-500">•</span>
                           <span>Search <b>"Set Wallpaper"</b> action.</span>
                        </div>
                        <div className="grid grid-cols-[auto_1fr] gap-2">
                           <span className="text-red-400 font-bold">⚠</span>
                           <span className="text-red-200">Tap arrow (&gt;) on "Image" & turn OFF "Show Preview".</span>
                        </div>
                        <div className="grid grid-cols-[auto_1fr] gap-2">
                           <span className="text-neutral-500">•</span>
                           <span>Tap Done and name it "Update Mood".</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3) Add Automation */}
                <div className="space-y-3">
                  <h3 className="text-white font-bold text-lg flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-800 text-xs border border-neutral-700">3</span>
                    Add Automation
                  </h3>
                  <ul className="list-disc list-outside pl-10 space-y-2 text-neutral-400 text-sm leading-relaxed">
                    <li>Go to <b>Automation</b> tab (bottom middle).</li>
                    <li>Tap New Automation (or +).</li>
                    <li>Select <b>Time of Day</b> &rarr; 00:00 (Midnight).</li>
                    <li>Select <b>Run Immediately</b> (Not "Run after confirmation").</li>
                    <li>Next &rarr; Select <b>Run Shortcut</b>.</li>
                    <li>Select your "Update Mood" shortcut.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW 3: ANDROID INSTRUCTIONS                              */}
            {/* ========================================================= */}
            {platform === 'android' && (
              <div className="space-y-10 pb-4 animate-in fade-in slide-in-from-right-8 duration-300">
                
                {/* 1) Install the App */}
                <div className="space-y-3">
                  <h3 className="text-white font-bold text-lg flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-800 text-xs border border-neutral-700">1</span>
                    Install the App
                  </h3>
                  <ul className="list-disc list-outside pl-10 space-y-2 text-neutral-400 text-sm leading-relaxed">
                    <li>Open this page in <b>Chrome</b>.</li>
                    <li>Tap the <b>Menu</b> (Top right corner).</li>
                    <li>Scroll down and select <b>Add to Home Screen</b>.</li>
                    <li>Close browser and open the new app icon.</li>
                  </ul>
                </div>

                {/* 2) MacroDroid Steps (Grouped) */}
                <div className="space-y-3">
                  <h3 className="text-white font-bold text-lg flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-800 text-xs border border-neutral-700">2</span>
                    Automate (MacroDroid)
                  </h3>
                  
                  <div className="pl-10 space-y-6 text-sm">
                    {/* Step 1 */}
                    <div>
                      <p className="text-white font-medium mb-1">Step 1: Get the App</p>
                      <p className="text-neutral-400">Download <b>MacroDroid</b> from the Play Store.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-black border border-neutral-800 rounded-xl p-4 space-y-4">
                      <p className="text-white font-medium border-b border-neutral-800 pb-2">Step 2: Create "Download" Task</p>
                      <ul className="space-y-2 text-neutral-400 font-mono text-xs">
                         <li>1. Tap <b>Add Macro</b> (+).</li>
                         <li>2. Actions (Blue) &rarr; Search <b>HTTP Request</b>.</li>
                         <li>3. Method: <b>GET</b>.</li>
                         <li className="flex flex-col gap-2 mt-2">
                           <span>4. URL: (Copy this link)</span>
                           <div className="bg-neutral-900 rounded p-2 flex items-center gap-2 border border-neutral-800">
                             <span className="truncate text-green-400 flex-1">{getWallpaperUrl()}</span>
                             <button onClick={copyToClipboard} className="text-white font-bold px-2 hover:bg-neutral-700 rounded">Copy</button>
                           </div>
                         </li>
                         <li>5. Tick: <b>Block next actions until complete</b>.</li>
                         <li>6. Tick: <b>Save HTTP response to file</b>.</li>
                         <li>7. Path: Select <b>Downloads</b> & type <code>/mood.png</code>.</li>
                      </ul>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-black border border-neutral-800 rounded-xl p-4 space-y-3">
                      <p className="text-white font-medium border-b border-neutral-800 pb-2">Step 3: Create "Set Wallpaper" Task</p>
                      <ul className="space-y-2 text-neutral-400 font-mono text-xs">
                         <li>1. Actions (Blue) &rarr; Tap <b>+</b> again.</li>
                         <li>2. Search <b>Set Wallpaper</b>.</li>
                         <li>3. Select Image &rarr; Downloads &rarr; <code>mood.png</code>.</li>
                         <li className="text-neutral-600 italic">(Run HTTP request once if file is missing).</li>
                      </ul>
                    </div>

                    {/* Step 4 & 5 */}
                    <div>
                      <p className="text-white font-medium mb-1">Step 4 & 5: Trigger & Save</p>
                      <ul className="list-disc list-inside text-neutral-400 space-y-1">
                        <li>Triggers (Red) &rarr; <b>Regular Interval</b> &rarr; Every 1 Hour.</li>
                        <li>Name macro "Mood Sync" and <b>Save</b>.</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Bottom Button */}
            {platform && (
              <button 
                onClick={closeModal}
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-neutral-200 transition-colors active:scale-[0.98] mt-4"
              >
                I've finished setup
              </button>
            )}

          </div>
        </div>
      )}

    </main>
  );
}