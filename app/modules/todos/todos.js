(function () {
    angular.module('app.todos')
        .controller('Todos', Todos);

    /* @ngInject */
    function Todos($scope, $log, dataservice) {
        var todos = this;
        todos.list = dataservice.storage.get();


        todos.querySearch = querySearch;
        todos.selectedItemChange = selectedItemChange;
        todos.searchTextChange = searchTextChange;
        todos.addTodo = addTodo;
        todos.removeTodo = removeTodo;
        
        //saves the list when it changes
        $scope.$watch('todos.list', function () {
             dataservice.storage.set(todos.list);
        }, true);

        function addTodo() {
            var newTodo = todos.searchText.trim();
            if (newTodo.length > 0) {
                todos.list.push({
                    title: newTodo,
                    completed: false
                });
                todos.searchText = '';
            }
        }

        function removeTodo(todo) {
            todos.list.splice(todos.list.indexOf(todo), 1);           
        }

        function querySearch(query) {
            if (query) {
                return dataservice.getSuggestions(query);
            } else {
                return [];
            }
        }

        function searchTextChange(text) {
        }
        function selectedItemChange(item) {
            addTodo();
        }

    }

} ());