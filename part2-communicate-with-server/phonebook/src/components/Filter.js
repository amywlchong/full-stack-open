const Filter = ({searchName, handleSearchChange, persons}) => {

    const filteredPersons = searchName
    ? persons.filter(person =>
        person.name.toLowerCase().includes(searchName.toLowerCase()))
    : [];

    return (
        <div>
        Enter name to search: <input value={searchName} onChange={handleSearchChange} />
        {filteredPersons.map(each => <p key={each.id}>{each.name} {each.number}</p>)}
        </div>
    )
}
export default Filter
