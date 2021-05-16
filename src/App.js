import React from 'react';
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  getMovies = async () => { //비동기
    const { //(object).data.data.movies
      data: {
        data: { movies }
      }
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    this.setState({ movies, isLoading: false }); //"map~"
  };

  componentDidMount() { //생명주기함수; Component render 완료후 실행.
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state; //app.state.isLoading 이 render()이하에에서의 isLoading과 같다...
    return (<section className="container">
      {isLoading ? (<div className="loader">
        <span className="loader__text">Loading...</span>
      </div>) :(<div className="movies">
      {movies.map( movie => (

<Movie key={movie.id} id={movie.id} year={movie.year} title={movie.title}  summary={movie.summary} 
poster={movie.medium_cover_image} genres={movie.genres} />)
)
  }</div>)
      }
  </section>);
  }
}

export default App;