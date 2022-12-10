import React, { useState, useEffect, useContext } from 'react'
import Sort from '../components/Sort'
import { setCategoryId } from '../redux/slices/filterSlice'
import Categories from '../components/Categories'
import Skeleton from '../components/PizzaBlock/Skeleton'
import PizzaBlock from '../components/PizzaBlock'
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

function Home() {
    const { categoryId, sort } = useSelector((state) => state.filter)
    const sortType = sort.sortProperty
    const dispatch = useDispatch()

    const { searchValue } = useContext(SearchContext)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://638e08854190defdb754661d.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ""}&sortBy=${sortType}&order=desc`)
            .then(resposne => {
                setItems(resposne.data)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, currentPage])

    const pizzas = items
        .filter(obj => {
            if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
                return true
            }
        })
        .map(obj => <PizzaBlock key={obj.id}  {...obj} />)

    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />)
    return (
        <div>
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onChangeCategory={(i) => onClickCategory(i)}
                />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? skeletons
                        : pizzas
                }
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </div>
    )
}

export default Home