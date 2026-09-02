import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import RoleCTA from '../components/RoleCTA'
import FeaturedProducts from '../components/FeaturedProducts'
import HowItWorks from '../components/HowItWorks'
import About from '../components/About'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <RoleCTA />
        <FeaturedProducts />
        <HowItWorks />
        <About />
      </main>
      <Footer />
    </>
  )
}

export default Home