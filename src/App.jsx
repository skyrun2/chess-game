
import Board from './Components/board';
import './App.css';
import {useReducer } from 'react';
import reducer from './utils/ruducer';
import {create} from 'zustand';

const defaultState = {
  currentPosition :{},
  newPosition : {1:1,2:2},
  pieceToMove:'',
  isPieceToMove:false,
  pieceMoveNotation:[],
  moveNotation:'',
  moveCount:0
  
}
const useStore = create((set) => ({
  bears:0,
  currentPosition :{},
  newPosition : {1:1,2:2},
  pieceToMove:'',
  isPieceToMove:false,
  pieceMoveNotation:[],
  moveNotation:'',
  moveCount:0,
  increasePopulation:()=>set((state) => ({bears:state.bears + 1})),
  removeAllBears: () => set({bears:0}),
  updateBears: (newBears) => set({bears:newBears}),
}))

function App() {
  const [state,dispatch]  = useReducer(reducer, defaultState)

  return (
    <>
      <div className='w-full h-fit relative '>
        
          <Board state={state} dispatch= {dispatch} useStore = {useStore}></Board>
          {/* <BoardCard></BoardCard> */}
      </div>
    </>
  )
} 

export default App
