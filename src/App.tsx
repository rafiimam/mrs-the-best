import { useState } from 'react';

interface Heart {
  id: number;
  left: number;
  delay: number;
  duration: number;
}

export default function App() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [answer, setAnswer] = useState<string | null>(null);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [noButtonText, setNoButtonText] = useState("No");
  const [noButtonSize, setNoButtonSize] = useState(1);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [hoverCount, setHoverCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const funnyMessages = [
    "Are you sure? 🥺",
    "Really? 😢",
    "But why though? 💔",
    "Please reconsider! 🙏",
    "You're breaking my heart! 😭",
    "Think about it! 🤔",
    "Don't be mean! 😤",
    "Last chance! ⚠️",
    "I'll cry! 😿",
    "PLEASE?! 🥹"
  ];

  const moveNoButton = () => {
    // Simple approach: keep button within a smaller range
    const maxMove = 150; // Maximum pixels to move in any direction
    
    const randomX = (Math.random() - 0.5) * maxMove;
    const randomY = (Math.random() - 0.5) * maxMove;
    
    setNoButtonPosition({ x: randomX, y: randomY });
    
    setNoButtonSize(prev => Math.max(prev - 0.1, 0.3));
    setYesButtonSize(prev => Math.min(prev + 0.15, 2.5));
    
    const newCount = hoverCount + 1;
    setHoverCount(newCount);
    if (newCount < funnyMessages.length) {
      setNoButtonText(funnyMessages[newCount]);
    }
  };

  const handleYes = () => {
    setAnswer('yes');
    setShowConfetti(true);
    const newHearts: Heart[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: 50 + (Math.random() - 0.5) * 40,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
    }));
    setHearts(newHearts);
  };

  const getFace = () => {
    if (answer === 'yes') {
      return (
        <div className="relative">
          <div className="w-64 h-64 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full relative mx-auto mb-8 animate-wiggle shadow-2xl">
            <div className="absolute top-24 left-8 w-12 h-10 bg-rose-500 rounded-full opacity-70 animate-pulse"></div>
            <div className="absolute top-24 right-8 w-12 h-10 bg-rose-500 rounded-full opacity-70 animate-pulse"></div>
            
            <div className="absolute top-20 left-16">
              <div className="relative">
                <svg className="w-12 h-12 text-red-600 animate-heartbeat" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
              </div>
            </div>
            <div className="absolute top-20 right-16">
              <div className="relative">
                <svg className="w-12 h-12 text-red-600 animate-heartbeat" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
              </div>
            </div>
            
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="w-28 h-14 border-8 border-gray-900 rounded-b-full border-t-0 bg-white"></div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-red-400 rounded-full"></div>
            </div>
          </div>
        </div>
      );
    } else if (hoverCount > 5) {
      return (
        <div className="relative">
          <div className="w-64 h-64 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full relative mx-auto mb-8 animate-wobble">
            <div className="absolute top-32 left-12 w-3 h-8 bg-blue-400 rounded-full animate-drip"></div>
            <div className="absolute top-32 right-12 w-3 h-8 bg-blue-400 rounded-full animate-drip" style={{ animationDelay: '0.3s' }}></div>
            
            <div className="absolute top-20 left-14 w-10 h-12 bg-gray-900 rounded-full">
              <div className="absolute top-2 left-2 w-4 h-4 bg-white rounded-full"></div>
            </div>
            <div className="absolute top-20 right-14 w-10 h-12 bg-gray-900 rounded-full">
              <div className="absolute top-2 left-2 w-4 h-4 bg-white rounded-full"></div>
            </div>
            
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-tremble">
              <div className="w-20 h-10 border-6 border-gray-900 rounded-t-full border-b-0"></div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative">
          <div className="w-64 h-64 bg-gradient-to-br from-rose-300 to-pink-300 rounded-full relative mx-auto mb-8 animate-float-gentle shadow-xl">
            <div className="absolute top-24 left-8 w-10 h-8 bg-rose-400 rounded-full opacity-60"></div>
            <div className="absolute top-24 right-8 w-10 h-8 bg-rose-400 rounded-full opacity-60"></div>
            
            <div className="absolute top-20 left-16 w-8 h-10 bg-gray-900 rounded-full">
              <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full"></div>
              <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-twinkle"></div>
            </div>
            <div className="absolute top-20 right-16 w-8 h-10 bg-gray-900 rounded-full">
              <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full"></div>
              <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-twinkle"></div>
            </div>
            
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
              <div className="w-20 h-8 border-4 border-gray-900 rounded-b-full border-t-0"></div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-500 flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-bg"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 8}s`,
            }}
          >
            <svg className="w-10 h-10 text-red-300 opacity-40" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
        ))}
      </div>

      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `50%`,
                top: `50%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#ff6b9d', '#c44569', '#f8b500', '#ffa801', '#ff4757'][Math.floor(Math.random() * 5)],
                  transform: `rotate(${Math.random() * 360}deg) translateX(${Math.random() * 300 - 150}px) translateY(${Math.random() * 300 - 150}px)`,
                }}
              ></div>
            </div>
          ))}
        </div>
      )}

      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-heart-burst pointer-events-none"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <svg className="w-16 h-16 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
      ))}

      <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-[3rem] shadow-2xl p-12 max-w-3xl w-full mx-4 relative z-10 border-8 border-rose-200">
        {getFace()}

        {!answer ? (
          <>
            <h1 className="text-6xl font-black text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 animate-pulse drop-shadow-lg leading-tight">
              Will You Be My Valentine? 💖
            </h1>
            
            <p className="text-2xl text-center text-gray-700 mb-12 font-bold italic">
              {hoverCount > 3 ? "Come on, you know you want to! 🥺" : "Pretty please with a cherry on top! 🍒"}
            </p>

            <div className="flex gap-8 justify-center items-center mt-12 flex-wrap">
              <button
                onClick={handleYes}
                style={{
                  transform: `scale(${yesButtonSize})`,
                }}
                className="bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white px-16 py-6 rounded-full text-3xl font-black hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-pink-500/50 hover:rotate-3 border-4 border-white animate-bounce-subtle"
              >
                YES! 💕✨
              </button>

              <button
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                onClick={(e) => {
                  e.preventDefault();
                  moveNoButton();
                }}
                style={{
                  transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px) scale(${noButtonSize})`,
                  transition: 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                  opacity: noButtonSize < 0.4 ? 0.3 : 1,
                }}
                className="bg-gray-400 text-white px-12 py-5 rounded-full text-2xl font-bold relative hover:cursor-not-allowed shadow-lg"
              >
                {noButtonText}
              </button>
            </div>

            <p className="text-center mt-10 text-gray-600 text-lg font-semibold italic">
              {hoverCount === 0 && "💡 Hint: There's only ONE correct answer here!"}
              {hoverCount > 0 && hoverCount <= 3 && "😏 Nice try, but I'm not giving up that easy!"}
              {hoverCount > 3 && hoverCount <= 6 && "😂 You can run but you can't hide from love!"}
              {hoverCount > 6 && "😭 Please... I'm running out of screen space!"}
            </p>
          </>
        ) : (
          <div className="text-center animate-scale-in">
            <h2 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 mb-6 animate-bounce">
              YAAAAY!!! 🎉🎊
            </h2>
            <p className="text-4xl text-rose-600 mb-6 font-black">
              I KNEW IT! 💖
            </p>
            <p className="text-2xl text-gray-700 mb-4 font-bold">
              You just made me the HAPPIEST person alive! 🥰
            </p>
            <p className="text-xl text-gray-600 italic"> </p>
              Get ready for the BEST Valentine's Day ever! 
              <p className="text-xl text-gray-600 italic">Rafi🌹✨💝 Mahima</p>
            <div className="mt-8 text-6xl animate-spin-slow">
              💘
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float-bg {
          0%, 100% { transform: translateY(100vh) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
        @keyframes heart-burst {
          0% { transform: translateY(0) scale(0) rotate(0deg); opacity: 1; }
          50% { transform: translateY(-50vh) scale(1.5) rotate(180deg); opacity: 0.8; }
          100% { transform: translateY(-100vh) scale(0.5) rotate(360deg); opacity: 0; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.5) rotate(-10deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1); }
          75% { transform: scale(1.3); }
        }
        @keyframes wobble {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-10px) rotate(-5deg); }
          75% { transform: translateX(10px) rotate(5deg); }
        }
        @keyframes drip {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(30px); opacity: 0; }
        }
        @keyframes tremble {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-2px); }
          50% { transform: translateY(0); }
          75% { transform: translateY(-2px); }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0) scale(var(--scale, 1)); }
          50% { transform: translateY(-5px) scale(var(--scale, 1)); }
        }
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float-bg { animation: float-bg linear infinite; }
        .animate-heart-burst { animation: heart-burst ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-wiggle { animation: wiggle 0.5s ease-in-out infinite; }
        .animate-heartbeat { animation: heartbeat 1s ease-in-out infinite; }
        .animate-wobble { animation: wobble 2s ease-in-out infinite; }
        .animate-drip { animation: drip 2s ease-in-out infinite; }
        .animate-tremble { animation: tremble 0.3s ease-in-out infinite; }
        .animate-float-gentle { animation: float-gentle 3s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 1.5s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .animate-confetti { animation: confetti linear forwards; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
      `}</style>
    </div>
  );
}