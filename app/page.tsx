'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'saving' | 'done'>('idle');

  // 1. On load: Check for existing User ID or create one
  useEffect(() => {
    let storedId = localStorage.getItem('mood_user_id');
    if (!storedId) {
      storedId = crypto.randomUUID();
      localStorage.setItem('mood_user_id', storedId);
    }
    setUserId(storedId);
  }, []);

  // 2. Function to save mood
  const logMood = async (score: number) => {
    if (!userId) return;
    setStatus('saving');

    const { error } = await supabase
      .from('mood_logs')
      .insert({ user_id: userId, mood_score: score });

    if (error) {
      console.error(error);
      alert('Error saving mood. Try again.');
      setStatus('idle');
    } else {
      setStatus('done');
    }
  };

  // 3. The UI
  if (status === 'done') {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-white">
        <h1 className="text-4xl">✅ Saved</h1>
      </div>
    );
  }

  return (
    <main className="h-screen w-full flex flex-col bg-black">
      {/* 5 Mood Buttons */}
      {[
        { score: 5, color: 'bg-green-500', label: '😄' },
        { score: 4, color: 'bg-lime-500', label: '🙂' },
        { score: 3, color: 'bg-yellow-500', label: '😐' },
        { score: 2, color: 'bg-orange-500', label: '😞' },
        { score: 1, color: 'bg-red-500', label: '😤' },
      ].map((mood) => (
        <button
          key={mood.score}
          onClick={() => logMood(mood.score)}
          disabled={status === 'saving'}
          className={`${mood.color} flex-1 flex items-center justify-center text-6xl transition active:scale-95`}
        >
          {mood.label}
        </button>
      ))}
    </main>
  );
}