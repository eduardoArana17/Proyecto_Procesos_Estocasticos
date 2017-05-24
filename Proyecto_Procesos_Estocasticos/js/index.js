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
        createPolicy(sizeState);   
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
            tableHtml += "<td><input type='number' id='matrix" + i +  j + "'' min='0'/> </td>";
        }
        tableHtml += "</tr>";   
    }
    $("#matrix").html(tableHtml);
}  

function createPolicy(size){ 
    console.log(size);    
    $("#policy").html("");   
    var tableHtml = "";   
    tableHtml += "<tr>";                     
    for (var i = 0; i < size; i++) {                    
        tableHtml += "<td><input type='number' id='policy" + i + "'' min='0'/></td>";
    }    
    tableHtml += "</tr>";
    $("#policy").html(tableHtml);
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
        if ($.trim(this.value) == "" || Number(this.value) < 0)
            error++;
    });
    if (error > 0){
        $.msgBox({
            title:"Error.",
            content:"Favor de llenar todos los datos. Hay un total de " + error + " campo(s) vacío(s) o negativos."
        });
    }    
    else{        
        var formObj = $('#formData').serializeObject();                				    
        formObj.size = formObj.stateNumber;
        
        formObj.MatrixArray = [];        
        for ( var i = 0; i < formObj.stateNumber; i++ ) {       
            var validation = 0;
            for ( var j = 0; j < formObj.stateNumber; j++ ) {          
                formObj.MatrixArray.push($("#matrix" + i + j).val());
                validation += Number($("#matrix" + i + j).val());
            }
            if(!(1 - validation >= 0 && 1 - validation < 0.01)){
                $.msgBox({
                    title:"Error.",
                    content:"La matríz no es una matríz markoviana."
                });
                return false;
            }             
        }		  
				
        formObj.CostArray = [];
		for(var i = 0; i < formObj.stateNumber; i++){    
            for(var j = 0; j < formObj.decisionNumber; j++){                                
                formObj.CostArray.push($("#cost"+ (i + 1) + (j + 1)).val());                                              
            }   
        }

        formObj.PolicyArray = [];        
        for(var i = 0; i < formObj.stateNumber; i++){                                
            formObj.PolicyArray.push($("#policy"+ i).val());                                              
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