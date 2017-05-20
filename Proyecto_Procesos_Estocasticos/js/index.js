$(document).ready(function() {
    console.log("document ready");    

    $("#cmbMatrixSize").on("change", function(){
        $("#cmbMatrixSize").attr("disabled", true);        
        $("#divData").show();
        createMatrix($("#cmbMatrixSize").val());
        createPolicy($("#cmbMatrixSize").val());
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
            tableHtml += "<td><input type='number' name='matrix[" + i + "][" + j + "]' value=''/> </td>";
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
        tableHtml += "<td><input type='number' name='policy[" + i + "]' value=''/> </td>";                
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
                    "class='form-control' name='stateNumber[" + (i + 1) + "]' min='0' />";
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
        localStorage['formObj'] = JSON.stringify(formObj);

        $.msgBox({
            title:"Éxito.",
            content:"La información se ha guardado correctamente.",
            type:"info"
        });
        console.log(JSON.parse(localStorage['formObj']));
    }    
}