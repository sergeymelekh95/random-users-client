import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const Dropdown = ({ data, handleChange }) => {
    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id='demo-simple-select-autowidth-label'>
                    Region
                </InputLabel>
                <Select
                    labelId='demo-simple-select-autowidth-label'
                    id='demo-simple-select-autowidth'
                    value={data.region}
                    name='region'
                    onChange={handleChange}
                    autoWidth
                    label='region'
                >
                    <MenuItem value={'ua'}>Ukraine</MenuItem>
                    <MenuItem value={'de'}>Germany</MenuItem>
                    <MenuItem value={'us'}>USA</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};
