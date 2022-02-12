import React from 'react';
import Tile from './Tile.js'
import '../style/Row.css';

class Row extends React.Component {
    render() {
        return (
            <div className="Row">
                {this.props.guessedLetters.map((letter, index) => this.renderTile(index, letter))}
            </div>
        );
    }

    renderTile(index, letter)
    {   const rowIsNotComplete = this.props.guessedLetters.includes(null);
        const state = rowIsNotComplete ? 'normal' : this.getTileState(index, letter); 

        const hidden = letter === null;

        return <Tile key={index} letter={letter} state={state} hidden={hidden} />;
    }

    getTileState(index, letter)
    {
        if (this.props.word[index] === letter)
            return 'correct';
        else if (this.props.word.includes(letter)) {
            const incorrectOcurrencesInPreviousTiles = this.props.guessedLetters
                                                        .slice(0, index)
                                                        .filter((c, i) => c === letter && c !== this.props.word[i])
                                                        .length;
            const occurencesInWord = [...this.props.word].filter(c => c === letter).length;
            const correctOccurencesInGuess = this.props.guessedLetters
                                                       .filter((c, i) => c === letter && c === this.props.word[i])
                                                       .length;
            const occurencesLeftToFind = occurencesInWord - correctOccurencesInGuess;
            return incorrectOcurrencesInPreviousTiles < occurencesLeftToFind ? 'partial' : 'incorrect';
        }

        return 'incorrect';
    }
}

export default Row;