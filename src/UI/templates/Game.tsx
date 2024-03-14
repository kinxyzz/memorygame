import { useGame } from "../../context/GameContext";
import { useUser } from "../../services/getUser";

export default function Game() {
  const {
    state,
    isCorrectOrder,
    handleNumber,
    handleReshuffle,
    handleSubmit,
    handleStart,
    minutes,
    seconds,
    handleFaster,
  } = useGame();

  const { data } = useUser();

  return (
    <>
      {!state.name && (
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
      <div className="flex justify-center bg-gray-900  h-screen">
        <div className="w-[480px] container">
          <div className="flex justify-center p-2 text-white">Memory Game</div>
          <div className="Profile text-white p-4">
            <div className="border-b-2 border-slate-200">
              <h2>Name: {state.name}</h2>
              <p className="">Point : {state.poin}</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-white bg-gray-900">
            <div className="p-10">
              <h2>
                Timer : {minutes} minute : {seconds} seconds
              </h2>
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
                  className={`w-20 h-20 rounded-md drop-shadow-lg ${
                    state.newArr.includes(item) && isCorrectOrder
                      ? "bg-green-500"
                      : state.count !== 0
                      ? "bg-cyan-800 cursor-not-allowed"
                      : "bg-cyan-500"
                  }`}
                >
                  {state.count === 0 ? "❓❓" : item}
                </button>
              ))}
            </div>
            {state.count === 0 && (
              <button
                onClick={handleReshuffle}
                className="mt-10 bg-blue-500 py-2 px-4 rounded-md"
              >
                Reshuffle
              </button>
            )}

            <div className="flex my-10 flex-col items-center gap-4">
              {!state.startGame ? (
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
                  {state.count !== 0 && (
                    <button
                      disabled={state.count === 0 ? true : false}
                      onClick={handleFaster}
                      className="py-2 px-4 bg-blue-500 rounded-md"
                    >
                      Faster {state.count}
                    </button>
                  )}
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
          <footer>
            <p className="mt-10 text-white text-center">@kinxyzz</p>
          </footer>
        </div>
      </div>
    </>
  );
}
