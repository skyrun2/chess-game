


function selectElement(e,dispatch,state,store) {
    let relativeX = e.target.getBoundingClientRect().x - e.currentTarget.getBoundingClientRect().x; 
    let relativeY = e.target.getBoundingClientRect().y - e.currentTarget.getBoundingClientRect().y;
    
    const position = {
        boardRelativeX:Math.ceil(relativeX/64),
        boardRelativeY: Math.ceil(relativeY/64),
    }
    
    let MoveX = (position.boardRelativeX-1)*12.5;
    let MoveY = (position.boardRelativeY-1)*12.5;
    let boardX = String.fromCharCode(97+(position.boardRelativeX-1));
    let boardY = String.fromCharCode(56-(position.boardRelativeY-1 ));
    let id;
    
    const pieceMove = [
        { 
        boardPosition:`${boardX}${boardY}`,
        moveCount:0,
        piece:'',
        currentNotation:''}
       ]        

    switch (true) {
        // case (e.target.id == state.pieceToMove) && state.isPieceToMove : 
        //     console.log('piece wwas not moved moved');
        //     dispatch({type:'UNSET_PIECE_TO_MOVE'})
            
        //     break;

        case state.isPieceToMove :
            dispatch({type:'SET_NEW_POSITION',payload:position})
            id = document.getElementById(state.pieceToMove).parentElement
            id.style.top = `${MoveY}%`
            id.style.left = `${MoveX}%`
            pieceMove[0].piece = state.pieceToMove;
            pieceMove[0].moveCount = state.moveCount+1;
            pieceMove[0].currentNotation = pieceClass=='p'? `${state.moveCount+1}. ${pieceMove[0].boardPosition}` : `${state.moveCount+1}. ${pieceClass}${pieceMove[0].boardPosition}`            
            dispatch({type:'PIECE_MOVE_NOTATION',payload:pieceMove})
            dispatch({type:'MOVE_NOTATION',payload:pieceMove})

            
              break;

            case  e.target.parentElement.classList[0] == 'peice':
            // console.log(pieceClass);
            dispatch({type:'SET_PIECE_TO_MOVE',payload:e.target.id})
            dispatch({type:'SET_CURRENT_POSITION',payload:position})
            // console.log(store);
            
            // console.log(state.currentPosition);
            
            
            break;
    
        default:
            console.log(e.target.id);
            
            break;
    }

    
    
}

export default selectElement