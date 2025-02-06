/*
Lista de tarefa - ToDo
*/

// Função para adicionar uma nova tarefa
function AddTarefa() {
  let valorDoInput = document.querySelector("input").value; // Pega o texto digitado no input

  if (valorDoInput.trim() === "") { // Impede adicionar tarefas vazias
    alert("Por favor, digite uma tarefa!");
    return;
  }

  let li = document.createElement("li"); // Cria um novo elemento <li> (item da lista)
  li.innerHTML = valorDoInput + '<span onclick="deletarTarefa(this)">❌</span>'; // Adiciona o texto da tarefa e o botão de "excluir"

  document.querySelector("ul").appendChild(li); // Adiciona o <li> à lista <ul>

  SalvarTarefasNoLocalStorage(); // Salva a lista atualizada no localStorage

  document.querySelector("input").value = ""; // Limpa o campo de input após adicionar a tarefa
}

// Função para deletar uma tarefa
function deletarTarefa(span) {
  span.parentElement.remove(); // Remove o <li> pai do <span> (botão de excluir)
  SalvarTarefasNoLocalStorage(); // Atualiza o localStorage após a exclusão
}

// Função para salvar todas as tarefas no localStorage
function SalvarTarefasNoLocalStorage() {
  let tarefas = []; // Cria um array vazio para armazenar as tarefas

  // Pega todos os elementos <li> da lista
  let listaDeLi = document.querySelectorAll("ul li");

  // Itera sobre cada <li> e adiciona o texto ao array de tarefas
  listaDeLi.forEach(function (li) {
    tarefas.push(li.textContent.replace("❌", "").trim()); // Remove o "x" e espaços extras
  });

  // Salva o array de tarefas como uma string JSON no localStorage
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Função para carregar as tarefas do localStorage quando a página carrega
function CarregarTarefasDoLocalStorage() {
  let tarefasSalvas = localStorage.getItem("tarefas"); // Pega as tarefas salvas do localStorage

  if (tarefasSalvas) { // Se houver tarefas salvas...
    let tarefas = JSON.parse(tarefasSalvas); // Converte a string JSON de volta para um array

    // Itera sobre o array de tarefas e adiciona cada uma à lista
    tarefas.forEach(function (tarefa) {
      let li = document.createElement("li");
      li.innerHTML = tarefa + '<span onclick="deletarTarefa(this)">❌</span>';
      document.querySelector("ul").appendChild(li);
    });
  }
}

// Chama a função para carregar as tarefas quando a página é carregada
CarregarTarefasDoLocalStorage();