import BoardCard from './Components/BoardCard';

import './App.css';
import NotationBar from './Components/notationBar';
import Blackout from './Components/blackout';


function App() {
  

  return (
    <>
      <div 
       className=' relative w-[100%] h-fit flex items-end justify-around '>
          <BoardCard/>
          <NotationBar/>
          <Blackout/>
      </div>
    </>
  )
} 

export default App
