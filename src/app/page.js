"use client";
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsImageLoaded(true);
    img.onerror = () => setIsImageLoaded(true);
    img.src = '/svgr.svg';
  }, []);

  // --- REFINED VARIANTS FOR SMOOTH ANIMATION ---
  const variants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      y: -20, // Start slightly above its final position
      height: 0, // Keep height 0 initially to prevent layout jumps
      marginTop: 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0, // Animate to its natural position
      height: 'auto', // Let content determine height
      marginTop: 30, // Apply margin instantly
      transition: {
        // Use a spring for a more natural feel, or keep your tween
        type: "spring",
        stiffness: 300,
        damping: 25,
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -10, // Animate slightly up on exit
      height: 0, // Animate height to 0 for collapse effect
      marginTop: 0,
      transition: {
        type: "tween",
        duration: 0.15,
        ease: "easeOut"
      }
    }
  };
  
  const blockInvalidKeys = (event) => {
    if (event.key === '-') {
      event.preventDefault();
    }
  };

  const handleMarketValueChange = (value) => {
    setMarketValue(value);
    setResult('');
  };
  
  const handleAskingPriceChange = (value) => {
    setAskingPrice(value);
    setResult('');
  };

  const handleCheck = () => {
    // Adding a tiny delay to allow the state update to batch
    setTimeout(() => {
      // Use parsed values directly for calculation
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
    }, 10); // A very short delay can sometimes help
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (result) {
      setResult(''); // Trigger exit animation
      // Wait for exit animation to finish before re-checking
      setTimeout(() => {
        setKey(prev => prev + 1);
        handleCheck();
      }, 200); // Match your exit animation duration
    } else {
      handleCheck();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(at_right_bottom,_#CA1111,_#692694)]">
      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="font-raleway text-lg py-3.5 hover:cursor-pointer w-full bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
            >
              Check
            </motion.button>
          </motion.form>
  
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={key}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="font-semibold rounded-lg bg-gray-50 text-center text-lg font-raleway p-3.5 overflow-hidden" // Add overflow-hidden
                style={{ color: color }}
              >
                <p>{result}</p>
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
