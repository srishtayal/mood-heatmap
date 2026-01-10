import { ImageResponse } from 'next/og';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');

  if (!userId) return new Response('Missing user_id', { status: 400 });

  // Setup Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Get current year data
  const now = new Date();
  const year = now.getFullYear();
  const startOfYear = new Date(year, 0, 1).toISOString();
  const endOfYear = new Date(year + 1, 0, 1).toISOString();

  const { data: logs } = await supabase
    .from('mood_logs')
    .select('log_date, mood_score')
    .eq('user_id', userId)
    .gte('log_date', startOfYear)
    .lt('log_date', endOfYear);

  // Create map: day of year (1-365) -> mood score
  const moodMap: Record<number, number> = {};
  logs?.forEach((log) => {
    const logDate = new Date(log.log_date);
    const startOfYearDate = new Date(year, 0, 1);
    const dayOfYear = Math.floor((logDate.getTime() - startOfYearDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    moodMap[dayOfYear] = log.mood_score;
  });

  // Define Colors
  const colors: Record<number, string> = {
    1: '#EF4444', // Red
    2: '#F97316', // Orange
    3: '#EAB308', // Yellow
    4: '#84CC16', // Lime
    5: '#22C55E', // Green
  };
  const emptyColor = '#474747ff'; // Gray
  const filledButNoMood = '#FFFFFF'; // White for days that exist but no mood
  const bgColor = '#1a1a1aff'; // Dark gray background

  // Layout: 15 columns, ~24 rows for 365 days
  const columns = 15;
  const totalDays = 365;
  const rows = Math.ceil(totalDays / columns);
  
  // Calculate filled days and percentage
  const filledDays = Object.keys(moodMap).length;
  const daysLeft = totalDays - filledDays;
  const percentageFilled = Math.round((filledDays / totalDays) * 100);
  
  const gridRows = [];
  
  for (let row = 0; row < rows; row++) {
    const rowCells = [];
    
    for (let col = 0; col < columns; col++) {
      const dayOfYear = row * columns + col + 1;
      
      if (dayOfYear > totalDays) {
        // Don't render anything beyond 365 days
        break;
      }
      
      const score = moodMap[dayOfYear];
      let color;
      
      if (score) {
        color = colors[score];
      } else {
        // Check if this day has passed
        const dayDate = new Date(year, 0, dayOfYear);
        if (dayDate <= now) {
          color = filledButNoMood; // Day passed but no mood logged
        } else {
          color = emptyColor; // Future day
        }
      }
      
      rowCells.push(
        <div
          key={`day-${dayOfYear}`}
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: color,
            borderRadius: '50%',
            flexShrink: 0,
          }}
        />
      );
    }
    
    gridRows.push(
      <div
        key={`row-${row}`}
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '28px',
          justifyContent: 'center',
        }}
      >
        {rowCells}
      </div>
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: bgColor,
          padding: '500px 40px 60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {gridRows}
        </div>

        <div
          style={{
            display: 'flex',
            color: '#F97316',
            fontSize: 48,
            marginTop: 60,
          }}
        >
          {/* {daysLeft}d left · {percentageFilled}% */}
        </div>
      </div>
    ),
    {
      width: 1290,
      height: 2796,
    }
  );
}