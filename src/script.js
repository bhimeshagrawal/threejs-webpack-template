import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}



//scene
const scene = new THREE.Scene()



//Objects

//red cube
const redCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial())
scene.add(redCube)

//axeshelper
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)



// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0, 2, 10)
scene.add(camera)



//renderer
const canvas = document.getElementById("webgl")
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)



//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.update()



//handling resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
})
//handling full screen
window.addEventListener('dblclick', () => {
    const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullScreenElement) {
        if (canvas.requestFullscreen)
            canvas.requestFullscreen()
        else if (canvas.webkitRequestFullscreen)
            canvas.webkitRequestFullscreen()
    }
    else {
        if (canvas.exitFullscreen)
            canvas.exitFullscreen()
        else if (canvas.webkitExitFullscreen)
            canvas.webkitExitFullscreen()
    }
})


//animation
let clock = new THREE.Clock()
function animate() {
    //clock
    const elapsedTime = clock.getElapsedTime()
    //update
    redCube.rotation.z = elapsedTime
    //renderer
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}
animate();