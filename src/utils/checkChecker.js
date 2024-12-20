import piece from "./piece";
import pieceSet from "./pieceSet";
import pawnMoveControl from "./pawnMoveControl";
import rookMoveControl from "./rookMoveControl";
import bishopMoveControl from "./bishopMoveContrrol";
import knightMoveControl from "./knightMoveControl";
import kingMoveControl from "./kingMoveControl";
import checkPath from "./checkPath";
import checkEffects from "./checkEffects";
import queenMoveControl from "./queenMoveControl";

function checkChecker (payload,bs,tiles) {
    
    let blackKingPosition = bs.blackKingPosition;
    let whiteKingPosition = bs.whiteKingPosition;
    let passant = bs.passant;
    let pieceToMove = payload.pieceToMove;
    let p = ''
    let set = pieceSet(pieceToMove);
    let targetKing = set == 'white' ? blackKingPosition : whiteKingPosition;
    let checkPieces = {}
    
    
    const terms = {
        tiles: tiles
    }
    let allMoves = {}
    let countForMoves = {}
    for (const tile in tiles) {
        if (tiles[tile]) {
            p = piece(tiles[tile])
            terms.x = Number(tile[0].charCodeAt());
            terms.y = Number(tile[1]);
            terms.eightPointX =  Number(tile[0].charCodeAt()) - 96;
            terms.startTile = tile;
            terms.topRight = Math.min(8-terms.eightPointX,8-terms.y);
            terms.topLeft = Math.min(terms.eightPointX-1,8-terms.y);
            terms.bottomLeft = Math.min(terms.eightPointX-1,terms.y-1);
            terms.bottomRight = Math.min(8-terms.eightPointX,terms.y-1);

            switch (p) {
                case 'pawn':
                    allMoves[tile] = pawnMoveControl(pieceSet(tiles[tile]),terms,passant,bs);

                    break;
                case 'rook':
                    allMoves[tile] = rookMoveControl(pieceSet(tiles[tile]),terms,bs);
                    
                    break;
                case 'bishop':
                    allMoves[tile] = bishopMoveControl(set,terms,bs);
                    
                    break;
                case 'knight':                    
                    allMoves[tile] = knightMoveControl(pieceSet(tiles[tile]),terms,bs);
                    
                    break;
                case 'queen':
                    allMoves[tile] = queenMoveControl(pieceSet(tiles[tile]),terms,bs);   

                    break;
                case 'king':
                    allMoves[tile] = kingMoveControl(pieceSet(tiles[tile]),terms,bs);

                    break;
            
                default:
                    break;
            }
        }
        
    }
    

    
    
    for (const tile in allMoves) {
        if (allMoves[tile][targetKing]) {
            p = piece(tiles[tile])
            checkPieces[tile] = checkPath(p,tile,targetKing);
            
        }
    }

    let count = 0;
    let updatedPieces = {}
    let updatedCount = 0;


    for (const checkTile in allMoves) {    
        // let checkPiece = tiles[checkTile];
        for (const move in allMoves[checkTile]) {
            count += 1;
            if (!countForMoves[move]) {
                countForMoves[move] = { 
                    count:1,
                    pieces:{[checkTile]:checkTile},
                };
            }
            else if(countForMoves[move]){
                updatedPieces = {...countForMoves[move].pieces, [checkTile]:checkTile}
                updatedCount = Object.keys(updatedPieces).length;
                countForMoves[move] = { 
                    count:updatedCount,
                    pieces:{...updatedPieces},
                };
            }
        }
    }
    
    
    
    if(!Object.keys(checkPieces).length) return {'checkPieces':null,'countForMoves':countForMoves,'totalCount':count};
    
    return {'checkPieces':checkPieces,'countForMoves':countForMoves,'totalCount':count};
    
    
    
    
}
export default checkChecker;