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
                {['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'].map(letter => this.renderButton(letter))}
            </div>
        </div>
    )}

    renderButton(letter) {
        const state = this.props.keystates[letter];

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

        return <button className={`Key ${style}`}>{letter.toUpperCase()}</button>;
    }
}

export default Keyboard;