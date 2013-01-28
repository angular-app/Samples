angular.module('app', ['accordion', '1820EN_10_Code/03_basic_accordion_directive/template/accordion/accordion.html', '1820EN_10_Code/03_basic_accordion_directive/template/accordion/accordion-group.html'])

.controller('AccordionDemoCtrl', function ($scope) {
  $scope.groups = [
    {
      title: "Dynamic Group Header - 1",
      content: "Dynamic Group Body - 1"
    },
    {
      title: "Dynamic Group Header - 2",
      content: "Dynamic Group Body - 2"
    },
    {
      title: "Dynamic Group Header - 3",
      content: "Dynamic Group Body - 3"
    }
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    $scope.items.push('Item ' + $scope.items.length);
  };
});