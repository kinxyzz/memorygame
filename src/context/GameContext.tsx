import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useTimer } from "react-timer-hook";
import { createUser } from "../services/getUser";
import { Action, ContextProps, State } from "../utils/interface";

const GameContext = createContext<ContextProps | undefined>(undefined);

const initialState: State = {
  newArr: [],
  poin: 0,
  startGame: false,
  status: null,
  count: 10,
  name: localStorage.getItem("name"),
  shuffledArray: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  seconds: 0,
  minutes: 0,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        startGame: true,
        poin: 3000,
        count: 10,
      };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_NEW_ARR":
      return { ...state, newArr: action.payload };
    case "SET_SHUFFLED_ARRAY":
      return { ...state, shuffledArray: action.payload };
    case "SET_COUNT":
      return { ...state, count: action.payload };
    case "SET_PONIT":
      return { ...state, poin: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_TIMER":
      return {
        ...state,
        seconds: action.payload.seconds,
        minutes: action.payload.minutes,
      };
    case "RESET_GAME":
      return initialState;
    case "SET_COMPLETE":
      return {
        ...state,
        poin: state.poin >= 4000 ? state.poin + 4000 : state.poin + 1000,
        newArr: [],
        count: 30,
      };
    case "SET_RESHUFFLE":
      return { ...state, newArr: [], count: 30 };

    default:
      throw new Error();
  }
}

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mutate } = createUser();

  //handleScore 4000 agar langsung shuffle
  useEffect(() => {
    if (state.poin === 4000) {
      shuffle();
    }
  }, [state.poin]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (state.startGame && state.count > 0) {
      timer = setInterval(() => {
        dispatch({ type: "SET_COUNT", payload: state.count - 1 });
      }, 1000);
    }
    state.shuffledArray;
    return () => {
      clearInterval(timer);
    };
  }, [state.count, state.startGame, state.shuffledArray]);

  let result =
    state.shuffledArray.length === 12
      ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      : [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const isCorrectOrder = state.newArr.every(
    (item, index) => item === result[index]
  );
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 180);

  function shuffle() {
    let nextShuffled =
      state.poin >= 4000
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].sort(
            () => Math.random() - 0.5
          )
        : state.shuffledArray.sort(() => Math.random() - 0.5);

    dispatch({
      type: "SET_SHUFFLED_ARRAY",
      payload: nextShuffled,
    });
  }

  const handleFaster = () => {
    dispatch({ type: "SET_COUNT", payload: 0 });
  };

  function handleNumber(item: number) {
    if (isCorrectOrder) {
      if (state.newArr.length < result.length) {
        dispatch({ type: "SET_NEW_ARR", payload: [...state.newArr, item] });
      } else {
        dispatch({ type: "SET_STATUS", payload: "good" });
      }
    }
  }

  const { seconds, minutes, start, restart } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => {
      console.warn("expired");
      if (state.name) mutate({ name: state.name, score: state.poin });
      dispatch({ type: "RESET_GAME" });
    },
  });

  function handleStart() {
    dispatch({ type: "START_GAME" });
    shuffle();

    restart(expiryTimestamp);
  }

  if (state.status) {
    setTimeout(() => {
      dispatch({ type: "SET_STATUS", payload: null });
    }, 2000);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    if (event.target.name.value.length === 0) {
      alert("Please enter your name");
      return;
    }
    dispatch({ type: "SET_NAME", payload: event.target.name.value });
    localStorage.setItem("name", event.target.name.value);

    mutate({ name: event.target.name.value });
  }

  function handleReshuffle() {
    dispatch({ type: "SET_RESHUFFLE" });
    shuffle();
  }

  if (isCorrectOrder && state.newArr.length === result.length) {
    shuffle();
    dispatch({ type: "SET_COMPLETE" });
  } else if (!isCorrectOrder) {
    dispatch({ type: "SET_STATUS", payload: "Wrong Order" });
    dispatch({ type: "SET_NEW_ARR", payload: [] });
  }

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        shuffle,
        handleNumber,
        isCorrectOrder,
        handleReshuffle,
        handleSubmit,
        handleStart,
        minutes,
        seconds,
        start,
        restart,
        handleFaster,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Buat custom hook untuk menggunakan context
const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export { GameProvider, useGame };
