import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import _omit from 'lodash.omit';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
    clickable: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.common.darkGrey,
        },
    },
    image: ({ circularFrame, imageSize }) => ({
        width: imageSize,
        height: imageSize,
        borderRadius: circularFrame ? 50 : 0,
    }),
}));

const Thumbnail = (props) => {
    const {
        href,
        imageSrc,
        primaryText,
        secondaryText,
        circularFrame,
        imageSize,
        onSelect,
        displayOnly,
    } = props;
    const router = useRouter();
    const classes = useStyles({ circularFrame, imageSize });

    const handleClick = (e) => {
        e.preventDefault();
        if (displayOnly) return;

        onSelect && onSelect(_omit(props, ['onSelect', 'displayOnly']));
        router.push(href);
    };

    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            className={displayOnly ? '' : classes.clickable}
            onClick={handleClick}
        >
            <img src={imageSrc} className={classes.image} />

            <Box ml={2} minWidth={0}>
                <Typography variant={'h6'} noWrap>
                    {primaryText}
                </Typography>
                {secondaryText && (
                    <Typography variant={'caption'} component={'h6'} noWrap>
                        {secondaryText}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

Thumbnail.defaultProps = {
    circularFrame: false,
    imageSize: 60,
};

Thumbnail.propTypes = {
    href: PropTypes.string.isRequired,
    imageSrc: PropTypes.string,
    primaryText: PropTypes.string.isRequired,
    secondaryText: PropTypes.string,
    circularFrame: PropTypes.bool,
    imageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    // Optional function to be run immediately before navigating to thumbnail href.
    // Function should be called with thumbnail props
    onSelect: PropTypes.func,
    // If true, disable click functionality.
    displayOnly: PropTypes.bool,
};

export default Thumbnail;
