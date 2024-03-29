import { Button, FormControl, FormHelperText, makeStyles, Select, TextField, Typography } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { ImageSize } from "./state";

type Props = {
};

type SearchForm = {
    term: string,
    size: ImageSize
}

const validateTerm = {
    gross: (str: string) => ['slime', 'slug'].includes(str?.trim() ?? '') ? 'No gross stuff please' : undefined,
};

function Search(props: Props) {
    const appHistory = useHistory();
    const { handleSubmit, register, formState, control } = useForm<SearchForm>();
    const onSubmit = (data: SearchForm) => appHistory.push(`/photos/${data.term}/${data.size}`);
    const errors = formState.errors;

    return <form onSubmit={handleSubmit(onSubmit)} className="search-form">
            <FormControl fullWidth margin="normal">
                <Typography variant="h5">Search for:</Typography>
                <Controller
                    name="term" 
                    control={control}
                    defaultValue=""
                    rules={ 
                        {
                            required: true, 
                            minLength: 3,
                            validate: validateTerm
                        }
                    }
                    render={({ field }) => <TextField
                        {...field} 
                        /> 
                    }
                />
                <FormHelperText>
                    {errors.term?.message ? <>{errors.term?.message}</> : undefined}
                    {errors.term?.type === 'minLength' && <>Term must be at least 3 characters</>}
                    {errors.term?.type === 'required' && <>Term is required</>}
                </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <Typography variant="h5">Image size:</Typography>
                <Controller
                    name="size"
                    rules={{required: true}}
                    defaultValue="web"
                    control={control}
                    render={({ field }) => <Select
                        native 
                        {...field}>
                        <option value="preview">preview</option>
                        <option value="web">web</option>
                        <option value="large">large</option>
                    </Select>
                    }
                />
            </FormControl>
            <Button type="submit" variant="contained" color="primary">Search</Button>
        </form>;
}

export default Search;
