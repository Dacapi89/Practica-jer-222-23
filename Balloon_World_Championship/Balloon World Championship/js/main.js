import {Start} from './Scenes/Start.js';
import {MainMenu} from './Scenes/MainMenu.js';
import {Game} from './Scenes/game.js';
import {Settings} from './Scenes/Settings.js';
import {SettingsDos} from './Scenes/SettingsDos.js';
import {Results} from './Scenes/Results.js';
import {Pause} from './Scenes/Pause.js';
import {Credits} from './Scenes/Credits.js';
import {CreditsDos} from './Scenes/CreditsDos.js';

const config ={
    type: Phaser.AUTO,
    width:1280,
    height:832,
    scene:  [Start, MainMenu, Game, Settings, Results, Pause, SettingsDos, Credits, CreditsDos],
    physics:{
        default:'arcade',
        arcade:{
            gravity: {y:400},
            debug: false
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