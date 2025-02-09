import bishopMoveControl from "./bishopMoveControl";
import kingMoveControl from "./kingMoveControl";
import knightMoveControl from "./knightMoveControl";
import pawnMoveControl from "./pawnMoveControl";
import piece from "./piece";
import pieceSet from "./pieceSet";
import queenMoveControl from "./queenMoveControl";
import rookMoveControl from "./rookMoveControl";


function setMoves(tile, bs, ts) {
    const allMoves = bs.allMoves;
    const tiles = ts.tiles;
    const tilePiece = tiles[tile];
    const passant = bs.passant;

    const p = piece(tilePiece);
    let eightPointX = Number(tile[0].charCodeAt()) - 96;
    let y = Number(tile[1]) * 1;






    const terms = {
        x: Number(tile[0].charCodeAt()),
        eightPointX: Number(tile[0].charCodeAt()) - 96,
        y: Number(tile[1]) * 1,
        topRight: Math.min(8 - eightPointX, 8 - y),
        bottomRight: Math.min(8 - eightPointX, y - 1),
        bottomLeft: Math.min(eightPointX - 1, y - 1),
        topLeft: Math.min(eightPointX - 1, 8 - y),
        startTile: tile,
        tiles: tiles,
        x1: 1
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
            return kingMoveControl(pieceSet(tilePiece), terms, bs, ts);


        default:
            break;
    }
}

export default setMoves;