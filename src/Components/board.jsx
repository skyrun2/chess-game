
import { useEffect } from "react";
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





const Board = () => {
    const addCapturedPieces = useBoardState((state) => state.addCapturedPieces);
    const allMoves = useBoardState((state) => state.allMoves);
    const blackKingPosition = useBoardState((state) => state.blackKingPosition);
    const boardState = useBoardState((state) => state);
    const checkMate = useBoardState((state) => state.checkMate);
    const checkPiecesPath = useBoardState((state) => state.checkPiecesPath);
    const count = useBoardState((state) => state.count);
    const countForMoves = useBoardState((state) => state.countForMoves);
    const currentPosition = useBoardState((state) => state.currentPosition);
    const currentTiles = useTiles((state) => state.currentTiles);
    const id = useBoardState((state) => state.id);

    const isCheck = useBoardState((state) => state.isCheck);
    const isDoubleCheck = useBoardState((state) => state.isDoubleCheck);
    const isPieceToMove = useBoardState((state) => state.isPieceToMove);
    const isPresentTiles = useTiles((state) => state.isPresentTiles);
    const moveNotation = useBoardState((state) => state.moveNotation);
    const newPosition = useBoardState((state) => state.newPosition);
    // const NewBoardPosition = useBoardState((state) => state.NewBoardPosition);
    const notCheck = useBoardState((state)=>state.notCheck);
    const notationOrder = useBoardState((state) => state.notationOrder);
    const pieceToMove = useBoardState((state) => state.pieceToMove);
    // const pieceMoveNotation = useBoardState((state) => state.pieceMoveNotation);
    // const pieceToMoveClass = useBoardState((state)=> state.pieceToMoveClass);
    const possibleMoveTiles = useTiles((state) => state.possibleMoveTiles);
    const reviewMode = useBoardState((state) => state.reviewMode);
    const setCheckLevel = useBoardState((state) => state.setCheckLevel);
    const setAllMoves = useBoardState((state) => state.setAllMoves);
    const setCurrentPosition = useBoardState((state) => state.setCurrentPosition);
    const setId = useBoardState((state) => state.setId);
    const setHasMoves = useBoardState((state) => state.setHasMoves);
    // const setIsPieceToMove = useBoardState((state) => state.setIsPieceToMove);
    const setNewPosition = useBoardState((state) => state.setNewPosition);
    const setNotations = useBoardState((state) => state.setNotations);
    const setPossibleMoveTiles = useTiles((state) => state.setPossibleMoveTiles);
    const setTiles = useTiles((state) => state.setTiles);
    const setTileChangeIndicator = useBoardState((state)=>state.setTileChangeIndicator);
    const setTilesHistory = useTiles((state) => state.setTilesHistory);
    const setCurrentView = useTiles((state) => state.setCurrentView);
    const setTurn = useBoardState((state) => state.setTurn);
    const tileChangeIndicator = useBoardState((state)=>state.tileChangeIndicator);
    const tiles = useTiles((state) => state.tiles);
    const tileState = useTiles((state) => state);
    const turn = useBoardState((state) => state.turn);
    const whiteKingPosition = useBoardState((state) => state.whiteKingPosition);
    const unSetCheckLevel = useBoardState((state) => state.unSetCheckLevel);


    let payload = {};





    const handleOnClick = (e) => {
        // let relativeX = e.target.getBoundingClientRect().x - e.currentTarget.getBoundingClientRect().x; 
        // let relativeY = e.target.getBoundingClientRect().y - e.currentTarget.getBoundingClientRect().y;

        // const position = {
        //     boardRelativeX:Math.ceil(relativeX/64),
        //     boardRelativeY: Math.ceil(relativeY/64),
        // }


        let emptyTile = e.target;
        let id = e.target.parentElement.id;
        let pieceToMoveDoubleTAp = isPieceToMove && (currentPosition == id) && isPresentTiles;
        let toEmptyTile = isPieceToMove && !id;
        let toCapture = isPieceToMove && (currentPosition != id) && pieceSet(tiles[id]) !== pieceSet(tiles[currentPosition]);
        let activatePieceToMove = !!tiles[id] && isPresentTiles;

        switch (true) {
            case e.target.id == 'notation':
                break;

            case pieceToMoveDoubleTAp:
                console.log('piece did not move');
                setCurrentPosition('', false);

                break;

            case toEmptyTile: {
                console.log('moved to empty tile');
                
                let legalMove = allMoves[currentPosition].path[emptyTile.id];
                if (legalMove) {
                    let copyBs = boardState;
                    copyBs.id = emptyTile.id
                    
                    
                    payload = { ...handleSetNewPosition(copyBs, tileState) };
                    
                    setNewPosition(payload);

                    payload = { ...handleAddCapturedPieces(boardState, tileState) };
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
                    

                    payload = { ...handleSetNewPosition(copyBs, tileState) };
                    setNewPosition(payload);

                    // payload = {...handleAddCapturedPieces(boardState,tileState)};
                    // addCapturedPieces(payload);

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
        setAllMoves(handleAllMoves(boardState,tileState));                
    },[])
    useEffect(()=>{             
        if (allMoves[currentPosition]) {            
            showPossibleMoves(allMoves[currentPosition].path);            
        }   
    },[currentPosition])

    useEffect(()=>{           
        setTiles(handleSetTiles(boardState));  
        setTileChangeIndicator();
    
    },[newPosition])

    useEffect(()=>{                        
        setAllMoves(handleAllMoves(boardState,tileState));
    },[tileChangeIndicator])


    useEffect(()=>{         
        console.log({boardState,tileState});
       let payload =  handleSetCheckLevel(checkChecker(boardState,currentTiles));
       setCheckLevel(payload);
    },[allMoves])

    useEffect(()=>{

        
        
        if (isCheck||isDoubleCheck) {
            checkEffects(boardState,tileState);     
        } 
        cleanAllMoves(boardState,tileState)             
        
        // setAllMoves(cleanAllMoves(boardState,tileState)); 
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

