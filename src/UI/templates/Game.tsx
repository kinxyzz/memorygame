import { useEffect, useState } from "react";

export default function Game() {
  const [newArr, setNewArr] = useState<number[]>([]);
  const [poin, setPoin] = useState(0);
  const [start, setStart] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [count, setCount] = useState(10);
  const [shuffledArray, setShuffledArray] = useState(() => {
    const shuffled = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return shuffled.sort(() => Math.random() - 0.5);
  });

  useEffect(() => {
    let timer: number;

    if (start && count > 0) {
      timer = setInterval(() => setCount(count - 1), 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [count, start]);

  const result = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const isCorrectOrder = newArr.every((item, index) => item === result[index]);

  function shuffle() {
    const shuffled = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    setShuffledArray(shuffled.sort(() => Math.random() - 0.5));
  }

  function handleNumber(item: number) {
    if (isCorrectOrder) {
      if (newArr.length < 9) {
        setNewArr([...newArr, item]);
      } else {
        setStatus("good");
      }
    }
  }

  function handleReshuffle() {
    setNewArr([]);
    shuffle();
    setCount(10);
  }

  if (isCorrectOrder && newArr.length === 9) {
    setPoin(poin + 1000);
    setNewArr([]);
    shuffle();
    setCount(10);
  }

  if (!isCorrectOrder) {
    setStatus("wrong order");
    setNewArr([]);
  }

  if (status) {
    setTimeout(() => {
      setStatus(null);
    }, 2000);
  }

  return (
    <div className="flex justify-center bg-red-900 h-screen">
      <div className="bg-blue-900 w-[480px]">
        <div className="flex justify-center p-2 text-white">Memory Game</div>

        <div className="relative flex flex-col h-full items-center text-white bg-gray-900">
          <div className="p-20">
            <h2>Timer : </h2>
          </div>
          <p className="">{status}</p>
          <p className="mb-10 mt-20">Point : {poin}</p>
          <div className="grid grid-cols-3 gap-4">
            {shuffledArray.map((item) => (
              <button
                key={item}
                onClick={() => handleNumber(item)}
                disabled={count === 0 ? false : true}
                className={`w-20 h-20 ${
                  newArr.includes(item) && isCorrectOrder
                    ? "bg-green-500"
                    : "bg-cyan-500"
                }`}
              >
                {count === 0 ? "?" : item}
              </button>
            ))}
          </div>
          {count === 0 && (
            <button
              onClick={handleReshuffle}
              className="mt-10 bg-blue-500 p-1 px-3 rounded-md"
            >
              Reshuffle
            </button>
          )}

          <div className="absolute bottom-64 flex flex-col items-center gap-4">
            {!start ? (
              <>
                <button
                  onClick={() => setStart(true)}
                  className="bg-green-500 px-4 rounded-md"
                >
                  Mulai
                </button>
                <p>Click start to play</p>
              </>
            ) : (
              <>
                <p>{count}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
