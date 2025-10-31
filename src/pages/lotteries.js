import { lotteries } from "@/mockdata";
import { Header } from "@/components/header";

export default function Lotteries() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-12 px-6">
        <Header />
      </header>
      <main className="max-w-7xl mx-auto py-12 px-6">
        {/* <h2 className="text-3xl font-bold mb-8 text-foreground">
          Available Lotteries
        </h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lotteries.map((lottery) => (
            <div
              key={lottery.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <img
                src={lottery.image}
                alt={lottery.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground">
                  {lottery.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {lottery.description}
                </p>

                {/* Progress bar for sold tickets */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Tickets Sold:
                    </span>
                    <span className="font-semibold text-foreground">
                      {lottery.maximumTickets - lottery.ticketsAvailable} /{" "}
                      {lottery.maximumTickets}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-linear-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          ((lottery.maximumTickets - lottery.ticketsAvailable) /
                            lottery.maximumTickets) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {Math.round(
                        ((lottery.maximumTickets - lottery.ticketsAvailable) /
                          lottery.maximumTickets) *
                          100
                      )}
                      % Sold
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {lottery.ticketsAvailable} Available
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Үнэ:
                    </span>
                    <span className="font-semibold text-green-600">
                      {lottery.price.toLocaleString()} ₮
                    </span>
                  </div>
                  {/* <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Draw Date:
                    </span>
                    <span className="font-semibold text-foreground">
                      {lottery.drawDate}
                    </span>
                  </div> */}
                </div>
                <button
                  onClick={() =>
                    window.open(
                      "https://docs.google.com/spreadsheets/d/1FABf3IhAO8-dzltS_OdNI-kh_shtDPqD2h0mgJNAp88/edit?gid=0#gid=0",
                      "_blank"
                    )
                  }
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Дугаар харах
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
