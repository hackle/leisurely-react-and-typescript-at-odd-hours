import { connect } from "react-redux";
import { RotatedImage, AppState } from "./state";
import { selectCurrentImage } from "./store";

type FrameProps = { 
  image: RotatedImage
};

const Frame = (props: FrameProps) => {

  return props.image.url ? (
    <img src={ props.image.url } 
      style={ { 
        transform: `rotate(${props.image.rotation}deg)`, 
        borderWidth: '2px', 
        borderStyle: "solid"
      } } 
      alt="logo" />
  ) : null;
}

function mapStateToProps(state: AppState): FrameProps {
  return {
    'image': selectCurrentImage(state)
  };
}

export default connect(mapStateToProps)(Frame);

