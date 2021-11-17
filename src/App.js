import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import MovieDetail from "./components/MovieDetail";
import PageNotFound from './components/PageNotFound';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Router>
        <Header></Header>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/movie/:imdbID" component={MovieDetail} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
