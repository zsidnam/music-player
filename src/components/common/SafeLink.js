import PropTypes from 'prop-types';
import Link from 'next/link';

const SafeLink = ({ children, href }) => {
    if (!href) return <>{children}</>;
    return <Link href={href}>{children}</Link>;
};

SafeLink.propTypes = {
    children: PropTypes.node,
    href: PropTypes.string,
};

export default SafeLink;
