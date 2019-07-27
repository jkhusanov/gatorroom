import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
import People from '@material-ui/icons/People';
import Phone from '@material-ui/icons/Phone';
import Face from '@material-ui/icons/Face';

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
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import loginPageStyle from 'assets/jss/material-kit-react/views/loginPage.jsx';

import image from 'assets/img/landing-bg.jpg';
import * as actions from '../../actions';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimation: 'cardHidden',
      sfsuEmail: '',
      firstName: '',
      lastName: '',
      phone: '',
      username: '',
      password: '',
    };
    this.updateFirstNameInput = this.updateFirstNameInput.bind(this);
    this.updateLastNameInput = this.updateLastNameInput.bind(this);
    this.updateSfsuemail = this.updateSfsuemail.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.registerUser = this.registerUser.bind(this);
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

  updateSfsuemail(event) {
    const { target } = event;
    const text = target.value;
    this.setState({ sfsuEmail: text });
  }

  updateFirstNameInput(event) {
    const { target } = event;
    const text = target.value;
    this.setState({ firstName: text });
  }

  updateLastNameInput(event) {
    const { target } = event;
    const text = target.value;
    this.setState({ lastName: text });
  }

  updatePhone(event) {
    const { target } = event;
    const text = target.value;
    this.setState({ phone: text });
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

  registerUser() {
    const { sfsuEmail, firstName, lastName, phone, username, password } = this.state;
    const { fetchSignup } = this.props;
    fetchSignup(sfsuEmail, firstName, lastName, phone, username, password, () => {});
  }

  render() {
    const { classes, fetchSignup, ...rest } = this.props;
    const { sfsuEmail, firstName, lastName, phone, username, password, cardAnimation } = this.state;
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
                      <h4>Sign Up</h4>
                      <div className={classes.socialLine}>
                        <Button color="google" size="sm" href="/auth/google">
                          <i className="fab fa-google" />
                          Landlord Sign up with Google
                        </Button>
                      </div>
                    </CardHeader>
                    <p className={classes.divider}>Student sign up with SFSU email</p>
                    <p className={classes.dividerNote}>
                      NOTE: only Google signin works on demo app on heroku. Email signup and login
                      do not work!
                    </p>
                    <CardBody>
                      <CustomInput
                        labelText="First Name..."
                        id="firstName"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: 'text',
                          value: firstName,
                          onChange: this.updateFirstNameInput,
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <CustomInput
                        labelText="Last Name..."
                        id="lastName"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: 'text',
                          value: lastName,
                          onChange: this.updateLastNameInput,
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <CustomInput
                        labelText="Username..."
                        id="username"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: 'text',
                          value: username,
                          onChange: this.updateUsername,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Face className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <CustomInput
                        labelText="Email..."
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: 'email',
                          value: sfsuEmail,
                          onChange: this.updateSfsuemail,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <CustomInput
                        labelText="Phone..."
                        id="phone"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: 'phone',
                          value: phone,
                          onChange: this.updatePhone,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Phone className={classes.inputIconsColor} />
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
                        Register
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <br />
          <br />
          <br />

          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  fetchSignup: PropTypes.func.isRequired,
};

function mapStateToProps({ signup }) {
  return { signup };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(withStyles(loginPageStyle)(SignUpPage)));
