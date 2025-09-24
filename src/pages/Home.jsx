import Mainbar from '../components/Mainbar'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'


const Home = () => {
  return (
    <div className='mt-10'>
        <Mainbar/>
        <Categories/>
        <BestSeller/>
        <BottomBanner/>
        <NewsLetter/>
        <div className='bg-[".../src/assets/add_address_image.svg"]'>

        </div>
    </div>
  )
}

export default Home