import { defineStore } from 'pinia'
import { ref, computed, watchEffect} from 'vue'
import { useCouponStore } from './coupons'
import { collection, addDoc, runTransaction, doc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { getCurrentDate } from '../helpers'


export const useCartStore =  defineStore('cart', () => {

    const coupon = useCouponStore()
    const db = useFirestore()

    const items = ref([])
    const subtotal = ref(0)
    const tax = ref(0)
    const total = ref(0)
    const MAX_PRODUCTS = 5;


    watchEffect(() => {
        subtotal.value = items.value.reduce((acc, item) => acc + (item.quantity * item.price), 0)
        tax.value = items.value.reduce((acc, item) => (acc + (item.quantity * item.price) * 0.18), 0)
        total.value = tax.value + subtotal.value - coupon.discount
    })

    function addItem(item) {
        const index = isItemCart(item.id)
        if(index >= 0){
            if(isProductAvailable(item, index)){
                alert('Has alcanzado el limite de compras Permitido para un mismo Producto')
            }
            items.value[index].quantity++
        } else {
            items.value.push({...item, quantity: 1, id: item.id})
        }
        
        
    }

    const isItemCart = id => items.value.findIndex(item => item.id === id)
    const isProductAvailable =  (item, index) => {
        return items.value[index].quantity >= item.availability || items.value[index].quantity >= MAX_PRODUCTS
    }  

    function updateQuantity(id, quantity){
        items.value = items.value.map(item => item.id === id? {...item, quantity} : item )
    }

    function removeItem(id){
        items.value = items.value.filter(item => item.id !== id)
    }

    async function checkout() {
        try {
            await addDoc(collection(db, 'sales'), {
                

                items: items.value.map(item => {
                    const {availability, category, ... data } = item
                    return data
                }),
                
                subtotal: subtotal.value,
                tax: tax.value,
                total: total.value,
                discount: coupon.discount,
                date: getCurrentDate()
                
            })

            // Sustraer la cantidad de lo disponible
            items.value.forEach( async (item) => {
                const productRef = doc(db, 'products', item.id)
                await runTransaction(db, async(transaction) => {
                    const currentProduct = await transaction.get(productRef)
                    const availability = currentProduct.data().availability - item.quantity
                    transaction.update(productRef, { availability })
                })
            })


            //Reinicio el state

            items.value = []
            subtotal.value = 0
            tax.value = 0
            total.value = 0

            coupon.$reset()

        } catch (error) {
            console.log(error)
        }
    }

    const isEmpty = computed(() => items.value.length === 0)

    const checkProductAvailability = computed(() => {
        return (product) => product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS
    })

    return {
        items,
        subtotal,
        tax,
        total,
        addItem,
        removeItem,
        checkout,
        isEmpty,
        checkProductAvailability,
        updateQuantity    
    }
})

