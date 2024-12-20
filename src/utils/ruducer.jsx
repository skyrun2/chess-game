import legalMoves from "./legalMoves";
const reducer = ( state, action) =>{
    let updatedCurrentPosition = {};
    // let moveCount = state.moveCount;
    let updatedPieceMoveNotation = [];
    let updatedMoveNotation = ''
    let isPieceToMove = state.isPieceToMove
    switch (action.type) {
        case 'SET_CURRENT_POSITION':
            updatedCurrentPosition = action.payload
            if (!isPieceToMove) {
                legalMoves(updatedCurrentPosition)
                
            }
            
            return{
                ...state,

                currentPosition:updatedCurrentPosition,
                isPieceToMove:true

            }
        case 'SET_NEW_POSITION':
            updatedCurrentPosition = action.payload
            // console.log(`piece current ${state.currentPosition}`);
            return{
                ...state,
                newPosition:updatedCurrentPosition,
                moveCount: state.moveCount+1,
                isPieceToMove:false

            }
        case 'UNSET_PIECE_TO_MOVE':
            return{
                ...state,
                isPieceToMove:false
            }
        case 'SET_PIECE_TO_MOVE':
            // console.log(`piece current ${state.currentPosition}`);
            return{
                ...state,
                pieceToMove:action.payload

            }
        case 'PIECE_MOVE_NOTATION':
            
            
            updatedPieceMoveNotation=[...state.pieceMoveNotation,...action.payload];
            
            return{
                ...state,
                pieceMoveNotation:updatedPieceMoveNotation

            }
        case 'MOVE_NOTATION':
            
            
            updatedMoveNotation = state.moveNotation +' '+action.payload.currentNotation;
            
            return{
                ...state,
                moveNotation:updatedMoveNotation

            }
    
        default:
            break;
    }
}

export default reducer