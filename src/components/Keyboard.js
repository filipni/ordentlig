import '../style/Key.css'
import '../style/Keyboard.css'
import '../style/KeyRow.css'
import '../style/Colors.css'

function Keyboard(props) {
    return (
        <div className='Keyboard'>
            <div className='KeyRow'>
                {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'å']
                    .map(key => renderButton(key, props.keyStates[key], props.buttonHandler))}
            </div>
            <div className='KeyRow'>
                {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä']
                    .map(key => renderButton(key, props.keyStates[key], props.buttonHandler))}
            </div>
            <div className='KeyRow'>
                {['z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫']
                    .map(key => renderButton(key, props.keyStates[key], props.buttonHandler))}
            </div>
        </div>
    );
}

function renderButton(key, state, buttonHandler) {
    return (
        <button key={key} value={key} className={`Key ${state}`} onClick={buttonHandler}>
            {key.toUpperCase()}
        </button>
    );
}

export default Keyboard;