import BoardCard from './Components/BoardCard';

import './App.css';
import NotationBar from './Components/notationBar';
import Blackout from './Components/blackout';


function App() {
  

  return (
    <>
      <div className="@container/main">
        <div
         className=' relative w-[100%] h-fit flex items-end justify-around
                    max-[999px]:flex-col max-[999px]:items-center'>
            <BoardCard/>
            <NotationBar/>
            <Blackout/>
        </div>
      </div>
    </>
  )
} 

export default App
