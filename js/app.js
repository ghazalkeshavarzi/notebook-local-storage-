/************************************ VARIABLES *******************************/
const doList=document.querySelector('#result');



/********************************** EVENTLISTENERS*****************************/
eventListeners();
function eventListeners() {
    //submission
    document.querySelector('#btn1').addEventListener('click',addNote);

    //delete note
    document.querySelector('#dolist').addEventListener('click',deleteNote);

    //show datas
    document.addEventListener('DOMContentLoaded',loadeDataFromLS);


}




/************************************* FUNCTIONS **************************************/

//------------------------- ADD NOTE TO THE LIST--------------------------

function addNote(e) {
    e.preventDefault();
    const note=document.querySelector('#notebook1').value;

    // create <li> tag
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(note));
    

    //add the li to the do list
    doList.appendChild(li);

   // create remove buttton
   const remove=document.createElement("a");
   remove.textContent='X';
   remove.classList='remove_btn';
   li.appendChild(remove);

   addDataToLS(note);

}


//------------------------ DELETE NOTE FROM LIST --------------------------

function deleteNote(e) {
    if (e.target.classList.contains('remove_btn')) {
        e.target.parentElement.remove();
    }
    removeDataFromLS(e.target.parentElement.textContent);
}


//-------------------------GET DATA FROM LOCAL STORAGE------------------------

function getDataFromLS() {
    let datas;
    let getdata=localStorage.getItem('datas');
    if (getdata===null) {
        datas=[];
    } else {
        datas=JSON.parse(getdata);
    }
    return datas;
}


//--------------------- ADD DATA TO LOCAL STORAGE ------------------------------

function addDataToLS(note) {
    let datas=getDataFromLS();
    datas.push(note);
    localStorage.setItem('datas',JSON.stringify(datas));
}

//--------------------- LOAD DATAS FROM LOCAL STORAGE ------------------------------

function loadeDataFromLS() {
    let datas=getDataFromLS();
    datas.forEach(function(datas) {
        // create <li> tag
        const li=document.createElement('li');
        li.appendChild(document.createTextNode(datas));
        

        //add the li to the do list
        doList.appendChild(li);

        // create remove buttton
        const remove=document.createElement("a");
        remove.textContent='X';
        remove.classList='remove_btn';
        li.appendChild(remove);

    });
    
}

//--------------------- DELETE DATAS FROM LOCAL STORAGE ------------------------------
 function removeDataFromLS(content) {
     let selectedText=content.substring(0,content.length-1)
     let arrayData=getDataFromLS();
     arrayData.forEach((item,index)=> {
         if (selectedText===item) {
             arrayData.splice(index,1);
         }
     });
     localStorage.setItem('datas',JSON.stringify(arrayData));
 }