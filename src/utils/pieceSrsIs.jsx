import pieceData from "./pieceData"
function pieceSrsIs(i,set) {
    if (set=='w') {
        if(i==0||i==7) return pieceData.rook
        else if (i==1||i==6) return pieceData.knight
        else if (i==2||i==5) return pieceData.bishop
        else if (i==3) return pieceData.king
        else if (i==4) return pieceData.queen
        else if (i>7) return pieceData.pawn
    }
    else{
        if(i==0||i==7) return pieceData.b_rook
        else if (i==1||i==6) return pieceData.b_knight
        else if (i==2||i==5) return pieceData.b_bishop
        else if (i==3) return pieceData.b_king
        else if (i==4) return pieceData.b_queen
        else if (i>7) return pieceData.b_pawn
    }

}
export default pieceSrsIs;