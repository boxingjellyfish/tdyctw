/// <reference path="def/phaser.d.ts"/>

module tdyctw {

    export class Game extends Phaser.Game {

        constructor() {

            super(800, 450, Phaser.AUTO, 'gamecontainer', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);

            this.state.start('Boot');

        }

    }

} 

window.onload = () => {
    var game = new tdyctw.Game();
};