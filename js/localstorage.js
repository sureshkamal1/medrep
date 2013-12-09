function localDatabase(action, name, myArray) {
    if(typeof(localStorage) == 'undefined') {
        //Check if the browser has local storage. 
        return false; 
    }
    else {
        try {
            if(action == 'set') {
                //Check for name and array object
                if(name && myArray) {
                    //Try Storing some data
                    //Stores the item in the database, seperates the array into a string
                    // The array is seperated by ; 
                    localStorage.setItem(name, JSON.stringify(myArray));
                }
                else {
                    //If no name and array is provided return false. 
                    return false;
                }
            }
            else if(action == 'get') {
                //Create an empty array with the name
                var items = localStorage.getItem(name); 
                if(items) {
                    //Split the string into an array. 
                    items = JSON.parse(items);
                    return items; 
                } 
                else {
                    alert("no such item in database"); 
                    return false; 
                }
            }
            else if(action == 'delete') {
                if(name) {
                    var deleted = localStorage.removeItem(name); 
                    if(deleted) {
                        //Successfully Removed
                        return true;
                    }
                    else {
                        return false; 
                    }
                }
                else {
                    return false; 
                }
            }
            else if(action == 'empty') {
                //Empty everything from local storage
                localStorage.clear(); 
            }
            else {
                return false; 
            }
        
        }
        catch(e) {
            if(e == QUOTA_EXCEEDED_ERR) {
                alert('You have exceeded the quota for local storage'); 
            }
            return false; 
        }
    }
}