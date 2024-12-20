
import { useEffect} from "react";
import BottomLetter from "./bottomLetter";
import Boxes from "./boxes";
import LeftNum from "./leftNums";
import useBoardState from "../utils/boardState";
import legalMoves from "../utils/legalMoves";
import useTiles from "../utils/useTiles";

import showPossibleMoves from "../utils/showPossibleTiles";

import pieceSet from "../utils/pieceSet";
// import piece  from "../utils/piece";
import setNotation from "../utils/setNotation";
import enPassantOpen from "../utils/enPassantOpen";
import isEnPassant from "../utils/isEnPassant";
import removeCastlingPiece from "../utils/removeCastlingPiece";
import castlingPiece from "../utils/castlingPiece";
import checkChecker from "../utils/checkChecker";
import kingTile from "../utils/kingTile";



const Board = () =>{
    const boardState = useBoardState((state) => state);
    const castlingPieces = useBoardState((state)=> state.castlingPieces);
    const castlingRook = useBoardState((state)=> state.castlingRook);
    const checkPiecesPath =  useBoardState((state)=> state.checkPiecesPath);
    const currentPosition = useBoardState((state) => state.currentPosition);
    const isPieceToMove = useBoardState((state) => state.isPieceToMove);
    const isCheck = useBoardState((state)=>state.isCheck);
    // const isDoubleCheck = useBoardState((state)=>state.isDoubleCheck);
    const moveNotation = useBoardState((state) => state.moveNotation);
    // const moveCount = useBoardState((state) => state.moveCount);
    const newPosition = useBoardState((state) => state.newPosition);
    // const NewBoardPosition = useBoardState((state) => state.NewBoardPosition);
    const pieceToMove = useBoardState((state) => state.pieceToMove);
    // const pieceMoveNotation = useBoardState((state) => state.pieceMoveNotation);
    const passant =  useBoardState((state)=> state.passant);
    // const pieceToMoveClass = useBoardState((state)=> state.pieceToMoveClass);
    const possibleMoveTiles = useTiles((state)=>state.possibleMoveTiles);
    const setCheckLevel =  useBoardState((state)=> state.setCheckLevel);
    const setCurrentPosition = useBoardState((state) => state.setCurrentPosition);
    // const setIsPieceToMove = useBoardState((state) => state.setIsPieceToMove);
    const setNewPosition = useBoardState((state) => state.setNewPosition);
    const setNotations = useBoardState((state)=> state.setNotations);
    const setPossibleMoveTiles = useTiles((state)=>state.setPossibleMoveTiles);
    const setTiles = useTiles((state)=>state.setTiles);
    const setTurn =  useBoardState((state)=> state.setTurn);
    const tiles = useTiles((state)=>state.tiles);
    const tileState = useTiles((state)=>state)
    const turn =  useBoardState((state)=> state.turn);
    // const whiteKingPosition = useBoardState((state)=> state.whiteKingPosition);
    const unSetCheckLevel =  useBoardState((state)=> state.unSetCheckLevel);
    

    let payload = {};
    let LocalCheckPieces = {};
    let classList =`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[15%] w-[35rem] aspect-square border border-black grid grid-cols-8` ;
    
    
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
        
        payload = {
            currentPosition:'',
            currentTile:'',
            newPosition:'',
            pieceToMove:'',
            isPieceToMove:false,
            moveCount:0,
            pieceToMoveNotation:[],
            moveNotation:'',
            capture:false
        }
        
        

        switch (true) {
            case isPieceToMove && (currentPosition == id):                
                console.log('piece did not move');
                payload.currentPosition = '';
                payload.isPieceToMove = false ;  
                setCurrentPosition(payload)             

                break;

            case isPieceToMove && !id:
                console.log('moved to empty tile');
                
                payload.currentPosition = currentPosition;
                payload.newPosition = emptyTile.id;
                payload.isPieceToMove = false ;          
                payload.pieceToMove = pieceToMove;
                payload.isCapture = false;
                payload.passant = enPassantOpen(payload,passant);
                payload.castlingPiece = removeCastlingPiece(payload,boardState);
                payload.castlingRook = castlingPiece(payload,boardState);
                payload.whiteKingPosition = kingTile(payload,boardState,'w');
                payload.blackKingPosition = kingTile(payload,boardState,'b');
                
                setNewPosition(payload);

                
                if (isCheck) {
                    
                    if (pieceToMove.slice(-4) !== 'king') {
                        if (checkPiecesPath[payload.newPosition]) {
                            unSetCheckLevel();
                        }
                    }
                    else{
                        if (!checkPiecesPath[payload.newPosition]) {
                            
                            unSetCheckLevel();
                        }
                    }
                }

                break;

            case isPieceToMove && (currentPosition != id) && pieceSet(tiles[id]) !== pieceSet(tiles[currentPosition]):
            // case isPieceToMove && (currentPosition != id) :
                console.log('capture');
                payload.currentPosition = currentPosition
                payload.newPosition = id;
                payload.isPieceToMove = false ;          
                payload.pieceToMove = pieceToMove;
                payload.isCapture = true;
                payload.passant = enPassantOpen(payload,passant);
                payload.castlingPiece = removeCastlingPiece(payload,boardState);
                payload.whiteKingPosition = kingTile(payload,boardState,'w');
                payload.blackKingPosition = kingTile(payload,boardState,'b');

                setNewPosition(payload);


                if (isCheck) {
                    
                    if (checkPiecesPath[payload.newPosition]) {
                        unSetCheckLevel();
                    }
                }
                // setTiles(payload);

                break;


            case !!tiles[id]:
                if (pieceSet(tiles[id]) == turn){
                    console.log('piece to move');
                    payload.currentPosition = id;
                    payload.currentTile = box;
                    payload.isPieceToMove = true ;               
                    payload.pieceToMove =  piece;
                    setCurrentPosition(payload);
                }
                
                break;

            default:
                break;
        }

    }
    
    
    useEffect(()=>{
        if (boardState.isPieceToMove) {
            setPossibleMoveTiles(legalMoves(boardState,tileState));   
        }
        
        
    },[currentPosition])

    useEffect(()=>{
        if(boardState.isPieceToMove){   
            showPossibleMoves(possibleMoveTiles);
        }
        
    },[possibleMoveTiles])

    useEffect(()=>{
        
        
        if (possibleMoveTiles[newPosition]) {
            
            payload.currentPosition = currentPosition;
            payload.newPosition = newPosition;
            payload.pieceToMove = pieceToMove;
            payload.passant = passant;
            payload.isEnPassant = isEnPassant(payload,boardState);
            payload.moveNotation =  setNotation(payload,boardState);
            payload.castlingPieces = castlingPieces;
            payload.castlingRook = castlingRook;
            
            setTiles(payload);
            setNotations(payload);
            setTurn();
        }
        else{
            console.log('not allowed');
            
        }
        

    },[newPosition ])

    useEffect(()=>{
        
        
        payload.pieceToMove = pieceToMove;

        
        if (checkChecker(payload,boardState,tiles)){
            LocalCheckPieces = checkChecker(payload,boardState,tiles).checkPieces;
            if (LocalCheckPieces) {
                
                
                let checkingSet = pieceSet(tiles[(Object.keys(LocalCheckPieces)[0])]);
                if (Object.keys(LocalCheckPieces).length == 2) payload.isDoubleCheck = true;
                if (Object.keys(LocalCheckPieces).length == 1) payload.isCheck = true;
                payload.checkPieces = LocalCheckPieces;
                payload.checkingSet = checkingSet;
                payload.countForMoves = checkChecker(payload,boardState,tiles).countForMoves;
                payload.totalCount = checkChecker(payload,boardState,tiles).totalCount;
                setCheckLevel(payload);
            }
            else{
                
                payload.countForMoves = checkChecker(payload,boardState,tiles).countForMoves;
                payload.totalCount = checkChecker(payload,boardState,tiles).totalCount;
                setCheckLevel(payload);
            }
            // NOTE: WHEN SETCHECKLEVEL IS ACTIVE, THE PIECE SET CAUSING CHECK LOOSES THE SHOWPOSSIBLEMOVETILES FUNCTIONALITY IDKW 
        }
        
        
        

    },[moveNotation])
    
    

    return(
        <div className={classList}  onClick={e=>handleOnClick(e)}>
            {/* <p
                className="absolute top-[-10%]  z-30"> {moveNotation}
            </p> */}
            <p
                className="absolute top-[40%] bg-red-600 z-30"> {isPieceToMove}
            </p>
            <Boxes/>
            <LeftNum/>
            <BottomLetter/>
        </div>
    )
}

export default Board;