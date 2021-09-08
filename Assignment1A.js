let battles=require('./battles.json');


var result={
    most_active:{
        attacker_king:'',
        defender_king:'',
        region:'',
        name:''
    },
    attacker_outcome:{
        win:'', // total win
        loss:'' // total loss
    },
    battle_type:[], // unique battle types
    defender_size:{
        average:'',
        min:'',
        max:''
        }
    }
    
    
 

 var Attacker_king={};
 var Defender_king={};
 var Rigon={};
 var battle_type=[];
 var defender_size=[];


 var update_Obj= ( obj ,param , item ) => {
    if(obj[item[param]]>0)obj[item[param]]++;
    else obj[item[param]]=1;

 }


 var mostActive=( obj )=>{
        return Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b)
 }


 var win=0;
 var loss=0;


battles.forEach( (item) =>{
    update_Obj(Attacker_king , 'attacker_king' , item);
    update_Obj(Defender_king , 'defender_king' , item);
    update_Obj(Rigon , 'region' , item);
    if(item.battle_type){
        if(!battle_type.includes(item.battle_type)) battle_type.push(item.battle_type);
    }
    if(item.attacker_outcome=="win") win++;
    if(item.attacker_outcome=="loss") loss++;
    defender_size.push(item.defender_size);

})



result.most_active.attacker_king=mostActive(Attacker_king)
result.most_active.defender_king=mostActive(Defender_king)
result.most_active.region=mostActive(Rigon)
result.most_active.name="All the Names occur only once"
result.attacker_outcome.win=win;
result.attacker_outcome.loss=loss;
result.battle_type=battle_type;
result.defender_size.max=Math.max(...defender_size)
result.defender_size.min=Math.min(...defender_size.filter( (item) => item)) 
result.defender_size.average=(defender_size.reduce( (sum, item) => sum + item , 0) / defender_size.length)



console.log(result)
    







