import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

// initialize the scene
const scene = new THREE.Scene()

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshBasicMaterial({color: 'red', wireframe: true})
const cubeMesh = new THREE.Mesh(cubeGeometry,cubeMaterial)
cubeMesh.position.y = 1
cubeMesh.position.x = 1

scene.add(cubeMesh)

const axesHelper = new THREE.AxesHelper(2)
cubeMesh.add(axesHelper)

// initialize the camera
const camera = new THREE.PerspectiveCamera(
	35,
	window.innerWidth / window.innerHeight,
	0.1,
	200
)

camera.position.z = 5

console.log(cubeMesh.position.distanceTo(camera.position))

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true,
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// initialize the controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
//controls.autoRotate = true

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
})

// render the scene
const renderloop = () => {
	controls.update()
	renderer.render(scene,camera)
	window.requestAnimationFrame(renderloop)
}

 renderloop()