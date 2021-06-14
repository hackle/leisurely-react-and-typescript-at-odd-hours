import { useRef } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { LoadImagesAction } from "./store";

// default values
// validation -> errors
// centralised form state
// input state: pristine vs touched, clean dirty, valid, 

type SearchForm = {
    term: string;
    // size: ImageSize;
};

type Props = {
  loadImages: (term: string) => void
};

function Search(props: Props) {
    // custom hook
    const { register, handleSubmit, formState } = useForm<SearchForm>();
    const { errors } = formState;
    const onSubmit = (data: SearchForm) => { 
        props.loadImages(data.term);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="search-form">
            <input {...register('term', {
                required: true,
                minLength: 3,
                maxLength: 10
            })}  />
            {errors.term?.type === 'minLength' ? <p>Term must be at least 3 characters</p> : null}
            {errors.term?.type === 'required' && <p>Term is required</p>}
            <button type="submit">Load image!</button>
        </form>
    )
}

const actionCreators: Pick<Props, 'loadImages'> = {
    loadImages: (term: string) => ({ 'type': 'loadImages', payload: term }) as LoadImagesAction
}

export default connect(undefined, actionCreators)(Search);

// export default connect()