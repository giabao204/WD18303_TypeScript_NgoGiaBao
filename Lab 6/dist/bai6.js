"use strict";
function showUserInfo(user) {
    const userInfoElement = document.getElementById('user-info');
    if (userInfoElement) {
        userInfoElement.innerHTML = `
            <h2>Thông tin người dùng</h2>
            <p>Tên: ${user.name}</p>
            <p>Tuổi: ${user.age}</p>
        `;
    }
}
const userForm = document.getElementById('user-form');
if (userForm) {
    userForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(userForm);
        const name = formData.get('name');
        const age = parseInt(formData.get('age'));
        const user = {
            name,
            age,
        };
        showUserInfo(user);
    });
}
