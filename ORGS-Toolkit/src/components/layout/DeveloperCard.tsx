import { Link } from 'react-router-dom';

import LogoGithub from './../../images/GitHub-Logo.svg';
import Linkedin from './../../images/Linkedin-Logo.svg'

interface DeveloperCardProps {
    name: string;
    photo: string;
    developmentArea: string;
    description?: string;
    github?: string;
    linkedIn?: string;
}

function DeveloperCard({ name, photo, developmentArea, description, github, linkedIn }: DeveloperCardProps): JSX.Element {

    return (
        <div className='text-center shadow-md hover:shadow-xl rounded p-5 bg-gray-100 w-96 h-fit mt-5'>

            <img src={photo} alt={name} className="mx-auto mt-4 w-48 h-48 rounded-lg"/>

            <h1 className='text-4xl mt-2'>{name}</h1>

            {description &&
                <p className='text-md mt-2 text-gray-800'>{description}</p>}

            <p className='text-2xl py-5 font-bold'>{developmentArea}</p>

            <div className='pt-4 justify-center flex-wrap'>
                {github && (
                    <div className='w-full'>
                        <div>
                        <Link to={github} className='flex '>
                            <img src={LogoGithub} alt="Logo" width={32} />
                            <p>Github</p>
                        </Link>

                        </div>
                        
                        
                    </div>

                )}
                {linkedIn && (
                    <div className='w-full'>
                        
                        <Link to={linkedIn} className='flex'>
                            <img src={Linkedin} alt="Logo" width={16} className='mx-2'/>
                            LinkedIn
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DeveloperCard;