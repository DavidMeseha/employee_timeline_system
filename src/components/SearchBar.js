import { Search } from "./Icons";

const SearchBar = ({ value, onChange, searchResult }) => {
    return (
        <div style={{ flexGrow: 1, position: 'relative' }}>
            <div className="wrap-search-icon">
                <input type='text' value={value} onChange={onChange} placeholder="Find Customer" />
                <div className="icon"><Search /></div>
            </div>
            <div className='search-list'>
                {searchResult?.map((result) => {
                    return (
                        <div>{result}</div>
                    )
                })}
            </div>
        </div>
    )
};
export default SearchBar;