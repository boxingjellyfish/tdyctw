/// <reference path="../def/phaser.d.ts"/>

module tdyctw {

    export class Boot extends Phaser.State {

        preload() {
            this.load.image("bjlogo", "/Content/img/bjlogo.png");
        }

        create() {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;

            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;

            this.game.state.start('Preloader', true, false);
        }

    }

}