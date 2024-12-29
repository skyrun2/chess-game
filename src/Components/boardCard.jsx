import Board from "./board";
import PlayerCard from "./playerCard";

const BoardCard = () =>{

    return (
        <div
        className=" w-fit h-full flex flex-col gap-[1rem]">
            <PlayerCard player={'player2'}/>
           <Board></Board> 
           <PlayerCard player={'player1'}/>
           </div>
    )
}

export default BoardCard;