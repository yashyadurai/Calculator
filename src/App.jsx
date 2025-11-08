import { useState, useEffect } from 'react';
export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleNumber(parseInt(e.key));
      } else if (e.key === '.') {
        handleDecimal();
      } else if (e.key === '+') {
        handleOperator('+');
      } else if (e.key === '-') {
        handleOperator('-');
      } else if (e.key === '*') {
        handleOperator('x');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOperator('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        handleClear();
      } else if (e.key === 'Backspace') {
        if (display.length > 1) {
          setDisplay(display.slice(0, -1));
        } else {
          setDisplay('0');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display, prevValue, operation, newNumber]);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(String(num));
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleOperator = (op) => {
    const current = parseFloat(display);
    
    if (prevValue === null) {
      setPrevValue(current);
    } else if (operation) {
      const result = calculate(prevValue, current, operation);
      setDisplay(String(result));
      setPrevValue(result);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a, b, op) => {
    let result;
    switch(op) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case 'x': result = a * b; break;
      case '÷': result = b !== 0 ? a / b : 0; break;
      default: result = b;
    }
    return Math.round(result * 1e10) / 1e10;
  };

  const handleEquals = () => {
    if (operation && prevValue !== null) {
      const result = calculate(prevValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPrevValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const Button = ({ value, onClick, className = '', isOperator = false, isEquals = false }) => (
    <button
      onClick={onClick}
      className={`h-16 text-xl font-semibold rounded-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20 shadow-lg cursor-pointer ${
        isEquals 
          ? 'h-36 bg-linear-to-br from-emerald-400/30 to-teal-500/30 text-black hover:from-emerald-400/40 hover:to-teal-500/40' 
          : isOperator
          ? 'bg-white/10 text-red-600 hover:bg-white/20'
          : 'bg-white/5 text-black hover:bg-white/10'
      } ${className}`}
    >
      {value}
    </button>
  );

  return (

    <div className={`min-h-screen divMain flex items-center justify-center p-4 relative overflow-hidden flex-wrap`} id='calculator'>
      <div className="relative backdrop-blur-2xl bg-white/10 p-8 rounded-3xl shadow-2xl/50 w-full max-w-md border border-white/20 brightness-110">
        {/* Display */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 mb-6 border border-white/10 shadow-2xl/20">
          <div className="text-sm text-black/50 mb-2 font-light">
            {prevValue !== null && operation ? `${prevValue} ${operation}` : ''}
          </div>
          <div className="text-right text-5xl font-bold text-black break-all">
            {display}
          </div>
          <div className="text-right text-xs text-black/40 mt-3 font-light">
            Keyboard: 0-9, +, -, *, /, Enter, Esc
          </div>
        </div>
        
        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          <Button value="C" onClick={handleClear} className="col-span-2 bg-linear-to-br from-red-400/30 to-pink-500/30 text-black hover:from-red-400/40 hover:to-pink-500/40" />
          <Button value="÷" onClick={() => handleOperator('÷')} isOperator />
          <Button value="x" onClick={() => handleOperator('x')} isOperator />
          
          <Button value="7" onClick={() => handleNumber(7)} />
          <Button value="8" onClick={() => handleNumber(8)} />
          <Button value="9" onClick={() => handleNumber(9)} />
          <Button value="-" onClick={() => handleOperator('-')} isOperator />
          
          <Button value="4" onClick={() => handleNumber(4)} />
          <Button value="5" onClick={() => handleNumber(5)} />
          <Button value="6" onClick={() => handleNumber(6)} />
          <Button value="+" onClick={() => handleOperator('+')} isOperator />
          
          <Button value="1" onClick={() => handleNumber(1)} />
          <Button value="2" onClick={() => handleNumber(2)} />
          <Button value="3" onClick={() => handleNumber(3)} />
          <Button value="=" onClick={handleEquals} isEquals className="row-span-2" />
          
          <Button value="0" onClick={() => handleNumber(0)} className="col-span-2" />
          <Button value="." onClick={handleDecimal} />
        </div>
      </div>
    </div>
  );
}