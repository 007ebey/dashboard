const DropDown = (props) => {

    const [load,onload] = React.useState(null)

    React.useEffect(()=>{
        const selects  = d3.selectAll(`select#${props.id}`).node()
        M.FormSelect.init(selects, {});
    })

    return <div className="" id ={props.id}>
        <select name="" id={props.id} defaultValue={props.defaultValue} onChange ={(e) => { 
            props.change(e)
         }}>
            { props.options.map((x,i) =>{
                return <option key ={i} value={x['value']}
                >{x['label']}</option>
            }) }
        </select>
    </div>
}

const SingleSelect = (props) => {

    React.useEffect(()=>{
         console.log('SIGLE SELECT',props.options)
    })

    return <div className={props.className} id={props.id}>
          {
              props.options.map((x,i)=>{
                 return <div className="" key={i}>
                       <label>
                          <input name="group1" 
                          type="radio" 
                          value={x['value']} 
                          onChange={ e => props.change(e)}
                          />
                          <span>{x['label']}</span>
                       </label>
                  </div>
              })
          }
    </div>
}