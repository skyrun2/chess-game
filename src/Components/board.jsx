
import { useEffect} from "react";
import BottomLetter from "./bottomLetter";
import Boxes from "./boxes";
import LeftNum from "./leftNums";
import useBoardState from "../utils/boardState";

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



import handleAllMoves from "@/utils/handleAllMoves";





const Board = () =>{
    const addCapturedPieces = useBoardState((state)=> state.addCapturedPieces);
    const allMoves = useBoardState((state)=> state.allMoves);
    const blackKingPosition = useBoardState((state)=> state.blackKingPosition);
    const boardState = useBoardState((state) => state);
        const checkMate = useBoardState((state)=>state.checkMate);
    const checkPiecesPath =  useBoardState((state)=> state.checkPiecesPath);
    const countForMoves = useBoardState((state)=>state.countForMoves);
    const currentPosition = useBoardState((state) => state.currentPosition);    
    const id = useBoardState((state)=>state.id);

    const isCheck = useBoardState((state)=>state.isCheck);
    const isPieceToMove = useBoardState((state) => state.isPieceToMove);
    const isPresentTiles = useTiles((state)=> state.isPresentTiles);
    const moveNotation = useBoardState((state) => state.moveNotation);
    const newPosition = useBoardState((state) => state.newPosition);
    // const NewBoardPosition = useBoardState((state) => state.NewBoardPosition);
    const notationOrder = useBoardState((state)=> state.notationOrder);
    const pieceToMove = useBoardState((state) => state.pieceToMove);
    // const pieceMoveNotation = useBoardState((state) => state.pieceMoveNotation);
    // const pieceToMoveClass = useBoardState((state)=> state.pieceToMoveClass);
    const possibleMoveTiles = useTiles((state)=>state.possibleMoveTiles);
    const reviewMode = useBoardState((state)=>state.reviewMode);
    const setAllMoves =  useBoardState((state)=> state.setAllMoves);
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
    const setCurrentView = useTiles((state)=>state.setCurrentView);
    const setTurn =  useBoardState((state)=> state.setTurn);
    const tiles = useTiles((state)=>state.tiles);
    const tileState = useTiles((state)=>state);
    const turn =  useBoardState((state)=> state.turn);
    const whiteKingPosition = useBoardState((state)=> state.whiteKingPosition);
    const unSetCheckLevel =  useBoardState((state)=> state.unSetCheckLevel);
    

    let payload = {  };
    
    
    
    
    
    const handleOnClick = (e) => {
        // let relativeX = e.target.getBoundingClientRect().x - e.currentTarget.getBoundingClientRect().x; 
        // let relativeY = e.target.getBoundingClientRect().y - e.currentTarget.getBoundingClientRect().y;
        
        // const position = {
        //     boardRelativeX:Math.ceil(relativeX/64),
        //     boardRelativeY: Math.ceil(relativeY/64),
        // }
        

        let emptyTile = e.target;
        let id = e.target.parentElement.id;
        
        switch (true) {
            case e.target.id == 'notation':
                break;

            case isPieceToMove && (currentPosition == id) && isPresentTiles:                
                console.log('piece did not move');
                payload = {...handleSetCurrentPosition('',false,boardState,tileState)};
                setCurrentPosition(payload);

                break;
 
            case isPieceToMove && !id:{
                console.log('moved to empty tile');
                let copyBs = boardState;
                copyBs.id = emptyTile.id
                console.log({currentPosition,newPosition:emptyTile.id,pieceToMove, at:'board'});

                
                payload = {...handleSetNewPosition(copyBs,tileState)};
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
                        
    
                
                // payload = {...handleSetId(emptyTile.id,false)};

                // setId(payload);

                break;
            }

            case isPieceToMove && (currentPosition != id) && pieceSet(tiles[id]) !== pieceSet(tiles[currentPosition]):{

                console.log('capture');
                console.log({currentPosition,newPosition:id,pieceToMove,at:'board'});
                let copyBs = boardState;
                copyBs.id = id

                payload = {...handleSetNewPosition(copyBs,tileState)};
            
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
                
            
                
                // payload = {...handleSetId(id,true)};

                // setId(payload);

                break;
            }

            case !!tiles[id] && isPresentTiles:
                if(!checkMate){
                    if (pieceSet(tiles[id]) == turn){
                    console.log('piece to move');
                    payload = {...handleSetCurrentPosition(id,true,boardState,tileState)}                    
                    setCurrentPosition(payload);
                    }
                }
                
                break;

            default:
                break;
        }

    }
    // useEffect(()=>{
    //     console.log({id,pieceToMove,currentPosition,newPosition});
        
    // },[boardState])

    // useEffect(()=>{
                    
    //     let cPNotNp = currentPosition != id;
    //     let psNotCs = tiles[id]  ? pieceSet(tiles[id]) !== pieceSet(tiles[currentPosition]) : false;
    //     let captureCondition = !!(pieceToMove && cPNotNp && psNotCs);
    //     console.log({boardState});
        
        
    //     if (captureCondition) {
            
    //         payload = {...handleSetNewPosition(boardState,tileState)};
            
    //         setNewPosition(payload);

    //         payload = {...handleAddCapturedPieces(boardState,tileState)};
    //         addCapturedPieces(payload);
                                                
    //         if (isCheck) {
                
    //             if (pieceToMove.slice(-4) !== 'king') {
    //                 if (checkPiecesPath[id]) {
    //                     unSetCheckLevel();
    //                 }
    //             }
    //             else{
    //                 if (!checkPiecesPath[id]) {
                        
    //                     unSetCheckLevel();
    //                 }
    //             }
    //         }
    //         if (!(countForMoves[whiteKingPosition]&&countForMoves[blackKingPosition])) {
    //             unSetCheckLevel()
    //         }
            
            
    //     }
    //     else if (isPieceToMove && id) {
            

    //         payload = {...handleSetNewPosition(boardState,tileState)};
    //         setNewPosition(payload);

    //         payload = {...handleAddCapturedPieces(boardState,tileState)};
    //         addCapturedPieces(payload);                        
            
    //         if (isCheck) {    
    //             if (pieceToMove.slice(-4) !== 'king') {
    //                 if (checkPiecesPath[id]) {
    //                     unSetCheckLevel();
    //                 }
    //             }
    //             else{
    //                 if (!checkPiecesPath[id]) {
    //                     unSetCheckLevel();
    //                 }
    //             }
    //         }
    //         if (!(countForMoves[whiteKingPosition]&&countForMoves[blackKingPosition])) {
    //             unSetCheckLevel()
    //         }
                    
    //     }
        
    // },[id])

    useEffect(()=>{
        payload.allMoves = handleAllMoves(boardState,tileState);
        let allMoves = payload.allMoves
        setAllMoves(payload.allMoves);
                        
        if (checkChecker(payload,boardState,tiles)){
            let cc = checkChecker(payload,boardState,tiles);
            payload  = {... handleSetCheckLevel(boardState,tileState,cc,allMoves)}
            setCheckLevel(payload);
        }        

    },[moveNotation])

    useEffect(()=>{
        
        if (boardState.isPieceToMove) {
            
            if (Object.keys(allMoves[currentPosition]).length) {                
                payload.hasMoves = true;
                setHasMoves(payload);

                
                setPossibleMoveTiles(allMoves[currentPosition]); 
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
    },[tileState])

    useEffect(()=>{
        
        
        console.log({currentPosition,newPosition:newPosition,pieceToMove,at:'newposition useEffect'});
        if (possibleMoveTiles.path) {
            if (possibleMoveTiles.path[newPosition]) {
                

                payload = {...handleSetTiles(boardState)};
                setTiles(payload);
                payload = {...handleSetNotations(boardState,tileState)};
                setNotations(payload);
                setTurn();
            }
            else{
                console.log('not allowed');
                
            }            
        }    
        

    },[newPosition])
    

    useEffect(()=>{

        payload = {...handleSetTileHistory(boardState,tileState)};

        
        setTilesHistory(payload);
        setCurrentView(payload);
        
    },[notationOrder])


    
    

    return(
        <div 
        id={(checkMate && !reviewMode) ? 'blur' : ''}
        className=' relative w-[80%] max-[999px]:w-[50%] max-[700px]:w-[70%]  max-[450px]:w-[80%]  aspect-square border border-black grid grid-cols-8 '  onClick={e=>handleOnClick(e)}>
            
            <Boxes/>
            <LeftNum/>
            <BottomLetter/>
            
        </div>
    )
}

export default Board;