import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, withRouter } from 'react-router-dom';

// @material-ui/icons

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';

import michael from 'assets/img/faces/michael.jpg';
import david from 'assets/img/faces/david.jpg';

import teamStyle from '../../../assets/jss/material-kit-react/views/landingPageSections/teamStyle.jsx';

class TeamSection extends React.Component {
  render() {
    const { classes } = this.props;
    const imageClasses = classNames(classes.imgRaised, classes.imgRoundedCircle, classes.imgFluid);
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>Here is our team</h2>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img
                    src="https://cdn.discordapp.com/attachments/530640816952049665/571894714253443082/unknown.png"
                    alt="Nico team lead"
                    className={imageClasses}
                  />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Nico Graves
                  <br />
                  <small className={classes.smallTitle}>Renaissance Man, Team 103 Lead.</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    Creates art,{' '}
                    <Link underline="none" component={RouterLink} to="/nico">
                      learn more here
                    </Link>
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button justIcon color="transparent" className={classes.margin5}>
                    <i className={`${classes.socials} fab fa-twitter`} />
                  </Button>
                  <Button justIcon color="transparent" className={classes.margin5}>
                    <i className={`${classes.socials} fab fa-instagram`} />
                  </Button>
                  <Button justIcon color="transparent" className={classes.margin5}>
                    <i className={`${classes.socials} fab fa-facebook`} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img
                    src="https://avatars0.githubusercontent.com/u/25942541?s=460&v=4"
                    alt="Jakhongir Khusanov"
                    className={imageClasses}
                  />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Jakhongir Khusanov
                  <br />
                  <small className={classes.smallTitle}>Frontend Lead/Full Stack Fellow</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    The person who makes sure that everything works and runs smoothly.
                    <Link underline="none" component={RouterLink} to="/jakhongir">
                      {' '}
                      Learn more here
                    </Link>
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button justIcon color="transparent" className={classes.margin5}>
                    <i className={`${classes.socials} fab fa-twitter`} />
                  </Button>
                  <Button justIcon color="transparent" className={classes.margin5}>
                    <i className={`${classes.socials} fab fa-linkedin`} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img
                    src="https://avatars2.githubusercontent.com/u/24262297?s=460&amp;v=4"
                    alt="Michael Tran"
                    className={imageClasses}
                  />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Michael McDonald Tran
                  <br />
                  <small className={classes.smallTitle}>
                    Backend Lead/Git Master/Full Stack Fellow
                  </small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    Takes care of whatever you give him.
                    <Link underline="none" component={RouterLink} to="/michaelTran">
                      {' '}
                      Learn more here
                    </Link>
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button justIcon color="transparent" className={classes.margin5}>
                    <i className={`${classes.socials} fab fa-twitter`} />
                  </Button>
                  <Button justIcon color="transparent" className={classes.margin5}>
                    <i className={`${classes.socials} fab fa-instagram`} />
                  </Button>
                  <Button justIcon color="transparent" className={classes.margin5}>
                    <i className={`${classes.socials} fab fa-facebook`} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img
                    src="https://avatars3.githubusercontent.com/u/35904165?s=460&v=4"
                    alt="Feona"
                    className={imageClasses}
                  />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Feona Mae Lao Garcia
                  <br />
                  <small className={classes.smallTitle}>Scrum Master/Frontend Fellow</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    Makes sure that each member is growing.
                    <Link underline="none" component={RouterLink} to="/feona">
                      {' '}
                      Learn more here
                    </Link>
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button justIcon color="transparent" className={classes.margin5}>
                    <i className={`${classes.socials} fab fa-twitter`} />
                  </Button>
                  <Button justIcon color="transparent" className={classes.margin5}>
                    <i className={`${classes.socials} fab fa-instagram`} />
                  </Button>
                  <Button justIcon color="transparent" className={classes.margin5}>
                    <i className={`${classes.socials} fab fa-facebook`} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img
                    src="https://avatars1.githubusercontent.com/u/33700617?s=460&v=4"
                    alt="Carlos"
                    className={imageClasses}
                  />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Carlos Velasco
                  <br />
                  <small className={classes.smallTitle}>Backend Fellow</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    Loves todo designs and customize the project.
                    <Link underline="none" component={RouterLink} to="/carlos">
                      {' '}
                      Learn more here
                    </Link>
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button justIcon color="transparent" className={classes.margin5}>
                    <i className={`${classes.socials} fab fa-twitter`} />
                  </Button>
                  <Button justIcon color="transparent" className={classes.margin5}>
                    <i className={`${classes.socials} fab fa-instagram`} />
                  </Button>
                  <Button justIcon color="transparent" className={classes.margin5}>
                    <i className={`${classes.socials} fab fa-facebook`} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={michael} alt="Michael Nelson" className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Michael Nelson
                  <br />
                  <small className={classes.smallTitle}>Full Stack Fellow</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    Likes working on backend, assembly and mobile development.
                    <Link underline="none" component={RouterLink} to="/michaelNelson">
                      {' '}
                      Learn more here
                    </Link>
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button justIcon color="transparent" className={classes.margin5}>
                    <i className={`${classes.socials} fab fa-twitter`} />
                  </Button>
                  <Button justIcon color="transparent" className={classes.margin5}>
                    <i className={`${classes.socials} fab fa-instagram`} />
                  </Button>
                  <Button justIcon color="transparent" className={classes.margin5}>
                    <i className={`${classes.socials} fab fa-facebook`} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={david} alt="David Carl Hernandez" className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  David Carl Hernandez
                  <br />
                  <small className={classes.smallTitle}>Frontend Fellow</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    Design and documentation.
                    <Link underline="none" component={RouterLink} to="/david">
                      {' '}
                      Learn more here
                    </Link>
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button justIcon color="transparent" className={classes.margin5}>
                    <i className={`${classes.socials} fab fa-twitter`} />
                  </Button>
                  <Button justIcon color="transparent" className={classes.margin5}>
                    <i className={`${classes.socials} fab fa-instagram`} />
                  </Button>
                  <Button justIcon color="transparent" className={classes.margin5}>
                    <i className={`${classes.socials} fab fa-facebook`} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(teamStyle)(TeamSection));
