import Board from "./board";
import PlayerCard from "./playerCard";

const BoardCard = () =>{

    return (
        <div
        className=" w-fit h-full">
            <PlayerCard player={'player2'}/>
           <Board></Board> 
           <PlayerCard player={'player1'}/>
           </div>
    )
}

export default BoardCard;