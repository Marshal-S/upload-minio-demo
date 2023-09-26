import { Upload } from 'antd';
import './App.css';
import { requestByUpload } from './request';

function App() {

  const uploadImage = (info: any) => {
    console.log(info)
    requestByUpload({
      "size": 1024,
      "originname": "WechatIMG73085.jpg",
      "mimetype": "image/jpeg",
    }, info.file)
  }

  return (
    <div className="App">
      <Upload
        customRequest={uploadImage}
        >
        <div>上传图片</div>
    </Upload>
    </div >
  );
}

export default App;
