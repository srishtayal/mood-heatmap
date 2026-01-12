// 'use client';

// import { useEffect, useState } from 'react';
// import { supabase } from '@/utils/supabase';

// export default function Home() {
//   const [userId, setUserId] = useState<string | null>(null);
//   const [status, setStatus] = useState<'idle' | 'saving' | 'done'>('idle');

//   // 1. On load: Check for existing User ID or create one
//   useEffect(() => {
//     let storedId = localStorage.getItem('mood_user_id');
//     if (!storedId) {
//       storedId = crypto.randomUUID();
//       localStorage.setItem('mood_user_id', storedId);
//     }
//     setUserId(storedId);
//   }, []);

//   // 2. Function to save mood
//   const logMood = async (score: number) => {
//     if (!userId) return;
//     setStatus('saving');

//     const { error } = await supabase
//       .from('mood_logs')
//       .insert({ user_id: userId, mood_score: score });

//     if (error) {
//       console.error(error);
//       alert('Error saving mood. Try again.');
//       setStatus('idle');
//     } else {
//       setStatus('done');
//     }
//   };

//   // 3. The UI
//   if (status === 'done') {
//     return (
//       <div className="h-screen w-full flex items-center justify-center bg-black text-white">
//         <h1 className="text-4xl">✅ Saved</h1>
//       </div>
//     );
//   }

//   return (
//     <main className="h-screen w-full flex flex-col bg-black">
//       {/* 5 Mood Buttons */}
//       {[
//         { score: 5, color: 'bg-green-500', label: '😄' },
//         { score: 4, color: 'bg-lime-500', label: '🙂' },
//         { score: 3, color: 'bg-yellow-500', label: '😐' },
//         { score: 2, color: 'bg-orange-500', label: '😞' },
//         { score: 1, color: 'bg-red-500', label: '😤' },
//       ].map((mood) => (
//         <button
//           key={mood.score}
//           onClick={() => logMood(mood.score)}
//           disabled={status === 'saving'}
//           className={`${mood.color} flex-1 flex items-center justify-center text-6xl transition active:scale-95`}
//         >
//           {mood.label}
//         </button>
//       ))}
//     </main>
//   );
// }

// app/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-6 text-center relative font-sans">
      
      {/* --- Main Content --- */}
      <div className="max-w-md space-y-8 animate-in fade-in duration-700">
        <h1 className="text-6xl font-bold tracking-tighter">See your year, at a glance.</h1>
        <p className="text-xl text-neutral-400">
          Log one mood a day. <br />
          Turn your daily mood into a living wallpaper. 
        </p>

        <div className="flex flex-col gap-4 pt-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-black text-lg font-semibold py-4 px-8 rounded-full hover:scale-105 transition-transform"
          >
            Install / Get Started
          </button>
          
        </div>
      </div>

      {/* --- Footer / Grid Decoration --- */}
      <div className="absolute bottom-10 opacity-20 flex gap-2">
         {/* Simple visual cue of the grid */}
         <div className="w-4 h-4 rounded-full bg-green-500"></div>
         <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
         <div className="w-4 h-4 rounded-full bg-red-500"></div>
         <div className="w-4 h-4 rounded-full bg-neutral-800"></div>
      </div>


      {/* --- Install Modal --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-2xl p-6 space-y-6 text-left shadow-2xl animate-in slide-in-from-bottom-10">
            
            <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
              <h2 className="text-2xl font-bold">Setup Guide</h2>
              <button onClick={() => setShowModal(false)} className="text-neutral-500 hover:text-white text-2xl">&times;</button>
            </div>

            <div className="space-y-6">
              {/* Step 1: PWA Install */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-green-400">1. Install the App</h3>
                <p className="text-neutral-300">
                  Tap the <span className="font-bold">Share</span> button (Safari) or <span className="font-bold">Menu</span> (Chrome) and select <span className="font-bold bg-neutral-800 px-2 py-1 rounded">Add to Home Screen</span>.
                </p>
                <p className="text-xs text-neutral-500">This adds the Mood Logger to your phone.</p>
              </div>

              {/* Step 2: Shortcut Setup */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-orange-400">2. Setup Wallpaper</h3>
                <p className="text-neutral-300">
                  You need an iOS Shortcut to update your wallpaper automatically.
                </p>
                <a 
                  href="#" // TODO: Add your actual iCloud Shortcut Link here
                  className="inline-block mt-2 text-blue-400 hover:underline"
                >
                  👉 Click here to download the Shortcut
                </a>
                <p className="text-xs text-neutral-500">
                  Configure the shortcut to run daily at midnight.
                </p>
              </div>
            </div>

            <button 
              onClick={() => setShowModal(false)} 
              className="w-full bg-neutral-800 py-3 rounded-xl font-medium mt-4 hover:bg-neutral-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}