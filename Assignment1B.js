
const doOperation=( data ) => {
    // console.log(data.items);
    
    data.items.forEach( ( item ) => {
        var licenseName='';
        
        if( item.license ) {
            licenseName=item.license.name;
        }
    
       var object ={
        name: item.name,
        full_name: item.full_name,
        private: item.private,
        owner:{
            login:item.owner.login ,
            name:'',
            followersCount:'',
            followingCount:'',

        },
        licenseName:licenseName,
        score:item.score,
        numberofBranches:''

    }
    const fetchName = fetch(item.owner.url)
    .then(res => res.json())
    .then((out) => {

         object.owner.name=out.name;
 
    })
    .catch(err => { throw err });



    const fetchFollowersCount= fetch( item.owner.followers_url)
    .then(res => res.json())
    .then((out) => {

        object.owner.followersCount=out.length;

    })
    .catch(err => { throw err });



    const fetchFollowingCount= fetch( item.owner.following_url.split("{")[0])
    .then(res => res.json())
    .then((out) => {

        object.owner.followingCount=out.length;

    })
    .catch(err => { throw err });


    const fetchNumberOfBranches= fetch( item.branches_url.split("{")[0])
    .then(res => res.json())
    .then((out) => {

        object.numberofBranches=out.length;

    })
    .catch(err => { throw err });



    Promise.all([ fetchName , fetchFollowersCount , fetchFollowingCount , fetchNumberOfBranches]  )
    .then(() => {
         console.log(object)
    
    })

    })
    // console.log( item.owner.followers_url)
       


}
function fetchApi(){
    let domain=document.getElementById("domain").value;
    let url="https://api.github.com/search/repositories?q="+domain;
    fetch( url )
    .then(res => res.json())
    .then((out) => {

       doOperation(out);

    })
    .catch(err => { throw err });

}

// doOperation(obj);


