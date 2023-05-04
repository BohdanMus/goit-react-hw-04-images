import { useState } from 'react';
import { getImages } from '../api/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ErrorMessage } from './ImageGallery/ImageGallery.styled';
import { useEffect } from 'react';

export const App = () => {
  const [keyword, setKeyword] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(1);
  const [findByKeyword, setFindByKeyword] = useState(true);

  const searchByKeyword = key => {
    setKeyword(Object.values(key));
    setPage(1);
    setLoading(false);
    setTotal(1);
    setFindByKeyword(true);
  };

  const onLoadMoreClick = () => {
    setPage(prevSt => prevSt + 1);
  };

  useEffect(() => {
    if (!keyword) {
      return;
    }
    setLoading(true);
    setImages([]);
  }, [keyword]);

  useEffect(() => {
    if (!keyword) {
      return;
    }
    setLoading(true);

    getImages(keyword, page)
      .then(resp => resp.json())
      .then(response => {
        if (response.total === 0) {
          setImages([]);
          setLoading(false);
          setFindByKeyword(false);
        } else {
          setImages(prevImage => [...prevImage, ...response.hits]);
          setLoading(false);
          setFindByKeyword(true);
          setTotal(response.total);
        }
      })
      .catch(error => console.error(error));
  }, [keyword, page]);
  return (
    <div>
      <Searchbar onSubmit={searchByKeyword} />
      {findByKeyword ? (
        <ImageGallery images={images} />
      ) : (
        <ErrorMessage>
          Sorry, we can't find photo by tag "{keyword}"
        </ErrorMessage>
      )}
      {loading && <Loader />}
      {total / 12 > page && <Button onClick={onLoadMoreClick} />}
    </div>
  );
};
