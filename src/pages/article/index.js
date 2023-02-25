import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useStore } from '@/store'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import logo from '@/assets/logo.png'
import { http } from '@/utils'
const { Option } = Select
const { RangePicker } = DatePicker
const Article = () => {
  //重置按钮
  const onReset = () => {
    setParams({ page: 1, per_page: 10 })
  }
  //筛选文章
  const onFinish = (value) => {
    // new Date().toLocaleTimeString
    console.log(value)
    const _params = {}
    _params.status = value.status
    if (value.channel_id) {
      _params.channel_id = value.channel_id
    }
    if (value.date) {
      _params.pubStart = value.date[0].format('YYYY-MM-DD')
      _params.pubEnd = value.date[1].format('YYYY-MM-DD')
    }
    setParams({ ...params, ..._params })
  }
  //获得频道列表
  const { channelStore } = useStore()

  useEffect(() => {
    channelStore.getChannelList()
  }, [channelStore])
  //获得文章列表'
  const [articleData, setArticleData] = useState({ list: [], count: 0 })
  const [params, setParams] = useState({ page: 1, per_page: 10 })
  useEffect(() => {
    async function loadArticleList () {
      const { data } = await http.get('/mp/articles', { params })
      const { results } = data.data
      const { total_count } = data.data
      setArticleData({ list: results, count: total_count })
    }
    loadArticleList()
  }, [params])
  //分页页码改变
  const pageChange = (page) => {
    console.log(page)
    setParams({ ...params, page })
  }
  //删除文章
  const delArticle = async (data) => {
    await http.delete(`/mp/articles/${data.id}`)
    setParams({ ...params, page: 1 })
  }
  //编辑
  const navigate = useNavigate()
  const onEditArticle = (data) => {
    navigate(`/publish?id=${data.id}`)
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || logo} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">

            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => onEditArticle(data)} />
            <Popconfirm
              title="删除文章"
              description="确定要删除文章吗?"
              okText="确定"
              cancelText="取消"
              onConfirm={() => delArticle(data)}
            // icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  // const data = [
  //   {
  //     id: '8218',
  //     comment_count: 0,
  //     cover: {
  //       images: ['http://geek.itheima.net/resources/images/15.jpg'],
  //     },
  //     like_count: 0,
  //     pubdate: '2019-03-11 09:00:00',
  //     read_count: 2,
  //     status: 2,
  //     title: 'wkwebview离线化加载h5资源解决方案'
  //   }
  // ]
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: -1 }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id" >
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {channelStore.channelList.map(channel => <Option key={channel.id} value={channel.id}>{channel.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
            <Button type="primary" style={{ marginLeft: 80 }} onClick={onReset}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${articleData.count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={articleData.list} pagination={{ pageSize: params.per_page, current: params.page, onChange: pageChange, total: articleData.count }} />
      </Card>
    </div>
  )
}

export default observer(Article)