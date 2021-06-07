const eredmenyDiv = document.getElementById('eredmeny-div');

function oldalGenerálás(eredmeny){
    console.log(eredmeny);
    
    eredmeny.forEach(function(elem){
        const p = document.createElement('p');
        p.innerText = elem.nev + ': ' + elem.szavazatok;
        eredmenyDiv.appendChild(p);
    });
        
    
}


fetch('/eredmenyek')
    .then(function(válasz){
        válasz.json().then(oldalGenerálás);       
    })
