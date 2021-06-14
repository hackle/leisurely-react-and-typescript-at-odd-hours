import { connect } from "react-redux";
import { AppState, selectCurrentImage, RotatedImage } from "./store";

type FrameProps = { image: RotatedImage };
const Frame = (props: FrameProps) => {
    if (props.image == null) return <div>Loading</div>;

  return (
    <img src={ props.image.url } 
    style={ { 
      transform: `rotate(${props.image.rotation}deg)`, 
      borderWidth: '2px', 
      borderStyle: "solid"
    } } 
    alt="logo" />
  );
}

function mapStateToProps(state: AppState): FrameProps {
  return {
    'image': selectCurrentImage(state)
  };
}

export default connect(mapStateToProps)(Frame);
