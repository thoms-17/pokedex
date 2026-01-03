import { useRef, useState } from "react"

function PokemonList({ searchTerm, onSearchChange,filteredPokemon, isLoadingList, listError, onSelectPokemon }) {
  const scrollRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);

  const handleScroll = () => {
    setIsScrolling(true)

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current)
    }

    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false)
    }, 500)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Nom ou ID (ex: pikaa, 25, char)"
            className="w-full rounded-full border border-red-400/80 bg-white/90 px-4 py-2 text-sm text-slate-900 placeholder:text-red-400/80 focus:outline-none focus:ring-2 focus:ring-red-500/90 focus:border-transparent shadow-inner"
          />
        {isLoadingList && <span className="ml-2 text-xs text-red-800 font-medium">Chargement...</span>}
      </div>

      {listError && <p className="text-red-700 text-sm mb-2 font-medium">{listError}</p>}

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={`
          max-h-[480px]
          rounded-2xl
          bg-red-50
          border border-red-200
          overflow-y-auto
          transition-all
          ${isScrolling ? "scrollbar-visible" : "scrollbar-auto"}
        `}
      >
        <div className="divide-y divide-red-100">
          {filteredPokemon.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectPokemon(p)}
              className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-red-100 cursor-pointer transition-colors"
            >
              <img
                src={p.sprite}
                alt={p.nameFr || p.name}
                className="w-8 h-8 object-contain bg-white rounded-md border border-red-200"
              />
              <div className="flex-1 flex items-center justify-between">
                <span className="capitalize text-sm text-red-900 font-medium">{p.nameFr || p.name}</span>
                <span className="text-xs text-red-500 font-mono">#{p.id}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PokemonList
