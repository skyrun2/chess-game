import legalMoves from "../utils/legalMoves"
import peiceClassIs from "../utils/peiceClassIs"
import pieceIs from "../utils/pieceIs"
import peiceSrsIs from "../utils/peicesrsIs"
import useTiles from "../utils/useTiles"
import useBoardState from "../utils/boardState"
const WhiteSet = ()=>{
    
    
    return Array(16).fill(0).map((_,i)=>{
        // if (i<8) {
            
        //     imp['8'+String.fromCharCode(97+i)] = pieceIs(i,'w')
        //     // setTiles(i)
        // }
        // else{
        //     imp['7'+String.fromCharCode(97+(i%8))] = pieceIs(i,'w')
        //     // setTiles(tiles)
        // }
        // console.log(imp);
        
        return(
        <div
        key={`w`+i}
        className={peiceClassIs(i,'w')}
        // onClick={e=>handleOnClick(e)}
        >
            <img
            id="oi"
            className={`relative w-[70%] translate-x-[25%] translate-y-[10%]`}
            src={peiceSrsIs(i,'w')}  />
            </div>    )
    })
}

export default WhiteSet