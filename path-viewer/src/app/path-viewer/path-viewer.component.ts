import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import {
    AmbientLight,
    BufferGeometry, DirectionalLight,
    LineCurve3, Material,
    Mesh, MeshLambertMaterial, MeshNormalMaterial,
    Path,
    PerspectiveCamera,
    Scene,
    SphereGeometry,
    Vector3,
    WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { NonUniformCurvePath } from "../three-classes/non-uniform-curve-path"
import { NonUniformTubeGeometry } from "../three-classes/non-uniform-tube-geometry"
import { cloneDeep } from 'lodash-es'

export interface TrajectorySpec {
    coordinates: [number, number, number][]
    colour?: string
}

export const COLOUR_SCHEME = [
    '#e41a1c',
    '#377eb8',
    '#4daf4a',
    '#984ea3',
    '#ff7f00',
    '#ffff33',
    '#a65628',
    '#f781bf',
    '#999999',
]

class Trajectory implements TrajectorySpec {

    coordinates: [number, number, number][]
    pathGeometry: BufferGeometry
    ballGeometry: BufferGeometry
    pathMaterial: Material
    ballMaterial: Material
    ballFirstVertexOffset: [number, number, number]

    pathMesh: Mesh
    ballMesh: Mesh

    colour?: string

    constructor(spec: TrajectorySpec) {
        this.coordinates = spec.coordinates
        this.colour = spec.colour

        // Path
        const n = this.coordinates.length
        const path = new NonUniformCurvePath()
        for (let i = 0; i < n - 1; i++) {
            path.add(new LineCurve3(new Vector3(...this.coordinates[i]), new Vector3(...this.coordinates[i + 1])))
        }
        this.pathGeometry = new NonUniformTubeGeometry(path as Path, n, 0.01, 16, true)
        this.pathMaterial = this.colour === undefined ? new MeshNormalMaterial() : new MeshLambertMaterial({ color: this.colour })
        this.pathMesh = new Mesh(this.pathGeometry, this.pathMaterial)

        // Ball
        this.ballGeometry = new SphereGeometry(0.05, 8, 8)
        this.ballMaterial = this.colour === undefined ? new MeshNormalMaterial() : new MeshLambertMaterial({ color: this.colour })
        this.ballMesh = new Mesh(this.ballGeometry, this.ballMaterial)
        this.ballFirstVertexOffset = (this.ballGeometry as any).getAttribute('position').array.slice(0, 3)
    }

    destroy() {
        this.pathGeometry.dispose()
        this.pathMaterial.dispose()
        this.ballGeometry.dispose()
        this.ballMaterial.dispose()
    }
}

@Component({
    selector: 'app-path-viewer',
    templateUrl: './path-viewer.component.html',
    styleUrls: ['./path-viewer.component.css']
})
export class PathViewerComponent implements OnInit, AfterViewInit {

    private _trajectorySpecs: TrajectorySpec[] = []
    afterViewInitCompleted = false

    @Input() set trajectorySpecs(ts: TrajectorySpec[]) {
        if (this.afterViewInitCompleted) this.stopAction()

        this.trajectories.forEach(t => t.destroy())

        this._trajectorySpecs = cloneDeep(ts)
        this.trajectories = this._trajectorySpecs.map(t => new Trajectory(t))

        if (this.afterViewInitCompleted) {
            this.xValue = 0
            this.setTimeValue(this.xValue)
            this.initialiseAnimation()
            this.startAction()
        }
    }

    get trajectorySpecs(): TrajectorySpec[] {
        return this._trajectorySpecs
    }

    private trajectories: Trajectory[] = []

    @ViewChild('canvas') private canvasRef?: ElementRef
    @ViewChild('slider') slider?: any
    private camera!: PerspectiveCamera
    private scene!: Scene
    private renderer!: WebGLRenderer
    private controls!: OrbitControls

    animate!: any

    animationPlaying = true
    animationPlayIntervalId: number | null = null
    xValue = 0

    playSpeedMultiplier = 1
    speedMultipliers = [0.1, 0.2, 0.5, 1, 2, 5, 10]

    tailLengthSelection: string = '4'
    tailLengthMap: { [k: string]: number } = {
        '0': 1,
        '1': 0.5,
        '2': 0.32,
        '3': 0.16,
        '4': 0.08,
        '5': 0.04,
        '6': 0.02,
        '7': 0.01,
        '8': 0,
    }

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.initialiseAnimation()
        this.startAction()
        this.afterViewInitCompleted = true
    }

    private get canvas(): HTMLCanvasElement {
        return this.canvasRef!.nativeElement
    }

    private initialiseAnimation() {
        // Scene
        this.scene = new Scene()

        // Renderer
        this.renderer = new WebGLRenderer({ canvas: this.canvas })
        this.renderer.setPixelRatio(devicePixelRatio)
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)

        // Camera
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 200)
        this.camera.position.set(0, 0.7, 1.2)
        this.camera.lookAt(0, 0, 0)

        // Controls
        this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.update()

        // Lighting
        // const light = new AmbientLight( 0x404040 ); // soft white light
        // this.scene.add( light );

        this.scene.add( new AmbientLight( 0x444444 ) )

        const directionalLight = new DirectionalLight( 0xffffff, 0.8 )
        directionalLight.position.set(1, 1, 1)
        // directionalLight.position.normalize()
        this.scene.add( directionalLight )

        const d2 = new DirectionalLight(0xffffff, 0.8)
        d2.position.set(-1, 0, 0)
        this.scene.add(d2)


        // Curve

        this.trajectories.forEach(t => {
            this.scene.add(t.pathMesh)
            this.scene.add(t.ballMesh)
        })

        let animateFunction = () => {
            requestAnimationFrame(this.animate)
            this.render()
        }
        animateFunction = animateFunction.bind(this)
        this.animate = animateFunction

        this.animate()
    }

    render() {
        this.renderer.render(this.scene, this.camera)
    }

    setTimeValue(t: number) {
        this.trajectories.forEach(trajectory => {
            // If t = 1, use last index
            const lastPointIndex = Math.round((t - this.tailLengthMap[this.tailLengthSelection]) * trajectory.pathGeometry.index!.count / 36 / 16 * 3 * 2)
            const newPointIndex = t < 1 ? Math.round(t * trajectory.pathGeometry.index!.count / 36 / 16 * 3 * 2) : (trajectory.coordinates.length - 1)
            const deltaLastToNew = newPointIndex - lastPointIndex
            trajectory.pathGeometry.setDrawRange(
                lastPointIndex * 16 * 3 * 2,
                deltaLastToNew * 16 * 3 * 2
            )
            const [x0, y0, z0] = (trajectory.ballGeometry as any).getAttribute('position').array.slice(0, 3)
            const [x1, y1, z1] = trajectory.coordinates[newPointIndex]
            const [dx, dy, dz] = trajectory.ballFirstVertexOffset
            trajectory.ballGeometry.translate(x1 - x0 + dx, y1 - y0 + dy, z1 - z0 + dz)
        })
    }

    startAction() {
        this.animationPlaying = true
        this.animationPlayIntervalId = setInterval(() => {
            this.xValue = (this.xValue + this.playSpeedMultiplier / 1000) % 1
            this.setTimeValue(this.xValue)
        }, 5)
    }

    stopAction() {
        if (this.animationPlaying) this.animationPlaying = false
        if (this.animationPlayIntervalId) {
            clearInterval(this.animationPlayIntervalId)
            this.animationPlayIntervalId = null
        }
    }

    asAny(x: any): any {
        return x
    }

}
