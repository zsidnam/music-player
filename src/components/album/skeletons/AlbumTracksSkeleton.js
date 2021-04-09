import {
    Box,
    Typography,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const NUM_ROWS = 7;

const AlbumTracksSkeleton = () => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />

                        <TableCell align={'center'}>
                            <Typography variant={'overline'} component={'div'}>
                                <Box display={'flex'} justifyContent={'center'}>
                                    <Skeleton width={40} />
                                </Box>
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography variant={'overline'}>
                                <Skeleton width={50} />
                            </Typography>
                        </TableCell>

                        <TableCell align={'right'}>
                            <Typography variant={'overline'}>
                                <Skeleton />
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array(NUM_ROWS)
                        .fill(null)
                        .map((_, idx) => (
                            <TableRow key={idx}>
                                <TableCell style={{ width: 50 }} />

                                <TableCell align={'center'} style={{ width: '10%' }}>
                                    <Typography component={'div'}>
                                        <Box display={'flex'} justifyContent={'center'}>
                                            <Skeleton width={40} />
                                        </Box>
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography>
                                        <Skeleton width={200} />
                                    </Typography>
                                </TableCell>

                                <TableCell align={'right'} style={{ width: 75 }}>
                                    <Typography>
                                        <Skeleton />
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AlbumTracksSkeleton;
