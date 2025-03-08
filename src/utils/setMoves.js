import bishopMoveControl from "./bishopMoveControl";
import countForMoves from "./countForMoves";
import kingMoveControl from "./kingMoveControl";
import knightMoveControl from "./knightMoveControl";
import pawnMoveControl from "./pawnMoveControl";
import piece from "./piece";
import pieceSet from "./pieceSet";
import queenMoveControl from "./queenMoveControl";
import rookMoveControl from "./rookMoveControl";


function setMoves(tile, bs ) {
    const tiles = bs.currentTiles;
    const tilePiece = tiles[tile];
    const passant = bs.passant;
    let  cfm = bs.cfm;
    const castlingPieces = bs.castlingPieces;    

    const p = piece(tilePiece);
    let eightPointX = Number(tile[0].charCodeAt()) - 96;
    let y = Number(tile[1]) * 1;
    




    const terms = {
        bottomLeft: Math.min(eightPointX - 1, y - 1),
        bottomRight: Math.min(8 - eightPointX, y - 1),
        castlingPieces,
        cfm,
        eightPointX: Number(tile[0].charCodeAt()) - 96,
        startTile: tile,
        tiles,
        topLeft: Math.min(eightPointX - 1, 8 - y),
        topRight: Math.min(8 - eightPointX, 8 - y),
        x: Number(tile[0].charCodeAt()),
        x1: 1,
        y: Number(tile[1]) * 1,
    }


    switch (p) {
        case 'pawn':
            return pawnMoveControl(pieceSet(tilePiece), terms, passant, bs);
        // return rookMoveControl(pieceSet(tilePiece),terms,bs);
        case 'rook':
            return rookMoveControl(pieceSet(tilePiece), terms, bs);

        case 'bishop':
            return bishopMoveControl(pieceSet(tilePiece), terms, bs);

        case 'knight':
            return knightMoveControl(pieceSet(tilePiece), terms, bs);

        case 'queen':
            return queenMoveControl(pieceSet(tilePiece), terms, bs);

        case 'king':
            return kingMoveControl(pieceSet(tilePiece), terms, bs );


        default:
            break;
    }
}

export default setMoves;