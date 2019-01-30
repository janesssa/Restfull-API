<template>
<div class="container">
<h1> All Movies </h1>
<hr>
<div>
  <label for="create-movie">Create a Movie!</label>
  <input type="text" id="create-movie" v-model="title" placeholder="Title">
  <input type="text" id="create-movie" v-model="author" placeholder="Author">
  <input type="text" id="create-movie" v-model="genre" placeholder="Genre">
  <button v-on:click="createMovie">Save!</button>
</div>
<hr>
<p class="error" v-if="error">{{ error }}</p>
      <div
        class='content'
        v-for="(item) in items"
        v-bind:item='item'
        v-bind:key='item._id'
        > 
        
      <h3> Item </h3>
      <h1 v-if="!hidden"> Artiest </h1>
      <h1 v-if="!hidden"> Genre</h1>

          <p> {{ item.title }} </p>
          <p v-if='!hidden'> {{ item.author }} </p>
          <p v-if='!hidden'> {{ item.genre }} </p>
          <p> <button v-on:click="hidden = false"> details </button> </p>
          <p> <button v-on:click="editMovie(item._id, item.title, item.author, item.genre)"> Edit </button></p>
          <p> <button v-on:click="deleteMovie(item._id)"> Delete </button> </p>
          <p> <button v-if='!hidden' v-on:click="hidden = true"> Close </button> </p>
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
      this.movies = await MovieService.getMovies();
    },

    async detailMovie(){
      await MovieService.detailMovie(1);
    },

    async editMovie (){
      await MovieService.editMovie(1);
    },

    async deleteMovie (id){
      await MovieService.createMovie(id);
      this.movies = await MovieService.getMovies();
    }
  }
}
</script>
<style scope>
.container{
  display: flex;
  flex-direction: column;
}
.content{
  flex-wrap: wrap;
  justify-content: space-evenly;
}

</style>

