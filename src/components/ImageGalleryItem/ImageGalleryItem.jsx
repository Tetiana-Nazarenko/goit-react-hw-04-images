import { useState } from 'react';

import { Item, Img } from './ImageGalleryItem.styled';
import { ModalImage } from 'components/Modal/Modal';

export const ImageItem = ({ image }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Item>
        <Img
          src={image.webformatURL} // URL маленького изображения
          alt={image.tags} // Теги изображения
          onClick={openModal} // Обработчик клика для открытия модального окна
        />
        {/* {showModal && ( // Если showModal равно true, отображаем модальное окно */}
        <ModalImage onOpen={isOpen} onClose={closeModal}>
          <img src={image.largeImageURL} alt={image.tags} />
        </ModalImage>
        {/* )} */}
      </Item>
    </>
  );
};
