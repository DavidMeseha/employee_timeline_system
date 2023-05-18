import clickRecognition from "../Hooks/useClickRecognition"
import { Search } from "../components/Icons"
import { useRef, useState } from "react"

const ServiceSelectScreen = ({ setSelected, services, selected, close }) => {
    const containerRef = useRef()
    const [searchResult, setSearchResult] = useState([])
    const [search, setSearch] = useState('')

    const selectService = (service) => {
        let servicesToAdd = [...selected]
        servicesToAdd.push(service)
        setSelected(servicesToAdd)
        close()
    }

    const searchService = (e) => {
        let value = e.target.value
        setSearch(value)
        if (value === '') return setSearchResult([])
        let values = []
        services.forEach(service => {
            if (service.service.toLowerCase().indexOf(value.toLowerCase()) >= 0) values.push(service)
        });
        setSearchResult(values)
    }

    clickRecognition(close, containerRef)
    return (
        <>
            <div className="service-select-wrap">
                <div ref={containerRef} className="service-select-container">
                    <div style={{ flexGrow: 1, position: 'relative' }}>
                        <div className="wrap-search-icon">
                            <input type='text' value={search} onChange={searchService} placeholder="Find service" />
                            <div className="icon"><Search /></div>
                        </div>
                    </div>
                    <div className="search-header">
                        <h3>Category Name</h3>
                        <h3>Duration</h3>
                    </div>
                    <div className="service-search-result">
                        {searchResult.length === 0 && search === ''?
                            (services.map((service, index) => {
                                return (
                                    <div key={index} onClick={() => selectService(service)} className="service-card">
                                        <div className="service-name">
                                            <div className="service-tag">{service.service[0]}</div>
                                            <h4>{service.service}</h4>
                                        </div>
                                        <div className="exit-duration">
                                            <p>{service.duration} min</p>
                                        </div>
                                    </div>
                                )
                            })) : (search !== '' && searchResult.length !== 0 ?
                                searchResult.map((service, index) => {
                                    return (
                                        <div key={index} onClick={() => selectService(service)} className="service-card">
                                            <div className="service-name">
                                                <div className="service-tag">{service.service[0]}</div>
                                                <h4>{service.service}</h4>
                                            </div>
                                            <div className="exit-duration">
                                                <p>{service.duration} min</p>

                                            </div>
                                        </div>
                                    )
                                })
                                : <div className="search-item" style={{ padding: 80, width: 'fit-content', color: 'gray', margin: 'auto' }}>
                                    <p>No Service Found</p>
                                </div>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceSelectScreen