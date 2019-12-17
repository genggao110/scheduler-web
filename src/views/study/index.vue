<template>
    <div class="demo">
        <h1>过滤器</h1>
        <div>{{content | uppercase}}</div>
        <div>{{content | transform('capitalize')}}</div>
        <hr>
        <h1>自定义指令</h1>
        <input type="text" v-focus>
        <div class="drag" v-drag>这个div可以拖拽</div>
    </div>
</template>

<script>
    export default {
        name: "study",
        data() {
            return {
                content: "lafanfweewfs"
            }
        },
        filters: {
            uppercase: function(value) {
                return value.toUpperCase();
            },
            transform (value, type){
                switch (type) {
                    case 'uppercase':
                        return value.toUpperCase();
                        break;
                    case 'lowercase':
                        return value.toLowerCase();
                        break;
                    case 'capitalize':
                        return value.charAt(0).toUpperCase() + value.substr(1)
                        break;
                    default:
                        break;
                }
            }
        },
        directives: {
            focus: {
                inserted: (el) => {
                    el.focus()
                }   
            },
            drag: {
                inserted: (el) => {
                    const fnDown = (ev) => {
                        console.log(ev);
                        let currentX = el.offsetLeft;
                        let currentY = el.offsetTop;

                        let downX = ev.clientX;
                        let downY = ev.clientY;

                        const fnMove = (ev) => {
                            let left = ev.clientX - downX + currentX;
                            let top = ev.clientY - downY + currentY;
                            el.style.left = left + 'px';
                            el.style.top = top + 'px';
                        };

                        const fnUp = (ev) => {
                            document.removeEventListener('mousemove', fnMove, false);
                            document.removeEventListener('mouseup', fnUp, false);
                        }

                        document.addEventListener('mousemove', fnMove, false);
                        document.addEventListener('mouseup', fnUp. false);
                        return false;
                    }
                    el.addEventListener('mousedown', fnDown, false);

                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .drag {
        position: absolute;
        width: 400px;
        height: 300px;
        background: red;

    }
</style>