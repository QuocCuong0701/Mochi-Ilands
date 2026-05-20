import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import IslandMap from './pages/IslandMap'
import FeedTheWord from './pages/FeedTheWord'
import SayIt from './pages/SayIt'
import FeedScreen from './pages/FeedScreen'

// Component gốc định nghĩa tất cả route của app
const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/map" element={<IslandMap />} />
    <Route path="/game/feed-the-word/:islandId/:levelId" element={<FeedTheWord />} />
    <Route path="/game/say-it/:islandId/:levelId" element={<SayIt />} />
    <Route path="/feed" element={<FeedScreen />} />
  </Routes>
)

export default App
