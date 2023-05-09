import clickRecognition from "@/Hooks/useClickRecognition"
import { Search } from "@/components/Icons"
import { useEffect, useRef, useState } from "react"

const ServiceSelectScreen = ({ setService, services, close }) => {
    const containerRef = useRef()
    const [searchResult, setSearchResult] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        setSearchResult(_.cloneDeep(services))
    }, [])

    const SelectService = (service) => {
        setService(service)
        close()
    }

    const searchService = (e) => {
        let value = e.target.value
        setSearch(value)
        if (value === '' || !value) return setSearchResult([])
        let values = []
        services.forEach(service => {
            console.log(service)
            if (service.service.toLowerCase().indexOf(value.toLowerCase()) >= 0) values.push(service)
        });
        setSearchResult(values)
    }

    clickRecognition(close, containerRef)
    return (
        <>
            <div className="service-select-wrap">
                <div ref={containerRef} className="service-select-container">
                    <div className="wrap-search-icon">
                        <input type='text' onChange={searchService} onClick={searchService} value={search} placeholder="Find Service" />
                        <div className="icon"><Search /></div>
                    </div>
                    <div className="search-header">
                        <h3>Category Name</h3>
                        <h3>Duration</h3>
                    </div>
                    <div className="service-search-result">
                        {searchResult.length !== 0 && searchResult.map((service, key) => {
                            return (
                                <div key={key} onClick={() => SelectService(service)} className="service-card">
                                    <div className="service-name">
                                        <div className="service-tag">{service.service[0]}</div>
                                        <h3>{service.service}</h3>
                                    </div>
                                    <div>
                                        <p>{service.duration} min</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceSelectScreen