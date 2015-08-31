function ajaxCrud(action, dados, success){
    dados.action = action;
	$.ajax({
        url : "http://geracaotec.pe.hu/crud.php",
        dataType : "json",
		method: "POST",
		data : dados,
        success : success
    });	
}

$(document).ready(listarContatos());

function listarContatos(){
    ajaxCrud("listar", 
		{}, 
		function(data){
			var tabela = document.createElement("table");
			tabela.className= "table";
    
			var cabecalho = document.createElement("thead");
			tabela.appendChild(cabecalho);
	   
			var descricao = ["Id", "Nome", "email"];
			var desc = cabecalho.insertRow(-1);
			cabecalho.appendChild(desc);
			for(var t = 0; t < descricao.length; t++){
				var th = document.createElement("th");
				desc.appendChild(th);
				th.innerHTML = descricao[t];
			}
			var corpo = document.createElement("tbody");
			tabela.appendChild(corpo);
			for($i=0; $i < data.length; $i++){
				var linha = corpo.insertRow(-1);
				var celula = linha.insertCell(-1);
				celula.id = data[$i].id;
				celula.innerHTML = data[$i].id;
		  
				var celula = linha.insertCell(-1);
				celula.innerHTML = data[$i].nome;
		  
				var celula = linha.insertCell(-1);
				celula.innerHTML = data[$i].email;
				
				var celula = linha.insertCell(-1);
				celula.innerHTML = "<button type='button' class='btn btn-primary btn-lg' data-toggle='modal' data-target='#myModal' onclick='buscarContato(event)'>"+"Editar"
				+"</button>";

				}
				var container = document.getElementById("conteudo");
				container.innerHTML = "";
				container.appendChild(tabela);
				
		});
}

function inserirContato(){
	var nome = $("#nome").val();
	var email = $("#email").val();
	var contato ={'nome': nome, 'email': email	};

	ajaxCrud("incluir", contato,
		function(data){
			console.log(data.mensagem);
			alert("Contato inserido com sucesso!");
			listarContatos();
		});
			$("#nome").val('');
			$("#email").val('');
}

function alterarContato(){
	var altId = $("#alterarId").val();
	var altNome = $("#alterarNome").val();
	var altEmail = $("#alterarEmail").val();
	var contato = {'id':altId, 'nome': altNome, 'email':altEmail};
	
    ajaxCrud("alterar", contato,
		function(data){
			console.log(data.mensagem);
			alert("Alterado com sucesso!")
			listarContatos();
		});
}

function buscarContato(event){
	var id = event.target.parentNode.parentNode.childNodes[0].id;
	var contato = {'id':id};
    ajaxCrud("buscar", contato,
		function(data){
			html = "Item Carregado<br>";
			html += "<label>Codigo:</label><input class='form-control' id='alterarId' value="+ data.id + " readonly><br>";
			html += "<label for='exampleInputEmail1'>Nome</label><input id='alterarNome' type='text' class='form-control' value= "+data.nome + "><br>";
			html += "<label>Email:</label><input type='text' id='alterarEmail'class='form-control' value= "+data.email + "><br>";
			html += "<hr>";
            $('#alterar').html(html);
		});		
}
