import { Box, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Dropdown } from './Dropdown';
import { MySlider } from './MySlider';

export const Toolbar = ({
    handleSubmit,
    data,
    handleChange,
    submitLoading,
}) => {
    return (
        <Box
            component='form'
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
            }}
            mt={10}
            mb={15}
            onSubmit={handleSubmit}
        >
            <Dropdown data={data} handleChange={handleChange} />
            <MySlider data={data} handleChange={handleChange} />
            <TextField
                id='seed'
                label='Seed'
                variant='outlined'
                name='seed'
                value={data.seed}
                onChange={handleChange}
            />
            <LoadingButton
                loading={submitLoading}
                type='submit'
                style={{ height: 60 }}
                variant='contained'
            >
                Random
            </LoadingButton>
        </Box>
    );
};
