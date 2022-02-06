import React from 'react';
import Row from './Row.js';
import '../style/Board.css'
import words from '../words.js'
import toast, {Toaster} from 'react-hot-toast';

const numberOfGuesses = 6;
const wordLength = 5;
const numberOfTiles = numberOfGuesses * wordLength;

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            word: 'delad',//this.getRandomElement(words),
            activeTile: 0,
            tiles: Array(numberOfTiles).fill(null),
            gamestate: 'running'
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    getRandomElement(array) {
        const randomIndex = Math.floor(Math.random()*array.length);
        return array[randomIndex];
    }

    handleKeyDown(e) {
        if (this.state.gamestate !== 'running')
        {
            this.showResult(this.state.gamestate, this.state.word);
            return;
        }

        this.setState(prevState => this.updateState(prevState, e.key));
    }

    updateState(prevState, pressedKey) {
        if(pressedKey === 'Backspace') {
            if (this.tileIsFirstInRow(prevState.activeTile)) return;

            let nextTile = prevState.activeTile - 1; 
            let updatedTiles = prevState.tiles.slice();
            updatedTiles[nextTile] = null;

            return {tiles: updatedTiles, activeTile: nextTile};
        }
        else if (this.characterIsLetter(pressedKey)) {
            let updatedTiles = prevState.tiles.slice();
            updatedTiles[prevState.activeTile] = pressedKey.toLowerCase();

            const rowIndex = this.getRowFromTile(prevState.activeTile);
            const guessedWord = this.getRowLetters(updatedTiles, rowIndex).join("");

            const nextTile = prevState.activeTile + 1;
            const gamestate = guessedWord === prevState.word ? 'winning'
                : nextTile >= numberOfTiles ? 'loosing' : 'running';

            this.showResult(gamestate, prevState.word);

            return {tiles: updatedTiles, activeTile: nextTile, gamestate: gamestate};
        }
    }

    showResult(gamestate, word) {
        if (gamestate === 'winning')
            toast('Good job!', {icon: '👏', id: 'winning'});
        else if (gamestate === 'loosing')
            toast(`Better luck next time...\n Correct word: ${word.toUpperCase()}`, {icon: '😢', id: 'losing'});
    }

    tileIsFirstInRow(tile) {
        return tile % wordLength === 0
    }

    characterIsLetter(c) {
        return (/^[a-zA-ZåäöÅÄÖ]$/).test(c);
    }

    getRowFromTile(tile) {
        return Math.floor(tile / wordLength);
    }

    getRowLetters(tiles, index) {
        const rowStart = index * wordLength; 
        const rowEnd = rowStart + wordLength;
        const rowLetters = tiles.slice(rowStart, rowEnd);
        return rowLetters;
    }

    render() {
        return (
            <div tabIndex={0} className="Board" onKeyDown={this.handleKeyDown}>
                <Toaster />
                <div className='Banner'>ordentlig</div>
                {[...Array(numberOfGuesses).keys()].map((index) =>
                    this.renderRow(index)
                )}
            </div>
        );
    }
    
    renderRow(index) {
        return <Row key={index} word={this.state.word} guessedLetters={this.getRowLetters(this.state.tiles, index)} />;
    }
}

export default Board;