import { useEffect, useState } from 'react';

import { getImages } from '../service/API';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export const ImageApp = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //*** */
  useEffect(() => {
    if (query === '') {
      return;
    }
    async function getQueryImages() {
      setLoading(true);
      try {
        const { hits } = await getImages(query, page);

        if (hits.length === 0) {
          toast.error('Nothing was found for your query');
          return;
        }

        const images = hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );

        setImages(prevImages => [...prevImages, ...images]);
      } catch (error) {
        toast.error(`An error occurred: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    getQueryImages();
  }, [page, query]);

  // Метод для обработки отправки формы поиска

  const handleSubmit = evt => {
    evt.preventDefault();
    const query = evt.target.elements.query.value;
    query.trim() === ''
      ? toast.error('Упс... Введите запрос!')
      : changeQuery(query);

    evt.target.reset();
  };

  const changeQuery = newQuery => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setImages([]);
      setPage(1);
    }
  };

  // Метод для загрузки дополнительных изображений путем увеличения номера текущей страницы
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 ? (
        <ImageGallery images={images} />
      ) : (
        <p
          style={{
            padding: 100,
            textAlign: 'center',
            fontSize: 30,
          }}
        >
          Image gallery is empty...
        </p>
      )}
      {loading && <Loader />}
      {images.length >= 12 && !loading && (
        <Button onClick={handleLoadMore} /> // Кнопка для загрузки дополнительных изображений
      )}
      <ToastContainer />
    </div>
  );
};
