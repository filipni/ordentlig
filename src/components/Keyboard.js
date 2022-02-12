import React from 'react';
import '../style/Key.css'
import '../style/Keyboard.css'
import '../style/KeyRow.css'

class Keyboard extends React.Component {
    render() { return (
        <div className='Keyboard'>
            <div className='KeyRow'>
                {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'å'].map(letter => this.renderButton(letter))}
            </div>
            <div className='KeyRow'>
                {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'].map(letter => this.renderButton(letter))}
            </div>
            <div className='KeyRow'>
                {['z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'].map(letter => this.renderButton(letter))}
            </div>
        </div>
    )}

    renderButton(key) {
        const state = this.props.keystates[key];

        let style;
        switch (state) {
            case 'correct':
                style = 'CorrectKey';
                break;
            case 'incorrect':
                style = 'IncorrectKey';
                break;
            case 'partial':
                style = 'PartialKey';
                break;
            default:
                style = '';
                break;
        }

        return <button key={key} className={`Key ${style}`} onClick={this.props.buttonHandler}>{key.toUpperCase()}</button>;
    }
}

export default Keyboard;