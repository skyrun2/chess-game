
import { useEffect} from "react";
import BottomLetter from "./bottomLetter";
import Boxes from "./boxes";
import LeftNum from "./leftNums";
import useBoardState from "../utils/boardState";
import legalMoves from "../utils/legalMoves";
import useTiles from "../utils/useTiles";

import showPossibleMoves from "../utils/showPossibleTiles";

import pieceSet from "../utils/pieceSet";
import checkChecker from "../utils/checkChecker";

import handleSetCurrentPosition from "@/utils/handleSetCurrentPosition";
import handleSetId from "@/utils/handleSetId";
import handleSetNewPosition from "@/utils/handleSetNewPosition";
import handleAddCapturedPieces from "@/utils/handleAddCapturedPieces";
import handleSetTileHistory from "@/utils/handleSetTileHistory";
import handleSetCheckLevel from "@/utils/handleSetCheckLevel";
import handleSetNotations from "@/utils/handleSetNotations";
import handleSetTiles from "@/utils/handleSetTiles";




const Board = () =>{
    const addCapturedPieces = useBoardState((state)=> state.addCapturedPieces);
    const blackKingPosition = useBoardState((state)=> state.blackKingPosition);
    const boardState = useBoardState((state) => state);
    
    const checkPiecesPath =  useBoardState((state)=> state.checkPiecesPath);
    const countForMoves = useBoardState((state)=>state.countForMoves);
    const currentPosition = useBoardState((state) => state.currentPosition);
    const currentTiles = useTiles((state) => state.currentTiles);
    const id = useBoardState((state)=>state.id);

    const isCheck = useBoardState((state)=>state.isCheck);
    const isDoubleCheck = useBoardState((state)=>state.isDoubleCheck);
    const isPieceToMove = useBoardState((state) => state.isPieceToMove);
    const isPresentTiles = useTiles((state)=> state.isPresentTiles);
    const moveNotation = useBoardState((state) => state.moveNotation);
    const moveCount = useBoardState((state) => state.moveCount);
    const newPosition = useBoardState((state) => state.newPosition);
    // const NewBoardPosition = useBoardState((state) => state.NewBoardPosition);
    const notationOrder = useBoardState((state)=> state.notationOrder);
    const pieceToMove = useBoardState((state) => state.pieceToMove);
    // const pieceMoveNotation = useBoardState((state) => state.pieceMoveNotation);
    const passant =  useBoardState((state)=> state.passant);
    // const pieceToMoveClass = useBoardState((state)=> state.pieceToMoveClass);
    const possibleMoveTiles = useTiles((state)=>state.possibleMoveTiles);
    const setCheckLevel =  useBoardState((state)=> state.setCheckLevel);
    const setCurrentPosition = useBoardState((state) => state.setCurrentPosition);
    const setId = useBoardState((state)=>state.setId);
    const setHasMoves = useBoardState((state)=> state.setHasMoves);
    // const setIsPieceToMove = useBoardState((state) => state.setIsPieceToMove);
    const setNewPosition = useBoardState((state) => state.setNewPosition);
    const setNotations = useBoardState((state)=> state.setNotations);
    const setPossibleMoveTiles = useTiles((state)=>state.setPossibleMoveTiles);
    const setTiles = useTiles((state)=>state.setTiles);
    const setTilesHistory = useTiles((state)=>state.setTilesHistory);
    const setTurn =  useBoardState((state)=> state.setTurn);
    const tiles = useTiles((state)=>state.tiles);
    const tileState = useTiles((state)=>state)
    const turn =  useBoardState((state)=> state.turn);
    const whiteKingPosition = useBoardState((state)=> state.whiteKingPosition);
    const unSetCheckLevel =  useBoardState((state)=> state.unSetCheckLevel);
    

    let payload = {};
    
    
    
    
    const handleOnClick = (e) => {
        // let relativeX = e.target.getBoundingClientRect().x - e.currentTarget.getBoundingClientRect().x; 
        // let relativeY = e.target.getBoundingClientRect().y - e.currentTarget.getBoundingClientRect().y;
        
        // const position = {
        //     boardRelativeX:Math.ceil(relativeX/64),
        //     boardRelativeY: Math.ceil(relativeY/64),
        // }
        
        let box = e.target.parentElement;
        let emptyTile = e.target;
        let id = e.target.parentElement.id;
        let piece = e.target.id;
        
        
        payload = {};
        
        

        switch (true) {
            case e.target.id == 'notation':
                break;

            case isPieceToMove && (currentPosition == id) && isPresentTiles:                
                console.log('piece did not move');
                payload = {...handleSetCurrentPosition('',false,boardState,tileState)};
                setCurrentPosition(payload);

                break;

            case isPieceToMove && !id:
                console.log('moved to empty tile');

                
                payload = {...handleSetId(emptyTile.id,false)};

                setId(payload);

                break;

            case isPieceToMove && (currentPosition != id) && pieceSet(tiles[id]) !== pieceSet(tiles[currentPosition]):

                console.log('capture');

                payload = {...handleSetId(id,false)};

                setId(payload);

                break;


            case !!tiles[id] && isPresentTiles:
                // if (pieceSet(tiles[id]) == turn){
                    console.log('piece to move');
                    payload = {...handleSetCurrentPosition(id,true,boardState,tileState)}
                    console.log(payload);
                    
                    setCurrentPosition(payload);
                // }
                
                break;

            default:
                break;
        }

    }
    
    useEffect(()=>{
        
        
        console.log({isPresentTiles});
        
        
        if (isPieceToMove && (currentPosition != id) && pieceSet(tiles[id]) !== pieceSet(tiles[currentPosition])) {
            
            payload = {...handleSetNewPosition(boardState,tileState)};
            
            setNewPosition(payload);

            payload = {...handleAddCapturedPieces(boardState,tileState)};
            addCapturedPieces(payload);
            
            
            
            


            if (isCheck) {
                
                if (pieceToMove.slice(-4) !== 'king') {
                    if (checkPiecesPath[id]) {
                        unSetCheckLevel();
                    }
                }
                else{
                    if (!checkPiecesPath[id]) {
                        
                        unSetCheckLevel();
                    }
                }
            }
            if (!(countForMoves[whiteKingPosition]&&countForMoves[blackKingPosition])) {
                unSetCheckLevel()
            }
            
        }
        else if (isPieceToMove && !id) {
            

            payload = {...handleSetNewPosition(boardState,tileState)};
            setNewPosition(payload);

            payload = {...handleAddCapturedPieces(boardState,tileState)};
            addCapturedPieces(payload);
            
            
            setNewPosition(payload);

            
            if (isCheck) {    
                if (pieceToMove.slice(-4) !== 'king') {
                    if (checkPiecesPath[id]) {
                        unSetCheckLevel();
                    }
                }
                else{
                    if (!checkPiecesPath[id]) {
                        unSetCheckLevel();
                    }
                }
            }
            if (!(countForMoves[whiteKingPosition]&&countForMoves[blackKingPosition])) {
                unSetCheckLevel()
            }
                    
        }

        
    },[id])

    useEffect(()=>{
        
        if (boardState.isPieceToMove) {
            console.log(pieceToMove);
            
            console.log((legalMoves(boardState,tileState)));
            if (Object.keys(legalMoves(boardState,tileState)).length) {
                payload.hasMoves = true;
                setHasMoves(payload);
                setPossibleMoveTiles(legalMoves(boardState,tileState)); 
            }
            else {
                payload.hasMoves = false;
                setHasMoves(payload);
            }
        }
    },[currentPosition])

    useEffect(()=>{
        if(boardState.isPieceToMove){   
            showPossibleMoves(possibleMoveTiles);
        }
    },[possibleMoveTiles])

    useEffect(()=>{
        
        
        if (possibleMoveTiles[newPosition]) {
            

            payload = {...handleSetTiles(boardState)};
            console.log({payload});
            
            setTiles(payload);
            payload = {...handleSetNotations(boardState)};
            setNotations(payload);
            setTurn();
        }
        else{
            console.log('not allowed');
            
        }
        

    },[newPosition])

    useEffect(()=>{
        
        
        payload.pieceToMove = pieceToMove;
        console.log(checkChecker(payload,boardState,tiles));
        

        if (checkChecker(payload,boardState,tiles)){
            let cc = checkChecker(payload,boardState,tiles);
            payload  = {... handleSetCheckLevel(boardState,tileState,cc)}
            setCheckLevel(payload);
        }        
    },[moveNotation])

    

    useEffect(()=>{

        payload = {...handleSetTileHistory(boardState,tileState)};

        
        setTilesHistory(payload);
        
    },[notationOrder])


    
    

    return(
        <div className=' relative w-[35rem] aspect-square border border-black grid grid-cols-8 '  onClick={e=>handleOnClick(e)}>
            
            <Boxes/>
            <LeftNum/>
            <BottomLetter/>
        </div>
    )
}

export default Board;