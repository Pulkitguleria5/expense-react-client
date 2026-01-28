export default function UseCard(props) {
    const { name,age,location,isPremium } = props;
    return (
        <div>
            <h1>name : {name}</h1>
            {isPremium ? <h2>VIP Member</h2> : <h2>Standard Member</h2>}

        </div>
    );
}