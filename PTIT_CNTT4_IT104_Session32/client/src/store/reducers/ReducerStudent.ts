const iniitialState ={
    users:[
        {
            id:1,
            name:"tri thang"
        },
        {
            id:2,
            name:"ny tri thang"
        },
        {
            id:3,
            name:"nyc tri thang"
        }
    ]
}


export const reducerStudent = (state = iniitialState, action:any)=>{
    switch (action.type) {
        case "ADD":
            return state;
        case "EDIT":
            return state;
        case "DELETE":
            return state;        
        default:
            return state;
    }
}