<script setup>
import ShoppingCartItem from './ShoppingCartItem.vue'
import Amount from './Amount.vue';
import { useCartStore } from '../stores/cart';
import { useCouponStore } from '../stores/coupons';
import { formatCurrency } from '../helpers';
import CouponForm from './CouponForm.vue';

const cart = useCartStore()
const coupon = useCouponStore()
</script>

<template>
    <p v-if="cart.isEmpty" class="text-xl text-center text-gray-900 mt-20 font-bold">El Carrito esta vacio</p>

    <div v-else>
        <p class="text-4xl font-bold text-gray-800 mt-20"> Resumen de Venta </p>

        <ul
            role="list"
            class="mt-6 divide-y divide-gray-200"
        >
        
            <ShoppingCartItem
                v-for="item in cart.items"
                :key="item.id"
                :item="item"
            />

        </ul>

        <dl class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
            <Amount>
                <template #label>Subtotal:</template>
                {{ formatCurrency(cart.subtotal) }}
            </Amount>

            <Amount>
                <template #label>Impuestos:</template>
                {{ formatCurrency(cart.tax) }}
            </Amount>

            <Amount v-if="coupon.isValidCoupon">
                <template #label>Descuento:</template>
                {{ formatCurrency(coupon.discount) }}
            </Amount>

            <Amount>
                <template #label>Total a Pagar:</template>
                {{ formatCurrency(cart.total) }}
            </Amount>

            
        </dl>

        <CouponForm />

        <button
        type="button"
        class="mt-10 w-full bg-indigo-600 hover:bg-indigo-800 text-white font-bold rounded-lg p-2 uppercase"
        @click="cart.checkout"
        >
            Confirmar Compar
        </button>

    </div>
</template>