<template>
    <div>
        <h1>ChatGPT 视频文案demo</h1>
        <input type="button" value="生成字幕" @click="generateVideoScript" />
        <input type="button" value="文案仿写" @click="copywriting" />
        <br><br>
        <textarea v-model="answer" rows="30" cols="80"></textarea>
        <textarea v-model="copywritingAnswer" rows="30" cols="80"></textarea>
    </div>
</template>
  
<script>
import * as signalR from '@microsoft/signalr'

export default {
    name: 'SignalR2',
    components: {
    },
    props: {
        msg: String,

    },
    data() {
        return {
            question: "",
            answer: "",
            copywritingAnswer: "",
            connection1: null,
            connection2: null,
        }
    },
    mounted() {
        this.connection1 = this.chatGptWs();
        this.connection2 = this.chatGptWs();
    },

    methods: {
        chatGptWs() {
             var wwsUrl = "http://localhost:5055/ws/smartcut";
          //  var wwsUrl = "https://api-ci.siluzan.com/cutapi/ws/smartcut";
            var token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ikx5ZEIyVHJwMzZzOGtJNE5BNWc3WWNvMnROdyIsInR5cCI6IkpXVCIsIng1dCI6Ikx5ZEIyVHJwMzZzOGtJNE5BNWc3WWNvMnROdyJ9.eyJuYmYiOjE2ODYyNzU2NDAsImV4cCI6MTY4NjMxMTY0MCwiaXNzIjoiaHR0cHM6Ly9zc28tY2kuc2lsdXphbi5jb20iLCJhdWQiOlsiaHR0cHM6Ly9zc28tY2kuc2lsdXphbi5jb20vcmVzb3VyY2VzIiwiYXBpMSIsImFwaS11c3NpdGVtYW4iLCJhcGktZmFjZWJvb2siLCJhcGkteW91dHViZSIsImFwaS1nb29nbGUiLCJhcGktZG91eWluIiwiYXBpLWt1YWlzaG91IiwiYXBpLXRpa3RvayIsImFwaS1jdXQiLCJhcGktc2NybSIsImFwaS1ld2VjaGF0IiwiYXBpLWNoYXRncHQiLCJhcGktaXBwcm94eSIsImFwaS13eGNoYW5uZWwiXSwiY2xpZW50X2lkIjoiY3NvX2NsaWVudCIsInN1YiI6ImJlNzMzYzYwLTUwYjUtNDlkNy05NTY3LWY3MDk0N2VlOTg4ZiIsImF1dGhfdGltZSI6MTY4NjI3NTYzOCwiaWRwIjoibG9jYWwiLCJlbWFpbCI6IjEyM0BxcS5jb20iLCJuYW1lIjoiMTg45rWL6K-V5pi156ewMS43Iiwicm9sZSI6IlN0ZXdhcmRJbmRpdmlkdWFsIiwiY2lkIjoiOGY0ZjM3OTctNGM4YS00ODE3LWFiZGYtZmI3YmM5ZTM4YWJlIiwiZGlkIjoiNjExOTBhYjUtODFmOC00OTk2LWIwODItNWNiY2MxZGIwMDA3IiwicmlkIjoiNGMxY2NhNmEtOGNkNC00NjhmLWJkM2UtYzJiNGIzOTcxNTZjIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsImFwaTEiLCJhcGktdXNzaXRlbWFuIiwiYXBpLWZhY2Vib29rIiwiYXBpLXlvdXR1YmUiLCJhcGktZ29vZ2xlIiwiYXBpLWRvdXlpbiIsImFwaS1rdWFpc2hvdSIsImFwaS10aWt0b2siLCJjdXRhcGkucnciLCJhenVyZWFwaS5ydyIsImFwaS1zY3JtIiwiYXBpLWV3ZWNoYXQiLCJhcGktY2hhdGdwdCIsImFwaS1pcHByb3h5IiwiYXBpLXd4Y2hhbm5lbCJdLCJhbXIiOlsicHdkIl19.DYIX1GppLUQ5UEm34IifS_zFyKxXh0XHHkGvkGuNViQEqzCwaapr30kdJYFL-xtb25Lab_9HIs84X7XtFs8dyREANnBc_gE4XFfqmhf3PccG19T39FYEXKcE985GL7Swk0NdOVNolXVroTuIeWdlA3DyzZ3trhrVh53gaI5CXSRJ5bMEr1_6lYEQEk-8AWt-Nhlgtek_osg6RmvqipX8MRSqcFclcGSDv77_rxJnRwHryoXLZe1QHkX7zh-aZy00HMFLv3Tf1QbqjdFgpVNngb9FcPPRcfcQ7GSX4juF2aSX4EVu3wIq_TE1Y6N21kDRQLkqlooYrPoVYdtTqjgU2w"
            let that = this;

            let connection = new signalR.HubConnectionBuilder()
                .withUrl(wwsUrl, {
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets,
                    accessTokenFactory: () => token
                }
                )
                .build();

            connection.on("GenerateVideoScriptEcho", function (data) {
                //console.log(data);
                if (data.code) {
                    console.log(data.message)
                    that.answer = data.message;
                }
                else {
                    console.error(data.message);
                }
            });

            connection.on("CopywritingEcho", function (data) {
                if (data.code) {
                    that.copywritingAnswer = data.message;
                }
                else {
                    console.error(data.message);
                }
            });

            //启动连接
            connection.start();
            connection.onclose(x => {
                console.info(x);
            })
            return connection;
        },

        //视频脚本
        generateVideoScript() {

            if (!this.connection1) {
                console.warn("连接不存在");
                return;
            }

            var param = {
                scriptType: "口播类",
                productName: "尼康牌相机",
                productSpecialty: "具有成像优质、技术方面的积累、工艺很优秀、做工非常好",
                sceneCount: 3,
                sceneMini: 5,
                sceneMax: 20,
                generateCount: 2,
            }

            this.connection1.invoke("GenerateVideoScript", param)
                .catch(function (err) {
                    console.error(err);
                });
        },
        //文案仿写
        copywriting() {
            if (!this.connection2) {
                console.warn("连接不存在");
                return;
            }

            var param = {
                Content: "很多人判断海参的好坏，只看价格。认为价格越高品质越好，这无疑也太片面了！挑选海参，认准产地很关键，我们参行家的海参都是捕捞自北纬39度的深海，水温低，日照少，海参生长速度慢，营养更丰富！我们始终坚持传统的淡干工艺，为了就是能够锁住海参的营养。泡发后的海参，个头有手掌这么大！足足有半斤重！想吃的朋友，赶紧点击下方按钮，获取大连海参报价吧～",
                generateCount: 5,
            }

            this.connection2.invoke("Copywriting", param)
                .catch(function (err) {
                    console.error(err);
                });
        },

    }
}
</script>
  
<style scoped></style>
  