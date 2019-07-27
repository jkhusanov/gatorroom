import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import Dropzone from '../dropzone/Dropzone';

import uploadStyle from './uploadStyle';
import Progress from '../progress/Progress';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files),
    }));
  }

  async uploadFiles() {
    const { files } = this.state;
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  sendRequest(file) {
    const { listingID } = this.props;
    const { uploadProgress } = this.state;
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener('progress', event => {
        if (event.lengthComputable) {
          const copy = { ...uploadProgress };
          copy[file.name] = {
            state: 'pending',
            percentage: (event.loaded / event.total) * 100,
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener('load', () => {
        const copy = { ...uploadProgress };
        copy[file.name] = { state: 'done', percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener('error', () => {
        const copy = { ...uploadProgress };
        copy[file.name] = { state: 'error', percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('field', listingID);
      req.open('POST', '/api/upload');
      req.send(formData);
    });
  }

  renderProgress(file) {
    const { classes } = this.props;
    const { uploading, successfullUploaded, uploadProgress } = this.state;

    const uploadProgressResult = uploadProgress[file.name];
    if (uploading || successfullUploaded) {
      return (
        <div className={classes.progressWrapper}>
          <Progress progress={uploadProgressResult ? uploadProgressResult.percentage : 0} />
          <img
            className={classes.checkIcon}
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity: uploadProgressResult && uploadProgressResult.state === 'done' ? 0.5 : 0,
            }}
          />
        </div>
      );
    }
    return null;
  }

  renderActions() {
    const { classes } = this.props;
    const { files, uploading, successfullUploaded } = this.state;

    if (successfullUploaded) {
      return (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => this.setState({ files: [], successfullUploaded: false })}
        >
          Clear to upload more
        </Button>
      );
    }
    return (
      <Button
        disabled={files.length === 0 || uploading}
        onClick={this.uploadFiles}
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Upload
      </Button>
    );
  }

  render() {
    const { classes } = this.props;
    const { uploading, successfullUploaded, files } = this.state;
    return (
      <div className={classes.upload}>
        <span className={classes.title}>Upload Files</span>
        <span className={classes.dividerNote}>
          NOTE: the image upload functionality does not work on demo app on heroku!
        </span>
        <div className={classes.content}>
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={uploading || successfullUploaded}
            />
          </div>
          <div className={classes.files}>
            {files.map(file => {
              return (
                <div key={file.name} className={classes.row}>
                  <span className={classes.filename}>{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.actions}>{this.renderActions()}</div>
      </div>
    );
  }
}

Upload.propTypes = {
  classes: PropTypes.object.isRequired,
  listingID: PropTypes.number.isRequired,
};

export default withStyles(uploadStyle)(Upload);
