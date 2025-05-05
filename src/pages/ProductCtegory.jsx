import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/greencart_assets/greencart_assets/assets'
import ProductCard from '../components/ProductCard'

const ProductCtegory = () => {
    const {products} = useAppContext()
    const {category} = useParams()

    const searchCategory = categories.find((item)=>item.path.toLowerCase() === category)

    const FilteredProducts = products.filter((product)=>product.category.toLowerCase() === category)
  return (
       <div className='mt-16'>
        { searchCategory &&
             (
                <div className='flex flex-col items-end w-max'>
                    <p className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</p>
                    <div className=' w-16 h-0.5 bg-primary rounded-full'></div>
                </div>
            )
        }

        {FilteredProducts.length>0 ?(
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6'>
                {FilteredProducts.map((product)=>(
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>
        ):
        (
            <div className='flex items-center justify-center h-[60vh]'>
                 <p className='text-2xl font-medium text-primary'>No Products Found In this Category</p>
            </div>
        )
        }
       </div>
  )
}

export default ProductCtegory