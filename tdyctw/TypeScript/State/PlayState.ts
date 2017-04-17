/// <reference path="../def/phaser.d.ts"/>

module tdyctw {

    export class PlayState extends Phaser.State {

        debugText: Phaser.Text;
        bases: Phaser.Sprite[];
        selectedBase: Phaser.Sprite;
        selectedBaseIndex: number;
        trailLine: Phaser.Graphics;

        create() {
            var debugTextStyle = { font: "10px monospace", fill: "#ffffff" };
            this.debugText = this.add.text(0, 0, "Play state", debugTextStyle);
            this.debugText.alpha = 0;

            this.bases = [];
            for (var i = 0; i < 4; i++) {
                var base = new BaseSprite(this.game, this.game.rnd.integerInRange(50, this.game.world.width - 50), this.game.rnd.integerInRange(50, this.game.world.height - 50));
                base.baseIndex = i;
                base.events.onInputDown.add(function (sprite: BaseSprite, pointer: any) {
                    sprite.animations.play("pulse", 6, true);
                    this.selectedBase = sprite;
                }, this);
                this.bases.push(base);
                this.add.existing(base);
            }

            this.game.input.onDown.add(function (sprite: BaseSprite, pointer: any) {
                for (var i = 0; i < this.bases.length; i++) {
                    this.bases[i].animations.stop(null, true);
                    this.selectedBase = null;
                }
            }, this);

            this.trailLine = this.game.add.graphics(0, 0);
        }

        update() {
            this.trailLine.clear();
            this.debugText.text = "selectedBase: " + this.selectedBase;
            if (this.selectedBase != null) {
                /*
                this.trailLine.lineStyle(1, 0x008800, 1);
                this.trailLine.moveTo(this.selectedBase.x, this.selectedBase.y);
                this.trailLine.lineTo(this.game.input.x, this.game.input.y);
                */
                this.trailLine.lineStyle(1, 0x008800, 1);
                var draw = true;
                var fromX = this.selectedBase.x;
                var fromY = this.selectedBase.y;
                var toX = this.game.input.x;
                var toY = this.game.input.y;
                var x = fromX;
                var y = fromY;
                var size = 2;
                for (var i = 0.05; i <= 1; i = i + 0.05) {
                    this.trailLine.moveTo(x, y);
                    x = fromX + (toX - fromX) * i;
                    y = fromY + (toY - fromY) * i;
                    if (draw) {
                        this.trailLine.lineTo(x, y);
                    }
                    draw = !draw;
                }
            }
        }
    }

}