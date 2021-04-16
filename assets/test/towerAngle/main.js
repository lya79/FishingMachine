cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad() {
        console.log("onLoad");

        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.move, this);

        this.towerDefense = this.node.getChildByName("towerDefense");
    },

    start() {

    },

    update(dt) {

    },

    move(event) {
        let x = event.getLocationX();
        let y = event.getLocationY();

        x = x - this.node.width / 2;
        y = y - this.node.height / 2;

        let px = 0;
        let py = -260;

        let pointA = { X: px, Y: py };
        let pointB = { X: x, Y: y };
        let pointC = { X: 0, Y: y };
        let angle3 = this.getAngle3(pointA, pointB, pointC);

        if (x < px) {
            angle3 *= -1;
        }

        console.log("move", x, y, ", angle:", angle3);

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