import React,{ useState, useEffect } from 'react';
import { fetchBreeds } from "../lib/api";

export default ({dispatchBreedChange}) => {
        const [value,setValue] = useState('');
        const [breeds,setBreeds] = useState([]);
        const [isLoading,setIsLoading] = useState(false);
        const [currentPage,setCurrentPage] = useState(0);
        const [totalPages,setTotalPages] = useState(0);

        const handleChange = evt => {
            setValue(evt.target.value)

            if(dispatchBreedChange) {
                dispatchBreedChange(evt.target.value);
            }
        }

        const handlePageClick = newPageNumber => {
            if(newPageNumber  <= 0 || newPageNumber >= totalPages) {
                return;
            }
            setCurrentPage(newPageNumber);
        }

        useEffect(() => {
            const loadBreeds = async () => {
                setIsLoading(loading => !loading);
                const breedsData = await fetchBreeds(currentPage,15);
                setBreeds(breedsData.breeds);
                setTotalPages(parseInt(Math.ceil(breedsData.totalBreeds/15),10));
                setIsLoading(loading => !loading)
            }

            loadBreeds();
        },[currentPage])

    return (
        <>
            {isLoading && (
                <progress className='is-medium is-link progress' max='100'>60%</progress>
            )}
            {
                !isLoading && (
                    <>
                        <div className="breed-list field">
                            <div className="control">
                                {
                                    breeds.map(breed => (
                                        <label className='radio' key={breed.id}>
                                            <input type="radio" name='breed' checked={value === breed.id.toString()} value={breed.id} onChange={handleChange}/>
                                            {breed.name}
                                        </label>
                                    ))
                                }
                            </div>
                        </div>
                        <br />
                        <nav className='pagination is-rounded' role='navigation' aria-label='pagination'>
                            <a className='pagination-previous' disabled={currentPage <= 0} onClick={() => handlePageClick(currentPage - 1)}>Précedent</a>
                            <a className='pagination-next' disabled={currentPage + 1 >= totalPages} onClick={() => handlePageClick(currentPage + 1)}>Suivant</a>
                        </nav>
                    </>
                )
            }
        </>
                )
            }