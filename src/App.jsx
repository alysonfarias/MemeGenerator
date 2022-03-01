import Meme  from './components/Meme'
import Header from './components/Header'
import './App.css'

function App() {
  return (
    <div className="App container-fluid mt-3">
      <div className="row d-flex justify-content-center">
          <div className="col col-sm-8 col-md-6 col-lg-4 col-xl-3">
            <Header/>
            <Meme />
        </div>
      </div>
    </div>
  )
}

export default App
