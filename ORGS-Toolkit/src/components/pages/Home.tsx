import { useTranslation } from 'react-i18next';

function Home(): JSX.Element {
    const { t } = useTranslation("global");

    return (
        <div className='text-center w-full'>
             <p>{t("home.title")}</p>
        </div>
    );
}

export default Home;