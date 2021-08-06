// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad() {
    }

    start() {

    }

    // update (dt) {}

    draw(wp, color) {
        let graphicsNode = new cc.Node();
        var graphics = graphicsNode.addComponent(cc.Graphics);

        let width = this.node.getParent().width/2;
        let height = this.node.getParent().height/2;

        graphics.moveTo(wp.points[0].x - width, wp.points[0].y - height);
        for (let i = 1; i < wp.points.length; i++) {
            graphics.lineTo(wp.points[i].x - width, wp.points[i].y - height);
            graphics.close();

            // cc.log(wp.points[i].x - width, wp.points[i].y - height)
        }

        graphics.lineWidth = 5;
        graphics.strokeColor = new cc.Color().fromHEX(color);
        graphics.stroke();
        this.node.getParent().addChild(graphicsNode);
    }

    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        console.log('on collision enter');

        // 碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
        var world = (self as any).world;

        // // 碰撞组件的 aabb 碰撞框
        // var aabb = world.aabb;

        // // 节点碰撞前上一帧 aabb 碰撞框的位置
        // var preAabb = world.preAabb;

        // // 碰撞框的世界矩阵
        // var t = world.transform;

        // // 以下属性为圆形碰撞组件特有属性
        // var r = world.radius;
        // var p = world.position;

        // 以下属性为 矩形 和 多边形 碰撞组件特有属性
        var ps = world.points;
        this.draw(world, '#ff00ff');

        this.draw(world, '#ff00ff');

        let str = "";
        str += "other group:" + other.node.group + ", other self:" + self.node.group;
        cc.log(str);
    }

    // /**
    //  * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
    //  * @param  {Collider} other 产生碰撞的另一个碰撞组件
    //  * @param  {Collider} self  产生碰撞的自身的碰撞组件
    //  */
    // onCollisionStay(other: cc.Collider, self: cc.Collider) {
    //     console.log('on collision stay');
    // }

    // /**
    //  * 当碰撞结束后调用
    //  * @param  {Collider} other 产生碰撞的另一个碰撞组件
    //  * @param  {Collider} self  产生碰撞的自身的碰撞组件
    //  */
    // onCollisionExit(other: cc.Collider, self: cc.Collider) {
    //     console.log('on collision exit');
    // }
}
