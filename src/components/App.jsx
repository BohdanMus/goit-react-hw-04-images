import { Component } from 'react';
import { getImages } from '../api/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ErrorMessage } from './ImageGallery/ImageGallery.styled';

export class App extends Component {
  state = {
    keyword: '',
    images: [],
    page: 1,
    loading: false,
    total: 1,
    findByKeyword: true,
  };

  searchByKeyword = key => {
    const keywordValue = Object.values(key);
    this.setState({
      keyword: keywordValue,
      page: 1,
      loading: false,
      total: 1,
      findByKeyword: true,
    });
  };

  onLoadMoreClick = () => {
    this.setState(prevSt => ({
      page: prevSt.page + 1,
    }));
  };

  setImages = (keyword, page) => {
    getImages(keyword, page)
      .then(resp => resp.json())
      .then(response => {
        if (response.total === 0) {
          this.setState({
            images: [],
            loading: false,
            findByKeyword: false,
          });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...response.hits],
            loading: false,
            findByKeyword: true,
            total: response.total,
          }));
        }
      })
      .catch(error => console.error(error));
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.keyword !== this.state.keyword ||
      prevState.page !== this.state.page
    ) {
      prevState.keyword !== this.state.keyword
        ? this.setState({ loading: true, images: [] })
        : this.setState({ loading: true });

      this.setImages(this.state.keyword, this.state.page);
    }
  }

  render() {
    const { images, keyword, loading, total, findByKeyword, page } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.searchByKeyword} />
        {findByKeyword ? (
          <ImageGallery images={images} />
        ) : (
          <ErrorMessage>
            Sorry, we can't find photo by tag "{keyword}"
          </ErrorMessage>
        )}
        {loading && <Loader />}
        {total / 12 > page && <Button onClick={this.onLoadMoreClick} />}
      </div>
    );
  }
}
