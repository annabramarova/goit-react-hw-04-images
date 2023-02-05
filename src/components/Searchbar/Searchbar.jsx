import { useState } from "react";
import { Notify } from "notiflix";
import PropTypes from 'prop-types';
import { SearchBar, SearchForm,  Button, Input } from "./Searchbar.styled";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";


const Searchbar = ({onSubmit}) => {
  const [search, setSearch] = useState('');

  const handleChange = ({ target }) => {
    const {value } = target;
    setSearch(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      return Notify.info('Please enter a search query.', {
        fontSize: '17px',
        position: 'center-center',
      });
    }
    onSubmit({search});
  };

    return (<SearchBar>
      <SearchForm onSubmit={handleSubmit}>
        <Button type="submit">
          <FaSearch size='1.5em' fill="navy" />
        </Button>

        <Input
          onChange={handleChange}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
        />
      </SearchForm>
    </SearchBar>)
  }

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}