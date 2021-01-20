import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
    link: {
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.common.white,
            textDecoration: 'underline',
        },
    },
}));

const TextLink = ({ href, text, TypographyProps }) => {
    const classes = useStyles();

    return (
        <Link href={href}>
            <Typography {...TypographyProps} className={classes.link}>
                {text}
            </Typography>
        </Link>
    );
};

TextLink.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    TypographyProps: PropTypes.object,
};

export default TextLink;
