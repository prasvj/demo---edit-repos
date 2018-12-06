
function getRepos(){ // get data from url
$.ajax({
    url: "https://api.github.com/repositories?since=862",
    type: "GET",

    contentType: 'application/json; charset=utf-8',
    success: function(resultData) {   
          for(let c=0; c < resultData.length; c++){
            addRepository(resultData[c]);
          }
    },
    error : function(jqXHR, textStatus, errorThrown) {
    },
    timeout: 120000,
});
}

getRepos();

function addRepository(json){ //creates a dv for repo info
    
var parentBox = document.getElementById('parentBox');
var repoDiv = document.createElement('div');

parentBox.append(repoDiv);

var name = document.createElement('h4');
name.innerText = json.name;
name.classList.add('repoName');
repoDiv.append(name);

var repoDesc = document.createElement('p');
repoDesc.innerText = json.description;
repoDesc.classList.add('repoDesc');
repoDiv.append(repoDesc);

var repoOwner = document.createElement('p');
repoOwner.innerText = json.owner.login;
repoOwner.classList.add('repoOwnerName');
repoDiv.append(repoOwner);

var repoOwnerType = document.createElement('p');
repoOwnerType.innerText = json.owner.type;
repoOwnerType.classList.add('repoOwnerType');
repoDiv.append(repoOwnerType);

var editBtn = document.createElement('button');
editBtn.innerText = 'Edit';
editBtn.classList.add('editBtn');
editBtn.setAttribute('onclick', 'editRepo("' + json.id +'")');
repoDiv.append(editBtn);

var saveBtn = document.createElement('button');
saveBtn.innerText = 'Save';
saveBtn.style.display = 'none';
saveBtn.classList.add('saveBtn');
saveBtn.setAttribute('onclick', 'saveRepo("' + json.id +'")');
repoDiv.append(saveBtn);

var cancelBtn = document.createElement('button');
cancelBtn.innerText = 'Cancel';
cancelBtn.style.display = 'none';
cancelBtn.classList.add('cancelBtn');
cancelBtn.setAttribute('onclick', 'cancelEdit("' + json.id +'")');
repoDiv.append(cancelBtn);

repoDiv.classList.add('repoBox');
repoDiv.classList.add('col-md-4');
repoDiv.setAttribute('id', json.id);
}

function editRepo(id){ //edits the fields
  var repoName = document.getElementById(id).querySelector('h4');
  var textArray = document.getElementById(id).querySelectorAll('p');
  var displayBtn = document.getElementById(id).querySelector('.saveBtn');
  displayBtn.style.display = 'inline-block';

  var displayBtn = document.getElementById(id).querySelector('.cancelBtn');
  displayBtn.style.display = 'inline-block';

  var displayBtn = document.getElementById(id).querySelector('.editBtn');
  displayBtn.style.display = 'none';

 for(let i=0; i < textArray.length; i++){
  var inputText = document.createElement('input');
  inputText.type = 'text';  
  inputText.classList.add(textArray[i].className);
  inputText.placeholder = textArray[i].innerText;
  textArray[i].parentNode.replaceChild(inputText, textArray[i]);
 }

 var inputText = document.createElement('input');
  inputText.type = 'text'; 
  inputText.classList.add(repoName.className); 
  inputText.placeholder = repoName.innerText;
  repoName.parentNode.replaceChild(inputText, repoName);
}

function saveRepo(id){ //saves changes
  var displayBtn = document.getElementById(id).querySelector('.saveBtn');
  displayBtn.style.display = 'none';

  var displayBtn = document.getElementById(id).querySelector('.cancelBtn');
  displayBtn.style.display = 'none';

  var displayBtn = document.getElementById(id).querySelector('.editBtn');
  displayBtn.style.display = 'block';

  var savedInfo = document.getElementById('savedData');
  var parent = document.getElementById(id);
  var json = {};
var inputValues = document.getElementById(id).querySelectorAll('input');
 
inputValues.forEach(function(input) 
    {
        var key = input.className;
        json[key] = input.value;
    });

    $.post("http://www.prasannaj.com/details", { // dummy url
      json_string: JSON.stringify(json)
  });
     
    for(let i=0; i < inputValues.length; i++){ 
      if(inputValues[i].className == 'repoName'){
        var repoThings = document.createElement('h4');
      }
      else
      var repoThings = document.createElement('p');
     
      repoThings.classList.add(inputValues[i].className);
      repoThings.innerText = inputValues[i].value;
      parent.replaceChild(repoThings, inputValues[i]);
     // savedInfo.append(repoThings);
     }
  
     savedInfo.style.display = 'block';

}

function cancelEdit(id){ //cancels changes 
  var parent = document.getElementById(id);
  var inputValues = document.getElementById(id).querySelectorAll('input');

  for(let i=0; i < inputValues.length; i++){ 
    if(inputValues[i].className == 'repoName'){
      var repoThings = document.createElement('h4');
    }
    else
    var repoThings = document.createElement('p');
   
    repoThings.classList.add(inputValues[i].className);
    repoThings.innerText = inputValues[i].placeholder;
    parent.replaceChild(repoThings, inputValues[i]);
   }

   var displayBtn = document.getElementById(id).querySelector('.saveBtn');
   displayBtn.style.display = 'none';
 
   var displayBtn = document.getElementById(id).querySelector('.cancelBtn');
   displayBtn.style.display = 'none';
 
   var displayBtn = document.getElementById(id).querySelector('.editBtn');
   displayBtn.style.display = 'block';
}