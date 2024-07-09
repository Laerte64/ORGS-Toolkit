import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { US, ES, BR, DE } from 'country-flag-icons/react/3x2'

import i18n from 'i18next';
import Select, { components, OptionsType, SingleValue } from 'react-select';
import { useTranslation } from 'react-i18next';

import LogoGithub from './../../images/GitHub-Logo.svg';

interface LanguageOption {
    value: string; // Language value: pt, es, en...
    label: string; // Language name
    icon: React.ComponentType;  // Icon component type
}

function Navbar(): JSX.Element {

    const options: OptionsType<LanguageOption> = [
        { value: 'en', label: 'EN', icon: US },
        { value: 'pt', label: 'PT', icon: BR },
        { value: 'es', label: 'ES', icon: ES },
        { value: 'de', label: 'DE', icon: DE },
    ];

    const { t } = useTranslation("global");
    const [selectedLanguage, setSelectedLanguage] = useState<SingleValue<LanguageOption>>(options[0]);
    const { Option, SingleValue: DefaultSingleValue } = components;

    const IconOption = (props: components.OptionProps<LanguageOption, false>) => (
        <Option {...props}>
            <props.data.icon className="w-6 h-6 mr-2" />
            {props.data.label}
        </Option>
    );

    const IconSingleValue = (props: components.SingleValueProps<LanguageOption, false>) => (
        <DefaultSingleValue {...props}>
            <props.data.icon className="w-6 h-6 mr-2" />

        </DefaultSingleValue>
    );

    async function handleChange(selectedOption: SingleValue<LanguageOption>): Promise<void> {
        if (selectedOption) {
            await i18n.changeLanguage(selectedOption.value);
            setSelectedLanguage(selectedOption);
        }
    }

    async function setBrowserLanguage(): Promise<void> {
        const userLanguage: string = navigator.language.slice(0, 2);
        const newSelectedLanguage = options.find(option => option.value === userLanguage) || options[0];
        setSelectedLanguage(newSelectedLanguage);
        await i18n.changeLanguage(newSelectedLanguage.value);
    }

    useEffect(() => {
        setBrowserLanguage();
    }, []);

    function isRoute(path?: string): string {
        const location = useLocation();
        return location.pathname === path ? ' border-b-2 border-black-500 font-bold' : '';
    }

    return (
        <nav className="flex justify-between items-center bg-blue-800 py-8 px-5">
            
            <div className="flex-grow w-3/12">LOGO</div>

            <ul className="flex list-none justify-center items-center gap-x-5 w-6/12">
                <li>
                    <Link to='/' className={`text-white hover:text-red-300${isRoute('/')}`}>{t("navbar.home")}</Link>
                </li>
                <li>
                    <Link to='/linearprogramming' className={`text-white hover:text-red-300${isRoute('/linearprogramming')}`}>{t("navbar.linear_programming")}</Link>
                </li>
                <li>
                    <Link to='/simplex' className={`text-white hover:text-red-300${isRoute('/simplex')}`}>{t("navbar.simplex")}</Link>
                </li>
                <li>
                    <Link to='/developedby' className={`text-white hover:text-red-300${isRoute('/developedby')}`}>{t("navbar.developed_by")}</Link>
                </li>
            </ul>

            <div className="flex justify-end items-center space-x-4 w-3/12">
                <Link to='https://github.com/Laerte64/ORGS-Toolkit' target="_blank">
                    <img src={LogoGithub} alt="GitHub Logo" className="w-24" />
                </Link>
                <div className='w-24'>
                    <Select<LanguageOption, false>
                        value={selectedLanguage}
                        onChange={handleChange}
                        options={options}
                        components={{ Option: IconOption, SingleValue: IconSingleValue }}
                        className="text-black"
                        classNamePrefix="select"
                    />
                </div>


            </div>

            <div className="flex-grow"></div>
        </nav>

    );
}

export default Navbar;
