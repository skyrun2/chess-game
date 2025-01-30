import useBoardState from "@/utils/boardState";

const ResignModal = ()=>{
    const closeResignModal = useBoardState((state)=>state.closeResignModal);
    const resignModal = useBoardState((state)=>state.resignModal);
    const setResign = useBoardState((state)=>state.setResign);
    const turn = useBoardState((state)=>state.turn);

    function handleOnClick(e) {
        let id = e.currentTarget.id;
        console.log(e.currentTarget.id);
        
        switch (id) {
            case "cancel":
                closeResignModal();
                break;
            case 'yes':
                setResign();
                closeResignModal()
                break;
            default:
                break;
        }
        
    }
    return(
        <div
        id={resignModal ? '' : 'none'}
        className=" px-[.3rem] py-[.5rem] w-[60%] h-[15%]
                    absolute bottom-[50%] translate-y-[50%] left-[50%] translate-x-[50%]
                    bg-[#262421] text-[#fff] text-[.8rem] text-center font-semibold rounded-[.5rem]
                    flex flex-col items-center justify-around z-40"              
        >
            <p>Are you sure, you, {turn}, wants to resign the match?</p>
            <div 
            className=" w-[70%] grid grid-cols-2 gap-[1rem] font-bold"
            >
                <button
                id="cancel"
                className=" py-[.5rem] w-[100] bg-[#3C3A38] rounded-[.3rem]"
                onClick={e=>handleOnClick(e)}                
                >
                    <p>Cancel</p>
                </button>
                <button
                id="yes"
                className="py-[.5rem] w-[100] bg-[#81B64C] rounded-[.3rem]"
                onClick={e=>handleOnClick(e)}                
                >
                    <p>Yes</p>
                </button>
            </div>
        </div>
    )
}
export default ResignModal;