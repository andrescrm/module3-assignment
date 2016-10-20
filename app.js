(function() {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItems);
    
    function FoundItems()
    {
        var ddo = {
            templateUrl : 'foundItems.html'            
        };
        
        return ddo;
    }
    
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService)
    {
        var narrow = this;               
        narrow.items = MenuSearchService.getItems();
        
        narrow.found = function() { MenuSearchService.getMatchedMenuItems(narrow.searchTerm)
                .then(function (response) {
                       narrow.items = response;
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
       }
        
       narrow.removeItem = function(index) {
           MenuSearchService.removeItem(index);
       }
        
    }
    
    MenuSearchService.$inject = ['$http', 'ApiBasePath']
    function MenuSearchService($http, ApiBasePath)
    {
        var service = this;        
        var items = [];
        
        service.getMatchedMenuItems = function(searchTerm)
        {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + '/menu_items.json')
            }).then(function(data){
                var filteredData = data.data.menu_items.filter(function(obj){
                    return obj.description.indexOf(searchTerm) !== -1;
                });
                items = filteredData;
                return filteredData;
            });
            
            return response;
        }
        
        service.getItems = function() {
            return items;
        }
        
        service.removeItem = function(index) {
            items.splice(index, 1);
        }
        
    }
})();