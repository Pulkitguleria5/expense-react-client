export default function Student3(props) {
    const {name,age,percentage}=props;
    return (
     <div>
        { percentage >= 88 && (
            <div>
                <span>name : {name}</span>
                
                <span>age : {age}</span>
                <span>percentage : {percentage}</span>
            </div>
        )}
    </div>
    );
}