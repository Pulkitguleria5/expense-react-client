export default function Eng(props) {

    const array = props.employees.filter(employee => employee.department === 'Engineering');

    return (

        <div>

            <h1>Engineering Department</h1>

            {array.map((employee, index) => (

                <div key={index}>
                    { employee.active && (  <span>Name: {employee.name}</span> )}
                </div>  
            ))}

        </div>  
    );
}
