import {ValidationError} from "../../type";
import React, {useRef, useState} from "react";
import {Button, Grid, TextField} from "@mui/material";

interface Props {
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label: string;
    error: ValidationError | null
}

const FileInput:React.FC<Props> = ({onChange, name,error}) => {
    const [fileName, setFileName] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

    const onFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('');
        }

        onChange(e);
    };
    const activateInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <>
            <input
                type="file"
                name={name}
                style={{ display: "none"}}
                ref={inputRef}
                onChange={onFileChange}
            />

            <Grid container direction="row" spacing={2} alignItems="center">
                <Grid item xs>
                    <TextField
                        disabled
                        value={fileName}
                        placeholder="Image"
                        error={Boolean(getFieldError('image'))}
                        helperText={getFieldError('image')}
                    />
                </Grid>

                <Grid item>
                    <Button
                        onClick={activateInput}
                        variant="contained"
                    >
                        Browse
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default FileInput;