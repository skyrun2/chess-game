import pieceData from "@/utils/pieceData";
import CapturedPieceCount from "./capturedPiecesCount";

 

const PlayerCard = ({player}) =>{
    
    let imgSrc = player == 'player1' ? pieceData.pawn : pieceData.b_pawn;
    return(
        <div className="  w-full h-[5rem] grid grid-cols-1">
            <div className=" w-fit h aspect-auto grid grid-cols-2 ">
                <img
                className="h-[100%]"
                 src={imgSrc} alt="" />
            <p
            className=" font-bold text-[#fff]" > {player}</p>
            </div>
                <div 
                className="  ml-[-2rem] w-[100%] h-[2.5rem] flex" >
                    <div
                    className=" pl-[3rem] pieces-line  w-[100%] h-[100%] flex ">
                            <CapturedPieceCount player={player} piece = 'pawn' />                                    
                                                
                            <CapturedPieceCount player={player} piece = 'knight' />                                   

                        
                            <CapturedPieceCount player={player} piece = 'bishop' />            

                        
                            <CapturedPieceCount player={player} piece = 'rook' />            


                            <CapturedPieceCount player={player} piece = 'queen' />            

                        
                            <CapturedPieceCount player={player} piece = 'king' />            

                    </div>
                </div>
        </div>
        
    ) 
}

export default PlayerCard;