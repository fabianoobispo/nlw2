//procurar o botao 
document.querySelector("#add-time")
//funcao clicar no botao 
.addEventListener('click', cloneField)


//executar um afuncao 
function cloneField() {
    //duplicaro os campo sque campos ?
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)

   
    //pegar os campos - Novo horário
    const fields = newFieldContainer.querySelectorAll('input')
    
    //limpar cada campo novo - Novo horário
    fields.forEach(function(field) {
        field.value = ""
    })

       document.querySelector('#schedule-items').appendChild(newFieldContainer)
}