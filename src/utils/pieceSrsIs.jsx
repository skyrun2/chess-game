import pieceData from "./pieceData"
function pieceSrsIs(i,set) {
    if (set[0] == 'w') {
        if((i==0||i==7) || i == 'rook') return pieceData.rook
        else if ((i==1||i==6) || i == 'knight') return pieceData.knight
        else if ((i==2||i==5) || i == 'bishop') return pieceData.bishop
        else if ((i==3) || i == 'king' ) return pieceData.king
        else if ((i==4) || i == 'queen') return pieceData.queen
        else if ((i>7) || i == 'pawn') return pieceData.pawn
    }
    else if (set[0] == 'b') {
        if((i==0||i==7) || i == 'rook') return pieceData.b_rook
        else if ((i==1||i==6) || i == 'knight') return pieceData.b_knight
        else if ((i==2||i==5) || i == 'bishop') return pieceData.b_bishop
        else if ((i==3) || i == 'king' ) return pieceData.b_king
        else if ((i==4) || i == 'queen') return pieceData.b_queen
        else if ((i>7) || i == 'pawn') return pieceData.b_pawn
    }

}
export default pieceSrsIs;