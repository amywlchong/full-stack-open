const Persons = ({persons, deletePersonOf}) =>
    <div>
        {persons.map(person => {
            return (
                <div key={person.id}>
                    <span>{person.name} {person.number} </span>
                    <button onClick={deletePersonOf(person.id, person.name)}>delete</button>
                </div>
            )
        })}
    </div>

export default Persons
