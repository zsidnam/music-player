import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
    clickable: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.common.darkGrey,
        },
    },
    image: (props) => ({
        width: 60,
        height: 60,
        borderRadius: props.circularFrame ? 50 : 0,
    }),
}));

const Thumbnail = ({ href, imageSrc, primaryText, secondaryText, circularFrame }) => {
    const classes = useStyles({ circularFrame });

    // TODO: Get fallback image

    return (
        <Link href={href}>
            <Box display={'flex'} alignItems={'center'} className={classes.clickable}>
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
        </Link>
    );
};

Thumbnail.defaultProps = {
    circularFrame: false,
};

Thumbnail.propTypes = {
    href: PropTypes.string.isRequired,
    imageSrc: PropTypes.string,
    primaryText: PropTypes.string.isRequired,
    secondaryText: PropTypes.string,
    circularFrame: PropTypes.bool,
};

export default Thumbnail;
