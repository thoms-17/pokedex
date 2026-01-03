import pokeball from '../assets/pokeball.png'

function Navbar() {
  return (
    <header className="text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <img
            src={pokeball}
            alt="Pokéball"
            className="w-9 h-9 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
          />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] text-center">
            Pokédex
          </h1>
        </div>
      </div>
    </header>
  )
}

export default Navbar
