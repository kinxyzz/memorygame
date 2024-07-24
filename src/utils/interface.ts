import { Dispatch } from "react";

export interface State {
  newArr: number[];
  poin: number;
  startGame: boolean;
  status: string | null;
  count: number;
  name: string | null;
  shuffledArray: number[];
  time: number;
  isActive: boolean;
}

export type Action =
  | { type: "START_GAME" }
  | { type: "SET_NAME"; payload: string | null }
  | { type: "SET_NEW_ARR"; payload: number[] }
  | { type: "SET_SHUFFLED_ARRAY"; payload: number[] }
  | { type: "SET_COUNT"; payload: number }
  | { type: "SET_PONIT"; payload: number }
  | { type: "SET_STATUS"; payload: string | null }
  | { type: "SET_TIMER"; payload: { time: number } }
  | { type: "RESET_GAME" }
  | { type: "SET_EXPIRED" }
  | { type: "SET_COMPLETE" }
  | { type: "SET_RESHUFFLE" }
  | {
      type: "SET_ACTIVE";
      payload: { isActive: boolean };
    };

export interface ContextProps {
  state: State;
  dispatch: Dispatch<Action>;
  shuffle: () => void;
  isCorrectOrder: boolean;
  handleNumber: (item: number) => void;
  handleReshuffle: () => void;
  handleSubmit: (event: any) => void;
  handleStart: () => void;

  handleFaster: () => void;
}
