const TYPE_META = {
  normal: { label: 'Normal', icon: '⚪️' },
  fire: { label: 'Feu', icon: '🔥' },
  water: { label: 'Eau', icon: '💧' },
  grass: { label: 'Plante', icon: '🌿' },
  electric: { label: 'Électrik', icon: '⚡️' },
  ice: { label: 'Glace', icon: '❄️' },
  fighting: { label: 'Combat', icon: '🥊' },
  poison: { label: 'Poison', icon: '☠️' },
  ground: { label: 'Sol', icon: '🌍' },
  flying: { label: 'Vol', icon: '🕊️' },
  psychic: { label: 'Psy', icon: '🔮' },
  bug: { label: 'Insecte', icon: '🐛' },
  rock: { label: 'Roche', icon: '🪨' },
  ghost: { label: 'Spectre', icon: '👻' },
  dragon: { label: 'Dragon', icon: '🐲' },
  dark: { label: 'Ténèbres', icon: '🌑' },
  steel: { label: 'Acier', icon: '⚙️' },
  fairy: { label: 'Fée', icon: '✨' },
}

const STAT_META = {
  hp: { label: 'PV', color: 'bg-emerald-500' },
  attack: { label: 'Attaque', color: 'bg-orange-500' },
  defense: { label: 'Défense', color: 'bg-sky-500' },
  'special-attack': { label: 'Attaque Spéciale', color: 'bg-violet-500' },
  'special-defense': { label: 'Défense Spéciale', color: 'bg-teal-500' },
  speed: { label: 'Vitesse', color: 'bg-rose-500' },
}

function PokemonDetail({ selectedPokemon, isLoadingDetail, detailError }) {
  return (
    <div className="h-full rounded-2xl bg-white border border-red-300 p-4 flex flex-col overflow-hidden">
      <h2 className="text-lg font-semibold mb-3 text-red-900">Détail du Pokémon</h2>

      {detailError && <p className="text-red-600 text-sm mb-2 font-medium">{detailError}</p>}

      <div className="flex-1 mt-2 overflow-y-auto">
        {selectedPokemon && !detailError && (
          <div
            className={`grid grid-cols-1 lg:grid-cols-12 gap-6 items-center flex-1 ${
              isLoadingDetail ? 'opacity-60' : ''
            }`}
          >
            <div className="lg:col-span-5 flex justify-center">
              <img
                src={
                  selectedPokemon.sprites.other['official-artwork'].front_default ||
                  selectedPokemon.sprites.front_default
                }
                alt={selectedPokemon.name}
                className="w-40 h-40 lg:w-56 lg:h-56 object-contain drop-shadow-[0_0_20px_rgba(0,0,0,0.6)]"
              />
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-semibold capitalize text-red-900">
                  {selectedPokemon.nameFr || selectedPokemon.name}{' '}
                  <span className="text-red-500 text-lg">#{selectedPokemon.id}</span>
                </h3>
                <p className="text-xs text-red-500">
                  Exp. de base :{' '}
                  <span className="font-medium text-red-900">
                    {selectedPokemon.base_experience}
                  </span>
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-slate-700">
                  Taille :{' '}
                  <span className="font-medium text-red-900">
                    {(selectedPokemon.height / 10).toFixed(1)} m
                  </span>
                </p>
                <p className="text-sm text-slate-700">
                  Poids :{' '}
                  <span className="font-medium text-red-900">
                    {(selectedPokemon.weight / 10).toFixed(1)} kg
                  </span>
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-red-900 font-semibold">Types</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPokemon.types.map((t) => {
                    const key = t.type.name
                    const meta = TYPE_META[key] || { label: key, icon: '❓' }
                    return (
                      <span
                        key={key}
                        className="inline-flex items-center gap-1 rounded-full border border-red-300 bg-red-50 px-3 py-1 text-xs text-red-900"
                      >
                        <span>{meta.icon}</span>
                        <span>{meta.label}</span>
                      </span>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-red-900 font-semibold">Statistiques de base</p>
                <div className="space-y-1">
                  {selectedPokemon.stats.map((stat) => {
                    const key = stat.stat.name
                    const meta = STAT_META[key] || { label: key, color: 'bg-slate-500' }
                    const value = stat.base_stat
                    const ratio = Math.min(value, 255) / 255
                    const width = `${Math.max(ratio * 100, 8).toFixed(0)}%`

                    return (
                      <div key={key} className="flex items-center gap-2 text-xs text-slate-800">
                        <span className="w-28 truncate">{meta.label}</span>
                        <span className="w-10 text-right font-mono">{value}</span>
                        <div className="flex-1 h-1.5 rounded-full bg-red-100 overflow-hidden">
                          <div
                            className={`${meta.color} h-full rounded-full`}
                            style={{ width }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PokemonDetail