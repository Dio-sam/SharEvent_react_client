import React from 'react';
import Api from '../../utils/Api';
import {withRouter } from 'react-router-dom';

class SharedId extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            summary: '',
            description:'',
            address:'',
            url: '',
            picture: '',
            is_free:true,
            start:'',
            end:'',
            // location:''
        };
 
      }
 
    onChange({ name, value }) {
        this.setState({
          [name]: value
        })
      }
 
    onChangeFiles(files) {
 
        this.setState({
          picture: files
        })
      }
    saveEvent(){
        const {name,
        summary,
        description,
        address,
        url,
        picture,
        is_free,
        start,
        end,}=this.state;
         console.log('id#saveEvent#this.state',this.state);
        let data=new FormData();
        data.append('picture', picture);
        data.append('name', name);
        data.append('start', start);
        data.append('end', end);
        data.append('description', description);
        data.append('summary', summary);
        data.append('address', address);
        data.append('is_free', is_free);
        data.append('url', url);
        console.log('data',data)
        Api.postEvent(data)
            .then((res) => {
                console.log('res', res);
                console.log('this.props.history',this.props.history);
                if (res.error) {
                  alert(res.error);
                } else {
                 this.props.history.push(`/events/${res.data._id}`);
                }
              });
    }

    render() {
        const {
            name,
            summary,
            description,
            address,
            url, 
            start,
            end,
            // location
        } = this.state;
        
        // console.log('addEvent#props',this.props);      
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="eventPic" className="font-weight-bold">Event logo</label>
                                    <input type="file" className="form-control-file" id="eventPic" onChange={(evt) => this.onChangeFiles( evt.target.files[0] )} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="eventInfo" className="font-weight-bold">Event Info</label>
                                    <input type="text" className="form-control m-2" placeholder="Name Event"  value={name} onChange={(evt) => this.onChange({ name: 'name', value : evt.target.value })} />
                                    {/* <input type="text" className="form-control m-2" placeholder="Location"  value={location} onChange={(evt) => this.onChange({ name: 'location', value : evt.target.value })}/> */}
                                    <input type="text" className="form-control m-2" placeholder="Address"  value={address} onChange={(evt) => this.onChange({ name: 'address', value : evt.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="url" className="font-weight-bold">URL</label>
                                    <input type="text" className="form-control m-2" placeholder="http://www.website.com" id="url" value={url} onChange={(evt) => this.onChange({ name: 'url', value : evt.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="summary" className="font-weight-bold" >Summary</label>
                                    <textarea className="form-control" id="summary" rows="3" value={summary} onChange={(evt) => this.onChange({ name: 'summary', value: evt.target.value })}></textarea>
                                </div>
                            </div>
                            
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="startDate" className="font-weight-bold">Event begins on</label>
                                    <input type="datetime-local" className="form-control m-2" id="startDate" placeholder="Start" value={start} onChange={(evt) => this.onChange({ name: 'start', value : evt.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="endDate" className="font-weight-bold">Event finished on</label>
                                    <input type="datetime-local" className="form-control m-2" id="endDate" placeholder="End" value={end} onChange={(evt) => this.onChange({ name: 'end', value : evt.target.value })} />
                                </div>
                                <div className="font-weight-bold" style={{ fontSize: 16 }}>Free or Paying</div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="is_free" id="priceFree" checked value="true" onChange={(evt) => this.onChange({ name: 'is_free', value: evt.target.value })} />
                                    <label className="form-check-label" htmlFor="priceFree">Free</label>
                                </div>
                                <div className="form-check form-check-inline m-2">
                                    <input className="form-check-input" type="radio" name="is_free" id="pricePaying" value="false" onChange={(evt) => this.onChange({ name: 'is_free', value: evt.target.value })} />
                                    <label className="form-check-label" htmlFor="pricePaying">Paying</label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Description" className="font-weight-bold">Description</label>
                                    <textarea className="form-control" id="Description" rows="3" value={description} onChange={(evt) => this.onChange({ name: 'description', value: evt.target.value })}></textarea>
                                </div>
                                <button data-dismiss="modal" type="button" className="btn btn-info" onClick={()=>this.saveEvent()}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SharedId);