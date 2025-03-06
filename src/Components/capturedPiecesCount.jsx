import useBoardState from "@/utils/boardState"

import pieceSrsIs from "@/utils/pieceSrsIs";



const CapturedPieceCount = ({player,piece}) => {
    const capturedPieces = useBoardState((state)=> state.capturedPieces);
    const set = player == 'player1' ? 'blackSet' : 'whiteSet';
    let pieceSrc = pieceSrsIs(piece,set);
    let count = 0;


    if (capturedPieces[set][piece]) {
        count = capturedPieces[set][piece];

        return(
            
            <div
            className=" ml-[-0.3rem] w-[5%] relative flex ">
                {Array(count).fill(0).map((_,i) =>{        
                    return(
                        <img
                        key = {i}
                        id={piece+i}
                        className={`absolute w-[1.5rem]`} style= {{left:`-${0.3*i}rem`} } src={pieceSrc} alt="" />
                    )})}
            </div> 
            

        )
    }
    else{
        return(
            null
        )
    }
}
export default CapturedPieceCount;