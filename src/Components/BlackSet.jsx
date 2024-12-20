import { object } from "prop-types"
import useBoardState from "../utils/boardState"
import legalMoves from "../utils/legalMoves"
import peiceClassIs from "../utils/peiceClassIs"
import pieceIs from "../utils/pieceIs"
import peiceSrsIs from "../utils/peicesrsIs"
const BlackSet = ({state,dispatch})=>{
    const tiles = useBoardState((state)=>state.tiles)
    const setTiles = useBoardState((state)=>state.setTiles)
    let imp = {}
    return Array(16).fill(0).map((_,i)=>{
        // imp = 'a'+i
        // if (i<8) {
            
        //     imp['1'+String.fromCharCode(97+i)] = pieceIs(i,'b')
        //     // setTiles(tiles)
        // }
        // else{
        //     imp['2'+String.fromCharCode(97+(i%8))] = pieceIs(i,'b')
        //     // setTiles(tiles)
        // }
        // console.log(imp);
        
        // setTiles(tiles)
        return(
        <div
        key={`b`+i}
        className={peiceClassIs(i,'b')}
        onClick={e=>{legalMoves(e,state)}}
        >
            <img className={`relative text-slate-700 w-[70%] translate-x-[25%] translate-y-[-5%]`}
            id={pieceIs(i,'b')}
            src={peiceSrsIs(i,'b')} alt="" />
            </div>    )
    })
}
export default BlackSet