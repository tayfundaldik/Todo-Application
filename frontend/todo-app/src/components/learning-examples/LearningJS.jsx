const person={
    name: 'Guts',
    address:{
        line1: 'Venice Beach',
        city : 'California',
        country: 'USA'
    },
    profiles: ['twitter','instagram','linkedin'],
    printProfile: () => {
        person.profiles.map(profile => console.log(profile)
        )
        
    }
}

export default function LearningJS(){
    return(<>
        <div>{person.name} Learning JS</div>
        <div>in {person.address.line1}</div>
        <div>{person.profiles[0]}</div>
        <div>{person.printProfile()}</div>
        </>
    )
}