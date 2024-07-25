import { FaTiktok } from "react-icons/fa";
import { useGame } from "../../context/GameContext";
import { useUser } from "../../services/getUser";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}`;
};

export default function Game() {
  const {
    state,
    isCorrectOrder,
    handleNumber,
    handleReshuffle,
    handleSubmit,
    handleStart,

    handleFaster,
  } = useGame();

  const { data } = useUser();

  return (
    <>
      {!state.name && (
        <div className="z-[999] fixed flex justify-center min-h-screen items-center  w-[480px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80">
          <div className="bg-white  p-4 rounded-md">
            <h2>Your Name:</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                className="input input-bordered input-primary w-full max-w-xs"
                type="text"
                name="name"
                placeholder="your name..."
              />
              <button
                className="btn btn-circle btn-primary btn-wide"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="flex justify-center bg-gray-800 min-h-screen">
        <div className="w-[480px] container">
          <div className="flex justify-center p-2 text-white">Memory Game</div>
          <div className="Profile text-white p-4 justify-between border-b-2 flex w-full">
            <div className=" border-slate-200">
              <h2>Name: {state.name}</h2>
              <p className="">Point : {state.poin}</p>
            </div>
          </div>

          {state.time > 0 ? (
            <div className="flex flex-col items-center text-white">
              <div className="p-10">
                <h2>Timer : {formatTime(state.time)}</h2>
              </div>
              <p className="">{state.status || "-"}</p>

              <div
                className={`grid ${
                  state.shuffledArray.length > 9 ? "grid-cols-4" : "grid-cols-3"
                }  gap-4`}
              >
                {state.shuffledArray.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNumber(item)}
                    disabled={state.count === 0 ? false : true}
                    className={`w-16 h-16 rounded-md drop-shadow-lg ${
                      state.newArr.includes(item) && isCorrectOrder
                        ? "bg-green-500"
                        : state.count !== 0
                        ? "bg-gradient-to-tr from-purple-800 to-pink-900"
                        : "bg-gradient-to-tr from-purple-600 to-pink-500"
                    }`}
                  >
                    {state.count === 0 ? "?" : item}
                  </button>
                ))}
              </div>

              {state.count === 0 && (
                <button
                  onClick={handleReshuffle}
                  className="mt-10 btn btn-wide  bg-gradient-to-tr from-purple-600 to-pink-500 btn-square text-white"
                >
                  Reshuffle
                </button>
              )}

              <div className="flex my-10 mx-4 flex-col items-center gap-4">
                {!state.startGame ? (
                  <>
                    <button
                      onClick={handleStart}
                      className="btn btn-wide  bg-gradient-to-tr from-purple-600 to-pink-500 text-white"
                    >
                      Start
                    </button>
                    <p className="text-sm">Click Start to play</p>
                  </>
                ) : (
                  <>
                    {state.count !== 0 && (
                      <button
                        disabled={state.count === 0 ? true : false}
                        onClick={handleFaster}
                        className="btn btn-wide bg-gradient-to-tr from-purple-600 to-pink-500 btn-square text-white"
                      >
                        Faster {state.count}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full flex-col text-white gap-2 flex items-center justify-center">
              <ul className="max-w-xs text-center">
                <li>
                  Jika anda Bermain Lagi, maka score anda saat ini akan diganti
                  ke yang baru meski skor saat ini lebih tinggi
                </li>
              </ul>
              <button
                onClick={handleStart}
                className="py-2 px-4 bg-green-500 text-white mx-auto rounded-md"
              >
                Mau Main Lagi?
              </button>
            </div>
          )}
          <div className="p-4 flex justify-between">
            <div
              className={`dropdown ${
                !state.isActive ? "dropdown-top" : "dropdown-bottom"
              }`}
            >
              <div tabIndex={0} role="button" className="btn btn-sm m-1">
                Leaderboard
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {data?.map((item, index) => (
                  <li key={item.id}>
                    <a
                      className="w-full flex justify-between px-1"
                      href={`https://www.tiktok.com/@${item.name}`}
                      target="_blank"
                    >
                      {index + 1}. {item.name} | {item.score}{" "}
                      <FaTiktok color="black" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <footer className="w-full flex justify-center">
            <a
              href="https://www.tiktok.com/@alshopme"
              className="mt-10 text-white text-center"
            >
              @kinxyzz
            </a>
          </footer>
        </div>
      </div>
    </>
  );
}
