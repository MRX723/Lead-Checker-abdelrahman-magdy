"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsWhatsapp } from 'react-icons/bs';
export default function Home() {
  const [marketValue, setMarketValue] = useState('');
  const [askingPrice, setAskingPrice] = useState('');
  const [result, setResult] = useState('');
  const [color, setColor] = useState('');
  const [key, setKey] = useState(0);

  const handleCheck = () => {
    setResult('');
    setKey(prev => prev + 1);

    setTimeout(() => {
      // Reverted to your original variable assignments
      const mv = marketValue;
      const asking = askingPrice;

      if (
        isNaN(mv) ||
        isNaN(asking) ||
        marketValue.trim() === '' ||
        askingPrice.trim() === '' ||
        mv === 0
      ) {
        setResult('Invalid input ❌');
        setColor('black');
        return;
      }
      // Kept your original lines here
	  parseFloat(mv);
	  parseFloat(asking);

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
    }, 50);
  };

  return (
    // The layout is changed to a flex column to accommodate the footer
    <div className="min-h-screen flex flex-col bg-[radial-gradient(at_right_bottom,_#CA1111,_#692694)]">

      {/* Main content area grows to push the footer down */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-[radial-gradient(at_right_top,_#CB1111,_#6A2794)] rounded-2xl shadow-2xl p-10 w-full max-w-lg">
          <div className="flex flex-nowrap justify-center items-center gap-1 mb-10">
  
			  <img src="/svgr.svg" draggable="false" className="select-none sm:w-20 sm:h-20 w-15 h-15"/>
			  
			  <h2 className="sm:text-3xl text-xl whitespace-nowrap font-extrabold font-raleway text-white">
				Lead Warmness Checker
			  </h2>

			</div>
          
          <form onSubmit={(e) => { e.preventDefault(); handleCheck(); }}>
            <label htmlFor="marketValue" className="block text-white font-raleway text-lg font-semibold mb-2">
              Market Value
            </label>
            <input
              type="text"
              placeholder="e.g., 250000"
              value={marketValue}
              onChange={e => setMarketValue(e.target.value)}
              className="text-lg placeholder-gray-400 font-semibold font-raleway w-full bg-white p-3 mb-6 rounded-lg border-0 border-gray-300 text-md focus:outline-none"
            />

            <label htmlFor="askingPrice" className="block text-lg text-white font-raleway font-semibold mb-2">
              Asking Price
            </label>
            <input
              type="text"
              placeholder="e.g., 180000"
              value={askingPrice}
              onChange={e => setAskingPrice(e.target.value)}
              className="placeholder-gray-400 text-lg font-semibold font-raleway w-full bg-white p-3 mb-9 rounded-lg border-0 border-gray-300 text-md focus:outline-none"
            />

            <motion.button
              onClick={handleCheck}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.90 }}
              transition={{type: "tween", duration: 0.11, ease: "easeOut"}}
              className="font-raleway text-lg hover:cursor-pointer w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
            >
              Check
            </motion.button>
          </form>
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.70 }}
                transition={{ duration: 0.2 }}
                className="mt-8 p-4 font-semibold rounded-lg bg-gray-50 text-center text-lg font-raleway"
                style={{color: color }}
              >
                {result}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* The new footer element */}
<footer className="w-full text-center p-5 text-white font-raleway text-sm shadow-md flex justify-center items-center gap-2">
  <span>
    Developed by <strong>Abdelrahman Magdy</strong>
  </span>
  <a
    href="https://wa.me/201555911186"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1 text-white hover:text-green-400 transition-colors duration-200"
  >
    <BsWhatsapp />
  </a>
</footer>

    </div>
  );
}
