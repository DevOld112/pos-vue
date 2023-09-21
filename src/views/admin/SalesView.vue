<script setup>
import vueTailwindDatePicker from 'vue-tailwind-datepicker'
import { ref } from 'vue'
import { useSalesStore } from '../../stores/sales'
import SalesDetails from '../../components/SalesDetails.vue'
import { formatCurrency } from '../../helpers';

const sales = useSalesStore()

const formatter = ref({
    date: 'DD/MM/YYYY',
    month: 'MMMM'
})

</script>

<template>
        <h1 class="text-4xl font-black my-10">Resumen de Ventas</h1>

        <div class="md:flex md:items-start gap-5">
            <div class="md:w-1/2 lg:w-1/3 bg-white flex justify-center">
                <vueTailwindDatePicker 
                i18n="es-es"
                as-single="true"
                no-input
                v-model="sales.date"
                :formatter="formatter"
                />
            </div>
            <div class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-5 pb-32">
                <p
                class="text-center text-lg"
                v-if="sales.isDateSelected"
                >
                    Ventas de la fecha: <span class="font-black">{{ sales.date }}</span>
                </p>

                <p
                v-else
                class="text-center text-lg font-bold"
                >
                Selecciona Una Fecha
                </p>

                <div v-if="sales.salesCollection.length" class="space-y-5">
                    <SalesDetails
                    v-for="sale in sales.salesCollection"
                    :key="sale.id"
                    :sale="sale"
                    />

                    <p class="text-right text-xl">
                        Total de Venta Del Dia:
                        <span class="font-black">
                            {{ formatCurrency(sales.totalSalesOfDay) }}
                        </span>
                    </p>

                </div>

                <p v-else class="text-center text-lg">
                    No Hay Ventas Para este dia
                </p>
            </div>
        </div>
    
</template>