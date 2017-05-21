$(document).ready(function() {
	
	var json = JSON.parse(localStorage['formObj']);  //Aqui tenemos las variables de inicio

	console.log(json);
	
	
	
	if(json){	
		
		
		Inicio(json);
	}
	
});


function Inicio(row){
	
	console.log(row);
	
	//Variable a Investigar
	var c = 0;
	var Expression = algebra.Expression;
	var Fraction = algebra.Fraction;		
	var Equation = algebra.Equation;
	var dimension = row.size;	
	console.log(row.size);
	var variables = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y'];
	
	var expr = new Expression(variables[0]); //variable que crea literales
	
	var ultexpr = expr; // La primera y la última siempre serán iguales
	
	var varelement = 1;
	
	var countarray = 0;
	
	var equationarray = [];
	console.log(row.MatrixArray.length);
	for(i=0; i < dimension; i++){
		
		for (j=0; j < row.MatrixArray.length; j++){			
			expr.multiply(Number(row.MatrixArray[j]));
			console.log(Number(row.MatrixArray[j]));
			console.log(row.MatrixArray[j]);
			countarray++;
			if(countarray < row.MatrixArray.length){
				
				expr.add(variables[varelement]);
				varelement++;
				
			}			
		}
				
		console.log(expr.toString());	
		expr.add(c);
		expr.subtract(ultexpr);
		
		equationarray[i] = expr.toString();
		
		
		expr = new Expression(variables[0]);
		ultexpr = new Expression(variables[i++]);
		c = 0;//investigar esta variable	
		
	}
	
	
}