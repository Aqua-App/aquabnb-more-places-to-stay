// import React from 'react';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import axios from 'axios';
import TopRow from './TopRow.jsx';
import ToggleContainer from './ToggleContainer.jsx';
import Listings from './Listings.jsx';
import Listing from './Listing.jsx';
import dummyData from '../dummydata.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import listingsService from './listingsService';




const Container = styled.div`
  display: grid;
  width: 1128px;
  height: 334px;
  grid-template-rows: 56px 278px;
  grid-template-areas: "header"
                       "listings";
  background-color: #fff;
  // border-style: solid;
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
  `;

const App = () => {
  const [name, setName] = useState('tom');
  const [listingData, setListingData] = useState([]);
  const [firstImg, setFirstImg] =  useState(0);
  const [lastImg, setLastImg] =  useState(4);
  const [pageNum, setPageNum] = useState(1);
  const [starred, setStarred] = useState([]);

  const clickStar = (value, id) => {
    const newListings = [...listingData];
    newListings[id].star = value;
    setListingData(newListings);
  }

  const clickLeft = () => {
    if (firstImg !== 0) {
      setFirstImg(firstImg - 4);
      setLastImg(lastImg - 4);
      setPageNum(pageNum - 1);
    } else {
      setFirstImg(8);
      setLastImg(12);
      setPageNum(3);
    }
  };

  const clickRight = () => {
    if (firstImg !== 8) {
      setFirstImg(firstImg + 4);
      setLastImg(lastImg + 4);
      setPageNum(pageNum + 1);
    } else {
      setFirstImg(0);
      setLastImg(4);
      setPageNum(1);
    }
  };

  const moldListings = (listings) => {
    const newListings = listings.map(house => { return {...house, star: false}});
    setListingData(newListings);
  };

  useEffect(async () => {
    const listings = await listingsService();
    console.log(listings);
    moldListings(listings);
  }, listingData, firstImg, name, lastImg, pageNum, starred);

return (
      <Container>
        {listingData.length !== 0 &&
          <>
            <TopRow clickLeft = { clickLeft } clickRight = { clickRight } pageNum = { pageNum }/>
            <Listings listingData = { listingData.slice(firstImg, lastImg) } firstImg = { firstImg } clickStar = { clickStar } starred = { starred } />
          </>
        }
      </Container>
  )
}


export default App;