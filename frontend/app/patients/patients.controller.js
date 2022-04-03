app.controller('patientsController', function($scope, $mdDialog, $mdToast, patientsApi){
MAX_IMAGE_SIZE = 1000000   
uuidv4 = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
$scope.readPatients = function(){
        patientsApi.getAll().then(function successCallback(response){
            console.info(response.data);
            $scope.patients = response.data.data;
        }, function errorCallback(response){
            $scope.showToast("Unable to read record.");
        });
}
     
$scope.showCreatePatientForm = function(event){
    $scope.id =uuidv4()
    $scope.is_save = true;
    $mdDialog.show({
        controller: DialogController,
        templateUrl: './app/patients/patient_form.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        scope: $scope,
        preserveScope: true,
        fullscreen: true // Only for -xs, -sm breakpoints.
    });
}
 

// methods for dialog box
function DialogController($scope, $mdDialog) {
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
}

// create new patient
$scope.savePatient = function(){
 
    patientsApi.save($scope).then(function successCallback(response){
        $scope.showToast("Succesfully Create Patient");
        $scope.readPatients();
        $scope.cancel();
        $scope.clearPatientForm();
    }, function errorCallback(response){
        $scope.showToast("Unable to create record.");
    });
}
 

 // clear variable / form values
$scope.clearPatientForm = function(){
    $scope.id = "";
    $scope.name = "";
    $scope.description = "";
    $scope.price = "";
}

// show toast message
$scope.showToast = function(message){
    $mdToast.show(
        $mdToast.simple()
            .textContent(message)
            .hideDelay(3000)
            .position("top right")
    );
}


$scope.showPatient = function(id){
    patientsApi.get(id).then(function successCallback(response){
        const patient =  response.data.data
        $scope.is_save = false;
        $scope.id = patient.id;
        $scope.fullname = patient.fullname;
        $scope.age = patient.age;
        $scope.gender = patient.gender;
        $scope.address = patient.address;
        $scope.email = patient.email;
        $mdDialog.show({
            controller: DialogController,
            templateUrl: './app/patients/patient_form.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            fullscreen: true
        }).then(
            function(){},
 
            // user clicked 'Cancel'
            function() {
                // clear modal content
                $scope.clearPatientForm();
            }
        );
 
    }, function errorCallback(response){
        $scope.showToast("Unable to retrieve record.");
    });
 
}
 

$scope.showUpdatePatientForm = function(id){

    patientsApi.get(id).then(function successCallback(response){
 
        const patient =  response.data.data
        $scope.is_save = true;
        $scope.id = patient.id;
        $scope.fullname = patient.fullname;
        $scope.age = patient.age;
        $scope.gender = patient.gender;
        $scope.address = patient.address;
        $scope.email = patient.email;
        $scope.image_url = patient.image_url;
        $mdDialog.show({
            controller: DialogController,
            templateUrl: './app/patients/patient_form.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            fullscreen: true
        }).then(
            function(){},
 
            // user clicked 'Cancel'
            function() {
                // clear modal content
                $scope.clearPatientForm();
            }
        );
 
    }, function errorCallback(response){
        $scope.showToast("Unable to retrieve record.");
    });
 
}


$scope.confirmDeletePatient = function(event, id){
 
    $scope.id = id;
  var confirm = $mdDialog.confirm()
        .title('Are you sure?')
        .textContent('Patient will be deleted.')
        .targetEvent(event)
        .ok('Yes')
        .cancel('No');
    $mdDialog.show(confirm).then(
        function() {
            $scope.deletePatient();
        },
        function() {
            // hide dialog
        }
    );
}

$scope.deletePatient = function(){
 
    patientsApi.deletePatient($scope.id).then(function successCallback(response){
        $scope.showToast(response.data.message);
        $scope.readPatients();

        $scope.showToast("Succesfully Create Patient");
        $scope.readPatients();
        $scope.cancel();
        $scope.clearPatientForm();


    }, function errorCallback(response){
        $scope.showToast("Unable to delete record.");
    });
 
}
 
// searchPatients will be here
// search patients
$scope.searchPatients = function(){

   
 
    // use patients factory
    patientsApi.searchPatients($scope.patient_search_keywords).then(function successCallback(response){
        $scope.patients = response.data.records;
    }, function errorCallback(response){
        $scope.showToast("Unable to read record.");
    });
}


$scope.onFileChange = function(files) {
    if (!files.length) return
    let reader = new FileReader()
    reader.onload = (e) => {
      console.log('length: ', e.target.result.includes('data:image/jpeg'))
      if (!e.target.result.includes('data:image/jpeg')) {
        return alert('Wrong file type - JPG only.')
      }
      if (e.target.result.length > MAX_IMAGE_SIZE) {
        return alert('Image is loo large.')
      }
      const image = e.target.result
      const binary = atob(image.split(',')[1])
      const array = []
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
      }
      const blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
      patientsApi.signedS3path($scope.id+'.jpg').then(function successCallback(response){
        $scope.uploadURL = response.data.data.uploadURL;
        $scope.image_name = response.data.key;
        $scope.image_url = $scope.uploadURL.split('?')[0];
        console.log('Uploading to: ', $scope.uploadURL)
        fetch($scope.uploadURL, {
            method: 'PUT',
            body: blobData
         }).then(response => {
            console.log(response)
            console.log($scope.uploadURL.split('?')[0])
         } )
      }, function errorCallback(response){
            $scope.showToast("Unable to read record.");
      });
         
    }
    reader.readAsDataURL(files[0])
}


});