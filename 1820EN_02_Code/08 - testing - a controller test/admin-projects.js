angular.module('admin-projects', [])
  .controller('ProjectsEditCtrl', function($scope, project) {

    this.sth = 'else';

    $scope.project = project;

    $scope.removeTeamMember = function(teamMember) {
      var idx = $scope.project.teamMembers.indexOf(teamMember);
      if(idx >= 0) {
        $scope.project.teamMembers.splice(idx, 1);
      }
    };

    //other methods of the controller
  });