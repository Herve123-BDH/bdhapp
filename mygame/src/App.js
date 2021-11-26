import './App.css';
import {Navbar} from './Component/Navbar'
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Routes} from 'react-router-dom'
import {TextPost} from './Component/TextPost'
import { Modify } from './Component/Modify';
import { Delete } from './Component/Delete';
import {Home} from './Component/Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {getpost} from './feature/postSlice'
import {View} from './Component/View'
function App() {
  const dispatch=useDispatch()
  const run=()=>{
    axios.get("https://bdh.herokuapp.com/post/allpost")
    .then(data=>dispatch(getpost({
      allpost: data.data
    })))
  }
  run()
  return (
    <Router>
        <>
            <div className="App">
            <Navbar/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/newpost/' element={<TextPost/>}/>
              <Route path='/updatepost' element= {<Modify/>}/>
              <Route path='/deletepost' element= {<Delete/>}/>
              <Route path='/allpost' element={<View/>}/>
            </Routes>
          </div>
        </>
    </Router>
  );
}

export default App;
