var test = new Vue ({ 
    el: "#content",
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
          .get('http://localhost:3000/api/movies')
          .then(response => (this.items = response.data.items))
      }, 

      methods: {

            detailItem(_id){
                let uri = 'http://localhost:3000/api/movies/'+ _id;
                console.log(uri);

            },

            deleteItem(_id)
            {
            let uri = 'http://localhost:3000/api/movies/'+ _id;
            
            axios
            .delete(uri, { data: { foo: "bar" } })
            .then(response => this.items.splice(_id, 1))  
            
            window.location.reload(); 
            
            },

            editItem(_id, title, author, genre)
            {
              console.log("edit button werkt");
              console.log(_id, title, author,genre);
            },

            newItem()
            {
                let uri = 'http://localhost:3000/api/movies/';

                let new_item = {
                    title : this.items.title, 
                    artist : this.items.author,
                    genre : this.items.genre,  
                } 

                console.log(new_item);

                axios.post(uri, new_item)
                
                window.location.reload();      
            
      
        }
    } 

})