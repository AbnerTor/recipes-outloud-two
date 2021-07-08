import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';
// import { CREATE_RECIPE } from '../utils/mutations';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

import Header from '../components/HeaderHome';

import { searchSpoonacular } from '../utils/API';
import { saveRecipeIds, getSavedRecipeIds } from '../utils/localStorage';

const Profile = () => {

  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [saveBook, { error, data }] = useMutation(SAVE_BOOK);
   // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  
  // set up useEffect hook to SAVE `savedBookIds` LIST TO LOCAL STORAGE on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  // create method to SEARCH FOR BOOKS and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);
     
      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      
      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));
      console.log(bookData);
      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to SAVE A BOOK to our database
  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

  // HERE** SAVE_BOOK mutation instead of saveBook
    try {

      const { data } = await saveBook({
        variables: { input: bookToSave },
      });

      // if book successfully saves to user's account, save book id to state
      console.log(savedBookIds);
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };



export default Profile;