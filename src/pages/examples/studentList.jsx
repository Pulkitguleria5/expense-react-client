import Student2 from "./student2";

export default function StudentList(props) {
   const filteredStudents = props.students.filter(student => student.percentage >= 33);

    return (
        <div>
            <h1>Student List Component</h1>
            {filteredStudents.map((student, index) => (
                
                    <Student2
                        key={index}
                        name={student.name}
                        age={student.age}
                        percentage={student.percentage}
                    />
                
            ))}
        </div>
    );
}


