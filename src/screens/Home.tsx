import { Link } from 'react-router-dom'

export const Home: React.FC<{}> = (props) => {
  return (
    <div className='bg-green-200 h-full w-full'>
      This feels like home{' '}
      <nav>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/setup'>About</Link>
      </nav>
    </div>
  )
}
