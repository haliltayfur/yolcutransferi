import { extrasList } from "../data/extras";

export default function ExtrasSelector({ selectedExtras, onToggle }) {
  return (
    <div className="flex flex-wrap gap-3 mt-6 justify-center">
      {extrasList.map(ex => (
        <button
          key={ex.key}
          type="button"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition text-sm font-semibold shadow-sm 
            ${selectedExtras.includes(ex.key) ? "bg-gold text-black border-yellow-400" : "bg-[#202020] text-gold border-gold/30 hover:bg-gold/30"}`}
          onClick={() => onToggle(ex.key)}
        >
          {ex.icon} {ex.label}
        </button>
      ))}
    </div>
  );
}
