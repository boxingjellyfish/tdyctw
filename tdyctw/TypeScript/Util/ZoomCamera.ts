/// <reference path="../def/phaser.d.ts"/>

module tdyctw {

    export class ZoomCamera extends Phaser.Group {

        public static ZOOM_RESET: number = 1;
        public static ZOOM_CLOSE: number = 1.2;
        public static ZOOM_FAR: number = 0.8;

        public currentZoom: number;

        zoomInButton: Phaser.Text;
        zoomOutButton: Phaser.Text;
        zoomResetButton: Phaser.Text;

        zoomButtonStyle: any = { font: "20px 'Share Tech Mono'", fill: "#00ff00" };

        constructor(game: Phaser.Game) {
            super(game);
            this.zoomTo(ZoomCamera.ZOOM_RESET);

            this.zoomInButton = this.game.add.text(this.game.world.width - 60, 10, "+", this.zoomButtonStyle);
            this.zoomInButton.inputEnabled = true;
            this.zoomInButton.alpha = 0.75;
            this.zoomInButton.events.onInputDown.add(function () {
                this.zoomIn();
            }, this);

            this.zoomResetButton = this.game.add.text(this.game.world.width - 40, 10, "*", this.zoomButtonStyle);
            this.zoomResetButton.inputEnabled = true;
            this.zoomResetButton.alpha = 0.75;
            this.zoomResetButton.events.onInputDown.add(function () {
                this.zoomTo(ZoomCamera.ZOOM_RESET);
            }, this);

            this.zoomOutButton = this.game.add.text(this.game.world.width - 20, 10, "-", this.zoomButtonStyle);
            this.zoomOutButton.inputEnabled = true;
            this.zoomOutButton.alpha = 0.75;
            this.zoomOutButton.events.onInputDown.add(function () {
                this.zoomOut();
            }, this);
        }

        public zoomTo(scale: number) {
            this.currentZoom = scale;
            this.game.add.tween(this.scale).to({ x: scale, y: scale }, 200).start();
        }

        public inputPosition(): Phaser.Point {
            var inverse = 1 / this.currentZoom;
            return this.game.input.position.clone().multiply(inverse, inverse);
        }

        public zoomIn() {
            if (this.currentZoom <= 2) {
                this.zoomTo(this.currentZoom + 0.1);
            }
        }

        public zoomOut() {
            if (this.currentZoom >= 0.5) {
                this.zoomTo(this.currentZoom - 0.1);
            }
        }

        update() {
            this.zoomInButton.alpha = this.zoomInButton.input.pointerOver() ? 1 : 0.75;
            this.zoomResetButton.alpha = this.zoomResetButton.input.pointerOver() ? 1 : 0.75;
            this.zoomOutButton.alpha = this.zoomOutButton.input.pointerOver() ? 1 : 0.75;
        }
        
    }

}