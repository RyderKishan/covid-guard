import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';

const navigationData = [
  {
    pathname: '/',
    links: [
      {
        id: 'home',
        name: <HomeIcon />
      }
    ]
  },
  {
    pathname: '/about',
    links: [
      {
        id: 'home',
        href: '/',
        name: <HomeIcon />
      },
      {
        id: 'about',
        name: 'About'
      }
    ]
  },
  {
    pathname: '/monitor',
    links: [
      {
        id: 'home',
        href: '/',
        name: <HomeIcon />
      },
      {
        id: 'monitor',
        name: 'Monitor'
      }
    ]
  }
];

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const pathData = navigationData.find((n) => n.pathname === pathname);

  return (
    <BreadcrumbsContainer aria-label="breadcrumb">
      {pathData &&
        pathData.links &&
        pathData.links.length > 0 &&
        pathData.links.map((link) =>
          link.href ? (
            <Link key={link.id} color="inherit" href={link.href}>
              {link.name}
            </Link>
          ) : (
            <Typography key={link.id} color="textPrimary">
              {link.name}
            </Typography>
          )
        )}
    </BreadcrumbsContainer>
  );
};

export default Breadcrumbs;

const BreadcrumbsContainer = styled(MuiBreadcrumbs)`
  margin: 0 ${({ theme }) => theme.spacing(2)}px;
`;
