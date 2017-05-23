$(document).ready(function() {
    console.log("document ready");    

    $("#btnState").on("click", function(){        
        var sizeState = $("#stateNumber").val();
        var sizeDecision = $("#decisionNumber").val();

        if(Number(sizeState) <= 1 || Number(sizeDecision) <= 0){
            $.msgBox({
                title:"Error.",
                content:"Deben existir por lo menos 2 estados y 1 decisión."
            });
            return false;
        }

        $("#divData").show();
        showCosts(sizeState, sizeDecision);   
        createMatrix(sizeState);        
    });
});

function showCosts(sizeState, sizeDecision){    
    $("#costs").show(); 
    $("#costs").html(""); 
    var stateHtml = ""; 
    for (var i = 0; i < sizeState; i++) {
        for(var j = 0; j < sizeDecision; j++){
            stateHtml += "<label>Costo" + (i + 1) + (j + 1) + ":</label><input type='number'" +
                    "class='form-control' id='cost" + (i + 1) + (j + 1) + "' min='0' />";
        }        
    }
    $("#costs").html(stateHtml);  
}

function createMatrix(size){ 
    console.log(size);    
    $("#matrix").html("");   
    var tableHtml = ""; 
    for (var i = 0; i < size; i++) { 
        tableHtml += "<tr>";                   
        for (var j = 0; j < size; j++) {                    
            tableHtml += "<td><input type='number' id='matrix" + i +  j + "'' value=''/> </td>";
        }
        tableHtml += "</tr>";   
    }
    $("#matrix").html(tableHtml);
}     

function clean(){
    $("#divData").hide();    
    $("#costs").html("");
    $("#matrix").html(""); 
    $("#stateNumber").val(""); 
    $("#decisionNumber").val(""); 
}

function save(){
    var error = 0;
    $('#formData :input:not(:button)').each(function ()
    {        
        if ($.trim(this.value) == "")
            error++;
    });
    if (error > 0){
        $.msgBox({
            title:"Error.",
            content:"Favor de llenar todos los datos. Hay un total de " + error + " campo(s) vacío(s)."
        });
    }
    else{
        var formObj = $('#formData').serializeObject();        
        formObj.size = formObj.stateNumber;
		console.log(formObj);		
		        
		formObj.MatrixArray = [];	        
		for(var i = 0; i < formObj.size; i++){			
			for(var j = 0; j < formObj.size; j++){								
				formObj.MatrixArray.push($("#matrix"+ i + j).val());							                
			}			
		}						
		        
		formObj.CostArray = [];		
		for(var i = 0; i < formObj.stateNumber; i++){            
            for(var j = 0; j < formObj.decisionNumber; j++){    
                console.log("#cost" + (i + 1) + (j + 1));
                console.log($("#cost"+ (i + 1) + (j + 1)).val());                          
                formObj.CostArray.push($("#cost"+ (i + 1) + (j + 1)).val());                                  
            }           
        }   
				
        localStorage['formObj'] = JSON.stringify(formObj);

        $.msgBox({
            title:"Éxito.",
            content:"La información se ha guardado correctamente.",
            type:"info"
        });
        console.log(JSON.parse(localStorage['formObj']));				
    }    
}