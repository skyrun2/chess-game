import { create } from "zustand";
import pieceIs from "./pieceIs";
import piece from "./piece";
import pieceSet from "./pieceSet";
const defaultSetup = {}
for (let i = 0; i < 16; i++) {
    if ( i < 8) {
        defaultSetup[String.fromCharCode(97+i)+'8'] = pieceIs(i,'b')
    }
    else{
        // defaultSetup[String.fromCharCode(97+(i%8))+'7'] = pieceIs(i,'b')
    }
}
for (let i = 0; i < 16; i++) {
    if ( i < 8) {
        defaultSetup[String.fromCharCode(97+i)+'1'] = pieceIs(i,'w')
    }
    else{
        // defaultSetup[String.fromCharCode(97+(i%8))+'2'] = pieceIs(i,'w')
    }
}
  
    

const useTiles = create((set,get)=>({
    
    possibleMoveTiles: {},
    tiles:{...defaultSetup},

    setTiles: (payload) => {
        const pieceToMove = payload.pieceToMove;
        const p = piece(pieceToMove)
        const pSet = pieceSet(pieceToMove);
        const currentPosition = payload.currentPosition;
        const newPosition = payload.newPosition;
        const castlingPieces = payload.castlingPieces;
        const castlingRook = payload.castlingRook;
        const passant = payload.passant;
        const updatedTiles = get().tiles;
        const capture = pSet == 'white' ? newPosition[0]+(newPosition[1]*1-1) : newPosition[0]+(newPosition[1]*1+1);
        let castlingKingSideRook= pSet =='white' ? 'h1' : 'h8';
        let castlingQueenSideRook = pSet =='white' ? 'a1' : 'a8';
        let newKingSideRookTile= pSet =='white' ? 'f1' : 'f8';
        let newQueenSideRookTile = pSet =='white' ? 'd1' : 'd8';
        let rook = pSet == 'white' ? 'rook' :'b_rook'

        updatedTiles[currentPosition] = undefined;
        updatedTiles[newPosition] = payload.pieceToMove;
            
        if (passant.length){        
            if (passant[0].tile == capture) {
                updatedTiles[capture] = undefined;
            }
        }
        if (p == 'king') {
            if(castlingRook){
                updatedTiles[castlingRook] = undefined;
                if (castlingRook == castlingKingSideRook) {
                    updatedTiles[newKingSideRookTile] = rook;
                }
                if(castlingRook == castlingQueenSideRook){
                    updatedTiles[newQueenSideRookTile]= rook;   
                }
                
                
            }
            
        }
        

        set(()=>({
            tiles:updatedTiles
        })
    )},
    setPossibleMoveTiles: (payload)=>{
        set(()=>({
            possibleMoveTiles: payload
        }))
    }

}))

export default useTiles