var game;
var wheel;
var pin;
var canSpin;
var slices = 12;
var prize;

window.onload = function () {
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, "");
    game.state.add("PlayGame", playGame);
    game.state.start("PlayGame");
}

var playGame = function (game) {
};

playGame.prototype = {
    preload: function () {
        game.load.image("wheel", "wheel.png");
        game.load.image("pin", "pin.png");
    },

    create: function () {
        game.stage.backgroundColor = "#FFFFFF";
        wheel = game.add.sprite(game.width / 2, game.height / 2, "wheel");
        wheel.width = game.width/ 2.2;
        wheel.height = game.width/2.2;
        wheel.anchor.set(0.5);

        pin = game.add.sprite(game.width / 2, game.height / 2, "pin");
        pin.height = 200;
        pin.width=200;

        pin.anchor.set(0.5);
        pin.inputEnabled = true;

        canSpin = true;

        pin.events.onInputDown.add(this.spin, this);
    },

    spin(){

        if (canSpin) {
            var rounds = game.rnd.between(2, 4);
            var degrees = game.rnd.between(0, 360);
            prize = slices - 1 - Math.floor(degrees / (360 / slices));
            canSpin = false;
            var spinTween = game.add.tween(wheel).to({
                angle: 360 * rounds + degrees
            }, 3000, Phaser.Easing.Quadratic.Out, true);

            spinTween.onComplete.add(this.winPrize, this);
        }
    },
    winPrize(){
        canSpin = true;
    }
}