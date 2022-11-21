import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { TextField } from '@mui/material';

export const MySlider = ({ data, handleChange }) => {
    return (
        <Box width={150}>
            <TextField
                id='errors'
                label='Errors'
                variant='outlined'
                value={data.errors}
                name='errors'
                onChange={handleChange}
            />
            <Slider
                defaultValue={data.error}
                aria-label='Default'
                valueLabelDisplay='auto'
                min={0}
                max={10}
                step={0.25}
                onChange={handleChange}
                value={data.errors}
                name='errors'
            />
        </Box>
    );
};
