import logo from './logo.svg';
import './App.css';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { API } from './api/api';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function App() {
  const [terms, setTerms] = useState([])
  const [brands, setBrands] = useState([])
  const location = useLocation()
  const pathName = location.pathname
  const splitLetters = pathName.split('/').map(el => el.split('-')[0]).slice(1)
  const splitUrl = pathName.split('/').slice(1)

  useEffect(() => {
    API.getTerms().then(data => {
      setTerms(data.data.data)
    })
    API.getBrands().then(data => {
      setBrands(data.data.data)
    })
  }, [])

  const termsUrl = (slug) => {
    const newSplitUrl = [...splitUrl]
    if (splitLetters.includes('s') && splitLetters.length > 1) {
      newSplitUrl.splice(splitLetters.indexOf('s'), 1, `s-${slug}`)
      return newSplitUrl.join('/');
    } else if (splitLetters.includes('b') && splitLetters.length === 1) {
      newSplitUrl.splice(1, 0, `s-${slug}`)
      return newSplitUrl.join('/');
    } else {
      return `/s-${slug}`
    }
  }

  const brandsUrl = (slug) => {
    const newSplitUrl = [...splitUrl]
    if (splitLetters.includes('b') && splitLetters.length > 1) {
      newSplitUrl.splice(splitLetters.indexOf('b'), 1, `b-${slug}`)
      return newSplitUrl.join('/');
    } else if (splitLetters.includes('s') && splitLetters.length === 1) {
      newSplitUrl.splice(1, 0, `b-${slug}`)
      return newSplitUrl.join('/')
    } else {
      return `/b-${slug}`
    }
  }

  const termsLabel = terms.map(el => (
    <NavLink
      to={termsUrl(el.slug)}
      key={el.id}>
      {el.label}
    </NavLink>
  ))
  const brandsLabel = brands.map(el => (
    <NavLink
      to={brandsUrl(el.slug)}
      key={el.id}>
      {el.label}
    </NavLink>
  ))

  return (
    <div className="App">
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Послуги</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {termsLabel}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Бренди</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {brandsLabel}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default App;
