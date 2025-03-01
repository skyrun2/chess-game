    
import { create } from "zustand"
import piece from "./piece";
import useTiles from "./useTiles";


// import isEnPassant from "./isEnPassant"; 
const useBoardState = create((set,get) => ({
    allMoves:{},
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
    checkMate:false,
    countForMoves:{},
    currentPosition :[],
    currentTile:'',
    tileChangeIndicator:0,
    gameEnd: false,
    hasMoves: false,
    id:'',
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
    pawnCapture:'',
    pieceToMove:'',
    pieceToMoveClass:'w',
    pieceMoveNotation:[],
    reviewMode:false,
    resigned: false,
    resignModal: false,
    totalMovesCount:0,
    turn:'white',
    winningSet:'',
    winningCondition: '',
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
    closeResignModal: ()=>{
        set(()=>{
            return{ 
                resignModal:false,
            }
        })
    },
    openResignModal: ()=>{
        set(()=>{
            return{ 
                resignModal:true,
            }
        })
    },
    resetAll:() =>{
        set(() =>{
            let newPrev = {};
            
            return {
                allMoves:{},
                blackKingPosition:'e8',
                castlingPieces : {
                e1:{tile:'e1',piece:'king',set:'wite'},
                e8:{tile:'e8',piece:'king',set:'black'},
                a1:{tile:'a1',piece:'rook',set:'white'},
                a8:{tile:'a8',piece:'rook',set:'black'},
                h1:{tile:'h1',piece:'rook',set:'white'},
                h8:{tile:'h8',piece:'rook',set:'black'},                
                },
                castlingRook :'',
                cfm:{},
                checkPieces:{},
                checkPiecesPath:{},
                checkingSet:'',
                checkMate:false,
                countForMoves:{},
                currentPosition : '',
                hasMoves: false,
                id:'',
                isCapture: false,
                isCheck:false,
                isCheckMate:false,
                isDoubleCheck:false,
                isEnPassant:false,
                isPieceToMove:false,
                newPosition : '',
                moveCount : 0,
                moveNotation : [],
                notationOrder : [],
                passant  : [],
                reviewMode:false,
                turn : 'white',
                whiteKingPosition :'e1',
                

            }

        })
    },
    setResign: () =>{
         
        set(()=>({
           resigned: true,
           checkMate:true,
           winningCondition: 'resign'
        }))
    },
    setReviewMode: () =>{
        set(()=>({
            reviewMode:true
        }))
    },
    setAllMoves: (payload) =>{        
        set(()=>({
            allMoves:payload.moves,
            cfm:payload.cfm
        }))
    },

    setCurrentPosition :  (position,isPieceToMove) => {
        const tiles = useTiles.getState().tiles;
        
        
        
        
        
        
        set({
            currentPosition:position,
            // newPosition:'',
            // currentTile: payload.currentTile, 
            isPieceToMove : isPieceToMove,
            pieceToMove: isPieceToMove ? tiles[position] : '',
            

        })
    },
    
    setId : (payload)=>{

        
        set(()=>({
            id :payload.id,
            isCapture: payload.isCapture,
        }))
    },

    setNewPosition:  (payload) => {
        const count = get().turn == 'white' ? get().moveCount +1 : get().moveCount;
        const newTile = payload.newPosition;
        const currentTile = payload.currentPosition;
        
        
        
        
        
        set((state)=>({            
            newPosition : payload.newPosition,
            newBoardPosition: payload.newBoardPosition,
            isPieceToMove : !state.isPieceToMove,
            isCapture : payload.isCapture,
            moveCount : count,
            whiteKingPosition: payload.whiteKingPosition,
            blackKingPosition: payload.blackKingPosition,
            
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
            
            let updatedPassant = [...get().passant];
            if (payload.passant){
                updatedPassant = [payload.passant,...get().passant];
            }
            
            
            
            return { 
                moveNotation : prevMoveNotation,
                notationOrder: updatedNotationOrder,
                castlingPieces:updatedCastlingPieces,
                castlingRook:payload.castlingRook,
                passant: updatedPassant,
                isEnPassant: payload.isEnPassant,
            };
        });
    },

    setCheckLevel : (payload) => {
        const isCheck = payload.isCheck;
        const isDoubleCheck = payload.isDoubleCheck;
        let checkPieces = payload.checkPieces;
            
        set(()=>({
            isCheck:isCheck,
            isDoubleCheck:isDoubleCheck,
            checkPieces: checkPieces,
        }))
        
    },
    setHasMoves : (payload) => {
        
        set(()=>({
            hasMoves: payload.hasMoves,
        }))
    },
    setTileChangeIndicator:()=>{
        set(prev =>{
            let updatedTileChangeIndicator = prev.tileChangeIndicator + 1;
            return{
               tileChangeIndicator:  updatedTileChangeIndicator
            }
        })
    },
    unSetCheckLevel : () => {

        
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
  
  