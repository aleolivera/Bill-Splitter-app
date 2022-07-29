export const validateExpence= (friend,description,price,quantity) =>{
    const regexPrice= new RegExp('[0-9]');
    let aux=friend.expences.filter(item=>item.description.toLowerCase()===description.toLowerCase());
    if(aux.length>0)
        return "The item '"+description+"' is already in this list";
    else if(price<=0)
        return "Price can not be 0 or less";
    else if(!regexPrice.test(price.toString()))
        return "Not a valid price";
    else if(description==="")
        return "Description can not be empty";
    else if(quantity<=0)
        return "Quantity can not be 0 or less";
    else
        return "";
}

export const calculateTotalSpent=(friend)=>{
    if(friend!=null){
        let total=0;
        friend.expences.forEach((item)=>{
            total+=Number.parseFloat(item.price);
        })
        return total;
    }
    return 0;
}


