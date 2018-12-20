import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';
import styles from './profile.scss';

const INITIAL_STATE = {
  src: null,
  fileName: '',
  crop: {
    aspect: 1,
    width: 50,
    x: 0,
    y: 0,
  },
  croppedImageData: null,
  isCompleted: false
};

class AvatarPicker extends PureComponent {
  state = {...INITIAL_STATE};

  onSelectFile = e => {
    const {files} = e.target;

    if (files && files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        this.setState({ 
          src       : reader.result,
          fileName  : files[0].name
        });
      });

      reader.readAsDataURL(files[0]);
    }
  };

  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image;

    const { crop } = this.state;

    if (crop.aspect && crop.height && crop.width) {
      this.setState({
        crop: { ...crop, height: null },
      });
    } else {
      this.makeClientCrop(crop, pixelCrop);
    }
  };

  onCropComplete = (crop, pixelCrop) => {
    this.makeClientCrop(crop, pixelCrop);
  };

  onCropChange = crop => {
    this.setState({ 
      crop,
      isCompleted: false
    });
  };

  async makeClientCrop (crop, pixelCrop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageData = await this.getCroppedImg(this.imageRef, pixelCrop);

      this.setState({ 
        croppedImageData,
        isCompleted: true
      });
    }
  }

  getCroppedImg (image, pixelCrop) {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    return new Promise(resolve => {
      canvas.toBlob(blob => {
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);

        blob.src = this.fileUrl;
        blob.name = this.state.fileName;

        resolve(blob);
      }, 'image/jpeg');
    });
  }

  onUpdateAvatar = () => {
    this.props.handleUpdateAvatar(this.state.croppedImageData);
    this.setState({ ...INITIAL_STATE });
  };

  render () {
    const { 
      crop, 
      croppedImageData, 
      src, 
      isCompleted 
    } = this.state;

    return (
      <div className={styles.avatarPicker}>
        <div className={styles.avatarGroup}>
          <label className={styles.avatarLabel} htmlFor='avatar'>Select avatar</label>
          <input 
            className={styles.avatarInput} 
            onChange={this.onSelectFile} 
            type='file' id='avatar' 
          />
          <button 
            className={styles.applyNewAvatarBtn} 
            disabled={!isCompleted}
            onClick={this.onUpdateAvatar}
          >
            Apply
          </button>
        </div>
        <div className={styles.avatarImgWrapper}>
          {src && (
            <div className={styles.origImgWrapper}>
              <ReactCrop
                src={src}
                crop={crop}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
            </div>
          )}
          {croppedImageData && (
            <div className={styles.croppedImgWrapper}>
              <img className={styles.croppedImg} src={croppedImageData.src} alt="Crop"  />
            </div>
          )}
        </div>
      </div>
    );
  }
}

AvatarPicker.propTypes = {
  handleUpdateAvatar   : PropTypes.func.isRequired
};

export default AvatarPicker;