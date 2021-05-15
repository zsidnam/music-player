import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';

import SafeLink from './SafeLink';

const useStyles = makeStyles((theme) => ({
    link: {
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.common.white,
            textDecoration: 'underline',
        },
    },
}));

const TextLink = ({ href, text, TypographyProps, onMouseOver }) => {
    const classes = useStyles();
    const optionalProps = {};
    if (onMouseOver) {
        optionalProps.onMouseOver = onMouseOver;
    }

    return (
        <SafeLink href={href}>
            <Typography {...TypographyProps} className={classes.link} {...optionalProps}>
                {text}
            </Typography>
        </SafeLink>
    );
};

TextLink.propTypes = {
    text: PropTypes.string.isRequired,
    TypographyProps: PropTypes.object,
    onMouseOver: PropTypes.func,
};

export default TextLink;
