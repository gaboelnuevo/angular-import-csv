var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.fields = ['id', 'phone', 'name'];
  $scope.fileContent = null;
  $scope.columnsNames = [];
  $scope.items = [];
  $scope.columnsFields = {};

  $scope.$watch('fileContent', function() {
    $scope.loadCSV($scope.fileContent);
  });

  $scope.loadCSV = function (fileContent) {
    if(fileContent !== null){
        try {
          var columnsNames =  new CSV(fileContent, {}).parse()[0];
          var myCSV = new CSV(fileContent, { header: true }).parse();

          $scope.items = myCSV;
          $scope.columnsNames = columnsNames;
          $scope.columnsFields = {};

        } catch(err) {
          $scope.items = [];
          $scope.columnsNames = [];
          $scope.columnsFields = {};
        }
    }
  };

  $scope.sendData = function () {
    var columnsFields = $scope.columnsFields;
    var columnsData = Object.keys(columnsFields).map(function (key){
      return {
        column: key,
        field: columnsFields[key]
      }
    });
    console.log(
      {
        file: "",
        columns: columnsData
      }
    );
  };
});

app.directive('fileReader', function() {
  return {
    scope: {
      fileReader:"="
    },
    link: function(scope, element) {
      $(element).on('change', function(changeEvent) {
        var files = changeEvent.target.files;
        if (files.length) {
          var r = new FileReader();
          r.onload = function(e) {
              var data = e.target.result;
              scope.$apply(function () {
                scope.fileReader = data;
              });
          };

          r.readAsText(files[0]);
        }
      });
    }
  };
});
