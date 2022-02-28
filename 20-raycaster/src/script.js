import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Mouse
 */
const mouse = new THREE.Vector2()
let currentIntersect = null

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1
})

/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Animate objects
    object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
    object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5

    // Cast a ray
    const rayOrigin = new THREE.Vector3(- 3, 0, 0)
    const rayDirection = new THREE.Vector3(1, 0, 0)
    rayDirection.normalize()

    raycaster.setFromCamera(mouse, camera)

    const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectsToTest)
    {
        if (intersects.length) {
            if (!currentIntersect) {
                console.log('mouse enter')
            }

            currentIntersect = intersects[0]
        }
        else {
            if (currentIntersect) {
                console.log('mouse leave')
            }

            currentIntersect = null
        }
    }



    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

//     < svg width = "9" height = "10" viewBox = "0 0 9 10" fill = "none" xmlns = "http://www.w3.org/2000/svg" >
//         <circle cx="4.57842" cy="5.06373" r="3.09707" transform="rotate(-180 4.57842 5.06373)" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
// </svg >
// /* Ellipse 223 */

// position: absolute;
// width: 6.19px;
// height: 6.19px;
// left: 1090.68px;
// top: 109.16px;

// border: 2px solid #000000;
// // transform: rotate(-180deg);
// <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
// <g opacity="0.5">
// <rect x="1.25" y="1.25" width="39.5" height="39.5" rx="3.75" stroke="black" stroke-width="2.5"/>
// <line x1="6.83389" y1="11.819" x2="9.25827" y2="11.819" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
// <path d="M16.8948 11.7129L35.6984 11.7129" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
// <circle cx="12.9474" cy="11.2637" r="3.09707" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
// <path d="M6.94023 31.6832L16.342 31.6832" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
// <line x1="23.4257" y1="31.7893" x2="35.8049" y2="31.7893" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
// <circle cx="19.758" cy="31.9312" r="3.09707" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
// <line x1="35.8047" y1="20.9576" x2="32.643" y2="20.9576" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
// <line x1="26.5126" y1="20.9576" x2="6.83316" y2="20.9576" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
// <circle cx="29.5784" cy="21.0637" r="3.09707" transform="rotate(-180 29.5784 21.0637)" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
// </g>
// </svg>
