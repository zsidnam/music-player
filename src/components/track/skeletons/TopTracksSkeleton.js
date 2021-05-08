import {
    Box,
    Typography,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const NUM_ROWS = 9;

const TopTracksSkeleton = () => {
    return (
        <Box>
            <Box mb={2}>
                <Typography variant={'overline'}>
                    <Skeleton width={100} />
                </Typography>
            </Box>

            <TableContainer>
                <Table>
                    <TableBody>
                        {Array(NUM_ROWS)
                            .fill(null)
                            .map((_, idx) => (
                                <TableRow key={idx}>
                                    <TableCell style={{ width: 50 }} />

                                    <TableCell
                                        padding={'none'}
                                        style={{ width: 40, padding: '5px 0' }}
                                    >
                                        <Skeleton variant={'rect'} width={33} height={33} />
                                    </TableCell>

                                    <TableCell style={{ width: 50 }}>
                                        <Skeleton />
                                    </TableCell>

                                    <TableCell>
                                        <Skeleton style={{ maxWidth: 300 }} />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default TopTracksSkeleton;
