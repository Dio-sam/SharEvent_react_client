import React from 'react';
import Config from '../../Config';
import EventsVisited from 'material-table';
import * as moment from 'moment';

class eventsVisited extends React.Component {
    render() {
        return(
            <div className="row">
                <div className="col-12 mt-5 ml-5">
                    <EventsVisited
                        title="Events Visited"
                        columns={[
                        {
                            title: 'Event logo',
                            field: 'picture',
                            render: data => (
                            <img
                                style={{ height: 50, borderRadius: '20%' }}
                                src={`${Config.HOST_PICTURE}${data.event.picture}`}
                                alt="Event logo"
                            />
                            ),
                        },
                        { 
                            title: 'Events', field: 'name',
                            render: data => (
                                <p>{data.event.name}</p>
                            )
                        },
                        { 
                            title: 'Address', field: 'address',
                            render: data => (
                                <p>{data.event.address}</p>
                            )
                        },
                        { title: 'The event had started on', field: 'start',
                            render: data => (
                                <p>{moment(data.event.start).format('DD/MM/YYYY HH:mm')}</p>
                            )
                        }
                        ]}
                        data={query =>
                            new Promise((resolve, reject) => {
                                const { id } = this.props;
                                let url = `${Config.HOST_SERVER}/users/${id}/shares`
                                console.log(url);
                                fetch(url)
                                .then(response => response.json())
                                .then(result => {
                                    console.log("result", result)
                                    resolve({
                                    data: result.data,
                                    event:result.data.event
                                    })
                                })
                            })
                        }
                        options={{
                            headerStyle: {
                            backgroundColor: '#2EC4B6',
                            color: '#FFF'
                            },
                            search: true
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default eventsVisited;