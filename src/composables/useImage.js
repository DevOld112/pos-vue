import { ref, computed } from 'vue'
import { useFirebaseStorage } from 'vuefire'
import { ref as storageRef, uploadBytesResumable, getDownloadURL  } from 'firebase/storage'
import { uid } from 'uid'

export default function useImage(){

    //Conecta al servicio de storage de Firebase desde Vuejs

        const url = ref('')
        const storage = useFirebaseStorage()

        const onFileChange = e => {
            const file = e.target.files[0]
            const filename = uid() + '.jpg'

        //Ubicacion donde se va a guardar las imagenes

            const sRef = storageRef(storage, filename)

        //Sube el Archivo

            const uploadTask = uploadBytesResumable(sRef, file)

            uploadTask.on('state_changed', 
            () => {},
            (error) => console.log(error),
            () => {

                //Imagen ya se subio a Firebase

                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        url.value = downloadURL
                    })
            }
            )
        }

        const isImageUploaded = computed(() => {
            return url.value ? url.value : null
        })

    return{
        onFileChange,
        url,
        isImageUploaded
    }
}