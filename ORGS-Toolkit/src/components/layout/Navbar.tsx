import { Link, useLocation } from 'react-router-dom';

import LogoGithub from './../../images/GitHub-Logo.svg';

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
        <nav className="flex justify-between items-center bg-blue-800 py-8">

            <div className="w-1/12"></div> {/* Usado para empurrar o conteúdo para o centro e direita */}

            <ul className="flex list-none flex-wrap justify-center items-center gap-x-10 px-5 w-10/12">
                <li>
                    <Link to='/' className={`text-white hover:text-red-300${IsRoute('/')}`}>Home</Link>
                </li>
                <li>
                    <Link to='/linearprogramming' className={`text-white hover:text-red-300${IsRoute('/linearprogramming')}`}>Linear programming</Link>
                </li>
                <li>
                    <Link to='/simplex' className={`text-white hover:text-red-300${IsRoute('/simplex')}`}>SIMPLEX</Link>
                </li>
                <li>
                    <Link to='/developedby' className={`text-white hover:text-red-300${IsRoute('/developedby')}`}>Developed By</Link>
                </li>
            </ul>

            <ul className="flex list-none justify-end items-center w-1/12">
                <Link to='https://github.com/Laerte64/ORGS-Toolkit' target="_blank">
                    <img src={LogoGithub} alt="Logo" className="w-20" />
                </Link>

            </ul>

        </nav>
    )
}

export default Navbar;