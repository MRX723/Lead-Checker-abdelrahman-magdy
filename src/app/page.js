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
    // Create a new image object in memory
    const img = new Image();

    // Set the event handlers on this new object
    img.onload = () => {
      console.log('Image preloaded successfully!');
      setIsImageLoaded(true);
    };
    img.onerror = () => {
      console.error('Failed to preload image.');
      // Show the page anyway, even if the image fails, to avoid a blank screen
      setIsImageLoaded(true); 
    };

    // Setting the src a..fter the handlers are attached triggers the download
    img.src = '/svgr.svg';

  }, []);
  
  const variants = { 
  
  initial:{z: 1, rotation: 0.02, marginTop: 0, paddingTop: 0, paddingBottom: 0, opacity: 0, scale: 0.7 },
  animate:{ 
    rotation: 0.02,
    z: 1, 
    marginTop: 30, 
    paddingTop: 14, 
    paddingBottom: 14, 
    opacity: 1, 
    scale: 1, willChange: 'contents'
  }, 
  exit:{
	z: 1,
    opacity: 0,
    y: -10,
    scale: 0.7,
    height: 0,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
    transition: { 
      type: "tween",
      duration: 0.1, 
      ease: "easeOut" 
    }
  }, 
  transition:{  
    type: "tween",
    duration: 0.2, 
    ease: "easeIn"  
  } };
  
  const blockInvalidKeys = (event) => {
    if (event.key === '-') {
      event.preventDefault();
    }
  };
  const showPage = (value) => {
	  setIsImageLoaded(true);
  };
  const handleMarketValueChange = (value) => {
	console.log(value)
	console.log(marketValue)
    if (value === marketValue) {
      return;
    }
 
    setMarketValue(value);
    setResult('');
  };
  
  const handleAskingPriceChange = (value) => {
    if (value === askingPrice) {
      return;
    }
 
    setAskingPrice(value);
    setResult('');
  };

  const handleCheck = () => {
    console.log("handlecheck was called")

    setTimeout( () => {
      const mv = marketValue;
      const asking = askingPrice;

      if (
        isNaN(mv) ||
        isNaN(asking) ||
        mv.trim() === '' ||
        asking.trim() === '' ||
        mv === '0' || mv < 0 || asking < 0
      ) {
        setResult('Invalid input ❌');
        setColor('black');
        return;
      }

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
       
		<motion.div initial={{y: 50}} animate={{z: 1, y: 0}} layout transition={{  type: "spring",
    stiffness: 50,
    damping: 5  }} className={`bg-[radial-gradient(at_right_top,_#CB1111,_#6A2794)] rounded-2xl shadow-2xl p-10 w-full max-w-lg transition-opacity duration-2000 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <motion.div layout className="flex flex-nowrap justify-center items-center gap-1 mb-10">
  
			  <img src="/svgr.svg" draggable="false" className="select-none sm:w-20 sm:h-20 w-15 h-15" />
			  
			  <h2 className="sm:text-3xl text-xl whitespace-nowrap font-extrabold font-raleway text-white">
				Lead Warmness Checker
			  </h2>

			</motion.div>
          
          <motion.form animate={{z: 1}} layout autoComplete="off" onSubmit={(e) => { e.preventDefault();   if (result) {
setResult()

setTimeout( () => { handleCheck(); setKey(prev => prev + 1);    }, 200)    

    console.log("delay"); // delay in ms (match your exit animation duration)
  } else {
    console.log("no delay");
    handleCheck();
  }; }}>
            <label htmlFor="marketValue" className="block text-white font-raleway text-lg font-semibold mb-2">
              Market Value
            </label>
            <CurrencyInput
              type="text"
              placeholder="e.g., 250000"
			  defaultValue={marketValue}
              value={marketValue}
			  disableAbbreviations = "true"
			  allowNegativeValue = {false}
			  prefix="$"
              onValueChange={ handleMarketValueChange}
			  onKeyDown= {blockInvalidKeys}
              className="text-lg text-black placeholder-gray-400 font-semibold font-raleway w-full bg-white p-3 mb-6 rounded-lg border-0 border-gray-300 focus:outline-none"
            />

            <label htmlFor="askingPrice" className="block text-lg text-white font-raleway font-semibold mb-2">
              Asking Price
            </label>

            <CurrencyInput
              type="text"
              placeholder="e.g., 180000"
			  defaultValue={askingPrice}
              value={askingPrice}
			  disableAbbreviations = "true"
			  allowNegativeValue = {false}
			  prefix="$"
              onValueChange ={ handleAskingPriceChange }
			  onKeyDown= {blockInvalidKeys}
              className="placeholder-gray-400 text-black text-lg font-semibold font-raleway w-full bg-white p-3 mb-9 rounded-lg border-0 border-gray-300 focus:outline-none"
            />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
			  animate={{ z: 1, paddingTop: 14 , paddingBottom: 14 }}
              transition={{duration: 0.3}}
              className="font-raleway text-lg hover:cursor-pointer w-full bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
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
    transition="transition"
	
  className="font-semibold rounded-lg bg-gray-50 text-center text-lg font-raleway"
  style={{ color: color }}
>
        <motion.p animate={{rotation: 0.02, z: 1, willChange: 'contents'}} >{result}</motion.p>
      </motion.div>
    )}
  </AnimatePresence>




        
		</motion.div>
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