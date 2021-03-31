import PropTypes from 'prop-types';
import { Box, IconButton, makeStyles } from '@material-ui/core';
import Link from 'next/link';
import ClearIcon from '@material-ui/icons/Clear';

import Thumbnail from '../common/Thumbnail';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.common.nearBlack,
        },
    },
    clearIcon: {
        color: theme.palette.common.lightGrey,
        '&:hover': {
            color: theme.palette.common.white,
            transform: 'scale(1.2)',
        },
    },
}));

const RecentSearch = ({ onClear, href, imageSrc, primaryText, secondaryText, circularFrame }) => {
    const classes = useStyles();

    const handleClearClick = (e) => {
        e.preventDefault();
        onClear(href);
    };

    return (
        <Link href={href}>
            <Box className={classes.container}>
                <Thumbnail
                    displayOnly
                    href={href}
                    imageSrc={imageSrc}
                    primaryText={primaryText}
                    secondaryText={secondaryText}
                    circularFrame={circularFrame}
                />
                <IconButton className={classes.clearIcon} onClick={handleClearClick}>
                    <ClearIcon />
                </IconButton>
            </Box>
        </Link>
    );
};

RecentSearch.propTypes = {
    href: PropTypes.string.isRequired,
    imageSrc: PropTypes.string,
    primaryText: PropTypes.string.isRequired,
    secondaryText: PropTypes.string,
    circularFrame: PropTypes.bool,
    imageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    // Function to clear recent search. Should be called with href.
    onClear: PropTypes.func.isRequired,
};

export default RecentSearch;
