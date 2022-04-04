app.factory('patientsApi', function ($http) {
  const hostURL = 'https://fuzbevu3sa.execute-api.us-east-1.amazonaws.com/production'
  const productURL = hostURL + '/patient'
  const api = {}
  api.getAll = function () {
    return $http({
      method: 'GET',
      url: productURL + '/all'
    })
  }

  api.save = function ($scope) {
    return $http({
      method: 'POST',
      data: {
        id: $scope.id,
        fullname: $scope.fullname,
        age: $scope.age,
        gender: $scope.gender,
        email: $scope.email,
        address: $scope.address,
        image_url: $scope.image_url
      },
      url: productURL + ''
    })
  }

  api.get = function (id) {
    return $http({
      method: 'GET',
      url: productURL + '/' + id
    })
  }

  api.deletePatient = function (id) {
    return $http({
      method: 'DELETE',
      data: { },
      url: productURL + '/' + id
    })
  }

  api.query = function (keywords) {
    return $http({
      method: 'GET',
      url: productURL + '?s=' + keywords
    })
  }

  api.signedS3path = function (ref) {
    return $http({
      method: 'GET',
      url: hostURL + '/s3/signed-path/' + ref
    })
  }

  api.put = function (url, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: url
    })
  }

  return api
})
