let ul=document.querySelector('#ul');
let input=document.querySelector('input');
let addBtn=document.getElementById('btn');
let events;

function add(){
   let val=input.value.trim();
    if(val)
    {
        if(addBtn.innerHTML=='add')
        {
            let lt=document.createElement("li");
        
            let task=document.createElement("p");
            let dbtn=document.createElement("button");
            let ebtn=document.createElement("button");
            let btnDiv=document.createElement("div");


            dbtn.innerHTML="delete";
            ebtn.innerHTML="edit";
            task.innerHTML=`TASK :- ${val}`;

            btnDiv.append(ebtn);
            btnDiv.append(dbtn);
       
            lt.append(task);
            lt.append(btnDiv);       

       
            ul.append(lt);   
            input.value="";
        }
        else if(addBtn.innerHTML=='save')
        {
            events.target.parentElement.previousElementSibling.innerHTML=`TASK :- ${val}`;
            input.value="";
            addBtn.innerHTML="add";
            alert('TASK UPDATES..')
        }
      

    }
}

addBtn.addEventListener('click',add);
addBtn.addEventListener('click',add);
ul.addEventListener('click',toOperation);

function toOperation(e)
{
    events=e;
    if(e.target.innerHTML=='delete')
    {
            e.target.parentElement.parentElement.remove();
            
    }
    else if(e.target.innerHTML=='edit')
    {
        let data=e.target.parentElement.previousElementSibling.innerHTML;
        input.value=data.replace("TASK :- "," ");
        addBtn.innerHTML="save";
        
        
        
    }

}