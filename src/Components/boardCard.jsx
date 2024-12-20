import Board from "./board"
import BottomLetter from "./bottomLetter"
import LeftNum from "./leftNums"
import RightNum from "./rightNum"
import TopLetter from "./topLetter"
const BoardCard = () => {
    return(
        <div
        className=" relative
                    top-[10%]
                    left-[50%]
                    translate-x-[-50%]
                    translate-y-[10%]
                    w-[40rem]
                    aspect-square
 
                    grid
                    grid-cols-8
                    ">
            {/* <Board area={35}/>
            <LeftNum area={35}/>
            <BottomLetter area={35}/> */}
        </div>
    )
}

export default BoardCard 