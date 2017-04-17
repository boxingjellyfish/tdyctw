/// <reference path="def/phaser.d.ts"/>

module tdyctw {

    export class Game extends Phaser.Game {

        constructor() {
            super(800, 450, Phaser.AUTO, "gamecontainer", null);

            this.state.add("BootState", BootState, false);
            this.state.add("PreloaderState", PreloaderState, false);
            this.state.add("MainMenuState", MainMenuState, false);
            this.state.add("PlayState", PlayState, false);

            this.state.start("BootState");
        }

    }

} 

window.onload = () => {
    var game = new tdyctw.Game();
};