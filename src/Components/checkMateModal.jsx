import useBoardState from "@/utils/boardState";
import pieceData from "@/utils/pieceData";
import useTiles from "@/utils/useTiles";
import {  useState } from "react";


const CheckMateModal = () =>{
    const isCheckMate = useBoardState((state)=>state.isCheckMate);
    const winningSet = useBoardState((state)=>state.winningSet);
    const resetAll = useBoardState((state)=>state.resetAll);
    // const resetTilesState = useTiles((state)=>state.resetTilesState);
    const setReviewMode = useBoardState((state)=>state.setReviewMode);
    const [localReview,setLocalReview] = useState(false);
    function handleOnclick(e) {
        let id = e.currentTarget.id
        switch (id) {
            case 'new_match':
                
                resetAll();
                // resetTilesState();
                break;
            case 'review':
                setLocalReview(true)
                setReviewMode();
                break;
            default:
                break;
        } 
        
    }

    return(
        <div 
        id={(isCheckMate && !localReview) ? 'open' : 'none'}
        // id={''}
        >
            
            <div 
        className=" py-[.5rem] pb-[1rem] w-[13rem] h-[15rem] 
                    absolute bottom-[50%] translate-y-[50%] right-[50%] translate-x-[50%]
                    bg-[#262421] aspect-square rounded-[.5rem]
                    grid grid-cols-1 place-items-center">
            <div
             className=" text-[#fff] font-bold text-center"
             >
                <p
                className="text-[1.3rem] "
                >{winningSet == 'white' ? 'White Won' : 'Black Won'}</p>
                <p
                className="text-[.8rem] "
                >by checkmate</p>
            </div>
            <div> 
                <img src={winningSet == 'white' ? pieceData.pawn : pieceData.b_pawn} alt="" />                
            </div>

            <div
            className="w-[70%] grid grid-cols-1 gap-[.8rem]">
                <button
                id = 'new_match'
                className=" py-[.3rem] w-[100%] relative
                            bg-[#81B64C]  text-[#fff] rounded border-[#45753C] border-b-[.3rem]
                            font-bold  z-40"
                onClick={e=>handleOnclick(e)}
                >
                    <p>New Match</p>
                </button>
                <button
                id = 'review'
                onClick={e=>handleOnclick(e)}
                className=" py-[.3rem] w-[100%] bg-[#81B64C]  text-[#fff] rounded border-[#45753C] border-b-[.3rem]  font-bold "
                >
                    <p>Review</p>
                </button>
            </div>
            
        </div>
        </div>
    )
}

export default CheckMateModal;