import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './index.scss'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store'
import { useEffect, useRef, useState } from 'react'
import { http } from '@/utils'
const { Option } = Select

const Publish = () => {

  //发布文章
  const navigate = useNavigate()
  const onFinish = async (value) => {
    console.log(fileList)
    const id = searchParams.get('id')
    const { channel_id, content, type, title } = value
    const params = {
      channel_id,
      content,
      type,
      title,
      cover: {
        type,
        images: fileList.map(file => file.url)
      }
    }
    if (id) {
      await http.put(`/mp/articles/${id}?draft=false`, params)
    } else {
      await http.post('/mp/articles?draft=false', params)
    }
    navigate('/article')
    message.success(`${id ? '更新成功' : '发布成功'}`)
  }
  //获得频道列表
  const { channelStore } = useStore()
  useEffect(() => {
    channelStore.getChannelList()
  }, [channelStore])
  //上传图片文件
  const [fileList, setFileList] = useState([])
  const onUploadChange = ({ fileList }) => {
    const formatList = fileList.map(item => {
      if (item.response) {
        return { uid: item.uid, url: item.response.data.url }
      }
      return item
    })
    console.log(formatList)
    setFileList(formatList)
    imgCountRef.current = fileList
  }
  //图片状态切换
  const imgCountRef = useRef([])
  const [imgCount, setImgCount] = useState(1)
  const onImgCountChange = (e) => {
    setImgCount(e.target.value)
    if (e.target.value === 1) {
      imgCountRef.current[0] ? setFileList([imgCountRef.current[0]]) : setFileList([])
    } else if (e.target.value === 3) {
      setFileList(imgCountRef.current)
    }
  }
  //获取路由参数
  const [searchParams] = useSearchParams()
  // 基础数据 编辑数据调取
  //获取form实例组件
  const formRef = useRef(null)
  useEffect(() => {
    const id = searchParams.get('id')
    const getEditData = async () => {
      const { data } = await http.get(`/mp/articles/${id}`)
      const formValues = data.data
      console.log(formValues)
      formValues.type = formValues.cover.type
      const imgList = formValues.cover.images.map(item => {
        return { url: item }
      })
      setFileList(imgList)
      imgCountRef.current = imgList
      formRef.current.setFieldsValue(formValues)
    }
    if (id) {
      getEditData()
    }
  }, [searchParams])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{searchParams ? '编辑' : '发布'}文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          ref={formRef}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map(channel => <Option key={channel.id} value={channel.id}>{channel.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onImgCountChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (<Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList
              action='http://geek.itheima.net/v1_0/upload'
              fileList={fileList}
              onChange={onUploadChange}
              maxCount={imgCount}
              multiple={imgCount > 1}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>)}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill theme="snow" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {searchParams.get('id') ? '更新' : '发布'}文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Publish) 