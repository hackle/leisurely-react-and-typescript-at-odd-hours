import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { RouteParam } from "./App";
import { ImageSize } from "./state";
import { LoadImagesAction, NextImageAction, PrevImageAction, RotateImageAction } from "./store";

type ControlsProps = {
    prev: () => void,
    rotateImage: () => void,
    next: () => void,
    loadImages: (term: string, size: ImageSize) => void
}
  
const Controls = (props: ControlsProps) => {
    const { rotateImage, prev, next } = props;
    const { term, size } = useParams<RouteParam>();  
  
    useEffect(() => {
        props.loadImages(term, size);
    }, [term, size]);
    return (
        <div className="image-controls">
            <button onClick={prev}>Previous</button>
            <button onClick={rotateImage}>Rotate</button>
            <button onClick={next}>Next</button>
        </div>
    );
};

const mapDispatchToProps: ControlsProps = {
    rotateImage: () => ({ 'type': 'rotateImage', payload: 15 } as RotateImageAction),
    next: () => ({ type: 'nextImage' } as NextImageAction),
    prev: () => ({ type: 'prevImage' } as PrevImageAction),
    loadImages: (term: string, size: ImageSize) => ({ type: 'loadImages', payload: { size, term } } as LoadImagesAction)
};

export default connect(null, mapDispatchToProps)(Controls);