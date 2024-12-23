import pieceData from "@/utils/pieceData";
import useBoardState from "@/utils/boardState";



const PlayerCard = ({player}) =>{
    
    let imgSrc = player == 'player1' ? pieceData.pawn : pieceData.b_pawn;
    return(
        <div className="w-full h-[5rem]">
            <div className=" w-fit aspect-auto flex items-center gap-[15%]">
                <img src={imgSrc} alt="" />
            <p
            className=" font-bold" > {player}</p>
            </div>
                <div 
                className=" relative  w-[100%] h-[2.5rem] bg-[red] flex" >
                    <div
                    className=" pieces-line grid">
                        <div
                        className="pawns">
                            <img
                            className=" absolute w-[]" src={pieceData.b_pawn} alt="" />
                            {/* <img
                            className="absolute  w-[55%]" src={pieceData.b_pawn} alt="" /> */}
                        </div>
                        <div
                        className="knights"></div>
                        <div
                        className="bishops"></div>
                        <div
                        className="rooks"></div>
                        <div
                        className="queen"></div>
                        <div
                        className="king"></div>
                    </div>
                </div>
        </div>
        
    ) 
}

export default PlayerCard;