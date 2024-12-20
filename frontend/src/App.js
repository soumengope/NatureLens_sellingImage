import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Header from './Components/Header';
import Homepage from './Components/Homepage';
import PhotosLists from './Components/PhotosLists';
import PhotoDetails from './Components/PhotoDetails';
import Errorpage from './Errorpage';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/photosLists" element={<PhotosLists/>}/>
          <Route path="/photosLists/:id" element={<PhotoDetails/>}/>
          <Route path='*' element={<Errorpage/>} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
