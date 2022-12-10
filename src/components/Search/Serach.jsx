import React, { useCallback, useContext, useRef } from 'react';
import style from "./Search.module.css";
import debounce from 'lodash.debounce';
import { SearchContext } from '../../App';

const Serach = () => {
    const {searchValue, setSearchValue} = useContext(SearchContext)
    const inputRef = useRef()
    const onClickClear = () => {
        setSearchValue("")
        inputRef.current.focus()
    }

    return (
        <div>
            <input
                ref={inputRef}
                className={style.root}
                type="text"
                value={searchValue}
                placeholder='поиск пиццы ...'
                onChange={e => setSearchValue(e.target.value)}
            />
            {searchValue && <button onClick={onClickClear} className={style.clear}>&times;</button>}
        </div>
    )
}

export default Serach