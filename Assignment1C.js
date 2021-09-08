let url = 'http://api.nobelprize.org/v1/prize.json';
let solution=(data)=>{
    let winners=[];
    data.filter( (item)=> 
    item.year>=2000 &&
     item.year<=2019 && 
     item.category=="chemistry"
     ).forEach( (item)=>{ 
         item.laureates.forEach( (item)=>{ 
             winners.push(item.firstname+" "+item.surname)
         })
     });
    console.log(winners)

}
fetch(url)
.then(res => res.json())
.then((out) => {
 
  solution(out.prizes);
})
.catch(err => { throw err });

