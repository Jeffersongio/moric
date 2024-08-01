document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registroForm = document.getElementById('registroForm');
    const alterarForm = document.getElementById('alterarForm');
    const registrosDiv = document.getElementById('registros');

    function checkLogin() {
        const user = localStorage.getItem('user');
        if (!user) {
            window.location.href = 'login.html';
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Autenticação básica - Substitua isso com uma autenticação real
            if (username === 'admin' && password === 'admin') {
                localStorage.setItem('user', 'admin');
                window.location.href = 'registrar.html';
            } else if (username === 'user' && password === 'user') {
                localStorage.setItem('user', 'user');
                window.location.href = 'registrar.html';
            } else {
                alert('Usuário ou senha inválidos');
            }
        });
    }

    if (registroForm) {
        checkLogin();
        registroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const timestamp = new Date().toLocaleString();
            let registros = JSON.parse(localStorage.getItem('registros')) || [];
            registros.push({ nome, timestamp });
            localStorage.setItem('registros', JSON.stringify(registros));
            document.getElementById('resultado').innerText = `Ponto registrado para ${nome} às ${timestamp}`;
        });
    }

    if (alterarForm) {
        checkLogin();
        alterarForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const novoPonto = new Date(document.getElementById('novoPonto').value).toLocaleString();
            let registros = JSON.parse(localStorage.getItem('registros')) || [];
            let registroAlterado = false;
            
            registros = registros.map(registro => {
                if (registro.nome === nome) {
                    registro.timestamp = novoPonto;
                    registroAlterado = true;
                }
                return registro;
            });

            if (registroAlterado) {
                localStorage.setItem('registros', JSON.stringify(registros));
                document.getElementById('resultado').innerText = `Ponto de ${nome} alterado para ${novoPonto}`;
            } else {
                document.getElementById('resultado').innerText = `Nenhum registro encontrado para ${nome}`;
            }
        });
    }

    if (registrosDiv) {
        checkLogin();
        const registros = JSON.parse(localStorage.getItem('registros')) || [];
        if (registros.length > 0) {
            registrosDiv.innerHTML = `<ul>${registros.map(registro => `<li>${registro.nome} - ${registro.timestamp}</li>`).join('')}</ul>`;
        } else {
            registrosDiv.innerText = 'Nenhum registro encontrado';
        }
    }
});
