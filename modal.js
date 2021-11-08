const secaoModal = document.getElementById('modal')
const botaoCadastrar = document.getElementById('cadastrar')
const fechar = document.getElementById('close')
const cancelar = document.getElementById('cancelar')
const editar = document.getElementById('editar')
const confirmar = document.getElementById('confirmar')
const formulario = document.getElementById('formulario-cadastro')
const tBory = document.getElementById('tabela-corpo')

const getLocalStorage = () => JSON.parse(localStorage.getItem("bd_usuario")) ?? []
const setLocalStorage = (bdUsuario) => localStorage.setItem("bd_usuario", JSON.stringify(bdUsuario))

function cancelarModal() {
    secaoModal.classList.remove("active")
}
fechar.addEventListener('click', () => {
    cancelarModal()
})
cancelar.addEventListener('click', () => {
    cancelarModal()
})
const criarUsuario = (usuario) => {
    const bdUsuario = getLocalStorage()
    bdUsuario.push(usuario)
    setLocalStorage(bdUsuario)
}

document.addEventListener("DOMContentLoaded", function() {
    criarRow()
  });

confirmar.addEventListener('click', (event) => {
    event.preventDefault()
    if (formulario.reportValidity()) {
        const usuario = {
            nome: document.getElementById('nome-usuario').value,
            cpf: document.getElementById('cpf-usuario').value,
            telefone: document.getElementById('telefone-usuario').value,
            email: document.getElementById('email-usuario').value
        }
        criarUsuario(usuario)
        criarRow()
        formulario.reportValidity()
        formulario.reset()
        console.log(usuario)
    }

})

const criarRow = () => {
    const usuario = getLocalStorage()
    usuario.forEach(usuario => {
        const row = document.createElement("tr")
    row.innerHTML = `
    <td>${usuario.nome}</td>
    <td>${usuario.cpf}</td>
    <td>${usuario.telefone}</td>
    <td>${usuario.email}</td>
    <td>
        <button id="editar" class="botao-editar">Editar</button>
        <button class="botao-deletar">Deletar</button>
    </td>

    `;
    tBory.appendChild(row)
    })
    
}

botaoCadastrar.addEventListener('click', () => {
    ativarModal()
})
editar.addEventListener('click', () => {
    ativarModal()
})



function ativarModal() {
    secaoModal.classList.add("active")
}


