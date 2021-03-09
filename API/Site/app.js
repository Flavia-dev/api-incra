var allRadios = document.getElementsByName('re');
var booRadio;
var x = 0;
for(x = 0; x < allRadios.length; x++){
    allRadios[x].onclick = function(){

        if(booRadio == this){
            this.checked = false;
            booRadio = null;
        } booRadio = this; 
    };
}

const local = () => {
    var im = document.getElementById('imovel');
    var nome = document.getElementById('nome');
    var id = document.getElementById('search');
    id = id.value;

    if(!nome.checked){
            if(id == ''){
                window.alert('Por favor, informe o código do imóvel.')
            }
            else{
                
                if(id.match(/^[0-9]+$/)){
                    window.open(`http://localhost:8080/get_imovel/${id}`) 
                }
                else{
                    window.alert('Apenas números são permitidos!')
                }
            }
        }

    else if(!im.checked){
        if(nome.checked){
            if(id == ''){
                window.alert('Por favor, informe o nome.')
            }
            else{
                if(id.match(/[A-Z]/gi)){
                    window.open(`http://localhost:8080/get_nome/${id}`)
                }
                else{
                    window.alert('Apenas caracteres alfanuméricos são permitidos!')
                }
            }
        }
    }
}

