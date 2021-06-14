import { Component } from "react";
import { connect } from "react-redux";
import { AppState, selectCurrentImage, RotatedImage } from "./store";

type FrameProps = { image: RotatedImage };
class Frame2 extends Component<FrameProps> {
  constructor(props: FrameProps) {
    console.warn(`Frame2 is reconstructed`);

    super(props);
  }

  render() {   
    console.warn(`Frame is rendered`);  

    return (
      <img src={ this.props.image.url } 
      style={ { 
        transform: `rotate(${this.props.image.rotation}deg)`, 
        borderWidth: '2px', 
        borderStyle: "solid"
      } } 
      alt="logo" />
    );
  }
}

function mapStateToProps(state: AppState): FrameProps {
  return {
    'image': selectCurrentImage(state)
  };
}

export default connect(mapStateToProps)(Frame2);
