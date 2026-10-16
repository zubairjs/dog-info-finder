/*
Write an async function called findDog() that:
Gets the dog ID from the input field.
Validates that an ID is entered (show an error if it is blank).
Uses fetch() to call the API: https://dog-vidi.vercel.app/dogs/{id}
If the response is successful, displays the dog's name, breed, and age in the #dogInfo div using template literals.
If the response is not ok (invalid ID), displays "Dog not found!".
Use try...catch to handle errors and show "Dog not found!" if the API call fails.
Style the dog's age dynamically:
Age ≤ 3 → text color should be green
Age > 3 → text color should be blue
Use an inline onclick attribute on the button in index.html instead of addEventListener to call findDog().
*/
const dogIdInput = document.getElementById('dogId');
const dogInfo = document.getElementById('dogInfo');

async function findDog() {
  const id = dogIdInput.value;
  if (!id.trim()) {
    alert('Please enter a number between 1-10.');
  }
  try {
    const response = await fetch(
      `https://dog-vidi.vercel.app/dogs/${Number(id)}`
    );
    if (response.ok) {
      const { name, breed, age } = await response.json();
      showResult(name, breed, age);
    } else {
      showErrorMessage();
    }
  } catch (error) {
    showErrorMessage();
    console.error('Error fetching data:', error);
  }
}

function showResult(name, breed, age) {
  const color = age <= 3 ? 'green' : 'blue';
  dogInfo.innerHTML = '';
  dogInfo.innerHTML += `
    <div><strong>Name:</strong> ${name}</div>
    <div><strong>Breed:</strong> ${breed}</div>
    <div><strong>Age:</strong> <span class="${color}">${age} years(s)</span></div>
  `;
}

function showErrorMessage() {
  dogInfo.innerHTML = '';
  dogInfo.innerHTML += `
    <div>❌ Dog not found!</div>
  `;
}
