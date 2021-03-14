import { Formik } from 'formik';
import  * as Yup from 'yup';
import React, { Component } from 'react';
import {
    Alert,
    Col, 
    Form,
    FormGroup,
    Input, 
    Label, 
    Row,
    Button,
    FormFeedback
} from 'reactstrap';
import {connect} from 'react-redux';
import {logIn} from '../../actions';

class LoginPage extends Component {

    componentDidUpdate(){
        const { error, isAuth } = this.props;
        if (error && this.bag) {
            this.bag.setSubmitting(false);
        }
        if (isAuth) {
            this.props.history.push('/dashboard')
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
                <Row>
                    
                    <Col sm="12" className="m-auto">
                        <div className="p-5 mt-5 shadow p-3 mb-5 bg-white rounded mt-5">
                            <h3>Admin Log in</h3>
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
                        </div>
                    </Col>
                </Row>
            </div>
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
const LogAdmin = connect(mapStateToProps, { logIn })(LoginPage)
export {LogAdmin};