import useBoardState from "@/utils/boardState";

const Blackout = ()=>{
    const resignModal = useBoardState((state)=>state.resignModal);
    const closeResignModal = useBoardState((state)=>state.closeResignModal);

    function handleOnClick(e) {
        closeResignModal()
        
    }
    return(
        <div
        id={resignModal ? '' : 'none'}
        // id={''}
        className=" absolute w-[100%] h-[100%] bg-[#00000099]"
        onClick={e=>handleOnClick(e)}
        >
        </div>
    )
}
export default Blackout;