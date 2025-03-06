


import useBoardState from "../utils/boardState";
import setId from "../utils/setId";
import setSrs from "../utils/setSrs";
import setClass from "../utils/setClass";
import { useEffect } from "react";
import checkEffects from "../utils/checkEffects";

const Boxes = () =>{
    const currentPosition = useBoardState((state) => state.currentPosition);
    const boardState =  useBoardState((state)=>state);
    const checkPiecesPath = useBoardState((state)=> state.checkPiecesPath);
    const hasMoves = useBoardState((state)=> state.hasMoves);
    const isCheck = useBoardState((state)=> state.isCheck);
    const isDoubleCheck = useBoardState((state)=> state.isDoubleCheck);

    const tileState = useBoardState((state)=>state);

    const currentTiles = useBoardState((state)=>state.currentTiles);
    const BoxArrangement = ()=>{
        
        
        
        let bgColor = ''
        let id  = ''
       
        const BoxArrangement = Array(64).fill(0).map((_,i)=>{
       
        switch (true) {
            case i<8:
                id = `${String.fromCharCode(97+i)}8`
                break;
        
            case i<16:
                id = `${String.fromCharCode(97+(i%8))}7`
                break;
        
            case i<24:
                id = `${String.fromCharCode(97+(i%8))}6`
                break;
            case i<32:
                id = `${String.fromCharCode(97+(i%8))}5`
                break;
            case i<40:
                id = `${String.fromCharCode(97+(i%8))}4`
                break;
            case i<48:
                id = `${String.fromCharCode(97+(i%8))}3`
                break;
            case i<56:
                id = `${String.fromCharCode(97+(i%8))}2`
                break;
            case i<64:
                id = `${String.fromCharCode(97+(i%8))}1`
                break;
        
            default:
                break;
        }

        if (id == currentPosition) {
            if (hasMoves) {
                bgColor = 'bg-[#fff111]';
            }
            else{
                bgColor = 'bg-[#D7D3BF]';
            }
        }
        else if (Math.floor(i/8)%2) {
            bgColor = i%2 ? 'bg-[#EBECD0]' : 'bg-[#739552]'    
        }
        else{
            bgColor = i%2 ? 'bg-[#739552]' : 'bg-[#EBECD0]'    
        }

        
            
            
        return( <li key={i}
            className={`relative w-[100%] aspect-square ${bgColor} list-none `}
            id={id}>
                {currentTiles[id]
                ?
                    <img src={setSrs(id,currentTiles)}
                    id={setId(id,currentTiles)}
                    className={`${setClass(id,currentTiles)} absolute w-[65%] left-[15%]` }/>
                    
                :null}
            </li>)
        })

        
        
        return BoxArrangement
    }

    useEffect(()=>{
        
        if (isCheck||isDoubleCheck){

            if (isCheck) {            
                
                
                if (Object.keys(checkPiecesPath).length) {

                    
                    checkEffects(boardState,tileState);
                }
                
            }
            if (isDoubleCheck) {
                // let checkPiece1 = Object.keys(checkPiecesPath)[0];
                // let checkPiece2 = Object.keys(checkPiecesPath)[1];
                
                
                if (Object.keys(checkPiecesPath).length) {
                    
                    
                    checkEffects(boardState,tileState);
                }
                
            }
        }
        
    },[checkPiecesPath])


    return(
        <BoxArrangement/>
        
    )
}

export default Boxes