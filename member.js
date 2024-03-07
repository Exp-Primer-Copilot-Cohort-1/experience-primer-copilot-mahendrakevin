function skillsMember() {
  return {
    name: 'skillsMember',
    restrict: 'E',
    templateUrl: 'templates/member.html',
    scope: {
      member: '='
    },
    link: function(scope, element, attrs) {
      console.log(scope.member);
    }
  };
}