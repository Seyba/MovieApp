import {useState, useEffect} from "react"

export default function  Form (props){
    const [formData, setFormData] = useState({
        searchterm: ""
    })

    const handleChange = (event) => {
        //use the event object to detect key and value to update
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        props.moviesearch(formData.searchterm)
    }

    return(
        <div>
            <h2>The Form Component</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="searchterm"
                    onChange={handleChange}
                    value={formData.searchterm}
                />
                <input type="submit" value="submit"/>

            </form>
            
        </div>
    )
  };