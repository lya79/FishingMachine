const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    bulletPool: cc.NodePool = new cc.NodePool();
    initCount: number = 2000; // 子彈數量

    onLoad() {

    }

    start() {
        this.initBullet();
    }

    private async initBullet() {
        cc.log("loadPrefab");

        const path = 'prefab/bullet01';
        const res = await this.loadRes(path, cc.Prefab);
        if (!res) {
            cc.log("error 加載失敗 path:" + path);
            return;
        }

        cc.log("bulletPool put count:" + this.initCount);
        for (let i = 0; i < this.initCount; ++i) {
            this.bulletPool.put(cc.instantiate(res));
        }

        this.play();
    }

    private loadRes<T extends typeof cc.Asset>(path: string, type: T): Promise<InstanceType<T>> {
        return new Promise(res => {
            cc.loader.loadRes(path, type, (err, resource) => {
                if (err) {
                    cc.log("error 加載失敗 err:" + err);
                    res(null)
                } else {
                    cc.log("error 加載成功");
                    res(resource)
                }
            })
        })
    }

    private play() {
        cc.log("play bulletPool.size:" + this.bulletPool.size());

        let x = 0;// 子彈初始座標 x
        let y = 0;// 子彈初始座標 y

        let fpsOfCanvas = 1; // 每隔多少幀數更新一次子彈顯示位置, 16ms = 60fps, 33ms = 30fps
        let fpsOfXY = 1; // 每隔多少幀數更新一次子彈的 x、y座標
        let speed = 10; // 子彈每次移動多少像素

        // 每一發子彈從角度0開始遞增
        let rotate = 0; // 初始角度
        let diff = 1; // 遞增角度

        let bgWidth = this.node.width;
        let bgHeight = this.node.height;

        for (let delay = 0; ; delay++) {
            if (this.bulletPool.size() == 0) {
                break;
            }

            rotate += diff;
            if (rotate > 180) {
                rotate = -180;
            }

            let bullet = this.bulletPool.get();
            this.node.addChild(bullet);

            let handler = function (bullet, rotate, delay) {
                setTimeout(() => {
                    // cc.log("rotate:" + rotate);

                    let component = bullet.getComponent('bullet_rect_bullet_v2');

                    component.init(
                        x, y,
                        rotate,
                        fpsOfXY, speed, fpsOfCanvas,
                        bgWidth, bgHeight
                    )

                    component.play();
                }, 10 * delay);
            }

            handler(bullet, rotate, delay);
        }
    }

    async sleep(t) {
        let f = function (ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        }
        await f(t);
    }
}
