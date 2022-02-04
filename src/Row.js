import React from 'react';
import Tile from './Tile.js'
import './Row.css';

class Row extends React.Component {
    constructor(props) {
        super(props);
    }

    renderTile(index, letter)
    {
        let color = 'grey';

        if (this.props.word[index] === letter)
            color = 'green';
        else if (this.props.word.includes(letter))
        {
            const previousOccurences = [...this.props.letters.slice(0, index)].filter(c => c === letter);
            const countInWord = [...this.props.word].filter(c => c === letter);
            color = previousOccurences < countInWord ? 'yellow' : 'grey';
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