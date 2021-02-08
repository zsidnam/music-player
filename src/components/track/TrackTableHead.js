import PropTypes from 'prop-types';
import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography,
} from '@material-ui/core';

const TrackTableHead = ({ allowSorting }) => {
    // TODO: Implement sorting
    const _wrapSortLabel = (content) => {
        if (!allowSorting) return content;
        return <TableSortLabel>{content}</TableSortLabel>;
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell />
                <TableCell>
                    <Typography variant={'overline'} color={'textSecondary'}>
                        {_wrapSortLabel('#')}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant={'overline'} color={'textSecondary'}>
                        {_wrapSortLabel('TITLE')}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant={'overline'} color={'textSecondary'}>
                        {_wrapSortLabel('ALBUM')}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant={'overline'} color={'textSecondary'}>
                        {_wrapSortLabel('ARTISTS')}
                    </Typography>
                </TableCell>
                <TableCell align={'right'}>
                    <Typography variant={'overline'} color={'textSecondary'}>
                        {_wrapSortLabel('TIME')}
                    </Typography>
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

TrackTableHead.propTypes = {
    allowSorting: PropTypes.bool,
};

export default TrackTableHead;
