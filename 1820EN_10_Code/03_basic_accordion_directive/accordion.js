angular.module('accordion', [])

.controller('AccordionController', ['$scope', function ($scope) {
  // This array keeps track of the accordion groups
  this.groups = [];

  // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
  this.closeOthers = function(openGroup) {
    angular.forEach(this.groups, function (group) {
      if ( group !== openGroup ) {
        group.isOpen = false;
      }
    });
  };
  
  // This is called from the accordion-group directive to add itself to the accordion
  this.addGroup = function(groupScope) {
    var that = this;
    this.groups.push(groupScope);

    groupScope.$on('$destroy', function (event) {
      that.removeGroup(groupScope);
    });
  };

  // This is called from the accordion-group directive when to remove itself
  this.removeGroup = function(group) {
    var index = this.groups.indexOf(group);
    if ( index !== -1 ) {
      this.groups.splice(this.groups.indexOf(group), 1);
    }
  };

}])

// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself element.
.directive('accordion', function () {
  return {
    restrict:'E',
    controller:'AccordionController',
    transclude: true,
    templateUrl: '1820EN_10_Code/03_basic_accordion_directive/template/accordion/accordion.html'
  };
})

// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
.directive('accordionGroup', function() {
  return {
    require:'^accordion',         // We need this directive to be inside an accordion
    restrict:'E',                 // It will be an element
    transclude:true,              // It transcludes the contents of the directive into the template
    replace: true,                // The element containing the directive will be replaced with the template
    templateUrl:'1820EN_10_Code/03_basic_accordion_directive/template/accordion/accordion-group.html',
    scope:{ heading:'@' },          // Create an isolated scope and mirror the heading attribute onto this scope
    link: function(scope, element, attrs, accordionCtrl) {
      accordionCtrl.addGroup(scope);
      scope.isOpen = false;
      scope.$watch('isOpen', function(value) {
        if ( value ) {
          accordionCtrl.closeOthers(scope);
        }
      });
    }
  };
});
