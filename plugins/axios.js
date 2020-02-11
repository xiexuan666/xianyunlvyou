import { Message} from "element-ui"
//网页启动时候执行该文件
export default (data) => {
  //拦截请求的错误
  data.$axios.onError(err => {
    const {
      statusCode,
      message
    } = err.respomse.data;

    //判断状态如果是400.展示信息错误
    Message.error(message)
  })
}


