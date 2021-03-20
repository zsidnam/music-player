import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow, TableSortLabel, Typography } from '@material-ui/core';

import { COLUMNS } from './TrackTable';

const TrackTableHead = ({ allowSorting, columns }) => {
    // TODO: Implement sorting
    const _wrapSortLabel = (content) => {
        if (!allowSorting) return content;
        return <TableSortLabel>{content}</TableSortLabel>;
    };

    const _hasColumn = (colName) => columns.includes(colName);

    return (
        <TableHead>
            <TableRow>
                {/* This cell is reserved for the play toggle icon*/}
                <TableCell />

                {_hasColumn(COLUMNS.ALBUM_ART) && <TableCell />}

                {_hasColumn(COLUMNS.TRACK_NUMBER) && (
                    <TableCell align={'center'}>
                        <Typography variant={'overline'} color={'textSecondary'}>
                            {_wrapSortLabel('#')}
                        </Typography>
                    </TableCell>
                )}

                {_hasColumn(COLUMNS.TITLE) && (
                    <TableCell>
                        <Typography variant={'overline'} color={'textSecondary'}>
                            {_wrapSortLabel('TITLE')}
                        </Typography>
                    </TableCell>
                )}

                {_hasColumn(COLUMNS.ALBUM) && (
                    <TableCell>
                        <Typography variant={'overline'} color={'textSecondary'}>
                            {_wrapSortLabel('ALBUM')}
                        </Typography>
                    </TableCell>
                )}

                {_hasColumn(COLUMNS.ARTISTS) && (
                    <TableCell>
                        <Typography variant={'overline'} color={'textSecondary'}>
                            {_wrapSortLabel('ARTISTS')}
                        </Typography>
                    </TableCell>
                )}

                {_hasColumn(COLUMNS.TIME) && (
                    <TableCell align={'right'}>
                        <Typography variant={'overline'} color={'textSecondary'}>
                            {_wrapSortLabel('TIME')}
                        </Typography>
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
};

TrackTableHead.propTypes = {
    allowSorting: PropTypes.bool,
    columns: PropTypes.arrayOf(PropTypes.string),
};

export default TrackTableHead;
