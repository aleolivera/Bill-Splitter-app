export function validatefriendName(friends,newFriend){
    if(friends){
        friends.forEach(item => {
            let f=item.name;
            let nf= newFriend;
            console.log(f+"=="+nf);
            console.log('localeCompare: '+f.localeCompare(nf));
            if(f.localeCompare(nf)==0){
                console.log("Entro!");
                return 0;
            }
        });
    }
    return 1;
}


