import React from 'react';
import Row from './Row.js';
import Keyboard from './Keyboard.js';
import '../style/Board.css';
import words from '../words.js';
import toast, {Toaster} from 'react-hot-toast';

const numberOfGuesses = 6;
const wordLength = 5;
const numberOfTiles = numberOfGuesses * wordLength;

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            word: this.getRandomElement(words),
            activeTile: 0,
            tiles: Array(numberOfTiles).fill(null),
            gamestate: 'running',
            keyStates: {}
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleButtonPress = this.handleButtonPress.bind(this);
    }

    getRandomElement(array) {
        const randomIndex = Math.floor(Math.random()*array.length);
        return array[randomIndex];
    }

    handleKeyDown(e) {
        this.handleKey(e.key);
    }

    handleKey(key) {
        if (this.state.gamestate !== 'running') {
            this.showResult(this.state.gamestate, this.state.word);
            return;
        }
        this.setState(prevState => this.updateState(prevState, key));
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

            if (guessedWord.length === prevState.word.length && !words.includes(guessedWord)) {
                const startTile = rowIndex * prevState.word.length;
                updatedTiles = updatedTiles.fill(null, startTile);

                toast('Ordet finns inte i listan', {id: 'invalid', position: 'bottom-center', duration: 500});
                return {tiles: updatedTiles, activeTile: startTile};
            }

            let keyStates = prevState.keyStates;
            if (guessedWord.length === prevState.word.length) {
                const guesses = this.getGuesses(updatedTiles);
                keyStates = this.getKeyStates(prevState.word, guesses);
            }

            const nextTile = prevState.activeTile + 1;
            const gamestate = guessedWord === prevState.word ? 'won'
                : nextTile >= numberOfTiles ? 'lost' : 'running';

            this.showResult(gamestate, prevState.word);
            return {tiles: updatedTiles, activeTile: nextTile, gamestate: gamestate, keyStates: keyStates};
        }
    }

    getGuesses(tiles) {
        return [...Array(numberOfGuesses).keys()].map(index => this.getRowLetters(tiles, index));
    }

    getKeyStates(word, guesses) {
        let keyStates = {};
        guesses.forEach(guess => {
            guess.forEach((key, index) => {
                if (key === word[index] || keyStates[key] == 'correct')
                    keyStates[key] = 'correct';
                else if (word.includes(key) && keyStates[key] !== 'correct')
                    keyStates[key] = 'partial';
                else
                    keyStates[key] = 'incorrect';
            }) 
        });
        return keyStates;
    }

    showResult(gamestate, word) {
        if (gamestate === 'won')
            toast('Bra jobbat!', {icon: '👏', id: 'won'});
        else if (gamestate === 'lost')
            toast(`Bättre lycka nästa gång!\n Ordet var: ${word.toUpperCase()}`, {icon: '😢', id: 'lost'});
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
                {this.renderRows()}
                <Keyboard keyStates={this.state.keyStates} buttonHandler={this.handleButtonPress} />
            </div>
        );
    }

    renderRows() {
        return [...Array(numberOfGuesses).keys()].map((index) =>
            <Row key={index} word={this.state.word} guessedLetters={this.getRowLetters(this.state.tiles, index)} />);
    }

    handleButtonPress(e) {
        let key = e.target.value;
        if (key === '⌫') key = 'Backspace';
        this.handleKey(key);
    }
}

export default Board;