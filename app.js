document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const funcao = document.getElementById('funcao').value;

  
  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, email, senha, funcao }),
    });

    const data = await res.json();
    const responseDiv = document.getElementById('response');
    
    if (res.status === 201) {
      responseDiv.innerHTML = `<p style="color: green;">Usuario registrado com sucesso!</p>`;
    } else {
      responseDiv.innerHTML = `<p style="color: red;">Erro: ${data.error}</p>`;
    }
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
  }
});
