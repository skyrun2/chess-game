import NotationCard from "./notationCard";
import NotationControlBar from "./notationControlBar";

const NotationBar = () =>{
    return(
        <div 
        className="w-[30%] max-[999px]:w-[50%] max-[700px]:w-[70%]  max-[450px]:w-[80%] h-[20rem] bg-[#21201d] flex flex-col rounded-[.5rem] border-[.15rem] border-[#262522]">
            <NotationCard/>
            <NotationControlBar/>
        </div>
    )
}

export default NotationBar;