<template>
    <div id="feedback">
        <b-form @submit.prevent="feedback" style="width:100%;">
            <b-row align-h="center" class="mx-0">
                <b-col style="max-width:1000px; width:100%;">
                    <!-- <b-row align-h="center">
                        <img class="logo-large" src="@/assets/logo.svg" alt="Logo Notícia para Todos">
                    </b-row> -->
                    <b-row class="pb-4 mb-2 mt-5" :class="isMobile ? 'pt-5' : 'pt-4'">
                        <h1 style="font-size:20px; font-weight:500;">
                            Deixe aqui seu feedback
                        </h1>
                    </b-row>
                    <b-row>
                        <b-col class="feedback-container p-0" :style="isMobile? 'height:70vh;' :''">
                            <div id="comments-container" class="comments-container w-100">
                                <CommentComponent v-for="(item,idx) in [0,0,0,0,0]" :key="idx"
                                :isMobile="isMobile" :style="idx==0? 'border:none;' :''"
                                :stars="5"
                                :name="'Eu mesmo'"
                                :date="'13/08/2024 - 21:59'"
                                :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur libero augue, at porttitor massa ultricies a. Donec eu mollis elit, vitae sagittis turpis. Cras pellentesque tristique tempor. Praesent ac elit nec urna.'"
                                />
                                <!-- :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur libero augue, at porttitor massa ultricies a. Donec eu mollis elit, vitae sagittis turpis. Cras pellentesque tristique tempor. Praesent ac elit nec urna malesuada ultricies nec non libero. Pellentesque placerat congue sagittis. In quam dui, lacinia eu quam et, cursus sollicitudin ante.'" -->
                            </div>

                            <b-row class="input-bar py-3" cols="1" :class="isMobile ? 'px-3' : 'px-4 pb-4'">
                                <b-col align-self="center" style="width:100%;">
                                    <b-row>
                                        <b-form-group label="Comentário" label-for="inputComment" label-align="start">
                                            <b-form-textarea
                                            id="inputComment"
                                            name="inputComment"
                                            type="text"
                                            :maxlength="225"
                                            class="textarea-input"
                                            placeholder="Digite aqui seu comentário..."
                                            v-model="comment"
                                            :disabled="loading"
                                            rows="1"
                                            max-rows="3"
                                            no-resize
                                            required
                                            :style="comment ? '' : 'height: 46px !important;'"
                                            >
                                            </b-form-textarea>
                                        </b-form-group>
                                        <!-- <b-form-textarea
                                        id="inputComment"
                                        name="inputComment"
                                        type="text"
                                        class="px-3 py-2 textarea-input"
                                        :maxlength="225"
                                        placeholder="Digite aqui seu comentário..."
                                        v-model="comment"
                                        :disabled="loading"
                                        rows="1"
                                        max-rows="1"
                                        no-resize
                                        required
                                        >
                                        </b-form-textarea> -->
                                    </b-row>
                                </b-col>
                                <b-col>
                                    <b-row align-h="between">
                                        <b-col align-self="center" style="max-width: 200px;">
                                            <b-form-rating 
                                            id="inputRating"
                                            name="inputRating"
                                            class="rating-input"
                                            v-model="stars"
                                            :aria-required="true"
                                            ></b-form-rating>
                                        </b-col>
                                        <b-col align-self="center" style="max-width: 150px;">
                                            <b-button class="w-100" type="submit" variant="success" style="border-radius:8px; padding:7px 0px; font-size:17px;">
                                                Enviar
                                            </b-button>
                                            <!-- <b-button variant="link" class="p-0" style="color:#ccc !important; font-size:40px;">
                                                <b-icon icon="play"></b-icon>
                                            </b-button> -->
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
import Utility from '@/utils/Utility';
import CommentComponent from './components/CommentComponent.vue';
export default {
    name: 'FeedbackView',
    components:{
        CommentComponent,
    },
    data(){
        return {
            loading: false,
            comment: '',
            stars: 0,
            isMobile: window.innerWidth < 720,
        }
    },
    created(){
        window.addEventListener('resize', () => this.isMobile = window.innerWidth<720 );
    },
    mounted(){
        // this.commentsContainerScrollBottom();
    },
    methods:{
        async feedback(){
            try{
                this.loading = true;
                Utility.successSnackBar("Comentário enviado com sucesso!")
            }
            catch(error){
                console.log(error);
                Utility.errorSnackBar("Ocorreu um erro ao enviar o comentário. Tente novamente!")
            }
            finally { this.loading = false; }
        },
        commentsContainerScrollBottom() {
            const container = document.getElementById('comments-container');
            if (container) container.scrollTop = container.scrollHeight;
        }
    },
}
</script>

<style scoped>
#feedback{
    display: flex;
    justify-content: center;
    align-items: center;
    /* height:100%;
    width:100%; */
    background-color: #F1FFFA;
    padding: 20px;
}

.feedback-container{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    background-color:white;
    border-radius:40px;
    height: 70vh;
    box-shadow: 0px 0px 50px #00000015;
}

.comments-container{
    border-radius: 40px;
    overflow-y: auto;
    overflow-x: hidden;
}

.input-bar{
    background-color: #353535;
    /* min-height: 100px; */
    /* height:fit-content; */
    width:100%;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
}
.textarea-input{
    background-color: #e1e1e3;
    color: #101010;
    border: 2px solid #898989;
    font-size: 18px !important;
    overflow-y: auto !important;
    padding:8px 10px !important;
}
.textarea-input::placeholder{
    border: none;
    color: #606060 !important;
    font-size: 18px !important;
    opacity:1 !important;
}
.rating-input{
    background-color: #555555;
    color: yellow;
    border: none;
}
* /deep/ .form-group label {
    color: #e1e1e3;
    font-size: 18px;
}
</style>