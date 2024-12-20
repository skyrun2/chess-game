    import { create } from "zustand"
// import isEnPassant from "./isEnPassant"; 
const useBoardState = create((set,get) => ({
    bears:0,
    blackKingPosition:'e8',
    castlingRook :'',
    checkPieces:{},
    checkPiecesPath:{},
    checkingSet:'',
    countForMoves:{},
    currentPosition :[],
    currentTile:'',
    isCapture: false,
    isCheck:false,
    isCheckMate:false,
    isDoubleCheck:false,
    isEnPassant:false,
    isPieceToMove:false,
    moveCount:0,
    moveNotation:'',
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
    setNewPosition :  (payload) => {
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
        const prevMoveNotation  = get().moveNotation;
        const updatedMoveNotation = prevMoveNotation + " "+ payload.moveNotation;
        set(()=>({
            moveNotation : updatedMoveNotation
        }))
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
  
  