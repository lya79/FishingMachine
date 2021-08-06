cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad() {
        console.log("onLoad");

        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.move, this);

        this.towerDefense = this.node.getChildByName("towerDefense");

        {
            let self = this;
            let drawPoint = function(x, y, color) {
                let node = new cc.Node("ball");
                let graph = node.addComponent(cc.Graphics);
                graph.fillColor = color;
                graph.circle(0, 0, 10);
                graph.fill();
                graph.stroke();
                self.node.addChild(node);
                return node
            }

            this.redNode = drawPoint(0, 0, new cc.Color(255, 0, 0, 255));
            this.greenNode = drawPoint(0, 0, new cc.Color(0, 255, 0, 255));
            this.blueNode = drawPoint(0, 0, new cc.Color(0, 0, 255, 255));
        }
    },

    start() {

    },

    update(dt) {

    },

    /*
                |
                C      B
                |
                |
    ------------A--------------
    */
    move(event) {
        let x = event.getLocationX();
        let y = event.getLocationY();

        x = x - this.node.width / 2;
        y = y - this.node.height / 2;

        let towerDefense = this.node.getChildByName("towerDefense");
        let px = towerDefense.x;
        let py = towerDefense.y;

        let pointA = { X: px, Y: py }; // 砲塔位置
        let pointB = { X: x, Y: y }; // 滑鼠位置
        let pointC = { X: px, Y: y }; // 基準點

        let angle3 = this.getAngle3(pointA, pointB, pointC);

        if (x < px) {
            angle3 *= -1;
        }

        let str = "";

        if (pointA.Y > pointC.Y) {
            if (x < px) {
                angle3 = -180 - angle3;
            } else if (x > px) {
                angle3 = 180 - angle3;
            }
        }

        // console.log("move", x, y, ", angle:", angle3);

        this.redNode.position = cc.v2(pointA.X, pointA.Y);
        this.greenNode.position = cc.v2(pointB.X, pointB.Y);
        this.blueNode.position = cc.v2(pointC.X, pointC.Y);

        str += "\n 目前位置:" + pointA.X.toFixed(0) + "," + pointA.Y.toFixed(0) + ", ";
        str += "\n 下一個位置:" + pointB.X.toFixed(0) + "," + pointB.Y.toFixed(0) + ", ";
        str += "\n 基準點:" + pointC.X.toFixed(0) + "," + pointC.Y.toFixed(0) + ", ";
        str += "\n angle:" + angle3 + ", ";
        cc.log(str);

        this.towerDefense.rotation = angle3;
    },

    getAngle3(A, B, C) {
        var AB = Math.sqrt(Math.pow(A.X - B.X, 2) + Math.pow(A.Y - B.Y, 2));
        var AC = Math.sqrt(Math.pow(A.X - C.X, 2) + Math.pow(A.Y - C.Y, 2));
        var BC = Math.sqrt(Math.pow(B.X - C.X, 2) + Math.pow(B.Y - C.Y, 2));
        var cosA = (
            Math.pow(AB, 2) + Math.pow(AC, 2) - Math.pow(BC, 2)
        ) / (
            2 * AB * AC
        );
        var angleA = Math.round(Math.acos(cosA) * 180 / Math.PI);
        // console.log(angleA)
        return angleA;
    },
});