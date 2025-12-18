import { useState, useEffect } from "react";

const CopyIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

// Countdown helper
function getTimeRemaining(targetDate) {
  const now = new Date();
  const target = new Date(targetDate);
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, isExpired: true };
  }

  const days = Math.round(diff / (1000 * 60 * 60 * 24));

  return { days, isExpired: false };
}

export function LotteryCard({ lottery }) {
  const [copied, setCopied] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(lottery.drawDate));

  // Countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(lottery.drawDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [lottery.drawDate]);

  const hasMultipleImages = lottery.images && lottery.images.length > 0;
  // Fallback to first image in array or single image prop, or placeholder
  const currentImage = hasMultipleImages
    ? lottery.images[currentImageIndex]
    : lottery.image || "https://placehold.co/600x400/png";

  const progress = Math.min(100, Math.round((lottery.ticketsSold / lottery.maximumTickets) * 100));

  const handleCopyAccount = async (e) => {
    e.stopPropagation(); // Prevent card navigation if any
    if (lottery.accountNumber) {
      try {
        await navigator.clipboard.writeText(lottery.accountNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy", err);
      }
    }
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => (prev === lottery.images.length - 1 ? 0 : prev + 1));
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => (prev === 0 ? lottery.images.length - 1 : prev - 1));
    }
  };

  // Swipe logic
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      if (hasMultipleImages) {
        setCurrentImageIndex((prev) => (prev === lottery.images.length - 1 ? 0 : prev + 1));
      }
    } else if (isRightSwipe) {
      if (hasMultipleImages) {
        setCurrentImageIndex((prev) => (prev === 0 ? lottery.images.length - 1 : prev - 1));
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl overflow-hidden shadow-2xl hover:shadow-black/50 transition-all hover:scale-103 border-2 border-tertiary select-none text-text-main">
      {/* Countdown Badge */}
      <div className="relative group">
        <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-tertiary to-accent text-white px-3 py-1 rounded-full text-xs shadow-lg font-bold">
          {timeLeft.isExpired ? "🎉 ДУУССАН" : <span>⏱️ {timeLeft.days} Өдөр үлдлээ</span>}
        </div>

        {/* Car Image Scroller */}
        <div
          className="relative h-56 overflow-hidden bg-gray-900 group touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <img
            src={currentImage}
            alt={lottery.title}
            className="w-full h-full object-cover transition-transform duration-500"
            draggable="false"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          {hasMultipleImages && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-1.5 rounded-full transition-colors opacity-0 group-hover:opacity-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-1.5 rounded-full transition-colors opacity-0 group-hover:opacity-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                {currentImageIndex + 1} / {lottery.images.length}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-4">
        {/* Car Name */}
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-bold text-text-main leading-tight">{lottery.title}</h3>
          <div className="bg-gradient-to-r from-tertiary to-accent text-white px-8 py-2 rounded-full inline-block shadow-lg">
            <p className="text-xl font-bold">{lottery.price.toLocaleString()} ₮</p>
          </div>
        </div>

        {/* Bank Account */}
        {lottery.accountNumber && (
          <div className="bg-gradient-to-br from-tertiary/30 to-secondary border border-tertiary rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-bl-full -mr-4 -mt-4"></div>

            <div className="flex items-center justify-between gap-3 relative z-10">
              <div className="flex-1 min-w-0 text-left">
                <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                  💳 Данс ({lottery.bankName || "Банк"})
                </p>
                <div className="flex flex-col items-baseline gap-2">
                  <p className="text-text-main font-mono font-bold text-lg ">{lottery.accountNumber}</p>

                  <p className="text-sm text-gray-200 truncate max-w-[100px]">{lottery.accountName}</p>
                </div>
              </div>
              <button
                onClick={handleCopyAccount}
                className="flex-shrink-0 p-2.5 bg-white/10 hover:bg-white/20 border border-tertiary/50 rounded-lg transition-all shadow-sm hover:shadow active:scale-95 group"
                title="Copy account number"
              >
                <CopyIcon className="w-4 h-4 text-gray-400 group-hover:text-cyan-500" />
              </button>
            </div>
            {copied && (
              <div className="absolute inset-0 bg-green-50/90 backdrop-blur-[1px] flex items-center justify-center transition-all z-20">
                <p className="text-green-600 text-sm font-bold flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Амжилттай хууллаа
                </p>
              </div>
            )}
          </div>
        )}

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium text-gray-400">
            <span>
              ⏰ <span className="text-text-main font-bold">{lottery.ticketsSold}</span> / {lottery.maximumTickets}{" "}
              зарагдсан
            </span>
            <span className="text-accent font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-black/40 rounded-full h-3.5 overflow-hidden shadow-inner border border-white/10">
            <div
              className="bg-gradient-to-r from-tertiary to-accent h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(233,127,74,0.5)] relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => window.open("https://tinyurl.com/aa6k8yb4")}
            className="w-full bg-gradient-to-r from-tertiary to-accent hover:from-accent hover:to-tertiary text-white py-3.5 px-4 rounded-xl transition-all shadow-lg hover:shadow-accent/25 text-base font-bold tracking-wide active:scale-[0.98]"
          >
            ⭐ ОДОО ОРОЛЦОХ ⭐
          </button>
          <button
            onClick={() => (window.location.href = `/lottery/${lottery.id}`)}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-text-main border border-tertiary/50 py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-tertiary/20 text-base font-semibold tracking-wide active:scale-[0.98]"
          >
            🔍 ДУГААР ХАРАХ
          </button>
          {/* Description/Details Section (Optional, included as per previous logic logic but styled) */}

          <div className="text-xs text-gray-400 text-center mt-2 line-clamp-1 hover:line-clamp-none transition-all cursor-pointer">
            {lottery.description}
          </div>
        </div>
      </div>
    </div>
  );
}
