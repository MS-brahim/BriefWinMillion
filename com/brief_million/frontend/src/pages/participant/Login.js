import { Formik } from 'formik';
import  * as Yup from 'yup';
import React, { Component } from 'react';
import {
    Alert,
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
import {connect} from 'react-redux';
import {logIn} from '../../actions';

class LoginPage extends Component {

    componentDidUpdate(){
        const { error, isAuth } = this.props;
        if (error && this.bag) {
            this.bag.setSubmitting(false);
        }
        if (isAuth) {
            this.props.history.push('/account')
        }
    }
    _handleFormSubmit(values, bag){
        this.props.logIn(values);
        this.bag = bag;
    }
    _renderErrorIfAny(){
        const { error } = this.props;
        if (error) {
            return (<Alert color="danger">{error}</Alert>);
        }
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
                            <h3>Log in</h3>
                            {this._renderErrorIfAny()}
                            
                            <Formik 
                                initialValues={{phone:"", password:""}}
                                onSubmit={this._handleFormSubmit.bind(this)}
                                validationSchema={Yup.object().shape({
                                    phone:Yup.number().min(10).required(),
                                    password: Yup.string().min(8).required()
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
                                        <Button outline color="warning" onClick={handleSubmit} disabled={!isValid||isSubmiting}>Log in</Button>
                                    </Form>
                                )}
                                />
                                <hr/>
                                <Link to="/participant/signUp" className="float-right">Do not have an account? Create account Now</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
const mapStateToProps = ({ auth }) =>{
    return {
        attempting : auth.attempting,
        error      : auth.error,
        isAuth     : auth.isAuth,
    }
}
const Login = connect(mapStateToProps, { logIn })(LoginPage)
export {Login};