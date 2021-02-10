import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

const AlbumInfoFooter = ({ copyrights }) => {
    return (
        <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
            {copyrights.map((cr, idx) => (
                <Typography
                    key={idx}
                    variant={'caption'}
                    color={'textSecondary'}
                >
                    {`${cr.type}. ${cr.text}`}
                </Typography>
            ))}
        </Box>
    );
};

AlbumInfoFooter.propTypes = {
    copyrights: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string,
            text: PropTypes.string,
        })
    ),
};

export default AlbumInfoFooter;
