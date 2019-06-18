new Vue({
    el: '#app',
    data: {
        playerHp: 100,
        monsterHp: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame() {
            this.gameIsRunning = true;
            this.playerHp = 100;
            this.monsterHp = 100;
            this.turns = [];
        },
        attack() {
            var damage = this.calculateDamage(3, 10)
            this.monsterHp -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster for ' + damage
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        specialAttack: function () {
            var damage = this.calculateDamage(10, 20);
            this.monsterHp -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster DAMN hard for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            //  the monster shud deal the same damage round his life.
            this.monsterAttacks();
        },

        heal: function () {
            if (this.playerHp <= 90) {
                this.playerHp += 10;
            } else {
                this.playerHp = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });
            this.monsterAttacks();

        },

        giveUp: function () {
            this.gameIsRunning = false;
        },

        monsterAttacks() {
            var damage = this.calculateDamage(5, 12);
            this.playerHp -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits player for ' + damage
            });
        },

        calculateDamage(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },

        checkWin() {
            if (this.monsterHp <= 0) {
                if (confirm('You won! New Game !?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHp <= 0) {
                if (confirm('You lost! New Game !?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});
