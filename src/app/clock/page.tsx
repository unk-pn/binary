'use client'

import { useClock } from '@/hooks/useClock';
import Link from 'next/link';
import React from 'react'

const ClockPage = () => {
  const { hours, minutes, seconds } = useClock()
  return (
    <div>
      <div>Clock Page</div>
      <hr />
      <div>
        <Link href="/">Go to home page</Link>
      </div>
      <hr />
      <div>
        {hours}:{minutes}:{seconds}
      </div>
      <div>
        <div>{hours.toString(2)}</div>
        <div>{minutes.toString(2)}</div>
        <div>{seconds.toString(2)}</div>
      </div>
    </div>
  );
}

export default ClockPage;
