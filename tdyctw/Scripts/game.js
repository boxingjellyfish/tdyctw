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
var tdyctw;
(function (tdyctw) {
    var BaseSprite = (function (_super) {
        __extends(BaseSprite, _super);
        function BaseSprite(game, x, y) {
            var _this = _super.call(this, game, x, y, "baseSprite") || this;
            _this.anchor.setTo(0.5, 0.5);
            _this.inputEnabled = true;
            _this.animations.add("pulse");
            return _this;
        }
        BaseSprite.prototype.update = function () {
        };
        return BaseSprite;
    }(Phaser.Sprite));
    tdyctw.BaseSprite = BaseSprite;
})(tdyctw || (tdyctw = {}));
var tdyctw;
(function (tdyctw) {
    var BootState = (function (_super) {
        __extends(BootState, _super);
        function BootState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BootState.prototype.preload = function () {
            this.game.load.audio("introSound", "/Content/audio/intro.mp3");
            this.load.image("bjlogo", "/Content/img/bjlogo.png");
        };
        BootState.prototype.create = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.time.advancedTiming = true;
            this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "bjlogo");
            this.logo.anchor.setTo(0.5, 0.5);
            this.logo.alpha = 0;
            this.introSound = this.game.add.audio("introSound", 0.5);
            this.introSound.play();
            var fadeIn = this.add.tween(this.logo).to({ alpha: 1 }, 1200, Phaser.Easing.Linear.None, true);
            fadeIn.onComplete.add(this.fadeInComplete, this);
        };
        BootState.prototype.fadeInComplete = function () {
            var fadeOut = this.add.tween(this.logo).to({ alpha: 0 }, 1200, Phaser.Easing.Linear.None, true, 1000);
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
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.titleStyle = { font: "18px 'Nova Mono'", fill: "#00ff00" };
            _this.optionStyle = { font: "14px 'Share Tech Mono'", fill: "#00ff00" };
            return _this;
        }
        MainMenuState.prototype.create = function () {
            this.inputEnabled = false;
            var titleString = this.game.cache.getJSON("strings")["main_menu_title"];
            this.titleText = this.add.text(this.game.world.centerX, this.game.world.centerY, titleString, this.titleStyle);
            this.titleText.anchor.set(0.5);
            this.titleText.alpha = 0;
            var optionStartString = this.game.cache.getJSON("strings")["main_menu_start"];
            this.optionStartText = this.add.text(this.game.world.centerX, this.game.world.centerY * 1.25, optionStartString, this.optionStyle);
            this.optionStartText.anchor.set(0.5);
            this.optionStartText.alpha = 0;
            this.optionStartText.inputEnabled = true;
            this.optionStartText.events.onInputDown.add(this.startGame, this);
            this.optionStartText.events.onInputOver.add(this.playRolloverSound, this);
            var option2String = this.game.cache.getJSON("strings")["main_menu_lorem"];
            this.option2Text = this.add.text(this.game.world.centerX, this.optionStartText.y + 25, option2String, this.optionStyle);
            this.option2Text.anchor.set(0.5);
            this.option2Text.alpha = 0;
            this.option2Text.inputEnabled = true;
            this.option2Text.events.onInputOver.add(this.playRolloverSound, this);
            var option3String = this.game.cache.getJSON("strings")["main_menu_ipsum"];
            this.option3Text = this.add.text(this.game.world.centerX, this.optionStartText.y + 50, option3String, this.optionStyle);
            this.option3Text.anchor.set(0.5);
            this.option3Text.alpha = 0;
            this.option3Text.inputEnabled = true;
            this.option3Text.events.onInputOver.add(this.playRolloverSound, this);
            this.hoverSound = this.game.add.audio("menuHoverSFX", 1.0);
            this.clickSound = this.game.add.audio("menuClickSFX", 1.0);
            this.menuMusic = this.game.add.audio("menuMusic", 0.5, true);
            this.menuMusic.onDecoded.add(this.musicReady, this);
        };
        MainMenuState.prototype.musicReady = function () {
            this.menuMusic.loopFull();
            var fadeInTitle = this.add.tween(this.titleText).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
            fadeInTitle.onComplete.add(function () {
                this.add.tween(this.optionStartText).to({ alpha: 0.75 }, 1000, Phaser.Easing.Linear.None, true);
                this.add.tween(this.option2Text).to({ alpha: 0.75 }, 1000, Phaser.Easing.Linear.None, true, 500);
                this.add.tween(this.option3Text).to({ alpha: 0.75 }, 1000, Phaser.Easing.Linear.None, true, 1000).onComplete.add(function () {
                    this.toggleInputEnabled(true);
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
            if (this.inputEnabled) {
                this.clickSound.play();
                this.inputEnabled = false;
                this.menuMusic.fadeOut(1000);
                this.add.tween(this.titleText).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
                this.add.tween(this.option2Text).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
                this.add.tween(this.option3Text).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true).onComplete.add(function () {
                    this.game.state.start("PlayState", true, false);
                }, this);
            }
        };
        MainMenuState.prototype.toggleInputEnabled = function (enabled) {
            this.inputEnabled = enabled;
        };
        MainMenuState.prototype.playRolloverSound = function () {
            if (this.inputEnabled) {
                this.hoverSound.play();
            }
        };
        return MainMenuState;
    }(Phaser.State));
    tdyctw.MainMenuState = MainMenuState;
})(tdyctw || (tdyctw = {}));
var tdyctw;
(function (tdyctw) {
    var PlayState = (function (_super) {
        __extends(PlayState, _super);
        function PlayState() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.trailOffset = 0;
            _this.trailOffsetIncrement = 0.5;
            _this.trailLength = 4;
            _this.trailWidth = 1;
            return _this;
        }
        PlayState.prototype.create = function () {
            var debugTextStyle = { font: "12px 'Share Tech Mono'", fill: "#00ff00" };
            this.debugText = this.add.text(0, 0, "", debugTextStyle);
            this.zoomCamera = new tdyctw.ZoomCamera(this.game);
            this.add.existing(this.zoomCamera);
            this.bases = [];
            for (var i = 0; i < 4; i++) {
                var base = new tdyctw.BaseSprite(this.game, this.game.rnd.integerInRange(50, this.game.world.width - 50), this.game.rnd.integerInRange(50, this.game.world.height - 50));
                base.baseIndex = i;
                base.events.onInputDown.add(function (sprite, pointer) {
                    sprite.animations.play("pulse", 6, true);
                    this.selectedBase = sprite;
                    this.selectedBaseIndex = sprite.baseIndex;
                }, this);
                this.bases.push(base);
                this.zoomCamera.add(base);
            }
            this.game.input.onDown.add(function (sprite, pointer) {
                for (var i = 0; i < this.bases.length; i++) {
                    this.bases[i].animations.stop(null, true);
                    this.selectedBase = null;
                    this.selectedBaseIndex = -1;
                }
            }, this);
            this.trailLine = new Phaser.Graphics(this.game, 0, 0);
            this.zoomCamera.add(this.trailLine);
            this.trailOffset = 0;
        };
        PlayState.prototype.update = function () {
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
        };
        return PlayState;
    }(Phaser.State));
    tdyctw.PlayState = PlayState;
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
            this.load.image("base", "/Content/img/base.png");
            this.load.spritesheet("baseSprite", "/Content/img/base_sprite.png", 32, 32, 2);
            this.game.load.audio("menuMusic", "/Content/audio/menu.mp3", true);
            this.game.load.audio("menuHoverSFX", "/Content/audio/beep-29.wav");
            this.game.load.audio("menuClickSFX", "/Content/audio/button-35.wav");
        };
        PreloaderState.prototype.create = function () {
            this.game.state.start("MainMenuState", true, false);
        };
        return PreloaderState;
    }(Phaser.State));
    tdyctw.PreloaderState = PreloaderState;
})(tdyctw || (tdyctw = {}));
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
    var ZoomCamera = (function (_super) {
        __extends(ZoomCamera, _super);
        function ZoomCamera(game) {
            var _this = _super.call(this, game) || this;
            _this.zoomButtonStyle = { font: "20px 'Share Tech Mono'", fill: "#00ff00" };
            _this.zoomTo(ZoomCamera.ZOOM_RESET);
            _this.zoomInButton = _this.game.add.text(_this.game.world.width - 60, 10, "+", _this.zoomButtonStyle);
            _this.zoomInButton.inputEnabled = true;
            _this.zoomInButton.alpha = 0.75;
            _this.zoomInButton.events.onInputDown.add(function () {
                this.zoomIn();
            }, _this);
            _this.zoomResetButton = _this.game.add.text(_this.game.world.width - 40, 10, "*", _this.zoomButtonStyle);
            _this.zoomResetButton.inputEnabled = true;
            _this.zoomResetButton.alpha = 0.75;
            _this.zoomResetButton.events.onInputDown.add(function () {
                this.zoomTo(ZoomCamera.ZOOM_RESET);
            }, _this);
            _this.zoomOutButton = _this.game.add.text(_this.game.world.width - 20, 10, "-", _this.zoomButtonStyle);
            _this.zoomOutButton.inputEnabled = true;
            _this.zoomOutButton.alpha = 0.75;
            _this.zoomOutButton.events.onInputDown.add(function () {
                this.zoomOut();
            }, _this);
            return _this;
        }
        ZoomCamera.prototype.zoomTo = function (scale) {
            this.currentZoom = scale;
            this.game.add.tween(this.scale).to({ x: scale, y: scale }, 200).start();
        };
        ZoomCamera.prototype.inputPosition = function () {
            var inverse = 1 / this.currentZoom;
            return this.game.input.position.clone().multiply(inverse, inverse);
        };
        ZoomCamera.prototype.zoomIn = function () {
            if (this.currentZoom <= 2) {
                this.zoomTo(this.currentZoom + 0.1);
            }
        };
        ZoomCamera.prototype.zoomOut = function () {
            if (this.currentZoom >= 0.5) {
                this.zoomTo(this.currentZoom - 0.1);
            }
        };
        ZoomCamera.prototype.update = function () {
            this.zoomInButton.alpha = this.zoomInButton.input.pointerOver() ? 1 : 0.75;
            this.zoomResetButton.alpha = this.zoomResetButton.input.pointerOver() ? 1 : 0.75;
            this.zoomOutButton.alpha = this.zoomOutButton.input.pointerOver() ? 1 : 0.75;
        };
        return ZoomCamera;
    }(Phaser.Group));
    ZoomCamera.ZOOM_RESET = 1;
    ZoomCamera.ZOOM_CLOSE = 1.2;
    ZoomCamera.ZOOM_FAR = 0.8;
    tdyctw.ZoomCamera = ZoomCamera;
})(tdyctw || (tdyctw = {}));
//# sourceMappingURL=game.js.map