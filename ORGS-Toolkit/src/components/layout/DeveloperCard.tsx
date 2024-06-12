import { Link } from 'react-router-dom';

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
        <div className='text-center shadow-lg rounded p-5 bg-gray-100 w-96 h-fit'>

            <img src={photo} alt={name} className="mx-auto mt-5 w-48 h-48 rounded-lg" />

            <h1 className='text-4xl mt-2'>{name}</h1>

            {description &&
                <p className='text-md mt-2 text-gray-800'>{description}</p>}

            <p className='text-2xl py-5 font-bold'>{developmentArea}</p>

            <div className='pt-4'>
                {github && (
                    <div>
                        <Link to={github} className=''>
                            GitHub
                        </Link>
                    </div>

                )}
                {linkedIn && (
                    <div>
                        <Link to={linkedIn} className=''>
                            LinkedIn
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DeveloperCard;