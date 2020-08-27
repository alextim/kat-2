/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'react-scroll';

import mq from '../../../gatsby-plugin-theme-ui/media-queries';

const style = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  // width: '100%',
  p: '1rem 2rem',
  m: 0,
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  touchAction: 'none',
  opacity: 1,
  textDecoration: 'none',
  textTransform: 'uppercase',
  fontWeight: 'semibold',

  color: 'header.nav.item.text',
  borderBottom: '1px solid',
  borderBottomColor: 'header.nav.item.borderColor',
  '&:first-of-type': {
    borderTop: '1px solid',
    borderTopColor: 'header.nav.item.borderColor',
  },

  '&:hover, &:active, &:focus': {
    textDecoration: 'none',
    outline: '0',
  },

  '&:focus': {
    bg: 'header.nav.item.focusBg',
  },

  '&:hover': {
    color: 'highlight',
    bg: 'header.nav.item.hoverBg',
  },

  '&:active': {
    bg: 'header.nav.item.activeBg',
  },

  boxShadow: 'unset',

  [mq.lg]: {
    borderBottom: 0,
    '&:first-of-type': {
      borderTop: 0,
    },
    width: 'auto',
    height: '100%',
    p: '0 1rem',
  },
};

const MenuItem = ({ children, to, onClick }) => (
  <Link
    to={to}
    sx={style}
    offset={-50}
    activeClass="menu-item__active"
    spy
    smooth="easeInOutQuart"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default MenuItem;
