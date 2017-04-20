/// <reference path="../def/phaser.d.ts"/>

module tdyctw {

    export class PreloaderState extends Phaser.State {
        
        preload() {

            // Strings
            this.load.json("strings", "/Content/txt/strings_en.json");

            // Images
            this.load.image("base", "/Content/img/base.png");
            this.load.spritesheet("baseSprite", "/Content/img/base_sprite.png", 32, 32, 2);

            // Audio
            this.game.load.audio("menuMusic", "/Content/audio/menu.mp3", true);
            this.game.load.audio("menuHoverSFX", "/Content/audio/beep-29.wav");
            this.game.load.audio("menuClickSFX", "/Content/audio/button-35.wav");
        }
        
        create() {
            this.game.state.start("MainMenuState", true, false);
        }
        
    }

}