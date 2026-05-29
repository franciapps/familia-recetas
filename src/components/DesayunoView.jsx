const IDEAS_SEMANA = [
  {
    nombre: 'Pancakes',
    emoji: '🥞',
    descripcion: 'Con mantequilla, miel de maple o fruta fresca. Para Franci: pancake machacado con plátano.',
  },
  {
    nombre: 'Bowl de frutti rossi',
    emoji: '🍓',
    descripcion: 'Yogurt con granola, frutos rojos, banana y un chorrito de miel.',
  },
  {
    nombre: 'Avocado toast con semi di girasole',
    emoji: '🥑',
    descripcion: 'Pan tostado con aguacate machacado, semillas de girasol, sal y limón. Opcional: huevo pochado.',
  },
]

const IDEAS_FINDE = [
  {
    nombre: 'Full Breakfast',
    emoji: '🍳',
    descripcion: 'Dos huevos pochados, sourdough tostado, bacon, salchicha de pollo, aguacate machacado, chorizo baked beans y hash browns.',
    fuente: 'Citizen — Chelsea',
  },
  {
    nombre: 'French Toast con frutos rojos',
    emoji: '🍞',
    descripcion: 'Pan brioche empapado en mezcla de huevo y vainilla, dorado en mantequilla. Con frutos rojos, miel de maple y azúcar glass.',
    fuente: 'Citizen — Chelsea',
  },
  {
    nombre: 'Classic Breakfast',
    emoji: '🍽️',
    descripcion: 'Huevos a tu gusto, sourdough tostado con elección de bacon, aguacate o salchicha de pollo. Con greens o hash browns.',
    fuente: 'Citizen — Chelsea',
  },
]

export default function DesayunoView() {
  return (
    <div className="pb-6">
      <div className="bg-orange-500 text-white px-4 py-3">
        <p className="text-xs uppercase tracking-wider opacity-80">Ideas para el</p>
        <h1 className="text-lg font-bold">Desayuno</h1>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {/* Weekday ideas */}
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Entre semana</p>
        {IDEAS_SEMANA.map((idea) => (
          <div key={idea.nombre} className="bg-white border border-orange-100 rounded-xl shadow-sm p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{idea.emoji}</span>
              <div>
                <h2 className="text-sm font-bold text-gray-900">{idea.nombre}</h2>
                <p className="text-xs text-gray-500 mt-0.5">{idea.descripcion}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Weekend ideas from Citizen Chelsea */}
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide pt-2">Fin de semana — inspiración Citizen Chelsea 🌟</p>
        {IDEAS_FINDE.map((idea) => (
          <div key={idea.nombre} className="bg-amber-50 border border-amber-100 rounded-xl shadow-sm p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{idea.emoji}</span>
              <div>
                <h2 className="text-sm font-bold text-gray-900">{idea.nombre}</h2>
                <p className="text-xs text-gray-600 mt-0.5">{idea.descripcion}</p>
                <p className="text-xs text-amber-600 mt-1 font-medium">{idea.fuente}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
