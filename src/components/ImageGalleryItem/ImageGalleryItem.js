import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { ListItem, Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalShown: false,
    modalImg: '',
    modalAlt: '',
  };

  onSave = (img, alt) => {
    this.setState({
      isModalShown: true,
      modalImg: img,
      modalAlt: alt,
    });
  };

  onClose = () => {
    this.setState({
      isModalShown: false,
    });
  };

  render() {
    const { images } = this.props;
    const { isModalShown, modalImg, modalAlt } = this.state;

    return (
      <>
        <ListItem>
          <Image
            loading="lazy"
            src={images.webformatURL}
            alt={images.tags}
            onClick={() => {
              this.onSave(images.largeImageURL, images.tags);
            }}
          />
          {isModalShown && (
            <Modal alt={modalAlt} img={modalImg} onClose={this.onClose} />
          )}
        </ListItem>
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  images: PropTypes.object,
};
