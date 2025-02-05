import { create } from "zustand";

import piece from "./piece";
import pieceSet from "./pieceSet";
import defaultSetup from "./defaultSetup";


  
    

const useTiles = create((set,get)=>({
    
    possibleMoveTiles: {},
    tiles:{...defaultSetup()},
    tilesHistory:{}, 
    isPresentTiles: true, 
    presentTiles: {},
    presentView:'',
    currentTiles: {},
    currentView: '',

    setTiles: (payload) => {
        const pieceToMove = payload.pieceToMove;
        const p = piece(pieceToMove)
        const pSet = pieceSet(pieceToMove);
        const currentPosition = payload.currentPosition;
        const newPosition = payload.newPosition;
        // const castlingPieces = payload.castlingPieces;
        
        const passant = payload.passant;
        const updatedTiles = get().tiles;
        const capture = pSet == 'white' ? newPosition[0]+(newPosition[1]*1-1) : newPosition[0]+(newPosition[1]*1+1);
        let newKingSideRookTile= pSet =='white' ? 'f1' : 'f8';
        let newQueenSideRookTile = pSet =='white' ? 'd1' : 'd8';

        let rook = pSet == 'white' ? 'rook' :'b_rook'
        console.log({payload});
        

        
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
        
        
                
        console.log({updatedTiles});
        

        set(()=>({
            tiles:updatedTiles
        })
    )},

    setPossibleMoveTiles: (payload)=>{                
        set(()=>({
            possibleMoveTiles: payload
        }))
    },


    setCurrentView : (payload) => {
        set(prev =>{
            let total = payload.notationOrder.length - payload.moveCount;
            let history = Math.ceil(total/2) +'_'+ (total-1)%2;
            return{
                currentView : history,
            }
        })
    },

    setTilesHistory : (payload) =>{        
        set(prev=>{
            let updatedTilesHistory = ''
            let history;
            if (payload.moveCount) {
                
                let total = payload.notationOrder.length - payload.moveCount;
                history = Math.ceil(total/2) +'_'+ (total-1)%2;
                
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
    resetTilesState: (payload)=>{
        
        set(prev=>{
            
            return{
                possibleMoveTiles: {},
                tiles:{...defaultSetup()},
                tilesHistory:{}, 
                isPresentTiles: true,
                presentTiles: {},
                presentView:'',
                currentTiles: {},
                currentView: '',
            }
            
        })
    }

}))

export default useTiles;