<template>
    <div class="error">
        <img class="img" src="../../static/404.jpg" alt="" />
        <button v-show="show" @click="goBack" class="button">返回上一页</button>
    </div>
</template>

<script>
export default {
    name: 'hello',
    data () {
        return {
            msg: '404',
            show: false
        }
    },
    methods: {
        goBack() {
            this.$router.back()
        }
    },
    mounted() {
        this.timer = setTimeout(() => {
            this.$set(this, 'show', true)
        }, 900)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .error {
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: center;
    }
    .img {
        height: 100%;
        width: 100%;
    }
    .button {
        height: 30px;
        width: 80px;
        border: #ffffff;
        box-shadow: 0px 0px 10px #888888 inset;
        color: white;
        position: absolute;
        top: 41%;
        background: #1a2d3f;
    }
</style>
