const App = ()=>{

    const [load,onload] = React.useState(null)
    const dispatch = useDispatch()
    const ndx =  useSelector(x => x.ndx)
    const [brandLabels,setBrands] = React.useState([])
    const [distributerLabels,setDistributers] = React.useState([])
    const brandSelect = useSelector(x => x.brand)
    const brandD = useSelector(x => x.brandD)

    const distributerSelect = useSelector(x => x.distributer)
    const distributerD = useSelector(x => x.distributerD)

    //Cross Filters
    React.useEffect(()=>{
        if(brandSelect){
            brandD.filterAll()
            //console.log(ndx.groupAll().value())
            brandD.filter(brandSelect)
            //console.log(ndx.groupAll().value())
            updateDistributers(distributerD)
        }else if(brandSelect == 0) {
            brandD.filterAll()
            //updateDistributers(distributerD)
        }
    },[brandSelect])

    //Cross Filters
    React.useEffect(()=>{
        if(distributerSelect){
            distributerD.filterAll()
            //console.log(ndx.groupAll().value())
            distributerD.filter(distributerSelect)
            //console.log(ndx.groupAll().value())
            updateBrands(brandD)
        }else if(distributerSelect == 0) {
            distributerD.filterAll()
            updateBrands(brandD)
        }
    },[distributerSelect])

    //Set Data 
    function updateBrands(brandD){
        let bs_ = Object.values(brandD.group().all()).map(x =>{ return { value:x['key'],label:x['key']}; })
        setBrands([{value:'0',label:'All Brands'},...bs_])
    }

    //Set Data 
    function updateDistributers(distributerD){
        console.log(distributerD)
        let bs_ = Object.values(distributerD.group().all()).map(x =>{ return { value:x['key'],label:x['key']}; })
        setDistributers([{value:'0',label:'All Distributers'},...bs_])
    }


    React.useEffect(()=>{
        d3.csv('data.csv',(d) =>{
            d['date'] = `${d['Month Name']+d['Year']}`
            d['Sales Volume - KG'] = +d['Sales Volume - KG']
            return d;
        }).then(x =>{
            console.log('Data',x)
            const ndx = crossfilter(x)
            dispatch(actions.setNDX(ndx))
            // console.log(ndx.dimension(d => d['date']).group().reduceSum(d => d['Sales Volume - KG']).all())
            let brandD =   ndx.dimension(d => d['Brand Name'])
            let distributerD = ndx.dimension(d => d['Distributor Name'])
            dispatch(actions.setBrandD(brandD))
            dispatch(actions.setDistributerD(distributerD))
            updateBrands(brandD)
            updateDistributers(distributerD)
            console.log(distributerLabels)
            //brandD.dispose()
        })

    },[load])

    return <div className="">
        <div className="">
            <DropDown 
                id = "brands"
                defaultValue={0} 
                options={brandLabels}
                change={(e)=>{  
                   dispatch(actions.setBrand(e.target.value))
                }}
            ></DropDown>
        </div>
        <div className="">
            <DropDown 
                id = "distributers"
                defaultValue={0} 
                options={distributerLabels}
                change={(e)=>{  
                   dispatch(actions.setDistributer(e.target.value))
                }}
            ></DropDown>
        </div>
        <div className="">
           <SingleSelect id="category"
              className={"_category"}
              defaultValue = {0}
              change ={(e) => {
              } }
              options={[]}
           ></SingleSelect>
        </div>
        <div className="">
            <LineChart id={"line"} className="line" data={[]}></LineChart>
        </div>
   
     </div>
}


ReactDOM.render(<Provider store={store} ><App></App></Provider>,document.getElementById('render'))




