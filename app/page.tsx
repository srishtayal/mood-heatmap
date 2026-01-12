// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';

// export default function LandingPage() {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <main className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-6 text-center relative font-sans">
      
//       {/* --- Main Content --- */}
//       <div className="max-w-md space-y-8 animate-in fade-in duration-700">
//         <h1 className="text-6xl font-bold tracking-tighter">See your year, at a glance.</h1>
//         <p className="text-xl text-neutral-400">
//           Log one mood a day. <br />
//           Turn your daily mood into a living wallpaper. 
//         </p>

//         <div className="flex flex-col gap-4 pt-4">
//           <button
//             onClick={() => setShowModal(true)}
//             className="bg-white text-black text-lg font-semibold py-4 px-8 rounded-full hover:scale-105 transition-transform"
//           >
//             Install / Get Started
//           </button>
          
//         </div>
//       </div>

//       {/* --- Footer / Grid Decoration --- */}
//       <div className="absolute bottom-10 opacity-20 flex gap-2">
//          {/* Simple visual cue of the grid */}
//          <div className="w-4 h-4 rounded-full bg-green-500"></div>
//          <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
//          <div className="w-4 h-4 rounded-full bg-red-500"></div>
//          <div className="w-4 h-4 rounded-full bg-neutral-800"></div>
//       </div>


//       {/* --- Install Modal --- */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4">
//           <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-2xl p-6 space-y-6 text-left shadow-2xl animate-in slide-in-from-bottom-10">
            
//             <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
//               <h2 className="text-2xl font-bold">Setup Guide</h2>
//               <button onClick={() => setShowModal(false)} className="text-neutral-500 hover:text-white text-2xl">&times;</button>
//             </div>

//             <div className="space-y-6">
//               {/* Step 1: PWA Install */}
//               <div className="space-y-2">
//                 <h3 className="text-lg font-semibold text-green-400">1. Install the App</h3>
//                 <p className="text-neutral-300">
//                   Tap the <span className="font-bold">Share</span> button (Safari) or <span className="font-bold">Menu</span> (Chrome) and select <span className="font-bold bg-neutral-800 px-2 py-1 rounded">Add to Home Screen</span>.
//                 </p>
//                 <p className="text-xs text-neutral-500">This adds the Mood Logger to your phone.</p>
//               </div>

//               {/* Step 2: Shortcut Setup */}
//               <div className="space-y-2">
//                 <h3 className="text-lg font-semibold text-orange-400">2. Setup Wallpaper</h3>
//                 <p className="text-neutral-300">
//                   You need an iOS Shortcut to update your wallpaper automatically.
//                 </p>
//                 <a 
//                   href="#" // TODO: Add your actual iCloud Shortcut Link here
//                   className="inline-block mt-2 text-blue-400 hover:underline"
//                 >
//                   👉 Click here to download the Shortcut
//                 </a>
//                 <p className="text-xs text-neutral-500">
//                   Configure the shortcut to run daily at midnight.
//                 </p>
//               </div>
//             </div>

//             <button 
//               onClick={() => setShowModal(false)} 
//               className="w-full bg-neutral-800 py-3 rounded-xl font-medium mt-4 hover:bg-neutral-700 transition-colors"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }

// app/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function LandingPage() {
  const [showModal, setShowModal] = useState(false);

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
                onClick={() => setShowModal(true)}
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
                onClick={() => setShowModal(true)}
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

      {/* --- Modal Implementation --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#1a1a1a] border border-neutral-800 w-full max-w-md rounded-3xl p-6 text-left shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold mb-4">Get Started</h2>
            <p className="text-neutral-400 text-sm mb-6">
              Add this page to your home screen to enable the widget features.
            </p>
            <button 
              onClick={() => setShowModal(false)}
              className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-neutral-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </main>
  );
}