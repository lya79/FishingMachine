const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    running: boolean;
    x: number;
    y: number;
    rotate: number;
    fpsOfXY: number;
    speed: number;
    fpsOfCanvas: number;
    bgWidth: number;
    bgHeight: number;
    dx: number;
    dy: number;
    timerOfFps: number;
    timerOfSleep: number;

    onLoad() {

    }

    start() {

    }

    onDisable() {
        this.running = false;
    }

    update(dt) { // dt:兩幀數之間的秒數
        if (!this.running) {
            return;
        }

        this.draw(dt);
        this.updateXY(dt);
    }

    private draw(dt) {// 更新子彈顯示位置
        {// 計時
            // this.timerOfFps += dt;
            this.timerOfFps += 1;
            if (this.timerOfFps < this.fpsOfCanvas) {
                return;
            }
            this.timerOfFps = 0;
        }

        this.node.position = cc.v2(this.x, this.y);
    }

    private updateXY(dt) {// 更新子彈的 x、y座標
        {// 計時
            this.timerOfSleep += 1;
            if (this.timerOfSleep < this.fpsOfXY) {
                return;
            }
            this.timerOfSleep = 0;
        }

        let width = this.bgWidth / 2;
        let height = this.bgHeight / 2;
        let collision = false // 是否碰撞邊界

        { // 檢查邊界碰撞
            if (this.x >= width || this.x <= -width) {
                this.dx = -this.dx
                collision = true;
            }

            if (this.y >= height || this.y <= -height) {
                this.dy = -this.dy;
                collision = true;
            }
        }

        // let str = "";
        // str += "collision:" + collision;
        // str += ", bgWidth:" + this.bgWidth + ", bgHeight:" + this.bgHeight;
        // str += ", x:" + this.x.toFixed(0) + ", y:" + this.y.toFixed(0);
        // str += ", dx:" + this.dx.toFixed(0) + ", dy:" + this.dy.toFixed(0);
        // cc.log(str);

        if (collision) { // 發生邊界碰撞時將子彈轉向
            let angle; // 預計旋轉的角度
            let pointA = { X: this.x, Y: this.y }; // 子彈位置
            let pointB = { X: this.x + this.dx, Y: this.y + this.dy }; // 下一個子彈位置
            let pointC = { X: this.x, Y: this.y + this.dy }; // 基準點

            if (this.rotate % 180 == 0) {
                if (pointA.Y > pointB.Y) {
                    angle = 180;
                } else if (pointA.Y < pointB.Y) {
                    angle = 0;
                }
            } else {
                angle = this.getAngle(pointA, pointB, pointC);
                if (this.x + this.dx < this.x) {
                    angle *= -1;
                }

                if (pointA.Y > pointC.Y) {
                    if (angle < 0) {
                        angle = -180 - angle;
                    } else if (angle > 0) {
                        angle = 180 - angle;
                    }
                }
            }

            this.rotate = angle;
            this.node.rotation = this.rotate;
        }

        { // 移動子彈
            this.x += this.dx;
            this.y += this.dy;
            // this.node.position = cc.v2(this.x, this.y);
        }
    }

    public init(
        x, y,
        rotate,
        fpsOfXY, speed, fpsOfCanvas,
        bgWidth, bgHeight
    ) {
        this.x = x; // 初始座標x
        this.y = y; // 初始座標y
        this.rotate = rotate; // 旋轉角度
        this.fpsOfXY = fpsOfXY; // 多久更新一次子彈實際的 x、y座標
        this.speed = speed; // 子彈每次移動多少像素
        this.fpsOfCanvas = fpsOfCanvas; // 多久刷一次子彈顯示位置, 16ms = 60fps, 33ms = 30fps
        this.bgWidth = bgWidth; // 邊界寬度
        this.bgHeight = bgHeight; // 邊界高度

        this.dx = Math.sin((this.rotate * Math.PI) / 180) * this.speed;
        this.dy = Math.cos((this.rotate * Math.PI) / 180) * this.speed;
        this.node.rotation = this.rotate;

        this.timerOfFps = 0; // 初始化計時器
        this.timerOfSleep = 0; // 初始化計時器

        this.running = false;
    }

    public play() {
        this.running = true;
    }

    private getAngle(A, B, C) {
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
    }
}
