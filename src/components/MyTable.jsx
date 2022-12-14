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

export const MyTable = ({ users, loading, addPage, handleResult }) => {
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
    }, [loading, distanceBottom, addPage, handleResult]);

    const addStreet = (country) => {
        if(country === 'USA') return 'St.';

        return ''
    };

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
            <div style={{ height: 5 }}>{loading && <LinearProgress />}</div>
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
                                    key={user.id}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user.id}</TableCell>
                                    {user.middleName ? (
                                        <TableCell>{`${user.firstName} ${user.lastName} ${user.middleName}`}</TableCell>
                                    ) : (
                                        <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                                    )}
                                    <TableCell>{`${user.street} ${addStreet(user.country)}, ${user.house}, ${user.city}, ${user.country}`}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ height: 5 }}>{loading && <LinearProgress />}</div>
        </>
    );
};
