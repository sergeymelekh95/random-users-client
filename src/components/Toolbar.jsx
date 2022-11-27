import { Box, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Dropdown } from './Dropdown';
import { MySlider } from './MySlider';

export const Toolbar = ({
    handleSubmit,
    params,
    handleChange,
    loading,
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
            mb={7}
            onSubmit={handleSubmit}
        >
            <Dropdown params={params} handleChange={handleChange} />
            <MySlider params={params} handleChange={handleChange} />
            <TextField
                id='seed'
                label='Seed'
                variant='outlined'
                name='seed'
                value={params.seed}
                onChange={handleChange}
            />
            <LoadingButton
                loading={loading}
                type='submit'
                style={{ height: 60 }}
                variant='contained'
            >
                Random
            </LoadingButton>
        </Box>
    );
};
