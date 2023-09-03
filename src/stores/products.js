import { defineStore } from "pinia";
import { computed } from "vue";
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire";
import { addDoc, collection, where, query, limit, orderBy, updateDoc, doc, deleteDoc, getDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from "firebase/storage";

export const useProductsStore = defineStore('products', () => {

    const db = useFirestore()
    const storage = useFirebaseStorage();

    const categories = [
        {id: 1, name: 'Sudaderas'},
        {id: 2, name: 'Tenis'},
        {id: 3, name: 'Lentes'},
    ]

    const q = query(
        collection(db, 'products'),
        
    )

    const productsCollection = useCollection ( q )

    // Crear Producto

    async function createProduct(product) {
        await addDoc(collection( db, 'products'), product)
    }

    // Editar Producto

    async function updateProduct(docRef, product){
        const { image, url, ...values} = product

        if(image.length){
            await updateDoc(docRef, {
                ...values,
                image: url.image

            })
        } else {
            await updateDoc(docRef, values)
        }
    }

    // Eliminar Producto

    async function deleteProduct (id) {

        if(confirm('¿Desea Eliminar el Producto?')) {

            // Identificar el documento de la coleccion

            const docRef = doc(db, 'products', id)
            const docSnap = await getDoc(docRef)

            // Identificar la Imagen del Storage

            const {image} = docSnap.data()
            const imageRef = storageRef(storage, image)

            // Eliminar

            await Promise.all([
                deleteDoc(docRef),
                deleteObject(imageRef)
            ])
        }

        
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
        
    const noResults = computed(() => productsCollection.value.length === 0)
 
    return {
        createProduct,
        updateProduct,
        deleteProduct,
        productsCollection,
        categoryOptions,
        noResults
    }
})