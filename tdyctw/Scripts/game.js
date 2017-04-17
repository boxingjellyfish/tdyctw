var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tdyctw;
(function (tdyctw) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, 800, 450, Phaser.AUTO, "gamecontainer", null) || this;
            _this.state.add("BootState", tdyctw.BootState, false);
            _this.state.add("PreloaderState", tdyctw.PreloaderState, false);
            _this.state.add("MainMenuState", tdyctw.MainMenuState, false);
            _this.state.add("PlayState", tdyctw.PlayState, false);
            _this.state.start("BootState");
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
    var PlayState = (function (_super) {
        __extends(PlayState, _super);
        function PlayState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PlayState.prototype.create = function () {
            var titleStyle = { font: "18px monospace", fill: "#00ff00", align: "center" };
            var titleString = this.game.cache.getJSON("strings")["main_menu_title"];
            this.titleText = this.add.text(this.game.world.centerX, this.game.world.centerY, "PLAY STATE", titleStyle);
            this.titleText.anchor.set(0.5);
        };
        return PlayState;
    }(Phaser.State));
    tdyctw.PlayState = PlayState;
})(tdyctw || (tdyctw = {}));
var tdyctw;
(function (tdyctw) {
    var BootState = (function (_super) {
        __extends(BootState, _super);
        function BootState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BootState.prototype.preload = function () {
            this.load.image("bjlogo", "/Content/img/bjlogo.png");
        };
        BootState.prototype.create = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "bjlogo");
            this.logo.anchor.setTo(0.5, 0.5);
            this.logo.alpha = 0;
            this.logo.scale.setTo(4, 4);
            var fadeIn = this.add.tween(this.logo).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
            fadeIn.onComplete.add(this.fadeInComplete, this);
        };
        BootState.prototype.fadeInComplete = function () {
            var fadeOut = this.add.tween(this.logo).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 1000);
            fadeOut.onComplete.add(this.startPreloader, this);
        };
        BootState.prototype.startPreloader = function () {
            this.game.state.start("PreloaderState", true, false);
        };
        return BootState;
    }(Phaser.State));
    tdyctw.BootState = BootState;
})(tdyctw || (tdyctw = {}));
var tdyctw;
(function (tdyctw) {
    var MainMenuState = (function (_super) {
        __extends(MainMenuState, _super);
        function MainMenuState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenuState.prototype.create = function () {
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
        };
        MainMenuState.prototype.update = function () {
            if (this.inputEnabled) {
                this.optionStartText.alpha = this.optionStartText.input.pointerOver() ? 1 : 0.75;
                this.option2Text.alpha = this.option2Text.input.pointerOver() ? 1 : 0.75;
                this.option3Text.alpha = this.option3Text.input.pointerOver() ? 1 : 0.75;
            }
        };
        MainMenuState.prototype.startGame = function () {
            this.inputEnabled = false;
            this.add.tween(this.titleText).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            this.add.tween(this.option2Text).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            this.add.tween(this.option3Text).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true).onComplete.add(function () {
                this.game.state.start("PlayState", true, false);
            }, this);
        };
        return MainMenuState;
    }(Phaser.State));
    tdyctw.MainMenuState = MainMenuState;
})(tdyctw || (tdyctw = {}));
var tdyctw;
(function (tdyctw) {
    var PreloaderState = (function (_super) {
        __extends(PreloaderState, _super);
        function PreloaderState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PreloaderState.prototype.preload = function () {
            this.load.json("strings", "/Content/txt/strings_en.json");
        };
        PreloaderState.prototype.create = function () {
            this.game.state.start("MainMenuState", true, false);
        };
        return PreloaderState;
    }(Phaser.State));
    tdyctw.PreloaderState = PreloaderState;
})(tdyctw || (tdyctw = {}));
//# sourceMappingURL=game.js.map