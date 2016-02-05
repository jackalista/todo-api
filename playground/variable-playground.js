var person = {
	name: 'Jack',
	age: 21
};

function updatePerson (obj) {
	obj.age = 24;
}

console.log('original object -->');
console.log(person);
console.log('\n');

function doNotUpdatePerson (obj) {
	obj = {
		name: 'Jackal',
		age: 224
	};
}

console.log('doNotUpdatePerson(person) -->');
doNotUpdatePerson(person);
console.log(person);
console.log('\n');


updatePerson(person);
console.log('updatePerson(person) ran -->');
console.log(person);
console.log('\n');

function zoiksYo (obj) {
	obj.age = 48;
}

zoiksYo(person);
console.log('zoiksYo -->');
console.log(person);
console.log('\n');


console.log('now for arrays: orig 1st -->');
var array1 = [1, 2, 3, 4];

console.log(array1);
console.log('\n');

function localUpdateOnlyArray (array) {
	// doesn't change array1
	array = [2, 4, 6, 8];
	debugger;
}

console.log('localUpdateOnlyArray(): -->');
localUpdateOnlyArray(array1);
console.log(array1);
console.log('\n');

function updateArray(array) {
	array.push(16);
}

console.log('updateArray(): -->');
updateArray(array1);
console.log(array1);
console.log('\n');

// grades = [15, 88];

// function addGrades (grades) {

// }