import React from 'react'

function Loader({isLoading}) { 
    return (
        <div className={`loading-page ${isLoading ? "loading-page_visible" : null}`}></div>
    )
}


export default Loader