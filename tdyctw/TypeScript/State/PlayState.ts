/// <reference path="../def/phaser.d.ts"/>

module tdyctw {

    export class PlayState extends Phaser.State {

        debugText: Phaser.Text;
        bases: Phaser.Sprite[];
        selectedBase: Phaser.Sprite;
        selectedBaseIndex: number;
        trailLine: Phaser.Graphics;
        trailOffset: number = 0;
        trailOffsetIncrement: number = 0.5;
        trailLength: number = 4;
        trailWidth: number = 1;
        zoomCamera: ZoomCamera;

        create() {
            var debugTextStyle = { font: "12px monospace", fill: "#00ff00" };
            this.debugText = this.add.text(0, 0, "", debugTextStyle);

            this.zoomCamera = new ZoomCamera(this.game);
            this.add.existing(this.zoomCamera);

            this.bases = [];
            for (var i = 0; i < 4; i++) {
                var base = new BaseSprite(this.game, this.game.rnd.integerInRange(50, this.game.world.width - 50), this.game.rnd.integerInRange(50, this.game.world.height - 50));
                base.baseIndex = i;
                base.events.onInputDown.add(function (sprite: BaseSprite, pointer: any) {
                    sprite.animations.play("pulse", 6, true);
                    this.selectedBase = sprite;
                    this.selectedBaseIndex = sprite.baseIndex;
                    this.zoomCamera.zoomTo(ZoomCamera.ZOOM_FAR);
                }, this);
                this.bases.push(base);
                //this.add.existing(base);
                this.zoomCamera.add(base);
            }

            this.game.input.onDown.add(function (sprite: BaseSprite, pointer: any) {
                for (var i = 0; i < this.bases.length; i++) {
                    this.bases[i].animations.stop(null, true);
                    this.selectedBase = null;
                    this.selectedBaseIndex = -1;
                }
                this.zoomCamera.zoomTo(ZoomCamera.ZOOM_CLOSE);
            }, this);

            //this.trailLine = this.game.add.graphics(0, 0);
            this.trailLine = new Phaser.Graphics(this.game, 0, 0);
            this.zoomCamera.add(this.trailLine);
            this.trailOffset = 0;
        }

        update() {
            this.trailLine.clear();
            this.debugText.text = "FPS: " + this.game.time.fps + " " + this.game.input.position;
            if (this.selectedBase != null) {
                this.trailLine.lineStyle(this.trailWidth, 0x008800, 1.0);
                var draw = true;
                var point = this.selectedBase.position.clone();
                var norm = Phaser.Point.subtract(this.zoomCamera.inputPosition(), this.selectedBase.position).normalize().setMagnitude(this.trailLength);
                var offset = norm.clone().setMagnitude(this.trailOffset);
                point.add(offset.x, offset.y);
                while (Phaser.Point.distance(this.selectedBase.position, point) < Phaser.Point.distance(this.selectedBase.position, this.zoomCamera.inputPosition())) {
                    this.trailLine.moveTo(point.x, point.y);
                    point.add(norm.x, norm.y);
                    if (draw) {
                        this.trailLine.lineTo(point.x, point.y);
                    }
                    draw = !draw;
                }
                this.trailOffset += this.trailOffsetIncrement;
                if (this.trailOffset >= this.trailLength * 2) {
                    this.trailOffset = 0;
                }
            }
        }
    }

}