import React, { useState } from 'react';

const Calc = () => {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');

  const op = ['%', '÷', 'x', '-', '+'];

  const updateDisplay = (value) => {
    if (value === '.' && display.includes('.')) return;
    setDisplay(display + value);
  }

  const createOperations = () => {
    return op.map((op) => (
      <button onClick={() => updateDisplay(op)} key={op} className="bg-[#FF9500] w-full h-full border-l-4 border-black text-2xl">{op}</button>
    ));
  }

  const createFunctions = () => {
    const functions = ['AC', 'C', '±'];
    return functions.map((fn) => (
      <button onClick={() => handleFunctions(fn)} key={fn} className="bg-[#333333] w-full h-full text-2xl border-r-2 border-black">{fn}</button>
    ));
  }

  const createNumbers = () => {
    const numbers = [];
    for (let i = 0; i < 10; i++) {
      numbers.push(
        <button onClick={() => updateDisplay(i)} key={i} className="bg-[#505050] w-full h-full text-2xl border-t-2 border-r-2 border-black">{i}</button>
      );
    }
    return numbers;
  }

  const handleFunctions = (fn) => {
    switch (fn) {
      case 'AC':
        setDisplay('');
        setResult('');
        break;
      case 'C':
        setDisplay(display.slice(0, -1));
        break;
      case '±':
        setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
        break;
      default:
        break;
    }
  }

  const handleEquals = () => {
    try {
      const calculation = display.replace(/÷/g, '/').replace(/x/g, '*').replace(/%/g, '/100');
      const res = eval(calculation);
      setResult(res.toString());
      setDisplay(res.toString());
    } catch (error) {
      setDisplay('Error', {error});
      setResult('');
    }
  }

  return (
    <div className='bg-black w-full h-screen flex justify-center items-center'>
      <div className='w-[50%] h-[80%] bg-[#505050] p-4 rounded-lg text-white flex flex-col'>
        <div className='w-full h-full flex flex-col border-4 border-black rounded-lg'>
          <div className='w-full h-20 bg-[#505050] rounded-t-lg flex justify-end items-center p-4 border-b-4 border-black text-2xl'>
            {result ? <span></span> : ''} 
            {display || 0}
          </div>
          <div className='flex flex-row w-full h-full'>
            <div className='grid grid-cols-3 grid-rows-5 w-[80%] h-full'>
              {createFunctions()}
              {createNumbers()}
              <button onClick={() => updateDisplay('.')} className="bg-[#505050] w-full h-full border-t-2 border-r-2 border-black">.</button>
              <button onClick={handleEquals} className="bg-[#FF9500] w-full h-full border-t-2 border-r-2 border-black">=</button>
            </div>
            <div className='flex flex-col w-[20%] h-full'>
              {createOperations()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calc;
