"use client";
import { useState, useEffect, useRef  } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsWhatsapp } from 'react-icons/bs';
import CurrencyInput from 'react-currency-input-field';

export default function Home() {
  const [marketValue, setMarketValue] = useState();
  const [askingPrice, setAskingPrice] = useState();
  const [result, setResult] = useState('');
  const [color, setColor] = useState('');
  const [key, setKey] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const resultRef = useRef(null); 
  
  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsImageLoaded(true);
    img.onerror = () => setIsImageLoaded(true);
    img.src = '/svgr.svg';
  }, []);

  useEffect(() => {
    if (result && resultRef.current) {
      const timeout = setTimeout(() => {
        resultRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100); // Slightly more than animation duration

      return () => clearTimeout(timeout);
    }
  }, [result]);
  
  const containerVariants = {
    initial: { opacity: 0, scaleY: 0, y: -10 },
    animate: { z:1, opacity: 1, scaleY: 1, y: 0, marginTop: 30, transition: { type: "tween", duration: 0.3 }},
    exit: { opacity: 0, scaleY: 0, padding: 0, y: -10, height:0, marginTop: 0, transition: { type: "tween", duration: 0.2, ease: "easeOut" }}
  };
  
  const contentVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0.2, duration: 0.3 }},
    exit: { opacity: 0, transition: { duration: 0.1 }}
  };

  const blockInvalidKeys = (event) => {
    if (event.key === '-') event.preventDefault();
  };

  const handleMarketValueChange = (value) => {
	console.log(value)
	console.log(marketValue)
    if (value === marketValue) {return;}
    setMarketValue(value);
    setResult('');
  };

  const handleAskingPriceChange = (value) => {


    if (value === askingPrice) {return;}

    setAskingPrice(value);
    setResult('');

  };

  const handleCheck = () => {
    const mv = parseFloat(marketValue);
    const asking = parseFloat(askingPrice);

    if (isNaN(mv) || isNaN(asking) || mv <= 0 || asking < 0) {
      setResult('Invalid input ❌');
      setColor('black');
      return;
    }

    const percentage = (asking / mv) * 100;
    if (percentage <= 60) {
      setResult('This price is HOT and over-rules motivation 🥵');
      setColor('red');
    } else if (percentage <= 70) {
      setResult('This price is HOT 🔥');
      setColor('red');
    } else if (percentage <= 95) {
      setResult('This price is WARM 🌡️');
      setColor('#DE3163');
    } else if (percentage <= 115) {
      setResult('This price is COLD 🥶');
      setColor('blue');
    } else {
      setResult('This is not a lead 🤡');
      setColor('black');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isCoolingDown) return;

    if (result) {
      setResult('');
      setTimeout(() => {
        handleCheck();
        setKey(prev => prev + 1);
      }, 300);
    } else {
      handleCheck();
    }
   
    setIsCoolingDown(true);
    setTimeout(() => {
      setIsCoolingDown(false);
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(at_right_bottom,_#CA1111,_#692694)]">
      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div 
          initial={{ y: 50 }} 
          animate={{z:1, y: 0 }} 
          layout 
          transition={{ type: "tween", duration: 0.5 }} 
          className={`bg-[radial-gradient(at_right_top,_#CB1111,_#6A2794)] rounded-2xl shadow-2xl p-10 w-full max-w-lg transition-opacity duration-1000 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <motion.div layout className="flex flex-nowrap justify-center items-center gap-1 mb-10">
            <img src="/svgr.svg" draggable="false" className="select-none sm:w-20 sm:h-20 w-15 h-15" alt="Logo" />
            <h2 className="sm:text-3xl text-xl whitespace-nowrap font-extrabold font-raleway text-white">
              Lead Warmness Checker
            </h2>
          </motion.div>
          
         <motion.form layout autoComplete="off" onSubmit={handleSubmit}>
            <label htmlFor="marketValue" className="block text-white font-raleway text-lg font-semibold mb-2">
              Market Value
            </label>
            <CurrencyInput
              id="marketValue"
              placeholder="e.g., 250000"
              value={marketValue}
              disableAbbreviations={true}
              allowNegativeValue={false}
              prefix="$"
              onValueChange={handleMarketValueChange}
              onKeyDown={blockInvalidKeys}
              className="text-lg text-black placeholder-gray-400 font-semibold font-raleway w-full bg-white p-3 mb-6 rounded-lg border-0 focus:outline-none"
            />

            <label htmlFor="askingPrice" className="block text-lg text-white font-raleway font-semibold mb-2">
              Asking Price
            </label>
            <CurrencyInput
              id="askingPrice"
              placeholder="e.g., 180000"
              value={askingPrice}
              disableAbbreviations={true}
              allowNegativeValue={false}
              prefix="$"
              onValueChange={handleAskingPriceChange}
              onKeyDown={blockInvalidKeys}
              className="placeholder-gray-400 text-black text-lg font-semibold font-raleway w-full bg-white p-3 mb-9 rounded-lg border-0 focus:outline-none"
            />

            <motion.button
              type="submit"
              disabled={isCoolingDown}
              whileHover={isCoolingDown ? {} : { scale: 1.05 }}
              whileTap={isCoolingDown ? {} : { scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="font-raleway text-lg py-3.5 w-full bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg disabled:bg-blue-700"
            >
              {isCoolingDown ? 'Checking...' : 'Check'}
            </motion.button>
          </motion.form>
  
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={key}
				ref={resultRef}
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="font-semibold rounded-lg bg-gray-50 text-center text-lg font-raleway p-3.5"
                style={{ color: color, transformOrigin: 'bottom' }}
              >
                <motion.p
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                    {result}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      <footer className="w-full text-center p-5 text-white font-raleway text-sm shadow-md flex justify-center items-center gap-2">
        <span>Developed by <strong>Abdelrahman Magdy</strong></span>
        <a href="https://wa.me/201555911186" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-white hover:text-green-400 transition-colors duration-200">
          <BsWhatsapp />
        </a>
      </footer>
    </div>
  );
}
