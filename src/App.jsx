
import {useState,useEffect} from 'react'
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import {db} from './data/db'

function App() {
  // state

const initialCart = () => {
        
     const localStorageCart = localStorage.getItem('cart')
     return localStorageCart ? JSON.parse(localStorageCart) : []

   }

   const [data, ] = useState(db);
   const [cart, setCart] = useState(initialCart);


   const MAX_ITEMS=5
   const MIN_ITEMS=1
  
   // efecto cuando cambia el  carrito compra para el localstore cada vez que cart cambie / carrito sincronizado / localstorage

   useEffect( () => {
    localStorage.setItem('cart', JSON.stringify(cart))
   }, [cart])

   function addToCart(item)
   {
       /// does is mutate  pagina para validar metodos si es mutable o inmutable
       /// verficar si el metodo modifica el estate

       const itemExist = cart.findIndex((guitar)=> guitar.id === item.id)
       {
        if(itemExist>=0)    // encaso de que no cosigue nada el findindex retorna -1
          { 
            // se validad que solo agregue cantidad maxima del item en carrito
            if(cart[itemExist].quantity >= MAX_ITEMS) return
          console.log('ya existe')
          const updateCart =[...cart]   // tomo una copia del state que es inmutable 'cart'
          updateCart[itemExist].quantity++
          setCart[updateCart]
          
        }
        else {console.log('no existe ...agregando..')
          item.quantity = 1
          setCart([...cart,item])   // spread operator copia del carrito ...cart
   }
        } 
       }
  function removeFromCard(id)
  {

    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id)   {

    const updatedCart = cart.map(item => {
     if(item.id === id && item.quantity < MAX_ITEMS) {
      return {
         ...item,
         quantity: item.quantity +1
      }
     }
     return item
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id)   {

    const updatedCart = cart.map(item => {
     if(item.id === id && item.quantity > MIN_ITEMS) {
      return {
         ...item,
         quantity: item.quantity - 1
      }
     }
     return item
    })
    setCart(updatedCart)
  }

  function clearCart()
  {
    setCart([])

  }



  return (
    <>
      <Header 
        cart             = {cart}
        removeFromCart   = {removeFromCard}
        increaseQuantity = {increaseQuantity}
        decreaseQuantity = {decreaseQuantity}
        clearCart        = {clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div  className="row mt-5">
            {data.map((guitar)=>(

                  <Guitar
                   guitar={guitar}
                   key={guitar.id}
                   
                   setCar={setCart}
                   addToCart={addToCart}
                  /> 

            ))}
          
    
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
