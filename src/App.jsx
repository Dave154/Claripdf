import './App.css'
import Root from './Pages/root.jsx'
import Generated from './Pages/generated.jsx'
import Navigation from './components/navigation.jsx'
import {Routes,Route} from 'react-router-dom'

const App =()=> {

  return (
    <main>
      <Navigation/>
      <Routes>
        <Route path='/' element={<Root/>}/>
        <Route path='/generated' element={<Generated/>}/>
      </Routes>
    </main>
  )
}

export default App
