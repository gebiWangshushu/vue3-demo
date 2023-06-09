<template>
    <div>
        <h1>SignalR hhh</h1>
        <input type="button" value="调用服务端方法" @click="invokeServerMethord" />
        <input type="button" value="close" @click="close" />
    </div>
</template>
  
<script>
import * as signalR from '@microsoft/signalr'

export default {
    name: 'SignalR',
    components: {
    },
    props: {
        msg: String
    },
    data() {
        return {
            connection: null
        }
    },
    mounted() {
        //var wwsUrl = "http://localhost:5055/ws/TranscodeNotify";
        //var wwsUrl = "http://heiner.siluzan.com/ws/TranscodeNotify";

        // var wwsUrl = "https://api-ci.siluzan.com/cutapi/ws/TranscodeNotify"; //ci 
        // var token="eyJhbGciOiJSUzI1NiIsImtpZCI6Ikx5ZEIyVHJwMzZzOGtJNE5BNWc3WWNvMnROdyIsInR5cCI6IkpXVCIsIng1dCI6Ikx5ZEIyVHJwMzZzOGtJNE5BNWc3WWNvMnROdyJ9.eyJuYmYiOjE2ODIwNTU5ODYsImV4cCI6MTY4MjA5MTk4NiwiaXNzIjoiaHR0cHM6Ly9zc28tY2kuc2lsdXphbi5jb20iLCJhdWQiOlsiaHR0cHM6Ly9zc28tY2kuc2lsdXphbi5jb20vcmVzb3VyY2VzIiwiYXBpMSIsImFwaS11c3NpdGVtYW4iLCJhcGktZmFjZWJvb2siLCJhcGkteW91dHViZSIsImFwaS1nb29nbGUiLCJhcGktZG91eWluIiwiYXBpLWt1YWlzaG91IiwiYXBpLXRpa3RvayIsImFwaS1jdXQiLCJhcGktc2NybSIsImFwaS1jaGF0Z3B0IiwiYXBpLWlwcHJveHkiLCJhcGktd3hjaGFubmVsIl0sImNsaWVudF9pZCI6Ind3dyIsInN1YiI6ImJlNzMzYzYwLTUwYjUtNDlkNy05NTY3LWY3MDk0N2VlOTg4ZiIsImF1dGhfdGltZSI6MTY4MjA1NTk4NSwiaWRwIjoibG9jYWwiLCJlbWFpbCI6IjEyM0BxcS5jb20iLCJuYW1lIjoiMTg45rWL6K-V5pi156ewMS43Iiwicm9sZSI6IlN0ZXdhcmRJbmRpdmlkdWFsIiwiY2lkIjoiOGY0ZjM3OTctNGM4YS00ODE3LWFiZGYtZmI3YmM5ZTM4YWJlIiwiZGlkIjoiNjExOTBhYjUtODFmOC00OTk2LWIwODItNWNiY2MxZGIwMDA3IiwicmlkIjoiNGMxY2NhNmEtOGNkNC00NjhmLWJkM2UtYzJiNGIzOTcxNTZjIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsImFwaTEiLCJhcGktdXNzaXRlbWFuIiwiYXBpLWZhY2Vib29rIiwiYXBpLXlvdXR1YmUiLCJhcGktZ29vZ2xlIiwiYXBpLWRvdXlpbiIsImFwaS1rdWFpc2hvdSIsImFwaS10aWt0b2siLCJjdXRhcGkucnciLCJhenVyZWFwaS5ydyIsImFwaS1zY3JtIiwiYXBpLWNoYXRncHQiLCJhcGktaXBwcm94eSIsImFwaS13eGNoYW5uZWwiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.JtapeNMshOpLHidkeuFS_4003QpxMubMH3STWAEZWFXKGrudw25wFVDbSWBcJWY4OMVzsvIgBNjPYqd_3RHiU3PRlysfSfTWoQL9K6v19t6CWSDenK5i4iHexEeEGZE0FTkg6rEhmzw56XNSdnncabNQlFhIXdhJWZh15r1iSzf5EzSs7GunCabBaQ8hMKAAtJKq8Jf8T68Ul9Kqcj3VW8pPk9WemoyYvcGHEMUuK7T7-wJj-dcn0S1MIYd3TuD6prgJBiohBwXukdmAKLeITThTDbi6fi6I5N_wW5ZihI5stuKAaLCGMmfVUNL0MLhvielWJRakUPMFg7QHI5kQnQ";

        // let connection = new signalR.HubConnectionBuilder()
        //    // .withUrl(wwsUrl)
        //     .withUrl(wwsUrl,{
        //         skipNegotiation: true,
        //         transport: signalR.HttpTransportType.WebSockets,
        //         accessTokenFactory: () => token
        //     })
        //     .build();

        // //转码完成
        // connection.on("TranscodeCompleted", data => {
        //     console.log(data);
        //     //{materialId: 'ac9b1628-63d5-43d1-8462-7a289e41d97a', folderId: '00000000-0000-0000-0000-000000000000', userId: 'be733c60-50b5-49d7-9567-f70947ee988f', belongTo: null, belongToId: null,message,success}
        // });

        // //启动连接
        // connection.start();

        // this.connection=connection;
        // //
        // // connection.start().then(() => connection.invoke("SendMessage", "Hello","message"));

        // connection.onclose(x=>{
        //     console.info(x);
        // })

        this.chatGptWs();
    },

    methods: {
        chatGptWs() {
            var wwsUrl = "https://chatgpt-ci.mysiluzan.com/chat"; //ci 
            var token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ikx5ZEIyVHJwMzZzOGtJNE5BNWc3WWNvMnROdyIsInR5cCI6IkpXVCIsIng1dCI6Ikx5ZEIyVHJwMzZzOGtJNE5BNWc3WWNvMnROdyJ9.eyJuYmYiOjE2ODU5NDQyMTEsImV4cCI6MTY4NTk4MDIxMSwiaXNzIjoiaHR0cHM6Ly9zc28tY2kuc2lsdXphbi5jb20iLCJhdWQiOlsiaHR0cHM6Ly9zc28tY2kuc2lsdXphbi5jb20vcmVzb3VyY2VzIiwiYXBpMSIsImFwaS11c3NpdGVtYW4iLCJhcGktZmFjZWJvb2siLCJhcGkteW91dHViZSIsImFwaS1nb29nbGUiLCJhcGktZG91eWluIiwiYXBpLWt1YWlzaG91IiwiYXBpLXRpa3RvayIsImFwaS1jdXQiLCJhcGktc2NybSIsImFwaS1jaGF0Z3B0IiwiYXBpLWlwcHJveHkiLCJhcGktd3hjaGFubmVsIl0sImNsaWVudF9pZCI6Ind3dyIsInN1YiI6ImJlNzMzYzYwLTUwYjUtNDlkNy05NTY3LWY3MDk0N2VlOTg4ZiIsImF1dGhfdGltZSI6MTY4NTA5MzI1NywiaWRwIjoibG9jYWwiLCJlbWFpbCI6IjEyM0BxcS5jb20iLCJuYW1lIjoiMTg45rWL6K-V5pi156ewMS43Iiwicm9sZSI6IlN0ZXdhcmRJbmRpdmlkdWFsIiwiY2lkIjoiOGY0ZjM3OTctNGM4YS00ODE3LWFiZGYtZmI3YmM5ZTM4YWJlIiwiZGlkIjoiNjExOTBhYjUtODFmOC00OTk2LWIwODItNWNiY2MxZGIwMDA3IiwicmlkIjoiNGMxY2NhNmEtOGNkNC00NjhmLWJkM2UtYzJiNGIzOTcxNTZjIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsImFwaTEiLCJhcGktdXNzaXRlbWFuIiwiYXBpLWZhY2Vib29rIiwiYXBpLXlvdXR1YmUiLCJhcGktZ29vZ2xlIiwiYXBpLWRvdXlpbiIsImFwaS1rdWFpc2hvdSIsImFwaS10aWt0b2siLCJjdXRhcGkucnciLCJhenVyZWFwaS5ydyIsImFwaS1zY3JtIiwiYXBpLWNoYXRncHQiLCJhcGktaXBwcm94eSIsImFwaS13eGNoYW5uZWwiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.b8GiybGLHrgGG0lo9hGQugseKsApGlEqBuFQOBNOtoxupRt5da49sk5W_msK2D_HNnbfba4sF7dXTClYONikon_tPGj8tG-ED5pDoU7yu7B78dwR4nuC9Lq6Hx7qz2QO1bpfXso37JFeUht41TQ2Or9pL6aejth5gJTlWmYTnSZxpHzEDoIR7e-o3PD0sUGUr-s0MNmnHtIeOQdZ9tcRgvN339Jcahj6LfwYMwKnIp3R-YCsSQGUkvaIWR9ld1r4rlFVTjXYqm8fJTZb_IHoWyOSQ9dC7iSCpIxvK9f_Fo2O68lRqzfUYSo27tdB29Eq9I8C6vOnnYB5XbZ1xl8Ing";

            let connection = new signalR.HubConnectionBuilder()
                // .withUrl(wwsUrl)
                .withUrl(wwsUrl
                // , {
                //     skipNegotiation: true,
                //     transport: signalR.HttpTransportType.WebSockets,
                //     //accessTokenFactory: () => token
                // }
                )
                .build();

            // connection.on("echo", data => {
            //     debugger;
            //     console.log(data);
            //     //{materialId: 'ac9b1628-63d5-43d1-8462-7a289e41d97a', folderId: '00000000-0000-0000-0000-000000000000', userId: 'be733c60-50b5-49d7-9567-f70947ee988f', belongTo: null, belongToId: null,message,success}
            // });

            connection.on("echo", function (message) {
                //debugger;
                console.log(message);
            });

            //启动连接
            connection.start();

            this.connection = connection;
            //
            // connection.start().then(() => connection.invoke("SendMessage", "Hello","message"));

            connection.onclose(x => {
                console.info(x);
            })
        },
        cutapiWs() {
            // var wwsUrl = "https://api-ci.siluzan.com/cutapi/ws/TranscodeNotify"; //ci 
            // var token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ikx5ZEIyVHJwMzZzOGtJNE5BNWc3WWNvMnROdyIsInR5cCI6IkpXVCIsIng1dCI6Ikx5ZEIyVHJwMzZzOGtJNE5BNWc3WWNvMnROdyJ9.eyJuYmYiOjE2ODIwNTU5ODYsImV4cCI6MTY4MjA5MTk4NiwiaXNzIjoiaHR0cHM6Ly9zc28tY2kuc2lsdXphbi5jb20iLCJhdWQiOlsiaHR0cHM6Ly9zc28tY2kuc2lsdXphbi5jb20vcmVzb3VyY2VzIiwiYXBpMSIsImFwaS11c3NpdGVtYW4iLCJhcGktZmFjZWJvb2siLCJhcGkteW91dHViZSIsImFwaS1nb29nbGUiLCJhcGktZG91eWluIiwiYXBpLWt1YWlzaG91IiwiYXBpLXRpa3RvayIsImFwaS1jdXQiLCJhcGktc2NybSIsImFwaS1jaGF0Z3B0IiwiYXBpLWlwcHJveHkiLCJhcGktd3hjaGFubmVsIl0sImNsaWVudF9pZCI6Ind3dyIsInN1YiI6ImJlNzMzYzYwLTUwYjUtNDlkNy05NTY3LWY3MDk0N2VlOTg4ZiIsImF1dGhfdGltZSI6MTY4MjA1NTk4NSwiaWRwIjoibG9jYWwiLCJlbWFpbCI6IjEyM0BxcS5jb20iLCJuYW1lIjoiMTg45rWL6K-V5pi156ewMS43Iiwicm9sZSI6IlN0ZXdhcmRJbmRpdmlkdWFsIiwiY2lkIjoiOGY0ZjM3OTctNGM4YS00ODE3LWFiZGYtZmI3YmM5ZTM4YWJlIiwiZGlkIjoiNjExOTBhYjUtODFmOC00OTk2LWIwODItNWNiY2MxZGIwMDA3IiwicmlkIjoiNGMxY2NhNmEtOGNkNC00NjhmLWJkM2UtYzJiNGIzOTcxNTZjIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsImFwaTEiLCJhcGktdXNzaXRlbWFuIiwiYXBpLWZhY2Vib29rIiwiYXBpLXlvdXR1YmUiLCJhcGktZ29vZ2xlIiwiYXBpLWRvdXlpbiIsImFwaS1rdWFpc2hvdSIsImFwaS10aWt0b2siLCJjdXRhcGkucnciLCJhenVyZWFwaS5ydyIsImFwaS1zY3JtIiwiYXBpLWNoYXRncHQiLCJhcGktaXBwcm94eSIsImFwaS13eGNoYW5uZWwiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.JtapeNMshOpLHidkeuFS_4003QpxMubMH3STWAEZWFXKGrudw25wFVDbSWBcJWY4OMVzsvIgBNjPYqd_3RHiU3PRlysfSfTWoQL9K6v19t6CWSDenK5i4iHexEeEGZE0FTkg6rEhmzw56XNSdnncabNQlFhIXdhJWZh15r1iSzf5EzSs7GunCabBaQ8hMKAAtJKq8Jf8T68Ul9Kqcj3VW8pPk9WemoyYvcGHEMUuK7T7-wJj-dcn0S1MIYd3TuD6prgJBiohBwXukdmAKLeITThTDbi6fi6I5N_wW5ZihI5stuKAaLCGMmfVUNL0MLhvielWJRakUPMFg7QHI5kQnQ";

            // let connection = new signalR.HubConnectionBuilder()
            //     // .withUrl(wwsUrl)
            //     .withUrl(wwsUrl, {
            //         skipNegotiation: true,
            //         transport: signalR.HttpTransportType.WebSockets,
            //         accessTokenFactory: () => token
            //     })
            //     .build();

            // //转码完成
            // connection.on("TranscodeCompleted", data => {
            //     console.log(data);
            //     //{materialId: 'ac9b1628-63d5-43d1-8462-7a289e41d97a', folderId: '00000000-0000-0000-0000-000000000000', userId: 'be733c60-50b5-49d7-9567-f70947ee988f', belongTo: null, belongToId: null,message,success}
            // });

            // //启动连接
            // connection.start();

            // this.connection = connection;

            // // connection.start().then(() => connection.invoke("SendMessage", "Hello","message"));
            // connection.invoke("ChatEcho", "周杰伦几岁了", "Cutapi", "Cutapi-001", "gpt-4", "be733c60-50b5-49d7-9567-f70947ee988f").catch(function (err) {
            //     console.error(err);
            // });



            // connection.onclose(x => {
            //     console.info(x);
            // })
        },
        invokeServerMethord() {
            if (this.connection) {
                // this.connection.invoke("SendMessage", "Hello_UserName","Hello_message");

                //调用服务端方法
                //this.connection.invoke("FetchTranscodeStatus", "ac9b1628-63d5-43d1-8462-7a289e41d97a");

                //debugger;
                //connection.invoke("ChatEcho", user, message, "qq", "","2164292c-c985-49f1-aeb7-d99323a3319e").catch(function (err) {

                this.connection.invoke("ChatEcho", "周杰伦几岁了", "Cutapi", "Cutapi-001", "", "be733c60-50b5-49d7-9567-f70947ee988f").catch(function (err) {
                    console.error(err);
                });
            }
            else {
                console.error("连接不存在");
            }
        },
        close() {
            if (this.connection) {
                this.connection.close();
            }
        },

    }
}
</script>
  
<style scoped></style>
  