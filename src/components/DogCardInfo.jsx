import React from 'react';


export default ({imgUrl,pictureId}) => {
    return (
    <div className='card dog-card'>
        <div className="dog-image">
            <figure className='image' style={{ backgroundImage: `url(${imgUrl}` }}>
                <img src={imgUrl} alt={`A nice dog`} className='is-sr-only'/>
            </figure>
        </div>
        <div className="card-content">
            <div className="content">
                <strong>Picture Id : </strong>{ pictureId }
            </div>
        </div>
    </div>
    )
}