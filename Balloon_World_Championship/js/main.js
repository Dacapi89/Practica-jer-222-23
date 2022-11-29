import {Start} from './scenes/Start.js';
import {MainMenu} from './scenes/MainMenu.js';
import {Level1} from './scenes/Level1.js';
import {Results} from './scenes/Results.js';
import {ResultsPlayerWASDWins} from './scenes/ResultsPlayerWASDWins.js';
import {ResultsPlayerCursorsWins} from './scenes/ResultsPlayerCursorsWins.js';
import {Pause} from './scenes/Pause.js';
import {Credits} from './scenes/Credits.js';

const config ={
    type: Phaser.AUTO,
    width:1280,
    height:832,
    antialias: false,
    pixelArt: true,
    roundPixels: false,
    scene:  [Start, MainMenu, Level1, Results, ResultsPlayerWASDWins, ResultsPlayerCursorsWins, 
    Pause, Credits],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
            tileBias:16,
        }
    }
}

var game= new Phaser.Game(config);

function create ()
{
    console.log('create');
    // 2:30 in seconds
    this.initialTime = 150;

    text = this.add.text(32, 32, 'Countdown: ' + formatTime(this.initialTime));

    // Each 1000 ms call onEvent
    timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
}

function onEvent ()
{
    this.initialTime -= 1; // One second
    text.setText('Countdown: ' + formatTime(this.initialTime));
}