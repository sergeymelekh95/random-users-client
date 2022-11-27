import { Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { MyTable } from './components/MyTable';
import { Toolbar } from './components/Toolbar';
import { BASE_URL } from './config';

const initialParams = {
    seed: '',
    region: 'us',
    errors: 0,
};

const initialPage = 1;
const initialResults = 20;

export const App = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(initialResults);
    const [page, setPage] = useState(initialPage);
    const [params, setParams] = useState(initialParams);
    const [reset, setReset] = useState(false);

    const handleResult = () => setResults(10);
    const addPage = () => setPage(page + 1);

    const loadData = () => {
        const { seed, region, errors } = params;

        setLoading(true);

        fetch(
            `${BASE_URL}/generate?nat=${region}&results=${results}&seed=${seed}&page=${page}&errors=${errors}`
        )
            .then((res) => res.json())
            .then((data) => setUsers([...users, ...data]))
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
                setReset(false);
            });
    };

    const resetParams = () => {
        setReset(true);
        setUsers([]);
        setResults(initialResults);
        setPage(initialPage);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (users.length) {
            resetParams();
        } else {
            loadData();
        }
    };

    const handleChange = (event) => {
        const target = event.target;

        if (target.name === 'errors') {
            const error = +target.value;

            if (error <= 1000 && error >= 0) {
                setParams({ ...params, [target.name]: error });
            }
        } else {
            setParams({ ...params, [target.name]: target.value });
        }
    };

    useEffect(() => {
        if (users.length) {
            loadData();
        }
    }, [page, results]);

    useEffect(() => {
        if (!users.length && reset) {
            loadData();
        }
    }, [reset])

    return (
        <Container>
            <Toolbar
                handleSubmit={handleSubmit}
                params={params}
                handleChange={handleChange}
                loading={loading}
            />
            {!!users.length && (
                <>
                    <MyTable
                        users={users}
                        loading={loading}
                        addPage={addPage}
                        handleResult={handleResult}
                    />
                    <div
                        style={{
                            width: '100%',
                            textAlign: 'end',
                            marginTop: 45,
                        }}
                    >
                        <Button
                            style={{ height: 30 }}
                            variant='contained'
                            component='a'
                            href={`${BASE_URL}/download`}
                        >
                            Export to CSV
                        </Button>
                    </div>
                </>
            )}
        </Container>
    );
};
