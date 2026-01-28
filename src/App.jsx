import Student from "./pages/examples/student"
import Student1 from "./pages/examples/student1"
import Student2 from "./pages/examples/student2"
import StudentList from "./pages/examples/studentList"
import UseCard from "./pages/practice/UseCard"
import Eng from "./pages/practice/Eng"
import StudentList1 from "./pages/examples/sudentList1"

function App() {
  const students = [
    { name: "Alice", age: 20, percentage: 85 },
    { name: "Bob", age: 22, percentage: 90 },
    { name: "Charlie", age: 21, percentage: 88 },
  ];
  const employees = [
    { id: 1, name: "David", department: "Engineering", active: true },
    { id: 2, name: "Eva", department: "HR", active: false },
    { id: 3, name: "Frank", department: "Engineering", active: true },
  ];
  
  return (
    <>
      <h1>Expense Tracker App</h1>
      <Student />
      <Student1 name = "Student1 Page" />         {/* props pass from parent to child */}
      {/* <Student2 name = "Pulkit" age={20} percentage={90} /> */}
      <hr/>
      <StudentList students={students} />
        <hr/>
      <UseCard name="John Doe" age={30} location="New York" isPremium={true} />
      <UseCard name="John Smith" age={30} location="York" isPremium={true} />
      <UseCard name="John Cena" age={30} location="New" isPremium={true} />

      <hr />

      <Eng employees={employees} />

      <hr />
      
      <StudentList1 />



    </>
  )
}

export default App
