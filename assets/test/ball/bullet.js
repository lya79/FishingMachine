cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad() {
        // {
        //     this.ball = new cc.Node("ball");
        //     let node = this.ball;
        //     let graph = node.addComponent(cc.Graphics);
        //     graph.fillColor = new cc.Color(255, 0, 0, 50);
        //     graph.circle(0, 0, 50);
        //     graph.fill();
        //     graph.stroke();
        //     this.node.addChild(node);
        // }

        this.r = true;

        this.x = 0;
        this.y = 0;

        this.tmp = 0;
        this.rotate = 70;
        this.speed = 10;

        this.dx = Math.sin(this.rotate * Math.PI / 180) * this.speed;
        this.dy = Math.cos(this.rotate * Math.PI / 180) * this.speed;

        console.log(this.rotate);

        this.bullet = this.node.getChildByName("bullet");
        this.bullet.rotation = this.rotate;
    },

    start() {},

    update(dt) {

        { // 計時
            this.tmp += dt;
            if (this.tmp < 0.2) {
                return;
            }
            this.tmp = 0;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.bullet.position = cc.v2(this.x, this.y);


        // let bulletWidth = this.bullet.width / 2;
        let bulletHeight = this.bullet.height / 2;

        let width = this.node.width / 2;
        let height = this.node.height / 2;

        if (this.x < -width + bulletHeight || this.x > width - bulletHeight ||
            this.y < -height + bulletHeight || this.y > height - bulletHeight) {

            // let r = (180 - this.rotate);
            // this.rotate += r;

            { // TODO

            }

            this.rotate = this.rotate % 360;

            this.dx = Math.sin(this.rotate * Math.PI / 180) * this.speed;
            this.dy = Math.cos(this.rotate * Math.PI / 180) * this.speed;

            this.bullet.rotation = this.rotate

            console.log(this.rotate);
        }
    },
});