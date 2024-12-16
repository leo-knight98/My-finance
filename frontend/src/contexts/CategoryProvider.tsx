import { createContext, ReactNode, useState } from "react";
import { AxiosRequestConfig } from "axios";
import axiosClient from "../config/axiosClient";

type Category = {
    id: number,
    user_id: number,
    name: string,
    type: string
}

type CategoryData = {
    name: string,
    type: string
}

export type CategoryContext = {
    categories: Category[],
    getAllCategories: () => void,
    deleteCategory: (id: number) => void,
    addCategory: (data: CategoryData) => void
}

type CategoryProviderProps = {
    children: ReactNode;
};

const CategoryContext = createContext<CategoryContext | null>(null)
function CategoryProvider({children}: CategoryProviderProps) {
    const [categories, setCategories] = useState<Category[]>([])
    
    function getAllCategories() {
        axiosClient.get('/categories')
        .then((data) => {
            const categoriesData = data.data
            setCategories(categoriesData)
        })
    }

    function addCategory(data: CategoryData) {
        const options: AxiosRequestConfig = {
            params: {'': ''},
            headers: {'content-type': 'application/json'},
            withCredentials: true,
        }
        axiosClient.post('/categories', data, options)
        .then((res) => {
            setCategories([...categories, res.data[0]])
        })
    }

    function deleteCategory(id: number) {
        axiosClient.get(`/categories/delete?id=${id}`, {withCredentials: true})
        .then((res) => {
            if(res.data.deletedOk) {
                const newCategories = categories.filter(element => element.id !== id)
                setCategories(newCategories)
            }
        })
    }

    const valueToSend = {
        categories,
        getAllCategories,
        deleteCategory,
        addCategory
    }
    
    return(
        <CategoryContext.Provider value={valueToSend}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider
export { CategoryContext }