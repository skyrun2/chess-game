import BoardCard from './Components/BoardCard';

import './App.css';
import NotationBar from './Components/notationBar';


function App() {
  

  return (
    <>
      <div 
       className=' w-[100%] h-fit flex items-end justify-around '>
          <BoardCard/>
          <NotationBar/>
      </div>
    </>
  )
} 

export default App
