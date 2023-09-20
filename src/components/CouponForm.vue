<script setup>
import { useCouponStore } from '../stores/coupons';

const store = useCouponStore()

</script>

<template>
    <p class="font-bold border-t mt-5 py-5 border-gray-200">
        ¿Tienes Un Cupon?
    </p>

    <div class="flex gap-2">
        <input
            type="text"
            placeholder="Ingresa un Cupon"
            class="p-2 bg-white border-gray-300 w-full rounded-lg "
            v-model="store.couponInput"
            />

        <button
        type="button"
        class="p-3 bg-green-400 font-bold rounded-lg disabled:opacity-30"
        @click="store.applyCoupon"
        :disabled="store.isValidCoupon"
        >
            Canjear
        </button>
    </div>

    <p class="w-full font-bold text-center mt-5 rounded-sm ">
        {{ store.couponValidationMessage }}
    </p>
</template>