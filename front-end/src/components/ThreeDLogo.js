import React from "react";
import ReactDOM from "react-dom";

import styled from "@emotion/styled";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import * as dat from "dat.gui"

export default class ThreeDLogo extends React.Component {
  componentDidMount = (props) => {
    console.log(this.props);
    /**
     * Canvas
     */
    let canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
    canvas = document.querySelector("canvas.webgl");

    /**
     * Scene
     */
    const scene = new THREE.Scene();

    /**
     * Debug
     */
    // const gui = new dat.GUI()

    /**
     * Models
     */
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    let logo;
    let scaleSize = this.props.scale;

    gltfLoader.load(
      "https://raw.githubusercontent.com/omarmhmmd/marcaz/main/front-end/src/models/marcaz_v5.gltf",
      (gltf) => {
        logo = gltf.scene;
        logo.scale.set(scaleSize, scaleSize, scaleSize);
        // gui.add(logo.position, "y").min(-3).max(3).step(0.01).name("elevation")
        // logo.position.y = 0.15
        scene.add(logo);
      }
    );

    /**
     * Sizes
     */
    const sizes = {
      width: 300,
      height: 250,
    };

    if (this.props.onConnect) {
			scaleSize = this.props.scaleOnConnect;
      sizes.width = window.innerWidth - 100;
      sizes.height = window.innerHeight - 100;
    } 
    // const sizes = {
    //   width: window.innerWidth - 100,
    //   height: window.innerHeight - 100,
    // };

    // if (typeof window !== "undefined") {
    //   window.addEventListener("resize", () => {
    //     // Update sizes
    //     sizes.width = window.innerWidth
    //     sizes.height = window.innerHeight

    //     // Update camera
    //     camera.aspect = sizes.width / sizes.height
    //     camera.updateProjectionMatrix()

    //     // Update renderer
    //     renderer.setSize(sizes.width, sizes.height)
    //     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    //   })
    // }

    /**
     * Camera
     */

    const aspectRatio = sizes.width / sizes.height;
    const camera = new THREE.OrthographicCamera(
      -1 * aspectRatio,
      1 * aspectRatio,
      1,
      -1,
      0.1,
      100
    );
    camera.position.set(3, 3, 3);
    // gui.add(camera.position, "x").min(-5).max(5).step(0.01).name("camera x")
    // gui.add(camera.position, "y").min(-5).max(5).step(0.01).name("camera y")
    scene.add(camera);

    /**
     * Mouse Interactivity
     */
    let mouse = { x: 0, y: 0 };
    document.addEventListener("mousemove", onMouseMove, false);

    // Follows the mouse event
    function onMouseMove(event) {
      // Update the mouse variable
      event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // alert(mouse.x + "," + mouse.y);
      // camera.position.x = mouse.x * 5
      // camera.position.y = mouse.y * 5
    }

    // let camera = new THREE.PerspectiveCamera(
    //   75,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   100
    // )

    /**
     * Controls
     */
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      canvas: canvas,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputEncoding = THREE.sRGBEncoding;

    /**
     * Animate
     */
    const clock = new THREE.Clock();
    let previousTime = 0;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      previousTime = elapsedTime;

      // Update controls
      controls.update();
      controls.enableZoom = false;

      if (logo) {
        logo.rotation.y += 0.01;
      }

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  };

  render() {
    /**
     * CSS
     */
    const Marcaz = styled.div`
      .webgl {
        background-color: transparent;
        cursor: grab;
        /* z-index: -1; */
      }

			.onIndex {
				@media (max-width: 768px) {
          margin: auto;
          position: absolute;
          top: -62.5%;
          left: 0;
          bottom: 0;
          right: 0;
        }
			}
			.onConnect {
				z-index: -1;
				 position: absolute;
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%);
			}
      .webgl:active {
        cursor: grabbing;
      }
    `;

    /**
     * HTML
     */
    return (
      <Marcaz>
        <canvas
          ref="myCanvas"
          className={`webgl ${this.props.onConnect ? "onConnect" : "onIndex"}`}
        ></canvas>
      </Marcaz>
    );
  }
}
