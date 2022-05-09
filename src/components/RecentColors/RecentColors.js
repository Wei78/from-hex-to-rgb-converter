import './RecentColors.scss';

const RecentColors = ({data, onClose, show}) => {

    const colors = data.map((item, i) => {
        return (
            <li className='modal-item' key={i}>{item}</li>
        )
    })

    colors.shift();

    return (
    <>
        {show ? 
        <div className='modal'>
            <div className='modal-header'>Recent colors</div>
                <ol className='modal-list'>
                    {colors}
                </ol>
            <button className='modal-btn' onClick={() => onClose(false)}>Close</button>
        </div> : null}
    </>
    )
}

export default RecentColors;