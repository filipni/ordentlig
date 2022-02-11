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
            keystates: {}
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
        if (this.state.gamestate !== 'running')
        {
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

            if (guessedWord.length === prevState.word.length && !words.includes(guessedWord))
            {
                const startTile = rowIndex * prevState.word.length;
                updatedTiles = updatedTiles.fill(null, startTile, startTile + prevState.word.length);
                toast('Ordet finns inte i listan', {id: 'invalid', position: 'bottom-center'});

                return {tiles: updatedTiles, activeTile: startTile};
            }

            let keystates = prevState.keystates;
            
            if (guessedWord.length === prevState.word.length)
            {
                const wordLength = prevState.word.length;
                const getStartIndex = rowIndex => rowIndex * wordLength;
                let guesses = [...Array(rowIndex + 1).keys()].map(i => updatedTiles.slice(getStartIndex(i), getStartIndex(i) + wordLength));

                guesses.forEach(guess => {
                    guess.forEach((c, index) => {
                        if (c === prevState.word[index])
                            keystates[c] = 'correct';
                        else if (prevState.word.includes(c) && keystates[c] !== 'correct')
                            keystates[c] = 'partial';
                        else
                            keystates[c] = 'incorrect';
                    }) 
                });
            }

            const nextTile = prevState.activeTile + 1;
            const gamestate = guessedWord === prevState.word ? 'winning'
                : nextTile >= numberOfTiles ? 'loosing' : 'running';

            this.showResult(gamestate, prevState.word);

            return {tiles: updatedTiles, activeTile: nextTile, gamestate: gamestate, keystates: keystates};
        }
    }

    showResult(gamestate, word) {
        if (gamestate === 'winning')
            toast('Bra jobbat!', {icon: '👏', id: 'winning'});
        else if (gamestate === 'loosing')
            toast(`Bättre lycka nästa gång!\n Ordet var: ${word.toUpperCase()}`, {icon: '😢', id: 'losing'});
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
                <Keyboard keystates={this.state.keystates} buttonHandler={this.handleButtonPress} />
            </div>
        );
    }
    
    renderRow(index) {
        return <Row key={index} word={this.state.word} guessedLetters={this.getRowLetters(this.state.tiles, index)} />;
    }

    handleButtonPress(e) {
        let key = e.target.value;
        if (key === '⌫') key = 'Backspace';
        this.handleKey(key);
    }
}

export default Board;