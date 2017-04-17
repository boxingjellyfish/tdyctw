/// <reference path="../def/phaser.d.ts"/>

module tdyctw {

    export class PlayState extends Phaser.State {

        titleText: Phaser.Text;

        create() {
            var titleStyle = { font: "18px monospace", fill: "#00ff00", align: "center" };
            var titleString = this.game.cache.getJSON("strings")["main_menu_title"];
            this.titleText = this.add.text(this.game.world.centerX, this.game.world.centerY, "PLAY STATE", titleStyle);
            this.titleText.anchor.set(0.5);
        }
        
    }

}