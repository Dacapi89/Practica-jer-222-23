import {Login} from './scenes/Login.js';
import {Start} from './scenes/Start.js';
import {MainMenu} from './scenes/MainMenu.js';
import {Level1} from './scenes/Level1.js';
import {Results} from './scenes/Results.js';
import {ResultsPlayerWASDWins} from './scenes/ResultsPlayerWASDWins.js';
import {ResultsPlayerCursorsWins} from './scenes/ResultsPlayerCursorsWins.js';
import {Pause} from './scenes/Pause.js';
import {Credits} from './scenes/Credits.js';
import {Seleccion} from './scenes/Seleccion.js';
import {LevelOnline} from './scenes/LevelOnline.js';
import {Controls} from './scenes/Controls.js';
import {WaitingRoom} from './scenes/WaitingRoom.js';
import {DeleteUser} from './scenes/DeleteUser.js';

const config ={
    type: Phaser.AUTO,
    width:960,
    height:624,
    antialias: false,
    pixelArt: true,
    roundPixels: false,
    scene:  [ Login, Start, MainMenu, Seleccion,Level1, Results, ResultsPlayerWASDWins, ResultsPlayerCursorsWins, 
    Pause, Credits, LevelOnline, Controls, WaitingRoom, DeleteUser],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
            tileBias:16,
        }
    }
}

var game = new Phaser.Game(config);