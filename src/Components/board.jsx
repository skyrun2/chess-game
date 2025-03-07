
import { useEffect, useState } from "react";
import BottomLetter from "./bottomLetter";
import Boxes from "./boxes";
import LeftNum from "./leftNums";
import useBoardState from "../utils/boardState";



import showPossibleMoves from "../utils/showPossibleTiles";

import pieceSet from "../utils/pieceSet";
import checkChecker from "../utils/checkChecker";
import handleSetNewPosition from "@/utils/handleSetNewPosition";
import handleAddCapturedPieces from "@/utils/handleAddCapturedPieces";
import handleSetTileHistory from "@/utils/handleSetTileHistory";
import handleSetCheckLevel from "@/utils/handleSetCheckLevel";
import handleSetNotations from "@/utils/handleSetNotations";
import handleSetTiles from "@/utils/handleSetTiles";



import handleAllMoves from "@/utils/handleAllMoves";
import checkEffects from "@/utils/checkEffects";
import cleanAllMoves from "@/utils/cleanAllMoves";
import countForMoves from "@/utils/countForMoves";
import updateCastlingPieces from "@/utils/updateCastlingPieces";





const Board = () => {
    const addCapturedPieces = useBoardState((state) => state.addCapturedPieces);
    const allMoves = useBoardState((state) => state.allMoves);
    const blackKingPosition = useBoardState((state) => state.blackKingPosition);
    const boardState = useBoardState((state) => state);
    const isCheckMate = useBoardState((state) => state.isCheckMate);
    const castlingPieces = useBoardState((state) => state.castlingPieces);
    const checkPiecesPath = useBoardState((state) => state.checkPiecesPath);
    const count = useBoardState((state) => state.count);
    const currentPosition = useBoardState((state) => state.currentPosition);
    const currentPositionCount = useBoardState((state) => state.currentPositionCount);
    const currentTiles = useBoardState((state) => state.currentTiles);
    const isCheck = useBoardState((state) => state.isCheck);
    const isDoubleCheck = useBoardState((state) => state.isDoubleCheck);
    const isPieceToMove = useBoardState((state) => state.isPieceToMove);
    const isPresentTiles = useBoardState((state) => state.isPresentTiles);
    const newCount = useBoardState((state) => state.newCount);
    const newPosition = useBoardState((state) => state.newPosition);
    const notationOrder = useBoardState((state) => state.notationOrder);
    const pieceToMove = useBoardState((state) => state.pieceToMove);
    const setCheckLevel = useBoardState((state) => state.setCheckLevel);
    const setAllMoves = useBoardState((state) => state.setAllMoves);
    const setAllMovesCount1 = useBoardState((state) => state.setAllMovesCount1);
    const setCurrentPosition = useBoardState((state) => state.setCurrentPosition);
    const setInitialMoves = useBoardState((state) => state.setInitialMoves);
    const setNewPosition = useBoardState((state) => state.setNewPosition);
    const setNotations = useBoardState((state) => state.setNotations);
    const setTiles = useBoardState((state) => state.setTiles);
    const setTileChangeIndicator = useBoardState((state)=>state.setTileChangeIndicator);
    const setTilesHistory = useBoardState((state) => state.setTilesHistory);
    const setTurn = useBoardState((state) => state.setTurn);
    const tileChangeIndicator = useBoardState((state)=>state.tileChangeIndicator);
    const turn = useBoardState((state) => state.turn);
    const whiteKingPosition = useBoardState((state) => state.whiteKingPosition);
    const unSetCheckLevel = useBoardState((state) => state.unSetCheckLevel);


    let payload = {};


    const [prevCurrentPosition,setPrevCurrentPosition] = useState(null);
    
    


    const handleOnClick = (e) => {
        
        
        let emptyTile = e.target;
        let id = e.target.parentElement.id;
        
        
        let pieceToMoveDoubleTap = false;
        let toEmptyTile = false;
        let toCapture = false ;
        let activatePieceToMove = false;
        let switchPieceToMove = false;

        if(!prevCurrentPosition && !currentPosition && id.length && isPresentTiles && !isCheckMate) activatePieceToMove = true;
        if(currentPosition){
            if(id.length) {
                if(allMoves[currentPosition].path[id] && prevCurrentPosition)  toCapture = true;
                else if ( currentPosition == id && isPresentTiles && !isCheckMate ) pieceToMoveDoubleTap = true;
                else if ( currentPosition !== id && isPresentTiles && !isCheckMate)  switchPieceToMove = true;
            }
            else if ( !id.length) {
                if(allMoves[currentPosition].path[emptyTile.id]) toEmptyTile = true;

            }
            
        }
        
        
        
        switch (true) {
            case e.target.id == 'notation':
                break;

            case pieceToMoveDoubleTap:
                console.log('piece did not move');
                setCurrentPosition('', false);                
                setPrevCurrentPosition(null);
                
                break;

            case toEmptyTile : {
                
                console.log('moved to empty tile');
                let copyBs = boardState;
                copyBs.id = emptyTile.id
                
                console.log(updateCastlingPieces(copyBs,"toEmptyTile"));
                payload = { ...handleSetNewPosition(copyBs) };
                
                setNewPosition(payload);
                setPrevCurrentPosition(null);
                setTurn();

                payload = { ...handleAddCapturedPieces(boardState) };
                

                if (isCheck) {
                    if (pieceToMove.slice(-4) !== 'king') {
                        if (checkPiecesPath[id]) {
                            unSetCheckLevel();
                        }
                    }
                    else {
                        if (!checkPiecesPath[id]) {
                            unSetCheckLevel();
                        }
                    }
                }
                if (!(countForMoves[whiteKingPosition] && countForMoves[blackKingPosition])) {
                    unSetCheckLevel()
                }    
                

                break;
            }

            case toCapture : {

                console.log('capture'); 
            
                let copyBs = boardState;
                copyBs.id = id;
                
                console.log(updateCastlingPieces(copyBs,"toCapture"));
                
                payload = { ...handleSetNewPosition(copyBs) };

                
                setNewPosition(payload);
                setPrevCurrentPosition(null);
                addCapturedPieces(payload);
                setTurn();



                if (isCheck) {

                    if (pieceToMove.slice(-4) !== 'king') {
                        if (checkPiecesPath[id]) {
                            unSetCheckLevel();
                        }
                    }
                    else {
                        if (!checkPiecesPath[id]) {

                            unSetCheckLevel();
                        }
                    }
                }
                if (!(countForMoves[whiteKingPosition] && countForMoves[blackKingPosition])) {
                    unSetCheckLevel()
                }

                
                


                break;
            }
            case switchPieceToMove: {
                                    
                if (pieceSet(currentTiles[id]) == turn){
                    console.log('switched piece to move');

                    
                    setCurrentPosition(id, true);      
                    setPrevCurrentPosition(id);

                    
                    }

                    

                
                break;
            }
            case activatePieceToMove:
                                
                
                    if (pieceSet(currentTiles[id]) == turn){
                    console.log('piece to move');

                    
                    setCurrentPosition(id, true);      
                    setPrevCurrentPosition(id);

                    
                    }
                
                break;

            default:
                break;
        }

        
        
    }
    
    useEffect(()=>{
        console.log({initial:"set Initial"});
        let ham = handleAllMoves(boardState);
        let allMoves = ham.moves;
        let cfm = ham.cfm;
        let copyBs = {...boardState};
        copyBs.allMoves = allMoves;
        copyBs.cfm = cfm;
        setInitialMoves(cleanAllMoves(copyBs));

    },[])

    useEffect(()=>{     


        
        if (isPieceToMove) {
            if (currentPosition) {
                console.log({show:"show moves"});
                if (allMoves) {
                    if (allMoves[currentPosition]) {                                                        
                        showPossibleMoves(allMoves[currentPosition].path);            
                    }               
                }                    
            }            
        }
    },[currentPositionCount])

    useEffect(()=>{               
        if (newPosition) {
            
            console.log({setTiles:"set tiles"});
            setTiles(handleSetTiles(boardState));              
            setTileChangeIndicator();            
        
        }    
    
    },[newCount])

    useEffect(()=>{      
        if (tileChangeIndicator > 0) {
            console.log({moves:"set moves"});           
            setAllMoves(handleAllMoves(boardState));            

        }
    },[tileChangeIndicator])


    useEffect(()=>{         
        console.log({castlingPieces});
        
        if (setAllMovesCount1 > 0) {            
            console.log({checkLevel:"check level"});            
            let payload =  handleSetCheckLevel(checkChecker(boardState,currentTiles));
            payload.count = count+1;
            setCheckLevel(payload);
            
        }
    },[setAllMovesCount1])

    useEffect(()=>{        
        
        if(count > 0){
            console.log({clean:"clean moves"});        
        
            if (isCheck||isDoubleCheck) {
                checkEffects(boardState);     
            } 
            
            setNotations(handleSetNotations(boardState));
        }
        
    },[count])
    useEffect(()=>{
        setTilesHistory(handleSetTileHistory(boardState));
        
    },[notationOrder])

    return (       
        <div
            
            className=' relative w-[80%] max-[999px]:w-[50%] max-[700px]:w-[70%]  max-[450px]:w-[80%]  aspect-square border border-black grid grid-cols-8 ' onClick={e => handleOnClick(e)}>

            <Boxes />
            <LeftNum />  
            <BottomLetter />

        </div>
    )
}

export default Board;    

