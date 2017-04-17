var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var tdyctw;
(function (tdyctw) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, 800, 450, Phaser.AUTO, 'gamecontainer', null) || this;
            _this.state.add('Boot', tdyctw.Boot, false);
            _this.state.add('Preloader', tdyctw.Preloader, false);
            _this.state.add('MainMenu', tdyctw.MainMenu, false);
            _this.state.start('Boot');
            return _this;
        }
        return Game;
    }(Phaser.Game));
    tdyctw.Game = Game;
})(tdyctw || (tdyctw = {}));
window.onload = function () {
    var game = new tdyctw.Game();
};
var tdyctw;
(function (tdyctw) {
    var Misc = (function () {
        function Misc() {
        }
        Misc.generateUID = function () {
            var firstPart = (Math.random() * 46656) | 0;
            var secondPart = (Math.random() * 46656) | 0;
            var firstPartString = ("000" + firstPart.toString(36)).slice(-3);
            var secondPartString = ("000" + secondPart.toString(36)).slice(-3);
            return firstPartString + secondPartString;
        };
        return Misc;
    }());
    tdyctw.Misc = Misc;
})(tdyctw || (tdyctw = {}));
var tdyctw;
(function (tdyctw) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.preload = function () {
            this.load.image("bjlogo", "/Content/img/bjlogo.png");
        };
        Boot.prototype.create = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    }(Phaser.State));
    tdyctw.Boot = Boot;
})(tdyctw || (tdyctw = {}));
var tdyctw;
(function (tdyctw) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.create = function () {
        };
        return MainMenu;
    }(Phaser.State));
    tdyctw.MainMenu = MainMenu;
})(tdyctw || (tdyctw = {}));
var tdyctw;
(function (tdyctw) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preloader.prototype.preload = function () {
            this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "bjlogo");
            this.logo.anchor.setTo(0.5, 0.5);
        };
        Preloader.prototype.create = function () {
            var fadeOut = this.add.tween(this.logo).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 1000);
            fadeOut.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    }(Phaser.State));
    tdyctw.Preloader = Preloader;
})(tdyctw || (tdyctw = {}));
//# sourceMappingURL=game.js.map