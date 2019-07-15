import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '../../components/CustomButtons/Button.jsx';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '50%',
  },
  descField: {
    margin: 'auto',
    width: '50%',
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  housePhotoList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  gridContainer: {
    overflow: 'auto',
  },
  button: {
    marginLeft: '10%',
    marginBottom: '5%',
    width: '100%',
  },
});

class ListingLocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streetAddress: '',
      city: '',
      zip: '',
      bedroom: '',
      bathroom: '',
      kitchen: '',
      price: '',
      description: '',
    };
    this.updateStreetAddress = this.updateStreetAddress.bind(this);
    this.updateCity = this.updateCity.bind(this);
    this.updateZip = this.updateZip.bind(this);
    this.updateBedroom = this.updateBedroom.bind(this);
    this.updateBathroom = this.updateBathroom.bind(this);
    this.updateKitchen = this.updateKitchen.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.uploadListing = this.uploadListing.bind(this);
  }

  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updateStreetAddress(event) {
    const { target } = event;
    const text = target.value;
    this.setState({ streetAddress: text });
  }

  updateCity(event) {
    const { target } = event;
    const text = target.value;
    this.setState({ city: text });
  }

  updateZip(event) {
    const { target } = event;
    const text = target.value;
    this.setState({ zip: text });
  }

  updateBedroom(event) {
    const { target } = event;
    const text = target.value;
    this.setState({ bedroom: text });
  }

  updateBathroom(event) {
    const { target } = event;
    const text = target.value;
    this.setState({ bathroom: text });
  }

  updateKitchen(event) {
    const { target } = event;
    const text = target.value;
    this.setState({ kitchen: text });
  }

  updatePrice(event) {
    const { target } = event;
    const text = target.value;
    this.setState({ price: text });
  }

  updateDescription(event) {
    const { target } = event;
    const text = target.value;
    this.setState({ description: text });
  }

  uploadListing() {
    const { streetAddress, city, zip, bedroom, bathroom, kitchen, price, description } = this.state;
    const { fetchListingUpload, auth } = this.props;
    fetchListingUpload(
      streetAddress,
      city,
      zip,
      bedroom,
      bathroom,
      kitchen,
      price,
      description,
      auth.landlord_id,
      () => {}
    );
  }

  render() {
    // const { classes, fetchListingUpload } = this.props;
    const { classes } = this.props;
    const { streetAddress, city, zip, bedroom, bathroom, kitchen, price, description } = this.state;
    return (
      <Grid container spacing={24} className={classes.gridContainer}>
        <Grid item xs={12} sm={6} className={classes.textGrid}>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="streetAddress"
              value={streetAddress}
              label="Street Address"
              className={classes.textField}
              onChange={this.updateStreetAddress}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="city"
              value={city}
              label="City"
              className={classes.textField}
              onChange={this.updateCity}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="zip"
              value={zip}
              label="Zip Code"
              className={classes.textField}
              onChange={this.updateZip}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="bedroom"
              value={bedroom}
              label="Bedrooms"
              className={classes.textField}
              onChange={this.updateBedroom}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="bathroom"
              value={bathroom}
              label="Bathrooms"
              className={classes.textField}
              onChange={this.updateBathroom}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="kitchen"
              value={kitchen}
              label="Kitchens"
              className={classes.textField}
              onChange={this.updateKitchen}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="price"
              value={price}
              label="Monthly Rent"
              className={classes.textField}
              onChange={this.updatePrice}
              margin="normal"
              variant="outlined"
            />
          </form>
        </Grid>
        <TextField
          id="outlined-multiline-flexible"
          label="Listing Description"
          multiline
          rowsMax="12"
          value={description}
          onChange={this.updateDescription}
          className={classes.descField}
          margin="normal"
          helperText="Be Descriptive!"
          variant="outlined"
          fullWidth
        />
        <Button color="primary" size="lg" onClick={this.uploadListing} className={classes.button}>
          Confirm
        </Button>
      </Grid>
    );
  }
}

ListingLocationForm.propTypes = {
  // classes: PropTypes.object.isRequired,
  fetchListingUpload: PropTypes.func.isRequired,
};

function mapStateToProps({ auth, listingUpload }) {
  return { auth, listingUpload };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(withStyles(styles)(ListingLocationForm)));
