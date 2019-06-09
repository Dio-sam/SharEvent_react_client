import React from 'react';
import Config from '../../Config';
import FuturEvents from 'material-table';
import * as moment from 'moment';

class futurEvents extends React.Component {
    render() {
        return(
            <div className="row">
                <div className="col-12 mt-5 ml-5">
                    <FuturEvents
                        title="You are going to visit"
                        columns={[
                        {
                            title: 'Event logo',
                            field: 'logo',
                            render: data => (
                            <img
                                style={{ height: 50, borderRadius: '20%' }}
                                src={`${Config.HOST_PICTURE}${data.picture}`}
                                alt="Event logo"
                            />
                            ),
                        },
                        { title: 'Events', field: 'name' },
                        { title: 'Address', field: 'address' },
                        { title: 'Date', field: 'start', 
                            render: data => (
                                <p>{moment(data.start).format('DD/MM/YYYY HH:mm')}</p>
                            )
                        },
                        ]}
                        data={query =>
                            new Promise((resolve, reject) => {
                                const { id } = this.props;
                                let url = `${Config.HOST_SERVER}/users/${id}/events`
                                console.log('url',url);
                                // url += 'per_page=' + query.pageSize
                                // url += '&page=' + (query.page + 1)
                                fetch(url)
                                .then(response => response.json())
                                .then(result => {
                                    console.log(result)
                                    resolve({
                                    data: result.events,
                                    // page: result.page - 1,
                                    // totalCount: result.total,
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

export default futurEvents;