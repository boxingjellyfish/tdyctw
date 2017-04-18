/// <reference path="../def/phaser.d.ts"/>

module tdyctw {

    export class ZoomCamera extends Phaser.Group {

        public static ZOOM_RESET: number = 1;
        public static ZOOM_CLOSE: number = 1.2;
        public static ZOOM_FAR: number = 0.8;

        public currentZoom: number;

        constructor(game: Phaser.Game) {
            super(game);
            this.scale.setTo(ZoomCamera.ZOOM_RESET);            
        }

        public zoomTo(scale: number) {
            this.currentZoom = scale;
            this.game.add.tween(this.scale).to({ x: scale, y: scale }, 200).start();
        }

        public inputPosition(): Phaser.Point {
            var inverse = 1 / this.currentZoom;
            return this.game.input.position.clone().multiply(inverse, inverse);
        }
    }

}