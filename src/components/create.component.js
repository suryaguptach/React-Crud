import React, { Component } from 'react';
import axios from 'axios';
export default class Create extends Component {
  constructor(props) {
      super(props);
      this.onChangePersonName = this.onChangePersonName.bind(this);
      this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
      this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          person_name: '',
          business_name: '',
          business_gst_number:'',
          isFlag: false,
          isServerFlag: false,
          msg: ''
      }
  }
  onChangePersonName(e) {
    this.setState({
      person_name: e.target.value
    });
  }
  onChangeBusinessName(e) {
    this.setState({
      business_name: e.target.value
    })  
  }
  onChangeGstNumber(e) {
    this.setState({
      business_gst_number: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      person_name: this.state.person_name,
      business_name: this.state.business_name,
      business_gst_number: this.state.business_gst_number
    };
    axios.post('http://localhost:4000/business/add', obj)
        .then(res => {
          this.setState({msg: res.data.message,isServerFlag: true});
        })
        .catch(err => {
          console.log(err.response);
          this.setState({msg: err.response.data.message|| err.response.statusText
            ,isServerFlag: true});
        });
    
    this.setState({
      isFlag: true
      
    })
  }
 
  render() {
    const isFalg = this.state.isFlag;
    const isServerFlag = this.state.isServerFlag;
    const msg = this.state.msg;
    console.log(isFalg);
      return (
          <div style={{ marginTop: 10 }}>
             {isServerFlag && <div className="alert alert-success">{msg}</div>}
             {(isFalg && !this.state.person_name) && <div className="alert alert-danger" >please enter Person Name</div>}
             {(isFalg && !this.state.business_name) && <div className="alert alert-danger" >please enter Business Name</div>}
             {(isFalg && !this.state.business_gst_number) && <div className="alert alert-danger" >please enter Business GST Number</div>}
              <h3>Add New Business</h3>
              <form onSubmit={this.onSubmit} noValidate>
                  <div className="form-group">
                      <label className="control-label">Person Name:</label>

                      <input 
                        type="text" 
                        required 
                        minLength={5}
                        maxLength={20}
                        className="form-control" 
                        value={this.state.person_name}
                        onChange={this.onChangePersonName}
                       />
                        
                  </div>
                  <div className="form-group">
                      <label className="control-label">Business Name: </label>
                      <input type="text" 
                       required
                       minLength={5}
                        maxLength={20}
                        className="form-control"
                        value={this.state.business_name}
                        onChange={this.onChangeBusinessName}
                        />
                  </div>
                  <div className="form-group">
                      <label className="control-label">GST Number: </label>
                      <input type="text" 
                       required
                       minLength={5}
                        maxLength={20}
                        className="form-control"
                        value={this.state.business_gst_number}
                        onChange={this.onChangeGstNumber}
                        />
                  </div>
                  <div className="form-group">
                      <input type="submit" value="Register Business" className="btn btn-primary"/>
                  </div>
              </form>
          </div>
      )
  }
}