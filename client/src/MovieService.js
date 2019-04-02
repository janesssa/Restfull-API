import axios from "axios";

const url = "http://51.68.188.157:8000/api/";

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
  static createMovie(title, studio, genre) {
    return axios.post(url, { title, studio, genre });
  }

  //Edit
  static editMovie(id, title, studio, genre) {
    let uri = url + id;

    let editItem = {
      id: id,
      title: title,
      studio: studio,
      genre: genre
    };

    axios.put(uri, editItem);   
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
