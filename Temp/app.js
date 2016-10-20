(function() {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");
    
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService)
    {
        var narrow = this;       
        
        narrow.found = function() { MenuSearchService.getMatchedMenuItems(narrow.searchTerm)
                .then(function (response) {
                      console.log(response.data);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
       }
        
    }
    
    MenuSearchService.$inject = ['$http', 'ApiBasePath']
    function MenuSearchService($http, ApiBasePath)
    {
        var service = this;
        
        service.getMatchedMenuItems = function(searchTerm)
        {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + '/menu_items.json')
            }).then(function(data){
                var filteredData = data.data.menu_items.filter(function(obj){
                    return obj.description.indexOf(searchTerm) !== -1;
                });
                return filteredData;
            });
            
            return response;
        }
        
    }
})();