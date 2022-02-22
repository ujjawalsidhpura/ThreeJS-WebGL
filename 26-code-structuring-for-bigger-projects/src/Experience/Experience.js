import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import * as THREE from 'three'

export default class Experience {

    constructor(canvas) {
        // Global access
        this.experience = window.experience

        // Options
        // this.canvas = canvas

        // Setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera(this)

        // Resize event
        this.sizes.on('resize', () => {
            console.log('A resize occurred')
        })

        // Time tick event
        this.time.on('tick', () => {
            this.update()
        })
    }

    resize() {

    }

    update() {

    }

}