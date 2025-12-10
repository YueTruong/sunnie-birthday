import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Sun } from 'lucide-react';

const SunnieBirthday = () => {
  const [balloons] = useState(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 8 + Math.random() * 4
    }))
  );

  const [sunflowers] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 10 + Math.random() * 10
    }))
  );

  const [confetti] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 3 + Math.random() * 3,
      delay: Math.random(),
      fontSize: 20 + Math.random() * 20,
      emoji: ['🎉', '🎊', '🌻', '💕', '🎂', '🍉', '🌸'][Math.floor(Math.random() * 7)]
    }))
  );

  const [showConfetti, setShowConfetti] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImage, setCurrentImage] = useState({ url: '', title: '' });

  const sections = [
    {
      title: "Happy Birthday Sunnie! 🌻",
      content: "Chúc mừng sinh nhật công túa Sunnie! Chúc công túa tuổi mới vui vẻ, xinh đẹp, và tiếp tục giữ được năng lượng tích cực như mọi khi nhé!"
    },
    {
      title: "Wish you all the best 🎂",
      content: "Mong rằng chị sẽ có nhiều khoảnh khắc vui vẻ bên người chị yêu thương và mọi điều tốt đẹp nhất sẽ đến với chị!"
    },
    {
      title: "Cheers to 22! 🎉",
      content: "Chị luôn là ánh nắng tươi sáng, năng động và tích cực. Cảm ơn chị vì đã mang lại niềm vui cho mọi người xung quanh. Keep shining bright! 💖"
    }
  ];

  // THÊM STATE CHO COUNTDOWN
  const [countdown, setCountdown] = useState(10);
  const [showCountdown, setShowCountdown] = useState(true);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setTimeout(() => setShowCountdown(false), 1500); // Đợi thêm 1.5s để hiện chữ chúc mừng
    }
  }, [countdown]);

  useEffect(() => {
    // Trigger confetti animation
    const timer = setTimeout(() => setShowConfetti(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-slide messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % sections.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sections.length]);

  const photos = [
    { url: '/images/5.jpg' },
    { url: '/images/6.jpg' },
    { url: '/images/7.jpg' },
    { url: '/images/8.jpg' },
    { url: '/images/9.jpg' },
    { url: '/images/10.jpg' },
    { url: '/images/11.jpg' },
    { url: '/images/12.jpg' },
  ];

  const interests = [
    { emoji: '🌊', imageUrl: '/images/1.jpg' },
    { emoji: '🌻', imageUrl: '/images/2.jpg' },
    { emoji: '🍉', imageUrl: '/images/3.jpg' },
    { emoji: '❄️', imageUrl: '/images/4.jpg' }
  ];

  {return (
  <>
    {/* ==================== MÀN HÌNH COUNTDOWN SIÊU ĐẸP ==================== */}
    {showCountdown && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-yellow-200">
        <div className="text-center animate-pulse">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 drop-shadow-2xl">
            {countdown > 0 ? countdown : 'Happy Birthday!'}
          </h1>
          
          {countdown === 0 && (
            <div className="space-y-4 opacity-0 animate-fadeIn">
              <p className="text-3xl md:text-5xl text-white font-bold drop-shadow-lg">
                Chúc mừng sinh nhật công túa Sunnie 22 tuổi!
              </p>
              <p className="text-xl md:text-3xl text-white/90">
                Mở quà đi nè...
              </p>
            </div>
          )}

          <div className="mt-12 flex justify-center gap-4">
            {[...Array(6)].map((_, i) => (
              <Heart
                key={i}
                className={`w-12 h-12 text-pink-100 animate-bounce`}
                style={{ animationDelay: `${i * 0.2}s` }}
                fill="currentColor"
              />
            ))}
          </div>
        </div>
      </div>
    )}

    {!showCountdown && (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-yellow-50 overflow-hidden relative">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {confetti.map((item) => (
              <div
                key={item.id}
                className="absolute animate-pulse"
                style={{
                  left: `${item.left}%`,
                  top: `-20px`,
                  animation: `fall ${item.duration}s linear ${item.delay}s infinite`,
                  fontSize: `${item.fontSize}px`
                }}
              >
                {item.emoji}
              </div>
            ))}
          </div>
        )}

        {/* Floating Balloons */}
        {balloons.map(balloon => (
          <div
            key={balloon.id}
            className="fixed bottom-0 pointer-events-none"
            style={{
              left: `${balloon.left}%`,
              animation: `float ${balloon.duration}s ease-in-out ${balloon.delay}s infinite`
            }}
          >
            <div className="text-6xl opacity-70">
              {balloon.id % 3 === 0 ? '🎈' : balloon.id % 3 === 1 ? '🎀' : '💖'}
            </div>
          </div>
        ))}

        {/* Sunflower Decorations */}
        {sunflowers.map(flower => (
          <div
            key={flower.id}
            className="fixed opacity-20 pointer-events-none"
            style={{
              left: `${flower.left}%`,
              top: `${flower.top}%`,
              animation: `spin ${flower.duration}s linear ${flower.delay}s infinite`,
              fontSize: '3rem'
            }}
          >
            🌻
          </div>
        ))}

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12 animate-bounce">
            <div className="inline-block bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-xl">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 via-rose-400 to-yellow-400 text-transparent bg-clip-text">
                11/12/2003
              </h1>
            </div>
          </div>

          {/* Birthday Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border-4 border-pink-200">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Sun className="text-yellow-400 w-12 h-12 animate-spin" style={{ animationDuration: '8s' }} />
              <h2 className="text-4xl md:text-5xl font-bold text-pink-600">
                {sections[currentSection].title}
              </h2>
              <Heart className="text-pink-400 w-12 h-12 animate-pulse" />
            </div>
            
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed text-center mb-8">
              {sections[currentSection].content}
            </p>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mb-6">
              {sections.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSection(idx)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    idx === currentSection 
                      ? 'bg-pink-500 w-8' 
                      : 'bg-pink-200 hover:bg-pink-300'
                  }`}
                />
              ))}
            </div>

            {/* Age Display */}
            <div className="text-center mb-6">
              <div className="inline-block bg-gradient-to-r from-pink-400 to-yellow-400 text-white rounded-full px-6 py-3 text-2xl font-bold shadow-lg">
                ✨ 22 tuổi rồi nè! ✨
              </div>
            </div>

            {/* Fun Elements */}
            <div className="mt-12 space-y-16">
              {/* Phần 1: 4 sở thích lớn đẹp lung linh */}
              <div>
                <h3 className="text-center text-4xl md:text-5xl font-bold text-pink-600 mb-10 flex items-center justify-center gap-4">
                  <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
                  Sunnie's Favorite Things
                  <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
                  {interests.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        const names = [];
                        setCurrentImage({ url: item.imageUrl, title: names[idx] });
                        setShowImageModal(true);
                      }}
                      className="group relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer transform hover:-translate-y-6 transition-all duration-500 h-80"
                    >
                      {/* Nền màu pastel + icon nhỏ hiện trước khi hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-100 to-yellow-100 flex items-center justify-center transition-opacity duration-700 group-hover:opacity-0 z-10">
                        <div className="text-7xl opacity-60">{item.emoji}</div>
                      </div>

                      {/* Ảnh thật – chỉ hiện khi hover */}
                      <img
                        src={item.imageUrl}
                        alt="Sunnie's favorite"
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100"
                      />

                      {/* Viền sáng khi hover */}
                      <div className="absolute inset-0 ring-4 ring-transparent group-hover:ring-pink-400/70 transition-all duration-500 rounded-3xl pointer-events-none z-30" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Photo Gallery Section */}
          {photos.length > 0 && (
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border-4 border-yellow-200">
              <h3 className="text-center text-4xl md:text-5xl font-bold text-pink-600 mb-10 flex items-center justify-center gap-4">
                <Heart className="w-12 h-12 text-red-500 animate-pulse" />
                  Kỷ Niệm Đẹp Của Chị Sunnie
                <Heart className="w-12 h-12 text-red-500 animate-pulse" />
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
                {photos.map((photo, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setCurrentImage({ url: photo.url, title: photo.caption});
                      setShowImageModal(true);
                    }}
                    className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
                  >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover aspect-square"
                  />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 hidden md:flex">
                        <p className="text-white text-sm font-medium">{photo.caption}</p>
                      </div>
                      <div className="absolute top-2 right-2 bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        ♡
                      </div>
                    </div>
                  ))}
                </div>

                {/* Nếu chưa có ảnh nào thì hiện thông báo dễ thương */}
                {photos.length === 0 && (
                  <p className="text-center text-gray-500 text-lg italic mt-8">
                    Sắp có thật nhiều ảnh đẹp của công túa ở đây nè~ 💕
                  </p>
                )}
            </div>
          )}

          {/* Music Playlist */}
          <div className="bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl shadow-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">🎵 Playlist dành cho công túa 🎵</h3>
            <div className="flex flex-wrap justify-center gap-4 text-lg mb-6">
              <a 
                href="https://www.youtube.com/watch?v=i0p1bmr0EmE" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all hover:scale-105"
              >
                🎵
              </a>
              <a 
                href="https://www.youtube.com/results?search_query=blackpink+songs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all hover:scale-105"
              >
                🎵
              </a>
              <a 
                href="https://www.youtube.com/watch?v=6y70hwfVeVU" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all hover:scale-105"
              >
                🎵
              </a>
            </div>
          </div>

          {/* Footer Message */}
          <div className="text-center mt-12 text-gray-600">
            <p className="text-xl italic">Made with 💖 for the brightest Sunnie ☀️</p>
          </div>
        </div>

        {/* Popup Modal */}
        {showImageModal && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowImageModal(false)}
          >
            <div 
              className="bg-white rounded-3xl p-4 max-w-3xl w-full shadow-2xl transform"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <h3 className="text-3xl font-bold text-pink-600 mb-4">{currentImage.title}</h3>
                <img 
                  src={currentImage.url} 
                  alt={currentImage.title}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-2xl mb-4"
                />
                <button
                  onClick={() => setShowImageModal(false)}
                  className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes fall {
            to {
              transform: translateY(100vh) rotate(360deg);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-100vh) rotate(180deg);
            }
          }
          
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    )}

    {/* Thêm animation fadeIn nhỏ vào cuối file */}
    <style jsx>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 1.2s ease-out forwards;
      }
    `}</style>
  </>
  )};
};

export default SunnieBirthday;