import "./App.css";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import axios from "axios";
import Header from "./components/Header";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Button,
  Row,
  Col,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
  const [json, setJson] = useState();
  const [file, setFile] = useState("");
  const postImage = async (data) => {
    const response = await axios.post("http://192.168.6.43:8000/files/", data);
    return response;
  };
  const fileChangeHandler = async (event) => {
    setFile(event.target.files[0]);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("file", file);
    postImage(form).then((res) => {
      setJson({ ...res.data });
    });
  };
  return (
    <div className="App">
      <Header />
      <div className="Container">
        <Card className="my-4 Container-Body">
          <CardBody>
            <CardTitle tag="h2">Upload Form Image</CardTitle>
            <Row>
              <Col md={6}>
                <Form onSubmit={submitHandler}>
                  <FormGroup className="my-4">
                    <Input
                      id="formImage"
                      name="file"
                      type="file"
                      onChange={fileChangeHandler}
                    />
                    <FormText>
                      Extract data from printed or handwritten forms
                    </FormText>
                  </FormGroup>
                  <Button
                    className="mx-2"
                    color="primary"
                    size="lg"
                    type="submit"
                    disabled={file === ""}
                  >
                    Process
                  </Button>
                  <Button onClick={() => setFile("")} size="lg">
                    Clear
                  </Button>
                </Form>
                {json ? (
                  <>
                    <FormGroup row className="my-4">
                      <Col sm={10}>
                        <Input
                          placeholder="Enter POST API"
                          id="postUrl"
                          name="postUrl"
                          type="text"
                        />
                      </Col>
                    </FormGroup>
                    <Button className="mx-2" color="warning" size="lg">
                      Post
                    </Button>
                    <FormGroup row className="my-4">
                      <Col>
                        <JSONInput
                          confirmGood={false}
                          width="90%"
                          id="json"
                          placeholder={json}
                          locale={locale}
                          height="auto"
                        />
                      </Col>
                    </FormGroup>
                  </>
                ) : null}
              </Col>
              <Col>
                {file !== "" ? (
                  <CardImg
                    alt="No preview"
                    bottom
                    src={file}
                    width="100%"
                    className="my-2"
                  />
                ) : null}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default App;
