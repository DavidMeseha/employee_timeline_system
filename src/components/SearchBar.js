import { useEffect, useRef, useState } from "react";
import { Search } from "./Icons";
import clickRecognition from "@/Hooks/useClickRecognition";
import Card from "./Card";

const SearchBar = ({ value, setSelected, customers }) => {
    const containerRef = useRef()
    const [searchResult, setSearchResult] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        if (searchValue.length < 1) setSearchResult(customers)
    }, [searchValue, isActive])

    const searchChangeHandle = (e) => {
        let value = e.target.value
        setIsActive(true)
        setSearchValue(value)
        if (value === '') return setSearchResult(customers)
        let values = []
        customers.forEach(customer => {
            if (customer.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0) values.push(customer)
        });

        setSearchResult(values)
    }

    const selectCustomer = (result) => {
        setSelected(result)
        setIsActive(false)
    }

    clickRecognition(() => setIsActive(false), containerRef)

    return (
        <div ref={containerRef} style={{ flexGrow: 1, position: 'relative' }}>
            <div className="wrap-search-icon">
                <input type='text' value={searchValue} onChange={searchChangeHandle} onClick={searchChangeHandle} placeholder="Find Customer" />
                <div className="icon"><Search /></div>
            </div>

            {isActive && <div className='search-list'>
                {searchResult.length !== 0 ?
                    searchResult?.map((result, key) => {
                        return (
                            <div key={key} className="search-item" onClick={() => selectCustomer(result)}>
                                <Card head={result.name} sup={result.phone} />
                            </div>
                        )
                    })
                    : <div className="search-item" style={{ padding: 80, width: 'fit-content', color: 'gray', margin: 'auto' }}><p>No Customer Found</p></div>}
            </div>}
        </div >
    )
};
export default SearchBar;