import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';

import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

const columns = [
    { id: 'number', label: '#', minWidth: 50 },
    {
        id: 'id',
        label: 'ID',
        minWidth: 170,
    },
    {
        id: 'fullName',
        label: 'Full Name',
        minWidth: 170,
    },
    {
        id: 'address',
        label: 'Address',
        minWidth: 170,
    },
    {
        id: 'phoneNumber',
        label: 'Phone number',
        minWidth: 170,
    },
];

export const MyTable = ({
    users,
    loading,
    addPage,
    handleResult,
    loadData,
}) => {
    const tableEl = useRef();
    const [distanceBottom, setDistanceBottom] = useState(0);

    const scrollListener = useCallback(() => {
        let bottom =
            tableEl.current.scrollHeight - tableEl.current.clientHeight;
        if (!distanceBottom) {
            setDistanceBottom(1);
        }
        if (tableEl.current.scrollTop > bottom - distanceBottom && !loading) {
            addPage();
            handleResult();
        }
    }, [loading, distanceBottom, addPage, handleResult, loadData]);

    useLayoutEffect(() => {
        const tableRef = tableEl.current;
        tableRef.addEventListener('scroll', scrollListener);
        return () => {
            tableRef.removeEventListener('scroll', scrollListener);
        };
    }, [scrollListener]);

    useEffect(() => {}, [users]);

    return (
        <>
            {loading && <LinearProgress />}

            <TableContainer sx={{ maxHeight: 600 }} ref={tableEl}>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    style={{
                                        top: 0,
                                        minWidth: column.minWidth,
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => {
                            return (
                                <TableRow
                                    hover
                                    role='checkbox'
                                    tabIndex={-1}
                                    key={user.login.uuid}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user.login.uuid}</TableCell>
                                    <TableCell>{`${user.name.first} ${user.name.last}`}</TableCell>
                                    <TableCell>{`${user.location.country} ${user.location.city} ${user.location.postcode}`}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {loading && <LinearProgress />}
        </>
    );
};
