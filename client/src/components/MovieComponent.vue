<template>
<div class="container">
<h1> All Movies </h1>
<hr>
<p class="error" v-if="error">{{ error }}</p>
<div class="itemContainer">
  <div
    class='card'
    v-for="item in items"
    v-bind:item='item'
    v-bind:key='item._id'
    >   
    <div v-if='id === item._id' class="detail">
      <h3> Movie </h3>

      <p> {{ item.title }} </p>
      <h3> Author</h3>
      <p> {{ item.author }} </p>
      <h3> Genre</h3>
      <p> {{ item.genre }} </p>
       <button class="itembtn" v-on:click="editMovie(item._id, item.title, item.author, item.genre)"> Edit </button>
       <button class="itembtn" v-on:click="deleteMovie(item._id)"> Delete </button> 
       <button class="itembtn" v-on:click="id=''"> Close </button> 
    </div>
    <div v-else class="tile">
      <h3> Movie </h3>

      <p> {{ item.title }} </p>
      <p> <button class="itembtn" v-on:click="id=item._id"> Details </button> </p>
    </div>
  </div>  
</div>
<hr>
<div class="create">
  <h1 for="create-movie">Create a Movie!</h1>
  <input type="text" id="create-movie" v-model="title" placeholder="Title">
  <input type="text" id="create-movie" v-model="author" placeholder="Author">
  <input type="text" id="create-movie" v-model="genre" placeholder="Genre">
  <button class="createbtn" v-on:click="createMovie">Save!</button>
</div>
  </div>
</template>

<script>
import MovieService from '../MovieService';

export default {
  name: 'MovieComponent',
  data (){
    return {
      items: [],
      error: '',
      title: '',
      author: '',
      genre: '',
      id: '',
      hidden: true
    }
  },
  async created(){
    try{
      this.items = await MovieService.getMovies()
    }catch(err){
      this.error = err.message
    }
  },
  methods: {
    async createMovie(){
      await MovieService.createMovie(this.title, this.author, this.genre);
      this.items = await MovieService.getMovies();
    },

    async editMovie (title, author, genre){
      await MovieService.editMovie(1);
    },

    async deleteMovie (id){
      await MovieService.createMovie(id);
      this.items = await MovieService.getMovies();
    }
  }
}
</script>
<style scope>
.container{
}
.tile{
  padding: 10%;
  font-size: 26px;
}
.card{
  background-color: lightgray;
  margin: 1%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 25vw;
  height: 15vw;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.create{  
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.itembtn{
  min-width: 20%;
  padding: 3% 4%;
}
input{
  width: 90%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: center;
}
.createbtn{
  min-width: 10%;
  padding: 1% 2%;
  display: inline-block;
}
button{
  background-color: black;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}
.itemContainer{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.detail {
}

</style>

