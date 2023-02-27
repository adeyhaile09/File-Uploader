/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Layout, { Header, Content, Footer } from 'antd/lib/layout/layout';
import { Table, Row, Col, Button, Upload, Space } from 'antd';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';

import dateFormat from 'dateformat';

function FileUpload() {
  const columns = [
    {
      title: 'File Name',
      dataIndex: 'file_name',
      key: 'file_name',
    },
    {
      title: 'File Size',
      dataIndex: 'file_size',
      key: 'file_size',
    },
    {
      title: 'Uploaded Date',
      dataIndex: 'uploaded_date',
      key: 'uploaded_date',
    },
    {
      title: 'Action',
      dataIndex: 'delete',
      key: 'delete',
      render: (text, record) => (
        <Button
          style={{ color: 'red' }}
          onClick={(e) => {
            onDelete(record.id, e);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fileData, setFile] = useState({});
  const [fileLoading, setFileLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get('http://localhost:6868/api/uploads');
    setLoading(false);
    setData(
      res.data.map((row) => ({
        id: row.id,
        file_name: row.name,
        file_size: row.size,
        uploaded_date: dateFormat(row.createdAt, 'dd/mm/yyyy'),
      }))
    );
  };

  const upload = async (e) => {
    console.log(e);
    let formData = new FormData();
    formData.append('file', e.file);
    const res = await axios({
      method: 'post',
      url: 'http://localhost:6868/api/uploads',
      data: formData,
    });

    console.log('result', res);
    setData([
      ...data,
      {
        id: res.data.id,
        file_name: res.data.name,
        file_size: res.data.size,
        uploaded_date: dateFormat(res.data.createdAt, 'dd/mm/yyyy'),
      },
    ]);
  };

  const onDelete = async (key, e) => {
    e.preventDefault();
    console.log(key);
    const res = await axios.delete(`http://localhost:6868/api/uploads/${key}`);
    // setLoading(false);

    const newData = data.filter((item) => item.id !== key);
    // this.setState({ data, isPageTween: false });
    setData(newData);
  };

  return (
    <Layout>
      <Header style={{ color: 'white' }}>List of Files</Header>
      <Content style={{ padding: 50 }}>
        <Row>
          <Col span={4} />
          <Col span={18}>
            <Space style={{ marginBottom: 5 }}>
              <Upload showUploadList={false} customRequest={upload}>
                <Button icon={<UploadOutlined />}>Upload File</Button>
              </Upload>
              {/* <Button type="primary" htmlType="submit" onSubmit={uploadFile}>
                Submit
              </Button> */}
            </Space>
            <Table
              dataSource={data}
              columns={columns}
              rowKey={(record) => record.id}
            />
          </Col>
          <Col span={4} />
        </Row>
      </Content>

      {/* <Footer>Footer</Footer> */}
    </Layout>
  );
}

export default FileUpload;
