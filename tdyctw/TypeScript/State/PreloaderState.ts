/// <reference path="../def/phaser.d.ts"/>

module tdyctw {

    export class PreloaderState extends Phaser.State {

        //logo: Phaser.Sprite;

        preload() {
            //this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "bjlogo");
            //this.logo.anchor.setTo(0.5, 0.5);

            // Load our actual games assets
            //this.load.image('titlepage', 'assets/titlepage.jpg');
            //this.load.image('logo', 'assets/logo.png');
            //this.load.audio('music', 'assets/title.mp3', true);
            //this.load.spritesheet('simon', 'assets/simon.png', 58, 96, 5);
            //this.load.image('level1', 'assets/level1.png');

            this.load.json("strings", "/Content/txt/strings_en.json");

            this.load.image("base", "/Content/img/base.png");

            this.load.spritesheet("baseSprite", "/Content/img/base_sprite.png", 32, 32, 2);
        }
        
        create() {
            this.game.state.start("MainMenuState", true, false);
        }
        
    }

}