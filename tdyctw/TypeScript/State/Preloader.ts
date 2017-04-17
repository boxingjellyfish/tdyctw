/// <reference path="../def/phaser.d.ts"/>

module tdyctw {

    export class Preloader extends Phaser.State {

        logo: Phaser.Sprite;

        preload() {
            this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "bjlogo");
            this.logo.anchor.setTo(0.5, 0.5);

            //  Load our actual games assets
            //this.load.image('titlepage', 'assets/titlepage.jpg');
            //this.load.image('logo', 'assets/logo.png');
            //this.load.audio('music', 'assets/title.mp3', true);
            //this.load.spritesheet('simon', 'assets/simon.png', 58, 96, 5);
            //this.load.image('level1', 'assets/level1.png');
        }
        
        create() {
            var fadeOut = this.add.tween(this.logo).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 1000);
            fadeOut.onComplete.add(this.startMainMenu, this);
        }

        startMainMenu() {
            this.game.state.start('MainMenu', true, false);
        }

    }

}