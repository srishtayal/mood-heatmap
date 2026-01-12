import { ImageResponse } from 'next/og';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');
  const view = searchParams.get('view') || 'year'; // Default to 'year'

  if (!userId) return new Response('Missing user_id', { status: 400 });

  // Setup Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonthIndex = now.getMonth(); // 0 = Jan, 1 = Feb...

  // --- 1. CONFIGURE VIEW SETTINGS ---
  let startDate: Date;
  let endDate: Date;
  let totalDays: number;
  let columns: number;
  let dotSize: number;
  let gapSize: number;
  let padding: string;
  let showLabel = false;
  let labelText = '';

  if (view === 'month') {
    // === MONTHLY VIEW ===
    startDate = new Date(currentYear, currentMonthIndex, 1);
    totalDays = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
    endDate = new Date(currentYear, currentMonthIndex + 1, 1);

    columns = 7;     // Calendar week style
    dotSize = 80;    // Much larger dots
    gapSize = 40;
    padding = '400px 40px 100px'; 
    
    showLabel = true;
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    labelText = `${monthNames[currentMonthIndex]}`;

  } else {
    // === YEARLY VIEW ===
    startDate = new Date(currentYear, 0, 1);
    endDate = new Date(currentYear + 1, 0, 1);
    
    // Leap year calculation
    const isLeap = (currentYear % 4 === 0 && currentYear % 100 !== 0) || (currentYear % 400 === 0);
    totalDays = isLeap ? 366 : 365;

    columns = 15;
    dotSize = 40;
    gapSize = 28;
    padding = '500px 40px 60px'; 
  }

  // --- 2. FETCH DATA ---
  const { data: logs } = await supabase
    .from('mood_logs')
    .select('log_date, mood_score')
    .eq('user_id', userId)
    .gte('log_date', startDate.toISOString())
    .lt('log_date', endDate.toISOString());

  // --- 3. BUILD MOOD MAP ---
  const moodMap: Record<number, number> = {};
  logs?.forEach((log) => {
    const logDate = new Date(log.log_date);
    const dayIndex = Math.floor((logDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    moodMap[dayIndex] = log.mood_score;
  });

  // Colors
  const colors: Record<number, string> = {
    1: '#EF4444', 2: '#F97316', 3: '#EAB308', 4: '#84CC16', 5: '#22C55E',
  };
  const emptyColor = '#474747ff'; 
  const filledButNoMood = '#FFFFFF'; 
  const bgColor = '#1a1a1aff'; 

  // --- 4. RENDER GRID ---
  const rows = Math.ceil(totalDays / columns);
  const gridRows = [];

  for (let row = 0; row < rows; row++) {
    const rowCells = [];
    for (let col = 0; col < columns; col++) {
      const dayIndex = row * columns + col + 1;
      
      if (dayIndex > totalDays) break;
      
      const score = moodMap[dayIndex];
      let color;
      
      if (score) {
        color = colors[score];
      } else {
        const cellDate = new Date(startDate);
        cellDate.setDate(startDate.getDate() + (dayIndex - 1));

        if (cellDate <= now) {
          color = filledButNoMood; 
        } else {
          color = emptyColor; 
        }
      }
      
      rowCells.push(
        <div
          key={`day-${dayIndex}`}
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
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
          gap: `${gapSize}px`,
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
          justifyContent: 'center', // Changed from space-between to center
          backgroundColor: bgColor,
          padding: padding,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: `${gapSize}px`,
            // flex: 1,  <-- Removed flex:1 so it doesn't stretch and push label down
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Render the Grid */}
          {gridRows}

          {/* Render the Label IMMEDIATELY after the grid */}
          {showLabel && (
            <div 
              style={{ 
                color: '#F97316', 
                fontSize: 60, 
                fontWeight: 'bold', 
                textTransform: 'uppercase',
                marginTop: '60px' // Add spacing between last row of dots and text
              }}
            >
              {labelText}
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1290,
      height: 2796,
    }
  );
}