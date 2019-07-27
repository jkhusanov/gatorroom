import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Redirect, withRouter } from 'react-router';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const K_SIZE = 55;

const styles = () => ({
  markerWrap: {},
  markerCenter: {
    display: 'flex',
    width: K_SIZE / 1.5,
    height: K_SIZE / 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'rotate(45deg)',
    // alignSelf: 'center',
    // backgroundColor: 'red',
  },
  circleMarker: {
    display: 'flex',
    position: 'absolute',
    width: K_SIZE,
    height: K_SIZE,
    left: -K_SIZE / 2,
    top: -K_SIZE / 2,

    border: '5px solid',
    borderRadius: K_SIZE,
    backgroundColor: 'white',
    textAlign: 'center',
    color: '#a353b1',
    fontSize: 12,
    fontWeight: 'bold',
    cursor: 'pointer',
    borderBottomLeftRadius: 0,
    borderColor: '#3f51b5',

    transform: 'translate(-50%, -50%) rotate(-45deg)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    '&:focus': {
      boxShadow: '0px 0px 5px 2px #ff2e63 !important',
    },
  },
  hoverCircleMarker: {
    display: 'flex',
    position: 'absolute',
    width: K_SIZE,
    height: K_SIZE,
    left: -K_SIZE / 2,
    top: -K_SIZE / 2,

    borderRadius: K_SIZE,
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    cursor: 'pointer',
    borderBottomLeftRadius: 0,
    borderColor: '#ff2e63',

    transform: 'translate(-50%, -50%) rotate(-45deg)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,

    border: '5px solid',
    color: '#f6416c',
    '&:focus': {
      boxShadow: '0px 0px 5px 2px #ff2e63 !important',
    },
  },
});

// eslint-disable-next-line react/prop-types
const Marker = ({ price, classes, onClick, $hover }) => {
  const style = $hover ? classes.hoverCircleMarker : classes.circleMarker;

  return (
    <div className={style} onClick={onClick} onKeyPress={onClick} role="button" tabIndex="0">
      <div className={classes.markerCenter}>${price}</div>
    </div>
  );
};

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 37.7219,
      lng: -122.4782,
    },
    zoom: 13.5,
  };

  constructor(props) {
    super(props);
    this.state = {
      toListing: false,
      listingID: null,
      mapsKey: '',
    };
  }

  onPinClick = listingID => {
    this.setState({ toListing: true, listingID });
  };

  render() {
    const { center, zoom, locations, classes } = this.props;
    const { toListing, listingID, mapsKey } = this.state;
    if (toListing === true) {
      return <Redirect push to={`/listings/${listingID}`} />;
    }
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: mapsKey }}
          defaultCenter={center}
          defaultZoom={zoom}
          hoverDistance={K_SIZE / 2}
        >
          {/* if you create <Markers/> using Array.map, each <Marker> needs a key, which CANNOT be the Array index */}
          {/* the key COULD be the unique lat or lng ;) */}

          {locations.map(item =>
            item.approved === 1 ? (
              <Marker
                key={item.listing_id}
                lat={item.lat}
                lng={item.long}
                price={item.amount}
                classes={classes}
                onClick={() => this.onPinClick(item.listing_id)}
              />
            ) : null
          )}
        </GoogleMapReact>
      </div>
    );
  }
}
SimpleMap.propTypes = {
  center: PropTypes.object,
  zoom: PropTypes.number,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default withRouter(withStyles(styles)(SimpleMap));
