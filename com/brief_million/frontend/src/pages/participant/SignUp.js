import { Formik } from 'formik';
import  * as Yup from 'yup';
import React, { Component } from 'react';
import {
    Col, 
    Container, 
    Form,
    FormGroup,
    Input, 
    Label, 
    Row,
    Button,
    FormFeedback
} from 'reactstrap';
import { Link } from 'react-router-dom';
import img from '../../assets/image.jpg';
 
class SignUp extends Component {
    _handleFormSubmit(values){
        console.log(values);
    }
    render() { 
        return (
            <Container>
                <Row className="shadow p-3 mb-5 bg-white rounded mt-5">
                    <Col sm="6">
                        <img src={img} alt="image" className="img-fluid w-100 h-100" />
                    </Col>
                    <Col sm="6">
                        <div className="mt-5">
                        <h3>Sign up</h3>
                            <Formik 
                                initialValues={{phone:"", password:"", fullName:"", email:"", age:""}}
                                onSubmit={this._handleFormSubmit.bind(this)}
                                validationSchema={Yup.object().shape({
                                    phone   : Yup.number().min(10).required(),
                                    password: Yup.string().min(8).required(),
                                    fullName: Yup.string().min(8).required('full name is a required field'),
                                    email: Yup.string().min(8).required(),
                                    age: Yup.date().required(),
                                })}
                                render={({
                                    handleChange,
                                    handleSubmit,
                                    isValid,
                                    isSubmiting,
                                    handleBlur,
                                    errors,
                                    touched,
                                }) =>(
                                    <Form>
                                        <FormGroup>
                                            <Label>Full Name</Label>
                                            <Input 
                                                invalid={errors.fullName && touched.fullName}
                                                name="fullName" 
                                                type="text" 
                                                placeholder="Full name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}>                                                
                                            </Input>
                                            {errors.fullName && touched.fullName ? (
                                                <FormFeedback>{errors.fullName}</FormFeedback>
                                            ):null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Email</Label>
                                            <Input 
                                                invalid={errors.email && touched.email}
                                                name="email" 
                                                type="text" 
                                                placeholder="Address email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}>                                                
                                            </Input>
                                            {errors.email && touched.email ? (
                                                <FormFeedback>{errors.email}</FormFeedback>
                                            ):null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Phone</Label>
                                            <Input 
                                                invalid={errors.phone && touched.phone}
                                                name="phone" 
                                                type="text" 
                                                placeholder="Address number phone"
                                                onChange={handleChange}
                                                onBlur={handleBlur}>                                                
                                            </Input>
                                            {errors.phone && touched.phone ? (
                                                <FormFeedback>{errors.phone}</FormFeedback>
                                            ):null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Date of birth</Label>
                                            <Input 
                                                invalid={errors.age && touched.age}
                                                name="age" 
                                                type="date" 
                                                onChange={handleChange}
                                                onBlur={handleBlur}>                                                
                                            </Input>
                                            {errors.age && touched.age ? (
                                                <FormFeedback>{errors.age}</FormFeedback>
                                            ):null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Password</Label>
                                            <Input 
                                                invalid={errors.password && touched.password}
                                                name="password" 
                                                type="password" 
                                                placeholder="********"
                                                onChange={handleChange}
                                                onBlur={handleBlur}>
                                            </Input>
                                            {errors.password && touched.password ? (
                                                <FormFeedback>{errors.password}</FormFeedback>
                                            ):null}
                                        </FormGroup>
                                        <Button outline color="warning" onClick={handleSubmit} disabled={!isValid||isSubmiting}>Create account</Button>
                                    </Form>
                                )}
                                />
                                <hr/>
                                <Link to="/participant/login"> Arleady have an account? Log in Now</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
 
export {SignUp};