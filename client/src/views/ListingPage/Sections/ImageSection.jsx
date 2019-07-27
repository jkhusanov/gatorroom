import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CarouselSections from './CarouselSections';

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
const styles = theme => ({
  root: {},
  gridList: {
    width: '100%',
    height: '50vh',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mobileImageContainer: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     featured: true,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

const ImageSection = props => {
  const { classes, imageOne, imageTwo, imageThree } = props;

  const tileData = [
    {
      img: '',
      featured: true,
    },
    {
      img: '',
      featured: false,
    },
    {
      img: '',
      featured: false,
    },
  ];

  tileData[0].img = imageOne;
  tileData[1].img = imageTwo;
  tileData[2].img = imageThree;

  return (
    <div className={classes.root}>
      <div className={classes.mobileImageContainer}>
        <CarouselSections imageData={tileData} />
      </div>

      <GridList cellHeight={250} spacing={2} className={classes.gridList} cols={4}>
        {tileData.map((tile, index) => (
          <GridListTile key={tile.img} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 2}>
            <img src={images[tile.img] || imagesBackup[index]} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

ImageSection.propTypes = {
  classes: PropTypes.object.isRequired,
  imageOne: PropTypes.string.isRequired,
  imageTwo: PropTypes.string.isRequired,
  imageThree: PropTypes.string.isRequired,
};

export default withStyles(styles)(ImageSection);
