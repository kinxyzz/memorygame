import { useState } from "react";

export default function JudTest() {
  const [answer, setAnswer] = useState<number | null>(null);
  const [inputAnswer, setInputAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [start, setStart] = useState(false);
  const [showStatus, setShowStatus] = useState("");
  const [money, setMoney] = useState<number | null>(null);

  const realanswer = Math.floor(Math.random() * 100) + 1;

  function handleStart() {
    setAnswer(realanswer);
    if (!money) {
      setShowStatus("Deposit terlebih dahulu");
      return;
    }
    if (money <= 10000) {
      setShowStatus("duit anda kurang sok sok an depo");
      return;
    } else {
      setStart(true);
    }
  }

  function handleSubmit() {
    if (inputAnswer !== realanswer) {
      setShowAnswer(true);
      setShowStatus("Jawaban anda salah uang berkurang 10000");
      setMoney((money) => (money !== null ? money - 10000 : 0));
    }
    if (inputAnswer === realanswer) {
      setShowAnswer(true);
      setShowStatus("Jawaban anda benar uang bertambah 10000");
      setMoney((money) => (money !== null ? money + 10000 : 0));
    }
    setAnswer(realanswer);
    setTimeout(() => {
      setShowAnswer(false);
      setShowStatus("");
      setInputAnswer(null);
    }, 4000);
  }

  if (!start)
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <h1>Permainan Tebak Angka</h1>
        <p className="text-red-500">{showStatus}</p>
        <label htmlFor="deposit">Deposit</label>
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          type="number"
          placeholder="masukan uang"
          name="deposit"
          id="deposit"
          value={money || ""}
          onChange={(e) => setMoney(Number(e.target.value))}
        />
        <button className="btn btn-primary" onClick={handleStart}>
          Start
        </button>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <div className="bg-primary rounded-md p-4">
        <h1 className="text-3xl">
          Uang anda:{" "}
          {money?.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </h1>
        <h2>Ini adalah bentuk algorithma paling paling sederhana judol</h2>
      </div>
      <p>{showStatus || "status"}</p>
      <h2>Jawaban yang benar adalah {showAnswer ? answer : "..."}</h2>
      <div className="flex flex-col gap-2">
        <input
          value={inputAnswer || ""}
          className="input input-bordered input-primary w-full max-w-xs"
          type="number"
          onChange={(e) => setInputAnswer(Number(e.target.value))}
        />
        <button
          disabled={showAnswer || !inputAnswer || !money}
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Tebak
        </button>
      </div>
    </div>
  );
}
