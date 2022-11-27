import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const countries = [
    { label: 'USA', value: 'us' },
    { label: 'Belarus', value: 'by' },
    { label: 'Poland', value: 'pl' },
];

export const Dropdown = ({ params, handleChange }) => {
    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id='demo-simple-select-autowidth-label'>
                    Region
                </InputLabel>
                <Select
                    labelId='demo-simple-select-autowidth-label'
                    id='demo-simple-select-autowidth'
                    value={params.region}
                    name='region'
                    onChange={handleChange}
                    autoWidth
                    label='region'
                >
                    {countries.map((country, index) => (
                        <MenuItem value={country.value} key={index}>
                            {country.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};
