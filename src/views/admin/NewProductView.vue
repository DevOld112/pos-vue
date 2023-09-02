<script setup>
import Link from '../../components/Link.vue';
import { FormKit } from '@formkit/vue';
</script>

<template>
    <div class="p-10">
        <Link
            to="products"
        >
        Volver
        </Link>

        <h1 class="text-4xl font-black my-10">Nuevo Producto</h1>

        <div class="flex justify-center bg-white shadow">
            <div class="mt-10 p-10 w-full 2xl:w-2/4">
            
                <FormKit
                    type="form"
                    submit-label="Agregar Producto"
                >
                    <FormKit
                        type="text"
                        label="Nombre"
                        name="name"
                        placeholder="Nombre Del Producto"
                        validation="required"
                        :validation-messages="{required: 'El Nombre del Producto es Obligatorio'}"
                    />

                    <FormKit
                        type="file"
                        label="Imagen Producto"
                        name="image"
                        validation="required"
                        :validation-messages="{required: 'La Imagen del Producto es Obligatorio'}"
                        accept=".jpg"
                        multiple="true"
                    />

                    <FormKit
                        type="select"
                        label="Categoria"
                        name="category"
                        validation="required"
                        :validation-messages="{required: 'La Categoria del Producto es Obligatorio'}"
                        :options="[1, 2, 3]"
                    />

                    <FormKit
                        type="number"
                        label="Precio"
                        name="price"
                        placeholder="Precio de Producto"
                        validation="required"
                        :validation-messages="{required: 'El Precio del Producto es Obligatorio'}"
                        min="1"
                        step="10"
                    />

                    <FormKit
                        type="number"
                        label="Disponibles"
                        name="availability"
                        placeholder="Cantidad Disponible"
                        validation="required"
                        :validation-messages="{required: 'El Precio del Producto es Obligatorio'}"
                        min="1"
                        step="10"
                    />

                </FormKit>
            </div>
        </div>

    </div>
</template>