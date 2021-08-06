const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    bulletPool: cc.NodePool = new cc.NodePool();
    numOfBullet: number = 30; // 子彈數量

    fishPool: cc.NodePool = new cc.NodePool();
    numOfFish: number = 30; // 魚數量

    onLoad() {

    }

    start() {
        this.initBullet();
        this.initFish();
    }

    update(dt) {
        this.collisionV1(); // 每一偵都檢查整個畫面
    }

    private collisionV1() {

    }

    private async initFish() {
        cc.log("loadPrefab");

        const path = 'prefab/fish01';
        const res = await this.loadRes(path, cc.Prefab);
        if (!res) {
            cc.log("error 加載失敗 path:" + path);
            return;
        }

        cc.log("fishPool put count:" + this.numOfFish);
        for (let i = 0; i < this.numOfFish; ++i) {
            this.fishPool.put(cc.instantiate(res));
        }

        this.play(true, this.fishPool, '03_01_collision_fish');
    }

    private async initBullet() {
        cc.log("loadPrefab");

        const path = 'prefab/bullet01';
        const res = await this.loadRes(path, cc.Prefab);
        if (!res) {
            cc.log("error 加載失敗 path:" + path);
            return;
        }

        cc.log("bulletPool put count:" + this.numOfBullet);
        for (let i = 0; i < this.numOfBullet; ++i) {
            this.bulletPool.put(cc.instantiate(res));
        }

        this.play(true, this.bulletPool, 'bullet_rect_bullet_v2');
    }


    private play(randXY, pool, componentName) {
        cc.log("play Pool.size:" + pool.size() + ", componentName:" + componentName);

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
            if (pool.size() == 0) {
                break;
            }

            rotate += diff;
            if (rotate > 180) {
                rotate = -180;
            }

            let node = pool.get();
            this.node.addChild(node);

            let self = this;
            let width = self.node.width / 2;
            let height = self.node.height / 2;

            let handler = function (randXY, node, rotate, delay) {
                setTimeout(() => {
                    // cc.log("rotate:" + rotate + ", randXY:" + randXY + ", x:" + x + ", y:" + y);

                    if (randXY) {
                        x = self.getRandomInt(-width, width);
                        y = self.getRandomInt(-height, height);
                    }

                    let component = node.getComponent(componentName);

                    component.init(
                        x, y,
                        rotate,
                        fpsOfXY, speed, fpsOfCanvas,
                        bgWidth, bgHeight
                    )

                    // component.play(); // 先不位移

                    component.draw();
                }, 5 * delay);
            }

            handler(randXY, node, rotate, delay);
        }
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

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max) + 1;
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
}
