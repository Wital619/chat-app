import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';
import styles from './form.scss';

class AvatarPicker extends PureComponent {
  state = {
    file: null,
    src: null,
    crop: {
      aspect: 1,
      width: 50,
      x: 0,
      y: 0,
    },
  };

  onSelectFile = e => {
    const {files} = e.target;

    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.setState({ 
          src: reader.result,
          file: files[0]
        });
      });
      reader.readAsDataURL(files[0]);
    }
  };

  onImageLoaded = image => {
    this.imageRef = image;

    const { crop } = this.state;

    if (crop.aspect && crop.height && crop.width) {
      this.setState({
        crop: { ...crop, height: null },
      });
    }
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  onCropComplete = () => {
    // console.log(one, two);
  };

  render () {
    const { crop, src } = this.state;

    return (
      <div>
        <div className={styles.avatarGroup}>
          <label className={styles.avatarLabel} htmlFor='avatar'>Select avatar</label>
          <input 
            className={styles.avatarInput} 
            onChange={this.onSelectFile} 
            type='file' id='avatar' 
          />
        </div>
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onChange={this.onCropChange}
            onComplete={this.onCropComplete}
            className={styles.imgCropper}
          />
        )}
      </div>
    );
  }
}

export default AvatarPicker;