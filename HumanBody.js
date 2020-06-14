import { View as GraphicsView } from 'expo-graphics';
import ExpoTHREE, { THREE } from 'expo-three';
import OrbitControls from 'expo-three-orbit-controls'
import React from 'react';

export class HumanBody extends React.Component {
  constructor(){
    super();
    this.state = {
      camera: null
    }
  }
  componentDidMount() {
    THREE.suppressExpoWarnings();
  }

  render() {
    return (
      <OrbitControls camera={this.state.camera} style={{flex:1}}>
      <GraphicsView
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
      />
      </OrbitControls>
    );
  }

  onContextCreate = async ({
    gl,
    canvas,
    width,
    height,
    scale: pixelRatio,
  }) => {
    this.renderer = new ExpoTHREE.Renderer({ gl, pixelRatio, width, height });
    this.renderer.setClearColor(0xffffff)
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, 1.2, 0.1, 1000);
    this.camera.position.set(0.4, 0.7, 1.2);
    this.setState({
      camera: this.camera
    })
    this.model = await this.loadModel();
    this.model.position.y = -0.65;

    this.scene.add(this.model);
    this.scene.add(new THREE.AmbientLight(0xc58c85));

    ExpoTHREE.utils.scaleLongestSideToSize(this.model, 1.2);

    const light = new THREE.DirectionalLight(0xeac086, 0.5);
    light.position.set(0, 1, 1);
    this.scene.add(light);

  };

  onRender = async (delta) => {
    this.renderer.render(this.scene, this.camera);
    //this.model.rotation.y += 0.01;
    this.setState({
      camera: this.camera
    })
  };

  loadModel = async () => {
    const obj = {
      "f.obj": require('./assets/HumanBody.obj')
    }

    const model = await ExpoTHREE.loadAsync(
      obj['f.obj'],
      null,
      obj
    );
    
    return model;
  }
}