/// <reference path="../def/phaser.d.ts"/>
/// <reference path="../def/voronoi.d.ts"/>
/// <reference path="../def/delaunay.d.ts"/>

module tdyctw {

    export class PlayState extends Phaser.State {

        debugText: Phaser.Text;
        bases: Phaser.Sprite[];
        selectedBase: Phaser.Sprite;
        selectedBaseIndex: number;
        trailLine: Phaser.Graphics;
        trailOffset: number = 0;
        trailOffsetIncrement: number = 0.5;
        trailLength: number = 4;
        trailWidth: number = 1;
        zoomCamera: ZoomCamera;
        selectSound: Phaser.Sound;
        voronoiDiagram: any;
        delaunayDiagram: any[];
        delaunayPoints: any[];
        voronoiDebug: Phaser.Graphics;
        voronoiPoints: Phaser.Point[];

        create() {
            this.selectSound = this.add.audio("baseSelectSFX", 1.0);

            var debugTextStyle = { font: "12px 'Share Tech Mono'", fill: "#00ff00" };
            this.debugText = this.add.text(0, 0, "", debugTextStyle);

            this.zoomCamera = new ZoomCamera(this.game);
            this.add.existing(this.zoomCamera);

            this.bases = [];
            for (var i = 0; i < 4; i++) {
                this.addBase(this.rnd.integerInRange(50, this.world.width - 50), this.rnd.integerInRange(50, this.world.height - 50));
            }

            this.input.onDown.add(function (sprite: BaseSprite, pointer: any) {
                for (var i = 0; i < this.bases.length; i++) {
                    this.bases[i].animations.stop(null, true);
                    this.selectedBase = null;
                    this.selectedBaseIndex = -1;
                }
            }, this);

            this.trailLine = this.add.graphics(0, 0);
            this.trailOffset = 0;

            this.generateMap();
            this.voronoiDebug = new Phaser.Graphics(this.game, 0, 0);
            this.zoomCamera.add(this.voronoiDebug);
        }

        update() {
            // Voronoi
            this.voronoiDebug.clear();
            this.voronoiDebug.lineStyle(1, 0x0000ff, 1);
            for (var i = 0; i < this.voronoiDiagram.edges.length; i++) {
                var e = this.voronoiDiagram.edges[i];
                this.voronoiDebug.moveTo(e.va.x, e.va.y);
                this.voronoiDebug.lineTo(e.vb.x, e.vb.y);
            }
            this.voronoiDebug.lineStyle(1, 0xff0000, 1);
            for (var i = 0; i < this.voronoiDiagram.vertices.length; i++) {
                var v = this.voronoiDiagram.vertices[i];
                this.voronoiDebug.moveTo(v.x, v.y);
                this.voronoiDebug.lineTo(v.x + 1, v.y + 1);
            }
            this.voronoiDebug.lineStyle(1, 0xffff00, 1);
            for (var i = 0; i < this.voronoiPoints.length; i++) {
                var p = this.voronoiPoints[i];
                this.voronoiDebug.moveTo(p.x, p.y);
                this.voronoiDebug.lineTo(p.x + 1, p.y + 1);
            }
            this.voronoiDebug.lineStyle(1, 0xff00ff, 1);
            for (var i = this.delaunayDiagram.length; i;) {
                --i; 
                var p1 = new Phaser.Point(this.delaunayPoints[this.delaunayDiagram[i]][0], this.delaunayPoints[this.delaunayDiagram[i]][1]);
                --i;
                var p2 = new Phaser.Point(this.delaunayPoints[this.delaunayDiagram[i]][0], this.delaunayPoints[this.delaunayDiagram[i]][1]);
                --i;
                var p3 = new Phaser.Point(this.delaunayPoints[this.delaunayDiagram[i]][0], this.delaunayPoints[this.delaunayDiagram[i]][1]);
                this.voronoiDebug.moveTo(p1.x, p1.y);
                this.voronoiDebug.lineTo(p2.x, p2.y);
                this.voronoiDebug.lineTo(p3.x, p3.y);
                //this.voronoiDebug.lineTo(p1.x, p1.y);
            }

            this.trailLine.clear();
            this.trailLine.lineStyle(this.trailWidth, 0x008800, 1.0);
            // this.debugText.text = "FPS: " + this.time.fps + "|" + this.input.position + "|" + this.zoomCamera.inputPosition();
            if (this.selectedBase != null) {

                var zoom = this.zoomCamera.currentZoom;
                var basePosition = this.selectedBase.position.clone().multiply(zoom, zoom);

                var draw = true;
                var point = basePosition.clone();
                var norm = Phaser.Point.subtract(this.game.input.position, basePosition).normalize().setMagnitude(this.trailLength);
                var offset = norm.clone().setMagnitude(this.trailOffset);
                point.add(offset.x, offset.y);
                while (Phaser.Point.distance(basePosition, point) < Phaser.Point.distance(basePosition, this.game.input.position)) {
                    this.trailLine.moveTo(point.x, point.y);
                    point.add(norm.x, norm.y);
                    if (draw) {
                        this.trailLine.lineTo(point.x, point.y);
                    }
                    draw = !draw;
                }
                this.trailOffset += this.trailOffsetIncrement;
                if (this.trailOffset >= this.trailLength * 2) {
                    this.trailOffset = 0;
                }
            }

        }

        addBase(x: number, y: number) {
            var base = new BaseSprite(this.game, this.rnd.integerInRange(50, this.world.width - 50), this.rnd.integerInRange(50, this.world.height - 50));
            base.baseIndex = this.bases.length;
            base.events.onInputDown.add(function (sprite: BaseSprite, pointer: any) {
                this.selectSound.play();
                sprite.animations.play("pulse", 6, true);
                this.selectedBase = sprite;
                this.selectedBaseIndex = sprite.baseIndex;
            }, this);
            this.bases.push(base);
            this.zoomCamera.add(base);
        }

        generateMap() {
            var voronoi = new Voronoi();
            var bbox = { xl: 0, xr: this.world.width, yt: 0, yb: this.world.height };
            this.voronoiPoints = [];
            var sites = [];
            this.delaunayPoints = [];
            while (sites.length < 100) {
                var p = new Phaser.Point(this.rnd.integerInRange(0, this.world.width), this.rnd.integerInRange(0, this.world.height));
                this.voronoiPoints.push(p);
                sites.push({ x: p.x, y: p.y });
                this.delaunayPoints.push([p.x, p.y]);
            }

            // a 'vertex' is an object exhibiting 'x' and 'y' properties. The
            // Voronoi object will add a unique 'voronoiId' property to all
            // sites. The 'voronoiId' can be used as a key to lookup the associated cell
            // in diagram.cells.

            this.voronoiDiagram = voronoi.compute(sites, bbox);

            this.delaunayDiagram = Delaunay.triangulate(this.delaunayPoints);
        }
    }

}