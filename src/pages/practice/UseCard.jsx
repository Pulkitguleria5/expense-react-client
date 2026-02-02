export default function UseCard(props) {
    const { name, age, location, isPremium } = props;
    return (
        <div>
            <h1>name : {name}</h1>
            <h2>age : {age}</h2>
            <h3>location : {location}</h3>
            {isPremium ? <h2>VIP Member</h2> : <h2>Standard Member</h2>}
        </div>
    );
}