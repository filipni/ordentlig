import '../style/Key.css'
import '../style/Keyboard.css'
import '../style/KeyRow.css'
import '../style/Colors.css'

function Keyboard(props) {
    return (
        <div className='Keyboard'>
            <div className='KeyRow'>
                {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'å']
                    .map(letter => renderButton(letter, props.keyStates[letter], props.buttonHandler))}
            </div>
            <div className='KeyRow'>
                {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä']
                    .map(letter => renderButton(letter, props.keyStates[letter], props.buttonHandler))}
            </div>
            <div className='KeyRow'>
                {['z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫']
                    .map(letter => renderButton(letter, props.keyStates[letter], props.buttonHandler))}
            </div>
        </div>
    );
}

function renderButton(key, state, buttonHandler) {
    return (
        <button key={key} className={`Key ${state}`} onClick={buttonHandler}>
            {key.toUpperCase()}
        </button>
    );
}

export default Keyboard;