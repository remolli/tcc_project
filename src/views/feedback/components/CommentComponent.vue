<template>
    <b-row class="m-0 comment-container">
        <b-col>

            <b-row :cols="isMobile ? '1' : '2'" align-h="between">

                <!-- User info -->
                <b-col>
                    <b-row align-h="start" class="text-start">
                        <span class="comment-name"> {{ name }} </span>
                    </b-row>
                    <b-row align-h="start" class="text-start">
                        <span class="comment-date"> {{ date }} </span>
                    </b-row>
                </b-col>
                <!-- Stars -->
                <b-col style="max-width: 200px;" align-self="center" :class="isMobile? 'my-2' : ''">
                    <b-form-rating
                    id="inputRating"
                    name="inputRating"
                    class="rating-input"
                    :value="5"
                    disabled
                    ></b-form-rating>
                    <!-- <b-row>
                        <b-col v-for="star in stars" :key="star" class="comment-star" style="color: #FFFF00;">
                            <b-icon icon="star-fill"></b-icon>
                        </b-col>
                    </b-row> -->
                </b-col>

            </b-row>

            <!-- Comment text -->
            <b-row class="mt-2">

                <div class="comment-text" style="white-space: pre-wrap;">{{ text }}</div>

            </b-row>

        </b-col>
    </b-row>
</template>

<script>
export default {
    name: "CommentComponent",
    props:{
        isMobile: Boolean,
        name: String,
        date: String,
        text: String,
        stars: Number,
    }
}
</script>

<style scoped>
.comment-container {
    border-top:2px solid #E1E1E3;
    padding:20px;
}
.comment-name {
    font-size:18px;
    font-weight: 500;
}
.comment-date {
    font-size:16px;
    font-weight: 400;
    color: #757575;
}
.comment-star {
    color: yellow;
}
.rating-input {
    background-color: #555555;
    border: none;
    color: yellow;
}
.comment-text {
    text-align: start;
    font-size:17px;
    font-weight: 400;
    color: #555555;
}
</style>