import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

function importAll(r) {
  const images = {};
  // eslint-disable-next-line
  r.keys().map(item => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}
const images = importAll(require.context('../../../../fileUpload', false, /\.(gif|jpe?g|svg)$/));
const imagesBackup = [
  'https://images.unsplash.com/photo-1451934403379-ffeff84932da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1284&q=80',
  'https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80',
  'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
];

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
});

const getRandomInt = (min, max) => {
  const minNumber = Math.ceil(min);
  const maxNumber = Math.floor(max);
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
};

const ListingInfoCard = props => {
  const {
    classes,
    imageOne,
    city,
    address,
    price,
    numberOfBedroom,
    numberOfBathroom,
    approved,
    onClick,
  } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          alt={`${address}, ${city}`}
          className={classes.media}
          height="200"
          width="130"
          image={images[imageOne] || imagesBackup[getRandomInt(0, 3)]}
          title={`${address}, ${city}`}
        />
        <CardContent>
          <Typography gutterBottom variant="subheading" component="h2">
            {`${address}, ${city}`}
          </Typography>
          <Typography color="textSecondary">
            ${price}
            {` · ${numberOfBedroom}`} {numberOfBedroom === 1 ? `Bedroom` : `Bedrooms`}
            {` · ${numberOfBathroom}`} {numberOfBathroom === 1 ? `Bathroom` : `Bathrooms`}
          </Typography>
          <Typography color="textSecondary">Approved: {approved === 0 ? 'No' : 'Yes'}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

ListingInfoCard.propTypes = {
  classes: PropTypes.object.isRequired,
  imageOne: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  numberOfBedroom: PropTypes.number.isRequired,
  numberOfBathroom: PropTypes.number.isRequired,
  approved: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

ListingInfoCard.defaultProps = {
  approved: 0,
};

export default withStyles(styles)(ListingInfoCard);
