$(document).ready(function() {
    console.log("document ready");    

    $("#cmbMatrixSize").on("change", function(){
        $("#cmbMatrixSize").attr("disabled", true);        
        $("#divData").show();
        createMatrix($("#cmbMatrixSize").val());
        createPolicy($("#cmbMatrixSize").val());
		showStates($("#cmbMatrixSize").val());
    });

    $("#btnState").on("click", function(){        
        showStates($("#stateNumber").val());        
    });
});

function createMatrix(size){ 
    $("#matrix").html("");   
    var tableHtml = ""; 
    for (var i = 0; i < size; i++) { 
        tableHtml += "<tr>";                   
        for (var j = 0; j < size; j++) {                    
            tableHtml += "<td><input type='number' id='" + i + "matrix" + j + "' name='" + i + "matrix" + j + "' value=''/> </td>";
        }
        tableHtml += "</tr>";   
    }
    $("#matrix").html(tableHtml);
}     

function createPolicy(size){
    $("#policy").html(""); 
    var tableHtml = ""; 
    tableHtml += "<tr>";
    for (var i = 0; i < size; i++) {                             
        tableHtml += "<td><input type='number' id='policy" + i + "' name='policy" + i + "' value=''/> </td>";                
    }
    tableHtml += "</tr>";   
    $("#policy").html(tableHtml);  
}

function showStates(size){
    if(Number(size) <= 0){
        $.msgBox({
            title:"Error.",
            content:"Favor de ingresar un valor mayor a 0."
        });
        return false;
    }

    $("#states").show(); 
    $("#states").html(""); 
    var stateHtml = ""; 
    for (var i = 0; i < size; i++) {
        stateHtml += "<label>Costo del Estado " + (i + 1) + ":</label><input type='number'" +
                    "class='form-control' id='stateNumber" + (i + 1) + "' name='stateNumber" + (i + 1) + "' min='0' />";
    }
    $("#states").html(stateHtml);  
}

function clean(){
    $("#divData").hide();
    $("#cmbMatrixSize").val("");  
    $("#cmbMatrixSize").attr("disabled", false);  
    $("#states").html(""); 
    $("#stateNumber").val(""); 
}

function save(){
    var error = 0;
    $('#formData :input:not(:button)').each(function ()
    {
        console.log(this);
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
        formObj.size = $("#cmbMatrixSize").val();
		
		var dim =  formObj.size * formObj.size;
		
		formObj.MatrixArray = [];
		var count = 0;
		for(i = 0; i < formObj.size; i++){
			
			for(j = 0; j < formObj.size; j++){
				
				console.log("#"+i+"matrix"+j);
				console.log($("#"+i+"matrix"+j).val());
				formObj.MatrixArray[count] = $("#"+i+"matrix"+j).val();
				count++;
				
			}
			// count++;
		}		
		
		count = 0;
		formObj.PolicyArray = [];		
		for(k = 0; k < formObj.size; k++){
				
				console.log("#policy"+k);
				formObj.PolicyArray[count] = $("#policy"+k).val();
				count++;
				
		}
		
		count = 0;
		formObj.StateArray = [];		
		for(l = 0; l < formObj.size; l++){
				
				console.log("#stateNumber"+(count+1));
				formObj.StateArray[count] = $("#stateNumber"+(count+1)).val();
				count++;
				
		}
		
		
        localStorage['formObj'] = JSON.stringify(formObj);

        $.msgBox({
            title:"Éxito.",
            content:"La información se ha guardado correctamente.",
            type:"info"
        });
        console.log(JSON.parse(localStorage['formObj']));
		
		JSON.parse(localStorage['formObj']);
		
    }    
}