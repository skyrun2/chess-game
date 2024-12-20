import PropTypes from "prop-types";

const Colls = ({isOdd}) =>{
    let bgColor ='';
    const CollList = ({isOdd})=>{
        console.log(typeof isOdd);
        
        const collList = Array(8).fill(0).map((_,i)=>{
            if (isOdd) {
                bgColor = i%2 ? 'bg-[white]' : 'bg-[black]'
            }
            else{
                bgColor = i%2 ? 'bg-[black]' : 'bg-[white]'
            }
            console.log(isOdd);
            
            let classList = `${bgColor}
                             w-[12.5%]
                             h-[100%]
                             list-none`
            return(
                <li key={i}
                className={classList}></li>
            )
        })
        return collList
    }

    return(
        <CollList isOdd = {isOdd} />
    )
}

Colls.propTypes ={
    isOdd : PropTypes.bool.isRequired
}
export default Colls;