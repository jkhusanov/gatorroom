import React from 'react';
import PropTypes, { object } from 'prop-types';

// react component for creating beautiful carousel
import Carousel from 'react-slick';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import carouselStyle from 'assets/jss/material-kit-react/views/componentsSections/carouselStyle.jsx';

function importAll(r) {
  const images = {};
  // eslint-disable-next-line
  r.keys().map(item => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}
const images = importAll(require.context('../../../../../fileUpload', false, /\.(gif|jpe?g|svg)$/));
const imagesBackup = [
  'https://images.unsplash.com/photo-1451934403379-ffeff84932da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1284&q=80',
  'https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80',
];

class CarouselSection extends React.Component {
  render() {
    const { classes, imageData } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
    };
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8} className={classes.marginAuto}>
              <Card carousel>
                <Carousel {...settings}>
                  {imageData.map((data, index) => (
                    <div key={data.img}>
                      <img
                        src={images[data.img] || imagesBackup[index]}
                        alt="First slide"
                        className="slick-image"
                      />
                    </div>
                  ))}
                </Carousel>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

CarouselSection.propTypes = {
  classes: PropTypes.object.isRequired,
  imageData: PropTypes.arrayOf(object).isRequired,
};

export default withStyles(carouselStyle)(CarouselSection);
