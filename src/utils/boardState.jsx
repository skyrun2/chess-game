    
import { create } from "zustand"



import pieceSet from "./pieceSet";
import defaultSetup from "./defaultSetup";


// import isEnPassant from "./isEnPassant"; 
const initialState = {allMoves:{},
bears:0,
blackKingPosition:'e8',
capturedPieces : {
    blackSet:{},
    whiteSet:{},   
},    
castlingRook :'',
cfm:null,
checkPieces:{},
checkPiecesPath:{},
checkingSet:'',
checkMate:false,    
count:0,
countForMoves:{},
currentPosition :null,
currentPositionCount :0,
currentTile:'',
currentTiles: {...defaultSetup()},
currentView: '',
checkThreats: {},
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
isPresentTiles: true, 
moveCount:0,
moveNotation:[],
notCheck:true,
notationOrder:[],
newBoardPosition:'',
newCount:0,
newPosition : null,
passant : [], 
pawnCapture:'',
pieceToMove:'',
pieceToMoveClass:'w',
pieceMoveNotation:[],
possibleMoveTiles: {},
presentTiles: {},
presentView:'',
reviewMode:false,
resigned: false,
resignModal: false,
targetKing:"",
totalMovesCount:0,
tiles:{...defaultSetup()},
tilesHistory:{}, 
turn:'white',
setAllMovesCount1:0,    
setCleanAllMovesCount:0,
winningSet:'',
winningCondition: '',
whiteKingPosition:'e1',

castlingPieces:{
    e1:{tile:'e1',piece:'king',set:'white'},
    e8:{tile:'e8',piece:'king',set:'black'},
    a1:{tile:'a1',piece:'rook',set:'white',direction:"left"},
    a8:{tile:'a8',piece:'rook',set:'black',direction:"left"},
    h1:{tile:'h1',piece:'rook',set:'white',direction:"right"},
    h8:{tile:'h8',piece:'rook',set:'black',direction:"right"},
    
},
}
const useBoardState = create((set,get) => ({
     ...initialState,

    addCapturedPieces : (payload) =>{
        
        
        let updatedCapturedPieces = {...get().capturedPieces};
        
        if (payload.set == 'white' ) {
            if ( updatedCapturedPieces.blackSet[payload.piece]){
                updatedCapturedPieces.blackSet[payload.piece] = updatedCapturedPieces.blackSet[payload.piece] + 1;
            }
            else updatedCapturedPieces.blackSet[payload.piece] = 1;
        }
        else if (payload.set == 'black' ) {
            if ( updatedCapturedPieces.whiteSet[payload.piece]){
                updatedCapturedPieces.whiteSet[payload.piece] = updatedCapturedPieces.whiteSet[payload.piece] + 1;
            }
            else updatedCapturedPieces.whiteSet[payload.piece] = 1;
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

    


    
    resetTiles: (payload)=>{
        
        set(prev=>{
            
            let newTiles = {...prev.tilesHistory[payload.id]}

            return{
                tiles : newTiles,
                currentTiles : newTiles,                
                isPresentTiles : payload.isPresentTiles,
                currentView: payload.id,
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
        set(initialState)
    },    

    setAllMoves: (payload) =>{        
        let updatedSetAllMovesCount1 = get().setAllMovesCount1 +1;
        set(()=>({
            allMoves:payload.moves,
            cfm:payload.cfm,
            setAllMovesCount1: updatedSetAllMovesCount1,
        }))
    },

    setCheckLevel : (payload) => {
        const isCheck = payload.isCheck;
        const isDoubleCheck = payload.isDoubleCheck;
        const checkPieces = payload.checkPieces;
        const checkPiecePath = payload.checkPiecePath;
        const notCheck = payload.notCheck;
        const targetKing = payload.targetKing;
        const allMoves = payload.allMoves;
        const cfm = payload.cfm;
        const checkThreats = payload.checkThreats;
        const isCheckMate = payload.isCheckMate;
        const winningCondition = payload.winningCondition;
        const winningSet = payload.winningSet;        
        
        set(()=>({
            allMoves,
            cfm,
            count:payload.count,
            isCheck,
            isCheckMate,
            isDoubleCheck,
            checkPieces,
            checkPiecePath,
            notCheck,
            targetKing,
            currRookPosition:null,
            checkThreats,
            winningCondition,
            winningSet
        }))
        
    },
    setCleanAllMoves: (payload) =>{        
        let updatedSetCleanAllMovesCount = get().setCleanAllMovesCount +1;
        
        set(()=>({
            allMoves:payload.moves,
            cfm:payload.cfm,
            setCleanAllMovesCount: updatedSetCleanAllMovesCount,
        }))
    },
    
    setCurrentPosition :  (position,isPieceToMove) => {
        const tiles = get().currentTiles;        
        let updatedCount = get().currentPositionCount + 1;
        set({
            currentPosition:position,
            isPieceToMove : isPieceToMove,
            pieceToMove: isPieceToMove ? tiles[position] : '',
            currentPositionCount:updatedCount
            
        })
    },
    setCurrentView : (payload) => {
        set(() =>{
            let total = payload.notationOrder.length - payload.moveCount;
            let history = Math.ceil(total/2) +'_'+ (total-1)%2;
            return{
                currentView : history,
            }
        })
    },

    
    setHasMoves : (payload) => {
        set(()=>({
            hasMoves: payload.hasMoves,
        }))
    },
        

    setInitialMoves: (payload)=>{        
        set(()=>({
            allMoves:payload.moves,
            cfm:payload.cfm,
        }))
    },

    setIsPieceToMove : () => set((state)=>({
        isPieceToMove:!state.isPieceToMove
    })),
    
    setNewPosition:  (payload) => {
        const count = get().turn == 'white' ? get().moveCount +1 : get().moveCount;        
        const newCount = get().newCount+1;
        
        set((state)=>({            
            newPosition : payload.newPosition,
            newCount: newCount, 
            newBoardPosition: payload.newBoardPosition,
            isPieceToMove : !state.isPieceToMove,
            isCapture : payload.isCapture,
            moveCount : count,
            whiteKingPosition: payload.whiteKingPosition,
            blackKingPosition: payload.blackKingPosition,
            
        }))
    },
    
    
    setNotations : (payload) => {
        set(prev => {                        
            const count = Math.ceil(get().moveCount/2);
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
    setPossibleMoveTiles: (payload)=>{                
        set(()=>({
            possibleMoveTiles: payload
        }))
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

    setTiles: (payload) => {

        const pieceToMove = payload.pieceToMove;
        const pSet = pieceSet(pieceToMove);
        const currentPosition = payload.currentPosition;
        const newPosition = payload.newPosition;
        
        
        const passant = payload.passant;
        const updatedTiles = get().currentTiles;
        const capture = pSet == 'white' ? newPosition[0]+(newPosition[1]*1-1) : newPosition[0]+(newPosition[1]*1+1);
        let newKingSideRookTile= pSet =='white' ? 'f1' : 'f8';
        let newQueenSideRookTile = pSet =='white' ? 'd1' : 'd8';

        let rook = pSet == 'white' ? 'rook' :'b_rook'

        

        
        delete updatedTiles[currentPosition];
        updatedTiles[newPosition] = payload.pieceToMove;
            
        if (passant.length){        
            if (passant[0].tile == capture) {
                
                delete updatedTiles[capture];
            }
        }
        
        if(payload.castlingRook){    
            const currRookPosition = payload.castlingRook.rookTile;
            const castlingSide = payload.castlingRook.side;
            delete updatedTiles[currRookPosition];
            if (castlingSide == 'kingSide') {
                updatedTiles[newKingSideRookTile] = rook;
            }
            if(castlingSide == 'queenSide'){
                updatedTiles[newQueenSideRookTile]= rook;   
            }
            
            
        }        
        set(()=>({
            currentTiles:updatedTiles
        })
    )},

    setTileChangeIndicator:()=>{
        set(prev =>{
            let updatedTileChangeIndicator = prev.tileChangeIndicator + 1;
            return{
               tileChangeIndicator:  updatedTileChangeIndicator
            }
        })
    },

    setTilesHistory : (payload) =>{        
        set(prev=>{
            let updatedTilesHistory = ''
            let history;
            if (payload.moveCount) {
                
                let sub = (payload.moveCount%2) ? 0 : 1;
                history = Math.ceil(payload.moveCount/2) +'_'+ sub;
                
                updatedTilesHistory = { ...prev.tilesHistory};
                updatedTilesHistory[history] = {...payload.tiles}; 
            }        
            
            return{
                tilesHistory: updatedTilesHistory,
                currentTiles:{...payload.tiles},
                presentTiles: {...payload.tiles},
                presentView:history,
                
            }

        })
    },


    setTurn : () => {
        let updatedTurn = get().turn == 'white' ? 'black' : 'white';
        set(()=>({
            turn : updatedTurn,
    }))},

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
  
  