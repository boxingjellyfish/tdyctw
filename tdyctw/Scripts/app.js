function sayHello() {
    var compiler = document.getElementById("compiler").value;
    var framework = document.getElementById("framework").value;
    return "Hello from ${compiler} and ${framework}!";
}
function generateUID() {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    var firstPartString = ("000" + firstPart.toString(36)).slice(-3);
    var secondPartString = ("000" + secondPart.toString(36)).slice(-3);
    return firstPartString + secondPartString;
}
var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(800, 450, Phaser.AUTO, "gamecontainer", { preload: this.preload, create: this.create });
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image("logo", "Content/img/bjlogo.png");
    };
    SimpleGame.prototype.create = function () {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "logo");
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(4, 4);
    };
    return SimpleGame;
}());
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=app.js.map