import React, { createContext, useContext, useEffect, useReducer } from "react";
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
  time: 180,
  isActive: false,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        startGame: true,
        poin: 0,
        count: 10,
        time: 180,
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
        time: action.payload.time,
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
    case "SET_ACTIVE":
      return { ...state, isActive: action.payload.isActive };
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
    let interval = null;

    if (state.isActive && state.time > 0) {
      interval = setInterval(() => {
        dispatch({ type: "SET_TIMER", payload: { time: state.time - 1 } });
      }, 1000);
    } else if (state.time === 0) {
      alert("Time's up!");
      dispatch({ type: "SET_ACTIVE", payload: { isActive: false } });
      mutate({ name: state.name!, score: state.poin });
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [state.isActive, state.time]);

  const result =
    state.shuffledArray.length === 12
      ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      : [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const isCorrectOrder = state.newArr.every(
    (item, index) => item === result[index]
  );
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 180);

  function shuffle() {
    const nextShuffled =
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

  function handleStart() {
    dispatch({ type: "START_GAME" });
    shuffle();
    dispatch({ type: "SET_ACTIVE", payload: { isActive: true } });
  }

  if (state.status) {
    setTimeout(() => {
      dispatch({ type: "SET_STATUS", payload: null });
    }, 2000);
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
    };

    if (target.name.value.length === 0) {
      alert("Please enter your name");
      return;
    }

    dispatch({ type: "SET_NAME", payload: target.name.value });
    localStorage.setItem("name", target.name.value);

    mutate({ name: target.name.value });
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
