import PropTypes from 'prop-types';
import Colls from './colls';
const Row = ({count}) =>{
    let isOdd = false;  
    // console.log(typeof {count});

    isOdd = count%2 ? false : true;

    
    // let bgColor = isOdd? 'bg-[white]' : 'bg-[black]';
    
    
    let clasList = `relative
    w-[100%]
    h-[12.5%]
    flex  `
    return(
        <div className={clasList}>
            <Colls count = {count} isOdd={isOdd}/>
        </div>
    )
}

Row.propTypes = {
    count: PropTypes.number.isRequired,
}
export default Row;