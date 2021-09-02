
let customFieldsDiv = document.querySelector(".custom_fields");
let mainFieldsDiv = document.querySelector(".custom_fields");

let fields = [];
for(let fieldDiv of customFieldsDiv){
    fields.push(parseField(fieldDiv, 'custom'))
}

for(let fieldDiv of mainFieldsDiv){
  fields.push(parseField(fieldDiv, 'main'))
}

console.log(fields);

function parseField(fieldDiv , mainOrCustom){
    let field = {
        mainOrCustom: mainOrCustom,
        type: null,
        text: null,
        isRequired: null,
    }
    
   field.type = determineInputType(fieldDiv);
   field.text = getText(fieldDiv);
   field.isRequired = isFieldRequired(fieldDiv)

   return field;
}

function determineInputType(fieldDiv){

}

function getText(fieldDiv){

}

function isFieldRequired(fieldDiv){

}



function createObjforCSV(){

}