import { useState, useEffect } from 'react';
import { FaTshirt } from 'react-icons/fa';
import { 
  FiShoppingBag, 
  FiWatch,
  FiHeadphones,
  FiSmartphone,
  FiHome,
  FiCoffee,
  FiBook
} from 'react-icons/fi';

const Spinner = ({ 
  theme = 'light', 
  size = 'md', 
  message = 'Loading products...',
  boxCount = 4,
  animationSpeed = 'normal',
  productType = 'random' 
}) => {
  const [activeBox, setActiveBox] = useState(0);
  
  // Product icons mapping
  const productIcons = {
    clothing: <FaTshirt  />,
    electronics: <FiSmartphone />,
    jewelry: <FiWatch />,
    home: <FiHome />,
    groceries: <FiCoffee />,
    books: <FiBook />,
    accessories: <FiHeadphones />,
    default: <FiShoppingBag />
  };

  // Get icon based on productType or random
  const getProductIcon = (index) => {
    if (productType !== 'random') {
      return productIcons[productType] || productIcons.default;
    }
    
    const icons = Object.values(productIcons);
    return icons[index % icons.length];
  };

  // Animation speed variants
  const speedClasses = {
    slow: 'duration-500',
    normal: 'duration-300',
    fast: 'duration-200'
  };

  // Size variants
  const sizeClasses = {
    sm: {
      container: 'w-6 h-6',
      text: 'text-sm',
      gap: 'gap-2',
      progress: 'h-0.5',
      icon: 'text-xs'
    },
    md: {
      container: 'w-8 h-8',
      text: 'text-base',
      gap: 'gap-3',
      progress: 'h-[2px]',
      icon: 'text-sm'
    },
    lg: {
      container: 'w-10 h-10',
      text: 'text-lg',
      gap: 'gap-4',
      progress: 'h-1',
      icon: 'text-base'
    }
  };

  // Theme variants (unchanged)
  const themeClasses = {
    light: {
      box: 'bg-gray-200',
      active: 'bg-gradient-to-br from-blue-500 to-blue-600',
      text: 'text-gray-700',
      progress: 'bg-gradient-to-r from-blue-500 to-blue-600',
      icon: 'text-white'
    },
    dark: {
      box: 'bg-gray-700',
      active: 'bg-gradient-to-br from-blue-400 to-blue-500',
      text: 'text-gray-200',
      progress: 'bg-gradient-to-r from-blue-400 to-blue-500',
      icon: 'text-white'
    },
    premium: {
      box: 'bg-amber-100',
      active: 'bg-gradient-to-br from-amber-500 to-amber-600',
      text: 'text-amber-800',
      progress: 'bg-gradient-to-r from-amber-500 to-amber-600',
      icon: 'text-white'
    },
    luxury: {
      box: 'bg-gray-100',
      active: 'bg-gradient-to-br from-purple-500 to-pink-500',
      text: 'text-gray-800',
      progress: 'bg-gradient-to-r from-purple-500 to-pink-500',
      icon: 'text-white'
    }
  };

  // Animate boxes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBox(prev => (prev + 1) % boxCount);
    }, speedClasses[animationSpeed].replace('duration-', ''));
    return () => clearInterval(interval);
  }, [boxCount, animationSpeed]);

  return (
    <div className={`flex flex-col items-center justify-center ${sizeClasses[size].gap}`}>
      {/* Product box animation with icons */}
      <div className={`flex ${sizeClasses[size].gap}`}>
        {Array.from({ length: boxCount }).map((_, box) => (
          <div 
            key={box}
            className={`
              ${sizeClasses[size].container} 
              rounded-lg 
              transition-all 
              ${speedClasses[animationSpeed]}
              ${box === activeBox ? 
                `${themeClasses[theme].active} shadow-lg` : 
                `${themeClasses[theme].box} shadow-sm`
              }
              transform-gpu
              will-change-transform
              flex items-center justify-center
              relative
            `}
            style={{
              transform: box === activeBox ? 
                'perspective(100px) translateZ(5px) scale(1.1)' : 
                'perspective(100px) translateZ(0) scale(1)',
              opacity: box === activeBox ? 1 : 0.7,
              boxShadow: box === activeBox ? 
                '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 
                '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02)'
            }}
          >
            <span className={`${sizeClasses[size].icon} ${box === activeBox ? themeClasses[theme].icon : themeClasses[theme].text}`}>
              {getProductIcon(box)}
            </span>
          </div>
        ))}
      </div>
      
      {/* Loading text with product-themed animation */}
      <div className={`${themeClasses[theme].text} ${sizeClasses[size].text} font-medium relative w-full`}>
        <div className="flex flex-col items-center">
          <span className="inline-block min-w-[180px] text-center mb-1">
            {message}
          </span>
          <div className={`w-full ${sizeClasses[size].progress} bg-opacity-20 rounded-full overflow-hidden ${themeClasses[theme].box}`}>
            <div 
              className={`${sizeClasses[size].progress} rounded-full ${themeClasses[theme].progress} transition-all ${speedClasses[animationSpeed]}`}
              style={{ 
                width: `${((activeBox + 1) / boxCount) * 100}%`,
                backgroundSize: '200% 100%',
                animation: 'gradientShift 2s ease infinite'
              }}
            />
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Spinner;