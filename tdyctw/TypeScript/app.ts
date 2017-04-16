/// <reference path="def/phaser.d.ts"/>

function sayHello() {
    const compiler = (document.getElementById("compiler") as HTMLInputElement).value;
    const framework = (document.getElementById("framework") as HTMLInputElement).value;
    return "Hello from ${compiler} and ${framework}!";
}

function generateUID() {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    var firstPartString = ("000" + firstPart.toString(36)).slice(-3);
    var secondPartString = ("000" + secondPart.toString(36)).slice(-3);
    return firstPartString + secondPartString;
}

class SimpleGame {
    constructor() {
        this.game = new Phaser.Game(800, 450, Phaser.AUTO, "gamecontainer", { preload: this.preload, create: this.create });
    }

    game: Phaser.Game;

    preload() {
        this.game.load.image("logo", "Content/img/bjlogo.png");
    }

    create() {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "logo");
        logo.anchor.setTo(0.5, 0.5);
    }
}

window.onload = () => {
    var game = new SimpleGame();
};