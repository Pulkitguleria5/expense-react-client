import { useState } from 'react';

function StudentList1() {
    const [visible, setVisible] = useState(true);
    const [buttonText, setButtonText] = useState('Hide Students');
    const toggleStudents = () => {
        setVisible(p => !p);
        setButtonText(p => p === 'Hide Students' ? 'Show Students' : 'Hide Students');
    };
    const students = [
        { name: "Alice", age: 20, percentage: 85 },
        { name: "Bob", age: 22, percentage: 90 },
        { name: "Charlie", age: 21, percentage: 88 },
    ];

    return (
        <div>
            <button onClick={toggleStudents}>
                {buttonText} Students
            </button>

            {visible && (
                <ul>
                    {students.map((student, index) => (
                        <li key={index}>
                            <strong>{student.name}</strong> - Age: {student.age}, Percentage: {student.percentage}%
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default StudentList1;