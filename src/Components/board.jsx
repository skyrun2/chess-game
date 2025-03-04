
import { useEffect, useState } from "react";
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
import legalMoves from "@/utils/legalMoves";
import checkEffects from "@/utils/checkEffects";
import cleanAllMoves from "@/utils/cleanAllMoves";
import countForMoves from "@/utils/countForMoves";





const Board = () => {
    const addCapturedPieces = useBoardState((state) => state.addCapturedPieces);
    const allMoves = useBoardState((state) => state.allMoves);
    const blackKingPosition = useBoardState((state) => state.blackKingPosition);
    const boardState = useBoardState((state) => state);
    const checkMate = useBoardState((state) => state.checkMate);
    const checkPiecesPath = useBoardState((state) => state.checkPiecesPath);
    const count = useBoardState((state) => state.count);
    const currentPosition = useBoardState((state) => state.currentPosition);
    const currentTiles = useBoardState((state) => state.currentTiles);
    const id = useBoardState((state) => state.id);

    const isCheck = useBoardState((state) => state.isCheck);
    const isDoubleCheck = useBoardState((state) => state.isDoubleCheck);
    const isPieceToMove = useBoardState((state) => state.isPieceToMove);
    const isPresentTiles = useBoardState((state) => state.isPresentTiles);
    const moveNotation = useBoardState((state) => state.moveNotation);
    const newCount = useBoardState((state) => state.newCount);
    const newPosition = useBoardState((state) => state.newPosition);
    // const NewBoardPosition = useBoardState((state) => state.NewBoardPosition);
    const notCheck = useBoardState((state)=>state.notCheck);
    const notationOrder = useBoardState((state) => state.notationOrder);
    const pieceToMove = useBoardState((state) => state.pieceToMove);
    // const pieceMoveNotation = useBoardState((state) => state.pieceMoveNotation);
    // const pieceToMoveClass = useBoardState((state)=> state.pieceToMoveClass);
    const possibleMoveTiles = useBoardState((state) => state.possibleMoveTiles);
    const reviewMode = useBoardState((state) => state.reviewMode);
    const setCheckLevel = useBoardState((state) => state.setCheckLevel);
    const setAllMoves = useBoardState((state) => state.setAllMoves);
    const setAllMovesCount1 = useBoardState((state) => state.setAllMovesCount1);
    const setCleanAllMoves = useBoardState((state) => state.setAllMoves);
    const setCleanAllMovesCount = useBoardState((state) => state.setCleanAllMovesCount);
    const setCurrentPosition = useBoardState((state) => state.setCurrentPosition);
    const setId = useBoardState((state) => state.setId);
    const setInitialMoves = useBoardState((state) => state.setInitialMoves);
    const setHasMoves = useBoardState((state) => state.setHasMoves);
    // const setIsPieceToMove = useBoardState((state) => state.setIsPieceToMove);
    const setNewPosition = useBoardState((state) => state.setNewPosition);
    const setNotations = useBoardState((state) => state.setNotations);
    const setPossibleMoveTiles = useBoardState((state) => state.setPossibleMoveTiles);
    const setTiles = useBoardState((state) => state.setTiles);
    const setTileChangeIndicator = useBoardState((state)=>state.setTileChangeIndicator);
    const setTilesHistory = useBoardState((state) => state.setTilesHistory);
    const setCurrentView = useBoardState((state) => state.setCurrentView);
    const setTurn = useBoardState((state) => state.setTurn);
    const tileChangeIndicator = useBoardState((state)=>state.tileChangeIndicator);
    const tiles = useBoardState((state) => state.tiles);
    const turn = useBoardState((state) => state.turn);
    const whiteKingPosition = useBoardState((state) => state.whiteKingPosition);
    const unSetCheckLevel = useBoardState((state) => state.unSetCheckLevel);


    let payload = {};


    const [prevCurrentPosition,setPrevCurrentPosition] = useState(null);
    


    const handleOnClick = (e) => {
        
        
        let emptyTile = e.target;
        let id = e.target.parentElement.id;
        
        

        let pieceToMoveDoubleTap =  (currentPosition == id) && isPresentTiles;
        let toEmptyTile =  !!prevCurrentPosition && (id.length == 0);
        let toCapture = !!prevCurrentPosition &&  (id.length > 0) ;        
        let activatePieceToMove = !!currentTiles[id] && isPresentTiles;
        if (activatePieceToMove) setPrevCurrentPosition(id);
        if(toEmptyTile||toCapture) setPrevCurrentPosition(null);

        
        switch (true) {
            case e.target.id == 'notation':
                break;

            case pieceToMoveDoubleTap:
                console.log('piece did not move');
                setCurrentPosition('', false);                

                break;

            case toEmptyTile: {
                console.log('moved to empty tile');
                
                let legalMove = allMoves[currentPosition].path[emptyTile.id];
                if (legalMove) {
                    let copyBs = boardState;
                    copyBs.id = emptyTile.id
                    
                    
                    payload = { ...handleSetNewPosition(copyBs) };
                    
                    setNewPosition(payload);

                    payload = { ...handleAddCapturedPieces(boardState) };
                    addCapturedPieces(payload);

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
                }
                else console.log("Move not allowed");
                
                



                // payload = {...handleSetId(emptyTile.id,false)};

                // setId(payload);

                break;
            }

            case toCapture: {

                console.log('capture'); 
                let legalMove = allMoves[currentPosition].path[id];               
                if (legalMove) {
                    let copyBs = boardState;
                    copyBs.id = id;
                    
                    console.log({id:copyBs.id,currentPosition});
                    
                    payload = { ...handleSetNewPosition(copyBs) };
                    console.log(payload);
                    
                    setNewPosition(payload);



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

                }
                else console.log("Capture not allowed");
                
                


                break;
            }

            case activatePieceToMove:
                if (!checkMate) {
                    // console.log({id,et:emptyTile.id});
                    // if (pieceSet(tiles[id]) == turn){
                    console.log('piece to move');
                    
                    setCurrentPosition(id, true);                    
                    
                    // }
                }

                break;

            default:
                break;
        }

    }

    useEffect(()=>{
        console.log({initial:"set Initial"});
        
        setInitialMoves(handleAllMoves(boardState));                
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
    },[currentPosition])

    useEffect(()=>{               
        if (newPosition) {
            
            console.log({setTiles:"set tiles"});
            setTiles(handleSetTiles(boardState));  
            setTileChangeIndicator();            
        
        }    
    
    },[newCount])

    useEffect(()=>{      
        if (tileChangeIndicator > 0) {
            console.log({moves:"set moves",tileChangeIndicator});           
            setAllMoves(handleAllMoves(boardState));            
        }
    },[tileChangeIndicator])


    useEffect(()=>{         
        if (setAllMovesCount1 > 0) {
            console.log({checkLevel:"check level",count,setAllMovesCount1});            
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
            console.log({...handleSetNotations(boardState)});
            
            setNotations(handleSetNotations(boardState))
        }
        
    },[count])

    return (       
        <div
            id={(checkMate && !reviewMode) ? 'blur' : ''}
            className=' relative w-[80%] max-[999px]:w-[50%] max-[700px]:w-[70%]  max-[450px]:w-[80%]  aspect-square border border-black grid grid-cols-8 ' onClick={e => handleOnClick(e)}>

            <Boxes />
            <LeftNum />  
            <BottomLetter />

        </div>
    )
}

export default Board;    

