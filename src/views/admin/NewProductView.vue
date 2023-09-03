<script setup>
import { reactive } from 'vue';
import Link from '../../components/Link.vue';
import useImage from '../../composables/useImage';
import { useProductsStore } from '../../stores/products';
import { useRouter } from 'vue-router';

const { onFileChange, url, isImageUploaded } = useImage()

const products = useProductsStore()
const router = useRouter()

const submitHandler = async data =>{
    const { image, ...values } = data

    try {
        await products.createProduct({
            ...values,
            image: url.value
        })
        router.push({name:'products'})
    } catch (error) {
        console.log(error)
    }
}

const formData = reactive({
    name:'',
    category: '',
    price: '',
    availability:'',
    image: ''
})

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
                    incomplete-message="No se pudo enviar, hay campos vacios"
                    @submit="submitHandler"
                    :value="formData"
                >
                    <FormKit
                        type="text"
                        label="Nombre"
                        name="name"
                        placeholder="Nombre Del Producto"
                        validation="required"
                        :validation-messages="{required: 'El Nombre del Producto es Obligatorio'}"
                        v-model.trim="formData.name"
                    />

                    <FormKit
                        type="file"
                        label="Imagen Producto"
                        name="image"
                        validation="required"
                        :validation-messages="{required: 'La Imagen del Producto es Obligatorio'}"
                        accept=".jpg"
                        multiple="true"
                        @change="onFileChange"
                        v-model.trim="formData.image"
                    />

                    <div v-if="isImageUploaded">
                        <p class="font-black">Imagen Producto</p>

                        <img 
                        :src="url"
                        alt="Nueva Imagen Producto"
                        class="w-32"

                        />
                    
                    </div>

                    <FormKit
                        type="select"
                        label="Categoria"
                        name="category"
                        validation="required"
                        :validation-messages="{required: 'La Categoria del Producto es Obligatorio'}"
                        :options="products.categoryOptions"
                        v-model.number="formData.category"
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
                        v-model.number="formData.price"
                    />

                    <FormKit
                        type="number"
                        label="Disponibles"
                        name="availability"
                        placeholder="Cantidad Disponible"
                        validation="required"
                        :validation-messages="{required: 'El Precio del Producto es Obligatorio'}"
                        min="1"
                        v-model.number="formData.availability"
                    />

                </FormKit>
            </div>
        </div>

    </div>
</template>