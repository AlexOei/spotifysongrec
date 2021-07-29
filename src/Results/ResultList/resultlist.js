import React from 'react'

const ResultList = ({query, setQuery, category, title, img, setCounter, counters}) => {

    const handleClick = (id) => {
        setQuery(query + id +',')
        setCounter(counters + 1)
    }

    if (category){
        console.log(category.items)
        return(<div>
            <li data-testid="title">{title}</li>
            <ul>
                {category.items.map(category => (
                    <li key={category.id}>{category.name} <img src={eval(img)} alt = "song/track photo"/>  <button data-testid="button" onClick = {()=>handleClick(category.id)}>Add</button></li>

                ))}
            </ul>

        </div>)
    }

    return(<div data-testid="test" />
    )

}

export default ResultList;