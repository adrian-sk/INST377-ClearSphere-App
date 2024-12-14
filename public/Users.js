async function createUser() {
    console.log('Create User')
    await fetch('http://localhost:3000/user', {
        method: 'POST',
        body: JSON.stringify({
            firstName: `${document.getElementById('firstname').value}`,
            userName: `${document.getElementById('username').value}`,
            password: `${document.getElementById('password').value}`,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
    window.location.href = "LoginPage.html";
}

async function getUsers() {
    const users = await fetch('http://localhost:3000/users')
        .then((res) => res.json());

    return users;
}

async function checkUser() {
    const users = await getUsers();
    console.log(users);

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;


    let isUser = false;
    for (let i = 0; i < users.length; i++) {
        if (usernameInput == users[i].username && passwordInput == users[i].user_password) {
            isUser = true;
            break;
        }
    }

    if(isUser){
        window.location.href = "HomePage.html";
    }
    else{
        alert("Incorrect Username or Password");
    }
}
