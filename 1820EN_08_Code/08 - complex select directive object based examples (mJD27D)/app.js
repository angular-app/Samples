var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope) {
  $scope.countriesByCode = {
    'AF' : 'AFGHANISTAN',
    'AX' : 'ÅLAND ISLANDS',
    'AL' : 'ALBANIA',
    'DZ' : 'ALGERIA',
    'AS' : 'AMERICAN SAMOA',
    'AD' : 'ANDORRA',
    'AO' : 'ANGOLA',
    'AI' : 'ANGUILLA',
    'AQ' : 'ANTARCTICA',
    'AG' : 'ANTIGUA AND BARBUDA',
    'AR' : 'ARGENTINA',
    'AM' : 'ARMENIA',
    'AW' : 'ARUBA',
    'AU' : 'AUSTRALIA',
    'AT' : 'AUSTRIA',
    'AZ' : 'AZERBAIJAN',
    'BS' : 'BAHAMAS',
    'BH' : 'BAHRAIN',
    'BD' : 'BANGLADESH',
    'BB' : 'BARBADOS',
    'BY' : 'BELARUS',
    'BE' : 'BELGIUM',
    'BZ' : 'BELIZE',
    'BJ' : 'BENIN',
    'BM' : 'BERMUDA'
  };

  $scope.countriesByName = {
    'AFGHANISTAN' : 'AF',
    'ÅLAND ISLANDS' : 'AX',
    'ALBANIA' : 'AL',
    'ALGERIA' : 'DZ',
    'AMERICAN SAMOA' : 'AS',
    'ANDORRA' : 'AD',
    'ANGOLA' : 'AO',
    'ANGUILLA' : 'AI',
    'ANTARCTICA' : 'AQ',
    'ANTIGUA AND BARBUDA' : 'AG',
    'ARGENTINA' : 'AR',
    'ARMENIA' : 'AM',
    'ARUBA' : 'AW',
    'AUSTRALIA' : 'AU',
    'AUSTRIA' : 'AT',
    'AZERBAIJAN' : 'AZ',
    'BAHAMAS' : 'BS',
    'BAHRAIN' : 'BH',
    'BANGLADESH' : 'BD',
    'BARBADOS' : 'BB',
    'BELARUS' : 'BY',
    'BELGIUM' : 'BE',
    'BELIZE' : 'BZ',
    'BENIN' : 'BJ',
    'BERMUDA' : 'BM'    
  };
    $scope.getFullName = function(user) {
      return user.firstName + ' ' + user.lastName;
    };
});
