import Blackout from "./blackout";
import Board from "./board";
import CheckMateModal from "./checkMateModal";
import PlayerCard from "./playerCard";
import ResignModal from "./resignModal";

const BoardCard = () =>{
    
    return (
        <div
        className=" relative w-fit h-full flex flex-col gap-[1rem]">
            <PlayerCard player={'player2'}/>
           <Board></Board> 
           <PlayerCard player={'player1'}/>
           <CheckMateModal/>
           <ResignModal/>
           
           </div>
    )
}

export default BoardCard;