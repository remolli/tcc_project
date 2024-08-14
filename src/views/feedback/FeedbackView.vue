<template>
    <div id="feedback">
        <b-form @submit.prevent="feedback" style="width:100%;">
            <b-row align-h="center" class="mx-0">
                <b-col style="max-width:1000px; width:100%;">
                    <b-row align-h="center">
                        <img class="logo-large" src="@/assets/logo.svg" alt="Logo Notícia para Todos">
                    </b-row>
                    <b-row class="pb-4 mb-2 mt-2">
                        <span style="font-size:20px; font-weight:300;">
                            Deixe aqui seu feedback
                        </span>
                    </b-row>
                    <b-row>
                        <b-col class="feedback-container p-0">
                            <div class="comments-container">
                                <CommentComponent 
                                :stars="5"
                                :name="'Eu mesmo'"
                                :date="'13/08/2024 - 21:59'"
                                :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur libero augue, at porttitor massa ultricies a. Donec eu mollis elit, vitae sagittis turpis. Cras pellentesque tristique tempor. Praesent ac elit nec urna malesuada ultricies nec non libero. Pellentesque placerat congue sagittis. In quam dui, lacinia eu quam et, cursus sollicitudin ante.'"
                                />
                                <CommentComponent 
                                :stars="5"
                                :name="'Eu mesmo'"
                                :date="'13/08/2024 - 21:59'"
                                :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur libero augue, at porttitor massa ultricies a. Donec eu mollis elit, vitae sagittis turpis. Cras pellentesque tristique tempor. Praesent ac elit nec urna malesuada ultricies nec non libero. Pellentesque placerat congue sagittis. In quam dui, lacinia eu quam et, cursus sollicitudin ante.'"
                                />
                                <CommentComponent 
                                :stars="5"
                                :name="'Eu mesmo'"
                                :date="'13/08/2024 - 21:59'"
                                :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur libero augue, at porttitor massa ultricies a. Donec eu mollis elit, vitae sagittis turpis. Cras pellentesque tristique tempor. Praesent ac elit nec urna malesuada ultricies nec non libero. Pellentesque placerat congue sagittis. In quam dui, lacinia eu quam et, cursus sollicitudin ante.'"
                                />
                                <CommentComponent 
                                :stars="5"
                                :name="'Eu mesmo'"
                                :date="'13/08/2024 - 21:59'"
                                :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur libero augue, at porttitor massa ultricies a. Donec eu mollis elit, vitae sagittis turpis. Cras pellentesque tristique tempor. Praesent ac elit nec urna malesuada ultricies nec non libero. Pellentesque placerat congue sagittis. In quam dui, lacinia eu quam et, cursus sollicitudin ante.'"
                                />
                                <CommentComponent 
                                :stars="5"
                                :name="'Eu mesmo'"
                                :date="'13/08/2024 - 21:59'"
                                :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur libero augue, at porttitor massa ultricies a. Donec eu mollis elit, vitae sagittis turpis. Cras pellentesque tristique tempor. Praesent ac elit nec urna malesuada ultricies nec non libero. Pellentesque placerat congue sagittis. In quam dui, lacinia eu quam et, cursus sollicitudin ante.'"
                                />
                                <CommentComponent 
                                :stars="5"
                                :name="'Eu mesmo'"
                                :date="'13/08/2024 - 21:59'"
                                :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur libero augue, at porttitor massa ultricies a. Donec eu mollis elit, vitae sagittis turpis. Cras pellentesque tristique tempor. Praesent ac elit nec urna malesuada ultricies nec non libero. Pellentesque placerat congue sagittis. In quam dui, lacinia eu quam et, cursus sollicitudin ante.'"
                                />
                            </div>

                            <b-row class="input-bar px-5 py-3">
                                <b-col align-self="center">
                                    <b-row>
                                        <b-form-textarea
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
                                        </b-form-textarea>
                                    </b-row>
                                    <!-- <b-row align-h="end" :style="comment.length==225 ? 'color:red;' : 'color:#676;'">
                                        {{ comment.length+'/'+225 }}
                                    </b-row> -->
                                </b-col>
                                <b-col cols="4"></b-col>
                                <b-col cols="1" align-self="center">
                                    <b-row>
                                        <b-button variant="link" class="p-0" style="color:#ccc !important; font-size:40px;">
                                            <b-icon icon="play"></b-icon>
                                        </b-button>

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
        }
    },
    computed:{

    },
    methods:{
        async feedback(){
            try{
                this.loading = true;
            }
            catch(error){
                console.log(error);
            }
            finally { this.loading = false; }
        },
    },
}
</script>

<style scoped>
#feedback{
    display: flex;
    justify-content: center;
    align-items: center;
    height:100%;
    width:100%;
    background-color: #F1FFFA;
}

.feedback-container{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    background-color:white;
    border-radius:40px;
    height:500px;
    box-shadow: 0px 0px 50px #00000015;
}

.comments-container{
    border-radius: 40px;
    overflow: auto;
}

.input-bar{
    background-color: #353535;
    height: 100px;
    width:100%;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
}
.textarea-input{
    background-color: transparent;
    color: #CCCCCC;
    border: none;
    font-size: 20px !important;
    overflow: hidden;
    height: 0px;
}
.textarea-input::placeholder{
    background-color: transparent;
    border: none;
    color: #AAAAAA !important;
    font-size: 20px !important;
}
</style>