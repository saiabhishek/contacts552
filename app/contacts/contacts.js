'use strict';

angular.module('myContacts.contacts', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope','$firebaseArray',function($scope,$firebaseArray) {
var ref =new Firebase('https://mycontactsapp552.firebaseio.com/contacts');
$scope.contacts=$firebaseArray(ref);
//console.log($scope.contacts);
$scope.showAddForm= function()
{
$scope.addFormShow=true;

}
$scope.editFormShow= function(contact)
{
$scope.editFormShow1=true;
$scope.id=contact.id;
$scope.name1=contact.name;
$scope.fathername1=contact.fathername;
$scope.Company1=contact.Company;
$scope.phone1=contact.phones[0].mobile;
$scope.work_phone1=contact.phones[0].land;
$scope.emailid1=contact.emailid;
$scope.address1=contact.address;
console.log($scope.id);

}
$scope.hide= function()
{
$scope.addFormShow=false;
$scope.showContac=false;
$scope.editFormShow1=false;

}
$scope.addFormSubmit=function(){

console.log("adding contacts");
if($scope.name){var name=$scope.name}else{var name=null};
if($scope.fathername){var fathername=$scope.fathername}else{var fathername=null};
if($scope.Company){var Company=$scope.Company}else{var Company=null};
if($scope.phone){var phone=$scope.phone}else{var phone=null};
if($scope.work_phone){var work_phone=$scope.work_phone}else{var work_phone=null};
if($scope.emailid){var emailid=$scope.emailid}else{var emailid=null};
if($scope.address){var address=$scope.address}else{var address=null};
$scope.contacts.$add({
	name: name,
	fathername: fathername,
	Company: Company,
	phones:[
	{
		mobile: phone,
		land:work_phone
	}],
	address: address,
	emailid: emailid
}).then(function(ref){
var id =ref.key();
console.log('add contact with id'+id);
//clearFields();
$scope.Msg=("added");
$scope.addFormShow=false;



});
}
$scope.editFormSubmit=function()
{
	
console.log('updating');
var id= $scope.id;
var record=$scope.contacts.$getRecord(id);
record.name=$scope.name1;
record.fathername=$scope.fathername1;
record.Company=$scope.Company1;
record.phone[0].mobile=$scope.phone1;
record.phone[0].land=$scope.work_phone1;
record.emailid=$scope.emailid1;
record.address=$scope.address1;
record.contacts.$save(record).then(function(ref){
console.log(ref.key);	
});
clearFields();
$scope.editFormShow=false;
$scope.Msg=("updated");

}
$scope.remove=function(contact)
{
	$scope.contacts.$remove(contact);
	$scope.Msg=("removed");
}
$scope.showContact =function(contact)
{
	$scope.showContac=true;
	console.log('Getting contact..');
$scope.name=contact.name;
$scope.fathername=contact.fathername;
$scope.Company=contact.Company;
$scope.phone=contact.phones[0].mobile;
$scope.work_phone=contact.phones[0].land;
$scope.emailid=contact.emailid;
$scope.address=contact.address;


};

}]);