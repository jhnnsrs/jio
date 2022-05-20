import { Link } from 'react-router-dom'

export const Home: React.FC<{}> = (props) => {
  return (
    <div className='h-screen w-full'>
      This feels like home{' '}
      <nav>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/setup'>Setup</Link>
      </nav>
    </div>
  )
}
