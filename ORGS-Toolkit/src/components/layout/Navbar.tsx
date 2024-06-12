import { Link, useLocation } from 'react-router-dom';

function Navbar(): JSX.Element {

    function IsRoute(path?: string): string {
        const location = useLocation();

        if (location.pathname === path) {
            return ' border-b-2 border-black-500 font-bold'
        } else {
            return ''
        }
    }

    return (
        <nav className="flex wrap justify-center bg-blue-800 pt-10 pb-10">
            <ul className="flex list-none flex-wrap justify-center items-center w-10/12">
                <li className="mr-10 mb-1 pr-5 pl-5 text-center">
                    <Link to='/' className={`text-white hover:text-red-300${IsRoute('/')}`}>Home</Link>
                </li>

                <li className="mr-10 mb-1 pr-5 pl-5 text-center">
                    <Link to='/linearprogramming' className={`text-white hover:text-red-300${IsRoute('/linearprogramming')}`}>Linear programming</Link>
                </li>

                <li className="mr-10 mb-1 pr-5 pl-5 text-center">
                    <Link to='/simplex' className={`text-white hover:text-red-300${IsRoute('/simplex')}`}>SIMPLEX</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;