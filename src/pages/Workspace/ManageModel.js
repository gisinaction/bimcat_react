// Analysis.js
import { Upload, Button, Icon } from 'antd';
import router from 'umi/router';
import $ from 'jquery'

class ManageModel extends React.Component {
  state = {
  };

  handleChange = info => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    //fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response;
      }
      return file;
    });

    this.setState({ fileList });
  };

  handleRemoveFile=info=>{
    console.log("删除元素");
    console.log(info.url);
    let filename=info.url.split("/").pop();
    console.log(filename);
    $.ajax({
      url:'./file/delete/'+filename,
      type:"DELETE",
      success:(response)=>{
        console.log(response);
      }
    }

    );
  }

  handlePreview=info=>{
    console.log("显示元素");
    console.log(info);
    router.push("/index?file="+info.url.split("/").pop()); //umi.js中的页面跳转
  }

  render() {
    const props = {
      action: './file/upload',
      onChange: this.handleChange,
      multiple: true,
      onRemove: this.handleRemoveFile,
      onPreview:this.handlePreview
    };
    return (
        <div>
            <Upload {...props}>
                <Button>
                <Icon type="upload" /> Upload
                </Button>
            </Upload>
        </div>

    );
  }
}

export default ManageModel;