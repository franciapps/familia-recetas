import { useState } from 'react'
import { Home, Calendar, ShoppingCart, Settings as SettingsIcon } from 'lucide-react'
import TodayView from './components/TodayView.jsx'
import WeekView from './components/WeekView.jsx'
import ShoppingList from './components/ShoppingList.jsx'
import Settings from './components/Settings.jsx'

const TABS = [
  { id: 'hoy', label: 'Hoy', Icon: Home },
  { id: 'semana', label: 'Semana', Icon: Calendar },
  { id: 'super', label: 'Súper', Icon: ShoppingCart },
  { id: 'ajustes', label: 'Ajustes', Icon: SettingsIcon },
]

function App() {
  const [activeTab, setActiveTab] = useState('hoy')

  const renderTab = () => {
    switch (activeTab) {
      case 'hoy':
        return <TodayView />
      case 'semana':
        return <WeekView />
      case 'super':
        return <ShoppingList />
      case 'ajustes':
        return <Settings />
      default:
        return <TodayView />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative">
      {/* Main content scrollable area */}
      <div className="flex-1 overflow-y-auto pb-16">
        {renderTab()}
      </div>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 flex z-50 safe-area-pb">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
              activeTab === id
                ? 'text-emerald-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default App
