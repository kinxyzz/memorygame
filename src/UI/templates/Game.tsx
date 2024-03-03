import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { createUser, useUser } from "../../services/getUser";

export default function Game() {
  const { mutate } = createUser();
  const { data } = useUser();

  console.log(data);

  const [newArr, setNewArr] = useState<number[]>([]);
  const [poin, setPoin] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [count, setCount] = useState(10);
  const [name, setName] = useState<string | null>(localStorage.getItem("name"));
  const [shuffledArray, setShuffledArray] = useState(() => {
    const shuffled = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return shuffled.sort(() => Math.random() - 0.5);
  });

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 180);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (startGame && count > 0) {
      timer = setInterval(() => setCount(count - 1), 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [count, startGame]);

  const result = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const isCorrectOrder = newArr.every((item, index) => item === result[index]);

  function shuffle() {
    const shuffled = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    setShuffledArray(shuffled.sort(() => Math.random() - 0.5));
  }
  function handleStart() {
    setStartGame(true);
    setPoin(0);
    setCount(10);
    if (minutes === 0 && seconds === 0) {
      restart(expiryTimestamp);
    } else {
      start();
    }
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    if (event.target.name.value.length === 0) {
      alert("Please enter your name");
      return;
    }
    setName(event.target.name.value);
    localStorage.setItem("name", event.target.name.value);

    mutate({ name: event.target.name.value });
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
  } else if (!isCorrectOrder) {
    setStatus("wrong order");
    setNewArr([]);
  }

  if (status) {
    setTimeout(() => {
      setStatus(null);
    }, 2000);
  }

  const { seconds, minutes, start, restart } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => {
      console.warn("expired");
      if (name) mutate({ name: name, score: poin });
      setStartGame(false);
      setCount(0);
    },
  });

  return (
    <>
      {!name && (
        <div className="z-[999] fixed flex justify-center items-center h-screen w-[480px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80">
          <div className="bg-white h-1/5 p-2 w-5/6 rounded-md">
            <h2>Your Name:</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                className="p-2 border-2 border-slate-900 rounded-sm"
                type="text"
                name="name"
                placeholder="your name..."
              />
              <button
                className="px-4 py-2 bg-green-500 rounded-md"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="flex justify-center bg-red-900 h-screen">
        <div className="bg-gray-900 w-[480px] container">
          <div className="flex justify-center p-2 text-white">Memory Game</div>
          <div className="Profile text-white p-4">
            <div className="border-b-2 border-slate-200">
              <h2>Name: {name}</h2>
              <p className="">Point : {poin}</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-white bg-gray-900">
            <div className="p-10">
              <h2>
                Timer : {minutes} minute : {seconds} seconds
              </h2>
            </div>
            <p className="">{status || "-"}</p>

            <div className="grid grid-cols-3 gap-4">
              {shuffledArray.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNumber(item)}
                  disabled={count === 0 ? false : true}
                  className={`w-20 h-20 rounded-md ${
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

            <div className="flex my-10 flex-col items-center gap-4">
              {!startGame ? (
                <>
                  <button
                    onClick={handleStart}
                    className="bg-green-500 px-4 py-2 rounded-md"
                  >
                    Start
                  </button>
                  <p>Click Start to play</p>
                </>
              ) : (
                <>
                  <p>{count}</p>
                </>
              )}
            </div>
          </div>
          <div className="p-4">
            <div className="dropdown dropdown-top">
              <div tabIndex={0} role="button" className="btn m-1">
                Leaderboard
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {data?.map((item, index) => (
                  <li key={item.id}>
                    <p>
                      {index + 1}. {item.name} | {item.score}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
