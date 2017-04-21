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
        selectSound: Phaser.Sound;

        create() {
            this.selectSound = this.add.audio("baseSelectSFX", 1.0);

            var debugTextStyle = { font: "12px 'Share Tech Mono'", fill: "#00ff00" };
            this.debugText = this.add.text(0, 0, "", debugTextStyle);

            this.zoomCamera = new ZoomCamera(this.game);
            this.add.existing(this.zoomCamera);

            this.bases = [];
            for (var i = 0; i < 4; i++) {
                var base = new BaseSprite(this.game, this.rnd.integerInRange(50, this.world.width - 50), this.rnd.integerInRange(50, this.world.height - 50));
                base.baseIndex = i;
                base.events.onInputDown.add(function (sprite: BaseSprite, pointer: any) {
                    this.selectSound.play();
                    sprite.animations.play("pulse", 6, true);
                    this.selectedBase = sprite;
                    this.selectedBaseIndex = sprite.baseIndex;
                }, this);
                this.bases.push(base);
                this.zoomCamera.add(base);
            }

            this.input.onDown.add(function (sprite: BaseSprite, pointer: any) {
                for (var i = 0; i < this.bases.length; i++) {
                    this.bases[i].animations.stop(null, true);
                    this.selectedBase = null;
                    this.selectedBaseIndex = -1;
                }
            }, this);

            this.trailLine = this.add.graphics(0, 0);
            this.trailOffset = 0;
        }

        update() {
            this.trailLine.clear();
            this.debugText.text = "FPS: " + this.time.fps + "|" + this.input.position + "|" + this.zoomCamera.inputPosition();
            if (this.selectedBase != null) {
                this.trailLine.lineStyle(this.trailWidth, 0x008800, 1.0);

                var zoom = this.zoomCamera.currentZoom;
                var basePosition = this.selectedBase.position.clone().multiply(zoom, zoom);
                
                var draw = true;
                var point = basePosition.clone();
                var norm = Phaser.Point.subtract(this.game.input.position, basePosition).normalize().setMagnitude(this.trailLength);
                var offset = norm.clone().setMagnitude(this.trailOffset);
                point.add(offset.x, offset.y);
                while (Phaser.Point.distance(basePosition, point) < Phaser.Point.distance(basePosition, this.game.input.position)) {
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