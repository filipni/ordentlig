import React from 'react';
import Tile from './Tile.js'
import './Row.css';

const correctColor = '#0f5719';
const partialColor = '#d4af37';
const incorrectColor = '#787c7e';

class Row extends React.Component {
    constructor(props) {
        super(props);
    }

    renderTile(index, letter)
    {
        let color = incorrectColor;

        if (this.props.word[index] === letter)
            color = correctColor;
        else if (this.props.word.includes(letter))
        {
            const previousOccurences = [...this.props.letters.slice(0, index)].filter(c => c === letter);
            const countInWord = [...this.props.word].filter(c => c === letter);
            color = previousOccurences < countInWord ? partialColor : incorrectColor;
        }

        const hidden = letter === null;

        return <Tile key={index} letter={letter} color={color} hidden={hidden} />;
    }

    render() {
        return (
            <div className="Row">
                {this.props.letters.map((letter, index) => this.renderTile(index, letter))}
            </div>
        );
    }
}

export default Row;