import pieceData from "./pieceData"
function defaultSrs(id) {
    switch (true) {
        case id[1] == '7':
            return pieceData.pawn ;
        case id[1] == '2':
            return pieceData.b_pawn ;
        case id == 'a8' || id == 'h8' :
            return pieceData.rook;
        case id == 'a1' || id == 'h1' :
            return pieceData.b_rook;
        case id == 'b8' || id == 'g8' :
            return pieceData.bishop;
        case id == 'b1' || id == 'g1' :
            return pieceData.b_bishop;
        case id == 'c8' || id == 'f8' :
            return pieceData.knight;
        case id == 'c1' || id == 'f1' :
            return pieceData.b_knight;
        case id == 'd8'  :
            return pieceData.queen;
        case id == 'd1' :
            return pieceData.b_queen;
        case id == 'e8'  :
            return pieceData.king;
        case id == 'e1' :
            return pieceData.b_king;
        default:
            break;
    }
}

export default defaultSrs