import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Image_1 from './img_link/image_1';
import Image_2 from './img_link/image_2';
import Image_3 from './img_link/image_3';
import All from './all';

const App = () => {
  return (
    <BrowserRouter>
        <Route exact path='/' component={All} />
        <Route path='/Image1' component={Image_1} />
        <Route path='/Image2' component={Image_2} />
        <Route path='/Image3' component={Image_3} />
    </BrowserRouter>
  );
}

export default App;
