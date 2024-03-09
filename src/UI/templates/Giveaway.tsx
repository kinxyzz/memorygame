import { useState } from "react";
import {
  createParticipants,
  useParticipants,
} from "../../services/getParticipants";

export default function Giveaway() {
  const [name, setName] = useState("");
  const [discord, setDiscord] = useState("");
  const { data } = useParticipants();
  const { mutate } = createParticipants();

  function handleSubmit() {
    if (name.length === 0) {
      alert("Please enter your name");
      return;
    }
    mutate({ name: name, discord });
  }

  return (
    <div className="h-screen bg-slate-900 text-white">
      <div className="flex flex-col items-center h-full gap-4 bg-slate-800 pt-20">
        <div className="p-2 border-slate-100 border h-2/4 overflow-y-scroll">
          <h1 className="text-3xl  scroll-m-0">List Participants</h1>
          <ul className="mt-4">
            {data?.map((participant, index) => (
              <li key={participant.id}>
                {index + 1}. {participant.IGN} | {participant.Discord}
              </li>
            ))}
          </ul>
        </div>
        <h2 className="text-4xl">giveaway</h2>
        <label htmlFor="">IGN</label>
        <input
          className="p-2 text-slate-900 border-2 border-slate-900 rounded-md"
          type="text"
          placeholder="your name..."
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="Discord">Discord</label>
        <input
          className="p-2 text-slate-900 border-2 border-slate-900 rounded-md"
          type="text"
          placeholder="your Discord..."
          onChange={(e) => setDiscord(e.target.value)}
        />
        <button onClick={handleSubmit} className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
}
