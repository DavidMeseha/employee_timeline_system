import clickRecognition from "@/Hooks/useClickRecognition"
import { Close } from "@/components/Icons"
import { useEffect, useRef, useState } from "react"
import ServicesSearchBar from "./ServicesSearchBar"

const ServiceSelectScreen = ({ setSelected, services, selected, close }) => {
    const containerRef = useRef()
    const [searchResult, setSearchResult] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        setSearchResult(services)
    }, [])

    const selectService = (service) => {
        let servicesToAdd = [...selected]
        servicesToAdd.push(service)
        setSelected(servicesToAdd)
    }

    const removeService = (index) => {
        let values = [...selected]
        values.splice(index, 1)
        setSelected(values)
    }

    const searchService = (e) => {
        let value = e.target.value
        setSearch(value)
        if (value === '') return setSearchResult(services)
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
                    <ServicesSearchBar value={search} searchService={searchService} selectService={selectService} searchResult={searchResult} />
                    <div className="search-header">
                        <h3>Category Name</h3>
                        <h3>Duration</h3>
                    </div>
                    <div className="service-search-result">
                        {selected.length !== 0 && selected.map((service, index) => {
                            return (
                                <div key={index} className="service-card">
                                    <div className="service-name">
                                        <div className="service-tag">{service.service[0]}</div>
                                        <h4>{service.service}</h4>
                                    </div>
                                    <div className="exit-duration">
                                        <p>{service.duration} min</p>
                                        <div className="icon" onClick={() => removeService(index)}><Close /></div>
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