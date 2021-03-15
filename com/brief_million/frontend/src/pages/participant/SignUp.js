import { Formik } from 'formik';
import  * as Yup from 'yup';
import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
    Col, 
    Form,
    FormGroup,
    Input, 
    Label, 
    Row,
    Button,
    FormFeedback,
    Alert
} from 'reactstrap';
import { Link } from 'react-router-dom';
import img from '../../assets/image.jpg';
import {signUp} from '../../actions/auth_action';
 
class SignUpPage extends Component {
    componentDidUpdate(){
        const { error } = this.props;
        if (error && this.bag) {
            this.bag.setSubmitting(false);
        }
    }

    _renderErrorIfAny(){
        const { error } = this.props;
        if (error) {
            return (<Alert color="danger">{error}</Alert>);
        }
    }

    _handleFormSubmit(values){
        this.props.signUp(values)
        // console.log(values);
    }

    render() { 
        return (
            <div style={{
                justifyContent:'center',
                alignItems:'center', 
                display:'flex', 
                height:'100%', 
                zIndex:1,
                position:'absolute',
                opacity:0.8,
                width: '-webkit-fill-available',
            }}>
                <Row className="shadow p-3 mb-5 bg-white rounded mt-5">
                    <Col sm="6">
                        <img src={img} alt="image" className="img-fluid w-100 h-100" />
                    </Col>
                    <Col sm="6">
                        <div className="mt-5">
                        <h3>Sign up</h3>
                        {this._renderErrorIfAny()}
                            <Formik 
                                initialValues={{phone:"", password:"", full_name:"", email:"", age:""}}
                                onSubmit={this._handleFormSubmit.bind(this)}
                                validationSchema={Yup.object().shape({
                                    phone   : Yup.number().min(10).required(),
                                    password: Yup.string().min(8).required(),
                                    full_name: Yup.string().min(8).required('full name is a required field'),
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
                                                invalid={errors.full_name && touched.full_name}
                                                name="full_name" 
                                                type="text" 
                                                placeholder="Full name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}>                                                
                                            </Input>
                                            {errors.full_name && touched.full_name ? (
                                                <FormFeedback>{errors.full_name}</FormFeedback>
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
                                            <Label>Age</Label>
                                            <Input 
                                                invalid={errors.age && touched.age}
                                                name="age" 
                                                type="number" 
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
            </div>
        );
    }
}
const mapStateToProps = ({auth}) => {
     return {
        signedUp : auth.signedUp,
        error: auth.error
    };
};
const SignUp = connect(mapStateToProps, {signUp})(SignUpPage)
export {SignUp};