import { View as GraphicsView } from 'expo-graphics';
import ExpoTHREE, { THREE } from 'expo-three';
import OrbitControls from 'expo-three-orbit-controls'
import React from 'react';
import { Dimensions, Text, View } from "react-native";

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
    // Create an `ExpoGraphics.View` covering the whole screen, tell it to call our
    // `onContextCreate` function once it's initialized.
    return (
      <OrbitControls camera={this.state.camera} style={{flex:1}}>
      <GraphicsView
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
      />
      </OrbitControls>
    );
  }

  // This is called by the `ExpoGraphics.View` once it's initialized
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
    this.camera = new THREE.PerspectiveCamera(65, Dimensions.get("window").width*1.3/Dimensions.get("window").height, 0.5, 1000);
    this.camera.position.set(0, 1, 2);
    this.setState({
      camera: this.camera
    })
    this.model = await this.loadModel();

    this.scene.add(this.model);
    this.scene.add(new THREE.AmbientLight(0xc58c85));

    ExpoTHREE.utils.scaleLongestSideToSize(this.model, 1.2);

    const light = new THREE.DirectionalLight(0xeac086, 0.5);
    light.position.set(0, 1, 1);
    this.scene.add(light);

  };

  onRender = delta => {
    this.renderer.render(this.scene, this.camera);
    this.model.rotation.y += 0.75 * delta; 
    this.setState({
      camera: this.camera
    })
  };

  loadModel = async () => {
    const obj = {
    "f.obj": require('./assets/Heart.obj')
    }

    const model = await ExpoTHREE.loadAsync(
      obj['f.obj'],
      null,
      obj
    );
    
    return model;
  }
}