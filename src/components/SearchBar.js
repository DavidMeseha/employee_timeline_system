import { useRef } from "react";
import CustomerCard from "./CustomerCard";
import { Search } from "./Icons";
import clickRecognition from "@/Hooks/useClickRecognition";

const SearchBar = ({ value, onChange, setCustomer, searchResult, setSearchResult }) => {
    const containerRef = useRef()

    const usingSearch = (e) => {
        onChange(e)
    }

    const selectCustomer = (result) => {
        setCustomer(result)
        setSearchResult([])
    }

    clickRecognition(() => setSearchResult([]), containerRef)

    return (
        <div ref={containerRef} style={{ flexGrow: 1, position: 'relative' }}>
            <div className="wrap-search-icon">
                <input type='text' value={value} onChange={onChange} onClick={usingSearch} placeholder="Find Customer" />
                <div className="icon"><Search /></div>
            </div>
            {searchResult.length !== 0 && <div className='search-list'>
                {searchResult?.map((result, key) => {
                    return (
                        <div key={key} className="search-item" onClick={() => selectCustomer(result)}>
                            <CustomerCard name={result.name} phone={result.phone} />
                        </div>
                    )
                })}
            </div>}
        </div>
    )
};
export default SearchBar;