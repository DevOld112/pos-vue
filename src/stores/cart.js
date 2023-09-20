import { defineStore } from 'pinia'
import { ref, computed, watchEffect} from 'vue'
import { useCouponStore } from './coupons'

export const useCartStore =  defineStore('cart', () => {

    const coupon = useCouponStore()
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
        isEmpty,
        checkProductAvailability,
        updateQuantity    
    }
})

