import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
// import Email from '@material-ui/icons/Email';
import People from '@material-ui/icons/People';
// core components
import Header from 'components/Header/Header.jsx';
import HeaderLinks from 'components/Header/HeaderLinks.jsx';
import Footer from 'components/Footer/Footer.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import loginPageStyle from 'assets/jss/material-kit-react/views/loginPage.jsx';

import image from 'assets/img/landing-bg.jpg';
import * as actions from '../../actions';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimation: 'cardHidden',
      username: '',
      password: '',
    };
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimation: '' });
      }.bind(this),
      700
    );
  }

  updateUsername(event) {
    const { target } = event;
    const text = target.value;
    this.setState({ username: text });
  }

  updatePassword(event) {
    const { target } = event;
    const text = target.value;
    this.setState({ password: text });
  }

  loginUser() {
    const { username, password } = this.state;
    const { fetchLogin } = this.props;
    fetchLogin(username, password, () => {});
  }

  render() {
    const { classes, fetchLogin, ...rest } = this.props;
    const { cardAnimation, username, password } = this.state;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="GatorRoom"
          rightLinks={<HeaderLinks />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[cardAnimation]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Login</h4>
                      <div className={classes.socialLine}>
                        <Button color="google" size="sm" href="/auth/google">
                          <i className="fab fa-google" />
                          Landlord Log in with Google
                        </Button>
                      </div>
                    </CardHeader>
                    <p className={classes.divider}>Student login with SFSU email</p>
                    <p className={classes.dividerNote}>
                      NOTE: only Google signin works on demo app on heroku. Email signup and login
                      do not work!
                    </p>

                    <CardBody>
                      <CustomInput
                        labelText="Username..."
                        id="username"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: 'username',
                          value: username,
                          onChange: this.updateUsername,
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: 'password',
                          value: password,
                          onChange: this.updatePassword,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>lock_outline</Icon>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button simple color="primary" size="lg">
                        Submit
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  fetchLogin: PropTypes.func.isRequired,
};

function mapStateToProps({ login }) {
  return { login };
}

export default connect(
  mapStateToProps,
  actions
)(withStyles(loginPageStyle)(LoginPage));
