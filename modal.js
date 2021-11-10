const secaoModal = document.getElementById('modal')
const confirmar = document.getElementById('confirmar')
const formulario = document.getElementById('formulario-cadastro')
const tBory = document.getElementById('tabela-corpo')

const getLocalStorage = () => JSON.parse(localStorage.getItem("bd_usuario")) ?? []
const setLocalStorage = (bdUsuario) => localStorage.setItem("bd_usuario", JSON.stringify(bdUsuario))

const criarUsuario = (usuario) => {
    const bdUsuario = getLocalStorage()
    bdUsuario.push(usuario)
    setLocalStorage(bdUsuario)
}

const atualizarUsuario = (index, usuario) => {
    const bdUsuario = getLocalStorage()
    bdUsuario[index] = usuario
    setLocalStorage(bdUsuario)
}

const deletarUsuario = (index) => {
    const bdUsuario = getLocalStorage()
    bdUsuario.splice(index, 1)
    setLocalStorage(bdUsuario)
}

document.addEventListener("DOMContentLoaded", function () {
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
        formulario.reportValidity()
        const index = document.getElementById('nome-usuario').dataset.index
        if (index == 'new') {
            criarUsuario(usuario)
            atualizarTabela()
            cancelarModal()
        } else {
            atualizarUsuario(index, usuario)
            atualizarTabela()
            cancelarModal()
        }
    }

})

const criarRow = () => {
    const usuario = getLocalStorage()
    usuario.forEach((usuario, index) => {
        const row = document.createElement("tr")
        row.innerHTML = `
    <td>${usuario.nome}</td>
    <td>${usuario.cpf}</td>
    <td>${usuario.telefone}</td>
    <td>${usuario.email}</td>
    <td>
        <button id="editar-${index}" class="botao-editar">Editar</button>
        <button id="deletar-${index}" class="botao-deletar">Deletar</button>
    </td>

    `;
        tBory.appendChild(row)

    })

}

const limpaTabela = () => {
    const rows = document.querySelectorAll("#tabela-corpo tr")
    rows.forEach(row => row.parentNode.removeChild(row))
}

const atualizarTabela = () =>{
    limpaTabela()
    criarRow()
}


function cancelarModal() {
    formulario.reset()
    secaoModal.classList.remove("active")
}

function ativarModal() {
    secaoModal.classList.add("active")
}
function preencherCampos(usuario) {
    document.getElementById('nome-usuario').value = usuario.nome
    document.getElementById('cpf-usuario').value = usuario.cpf
    document.getElementById('telefone-usuario').value = usuario.telefone
    document.getElementById('email-usuario').value = usuario.email
    document.getElementById('nome-usuario').dataset.index = usuario.index
    ativarModal()
}

function editarUsuario(index) {
    const usuario = getLocalStorage()[index]
    usuario.index = index
    preencherCampos(usuario)

}

function editarDeletar(event) {
    if (event.target.type == 'submit') {
        const [action, index] = event.target.id.split('-')
        // console.log(action, index)
        if (action == "editar") {
            editarUsuario(index)
        } else {
            deletarUsuario(index)
            atualizarTabela()
        }

    }
}

document.getElementById('close').addEventListener('click', () => {
    cancelarModal()
})
document.getElementById('cancelar').addEventListener('click', () => {
    cancelarModal()
})

document.getElementById('cadastrar').addEventListener('click', () => {
    ativarModal()
})

document.getElementById('tabela-corpo').addEventListener('click', editarDeletar)




