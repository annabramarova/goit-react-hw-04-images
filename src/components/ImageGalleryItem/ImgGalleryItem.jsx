
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Item, Img } from './ImgGalleryItem.styled'
import { Modal } from 'components/Modal/Modal';

export const ImgGalleryItem = ({imgData}) => {
    const [modalOpen, setModalOpen] = useState(false);
        
    const showModal = () => setModalOpen(true);
    const hideModal = () => setModalOpen(false);


        const { tags, webformatURL, largeImageURL } = imgData;
        return (
            <Item >
                <Img src={webformatURL} alt={tags} onClick={showModal}/>
                {modalOpen && (<Modal onClose={hideModal}>
                    <img src={largeImageURL} alt={tags} />
                </Modal>)}
            </Item>
        );
    }

ImgGalleryItem.propTypes = {
    imageData: PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }),
}