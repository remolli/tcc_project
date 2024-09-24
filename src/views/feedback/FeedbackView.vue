<template>
    <div id="feedback">
        <b-form @submit.prevent="feedback" style="width:100%;">
            <b-row align-h="center" class="mx-0">
                <b-col style="max-width:1000px; width:100%;">
                    <!-- <b-row align-h="center">
                        <img class="logo-large" src="@/assets/logo.svg" alt="Logo Notícia para Todos">
                    </b-row> -->
                    <header role="header">
                        <b-row class="pb-4 mb-2 mt-5" :class="isMobile ? 'pt-5' : 'pt-4'">
                            <h1 style="font-size:20px; font-weight:500;">
                                Deixe aqui seu feedback
                            </h1>
                        </b-row>
                    </header>
                    <b-row>
                        <b-col class="feedback-container p-0" :style="isMobile? 'height:70vh;' :'width:80n--'">
                            <main role="contentinfo" id="comments-container" class="comments-container w-100 h-100">
                            <b-overlay :show="loading" bg-color="white" class="h-100">
                                <div v-if="listComments.length==0 && !loading" class="h-100 w-100 d-flex justify-content-center align-items-center">
                                    <h3 class="p-4" style="font-size:24px; min-width:100%;"
                                    :style="
                                    isMobile
                                    ? 'font-size:20px;'
                                    : 'font-size:24px;'
                                    "> Seja o primeiro a comentar! </h3>
                                </div>
                                <CommentComponent v-for="(item,idx) in listComments" :key="idx"
                                :isMobile="isMobile" :style="idx==0? 'border:none;' :''"
                                :stars="Number(item.rating)"
                                :name="item.userName"
                                :date="formatDateTimeBR(item.created_at)"
                                :text="item.description"
                                />
                                <!-- <CommentComponent v-for="(item,idx) in [0,0,0,0,0]" :key="idx"
                                :isMobile="isMobile" :style="idx==0? 'border:none;' :''"
                                :stars="Math.ceil(Math.random()*5)"
                                :name="'Eu mesmo'"
                                :date="'13/08/2024 - 21:59'"
                                :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur libero augue, at porttitor massa ultricies a. Donec eu mollis elit, vitae sagittis turpis. Cras pellentesque tristique tempor. Praesent ac elit nec urna.'"
                                /> -->
                                <!-- :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur libero augue, at porttitor massa ultricies a. Donec eu mollis elit, vitae sagittis turpis. Cras pellentesque tristique tempor. Praesent ac elit nec urna malesuada ultricies nec non libero. Pellentesque placerat congue sagittis. In quam dui, lacinia eu quam et, cursus sollicitudin ante.'" -->
                            </b-overlay>
                            </main>
                            <fieldset role="form" style="width:100%">
                                <b-overlay :show="!isLogged" bg-color="black"
                                style="
                                border-bottom-left-radius: 40px !important;
                                border-bottom-right-radius: 40px !important;
                                ">
                                    <template #overlay>
                                        <div class="text-center" style="min-width: 100%;">
                                            <h3 style="font-size:24px; color:white; min-width:100%;"
                                            :style="
                                            isMobile
                                            ? 'font-size:20px;'
                                            : 'font-size:24px;'
                                            "> Entre no sistema para cadastrar um comentário </h3>
                                        </div>
                                    </template>
                                    <b-row class="input-bar py-3 m-0" cols="1" :class="isMobile ? 'px-3' : 'px-4 pb-4'">
                                        <b-col align-self="center" style="width:100%;">
                                            <b-row>
                                                <b-form-group label="Comentário" label-for="inputComment" label-align="start">
                                                    <b-form-textarea
                                                    id="inputComment"
                                                    name="inputComment"
                                                    ref="inputComment"
                                                    type="text"
                                                    :maxlength="225"
                                                    class="textarea-input"
                                                    placeholder="Digite aqui seu comentário..."
                                                    v-model="comment"
                                                    :disabled="loading"
                                                    :state="comment ? !isBadText : null"
                                                    :aria-invalid="comment ? isBadText : null"
                                                    aria-errormessage="errorComment"
                                                    rows="1"
                                                    max-rows="3"
                                                    no-resize
                                                    required
                                                    :style="comment ? '' : 'height: 46px !important;'"
                                                    >
                                                    </b-form-textarea>
                                                    <b-form-invalid-feedback id="errorComment" :state="comment ? !isBadText : null" style="text-align:start;">
                                                        Remova as palavras inapropriadas.
                                                    </b-form-invalid-feedback>
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
                                                    required
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
                                </b-overlay>
                            </fieldset>
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
import axios from 'axios';
import cookies from '@/plugins/cookies';

const Piii = require("piii");
const piiiFilters = require("piii-filters");
const regex = /^[a-zA-Z]+$/;
const specificFilters = process.env.VUE_APP_TRASH_LIST.split(",").filter(e => regex.test(e));
const removeAccents = string => string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "")

const piii = new Piii({
    filters: [
    ...Object.values(piiiFilters),
    ...specificFilters
    ],
    aliases: {
    a: ["4", "@"],
    e: ["3", "&"],
    i: ["1", "l", "|"],
    o: ["0"]
    },
    repeated: true,
    cleaner: removeAccents,
});

export default {
    name: 'FeedbackView',
    components:{
        CommentComponent,
    },
    data(){
        return {
            isLogged: true,
            loading: false,
            listComments: [],
            comment: '',
            stars: 0,
            isMobile: window.innerWidth < 720,
        }
    },
    created(){
        window.addEventListener('resize', () => this.isMobile = window.innerWidth<720 );
        this.isLogged = !!cookies.getToken();
    },
    mounted(){
        this.getFeedbacks();
        // this.commentsContainerScrollBottom();
    },
    computed:{
        isBadText(){
            if(this.comment){
                return piii.has(this.comment);
            }
            else return true;
        },
    },
    methods:{
        getInstance(){
            const config = { baseURL: process.env.VUE_APP_NT_BASE_URL }
            const token = cookies.getToken();
            if(token) config.headers = { Authorization: token }
            const instance = axios.create(config)
            return instance
        },
        async getFeedbacks(){
            try{
                this.loading=true
                const instance = this.getInstance();
                const response = await instance.get('comments')
                this.listComments = response.data;
                this.listComments.sort(()=>-1)
            }
            catch(error){
                error;
            }
            finally{ this.loading=false; }
        },
        validateForm(){
            if(this.isBadText){
                this.$refs.inputComment.focus();
                return false;
            }
            else return true;
        },
        async feedback(){
            if(!this.validateForm()) return;
            
            var name = cookies.getUsername();
            var x = cookies.getOther();
            var y = Utility.numbers(name);
            if(x!=y){
                cookies.deleteToken();
                cookies.deleteUsername();
                this.$router.push({name: 'login'});
                return;
            }

            try{
                this.loading = true;

                const username = cookies.getUsername();
                var modal = {
                    userName: username,
                    description: this.comment,
                    rating: String(this.stars),
                }

                const instance = this.getInstance();
                await instance.post('comments', modal)

                this.comment='';
                this.stars=0;
                this.getFeedbacks();
                Utility.successSnackBar("Comentário enviado com sucesso!")
            }
            catch(error){
                Utility.errorSnackBar("Ocorreu um erro ao enviar o comentário. Tente novamente!")
            }
            finally { this.loading = false; }
        },
        commentsContainerScrollBottom() {
            const container = document.getElementById('comments-container');
            if (container) container.scrollTop = container.scrollHeight;
        },
        formatDateTimeBR(value){
            if(!value) return '---';
            var day = value.substring(8,10);
            var month = value.substring(5,7);
            var year = value.substring(0,4);
            var hour = value.substring(11,13);
            var minute = value.substring(14,16);
            var dateBR = day+'/'+month+'/'+year+' '+hour+':'+minute;
            return dateBR;
        },
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
* /deep/ .position-absolute,
* /deep/ .b-overlay {
    z-index: 2 !important;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
}
</style>