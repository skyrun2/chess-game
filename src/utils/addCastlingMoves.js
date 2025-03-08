
function addCastlingMoves(terms) {
    const tile = terms.startTile;
    const cfm = terms.cfm;
    const tiles = terms.tiles;
    const castlingPieces = terms.castlingPieces;
    let castlingRooks = {}
    let castlingMoves = {};
    let isCastlingRook = false;
    if(cfm.cFM[tile]) return {};

    if (castlingPieces[tile]) {
        for (const piece in castlingPieces) {
            isCastlingRook = castlingPieces[tile].set == castlingPieces[piece].set && !!castlingPieces[piece].piece == "rook";
            if (isCastlingRook) {
                castlingRooks[piece] = castlingPieces[piece];
            }
        }        
        console.log({castlingRooks});
        
    }
    else return {};
    
}
export default addCastlingMoves;