// import node module libraries
import { Fragment, useEffect, useState } from 'react';
import { ProgressBar, Col, Row, Card, Table, Image, Container } from 'react-bootstrap';
import Link from 'next/link';
import ActiveProjectsData from "data/dashboard/ActiveProjectsData";
import axios from 'axios';

const BookManagement = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Thực hiện yêu cầu GET đến API
    axios.get('http://localhost:9001/api/v1/books')
      .then((response) => {
        // Xử lý dữ liệu trả về từ API
        setData(response.data);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error('Error fetching data:', error);
      });
  }, []);

  console.error(data)
  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">

        <Row>
          <Col lg={12} md={12} xs={12}>
            {/* Page header */}
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="mb-2 mb-lg-0">
                  <h3 className="mb-0  text-white">BOOK LIBRARY</h3>
                </div>
                <div>
                  <Link href="#" className="btn btn-white">Create New Book</Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-6">
          <Col md={12} xs={12}>
            <Card>
              <Card.Header className="bg-white  py-4">
                <h4 className="mb-0">Active Projects</h4>
              </Card.Header>
              <Table responsive className="text-nowrap mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Project name</th>
                    <th>Hours</th>
                    <th>priority</th>
                    <th>Members</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {ActiveProjectsData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="align-middle">
                          <div className="d-flex align-items-center">
                            <div>
                              <div className={`icon-shape icon-md border p-4 rounded-1 ${item.brandLogoBg}`}>
                                <Image src={item.brandLogo} alt="" />
                              </div>
                            </div>
                            <div className="ms-3 lh-1">
                              <h5 className=" mb-1">
                                <Link href="#" className="text-inherit">{item.projectName}</Link></h5>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">{item.hours}</td>
                        <td className="align-middle"><span className={`badge bg-${item.priorityBadgeBg}`}>{item.priority}</span></td>
                        <td className="align-middle">
                          <div className="avatar-group">
                            {item.members.map((avatar, avatarIndex) => {
                              return (
                                <span className="avatar avatar-sm" key={avatarIndex}>
                                  <Image alt="avatar" src={avatar.image} className="rounded-circle" />
                                </span>
                              )
                            })}
                            <span className="avatar avatar-sm avatar-primary">
                              <span className="avatar-initials rounded-circle fs-6">+5</span>
                            </span>
                          </div>
                        </td>
                        <td className="align-middle text-dark">
                          <div className="float-start me-3">{item.progress}%</div>
                          <div className="mt-2">
                            <ProgressBar now={item.progress} style={{ height: '5px' }} />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
              <Card.Footer className="bg-white text-center">
                <Link href="#" className="link-primary">View All Projects</Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default BookManagement;
