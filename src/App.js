import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { MyTable } from './components/MyTable';
import { Toolbar } from './components/Toolbar';
import { BASE_URL } from './config';

const initialData = {
    seed: '',
    region: 'ua',
    errors: 0,
};

const initialPage = 1;
const initialResults = 20;

export const App = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [results, setResults] = useState(initialResults);
    const [page, setPage] = useState(initialPage);
    const [data, setData] = useState(initialData);

    const handleResult = () => setResults(10);
    const addPage = () => setPage(page + 1);

    const loadData = () => {
        const { seed, region, errors } = data;

        setLoading(true);

        fetch(
            `${BASE_URL}/generate?nat=${region}&results=${results}&seed=${seed}&page=${page}&errors=${errors}`
        )
            .then((res) => res.json())
            .then((data) => setUsers([...users, ...data.results]))
            .catch((err) => {
                setLoading(true);
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
                setSubmitLoading(false);
            });
    };

    // const resetParams = () => {
    //     setUsers([]);
    //     setResults(initialResults);
    //     setPage(initialPage);
    // };

    const handleSubmit = (event) => {
        event.preventDefault();

        // if (JSON.stringify(initialData) !== JSON.stringify(data)) {
        //     setData(initialData);
        //     setUsers([]);
        // }

        setSubmitLoading(true);
        loadData();
    };

    const handleChange = (event) => {
        const target = event.target;

        if (target.name === 'errors') {
            const error = +target.value;

            if (error <= 1000 && error >= 0) {
                setData({ ...data, [target.name]: error });
            }
        } else {
            setData({ ...data, [target.name]: target.value });
        }
    };

    useEffect(() => {
        //skip first render
        if (users.length) {
            loadData();
        }
    }, [page, results]);

    // useEffect(() => {
    //     if (reset) {
    //         resetParams();
    //         console.log(reset, users, page, results)
    //     }
    // }, [reset]);

    return (
        <Container>
            <Toolbar
                handleSubmit={handleSubmit}
                data={data}
                handleChange={handleChange}
                submitLoading={submitLoading}
            />
            {!!users.length && (
                <MyTable
                    users={users}
                    loading={loading}
                    addPage={addPage}
                    handleResult={handleResult}
                    loadData={loadData}
                />
            )}
        </Container>
    );
};
