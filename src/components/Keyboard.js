import React from 'react';
import '../style/Key.css'
import '../style/Keyboard.css'
import '../style/KeyRow.css'

class Keyboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { return (
        <div className='Keyboard'>
            <div className='KeyRow'>
                {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Å'].map(c => <button className='Key'>{c}</button>)}
            </div>
            <div className='KeyRow'>
                {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä'].map(c => <button className='Key'>{c}</button>)}
            </div>
            <div className='KeyRow'>
                {['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'].map(c => <button className='Key'>{c}</button>)}
            </div>
        </div>
    )}
}

export default Keyboard;