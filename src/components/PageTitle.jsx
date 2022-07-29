import React from 'react';



function PageTitle(props){
    return(
        <>
            <h1 className="display-6" style={{textAlign:'center',fontSize:'300%'}}>{props.text}</h1>
        </>
    )
}
export default PageTitle;