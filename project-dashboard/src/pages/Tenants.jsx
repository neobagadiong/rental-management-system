import React, {useState, useEffect} from 'react'
import { Sidebar } from '../components';
import {getAll2} from '../services/databaseaccess'
import ReactDOM from 'react-dom'
import {AiOutlineReload} from 'react-icons/ai'
import {collection, doc, getDocs, addDoc, query, orderBy} from "firebase/firestore"
import {db} from '../services/database'
import './Tenants.css'
const database = db()
var dataArrInit = []//TenantDataDetails;

const Tenants = () => {
  const [dataArr, setDataArr] = useState(dataArrInit)
  useEffect(async () => {
    console.log('use effect triggered')
    if (dataArrInit.length != parseInt(localStorage.getItem("docCount"))) {
      dataArrInit = []
      //dataArr=[];
      const q = query(collection(database, "Tenants"), orderBy("Name"))

      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        console.log('trying')
        dataArrInit.push(doc.data())
        //setDataArr((dataArr) => [ ...dataArr , doc.data()]);
        console.log('data added to array')

      }

      )
      console.log('swapping added to array')
      console.log('newarr is ' + dataArrInit.length)

      //b setDataArr(dataArr =>  [...dataArr,dataArrInit] );
      setDataArr(dataArrInit)

      console.log('dataarr is ' + dataArr.length)

      localStorage.setItem("docCount", dataArrInit.length)
    } else {
      localStorage.setItem("docCount", dataArrInit.length)

    }
  })

  return (


    <div className="App flex">

      <div className="w-72 fixed sidebar
            dark:bg-secondary-dark-bg
            bg-white">
        <Sidebar />
      </div>

      <div id="page" className="dark:bg-main-bg bg-main-bg min-h-screen w-full ">
      <div >
      <h2>Tenants</h2>
      <div class="container">
        <table class="tenants-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Current Tenant</th>
              <th>House Number</th>
              <th>Email Address</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {dataArr.map((val) => (

              <tr key={val.Name}>
                <td>{val[`Name`]}</td>
                <td>{val[`Current Tenant`]}</td>
                <td>{val[`House Number`]}</td>
                <td>{val[`Email Address`]}</td>
                <td>{val[`Phone Number`]}</td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>

  )

}

export default Tenants