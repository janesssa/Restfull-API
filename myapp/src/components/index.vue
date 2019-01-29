


<template>
<div id="content">
   <table> 
            <th> Naam </th>
            <th> Artiest </th>
            <th> Genre</th>
            <th>details</th> 
            <th> Edit</th>
            <th> Delete</th>

            <tr v-for="(item) in items"> 
                
                <td> {{ item.title }} </td>
                <td> {{ item.artist }} </td>
                <td> {{ item.genre }} </td>
               
                <td> 
                    
                        
                    <button v-on:click="detailItem(item._id)"> details </button>

                </td>

                <td> <button  v-on:click="editItem(item._id, item.title, item.artist, item.genre)"> Edit </button></td>
               

                <td> <button v-on:click="deleteItem(item._id)"> Delete </button> </td>
            </tr>  

           


        </table>
        </div>
</template>
<script>
export default ({ 
    name: "index",
    data: {
        isHidden: false
      },
    
    data () {
         
        return {
          items: {"title": "", "author": "", "genre":""} 
        
        }
      },

      mounted () {
        axios
          .get('http://145.24.222.197:8000/api/movies')
          .then(response => (this.items = response.data.items))
      }, 

      methods: {

            detailItem(_id){
                let uri = 'http://145.24.222.197:8000/api/movies/'+ _id;
                console.log(uri);

            },

            deleteItem(_id)
            {
            let uri = 'http://145.24.222.197:8000/api/movies/'+ _id;
            
            axios
            .delete(uri, { data: { foo: "bar" } })
            .then(response => this.items.splice(_id, 1))  
            
            window.location.reload(); 
            
            },

            editItem(_id, title, artist, genre)
            {
              console.log("edit button werkt");
              console.log(_id, title, artist,genre);
        


            },

            newItem()
            {
                let uri = 'http://145.24.222.197:8000/api/movies/';

                let new_item = {
                    title : this.items.title, 
                    artist : this.items.artist,
                    genre : this.items.genre,  
                } 

                console.log(new_item);

                axios.post(uri, new_item)
                
                window.location.reload();      
            
      
        }
    } 

})

</script>


