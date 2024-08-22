document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const registerFields = document.querySelectorAll('.register-fields');
    const authForm = document.getElementById('authForm');

    let isRegistering = false;

    registerBtn.addEventListener('click', function() {
        if (!isRegistering) {
            isRegistering = true;
            registerFields.forEach(field => {
                field.style.display = 'block';
                setTimeout(() => field.classList.add('show'), 10);
            });
            this.textContent = 'Completar Registro';
            loginBtn.textContent = 'Cancelar';
        } else {
            handleRegister();
        }
    });

    loginBtn.addEventListener('click', function() {
        if (isRegistering) {
            isRegistering = false;
            registerFields.forEach(field => {
                field.classList.remove('show');
                setTimeout(() => field.style.display = 'none', 300);
            });
            this.textContent = 'Iniciar Sesión';
            registerBtn.textContent = 'Registrarse';
        } else {
            handleLogin();
        }
    });

    function handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (email && password) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                console.log('Inicio de sesión exitoso:', { email });
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'hola.html';
            } else {
                alert('Correo electrónico o contraseña incorrectos.');
            }
        } else {
            alert('Por favor, complete todos los campos requeridos.');
        }
    }

    function handleRegister() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const birthdate = document.getElementById('birthdate').value;
        const address = document.getElementById('address').value;

        if (email && password && name && phone && birthdate && address) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            if (users.some(u => u.email === email)) {
                alert('Este correo electrónico ya está registrado.');
                return;
            }

            const newUser = { email, password, name, phone, birthdate, address };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            console.log('Registro exitoso:', newUser);
            alert('Registro exitoso. Por favor, inicie sesión.');
            
            isRegistering = false;
            registerFields.forEach(field => {
                field.classList.remove('show');
                setTimeout(() => field.style.display = 'none', 300);
            });
            loginBtn.textContent = 'Iniciar Sesión';
            registerBtn.textContent = 'Registrarse';
            authForm.reset();
        } else {
            alert('Por favor, complete todos los campos requeridos.');
        }
    }
});