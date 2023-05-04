import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { ListItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images }) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  const onSave = (img, alt) => {
    setIsModalShown(true);
    setModalImg(img);
    setModalAlt(alt);
  };

  const onClose = () => {
    setIsModalShown(false);
  };

  return (
    <>
      <ListItem>
        <Image
          loading="lazy"
          src={images.webformatURL}
          alt={images.tags}
          onClick={() => {
            onSave(images.largeImageURL, images.tags);
          }}
        />
        {isModalShown && (
          <Modal alt={modalAlt} img={modalImg} onClose={onClose} />
        )}
      </ListItem>
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.object,
};
