import axios from 'axios';

const url = "http://145.24.222.197:8000/api/movies/";

class MovieService {
    //Get
    static getMovies(){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.items.map(items => ({
                        ...items
                    }))
                );
            }catch(err){
                reject(err);
            }
        })
    }

    //Create
    static createMovie(title, author, genre){
        return axios.post(url, {title, author, genre})
    }

    //Edit
    static editMovie(){
        return 'hoi'
    }

    //Delete
    static deleteMovie(id){
        return axios.delete(`${url}${id}`)
    }
}

export default MovieService

