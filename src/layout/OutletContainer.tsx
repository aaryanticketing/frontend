import React from "react";
import MovieCard from "../components/movie/movieCard";
import styles from "./Layout.module.css";
import axios from 'axios';
// import oauth from 'axios-oauth-client';

export default class OutletContainer extends React.Component {
  state = {
    movies: []
  }

  componentDidMount() {
    axios.request({
      url: "/t/aaryan/oauth2/token",
      method: "post",
      baseURL: "https://api.asgardeo.io/",
      auth: {
        username: "9AKXBzRqLYBkVXZalZTPfm7WGqAa",
        password: "_DQWfSVBuq1ydjSgRf4lbwwOESf7crmwXy14fu0wIvsa"
      },
      data: {
        "grant_type": "client_credentials",
        "scope": "public"    
      }
    }).then((res) => {
     axios.get(`${window.config.todoApiUrl}/movies`,
      {
          headers: {
            'Authorization': `Bearer ${res.data.access_token}`
          }
      }).then((res1) => {
          const movies = res1.data;
          this.setState({ movies });
          console.log(this.state.movies);
        })
    });
  }

  render() {
    return (
      <div className={styles.container}>
        {
          this.state.movies
            .map((movie: { image: string, movie_name: string, description_text:string, id: string, start_date:string, end_date:string, amount:string }) =>
              <MovieCard imgUrl={movie.image} title={movie.movie_name} description={movie.description_text} id={movie.id} start_date={movie.start_date} end_date={movie.end_date} amount={movie.amount}/>
            )
        }
      </div>
    )
  }
}