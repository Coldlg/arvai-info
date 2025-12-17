import { useState } from "react";

export function LotteryCard({ lottery }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hasMultipleImages = lottery.images && lottery.images.length > 0;
  const currentImage = hasMultipleImages ? lottery.images[currentImageIndex] : lottery.image;

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

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Данс хуулсан!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
      alert("Данс хуулсангүй!");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden relative">
      <div className="relative">
        <img src={currentImage} alt={lottery.title} className="w-full ratio-16/9 object-cover aspect-video" />
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {currentImageIndex + 1} / {lottery.images.length}
            </div>
          </>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-foreground">{lottery.title}</h3>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Сугалааны дүүргэлт:</span>
            <span className="font-semibold text-foreground">
              {lottery.ticketsSold} / {lottery.maximumTickets}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-linear-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${(lottery.ticketsSold / lottery.maximumTickets) * 100}%`,
              }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {Math.round((lottery.ticketsSold / lottery.maximumTickets) * 100)}% дүүрсэн
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {lottery.maximumTickets - lottery.ticketsSold} Сугалаа үлдсэн
            </span>
          </div>
        </div>
        <div className="my-4">
          <div className="text-md text-gray-300 whitespace-pre-line">{lottery.description}</div>
          {lottery.accountNumber && (
            <div className="mt-2 text-gray-300">
              ❌ Данс:{" "}
              <span className="cursor-pointer underline text-blue-400" onClick={() => copyText(lottery.accountNumber)}>
                {lottery.accountNumber}
              </span>
              <br />
              {lottery.bankName && lottery.accountName && `(${lottery.bankName} ${lottery.accountName})`}
              <br />❌ Нэг сугалааны эрх{" "}
              <span className="font-semibold text-green-600">{lottery.price.toLocaleString()}₮</span>
              <br />❌ Гүйлгээний утга: Утасны дугаар
            </div>
          )}
        </div>

        <button
          onClick={() => window.open("https://tinyurl.com/aa6k8yb4", "_blank")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Дугаар харах
        </button>
      </div>
    </div>
  );
}
