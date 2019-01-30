import axios from "axios";

const url = "http://145.24.222.197:8000/api/movies/";

class MovieService {
  //Get
  static getMovies() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.items.map(items => ({
            ...items
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
    
  }

  //Create
  static createMovie(title, author, genre) {
    return axios.post(url, { title, author, genre });
  }

  //Edit
  static editMovie(id, title, author, genre) {
    let uri = url + id;

    let editItem = {
      title: title,
      author: author,
      genre: genre
    };

    axios.patch(uri, editItem);   
    window.location.reload()
  }

  //Delete
  static deleteMovie(id) {
    let uri = url + id;
    axios.delete(uri);  
    window.location.reload()
  }
}

export default MovieService;
