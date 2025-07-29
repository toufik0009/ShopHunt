import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function HomeBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const banners = [
    {
      title: "Summer Sale",
      subtitle: "Up to 50% Off",
      description: "Discover our new collection with exclusive discounts. Limited time offer!",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      mobileImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      bgGradient: "from-purple-600 to-blue-500",
      highlightColor: "text-yellow-300"
    },
    {
      title: "New Arrivals",
      subtitle: "Fresh Collection",
      description: "Explore the latest trends in fashion and accessories.",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      mobileImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      bgGradient: "from-indigo-600 to-pink-500",
      highlightColor: "text-pink-300"
    },
    {
      title: "Weekend Special",
      subtitle: "Extra 30% Off",
      description: "Weekend-only deals you won't want to miss!",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      mobileImage: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      bgGradient: "from-rose-600 to-amber-500",
      highlightColor: "text-amber-300"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative pt-16 md:pt-20 bg-gradient-to-r ${banners[currentSlide].bgGradient} overflow-hidden transition-all duration-1000`}>
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/40 bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 md:p-3 transition-all duration-300 shadow-lg"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/40 bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 md:p-3 transition-all duration-300 shadow-lg"
        aria-label="Next slide"
      >
        <FiChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>

      {/* Animated background pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 animate-pulse">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="white" />
          </pattern>
          <rect x="0" y="0" width="100" height="100" fill="url(#pattern)" />
        </svg>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-4 md:w-6' : 'bg-white bg-opacity-50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          {/* Mobile Image (shown on small screens) */}
          <div className="block lg:hidden mb-6 rounded-lg overflow-hidden shadow-lg">
            <img
              className="w-full h-48 object-cover"
              src={banners[currentSlide].mobileImage}
              alt={banners[currentSlide].title}
              loading="lazy"
            />
          </div>

          {/* Text content with sliding animation */}
          <div className="text-center lg:text-left overflow-hidden">
            <div className="relative h-48 sm:h-56 lg:h-72">
              {banners.map((banner, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                    <span className="block">{banner.title}</span>
                    <span className={`block ${banner.highlightColor} animate-bounce`}>{banner.subtitle}</span>
                  </h1>
                  <p className="mt-2 sm:mt-3 max-w-md mx-auto text-base sm:text-lg text-white md:mt-4 md:max-w-3xl">
                    {banner.description}
                  </p>
                  <div className="mt-6 sm:mt-8 flex flex-row sm:flex-row justify-center lg:justify-start space-y-3 sm:space-y-0 space-x-4 sm:space-x-4">
                    <div className="rounded-md shadow-lg transform hover:scale-105 transition-transform duration-300">
                      <Link
                        to="/products"
                        className="w-full flex items-center justify-center px-6 py-2 sm:px-8 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-purple-700 bg-white hover:bg-gray-50 md:py-3 md:text-lg md:px-10 transition duration-150"
                      >
                        Shop Now <FiArrowRight className="ml-1 sm:ml-2" />
                      </Link>
                    </div>
                    <div className="rounded-md shadow-lg transform hover:scale-105 transition-transform duration-300">
                      <Link
                        to="/products"
                        className="w-full flex items-center justify-center px-6 py-2 sm:px-8 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-black bg-opacity-20 hover:bg-opacity-30 md:py-3 md:text-lg md:px-10 transition duration-150"
                      >
                        View Deals
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Image (hidden on mobile) */}
          <div className="mt-4 lg:mt-0 hidden lg:block">
            <div className="relative h-80 lg:h-96">
              {banners.map((banner, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
                >
                  <div className="relative w-full h-full rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                    <img
                      className="w-full h-full object-cover rounded-2xl"
                      src={banner.image}
                      alt={banner.title}
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${banner.bgGradient} to-transparent opacity-40`}></div>
                    <div className="absolute -bottom-4 -right-4 md:-bottom-4 md:-right-4 bg-white rounded-full p-3 md:p-4 shadow-xl animate-pulse">
                      <span className="text-xl md:text-2xl font-bold text-gray-900">
                        {banner.subtitle.includes('50%') ? '50% OFF' : '30% OFF'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/4 -left-20 w-48 h-48 md:w-64 md:h-64 bg-white rounded-full filter blur-2xl md:blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-1/4 -right-20 w-48 h-48 md:w-64 md:h-64 bg-pink-300 rounded-full filter blur-2xl md:blur-3xl opacity-20 animate-float-delay"></div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(10px) rotate(-5deg); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delay { animation: float-delay 8s ease-in-out infinite 2s; }
      `}</style>
    </div>
  );
}