/// <reference path="../def/phaser.d.ts"/>

module tdyctw {

    export class BootState extends Phaser.State {

        logo: Phaser.Sprite;

        preload() {
            this.load.image("bjlogo", "/Content/img/bjlogo.png");
        }

        create() {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;

            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;

            // Studio logo
            this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "bjlogo");
            this.logo.anchor.setTo(0.5, 0.5);
            this.logo.alpha = 0;
            this.logo.scale.setTo(4, 4);
            
            var fadeIn = this.add.tween(this.logo).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
            fadeIn.onComplete.add(this.fadeInComplete, this);
        }

        fadeInComplete() {
            var fadeOut = this.add.tween(this.logo).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 1000);
            fadeOut.onComplete.add(this.startPreloader, this);
        }

        startPreloader() {
            this.game.state.start("PreloaderState", true, false);
        }

    }

}