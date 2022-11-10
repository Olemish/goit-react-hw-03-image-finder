import { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import '../styles/styles.css';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { Modal } from './Modal/Modal';

import { LoadMore } from './Loader/Loader';
import { ButtonLoadMore } from './Button/Button';

import api from '../api';

axios.defaults.baseURL = 'https://pixabay.com/api/';

axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY;

export class App extends Component {
  state = {
    images: [],
    status: 'idle',
    error: null,
    search: '',
    showModal: false,
    page: 1,
    selectedImg: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.search;
    const nextQuery = this.state.search;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: 'pending' });
      api
        .fetchImages(nextQuery, nextPage)
        .then(response => {
          const responseApp = response.hits.map(
            ({ id, largeImageURL, webformatURL, tags }) => {
              return { id, largeImageURL, webformatURL, tags };
            }
          );
          this.setState(prevState => ({
            images: [...prevState.images, ...responseApp],
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  heandleSearch = search => {
    this.setState({ search, page: 1, images: [] });
  };

  toggleModal = async largeImg => {
    await this.setState({ selectedImg: largeImg });
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  handelLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, error, status, showModal, selectedImg } = this.state;

    return (
      <main className="App">
        <Searchbar onSubmit={this.heandleSearch} />

        <ImageGallery images={images} toggleModal={this.toggleModal} />
        {images.length > 0 && status !== 'pending' && (
          <ButtonLoadMore onLoadMore={this.handelLoadMore} />
        )}
        {status === 'pending' && <LoadMore />}
        {status === 'rejected' && <p>{error.message}</p>}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={selectedImg} alt="" />
          </Modal>
        )}
      </main>
    );
  }
}
