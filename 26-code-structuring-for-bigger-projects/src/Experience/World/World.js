import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import * as THREE from 'three'

export default class World {

    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () => {

            // Setup
            this.floor = new Floor()
            this.environment = new Environment()
        })

        // Test mesh
        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial()
        )
        this.scene.add(testMesh)
    }
}