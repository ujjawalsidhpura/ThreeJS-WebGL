import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.rotation.x = Math.PI * .25
mesh.rotation.y = Math.PI * .25

scene.add(mesh)



// Sizes
const sizes = {
    width: 900,
    height: 500
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 2
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

/**
 * Animate
 */
// // let time = Date.now()
// const clock = new THREE.Clock()

// const tick = () => {

//     const elapsedTime = clock.getElapsedTime()

//     // const currentTime = Date.now()
//     // const deltaTime = currentTime - time
//     // time = currentTime

//     // Update objects
//     mesh.rotation.y = elapsedTime
//     // mesh.rotation.z += 0.01 * deltaTime (+ fasters, - slower)
//     // mesh.rotation.x += 0.01 * deltaTime

//     //Also
//     // Update objects
//     mesh.position.x = Math.cos(elapsedTime)
//     mesh.position.y = Math.sin(elapsedTime)

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()

/**
 * Animate
 */
gsap.to(mesh.position, { duration: 1, delay: 1, x: 0.5, y: 1 })

const tick = () => {
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()