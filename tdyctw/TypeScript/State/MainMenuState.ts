/// <reference path="../def/phaser.d.ts"/>

module tdyctw {

    export class MainMenuState extends Phaser.State {
        
        titleText: Phaser.Text;
        optionStartText: Phaser.Text;
        option2Text: Phaser.Text;
        option3Text: Phaser.Text;

        inputEnabled: boolean;

        create() {
            this.inputEnabled = false;
            
            var titleStyle = { font: "18px monospace", fill: "#00ff00", align: "center" };
            var titleString = this.game.cache.getJSON("strings")["main_menu_title"];
            this.titleText = this.add.text(this.game.world.centerX, this.game.world.centerY, titleString, titleStyle);
            this.titleText.anchor.set(0.5);
            this.titleText.alpha = 0;

            var optionStartStyle = { font: "14px monospace", fill: "#00ff00", align: "center" };
            var optionStartString = this.game.cache.getJSON("strings")["main_menu_start"];
            this.optionStartText = this.add.text(this.game.world.centerX, this.game.world.centerY * 1.25, optionStartString, optionStartStyle);
            this.optionStartText.anchor.set(0.5);
            this.optionStartText.alpha = 0;
            this.optionStartText.inputEnabled = true;
            this.optionStartText.events.onInputDown.add(this.startGame, this);

            var option2Style = { font: "14px monospace", fill: "#00ff00", align: "center" };
            var option2String = this.game.cache.getJSON("strings")["main_menu_placeholder"];
            this.option2Text = this.add.text(this.game.world.centerX, this.optionStartText.y + 25, option2String, option2Style);
            this.option2Text.anchor.set(0.5);
            this.option2Text.alpha = 0;
            this.option2Text.inputEnabled = true;

            var option3Style = { font: "14px monospace", fill: "#00ff00", align: "center" };
            var option3String = this.game.cache.getJSON("strings")["main_menu_placeholder"];
            this.option3Text = this.add.text(this.game.world.centerX, this.optionStartText.y + 50, option3String, option3Style);
            this.option3Text.anchor.set(0.5);
            this.option3Text.alpha = 0;
            this.option3Text.inputEnabled = true;

            var fadeInTitle = this.add.tween(this.titleText).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
            fadeInTitle.onComplete.add(function () {
                this.add.tween(this.optionStartText).to({ alpha: 0.75 }, 1000, Phaser.Easing.Linear.None, true);
                this.add.tween(this.option2Text).to({ alpha: 0.75 }, 1000, Phaser.Easing.Linear.None, true, 500);
                this.add.tween(this.option3Text).to({ alpha: 0.75 }, 1000, Phaser.Easing.Linear.None, true, 1000).onComplete.add(function () {
                    this.inputEnabled = true;
                }, this);
            }, this);

        }

        update() {
            if (this.inputEnabled) {
                this.optionStartText.alpha = this.optionStartText.input.pointerOver() ? 1 : 0.75;
                this.option2Text.alpha = this.option2Text.input.pointerOver() ? 1 : 0.75;
                this.option3Text.alpha = this.option3Text.input.pointerOver() ? 1 : 0.75;
            }
        }

        startGame() {
            this.inputEnabled = false;
            this.add.tween(this.titleText).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            this.add.tween(this.option2Text).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            this.add.tween(this.option3Text).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true).onComplete.add(function () {
                this.game.state.start("PlayState", true, false);
            }, this);
        }

    }

}