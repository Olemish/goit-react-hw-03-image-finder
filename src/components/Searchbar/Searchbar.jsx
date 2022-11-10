import React from 'react';
import '../../styles/styles.css';

const Searchbar = ({ onSubmit }) => {
  return (
    <header className="Searchbar">
      <form
        className="SearchForm"
        onSubmit={e => {
          e.preventDefault();
          onSubmit(e.target.search.value);
          e.target.reset();
        }}
      >
        <button type="submit" className="SearchFormButton">
          <span className="SearchFormButtonLabel">Search</span>
        </button>
        <input
          className="SearchFormInput"
          type="text"
          autocomplete="off"
          autofocus
          name="search"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
export default Searchbar;
