/*eslint-disable*/
import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';
import { List, ListItem, withStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, withRouter } from 'react-router-dom';

// @material-ui/icons
import Favorite from '@material-ui/icons/Favorite';

import footerStyle from 'assets/jss/material-kit-react/components/footerStyle.jsx';

function Footer({ ...props }) {
  const { classes, whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.dividerNote}>
          SFSU Software Engineering Project CSC 648-848, Spring 2019. For Demonstration Only.
        </div>
        <br />
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="http://gatorroom.xyz/" className={classes.block}>
                Team 103
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link underline="none" component={RouterLink} to="/about">
                About us
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link underline="none" component={RouterLink} to="/admin">
                Admin page
              </Link>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} , made with <Favorite className={classes.icon} /> by{' '}
          <a href="http://gatorroom.xyz/" className={aClasses}>
            Team 103
          </a>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool,
};

export default withRouter(withStyles(footerStyle)(Footer));
