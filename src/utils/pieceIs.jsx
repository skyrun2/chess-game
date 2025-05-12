function pieceIs(i,set) {
    if (set=='w') {
        if (i==0 || i==7) return `rook`
        if (i==1||i==6) return `knight`
        else if (i==2||i==5) return `bishop`
        else if (i==3) return `queen`
        else if (i==4) return `king`
        else if (i>7) return `pawn`
    }
    else{
        if(i==0 || i==7) return `b_rook`
        else if (i==1||i==6) return `b_knight`
        else if (i==2||i==5) return `b_bishop`
        else if (i==3) return `b_queen`
        else if (i==4) return `b_king`
        else if (i>7) return `b_pawn`
    }
}
export default pieceIs