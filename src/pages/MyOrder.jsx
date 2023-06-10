import { AiFillDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { useContext } from "react"
import { ShoppingContext } from "../context"

export function MyOrder() {
    const {
        cartProducts,
        setCartProducts,
    } = useContext(ShoppingContext)

    const groupedProducts = [] 

    cartProducts.map(product => {
        const existingProduct = groupedProducts.find(pro => pro.title === product.title)

        if (existingProduct) {
            existingProduct.quantity += 1
        } else {
            groupedProducts.push({ ...product, quantity: 1 })
        }
    })

    const lessProduct = (product) => {
        let newProducts = [...cartProducts]
        let index = newProducts.findIndex(pro => pro.title === product.title)
        newProducts.splice(index, 1)
        setCartProducts(newProducts)
    }

    const plusProduct = (product) => {
        let newProducts = [...cartProducts]
        let index = newProducts.findIndex(pro => pro.title === product.title)
        let newProduct = newProducts.find(pro => pro.title === product.title)
        newProducts.splice(index, 0, newProduct)
        setCartProducts(newProducts)
    }

    const deleteProduct = (product) => {
        const newProducts = cartProducts.filter(pro => pro.title !== product.title)
        setCartProducts(newProducts)
    }

    return (
        <>
            <h1>MyOrder</h1>
            {groupedProducts.length === 0 ? "SIN PRODUCTOS" :
                <div className="flex flex-wrap justify-center gap-3">
                    <nav className=" w-9/12">
                        <ul className="grid grid-cols-[120px_1fr_1fr_1fr_40px] place-items-center w-full font-bold">
                            <li></li>
                            <li>PRODUCTO</li>
                            <li>UNIDADES</li>
                            <li>PRECIO</li>
                        </ul>
                    </nav>
                    {groupedProducts.map(product => (
                        <article 
                            key={product.id} 
                            className="grid grid-cols-[120px_1fr_1fr_1fr_40px] place-content-center place-items-center gap-2 w-9/12 h-24 max-w-3xl rounded-xl overflow-hidden bg-indigo-100"
                        >
                            <img 
                                src={product.images[0]} 
                                alt={product.title} 
                                className="w-full h-full object-cover"
                            />

                            <h2 className="flex-grow"> {product.title} </h2>
                            <p className="flex items-center gap-4 flex-grow"> 
                                <AiOutlineMinus 
                                    onClick={() => lessProduct(product)}
                                    className="text-2xl transition-colors duration-300 hover:text-red-600 cursor-pointer"
                                />
                                {product.quantity} 
                                <AiOutlinePlus 
                                    onClick={() => plusProduct(product)}
                                    className="text-2xl transition-colors duration-300 hover:text-green-600 cursor-pointer"
                                />
                            </p>
                            <p className="flex-grow"> ${product.price * product.quantity} </p>
                            <AiFillDelete 
                                onClick={() => deleteProduct(product)}
                                className="flex-grow text-3xl transition-colors duration-300 hover:text-red-600 cursor-pointer"
                            />
                        </article>
                    ))}
                </div>
            }
        </>
    )
}