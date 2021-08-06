cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad() {
        this.tmp = 0;

        this.x = 0;
        this.y = 0;

        this.rotate = 45;
        this.speed = 10;

        // this.dx = Math.sin(this.rotate * Math.PI / 180) * this.speed;
        // this.dy = Math.cos(this.rotate * Math.PI / 180) * this.speed;
        this.dx = 1;
        this.dy = 1;

        console.log(this.rotate);

        this.bullet = this.node.getChildByName("bullet");
        this.bullet.rotation = this.rotate;
    },

    start() {},

    update(dt) {

        { // 計時
            this.tmp += dt;
            if (this.tmp < 0.01) {
                return;
            }
            this.tmp = 0;
        }

        { // 移動
            this.x += this.dx;
            this.y += this.dy;
        }

        this.bullet.position = cc.v2(this.x, this.y);

        { // 檢查碰撞牆壁
            let bulletSize = this.bullet.height / 2;
            let width = this.node.width / 2;
            let height = this.node.height / 2;

            if (this.x >= width - bulletSize) {
                this.dx = -this.dx
            } else if (this.x <= -width + bulletSize) {
                this.dx = -this.dx
            }

            if (this.y >= height - bulletSize) {
                this.dy = -this.dy;
            } else if (this.y <= -height + bulletSize) {
                this.dy = -this.dy;
            }
        }


    },
});