// Bài 6
interface User {
    name: string;
    age: number;
}

function showUserInfo(user: User) {
    const userInfoElement = document.getElementById('user-info');
    if (userInfoElement) {
        userInfoElement.innerHTML = `
            <h2>Thông tin người dùng</h2>
            <p>Tên: ${user.name}</p>
            <p>Tuổi: ${user.age}</p>
        `;
    }
}

const userForm = document.getElementById('user-form') as HTMLFormElement;
if (userForm) {
    userForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(userForm);
        const name = formData.get('name') as string;
        const age = parseInt(formData.get('age') as string);

        const user: User = {
            name,
            age,
        };

        showUserInfo(user);
    });
}
