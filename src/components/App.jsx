import { useEffect, useState } from "react";
import { Notify } from "notiflix";
import  Searchbar  from "./Searchbar/Searchbar";
import { fetchImages } from '../api/fetchImages';
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { Error } from './Error/Error';
import { Spinner } from "./Loader/Loader";


export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('init');
  
  useEffect(() => {
    setStatus('loading');

    fetchImages(query, page)
      .then(({ hasMoreImages, images: newImages, nohits }) => {
        if (nohits) {
          setStatus('init');
          return Notify.info('Nothing found');
        }
        setImages(images => [...images, ...newImages]);
        setStatus(hasMoreImages ? 'done' : 'allLoaded');
      })
      .catch(error => { setError(error.message); setStatus('error'); });
    
    }, [query, page]);

  const handleSubmit = ({search}) => {
    if (search !== query) {
      setQuery(search);
      setPage(1);
      setImages([]);
    }
  };


  const handleLoadMore = () => {    
    setPage(prevPage => prevPage + 1);
  };

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '18px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery images={images} />
        {status === 'error' && <Error message={error} />}
        {status === 'loading' && <Spinner />}
        {Boolean(images.length >0) && status === 'done' && (<div style={{ textAlign: 'center'}}><LoadMoreBtn onClick={handleLoadMore}  /></div>)}
        
      </div>
    );
};
