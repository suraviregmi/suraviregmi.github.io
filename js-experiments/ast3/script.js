//final output array
var output = [];

var people = [{
        id: 1,
        name: "Aegon Targaryen",
        children: [
          
          {
          id: 2,
          name: "Jaehaerys Targaryen",
          children: [{
            id: 4,
            name: "Daenerys Targaryen"
          },{
            id: 5,
            name: "Rhaegar Targaryen",
            children: [{
              id: 6,
              name: "Aegon Targaryen"
            }]
          }] 
        },
        {
          id: 3,
          name: "Rhaelle Targaryen"
        }],
      }];

//to get number of people 
function normalize(people){
	for(var i=0 ; i<people.length ; i++){
		//main function to recursively iterate
		recursive(people[i]);
		sort(output);
	}
}

function recursive(people){
	//for no children
	if(people.children === undefined){
			var list = {
	                  id : people.id,
	                  name :people.name,
	                  children:[]
	                }
	    //console.log("list",list)
	    //add new list to final array
		output.push(list);
		}
		//for children
	else  {
			var noOfChildren =[];
			//looping thorught no of children
			for(var j = 0; j<people.children.length; j++){
				noOfChildren.push(people.children[j].id)
				recursive(people.children[j])
			}
			
			var list = {
	                  id : people.id,
	                  name :people.name,
	                  children:noOfChildren
	                }
	    //console.log("list",list);
		output.push(list);		
		}	
}

//bubble sort
function sort(toSort){
	console.log("to sort",toSort.length)
	for( var k = 0; k< toSort.length-1; k++){
		for(var j = 0; j<toSort.length-k-1; j++){
			 if (output[j].id > output[j+1].id){
			 	var temp =output[j].id;
			 	output[j].id = output[j+1].id;
			 	output[j+1].id = temp;
			 }   
		}
	}
}
normalize(people);
console.log(output);