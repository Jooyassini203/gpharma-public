import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component' 

export default function MyDataTable({data, columns, actions}) {

  const [search, setSearch] = useState("")
  const [mydata, setMydata] = useState(data)
  const [searchList, setSearchList] = useState(data)
  
  useEffect(() =>{
    console.log("data : ", data);
    setSearchList(data)
  }, [data])

  useEffect(() => {  
    // console.log(Object.values(data));
    const result = mydata.filter( dat => {
      return dat.nom_uilisateur.toLowerCase().match(search.toLowerCase())}
      )
    setSearchList(result) 
  }, [search])

  return <DataTable 
    title="Liste des utilisateurs" 
    columns={columns} data={searchList} 
    pagination
    fixedHeader
    fixedHeaderScrollHeight='80vh'
    highlightOnHover
    subHeader
    subHeaderComponent={<input type='text' className='w-25 form-control form-control-sm' value={search} onChange={(event) => setSearch(event.target.value)} placeholder='Filtre ... '/>}
    actions={actions}
  /> 
}

