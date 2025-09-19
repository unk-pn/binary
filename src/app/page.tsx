'use client'

import { RadioCircle } from '@/components/RadioCircle/RadioCircle'
import React, { useState } from 'react'
import c from './page.module.css'

const HomePage = () => {
  const n: number = 5;
  type arrType = 1 | 0;
  const [arr, setArr] = useState<arrType[]>(Array(n).fill(0));
  
  const handleClick = (n: number) => {
    setArr(arr => {
      const newArr = [...arr];
      newArr[n] = newArr[n] === 1 ? 0 : 1;
      return newArr;
    })
  }

  const binary = arr.reduce((acc, cur) => acc + cur, '');
  const decimal = parseInt(binary, 2)

  return (
    <div>
      <div>Home Page</div>
      <hr />

      <div className={c.binary}>
        {arr.map((n, index) => (
          <RadioCircle
            key={index}
            index={index}
            onClick={handleClick}
            selected={arr[index]}
          />
        ))}
      </div>
      <div>binary: {binary}</div>
      <div>decimal: {decimal}</div>
    </div>
  );
}

export default HomePage