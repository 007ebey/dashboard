const useDispatch = ReactRedux.useDispatch
const useSelector = ReactRedux.useSelector


const store =  Redux.createStore(mapReducer)
const Provider = ReactRedux.Provider

const initState = { render:false,policy:0,category:0}

function mapReducer(state = initState,action){

    console.log('ACTIONS',action.type)

    switch(action.type){
       case 'NDX':   
          return  { ...state,ndx:action.payload} 
       case 'BRAND':
          return  { ...state,brand:action.payload} 
       case 'BRANDNDX':
          return { ...state,brandD:action.payload } 
       case 'DISTRIBUTER':
          return { ...state,distributer:action.payload } 
       case 'DISTRIBUTERNDX':
          return { ...state,distributerD:action.payload }
    }
 
    return {...state}
}

const actions = {
    setNDX:(x) => {  return { type:'NDX',payload:x } },
    setBrand:(x) => { return { type:'BRAND',payload:x} },
    setBrandD:(x) => { return { type:'BRANDNDX',payload:x} },
    setDistributer:(x) => {return { type:'DISTRIBUTER',payload:x } },
    setDistributerD:(x) => {return { type:'DISTRIBUTERNDX',payload:x } },
}
