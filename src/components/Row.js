import React from 'react';
import Tile from './Tile.js'
import '../style/Row.css';

const correctColor = '#0f5719';
const partialColor = '#d4af37';
const incorrectColor = '#787c7e';

class Row extends React.Component {
    renderTile(index, letter)
    {   const rowIsNotComplete = this.props.letters.includes(null);
        const color = rowIsNotComplete ? incorrectColor : this.getTileColor(index, letter); 

        const hidden = letter === null;

        return <Tile key={index} letter={letter} color={color} hidden={hidden} />;
    }

    getTileColor(index, letter)
    {
        if (this.props.word[index] === letter)
            return correctColor;
        else if (this.props.word.includes(letter)) {
            const previousOccurences = [...this.props.letters.slice(0, index)].filter(c => c === letter);
            const countInWord = [...this.props.word].filter(c => c === letter);
            return previousOccurences < countInWord ? partialColor : incorrectColor;
        }

        return incorrectColor;
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