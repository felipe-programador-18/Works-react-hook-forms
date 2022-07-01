import React, {useState} from 'react'
import './App.css';
import { useFetching } from './hoock/useFetch';

const url ='http://localhost:3000/products'

function App() {

  const [name, setName]= useState('')
  const [price, setPrice] = useState('')
  const {data:items ,HttpConf, loading, error,} = useFetching(url)

  const Handsumit = async (e) => {
    e.preventDefault()
    
    const product = {
      name, price
    };
    HttpConf(product,"POST")
    setName('')
    setPrice('')
  }

  const handDelete = (id) => {
    HttpConf(id,"DELETE")
  }



  
  return (
    <div className="App">

      {loading && <p>carregando page ......</p> }


      <h1>Practice and testing form with react-hoock form!!</h1>

      <form onSubmit={Handsumit}>
       <label>
        Name:
        <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />
       </label>
        
        <label>
          Price:
          <input type='text' name='price' value={price} onChange={(e) => setPrice(e.target.value)}  />
        </label>

         <input type='submit' name='' value='send date!!'  />
      </form>
        
        <ul>
         {items && items.map((products) => (<li key={products.id}> {products.name} - testing price {products.price}
          <button onClick={() => handDelete(products.id)} >Removed Product!!</button>
          </li>)  )}
        </ul>

       
    </div> 
  );
}

export default App;
