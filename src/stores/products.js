import { defineStore } from "pinia";
import { computed } from "vue";
import { useFirestore } from "vuefire";
import { addDoc, collection } from 'firebase/firestore'

export const useProductsStore = defineStore('products', () => {

    const db = useFirestore()

    const categories = [
        {id: 1, name: 'Sudaderas'},
        {id: 2, name: 'Tenis'},
        {id: 3, name: 'Lentes'},
    ]

    async function createProduct(product) {
        await addDoc(collection( db, 'products'), product)
    }

    const categoryOptions = computed(() =>{
        const options = [
            {label: 'Seleccione Una Categoria', value: '', attrs: {disabled: true} },
            ...categories.map(category =>({
                
                label: category.name,
                value: category.id
            }))
        ]

        return options
    })
        
 
    return {
        createProduct,
        categoryOptions
    }
})