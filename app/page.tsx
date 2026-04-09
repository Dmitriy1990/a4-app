'use client';

import { Tariffs, TimerComponent } from '@/components';

export default function Home() {
  return (
    <div className="sm:rounded-[60px] bg-foreground overflow-hidden pb-[50px] sm:pb-[100px]">
      <TimerComponent />
      <Tariffs />
    </div>
  );
}
