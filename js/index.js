document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

});



        // Manejador del formulario de login
        document.getElementById('login').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Guardar el token en localStorage
                    localStorage.setItem('token', data.token);
                    // Mostrar contenido protegido
                    checkAuth();
                } else {
                    alert('Error: ' + data.message);
                }
            } catch (error) {
                alert('Error de conexión');
            }
        });

        // Función para verificar autenticación
        async function checkAuth() {
            const token = localStorage.getItem('token');
            if (!token) {
                showLoginForm();
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/protected', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    showProtectedContent();
                } else {
                    showLoginForm();
                }
            } catch (error) {
                showLoginForm();
            }
        }

        // Función para verificar autenticación
        async function checkAuth() {
            const token = localStorage.getItem('token');
            if (!token) {
                showLoginForm();
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/index', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    showProtectedContent();
                } else {
                    showLoginForm();
                }
            } catch (error) {
                showLoginForm();
            }
        }

        // Función para verificar autenticación
        async function checkAuth() {
            const token = localStorage.getItem('token');
            if (!token) {
                showLoginForm();
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/categories', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    showProtectedContent();
                } else {
                    showLoginForm();
                }
            } catch (error) {
                showLoginForm();
            }
        }

         // Función para verificar autenticación
         async function checkAuth() {
            const token = localStorage.getItem('token');
            if (!token) {
                showLoginForm();
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/sell', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    showProtectedContent();
                } else {
                    showLoginForm();
                }
            } catch (error) {
                showLoginForm();
            }
        }

        // Función para verificar autenticación
        async function checkAuth() {
            const token = localStorage.getItem('token');
            if (!token) {
                showLoginForm();
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/products', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    showProtectedContent();
                } else {
                    showLoginForm();
                }
            } catch (error) {
                showLoginForm();
            }
        }

        // Función para verificar autenticación
        async function checkAuth() {
            const token = localStorage.getItem('token');
            if (!token) {
                showLoginForm();
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/product-info', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    showProtectedContent();
                } else {
                    showLoginForm();
                }
            } catch (error) {
                showLoginForm();
            }
        }

         // Función para verificar autenticación
         async function checkAuth() {
            const token = localStorage.getItem('token');
            if (!token) {
                showLoginForm();
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/cart', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    showProtectedContent();
                } else {
                    showLoginForm();
                }
            } catch (error) {
                showLoginForm();
            }
        }

         // Función para verificar autenticación
         async function checkAuth() {
            const token = localStorage.getItem('token');
            if (!token) {
                showLoginForm();
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/my-profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    showProtectedContent();
                } else {
                    showLoginForm();
                }
            } catch (error) {
                showLoginForm();
            }
        }

        // Manejador del botón de logout
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('token');
            showLoginForm();
        });

        // Funciones auxiliares para mostrar/ocultar contenido
        function showLoginForm() {
            document.getElementById('loginForm').classList.remove('d-none');
            document.getElementById('protectedContent').classList.add('d-none');
        }

        function showProtectedContent() {
            document.getElementById('loginForm').classList.add('d-none');
            document.getElementById('protectedContent').classList.remove('d-none');
        }

        // Verificar autenticación al cargar la página
        checkAuth();
    




