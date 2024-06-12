import DeveloperCard from "../layout/DeveloperCard";

function DevelopedBy(): JSX.Element {

    return (
        <div className="w-full">
            <h1 className="text-6xl p-10">Development Team:</h1>

            <div className='flex justify-between mx-10 mb-10 flex-wrap'>

                <DeveloperCard
                    name="Cayo"

                    photo="https://media.istockphoto.com/id/1415960925/pt/foto/a-close-up-shot-of-a-hand-and-a-sheet-of-paper-on-which-a-student-takes-notes-during-a-lecture.jpg?s=2048x2048&w=is&k=20&c=iqBFvwxfz2E-xUo3RA290chS3u0pUZze7pHSn3FquCI="

                    developmentArea="backend"
                    description="dasdasdasdasdasdasdasdasxasdasd asdas dasd "
                    github=" "
                    linkedIn=" "
                />

                <DeveloperCard
                    name="Daniel Mahl Gregorini"

                    photo="https://media.istockphoto.com/id/1415960925/pt/foto/a-close-up-shot-of-a-hand-and-a-sheet-of-paper-on-which-a-student-takes-notes-during-a-lecture.jpg?s=2048x2048&w=is&k=20&c=iqBFvwxfz2E-xUo3RA290chS3u0pUZze7pHSn3FquCI="

                    developmentArea="frontend"
                    description="Full-stack developer at Video Som Auto Center and student at UTFPR"
                    github=" "
                    linkedIn=" "
                />

                <DeveloperCard
                    name="Laerte"

                    photo="https://media.istockphoto.com/id/1415960925/pt/foto/a-close-up-shot-of-a-hand-and-a-sheet-of-paper-on-which-a-student-takes-notes-during-a-lecture.jpg?s=2048x2048&w=is&k=20&c=iqBFvwxfz2E-xUo3RA290chS3u0pUZze7pHSn3FquCI="

                    developmentArea="back-end"
                    description="fsdg sd fsd fsdf sdf gergh fdgfdgasdf fdf dasd"
                    github=" "
                    linkedIn=" "
                />
            </div>
        </div>
    );
}

export default DevelopedBy;