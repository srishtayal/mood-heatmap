'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function LandingPage() {
  const [activeView, setActiveView] = useState<'year' | 'month' | null>(null);

  const closeModal = () => setActiveView(null);

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
          
          {/* Phone Container */}
          <div className="relative w-full max-w-[320px] aspect-[9/19]">
            {/* The Phone Image (Frame + Wallpaper Pixels Only) */}
            <Image 
              src="/year.png"  // Make sure this image is in your public folder
              alt="Yearly View" 
              fill
              className="object-contain drop-shadow-2xl z-10"
              priority
            />

            {/* OVERLAY: Text & Button sits on top of the phone screen */}
            <div className="absolute z-20 bottom-[10%] left-0 right-0 px-6 text-center flex flex-col items-center">
              <h3 className="text-3xl font-bold tracking-tight text-white mb-1">Yearly View</h3>
              <p className="text-xs text-neutral-400 font-medium mb-5 uppercase tracking-wide">
                Your entire year in pixels
              </p>
              
              {/* Install Button (iOS Style) */}
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
          
          {/* Phone Container */}
          <div className="relative w-full max-w-[320px] aspect-[9/19]">
            {/* The Phone Image */}
            <Image 
              src="/month.png" // Make sure this image is in your public folder
              alt="Monthly View" 
              fill
              className="object-contain drop-shadow-2xl z-10"
            />

            {/* OVERLAY: Text & Button */}
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
         <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E ]"></div>
      </div>

      {/* 1: '#EF4444', 2: '#F97316', 3: '#EAB308', 4: '#84CC16', 5: '#22C55E' */}

      {/* --- Detailed Setup Modal --- */}
      {activeView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          
          {/* Modal Container: Solid bg-neutral-900 to fix transparency weirdness */}
          <div className="bg-neutral-900 border border-neutral-700 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 md:p-8 text-left shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-8 duration-300 scrollbar-hide">
            
            {/* Sticky Header: Matches bg-neutral-900 exactly */}
            <div className="flex justify-between items-center mb-6 top-0 bg-neutral-900 z-10 py-2 border-b border-neutral-800">
              <h2 className="text-2xl font-bold tracking-tight">
                Setup: <span className="text-neutral-400">{activeView === 'year' ? 'Yearly View' : 'Monthly View'}</span>
              </h2>
              <button onClick={closeModal} className="p-2 text-neutral-500 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="space-y-10 pb-4">
              
              {/* Phase 1 */}
              <div className="space-y-3">
                <h3 className="text-white font-bold text-lg flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-800 text-xs border border-neutral-700">1</span>
                  Install the App
                </h3>
                <ul className="list-disc list-outside pl-10 space-y-2 text-neutral-400 text-sm leading-relaxed">
                  <li>Open this page in <span className="text-white font-medium">Safari</span> on your iPhone.</li>
                  <li>Tap the <span className="text-white font-medium">Share Icon</span> (box with arrow) → Select <span className="text-white font-medium">Add to Home Screen</span>.</li>
                  <li>Close Safari and open the new app icon from your home screen.</li>
                  <li className="text-neutral-500 italic">You should see the colored mood buttons, not this page.</li>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="space-y-3">
                <h3 className="text-white font-bold text-lg flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-800 text-xs border border-neutral-700">2</span>
                  Get Your User ID
                </h3>
                <ul className="list-disc list-outside pl-10 space-y-2 text-neutral-400 text-sm leading-relaxed">
                  <li>Inside the app, tap the faint text in the <span className="text-white font-medium">bottom right corner</span>.</li>
                  <li>It will say "Copied!".</li>
                  <li>Paste this somewhere safe (like Notes) for a moment.</li>
                </ul>
              </div>

              {/* Phase 3 */}
              <div className="space-y-3">
                <h3 className="text-white font-bold text-lg flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-800 text-xs border border-neutral-700">3</span>
                  Create the Shortcut
                </h3>
                <div className="pl-10 space-y-4 text-neutral-400 text-sm leading-relaxed">
                  <p>Open the <span className="text-white font-medium">Shortcuts App</span> and tap <span className="text-white font-medium">+</span> to create new.</p>
                  
                  <div className="bg-black border border-neutral-800 rounded-xl p-4 space-y-3">
                    <div className="grid grid-cols-[20px_1fr] gap-2">
                      <span className="text-neutral-500">1.</span>
                      <span>Add action <b>"URL"</b>. Paste this link:<br/>
                        <code className="block mt-2 bg-neutral-900 p-3 rounded text-xs text-green-400 break-all select-all border border-neutral-800">
                          {activeView === 'month' 
                            ? 'https://mood-heatmap.netlify.app/api/wallpaper?view=month&user_id=' 
                            : 'https://mood-heatmap.netlify.app//api/wallpaper?user_id='
                          }
                        </code>
                        <span className="text-xs text-neutral-500 block mt-1">Add your Copied ID to the very end of this link.</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-[20px_1fr] gap-2">
                      <span className="text-neutral-500">2.</span>
                      <span>Add action <b>"Get Contents of URL"</b>.</span>
                    </div>
                    <div className="grid grid-cols-[20px_1fr] gap-2">
                      <span className="text-neutral-500">3.</span>
                      <span>Add action <b>"Set Wallpaper"</b>.</span>
                    </div>
                    <div className="grid grid-cols-[20px_1fr] gap-2">
                      <span className="text-neutral-500">⚠</span>
                      <span>Tap the arrow next to Image and turn <b>OFF "Show Preview"</b>.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 4 */}
              <div className="space-y-3">
                <h3 className="text-white font-bold text-lg flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-800 text-xs border border-neutral-700">4</span>
                  Automate It
                </h3>
                <ul className="list-disc list-outside pl-10 space-y-2 text-neutral-400 text-sm leading-relaxed">
                  <li>Go to <b>Automation</b> tab → New Automation.</li>
                  <li>Select <b>Time of Day</b> (e.g., Midnight).</li>
                  <li>Select <b>Run Immediately</b> (Important!).</li>
                  <li>Action: <b>Run Shortcut</b> → Select your new shortcut.</li>
                </ul>
              </div>

            </div>

            <button 
              onClick={closeModal}
              className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-neutral-200 transition-colors"
            >
              I've finished setup
            </button>
          </div>
        </div>
      )}

    </main>
  );
}