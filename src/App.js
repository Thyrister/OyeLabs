import React, { useEffect, useState } from 'react';
import './App.css';
import RealEstateHeader from './components/real-estate-header/RealEstateHeader';
import RealEstateListing from './components/real-estate-listing/RealEstateListing';


import Login from './auth/Login';
import { useDispatch, useSelector } from "react-redux";
import {auth} from './auth/firebase';
import { login, logout, selectUser } from "./features/userSlice";

function App() {
  const initialState = [
    {
      title: 'Cup Of Coffee Anyone?',
      location: 'Nashik',
      id: '109',
    },
    {
      title: '48 hours in Copenhagen',
      location: 'Pune',
      id: '108',
    },
    {
      title: '5 hours in paradise',
      location: 'Goa',
      id: '107',
    },
    {
      title: 'Breakfast in Vienaa',
      location: 'Goa',
      id: '106',
    },
    {
      title: 'A Barista guide to Chicago',
      location: 'Mumbai',
      id: '105',
    },
  ];

  const [query, setQuery] = useState('');
  const [listings, setListings] = useState(initialState);
  const [filteredListings, setFilteredListings] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [currentListing, setCurrentListing] = useState({});
  const currentListings = isFiltered ? filteredListings : listings;

  const handleQueryChange = (e) => {
    if (e.target.value) {
      setIsFiltered(true);
    } else setIsFiltered(false);

    setQuery(e.target.value);
    // filter(e.target.value);
  };

  const handleEditClick = (e) => {
    const item = listings.filter((listing) => listing.id === e.target.value);
    setIsEdit(true);
    setCurrentListing(item[0]);
    setTitle(item[0].title);
    setPrice(item[0].price);
    setLocation(item[0].location);
  };

  const handleDeleteClick = (e) => {
    const newListings = listings.filter(
      (listing) => listing.id !== e.target.value
    );
    setListings(newListings);
  };

  const clearInput = () => {
    setIsEdit(false);
    setTitle('');
    setPrice('');
    setLocation('');
    setCurrentListing({});
  };

  const handleAddOrEditClick = () => {
    if (isEdit) {
      const newListing = {
        title,
        location,
        price: +price,
        id: currentListing.id,
      };
      editCurrentListing(newListing);
    } else {
      const newListing = {
        title,
        location,
        price: +price,
        id: Math.floor(Math.random() * 101).toLocaleString(),
      };
      addListing(newListing);
    }
    clearInput();
  };

  const editCurrentListing = (newListing) => {
    setListings(
      listings.map((listing) =>
        listing.id === currentListing.id ? newListing : listing
      )
    );
  };

  const addListing = (newListing) => {
    setListings([newListing, ...listings]);
  };

  // const filter = (query) => {
  //   if (query) {
  //     const filteredListings = listings.filter(
  //       (listing) => listing.location === query
  //     );
  //     setFilteredListings(filteredListings);
  //   } else setFilteredListings([]);
  // };

  useEffect(() => {
    if (query) {
      const filteredListings = listings.filter(
        (listing) => listing.location === query
      );
      setFilteredListings(filteredListings);
    } else setFilteredListings([]);
  }, [listings, query]);

  //temporary
  const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(()=>{
        auth.onAuthStateChanged((authUser)=>{
           if(authUser){
               dispatch(login({
                   uid : authUser.uid,
                   photo : authUser.photoURL,
                   displayName : authUser.displayName,
                   email : authUser.email
               }));
               console.log(authUser)
           }
           else{
               dispatch(logout())
           }
       })
    }, [dispatch])



  return (
    <div className="app">
       { user ? (<>
      <RealEstateHeader
        query={query}
        handleQueryChange={handleQueryChange}
        isEdit={isEdit}
        title={title}
        setTitle={setTitle}
        price={price}
        setPrice={setPrice}
        location={location}
        setLocation={setLocation}
        clearInput={clearInput}
        handleAddOrEditClick={handleAddOrEditClick}
      />
      {currentListings.length === 0 && (
        <h2 style={{ paddingTop: 10, textAlign: 'center' }}>No Results</h2>
      )}
      <RealEstateListing
        listings={currentListings}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
      </>) : <Login/>}
    </div>
  );
}

export default App;
