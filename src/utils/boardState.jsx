    
import { create } from "zustand"
// import isEnPassant from "./isEnPassant"; 
const useBoardState = create((set,get) => ({
    bears:0,
    blackKingPosition:'e8',
    capturedPieces : {
        blackSet:{},
        whiteSet:{},
    },
    castlingRook :'',
    checkPieces:{},
    checkPiecesPath:{},
    checkingSet:'',
    countForMoves:{},
    currentPosition :[],
    currentTile:'',
    hasMoves: false,
    isCapture: false,
    isCheck:false,
    isCheckMate:false,
    isDoubleCheck:false,
    isEnPassant:false,
    isPieceToMove:false,
    moveCount:0,
    moveNotation:[],
    notationOrder:[],
    newBoardPosition:'',
    newPosition : {},
    passant : [], 
    pieceToMove:'',
    pieceToMoveClass:'w',
    pieceMoveNotation:[],
    totalMovesCount:0,
    turn:'white',
    whiteKingPosition:'e1',


    castlingPieces:{
        e1:{tile:'e1',piece:'king',set:'wite'},
        e8:{tile:'e8',piece:'king',set:'black'},
        a1:{tile:'a1',piece:'rook',set:'white'},
        a8:{tile:'a8',piece:'rook',set:'black'},
        h1:{tile:'h1',piece:'rook',set:'white'},
        h8:{tile:'h8',piece:'rook',set:'black'},
        
    },


    addCapturedPieces : (payload) =>{
        
        
        let updatedCapturedPieces = {...get().capturedPieces};
        
        if (payload.set == 'white' ) {
            updatedCapturedPieces.whiteSet[payload.piece] = payload.whiteSet;
        }
        else if (payload.set == 'black' ) {
            
            
            updatedCapturedPieces.blackSet[payload.piece] = payload.blackSet;
        }
        

        set(()=>({
            capturedPieces : updatedCapturedPieces,
        }))
        

    },

    setCurrentPosition :  (payload) => {

        
        
        set((state)=>({
            currentPosition:payload.currentPosition,
            newPosition:'',
            currentTile: payload.currentTile,
            isPieceToMove : payload.isPieceToMove,
            pieceToMove: payload.pieceToMove,
            pieceToMoveClass : payload.pieceToMoveClass,
            bears : state.bears+1

        }))
    },
    

    setNewPosition:  (payload) => {
        const count = get().turn == 'white' ? get().moveCount +1 : get().moveCount;
        const newTile = payload.newPosition;
        const currentTile = payload.currentPosition;
        const castlingPiece = payload.castlingPiece;    
        const updatedCastlingPieces = {...get().castlingPieces};
        if (castlingPiece) {
            updatedCastlingPieces[currentTile] = null;
        }
        if (updatedCastlingPieces[newTile]) {
            updatedCastlingPieces[newTile] = null;
        }

        let updatedPassant = [...get().passant];
        if (payload.passant){
            updatedPassant = [payload.passant,...get().passant];
        }
        
        
        set((state)=>({
            newPosition : payload.newPosition,
            newBoardPosition: payload.newBoardPosition,
            isPieceToMove : !state.isPieceToMove,
            isCapture : payload.isCapture,
            passant: updatedPassant,
            isEnPassant: payload.isEnPassant,
            castlingPieces:updatedCastlingPieces,
            castlingRook:payload.castlingRook,
            whiteKingPosition: payload.whiteKingPosition,
            blackKingPosition: payload.blackKingPosition,
            moveCount : count,
            


            
        }))
    },
    
    setIsPieceToMove : () => set((state)=>({
        isPieceToMove:!state.isPieceToMove
    })),

    setTurn : () => {
        let updatedTurn = get().turn == 'white' ? 'black' : 'white';
        set(()=>({
            turn : updatedTurn,
    }))},

    setNotations : (payload) => {
        set(prev => {
            
            
            const count = get().moveCount;
            let prevMoveNotation  = [...prev.moveNotation];
            let updatedNotationOrder = [...prev.notationOrder];
            if (prevMoveNotation.length%2) {
                updatedNotationOrder.push(payload.moveNotation);
                
            }
            else{
                updatedNotationOrder.push(`${count}.`);
                updatedNotationOrder.push(payload.moveNotation);
            }
            prevMoveNotation.push(payload.moveNotation);
            
            
            return { 
                moveNotation : prevMoveNotation,
                notationOrder: updatedNotationOrder,
            };
        });
    },

    setCheckLevel : (payload) => {
        const isCheck = payload.isCheck ? true : false ;
        const isDoubleCheck = payload.isDoubleCheck ? true : false ;
        let checkPiecesPath = {};

        
        if (isCheck||isDoubleCheck) {

            
            for(let piece in payload.checkPieces) {
                if (payload.checkPieces[piece].path) {
                    checkPiecesPath = {...checkPiecesPath, ...payload.checkPieces[piece].path }
                }
                else checkPiecesPath = null;
            }
            set(()=>({
                checkPieces: payload.checkPieces,
                checkPiecesPath:checkPiecesPath,
                checkingSet : payload.checkingSet,
                countForMoves: payload.countForMoves,
                isCheck : isCheck,
                isDoubleCheck : isDoubleCheck,
                totalMovesCount: payload.totalCount,
                
            }))
        }
        else{

            
            set(()=>({
                countForMoves: payload.countForMoves,
                totalMovesCount: payload.totalCount,
                
            }))
        }
    },
    setHasMoves : (payload) => {
        
        set(()=>({
            hasMoves: payload.hasMoves,
        }))
    },
    unSetCheckLevel : () => {
        console.log('i should work');
        
        set(()=>({
            checkPieces: {},
            checkPiecesPath:{},
            checkingSet : '',
            isCheck : false,
            isDoubleCheck : false,
            
        }))
    }
    
    
            
  }))

  export default useBoardState;
  
  