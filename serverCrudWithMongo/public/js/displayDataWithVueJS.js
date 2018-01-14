var url;
var urlCount;

// Define a new component called todo-item
Vue.component('todo-item', {
    // The todo-item component now accepts a
    // "prop", which is like a custom attribute.
    // This prop is called todo.
    props: ['todo'],
    template: '<li><p><strong>{{ todo.name }} <label><i> {{ todo.cuisine }}</i></label>'
    +'<span v-for="(item, index) in todo.grades">{{ item.grade }}</span></strong>'
    +'<span>{{ todo.address.street }} {{ todo.address.zipcode }} {{ todo.borough }}</span></p></li>'
});

Vue.component('option-select-page-item', {
    // The todo-item component now accepts a
    // "prop", which is like a custom attribute.
    // This prop is called todo.
    props: ['nopage'],
    template: ' <option>{{ nopage.nopageid }}</option>'
});
  
var app7 = new Vue({
    el: '#app-7',
    data : {
        todos: [],
        nopages: [],
        selected: '',
        counter: 1,
        total: 0,
      },
    methods: {
        init: function() {
            url = "/api/restaurants";  
            document.getElementById("btnPrevious").disabled = true;      
            fetch(url)
                .then(function(responseJSON) {
                    responseJSON.json()
                    .then(function(res) {
                        console.log(res);
                        // Maintenant res est un vrai objet JavaScript
                        for (var i=0; i < res.data.length; i++) {
                            app7.todos.push(res.data[i]);
                        }
                    });
                })
                .catch(function (err) {
                    console.log(err);
            });
        },
        next: function() {
            app7.updateButtons();      
            if (app7.counter < 2535) {
                document.getElementById("btnNext").disabled = false; 
                app7.counter++;
                app7.selected = app7.counter;
                console.log(app7.counter);
                let url = "/api/restaurants?page="+app7.counter;
                document.getElementById("btnPrevious").disabled = false;        
                fetch(url)
                    .then(function(responseJSON) {
                        responseJSON.json()
                        .then(function(res) {
                            // Maintenant res est un vrai objet JavaScript
                            app7.todos = [];
                            for (var i=0; i < res.data.length; i++) {
                                app7.todos.push(res.data[i]);
                            }
                        });
                    })
                    .catch(function (err) {
                        console.log(err);
                });
            }
        },
        prev: function() {
            console.log(app7.counter);
            app7.updateButtons();  
            if (app7.counter > 1) {             
                app7.counter--;
                app7.selected = app7.counter;
                let url = "/api/restaurants?page="+app7.counter;      
                fetch(url)
                    .then(function(responseJSON) {
                        responseJSON.json()
                        .then(function(res) {
                            // Maintenant res est un vrai objet JavaScript
                            app7.todos = [];
                            for (var i=0; i < res.data.length; i++) {
                                app7.todos.push(res.data[i]);
                            }
                        });
                    })
                    .catch(function (err) {
                        console.log(err);
                });
            }
        }, 
        count: function() {
            urlCont = "/api/restaurantscount";  
            fetch(urlCont)
                .then(function(responseJSON) {
                    responseJSON.json()
                    .then(function(res) {
                        // Maintenant res est un vrai objet JavaScript
                        console.log(res.data/10);
                        app7.total = res.data/10;
                        app7.nopages = [];
                        for (var i=1; i < app7.total ; i++) {
                            //console.log(i);
                            app7.nopages.push({"nopageid":i});
                        }
                        console.log(app7.nopages);
                        
                    });
                })
                .catch(function (err) {
                    console.log(err);
            });
        },
        updateView: function() {
            app7.counter = app7.selected;
            app7.updateButtons();           
            console.log(app7.selected);      
            let url = "/api/restaurants?page="+app7.selected;      
            fetch(url)
                .then(function(responseJSON) {
                    responseJSON.json()
                    .then(function(res) {
                        // Maintenant res est un vrai objet JavaScript
                        app7.todos = [];
                        for (var i=0; i < res.data.length; i++) {
                            app7.todos.push(res.data[i]);
                        }
                    });
                })
                .catch(function (err) {
                    console.log(err);
            });
        },
        updateButtons: function() {          
            if (app7.counter < 2535) {
                document.getElementById("btnNext").disabled = false; 
            } else {
                document.getElementById("btnNext").disabled = true; 
            }
            if (app7.counter > 2) {
                document.getElementById("btnPrevious").disabled = false;
            } else {
                document.getElementById("btnPrevious").disabled = true; 
            }
    
        }
    }
    
  });

  app7.init();
  app7.count();
