import clickRecognition from "@/Hooks/useClickRecognition";
import Card from "@/components/Card";
import CustomerCard from "@/components/Card";
import { Search } from "@/components/Icons";
import { useRef, useState } from "react";

const ServicesSearchBar = ({ value, searchService, selectService, searchResult }) => {
    const searchRef = useRef()
    const [isActive, setIsActive] = useState()

    const searchChangeHandle = (e) => {
        searchService(e)
        setIsActive(true)
    }

    clickRecognition(() => setIsActive(false), searchRef)

    return (
        <>
            <div ref={searchRef} style={{ flexGrow: 1, position: 'relative' }}>
                <div className="wrap-search-icon">
                    <input type='text' value={value} onChange={searchChangeHandle} onClick={searchChangeHandle} placeholder="Find service" />
                    <div className="icon"><Search /></div>
                </div>
                {isActive && <div className='search-list'>
                    {searchResult?.map((result, key) => {
                        return (
                            <div key={key} className="search-item" onClick={() => selectService(result)}>
                                <Card head={result.service} sup={result.duration + ' minutes'} />
                            </div>
                        )
                    })}
                    {searchResult.length === 0 && <div className="search-item" style={{ padding: 80, width: 'fit-content', color: 'gray', margin: 'auto' }}>
                        <p>No Service Found</p>
                    </div>}
                </div>}
            </div>
        </>
    )
};
export default ServicesSearchBar;