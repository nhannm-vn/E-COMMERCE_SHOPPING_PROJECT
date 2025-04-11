import Footer from '../../components/Footer'
import Header from '../../components/Header'

interface Props {
  children?: React.ReactNode
}

function MainLayout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout
