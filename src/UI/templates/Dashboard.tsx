import { useParticipants } from "../../services/getParticipants";

export default function Dashboard() {
  const { data } = useParticipants();

  return (
    <div>
      <div className="p-2 border-slate-100 border h-1/4 overflow-y-scroll">
        <ul className="mt-4">
          {data?.map((participant, index) => (
            <li key={participant.id}>
              {index + 1}. {participant.IGN} | {participant.Discord}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
