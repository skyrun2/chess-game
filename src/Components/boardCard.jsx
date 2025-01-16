import Board from "./board";
import CheckMateModal from "./checkMateModal";
import PlayerCard from "./playerCard";

const BoardCard = () =>{

    return (
        <div
        className=" relative w-fit h-full flex flex-col gap-[1rem]">
            <PlayerCard player={'player2'}/>
           <Board></Board> 
           <PlayerCard player={'player1'}/>
           <CheckMateModal/>
           </div>
    )
}

export default BoardCard;