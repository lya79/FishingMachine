const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;
    }

    start() {
        this.test1();
        this.test2();
    }

    test1() {
        let collider: cc.PolygonCollider = this.node.getChildByName("green_1").getComponent(cc.PolygonCollider);
        let title = this.node.getChildByName("Label_1").getComponent(cc.Label)

        this.node.on(cc.Node.EventType.TOUCH_START, function (touch, event) {
            var touchLoc = touch.getLocation();

            if (cc.Intersection.pointInPolygon(touchLoc, collider.world.points)) {
                title.string = 'Hit';
            }
            else {
                title.string = 'Not hit';
            }
        }, this);
    }

    test2() {
        let green = this.node.getChildByName("green_2").getComponent(cc.PolygonCollider); //获去碰撞组件
        let bullet = this.node.getChildByName("bullet_2").getComponent(cc.PolygonCollider); //获去碰撞组件
        let collision = cc.Intersection.polygonPolygon(bullet.world.points, green.world.points); // FIXME 無效
        cc.log(collision ? "交集" : "不交集");
    }
}